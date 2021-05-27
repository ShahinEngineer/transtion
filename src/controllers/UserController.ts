import {IControllerBase} from './IController';
import express,{ Request, Response } from 'express'
import {userDataManager,IUserDataManager} from '../lib/index'
import {UserValidation} from '../models'

export class UserController implements IControllerBase{
  
    public path = '/'
    public router = express.Router();
    public userDataManager:IUserDataManager;
    
    constructor(){
        this.initRouter();
        this.userDataManager=new userDataManager();
    }
    initRouter(){
        this.router.post('/users', this.index)
    }
    index = async (req: Request, res: Response) => {
        const data = req.body;
        const {error} = UserValidation(data);
        if(error){
           return res.status(400).json({message:error.details[0].message})
        }
        try{
            await this.userDataManager.addUser({...data})
        }catch(error){
           return res.status(401).json({message:error.message})
        }
        return res.status(200).json({success:true})
    }

}

