import { object, string } from "zod"


export const CreateCategorySchema = object({
    body: object({
        name:string({required_error:"Category name is required"})
    })
})