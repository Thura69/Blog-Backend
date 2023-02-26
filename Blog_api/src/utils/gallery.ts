import fs from 'fs';
import {Request,Response,NextFunction} from 'express';
import fileUpload from 'express-fileupload';

export async function SaveSingleFile(req: Request, res: Response, next: NextFunction) {
    



    let filename: any = req.files?.file;
    if (filename) {
        let fileMv = filename.mv;
    filename = filename.name;
    filename = filename;
    fileMv(`./src/images/${filename}`);
    next();
    } else {
        next();
    }
} 