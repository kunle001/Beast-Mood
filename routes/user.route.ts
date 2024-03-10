import { Router } from 'express';
import {UserController}  from "../controllers/user.controller";

const UserRouter = Router();
const userController = new UserController()

UserRouter.get('/', userController.GetUsers);
UserRouter.get('/:id', userController.GetOneUser)
UserRouter.put('/:id', userController.UpdateUser)


export default UserRouter;