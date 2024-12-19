"use client";
import React, { useState } from 'react';
import styles from "./styles.module.scss";
import Image from 'next/image';
import CopyIcon from "@/assets/img/icons/copy.svg";
import ZanoIcon from "@/assets/img/icons/zano.svg";
import BanditIcon from "@/assets/img/icons/bandit.svg";
import BTCIcon from "@/assets/img/icons/btc.svg";
import TetherIcon from "@/assets/img/icons/tether.svg";
import LogoutIcon from "@/assets/img/icons/logout.svg";
import { classes, copyToClipboard } from '@/utils';
import InfoIcon from '../UI/InfoIcon';
import User from '@/interfaces/User';
import { logout } from '@/utils/utils';

// Trading page sidebar
const Sidebar = ({ walletData }: { walletData: User }) => {
    const [isCopied, setCopied] = useState(false);

    // On copy address
    const onCopy = () => {
        setCopied(true);
        copyToClipboard(walletData?.address);

        setTimeout(() => {
            setCopied(false);
        }, 1500);
    }

    return (
        <aside className={styles.sidebar}>
            <div>
                <div className={styles.sidebar__item}>
                    <Image className={styles.sidebar__logo} width={160} height={50} src="/logo.svg" alt='bandit logo' />
                </div>

                <div className={classes(styles.sidebar__info, styles.sidebar__item)}>
                    <div className={styles.sidebar__info_avatar}>{walletData?.alias.slice(0, 1)}</div>
                    <div className={styles.sidebar__info_alias}>
                        <p className={styles.name}>@{walletData?.alias}</p>

                        <div className={styles.address}>
                            <span>{walletData?.address.slice(0, 6)}...{walletData?.address.slice(-6)}</span>

                            <InfoIcon onClick={onCopy} Icon={CopyIcon} info={isCopied ? "The address coppied" : "Copy address"} RightIcon={<CopyIcon className={styles.copyIcon} />} />
                        </div>
                    </div>
                </div>

                <div className={classes(styles.sidebar__balance, styles.sidebar__item)}>
                    <h5>Total Balance</h5>
                    <p>
                        <span className={styles.sidebar__balance_currency}>$</span>
                        <span className={styles.sidebar__balance_total}>8 718,16</span>
                        <span className={styles.sidebar__balance_status}>+18,42%</span>
                    </p>
                </div>

                <div className={styles.sidebar__item}>
                    <div className={styles.sidebar__coins}>
                        <div className={styles.sidebar__coins_item}>
                            <ZanoIcon />
                            <p>100 ZANO</p>
                            <span>~$150</span>
                        </div>
                        <div className={styles.sidebar__coins_item}>
                            <BanditIcon />
                            <p>51 200 BANDIT</p>
                            <span>~$150</span>
                        </div>
                        <div className={styles.sidebar__coins_item}>
                            <BTCIcon />
                            <p>0,125124 BTC</p>
                            <span>~$51251</span>
                        </div>
                        <div className={styles.sidebar__coins_item}>
                            <TetherIcon />
                            <p>100 ZANO</p>
                            <span>~$150</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.sidebar__bottom}>
                <button onClick={logout}>
                    <LogoutIcon /> Logout
                </button>
            </div>
        </aside>
    )
}

export default Sidebar