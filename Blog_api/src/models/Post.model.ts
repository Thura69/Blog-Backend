import { ObjectId } from "mongodb";
import mongoose from "mongoose";
import { Schema } from 'mongoose';


export interface PostInput {
    title: string,
    desc: string,
    photo: string,
    username: string,
    categories:string[],
}

export interface PostDocument extends PostInput, mongoose.Document{
    createdAt: Date,
    updatedAt:Date
}

const PostSchema = new Schema({
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    photo: { type: String, required: false},
    username: { type: String, required: true },
    categories: { type: Array, required: false },
    
     
    
},
    {
    timestamps:true
})

export const PostModel = mongoose.model<PostDocument>("PostModel", PostSchema);