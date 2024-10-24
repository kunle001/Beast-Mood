import { Router } from 'express';
import AuthController  from "../controllers/auth.controller";
import { authenticate, authorizedUser} from "../utils/auth"
const AdminRouter = Router();
const authController = new AuthController()
import { Roles } from '../utils/constant';


// super-admin/admin login endpoint
AdminRouter.post('/adminLogin',authenticate, authorizedUser([Roles.Admin, Roles.SuperAdmin]), authController.adminLogin)
// Endpoint for super-admin to make existing user admin
AdminRouter.post('/admin/create/:id',authenticate, authorizedUser([Roles.SuperAdmin]), authController.addExistingUserAsAdmin)
// AdminRouter.post('/admin/create',authenticate, authorizedUser([Roles.SuperAdmin]), authController.createAdmin)


export default AdminRouter;