
import { Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcryptjs";
import { generateToken, clearToken } from "../utils/auth";
import { sendSuccess } from "../utils/response";
import AppError from "../utils/appError";
import {catchAsync} from "../utils/catchAsync";
import passLink from '../email_handler/resetPassword.template';
import {sendOTPemail, RegisterSuccessEmail }  from "../email_handler/otpEmailCalls";
import {createTokenUser} from '../utils/createTokenUser';
import UserOTPRecord from "../models/userOtpRecord.model";


class AuthController {
  public Register = catchAsync(async(req: Request, res: Response) =>{
    let { name, email, password } = req.body;
    email = email?.trim();
    password = password?.trim();

    if (email == "") {
      throw new AppError("Pls Enter Your Email", 401);
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      throw new AppError("Email is Invalid", 401);
    } else if (password.length < 6) {
      throw new AppError("Password should be at least 6 Characters", 401);
    }

    const userExists = await User.findOne({ email });
  
    if (userExists) {
      throw new AppError("The user already exists", 409);
    }
  
    const user = await User.create({
      name,
      email,
      password
    });
  
    if (user) {
     await generateToken(user._id);

      // Send OTP email for user to Verify his email and also create new OTP Record in DB
      await sendOTPemail(user,  UserOTPRecord);

      return sendSuccess(res, 201, {message:"Check your email for a verification otp!", user})

    } else {
      throw new AppError("The user already exists", 400);
    }
  });

  public verifyotp = catchAsync(async(req: Request, res: Response) => {
    let { userId, otp } = req.body;
      otp = otp.trim();

      // validate input.

      if (!otp) {
        throw new AppError("Please provide OTP to proceed", 403);
      } else if (!userId) {
        throw new AppError( "Register to get an OTP ", 401 );
      } else {
        // verify the user
        const userOTPrecords = await UserOTPRecord.find({ userId });

        if (userOTPrecords.length <= 0) {
          throw new Error("Account is Invalid or Already Verified");
        } else {
          // check expiry of OTP
          const { expiresAt, hashedOTP } = userOTPrecords[0];

          var current_time =  Date.now().valueOf();

          if (expiresAt.valueOf() < current_time) {

            // Delete the OTP record if it has expired
            await UserOTPRecord.deleteOne({ userId });
            throw new Error("OTP has Expired, Please request a new OTP");
          } else {
            //OTP is Valid, verify User Email
            // compare OTP with hashed OTP
            const isOTPCorrect = await bcrypt.compare(otp, hashedOTP); // this returns a boolan

            if (!isOTPCorrect) {
              throw new Error("OTP is Incorrect");
            } else {
              // OTP is Correct Update user and delete OTP Record
              await User.updateOne({ _id: userId }, { verifiedEmail: true });

              await UserOTPRecord.deleteOne({ userId }); // Delete OTP from DB

              const user = await User.findById(userId);

              // send successfull registration email to client and Admin
              // await RegisterSuccessEmail(user);

              return sendSuccess(res, 201, { message: "Account Verification successfull"});
            }
          }
        }
      }
  });

  public Login = catchAsync(async(req: Request, res: Response) => {

    const {email, password, verifiedEmail} = req.body;
    const user = await User.findOne({email})

    if(user && (user.verifiedEmail == false)) {
      throw new AppError("Unverified account", 403)
    };

    if(user && (await user.comparePassword(password))){
      const token = await generateToken(user._id)
      return sendSuccess(res, 200, {
        user, 
        token: token
      });
    }
    else{
      throw new AppError("User not found / password incorrect", 400);
    }
  })


  public forgotPassword = catchAsync(async(req: Request, res: Response) => {
    const resetLink = passLink;
    const {email} = req.body;
    
    const user = await User.findOne({email});
    if (!user) throw new AppError('The email address ' + req.body.email + ' is not associated with any account. Double-check your email address and try again.', 401);

      //Generate and set password reset token
      const getToken = createTokenUser(user);
      
      user.resetToken = generateToken(getToken.userId);
      await user.save();

      const link = `${process.env.CLIENT_URL}/reset-password/${user.resetToken}`;

     await resetLink(user, link);

     return sendSuccess(res, 200, {message:"A link to rest your password has been sent to your email."})

  });

  public resetPassword = catchAsync(async(req: Request, res: Response) => {
    try {
      const resetToken = req.params.token 
  
      const targetUser = await User.findOne({resetToken})
  
      if (targetUser) {
        const { newPassword } = req.body;
        targetUser.password = newPassword;

        targetUser.resetToken = undefined!
        
        targetUser.save()
  
        return sendSuccess(res, 200, {
          message:"Password updated successfully."
        })
  
      } else {
        throw new AppError("Password reset link has expired.",403)
      }
    } catch (err) {
      throw new AppError("User not found / password incorrect", 500);
    }
  });
  
  public logOut = (req: Request, res: Response) => {
    clearToken(res);
    return sendSuccess(res, 200, "User logged out");
  };

}

export default AuthController;