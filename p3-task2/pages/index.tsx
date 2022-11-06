import type { NextPage } from 'next'
import {LandingPage} from "../components/LandingPage";
import {GrabSPLToken} from "../components/GrabSPLToken";
import {WalletModalProvider, WalletMultiButton} from "@solana/wallet-adapter-react-ui";
import {WalletDisconnectButton} from "@solana/wallet-adapter-react-ui";
import {useEffect, useMemo, useState} from "react";
import {WalletAdapterNetwork} from "@solana/wallet-adapter-base";
import {useRouter} from "next/router";
import {clusterApiUrl} from "@solana/web3.js";
import {PhantomWalletAdapter, SolflareWalletAdapter} from "@solana/wallet-adapter-wallets";
import {ConnectionProvider, WalletProvider} from "@solana/wallet-adapter-react";
require('@solana/wallet-adapter-react-ui/styles.css');

const Home: NextPage = () => {

    const network = WalletAdapterNetwork.Devnet;

    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
            new SolflareWalletAdapter(),
        ],
        []
    );



    return (
            <section>
                <ConnectionProvider endpoint={endpoint}>
                    <WalletProvider wallets={wallets} autoConnect={true}>
                        <WalletModalProvider>
                            <LandingPage/>
                        </WalletModalProvider>
                    </WalletProvider>
                </ConnectionProvider>
            </section>
    )

}



export default Home
