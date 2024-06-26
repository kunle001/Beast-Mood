import { Router } from 'express';
import {UserController}  from "../controllers/user.controller";
import { authenticate, authorizedUser} from "../utils/auth"
import { Roles } from '../utils/constant';


const UserRouter = Router();
const userController = new UserController()


UserRouter.get('/', userController.GetUsers);
UserRouter.get('/:id', userController.GetOneUser)
UserRouter.put('/:id', authenticate, authorizedUser([Roles.Admin, Roles.User]), userController.UpdateUser)
UserRouter.delete('/:id',authenticate, authorizedUser, userController.DeleteUser)


export default UserRouter;