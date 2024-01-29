import { CategoryModel } from './../models/Category.model';
import { Request, Response, NextFunction } from 'express'


export async function PostCategoryController(req: Request, res: Response, next: NextFunction) {
    try {
    const newCat = await CategoryModel.create(req.body);

    if (newCat) {
        return res.status(200).send({ con: true, msg: "Your category is saved" });
    } else {
        return res.status(400).send({con:false,msg:"Your category is not saved "})
    }
    } catch (e: any) {
        return res.status(500).send({ con: false, msg: `${e}` });
}    
   

}

export async function GetAllCategoriesController(req: Request, res: Response, next: NextFunction) {
    try {
          let result = await CategoryModel.find();

    if (result) {
     return  res.status(200).send({ con: true, msg: "Here is all of your categories", result: result });
    } else {
          return  res.status(200).send({ con: false, msg: "No categories "});
    }
     } catch (e: any) {
        return res.status(500).send({ con: false, msg: `${e}` });
}    
   
}