import { NextFunction, Request, Response } from 'express';
import config from '../config';

export const validateApiKey = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.headers['x-api-key'])
    return res.status(401).json({ status: 'error', error: 'Unauthorized' });

  if (req.headers['x-api-key'] !== config.security.apiKey)
    return res.status(401).json({ status: 'error', error: 'Unauthorized' });

  next();
};
