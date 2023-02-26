import express from 'express'
import mongoose from 'mongoose';
import config from 'config';
import { Connect } from './utils/connect';
import { Routes } from './routes';
import fileUpload from 'express-fileupload'
import {Request,Response,NextFunction} from 'express'
import { swagger } from './utils/swagger';
import  multer  from 'multer';
import path from 'path';
import { SaveSingleFile } from './utils/gallery';
import cors from 'cors';


const app = express();
app.use(express.json());
app.use(fileUpload());
app.use("/images", express.static(path.join(__dirname, "/images")));

app.use(cors());

app.post("/upload", SaveSingleFile, (req, res) => {
   
  res.status(200).json("File has been uploaded");
});




app.listen(3004, () => {
    console.log("Server is now running");
    Connect();
    swagger(app);
    Routes(app);
   
});

