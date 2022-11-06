import {clusterApiUrl, Connection} from "@solana/web3.js";
import {TOKEN_PROGRAM_ID} from "@solana/spl-token";
import {useEffect, useState} from "react";
import {WalletAdapterNetwork} from "@solana/wallet-adapter-base";


export const GrabSPLToken = ({MY_WALLET_ADDRESS}: { MY_WALLET_ADDRESS: string }) => {
    const [splToken, setSplToken] = useState([undefined]);

    useEffect(() => {
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

        connection.getParsedProgramAccounts(
            TOKEN_PROGRAM_ID,
            {
                filters: [
                    {
                        dataSize: 165,
                    },
                    {
                        memcmp: {
                            offset: 32,
                            bytes: MY_WALLET_ADDRESS,
                        },
                    },
                ],
            }
        ).then(accounts => {
            // @ts-ignore
            setSplToken(accounts.map(account => account.account.data["parsed"]))
        });

    }, [])
    return (
        <section>
            <h2 className={"text-3xl relative top-5 font-bold text-red-400 relative text-center"}>
                Amount of SPL Tokens
            </h2>
            <section className={"flex flex-row justify-center items-center p-10"}>
                <div className={"overflow-x-auto relative shadow-md sm:rounded-lg"}>
                <table className={"w-full text-sm text-left text-gray-500 dark:text-gray-400"}>
                    <thead className={"text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"}>
                    <tr>
                        <th scope={"col"} className={"py-3 px-6"}>Address</th>
                        <th scope={"col"} className={"py-3 px-6"}>Amount</th>
                    </tr>
                    </thead>
                    <tbody>
                    {splToken.map(
                        (token: any) => {
                            if(token){
                                // @ts-ignore
                                return <tr key={token.info.mint} className={"bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"}>
                                    { /* @ts-ignore */}
                                    <td className={"py-4 px-6"}>{token.info.mint}</td>
                                    { /* @ts-ignore */}
                                    <td className={"py-4 px-6"}>{token.info.tokenAmount.uiAmount}</td>
                                </tr>
                            }else {
                                return <tr key={token}>
                                    <td className={"py-4 px-6"}>Zero</td>
                                    <td className={"py-4 px-6"}>Zero</td>
                                </tr>
                            }
                        }
                    )}
                    </tbody>
                </table>
                </div>
            </section>
        </section>

    )

}