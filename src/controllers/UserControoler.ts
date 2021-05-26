import {IControllerBase} from './IController';
import express,{ Request, Response } from 'express'
import {userDataManager,IUserDataManager} from '../lib/index'
import {UserValidation} from '../models'

export class UserControoler implements IControllerBase{
  
    public path = '/'
    public router = express.Router();
    public userDataManager:IUserDataManager;
    
    constructor(){
        this.initRouter();
        this.userDataManager=new userDataManager();
    }
    initRouter(){
        this.router.post('/user', this.index)
    }
    index = async (req: Request, res: Response) => {
        const data = req.body;
        const {error} = UserValidation(data);
        if(error){
            res.status(400).send({message:error.details[0].message})
        }
        try{
            await this.userDataManager.addUser({...data})
        }catch(error){
           return res.status(401).send({message:error.message})
        }
        return res.status(200).send({success:true})
    }

}

