import type { Request, Response } from "express";

export const receivelog = async (req: Request, res: Response) => {
  console.log(req.body)
  res.status(200).json({
    success: true,
    eventLog: req.body,
    publicApiKey: req.headers["x-api-key"]
  })
}