import type { Request, Response } from "express";

export const receivelog = async (req: Request, res: Response) => {

  let io = req.app.get("io")
  if(io){
    io.emit("new-event",req.body)
  }
  console.log(req.body)
  res.status(200).json({
    success: true,
    eventLog: req.body,
    publicApiKey: req.headers["x-api-key"]
  })
}