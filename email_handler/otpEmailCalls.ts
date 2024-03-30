import {otpEmailTemplate, WelcomeEmailTemplate}  from '../email_handler/emailTemplates'
import bcrypt from "bcryptjs";
import sendEmail from "./sendEmail"

  // Send OTP Email and Save New OTP in Database
  const sendOTPemail = async(user: { email: string; _id: string; }, OTPModel: { create: (arg0: { userId: string; hashedOTP: string; createdAt: number; expiresAt: number; }) => void; } ) => {
      // destruction userId and user email from sentOTPemail Function
      const transporter = sendEmail();

      // Generate 4 Distinct OTP Code
      const otp = JSON.stringify(Math.floor(1000 + Math.random() * 9000));
      console.log(otp);

      // email sending options
      const mailOptions = {
        from:`"OTP Verification"${process.env.EMAIL_USERNAME}`,
        to: user.email,
        subject: "Verify Your Email",
        html: otpEmailTemplate(otp, "15 Minutes"),
      };

      //  hash otp and send to user email
      const hashedOTP = await bcrypt.hash(otp, 10);
      await OTPModel.create({
        userId: user._id,
        hashedOTP,
        createdAt: Date.now(),
        expiresAt: Date.now() + 900000, // Expire in 15 minutes (Add 900,000 Milliseconds to the current Timestamp)
      });

      await transporter.sendMail(mailOptions, (error, _result) => {
        if (error){
        console.log(error)
            console.log( "Internal Server Error Email connection!!")
        } else{
            console.log('Check Your Email for OTP Code');
        }
      })
  }

  const RegisterSuccessEmail = async (user: { email: string;}) => {
    const transporter = sendEmail();
    try {
      const mailOptions = {
        from: `"New Registration"${process.env.EMAIL_USERNAME}`,
        to: `${user.email}, aninmie@gmail.com`,
        subject: "New User Welcome Email",
        html: WelcomeEmailTemplate(),
      };

      await transporter.sendMail(mailOptions);
    } catch (err) {
      console.log({ err: "Internal Server Error Email connection!!" });
    }
  }

  export {sendOTPemail, RegisterSuccessEmail};