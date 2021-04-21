import { Request, Response } from "express";

export const pingGet = (req: Request, res: Response) => {
  res.status(204).end();
};

export const pingPost = (req: Request, res: Response) => {
  res.status(204).end();
};
