import dotenv from "dotenv";
import { Request, Response } from "express";
import AuthData from "../interfaces/bodies/user/AuthData.js";
import authService from "../services/auth.service.js";

dotenv.config();

class AuthController {
    async auth(req: Request, res: Response) {
        const userData: AuthData = req.body;    
        const data = await authService.auth(userData);
        
        if (data.success) {
            res.status(200).send(data);
        } else {
            res.status(400).send(data);
        }
    }
}

const authController = new AuthController();

export default authController;