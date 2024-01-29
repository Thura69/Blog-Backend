import { PostModel } from './../models/Post.model';
 import { Express, Router } from 'express';
import { GetAllController, GetOneController, PostCreateController, PostDeleteController, PostUpdateController } from '../controllers/postController';
import { ValidateResource } from '../middlewares/ValidateResource';
import { PostGetOneSchema, PostSchema, PostUpdateSchema } from '../schema/post.schema';
import { SaveSingleFile } from '../utils/gallery';

export function PostsRoute(app: Router) {
 
/**
 * @openapi
 *   /post:
 *     post:
 *      tags:
 *       - Post
 *      summary: create Post
 *      description: will return post
 *      requestBody:
 *        required: true
 *        content:
 *          multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               desc:
 *                 type: string
 *               username:
 *                 type: string
 *      responses:
 *           200:
 *            description: Success 
 *            content:
 *               application/json:
 *                  schema:
 *                     $ref: '#/components/schemas/postInputOutput'
 *           400:
 *            description: Error
 *            content:
 *               application/json:
 *                  schema:
 *                    $ref: '#/components/schemas/userError'
 * 
 *               
 */
//Create Post
    app.post('/post',PostCreateController);
/**
 * @openapi
 *  /post/{id}:
 *    put:
 *     tags:
 *      - Post
 *     summary: update post
 *     description: will retrun post
 *     parameters:
 *         - name: id
 *           in: path
 *           type: string
 *     requestBody:
 *        required: true
 *        content:
 *          multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               desc:
 *                 type: string
 *               username:
 *                 type: string
 *     responses:
 *          200:
 *           description: Success
 *           content:
 *               application/json:
 *                  schema:
 *                     $ref: '#/components/schemas/postInputOutput'
 *          400:
 *           description: User not found
 *           content:
 *               application/json:
 *                  schema:
 *                    $ref: '#/components/schemas/userError'
 */
//Update Post 
   app.put('/post/:id',PostUpdateController)    

/**
 * @openapi
 *   /post/{id}:
 *     delete:
 *       tags:
 *        - Post
 *       summary: delete Post
 *       description: return nothing
 *       parameters:
 *         - name: id
 *           in: path
 *           type: string
 *       responses:
 *         200:
 *          description: Success
 *         400:
 *          description: User Not found
 *          content:
 *               application/json:
 *                  schema:
 *                    $ref: '#/components/schemas/userError'
 */
//Delete Post
    app.delete('/post/:id', PostDeleteController)
 /**
  * @openapi
  *   /post/{id}:
  *     get:
  *      tags:
  *       - Post
  *      summary: Get one
  *      description: will return one post
  *      parameters:
  *       - name: id
  *         in: path
  *         type: string
  *      responses:
  *         200:
  *          description: Success
  *          content:
  *             application/json:
  *                schema:
  *                  $ref: '#/components/schemas/postInputOutput'
  *         400:
  *          description: User Not found
  *          content:
  *               application/json:
  *                  schema:
  *                    $ref: '#/components/schemas/userError'
  *  */   
//Getone Post
    app.get('/post/:id', GetOneController)
    
/**
 * @openapi
 *  /post:
 *   get:
 *    tags:
 *     - Post
 *    summary: Get all posts
 *    description: will return all posts
 *    responses:
 *      200:
 *       description:
 *       content:
 *             application/json:
 *                schema:
 *                  $ref: '#/components/schemas/postInputOutput'
 */
//GetAll Post
    app.get('/post', GetAllController);


//posts get by user
    app.get('/posts/:username',async (req, res, next) => {
        console.log(req.params);

        const response = await PostModel.find({ username: req.params.username });

        if (response) {
               res.status(200).send({con:true,message:"Posts by username",result:response});
        } else {
            res.status(404).send({ con: false, message: "Not found posts" });
        }

     
    })

}