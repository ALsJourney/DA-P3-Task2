import {WalletDisconnectButton, WalletMultiButton} from "@solana/wallet-adapter-react-ui";
import {useWallet} from "@solana/wallet-adapter-react";
import {GrabSPLToken} from "./GrabSPLToken";
import MetaplexDisplay from "./MetaplexDisplay";

export const LandingPage = () => {
    const {publicKey} = useWallet();

    return (
        <main className={"grid h-screen place-items-center"}>
            <h2 className={"text-4xl font-bold text-red-400 relative text-center"}>
                Doge Academy - Solana Token Exercise! P3-Task2</h2>
            <section className={"flex flex-row justify-center items-center"}>
                <WalletMultiButton/>
                <WalletDisconnectButton/>
            </section>
                {/*<GrabSPLToken MY_WALLET_ADDRESS={MY_WALLET_ADDRESS}/>*/}
                {publicKey && <GrabSPLToken MY_WALLET_ADDRESS={publicKey.toBase58()}/>}
                <MetaplexDisplay/>
        </main>
    )
}

