import dotenv from "dotenv";
import { Request, Response } from "express";
import AuthData from "../interfaces/bodies/user/AuthData.js";
import authService from "../services/auth.service.js";
import userService from "../services/user.service.js";
import UserData from "../interfaces/common/UserData.js";

class UserController {
    async checkUserExists(req: Request, res: Response) {
        const userData: AuthData = req.body.userData;    
        const data = await userService.checkUserExists(userData);
        
        if (data.success) {
            res.status(200).send(data);
        } else {
            res.status(400).send(data);
        }
    }

    async getUserInfo(req: Request, res: Response) {
        const userData: UserData = req.body.userData;    
        const data = await userService.getUserInfo(userData);
        
        if (data.success) {
            res.status(200).send(data);
        } else {
            res.status(400).send(data);
        }
    }
}

const userController = new UserController();

export default userController;