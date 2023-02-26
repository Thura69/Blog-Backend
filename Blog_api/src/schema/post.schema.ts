import { string, number, object } from 'zod'

/**
 * @openapi
 *  components:
 *     schemas:
 *       postInputOutput:
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
 *                   title:
 *                      type: string
 *                   desc:
 *                      type: string
 *                   photo:
 *                      type: string
 *                   username:
 *                      type: string                    
 *                   categories:
 *                      type: array
 *                      items:
 *                       type: string
 *                      example: []    
 *                   _id:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                   updateAt:
 *                     type: string
 *                   __v:
 *                     type: integer
 */
export const PostSchema = object({
    body: object({
    title:string({required_error:"Title is required"}),
    desc:string({required_error:"Description is required"}),
    username: string({required_error:"User name is required"}),
    })
})

export const PostUpdateSchema = object({
    body: object({
    title:string({required_error:"Title is required"}),
    desc:string({required_error:"Description is required"}),
    username: string({required_error:"User name is required"}),
   }),
    params: object({
    id:string({required_error:"Post Id is required"})
    })
})

export const PostGetOneSchema = object({
     params: object({
    id:string({required_error:"Post Id is required"})
    })
})