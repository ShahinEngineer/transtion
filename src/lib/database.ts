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
        if(!this.connection || !this.connectMong.readyState){
            await this.connect();
        }
        const model = await mongoose.model(name, Schema);
        return model;
    }
    public static async connect(){
        this.connection =  await mongoose.connect(config.DB.URI, this.dbOptions)
        .then(() => console.log('Connected to MongoDB...'))
        .catch(err => console.error('Could not connect to MongoDB...'));
       
        this.connectMong.on('error',err=>{
            console.log(err)
        })
        this.connectMong.once('open',()=>{
            console.log("Mongodb connection stablish")
        })
    }
}