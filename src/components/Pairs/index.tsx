"use client";
import styles from "./styles.module.scss";
import { OptionType } from '../UI/Select/types';
import Select from "../UI/Select";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { classes } from "@/utils";
import BanditIcon from "@/assets/img/icons/bandit.svg";
import ZanoIcon from "@/assets/img/icons/zano-symbol.svg";
import EditIcon from "@/assets/img/icons/edit.svg";
import DelIcon from "@/assets/img/icons/delete.svg";
import Toggle from "../UI/Toggle";
import Button from "../UI/Button";
import Pair from "@/interfaces/Pair";
import { deletePair, togglePairActivation } from "@/utils/methods";

// Filters data
const pairFilters: OptionType[] = [
    {
        name: "Show all",
        value: "all",
    },
    {
        name: "Active",
        value: "active",
    },
    {
        name: "Inactive",
        value: "inactive",
    }
]

// Trading page pairs
const Pairs = ({ 
    pairs, 
    setPairs,
    setAddPairModal }: { 
        setAddPairModal: Dispatch<SetStateAction<boolean>>,
        setPairs: Dispatch<SetStateAction<Pair[]>>,
        pairs: Pair[],  }) => {
    const [selected, setSelected] = useState<OptionType>();

    // Toggle pair activity
    const onTogglePairActivity = async (id: string, active: boolean) => {
        try {
            const res = await togglePairActivation(id, active);

            if (res.success) {
                const changedPair = pairs?.map(pair =>
                    pair.id === id ? { ...pair, active: !pair.active } : pair
                )
        
                setPairs(changedPair)
            }
        } catch (error) {}
    }

    const onPairDelete = async (id: string) => {
        try {
            const res = await deletePair(id);

            if (res.success) {
                setPairs(prev => prev.filter(it => it.id !== id))
            }
        } catch (error) {}
    }

    // Filtered pairs
    const filteredPairs = useCallback(() => {
        switch (selected?.value) {
            case "active":
                return pairs?.filter(pair => pair.active);
            case "inactive":
                return pairs?.filter(pair => !pair.active);
            default:
                return pairs
        }
    }, [selected, pairs])


    return (
        <div className={styles.pairs}>
            {/* Pairs header */}
            <div className={styles.pairs__header}>
                <h3>Pairs</h3>

                <Select selected={selected} setSelected={setSelected} options={pairFilters} />
            </div>

            {/* Pairs table */}
            <div className={styles.pairs__table}>
                <table>
                    <thead>
                        <tr>
                            <th className={styles.num}><span>#</span></th>
                            <th className={styles.order}><span>Orders</span></th>
                            <th className={styles.type}><span>Order Type</span></th>
                            <th className={styles.amount}><span>Amount</span></th>
                            <th className={styles.price}><span>Price</span></th>
                            <th className={styles.status}><span>Status</span></th>
                            <th className={styles.actions}><span>Actions</span></th>
                        </tr>
                    </thead>

                    {pairs?.length ?
                        <tbody>
                            {filteredPairs()?.map((e, idx) => (
                                <tr className={styles.body} key={e.id}>
                                    <td className={styles.num_item}>{idx + 1}</td>
                                    <td className={styles.order_item}><p>{e.baseCurrency} / {e.quoteCurrency} <span className={styles[e.orderType]}>{e.orderType}</span></p></td>
                                    <td className={classes(styles.type_item, styles[e.type])}><span>{e.type}</span></td>
                                    <td className={styles.amount_item}><div><BanditIcon /> <span>{e.amount}</span></div></td>
                                    <td className={styles.price_item}><div><ZanoIcon /> <span>{e.price}</span></div></td>
                                    <td className={classes(styles.status_item, e.active && styles.active)}><span>{e.active ? "Active" : "Inactive"}</span></td>

                                    <td className={styles.actions_item}>
                                        <div>
                                            <Toggle value={e.active} onChange={() => onTogglePairActivity(e.id, !e.active)} /> 
                                            <button onClick={() => onPairDelete(e.id)}>
                                                <DelIcon />
                                            </button> 
                                            <button>
                                                <EditIcon />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        : <tbody></tbody>}
                </table>

                {/* No pairs */}
                {filteredPairs()?.length === 0 && <div className={styles.nopairs}>
                    <h5>There are no trading pairs yet</h5>
                    {pairs?.length == 0 && <Button onClick={() => setAddPairModal(true)} variant="success">+ Create one</Button>}
                </div>}
            </div>
        </div>
    )
}

export default Pairs