import * as mongoose from 'mongoose';
import Joi, * as joi from 'joi';

export interface User {
     _id:string;
     email:string; 
     firstName:string;
     lastName:string;
}
export function UserValidation(data:object):Joi.ValidationResult {
    const schema = Joi.object({ 
        email:joi.string().email().required(),
        firstName:joi.string().required(),
        lastName:joi.string().required(),
    })
    return schema.validate(data)
}
export const UserSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        index:true,
    },
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
})