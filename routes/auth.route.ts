import { Router } from 'express';
import AuthController  from "../controllers/auth.controller";

const AuthRouter = Router();
const authController = new AuthController()

AuthRouter.post('/register', authController.Register);
AuthRouter.post("/verifyotp",  authController.verifyotp);
AuthRouter.post("/resendotp", authController.resendotp);
AuthRouter.post('/login', authController.Login)
AuthRouter.post('/forgotPassword', authController.forgotPassword)
AuthRouter.post('/logout', authController.logOut)






export default AuthRouter;