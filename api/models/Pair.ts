import PairData from "../interfaces/common/PairData";
import PairRow from "../interfaces/database/PairRow";
import Pair from "../schemes/Pair";

class PairModel {
    async getPairById(id: string) {
        return await Pair.findByPk(id);
    }

    async getUserPairs(id: string) {
        return await Pair.findAll({ where: { userId: id }});
    }

    async createPair(pairData: PairData, id: string) {
        return await Pair.create({
                userId: id,
                orderType: pairData.orderType ?? "short",
                type: pairData.type,
                price: pairData.price,
                amount: pairData.amount,
                active: true,
                baseCurrency: pairData.baseCurrency,
                quoteCurrency: pairData.quoteCurrency
            });
    }

    async editPair(updateFields: Partial<Omit<PairRow, 'id'>>, id: string) {
        const existingPair = await this.getPairById(id);

        return await existingPair?.update(updateFields);  
    }

    async deletePair(id: string) {
        const pairRow = await this.getPairById(id);
            
        await pairRow?.destroy();
    }

    async toggleActivation(id: string, active: boolean) {
        const pairRow = await this.getPairById(id);
            
        return pairRow?.update({ active });
    }
}

const pairModel = new PairModel();

export default pairModel;