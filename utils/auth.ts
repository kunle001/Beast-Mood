import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import AppError from "../utils/appError";
import {catchAsync} from "../utils/catchAsync";
import User from "../models/user.model";

interface TokenPayload {
  userId: string;
  roles: string[];
  email: string;
}

const generateToken = (userId: string, roles: string[], email: string) => {
  const payload: TokenPayload = { userId, roles, email };
  const jwtSecret = process.env.JWT_SECRET || "";
  const token = jwt.sign(payload, jwtSecret, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  return token;
};

const authenticate = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      res.status(401);
      throw new AppError('You are not login, please log in', 401);
    }

    const jwtSecret = process.env.JWT_SECRET || "";
    const decoded = jwt.verify(token, jwtSecret) as JwtPayload;

    if (!decoded || !decoded.userId) {
      throw new AppError("Not authorized, userId not found", 401);
    }

    const currentUser = await User.findById(decoded.userId);

    if (!currentUser) {
      throw new AppError("Not authorized, doesnt exists", 401);
    }

    req.user = currentUser;

  next();
});

const authorizedUser = (allowedRoles: string[]) => {
  return catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    const userRoles = req.user?.roles;

    if(!userRoles || !userRoles.some((roles:string) => allowedRoles.includes(roles))){
      throw new AppError("You lack the authorization for this action", 403);
    }
    next();
  });
};


//add token tocookie
const addTokonToCookie = (res:any, userId: string, roles: string[], email: string) => {
  const token = generateToken(userId, roles, email);
  const jwtSecret = process.env.JWT_SECRET || "";
  const date = new Date();
  const daysToAdd = 5;
  res.cookie("token", token, jwtSecret,{
    httpOnly: false,
    expire: new Date(date.getTime() + daysToAdd * 24 * 60 * 60 * 1000), // Adding 5 days to the current date.
    secure: true,
    signed: true,
  });
};

const clearToken = (res: Response) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });
};

export { generateToken, clearToken, authenticate, addTokonToCookie, authorizedUser};