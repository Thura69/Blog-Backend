import { UserModel } from "../models/User.model";
import { UserInput } from "../models/User.model";

export async function UserSaveServices(qurey:UserInput) {
    return await UserModel.create(qurey);
}

export async function IsUserServices(name: object) {
    


   let result = await UserModel.findOne(name);
    


    
    return result
}

export async function IsUserWithId(id: string) {
    return await UserModel.findById(id);
}

export async function UpdateUserServices(id: string, body: object) {
    return await UserModel.findByIdAndUpdate(id, body).select('-password');
}

export async function DeleteUserServices(id: string) {
    return await UserModel.findByIdAndDelete(id);
}