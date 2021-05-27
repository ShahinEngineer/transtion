import {DBConnection} from '../lib/database';
import {Transaction,TransactionSchema} from '../models/index'
import {exchangeRates,threshold} from '../data/index';

export interface IDataManager{
    addTransaction(transaction:Transaction):Promise<void>
    getAllTransactionByUserId(userId:string):Promise<Transaction[]>
    transferTransaction(currency:string,countryCode:string,value:number):{decision:string,transferValue:number}
}
export class DataManager implements IDataManager{   
    protected connection:any;
    
    public async init():Promise<void>{
        this.connection = await DBConnection.getCollection("transaction",TransactionSchema)
    }
    public async addTransaction(transaction:Transaction):Promise<void>{
        await this.init();
        return await this.connection.create({...transaction})
    }
    public async getAllTransactionByUserId(userId:string):Promise<Transaction[]>{
        await this.init()
        return await this.connection.find({userId}).sort({date: 'desc'})
    }
    public transferTransaction(currency:string,countryCode:string,value:number):{decision:string,transferValue:number} {
        let transferValue = 0;
        let decision = "";
        if(exchangeRates[currency]){
            transferValue = Number(exchangeRates[currency]) * value;
            if(threshold[countryCode]) {
                decision = transferValue > threshold[countryCode] ? "reject" : "approved";
            } else {
                throw `ther is no threshold for this country value ${countryCode}`
            }
        }
        return {transferValue,decision}
    }
}