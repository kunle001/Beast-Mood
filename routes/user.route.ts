import { Router } from 'express';
import {UserController}  from "../controllers/user.controller";
import { authenticate } from "../utils/auth"

const UserRouter = Router();
const userController = new UserController()

UserRouter.get('/', userController.GetUsers);
UserRouter.get('/:id', userController.GetOneUser)
UserRouter.put('/:id', authenticate, userController.UpdateUser)
UserRouter.delete('/:id',authenticate, userController.DeleteUser)


export default UserRouter;