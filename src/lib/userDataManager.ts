import {DBConnection} from '../lib/database';
import {User,UserSchema} from '../models/index'

export interface IUserDataManager{
    addUser(user:User):Promise<void>
    findUser(_id:string):Promise<void>
    findByEmail(email:string):Promise<User>

}
export class userDataManager implements IUserDataManager{   
    protected connection:any;
    
    public async init():Promise<void>{
        this.connection = await DBConnection.getCollection("user",UserSchema)
    }
    public async addUser(user:User):Promise<void>{
        await this.init();
        return await this.connection.create({...user})
    }
    public async findUser(_id:string):Promise<void>{
        await this.init();
        return await this.connection.findOne({_id})

    }
    public async findByEmail(email:string):Promise<User>{
        await this.init();
        return await this.connection.findOne({email})

    }    

}