import mongoose from "mongoose";
import { Schema } from 'mongoose';


export interface CategoryInput {
   name:string
}

export interface CategoryDocument extends CategoryInput, mongoose.Document{
    createdAt: Date,
    updatedAt:Date
}

const CategorySchema = new Schema({
   name:{type:String,required:true} 
},
    {
    timestamps:true
})

export const CategoryModel = mongoose.model<CategoryDocument>("CategoryModel", CategorySchema);