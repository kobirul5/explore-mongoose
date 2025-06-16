import express, { Request, Response } from "express"

export const userRouters = express.Router()

userRouters.get('/', (req : Request, res: Response)=>{

    res.status(201).json({
        success: true,
        massage: "Get All Users"
    })
})