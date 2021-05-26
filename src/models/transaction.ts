import * as mongoose from 'mongoose';
import Joi, * as joi from 'joi';

export interface Transaction{
     date: Date;
     countryCode:String;
     currency:String;
     OrginValue:Number ;
     transferValue:Number;
     descisition:String;
     userId:String;

}
export function TransactionValidation(data:object):Joi.ValidationResult {
    const schema = Joi.object({ 
        currency:joi.string().required(),
        value:joi.number().required(),
        countryCode:joi.string().required(),
        userId:joi.string().required()
    })
    return schema.validate(data)
}
export function TransactionEmailValidation(data:object):Joi.ValidationResult {
    const schema = Joi.object({ 
        email:joi.string().email().required(),
    })
    return schema.validate(data)
}
export const TransactionSchema = new mongoose.Schema({
    date:{
        type:Date,
        required:true,
        index:true,
        default:Date.now
    },
    countryCode:{
        type:String,
        required:true,
    },
    currency:{
        type:String,
        required:true,
    },
    OrginValue:{
        type:Number,
        required:true,
    },
    transferValue:{
        type:Number,
        required:true,
    },
    decision:{
        type:String,
        required:true,
    },
    userId:{
        type:String,
        required:true,
        index:true,
    }
})