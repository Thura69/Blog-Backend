import { number, object, string } from 'zod'

/**
 * @openapi
 *   components:
 *      schemas:
 *        userInputRegister:
 *           type: object
 *           properties:
 *             username:
 *               type: string
 *             email:
 *               type: string
 *             password:
 *               type: string
 *        userOutputRegister:
 *           type: object
 *           properties:
 *             con:
 *               type: boolean
 *             msg:
 *               type: string
 *             result:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   username:
 *                      type: string
 *                   email:
 *                      type: string
 *                   password:
 *                      type: string
 *                   profilePic:
 *                      type: string
 *                   _id:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                   updateAt:
 *                     type: string
 *                   __v:
 *                     type: integer
 *        userError:
 *           type: object
 *           properties:    
 *             con:
 *              type: boolean
 *             msg:
 *              type: string
 *             result:
 *              type: array
 *              items:
 *                type: string
 *              example: [ ]
 *        userLoginInput:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                type: string
 *        userOutputLogin:
 *           type: object
 *           properties:
 *             con:
 *               type: boolean
 *             msg:
 *               type: string
 *             result:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   username:
 *                      type: string
 *                   email:
 *                      type: string
 *                   profilePic:
 *                      type: string
 *                   _id:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                   updateAt:
 *                     type: string
 *                   __v:
 *                     type: integer    
 *        userUpdate:
 *             type: object
 *             properties:
 *               username:
 *                  type: string
 *               email:
 *                  type: string
 */       

export const UserSchema = object({
    body: object({
    username:string({required_error:"User name is required"}),
    email:string({required_error:"Email is required"}).email("Email should be valid"),
    password:string({required_error:"Password is required"}),
    })
})


export const UserLoginSchema = object({
    body: object({
        username:string({required_error:"Username is required"}),
        password:string({required_error:"Password is required"}),
    })
})

export const UserUpdateSchema = object({
    body: object({
        userName:string({required_error:"User Name is required"}),
        password:string({required_error:"Password is required"}),
    }),
    params: object({
        id:string({required_error:"id is required"})
    })
})

export const UserGetSchema = object({
     params: object({
        id:string({required_error:"id is required"})
    })
})