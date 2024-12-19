import Button from "@/components/UI/Button";
import { getLastCopiedText } from "@/utils";
import React, { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from "react";
import styles from "../styles.module.scss";
import BitcoinIcon from "@/assets/img/icons/btc.svg";
import ZanoIcon from "@/assets/img/icons/zano.svg";
import CloseIcon from "@/assets/img/icons/x.svg";
import { addPair, getPairData } from "@/utils/methods";
import Pair, { AddPairData } from "@/interfaces/Pair";
import { debounce, urlParser } from "@/utils/utils";

interface AddNewPairTypes {
    type: string;
    setPairData: Dispatch<SetStateAction<AddPairData | null | undefined>>;
    pairData?: AddPairData | null;
    setPairUrl: Dispatch<SetStateAction<string>>;
    pairUrl: string;
    setLastProcessedUrl: Dispatch<SetStateAction<string>>;
    lastProcessedUrl: string;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    setPairs: Dispatch<SetStateAction<Pair[]>>,
}

const AddNewPair = ({
    type, 
    pairData, 
    setPairData,
    setPairUrl,
    pairUrl, 
    setLastProcessedUrl,
    lastProcessedUrl,
    setIsOpen,
    setPairs,
}: AddNewPairTypes) => {
    const [message, setMessage] = useState(pairUrl);

    const handleGetCopiedText = async () => {
        const text = await getLastCopiedText();

        setMessage(text);
        debouncedFetchPairData(text);
    };

    const fetchPairData = useCallback(
        async (url: string) => {
            if (!url.length || lastProcessedUrl === url || !urlParser(url)) return;

            try {
                const res = await getPairData(url);

                if (res.success) {
                    const { rate, volume, first_currency, second_currency } = res.data;

                    setPairUrl(url);
                    setPairData({
                        type: type || "buy",
                        price: rate,
                        amount: volume,
                        active: true,
                        baseCurrency: first_currency?.name,
                        quoteCurrency: second_currency?.name,
                    });

                    setLastProcessedUrl(url);
                }
            } catch (error) {}
        },
        [lastProcessedUrl, setPairData, setLastProcessedUrl, type]
    );

    const debouncedFetchPairData = debounce(fetchPairData, 300);

    const onAdd = async () => {
        if (!pairData) return;

        try {
            const res = await addPair(pairData);

            if (res.success) {
                setIsOpen(false);
                setPairs(prev => [...prev, res.data]);
            }
        } catch (error) {}
    }

    const onInput = async (event: React.FormEvent<HTMLInputElement>) => {
        const value = event.currentTarget.value;

        setMessage(value);
        debouncedFetchPairData(value);
    };

    return (
        <>
            {/* Input for pair url */}
            <div className={styles.modal__textfield}>
                <label htmlFor="zano-trade-url">Trading Pair URL</label>

                <div className={styles.modal__textfield_input}>
                    <input value={message} onInput={onInput} id="zano-trade-url" type="text" placeholder="Zano Trade URL..." />
                    {message ?
                        <button onClick={() => setPairUrl("")}><CloseIcon /></button>
                        :
                        <button onClick={handleGetCopiedText}>Paste</button>
                    }
                </div>

                {pairData && <p>The pair found!</p>}
            </div>

            {pairData && <div className={styles.modal__pairInfo}>
                <div className={styles.modal__pairInfo_item}>
                    <div className={styles.title}>
                        <BitcoinIcon /> <span>Price</span>
                    </div>
                    <div className={styles.info}>
                        <p>{ pairData.price }</p>
                        <span>{ pairData.baseCurrency }</span>
                    </div>
                </div>
                <div className={styles.modal__pairInfo_item}>
                    <div className={styles.title}>
                        <ZanoIcon /> <span>Amount</span>
                    </div>
                    <div className={styles.info}>
                        <p>{ pairData.amount }</p>
                        <span>{pairData.quoteCurrency }</span>
                    </div>
                </div>
                <div className={styles.modal__pairInfo_item}>
                    <div className={styles.title}>
                        <BitcoinIcon /> <span>Total</span>
                    </div>
                    <div className={styles.info}>
                        <p>{ pairData.amount * pairData.price }</p>
                        <span>{ pairData.quoteCurrency }</span>
                    </div>
                </div>
            </div>}

            <Button onClick={onAdd} className={styles.modal__btn} disabled={!pairUrl} width="100%">Add</Button>
        </>
    )
};

export default AddNewPair;