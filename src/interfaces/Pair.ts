export default interface Pair {
    id: string,
    orderType: string,
    type: string,
    price: number,
    amount: number,
    userId: number,
    active: boolean,
    baseCurrency: string,
    quoteCurrency: string,
}

export type AddPairData = Omit<Pair, "id" | "orderType" | "userId">;

