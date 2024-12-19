import AuthData from "../interfaces/bodies/user/AuthData";
import UserData from "../interfaces/common/UserData";
import userModel from "../models/User";

class UserService {
    async checkUserExists(userData: AuthData) {
        const existingUser = await userModel.getUserByAddress(userData.address);

        if (!existingUser) {
            return { success: true, data: { userExists: false } };
        }        

        return { success: true, data: { userExists: true} };
    }

    async getUserInfo(userData: UserData) {
        const existingUser = await userModel.getUserById(userData.id);

        if (!existingUser) {
            return { success: true, data: "User not found" };
        }        

        return { success: true, data: { alias: existingUser.alias, address: existingUser.address } };
    }
}

const userService = new UserService();

export default userService;