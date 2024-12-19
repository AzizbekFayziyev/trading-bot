import { Router } from 'express';
import middleware from "../middleware/middleware";
import { tryCatch } from "../utils/utils";
import userController from '../controllers/user.controller';

const userRouter = Router();

userRouter.use("/user/*", middleware.verifyToken);

userRouter.post('/user/check-user-exists', tryCatch(userController.checkUserExists));
userRouter.post('/user/get-user-info', tryCatch(userController.getUserInfo));

export default userRouter;