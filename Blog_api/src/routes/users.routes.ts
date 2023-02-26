import { UserUpdateSchema, UserGetSchema } from './../schema/user.schema';
import { Express } from 'express';
import { UserDeleteController, UserGetController, UserLoginController, UserSaveController, UserUpdateController } from '../controllers/usreController';
import { ValidateResource } from '../middlewares/ValidateResource';
import { UserLoginSchema, UserSchema } from '../schema/user.schema';

export function UsersRoute(app: Express) {
  
  //Register
  /**
   * @openapi
   *  /user/register:
   *   post:
   *    tags:
   *      - user:
   *    summary: User Register
   *    description: This will return user 
   *    requestBody:
   *     required: true
   *     content: 
   *       multipart/form-data:
   *        schema:
   *         $ref: '#/components/schemas/userInputRegister'
   *    responses:
   *       200:
   *        description: Success
   *        content:
   *          application/json:
   *             schema:
   *               $ref: '#/components/schemas/userOutputRegister'
   *       400:
   *        description: Error
   *        content:
   *          application/json:
   *             schema:
   *               $ref: '#/components/schemas/userError'
   *          
   */
  app.post("/user/register", ValidateResource(UserSchema), UserSaveController);

  /**
   * @openapi
   *  /user/login:
   *    post:
   *     tags:
   *      - user:
   *     summary: Login User
   *     description: will return login user
   *     requestBody:
   *       required: true
   *       content:
   *         multipart/form-data:
   *            schema:
   *               $ref: '#/components/schemas/userLoginInput'
   *     responses:
   *      200:
   *       description: Success
   *       content:
   *         application/json:
   *            schema:
   *              $ref: '#/components/schemas/userOutputLogin'
   *      400:
   *       description: Error
   *       content:
   *         application/json:
   *            schema:
   *              $ref: '#/components/schemas/userError'
   *             
   *     
   */
  //Login
  app.post("/user/login",ValidateResource(UserLoginSchema),UserLoginController);

  /**
   * @openapi
   *  /user/{id}:
   *   put:
   *    tags:
   *     - user:
   *    summary: Update user
   *    description: will return update user
   *    parameters:
   *     - name: id
   *       in: path
   *       type: string
   *    requestBody:
   *     content:
   *       multipart/form-data:
   *        schema:
   *           $ref: '#/components/schemas/userUpdate'
   *    responses:
   *       200:
   *        description: Success
   *        content:
   *          application/json: 
   *             schema:
   *               $ref: '#/components/schemas/userOutputLogin'
   *       400:
   *        description: Error
   *        content:
   *          application/json:
   *             schema:
   *               $ref: '#/components/schemas/userError'
   *     
   */
  //Update
  app.put('/user/:id', UserUpdateController);

  /**
   * @openapi
   *  /user/{id}:
   *  delete:
   *    tags:
   *     - user:
   *    summary: Delete User
   *    description: return nothing
   *    parameters:
   *       - name: id
   *         in: path
   *         type: string
   *    responses:
   *     200:
   *      description: Success
   *     400:
   *      description: User not found
   */
  //Delete
  app.delete('/user/:id', ValidateResource(UserUpdateSchema), UserDeleteController);

  /**
   * @openapi
   *  /user/{id}:
   *   get:
   *    tags:
   *     - user:
   *    summary: get a user
   *    description: Will return a user
   *    parameters:
   *       - name: id
   *         in: path
   *         type: string
   *    responses:
   *      200:
   *       description: Success
   *       content:
   *          application/json:
   *             schema:
   *                $ref: '#/components/schemas/userOutputRegister' 
   *      400:
   *       description: User Not found
   *       content: 
   *          application/json:
   *             schema:
   *               $ref: '#/components/schemas/userError'
   */    
  //Get
  app.get('/user/:id',ValidateResource(UserGetSchema),UserGetController)

}