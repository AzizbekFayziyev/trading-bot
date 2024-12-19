"use client";

import { useState } from "react";
import styles from "./styles.module.scss";
import Sidebar from "../Sidebar";
import Header from "../Header";
import Pairs from "../Pairs";
import AddPair from "../AddPair";
import Pair from "@/interfaces/Pair";
import User from "@/interfaces/User";

const Trading = ({ initialPairs, walletData }: { initialPairs: Pair[], walletData: User }) => {
    const [addPairModal, setAddPairModal] = useState(false);
    const [pairs, setPairs] = useState(initialPairs);

    return (
        <>
            {/* Left sidebar */}
            <Sidebar walletData={walletData} />

            {/* Right content */}
            <div className={styles.content}>
                <Header setAddPairModal={setAddPairModal} />
                <Pairs 
                    setAddPairModal={setAddPairModal} 
                    pairs={pairs} 
                    setPairs={setPairs} />
            </div>

            {/* Add pair modal */}
            <AddPair 
                isOpen={addPairModal} 
                setIsOpen={setAddPairModal}
                setPairs={setPairs} />
        </>
    )
}

export default Trading;