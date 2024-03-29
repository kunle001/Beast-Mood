import {otpEmailTemplate, WelcomeEmailTemplate}  from '../email_handler/emailTemplates'
import bcrypt from "bcryptjs";
import sendEmail from "./sendEmail"
import { Document, Types, Model, Schema, DefaultSchemaOptions, FlatRecord } from 'mongoose';
import { IUser } from '../models/user.model';
import { IOTP } from '../models/userOtpRecord.model';


  // Send OTP Email and Save New OTP in Database
  const sendOTPemail = async (user: Document<unknown, {}, IUser> & IUser & { _id: Types.ObjectId; }, OTPModel: Model<IOTP, {}, {}, {}, Document<unknown, {}, IOTP> & IOTP & { _id: Types.ObjectId; }, Schema<IOTP, Model<IOTP, any, any, any, Document<unknown, any, IOTP> & IOTP & { _id: Types.ObjectId; }, any>, {}, {}, {}, {}, DefaultSchemaOptions, IOTP, Document<unknown, {}, FlatRecord<IOTP>> & FlatRecord<IOTP> & { _id: Types.ObjectId; }>>) => {
      // destruction userId and user email from sentOTPemail Function
      const transporter = sendEmail();

      // Generate 4 Distinct OTP Code
      const otp = JSON.stringify(Math.floor(1000 + Math.random() * 9000));
      console.log(otp);

      // email sending options
      const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: user.email,
        subject: "Verify Your Email",
        html: otpEmailTemplate(otp, "15 Minutes"),
      };

      //  hash otp and send to user email
      const hashedOTP = await bcrypt.hash(otp, 10);
       OTPModel.create({
        userId: user.id,
        hashedOTP,
        createdAt: Date.now(),
        expiresAt: Date.now() + 900000, // Expire in 15 minutes (Add 900,000 Milliseconds to the current Timestamp)
      });

      transporter.sendMail(mailOptions, (error, result) => {
        if (error){
        console.log(error)
           console.log( "Internal Server Error")
        } else{
            console.log('Check Your Email for OTP Code');
        }
       })
  }
  
  const RegisterSuccessEmail = async (user: { email: string; }) => {
  //   try {
  //     const mailOptions = {
  //       from: '"New Registration"<support@cheapay.com.ng>',
  //       to: `${user.email}, ernestez12@gmail.com`,
  //       subject: "New User Welcome Email",
  //       html: WelcomeEmailTemplate(),
  //     };

  //     await transporter.sendMail(mailOptions);
  //   } catch (err) {
  //     logger.error(err);
  //     res.status(500).json({ err: "Internal Server Error" });
  //   }
  // },
  }

  export {sendOTPemail, RegisterSuccessEmail};
