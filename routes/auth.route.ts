import { Router } from 'express';
import AuthController  from "../controllers/auth.controller";
import { authenticate, authorizedUser} from "../utils/auth"
const AuthRouter = Router();
const authController = new AuthController()
import { Roles } from '../utils/constant';


AuthRouter.post('/register', authController.Register);
AuthRouter.post('/login', authController.Login)
AuthRouter.post("/verifyotp",  authController.verifyotp);
AuthRouter.post("/resendotp", authController.resendotp);
AuthRouter.post('/forgotPassword', authController.forgotPassword)
AuthRouter.post('/logout', authController.logOut)


export default AuthRouter;