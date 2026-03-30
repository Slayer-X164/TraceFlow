import type { Request, Response } from "express";

export const receivelog = async (req:Request,res:Response) => {

  console.log("Received Logs ",req.body)

  res.status(200).json({
    success:true
  })
}