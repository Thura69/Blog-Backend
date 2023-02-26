import { body } from 'express-validator';
import { UserModel } from './../models/User.model';
import { Request, Response, NextFunction } from 'express';
import { DeleteUserServices, IsUserServices, IsUserWithId, UpdateUserServices, UserSaveServices } from '../services/User.service';
import bcrypt from 'bcrypt'
import config, { has } from 'config';
import { PostModel } from '../models/Post.model';

export async function UserSaveController(req: Request, res: Response, next: NextFunction){
    let isUser = await IsUserServices({ email: req.body.email });


    if (isUser) {
      res.status(400).json({con:false,msg:"User is email already existed"})  
    } else {
        let result = await UserSaveServices(req.body);
    
    if (result) {
        res.status(200).json({con:true,msg:result});
    } else {
        res.status(500).json({con:false,msg:"Can't save that user"})
    }
    }

    

}


export async function UserLoginController(req: Request, res: Response, next: NextFunction) {


    let isUser = await IsUserServices({ username: req.body.username });

    if (isUser) {
        let isSame = await isUser.comparePassword(req.body.password);

         
        if (isSame) {
            isUser = await UserModel.findOne({ username: req.body.username }).select('-password');
           
            if (isUser) {
                return res.status(200).send({con:true,msg:`Login is success welcome ${isUser.username}`,result:isUser})
            }

            
        } else {
            return res.status(400).send({con:false,msg:"Password is wrong"})
        }

    } else {
        return res.status(404).json({con:false,msg:"User is not found email or password is something wrong"})
    }
    
}

export async function UserUpdateController(req: Request, res: Response, next: NextFunction) {
    
    let isUser = await IsUserWithId(req.params.id);
     


    if (isUser) {
           
        if (req.body.password) {
             const salt = await bcrypt.genSalt(config.get<number>('saltGenerate'));
        const hash = bcrypt.hashSync(req.body?.password, salt);

        req.body.password = hash;
         }
            
        
            const updateUser = await UpdateUserServices(req.params.id, req.body);
           
        
        
        if (updateUser) {
            

                return res.status(200).send({con:true,msg:"Your update is success",result:updateUser})
            }
            
    
        
    } else {
        return res.status(404).send({ con: false, msg: "User with that Id is not" });
    }

}

export async function UserDeleteController(req: Request, res: Response, next: NextFunction) {

    let isUser = await IsUserWithId(req.params.id);
     
    

    if (isUser) {
        if (req.body.userId === req.params.id) {

            await PostModel.deleteMany({ username: req.body.userName });
             
            const DeleteUser = await DeleteUserServices(req.params.id);

            if (DeleteUser) {
                return res.status(200).send({con:true,msg:"Your Delete is success"})
            }
            
    }
        
    } else {
        return res.status(404).send({ con: false, msg: "User with that Id is not" });
    }

}

export async function UserGetController(req: Request, res: Response, next: NextFunction) {
    let isUser = await IsUserWithId(req.params.id);
    
    if (isUser) {

        return res.status(200).send({ con: true, msg: "Your user with Id is here",result:isUser })
        
    } else {
         return res.status(404).send({ con: false, msg: "User with that Id is not" });
    }
}

