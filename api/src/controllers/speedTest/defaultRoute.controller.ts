import { Request, Response } from "express";

// Default route
export const defaultRoute = async (req: Request, res: Response) => {
  res.status(200).json({
    msg: "🚀 Welcome speedTest data !",
  });
};