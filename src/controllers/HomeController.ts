import {IControllerBase} from './IController';
import express,{ Request, Response } from 'express'
import {DataManager,IDataManager,userDataManager,IUserDataManager} from '../lib/index'
import {TransactionValidation,TransactionEmailValidation} from '../models'
export class HomeController implements IControllerBase{
  
    public path = '/'
    public router = express.Router();
    public dataManager:IDataManager;
    public userDataManager:IUserDataManager;
    
    constructor(){
        this.initRouter();
        this.dataManager=new DataManager();
        this.userDataManager=new userDataManager();
    }
    initRouter(){
        this.router.get('/transcationByEmail/:email', this.index)
        this.router.post('/transcation',this.addTransaction)
    }
    index = async (req: Request, res: Response) => {
        const {email} = req.params;
        const {error} = TransactionEmailValidation({email});
        if(error){
            res.status(400).send({message:error.details[0].message})
        }
        try {
            const resultFindUser = await this.userDataManager.findByEmail(email)
            const transactionResult = await this.dataManager.getAllTransactionByUserId(resultFindUser._id)
            return res.status(200).send({result:transactionResult})
        } catch(error){
            return res.status(402).send({message:error})
        }
    }
    addTransaction = async (req: Request, res: Response) => {
        const data = req.body
        const {error} = TransactionValidation(data);
        if(error){
            res.status(400).send({message:error.details[0].message})
        }
        const {currency,value,countryCode,userId} = data;
        try {
            await this.userDataManager.findUser(userId)
            const result = this.dataManager.transferTransaction(currency,countryCode,value)
            await this.dataManager.addTransaction({...data,OrginValue:data.value,...result})
            return res.status(200).send({success:true})
        } catch(error){
            return res.status(402).send({message:error})
        }
    }
    
}

