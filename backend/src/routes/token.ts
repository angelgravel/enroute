import { Request, Response } from "express";

export const getGameToken = (req: Request, res: Response) => {
  return res.status(200).json({ gameToken: req.query._gameToken });
};
