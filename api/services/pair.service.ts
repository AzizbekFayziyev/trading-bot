import CreatePairBody from "../interfaces/bodies/pair/CreatePairBody";
import DeletePairBody from "../interfaces/bodies/pair/DeletePairBody";
import EditPairBody from "../interfaces/bodies/pair/EditPairBody";
import UserData from "../interfaces/common/UserData";
import pairModel from "../models/Pair";
import userModel from "../models/User";

class PairService {
    async getUserPairs(userData: UserData) {
        const existingUser = await userModel.getUserById(userData.id);

        if (!existingUser) {
            return { success: false, data: "User not found." };
        }

        const pairs = await pairModel.getUserPairs(existingUser.id);          

        return { success: true, data: pairs };
    }

    async createPair(body: CreatePairBody) {
        const pairData = body.pairData;
        const userData = body.userData;
        const existingUser = await userModel.getUserById(userData.id);

        if (!existingUser) {
            return { success: false, data: "User not found." };
        }

        const newPair = await pairModel.createPair(pairData, existingUser.id);

        if (!newPair) {
            return { success: false, data: "Failed to create a new pair." };
        }           

        return { success: true };
    }

    async editPair(body: EditPairBody) {
        const pairData = body.pairData;
        const { id, ...updateFields } = pairData;
        const userData = body.userData;

        const existingPair = await pairModel.getPairById(id);

        if (!existingPair) {
            return { success: false, data: "Pair not found." };
        }

        const existingUser = await userModel.getUserById(userData.id);

        if (!existingUser) {
            return { success: false, data: "User not found." };
        }

        if (existingUser.id !== existingPair.userId) {
            return { success: false, data: "User cannot update this pair." };
        }

        const updatedPair = await pairModel.editPair(updateFields, id);  
        
        if (!updatedPair) {
            return { success: false, data: "Failed to update a pair." };
        }

        return { success: true };
    }

    async deletePair(body: DeletePairBody) {
        const { id, userData } = body;
        const existingPair = await pairModel.getPairById(id);

        if (!existingPair) {
            return { success: false, data: "Pair not found." };
        }

        const existingUser = await userModel.getUserById(userData.id);

        if (!existingUser) {
            return { success: false, data: "User not found" };
        }

        if (existingUser.id !== existingPair.userId) {
            return { success: false, data: "User cannot delete this pair." };
        }

        await pairModel.deletePair(id);

        return { success: true };
    }

    async toggleActivation(userData: UserData, id: string, active: boolean) {
        const existingPair = await pairModel.getPairById(id);
    
        if (!existingPair) {
            return { success: false, data: "Pair not found." };
        }

        const existingUser = await userModel.getUserById(userData.id);

        if (!existingUser) {
            return { success: false, data: "User not found" };
        }

        if (existingUser.id !== existingPair.userId) {
            return { success: false, data: "User cannot update this pair." };
        }

        const isPairUpdated = await pairModel.toggleActivation(id, active);

        if (!isPairUpdated) {
            return { success: false, data: "Failed to update pair." };
        }

        return { success: true };
    }
}

const pairService = new PairService();

export default pairService;