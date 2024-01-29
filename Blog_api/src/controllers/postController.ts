import { PostModel } from './../models/Post.model';
import {Request,Response,NextFunction} from 'express'
import { Result } from 'express-validator';


export async function PostCreateController(req: Request, res: Response, next: NextFunction) {
    try {
            let isTitle = await PostModel.findOne({ title: req.body.title });

    if (isTitle) {
        return res.status(400).send({ con: false, msg: "Your title is already existed" });
    }

    let result = await PostModel.create(req.body);

    if (result) {
        return res.status(200).send({ con: true, msg: "Your Post is save", result: result });
    } else {
        return res.status(400).send({con:false,msg:"Your Post is not save"})
    }
       } catch (e: any) {
        return res.status(500).send({ con: false, msg: `${e}` });
}    
}

export async function PostUpdateController(req: Request, res: Response, next: NextFunction) {
    try {
       let isPost = await PostModel.findById(req.params.id);
    if (isPost) {
    
        if (isPost.id === req.params.id) {
          
            let sameTitle = await PostModel.findOne({ title: req.body.title });



            if (!sameTitle) {

                 let result = await PostModel.findByIdAndUpdate(req.params.id, req.body);

            result = await PostModel.findById(result?.id);

            if (result) {
                return res.status(200).send({con:true,msg:"Your post is successfully updated",result:result})
            }
            } else {
                return res.status(400).send({ con: false, msg: "Title is already existed" });
            }
        
        } else {
            return res.status(400).send({con:false,msg:"Your can only update your own post"})
    }
        
    }
  } catch (e: any) {
        return res.status(500).send({ con: false, msg: `${e}` });
}    
}

export async function PostDeleteController(req: Request, res: Response, next: NextFunction) {
    try {
       let isPost = await PostModel.findById(req.params.id);
    

    if (isPost) {

    
        if (isPost.id === req.params.id) {
          
            let result = await PostModel.findByIdAndDelete(req.params.id);

           

            if (result) {
                return res.status(200).send({con:true,msg:"Your post is successfully delete",result:result})
            }
        
        } else {
            return res.status(400).send({con:false,msg:"Your can only update your own post"})
    }
        
    }
  } catch (e: any) {
        return res.status(500).send({ con: false, msg: `${e}` });
}    
}

export async function GetOneController(req: Request, res: Response, next: NextFunction) {
    try {
       let isPost = await PostModel.findById(req.params.id);
    
    if (isPost) {
        return res.status(200).send({ con: true, msg: "Post with that id is here", result:isPost},)
    }

    return res.status(404).send({con:false,msg:"Post with that id is not found"})
   } catch (e: any) {
        return res.status(500).send({ con: false, msg: `${e}` });
}    
    
}

export async function GetAllController(req: Request, res: Response, next: NextFunction) {
    try {
        const username = req.query.user;
    const catName = req.query.cat;

    let posts:any;

    if (username) {
        posts = await PostModel.find({ username });
    } else if (catName) {
        posts = await PostModel.find({
            categories: {
            $in:[catName]
        }})
    } else {
        posts = await PostModel.find();
    }

    return res.status(200).send({ con: true, msg: "Here is all of your posts", result: posts });
   } catch (e: any) {
        return res.status(500).send({ con: false, msg: `${e}` });
}    
   

}