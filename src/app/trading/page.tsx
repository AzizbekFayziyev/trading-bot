import styles from "./styles.module.scss";
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import Trading from "@/components/Trading/Trading";
import axios from "axios";

const TradingPage = async () => {
    const token = (await cookies()).get('token')?.value;
    
    if (!token) {
        redirect('/');
    }

    const { initialPairs, walletData } = await fetchInitialData();

    return (
        <main className={styles.container}>
            <Trading initialPairs={initialPairs} walletData={walletData} />
        </main>
    )
}

export default TradingPage;

async function fetchInitialData() {
    const token = (await cookies()).get("token")?.value;
  
    async function fetchUserPairs() {
        try {
            const response = await axios.post(
                `http://127.0.0.1:3000/api/pair/get-user-pairs`,
                { token }
            );

            return response.data;
        } catch (error) {
            return;
        }
    }

    async function fetchWalletData() {
        try {
            const response = await axios.post(
                `http://127.0.0.1:3000/api/user/get-user-info`,
                { token }
            );
    
            return response.data;
        } catch (error) {
            return;
        }
      }
  
    const userPairs = await fetchUserPairs();
    const walletData = await fetchWalletData();
  
    return {
        initialPairs: userPairs?.success ? userPairs.data : [],
        walletData: walletData?.success ? walletData.data : null,
    };
}