import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import validateWallet from "../utils/wallet.js";
import AuthData from "../interfaces/bodies/user/AuthData.js";
import userModel from "../models/User.js";
import User from "../schemes/User.js";
import walletInstance from "../utils/wallet.js";

dotenv.config();

class AuthService {
    private generateToken(payload: AuthData & { id: string }) {
        const { id, alias, address } = payload;

        return jwt.sign({ id, address, alias }, process.env.JWT_SECRET || "", 
            { expiresIn: "24h" }
        );
    }

    async auth(userData: AuthData) {
        const { alias, address, signature, message } = userData;
     
        if (!address || !alias || !signature || !message) {
            return { success: false, data: "Missing required fields: address, alias, signature, or message." };
        }

        const isValidWallet = await walletInstance.validateWallet({
            address,
            signature,
            message,
            alias
        });

        if (!isValidWallet) {
            return { success: false, data: "Wallet validation failed. Invalid signature or message." };
        } 
        
        const existingUser = await userModel.getUserByAddress(address);

        if (existingUser) {
            return { success: true, data: { token: this.generateToken({ id: existingUser.id, ...userData }) }};
        }

        const newUser = await userModel.createUser(alias, address);

        if (!newUser) {
            return { success: false, data: "Failed to create a new user." };
        }

        return { success: true, data: { token: this.generateToken({ id: newUser.id, ...userData }) }};
    }
}

const authService = new AuthService();

export default authService;