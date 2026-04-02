import type { Request, Response } from "express";

export const receivelog = async (req: Request, res: Response) => {
  console.log({
    eventLog: req.body,
    publicApiKey: req.headers["x-api-key"]
  })
  res.status(200).json({
    success: true,
    eventLog: req.body,
    publicApiKey: req.headers["x-api-key"]
  })
}