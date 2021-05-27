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
        this.router.get('/transcations', this.index)
        this.router.post('/transcations',this.addTransaction)
    }
    index = async (req: Request, res: Response) => {
        const email = req.query.email || "";
        const {error} = TransactionEmailValidation({email});
        if(error){
            res.status(400).json({message:error.details[0].message})
        }
        try {
            const resultFindUser = await this.userDataManager.findByEmail(email?.toString())
            const transactionResult = await this.dataManager.getAllTransactionByUserId(resultFindUser._id)
            return res.status(200).json({result:transactionResult})
        } catch(error){
            return res.status(402).json({message:error})
        }
    }
    addTransaction = async (req: Request, res: Response) => {
        const data = req.body
        const {error} = TransactionValidation(data);
        if(error){
           return res.status(400).json({message:error.details[0].message})
        }
        const {currency,value,countryCode,userId} = data;
        try {
            await this.userDataManager.findUser(userId)
            const result= this.dataManager.transferTransaction(currency,countryCode,value)
            await this.dataManager.addTransaction({...data,OrginValue:data.value,...result})
            return res.status(200).json({decision:result.decision})
        } catch(error){
            return res.status(402).json({message:error})
        }
    }
    
}

