import mongoose, { ConnectionOptions} from 'mongoose';
import config from '../config/config';

export class DBConnection {
    static connection:any; 
    static connectMong = mongoose.connection;
    static dbOptions: ConnectionOptions = {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        user: config.DB.USER,
        pass: config.DB.PASSWORD
      };
    public static async getCollection(name:string,Schema:any){
        
        if(!DBConnection.connection || !DBConnection.connectMong.readyState){
            await this.connect();
        }
        const model = await mongoose.model(name, Schema);
        return model;
    }
    public static async connect(){
        DBConnection.connection =  await mongoose.connect(config.DB.URI, this.dbOptions)
       
        DBConnection.connectMong.on('error',err=>{
            console.log(err)
        })
        DBConnection.connectMong.once('open',()=>{
            console.log("Mongodb connection stablish")
        })

    }
}