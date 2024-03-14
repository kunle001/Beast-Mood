import * as nodemailer from "nodemailer";

const sendEmail = () => {
    
    // const emailUser = process.env.EMAIL_USERNAME;
    const pass = process.env.EMAIL_PASSWORD;

    const transporter = nodemailer.createTransport({
        host:String(process.env.HOST),
        service:String(process.env.SERVICE),
        port:Number(process.env.GMAIL_PORT),
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: pass,
        },
        tls: { rejectUnauthorized: false }
    });
    
    return transporter;
}
export default sendEmail;

