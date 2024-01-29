import express from 'express'
import mongoose from 'mongoose';
import config from 'config';
import { Connect } from '../src/utils/connect';
import { Routes } from '../src/routes';
import fileUpload from 'express-fileupload'
import {Request,Response,NextFunction} from 'express'
import { swagger } from '../src/utils/swagger';
import  multer  from 'multer';
import path from 'path';
import { SaveSingleFile } from '../src/utils/gallery';
import cors from 'cors';
import serverless from 'serverless-http';


Connect();

const app = express();
app.use(express.json());
app.use(fileUpload());
app.use("/images", express.static(path.join(__dirname, "/images")));

app.use(cors());


const router = express.Router();
router.post("/upload", SaveSingleFile, (req, res) => {
  res.status(200).json("File has been uploaded");
});


router.get('/', (req, res) => {
  res.send('App is running..');
});

//routes
Routes(router);


app.use('/', router);
swagger(app);


module.exports.handler = serverless(app);

// app.listen(3004, () => {
//     console.log("Server is now running");
//     Connect();
//     swagger(app);
//     Routes(app);
// });

