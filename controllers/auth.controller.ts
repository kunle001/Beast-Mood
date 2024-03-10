import { Request, Response } from "express";
import User from "../models/user";
import { generateToken, clearToken } from "../utils/auth";
import { sendSuccess } from "../utils/response";
import AppError from "../utils/appError";
import catchAsync from "../utils/catchAsync";


class AuthController {
  public Register = catchAsync(async(req: Request, res: Response) =>{
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
  
    if (userExists) {
      throw new AppError("The user already exists", 409);
    }
  
    const user = await User.create({
      name,
      email,
      password,
    });
  
    if (user) {
      generateToken(res, user._id);
      console.log(user)
      return sendSuccess(res, 201, user);
    } else {
      throw new AppError("The user already exists", 400);
    }
  });


  public Login = catchAsync(async(req: Request, res: Response) => {

    const {email, password} = req.body;
    const user = await User.findOne({email})

    if(user && (await user.comparePassword(password))){
      generateToken(res, user._id)
      return sendSuccess(res, 200, user);
    }
    else{
      throw new AppError("User not found / password incorrect", 400);
    }
  })

  public logOut = (req: Request, res: Response) => {
    clearToken(res);
    return sendSuccess(res, 200, "User logged out");
  };

}

export default AuthController;