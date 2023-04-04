import mongoose, { Schema, model,models,Model }  from "mongoose";
//interface repres a doc in mongoDb
interface IUser{
    user_name:string;
    email:string;
    phone:string;
    password:string;
}
const AdminUserSchema=  new Schema<IUser>({
    user_name:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    password:{
        type: String,
        required: true,
        min:6
    },

},{timestamps:true}) 
export default (models.AdminUser
    ? models.AdminUser
    : model("AdminUser", AdminUserSchema)) as Model<IUser>;
    
  

