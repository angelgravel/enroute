import { Request, Response } from "express";
import { APIError } from "../utils/APIError";

import { errorMessages } from "../utils/constants";

export const getAuth = (req: Request): string | undefined =>
  req.headers.authorization;

const verifyIdToken = async (gameToken: string): Promise<boolean> => {
  throw new APIError(
    errorMessages.notImplemented.message,
    errorMessages.notImplemented.status,
  );
};

const tokenValidatorMiddleware = async (
  req: Request,
  res: Response,
  next: () => void,
) => {
  const gameToken = getAuth(req);

  if (!gameToken) {
    return res
      .status(errorMessages.noToken.status)
      .json({ message: errorMessages.noToken.message });
  }

  try {
    if (await verifyIdToken(gameToken)) {
      req.query._gameToken = gameToken;
      return next();
    } else {
      return res
        .status(errorMessages.invalidToken.status)
        .json({ message: errorMessages.invalidToken.message });
    }
  } catch (_error) {
    const error: APIError = _error;
    error.status && error.message
      ? res.status(error.status).json({ message: error.message })
      : res.status(500).end();
  }
};

export default tokenValidatorMiddleware;
