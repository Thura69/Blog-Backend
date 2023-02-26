import { NextFunction } from 'express';
import mongoose from "mongoose";
import { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import config from 'config';

export interface UserInput {
    username: string,
    email: string,
    password: string,
    profilePic: string,
}

export interface UserDocument extends UserInput, mongoose.Document{
    createdAt: Date,
    updatedAt: Date,
    comparePassword (candidatePassword: string):Promise<Boolean>
}

const UserSchema = new Schema({
    username: { type: String, required: true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePic:{type:String,default:''}
}, {
    timestamps:true
})

UserSchema.pre("save", async function (next) {
    let user = this as UserDocument;



    if (!user.isModified('password')) {
        return next();
    }

    const salt = await bcrypt.genSalt(config.get<number>('saltGenerate'));
    const hash = bcrypt.hashSync(user.password, salt);

    if (hash) {
        user.password = hash;
        next();
    } 
})

UserSchema.methods.comparePassword = async function (candidatePassword:string):Promise<Boolean> {
    let user = this as UserDocument;
    
    return bcrypt.compare(candidatePassword, user.password);
}

export const UserModel = mongoose.model<UserDocument>("UserModel", UserSchema);