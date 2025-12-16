import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

interface RequestWithUser extends Request {
  user?: any;
}

const authMiddleware = (req: RequestWithUser, res: Response, next: NextFunction) => {
  const header = req.headers.authorization;

  if (!header) return res.status(401).json({ message: "No token Received" });

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};


export default authMiddleware;