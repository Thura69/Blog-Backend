import { UserModel } from "../models/User.model";
import { UserInput } from "../models/User.model";

export async function UserSaveServices(qurey: UserInput) {
    try {
         return await UserModel.create(qurey);
    } catch (e:any) {
        throw new Error(e)
    }
   
}

export async function IsUserServices(name: object) {
    try {
        let result = await UserModel.findOne(name);
    return result
    } catch(e:any) {
    throw new Error(e)
}
}

export async function IsUserWithId(id: string) {
    try {
          return await UserModel.findById(id);
    }catch(e:any){throw new Error(e)}
  
}

export async function UpdateUserServices(id: string, body: object) {
    try {
         return await UserModel.findByIdAndUpdate(id, body).select('-password');
    } catch (e:any) { throw new Error(e) };
   
}

export async function DeleteUserServices(id: string) {
    try {
         return await UserModel.findByIdAndDelete(id);
    } catch (e:any) { throw new Error(e) };
   
}