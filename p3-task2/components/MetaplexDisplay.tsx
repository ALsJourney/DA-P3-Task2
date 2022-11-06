import {bundlrStorage, Metaplex, walletAdapterIdentity} from "@metaplex-foundation/js";
import {useState} from "react";
import {useWallet} from "@solana/wallet-adapter-react";
import {clusterApiUrl, Connection, PublicKey} from "@solana/web3.js";


const connection = new Connection(clusterApiUrl("devnet"));

export default function MetaplexDisplay() {
    const [mintaddress, setmintaddress] = useState("CRHpiQu8AeUC7vvDbj58vRizsv65xbRBkpaJKnVgwF2e");
    const wallet = useWallet();

    const metaplex = Metaplex.make(connection).use(walletAdapterIdentity(wallet));

    const [nft, setNft] = useState<any>(null);

    metaplex.use(bundlrStorage({
        address: 'https://devnet.bundlr.network',
        providerUrl: 'https://api.devnet.solana.com',
        timeout: 60000,
    }));

    const fetchNFT = async () => {
        const mintAddress = new PublicKey(mintaddress);
        const nft = await metaplex.nfts().findByMint({mintAddress}).run();
        setNft(nft);
    };

    return (
        <section>
            <h2 className={"text-3xl mb-8 font-bold text-red-400 relative text-center"}>
                Enter the Mint Address
            </h2>
            <section className={"flex flex-col justify-center items-center"}>
                <input type="text" placeholder={"Mint Address"}
                       className={"shadow appearance-none border overflow-auto hover:bg-gray-50 dark:hover:bg-gray-600 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"}
                       value={mintaddress}
                       onChange={(event) => setmintaddress(event.target.value)}/>
                <button className={"bg-purple-800 m-5 hover:bg-black text-white font-bold py-2 px-4 rounded"}
                        onClick={fetchNFT}>Fetch NFT
                </button>
            </section>

            <section className={"flex flex-col justify-center items-center"}>
                <div className={"overflow-x-auto relative shadow-md sm:rounded-lg"}>
                    <table className={"w-full text-sm text-left text-gray-500 dark:text-gray-400"}>
                        {nft && (
                            <table className={"w-full text-sm text-left text-gray-500 dark:text-gray-400"}>
                                <thead
                                    className={"text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"}>
                                <tr>
                                    <th scope={"col"} className={"py-3 px-6"}>Attributes</th>
                                    <th scope={"col"} className={"py-3 px-6"}>Value</th>
                                </tr>
                                </thead>
                                <tbody>
                                {/* @ts-ignore */}
                                {nft.json.attributes.map(attribute => (
                                    <tr key={attribute.trait_type}
                                        className={"bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"}>
                                        <td className={"py-4 px-6"}>{attribute.trait_type}</td>
                                        <td className={"py-4 px-6"}>{attribute.value}</td>
                                    </tr>

                                ))}
                                </tbody>
                            </table>
                        )}
                    </table>
                </div>
            </section>
            {nft && <section className={"flex flex-col justify-center items-center relative top-8"}>
                <h2 className={"text-3xl font-bold text-red-400 relative text-center m-5"}>Change your NFT</h2>
                <form autoComplete="off" onSubmit={async (event) => {
                    event.preventDefault();
                    // @ts-ignore
                    const traitType = event.target.trait_type.value;
                    console.log("==============================");
                    console.log(`traitType: ${traitType}`);
                    console.log("==============================");

                    // @ts-ignore
                    const traitValue = event.target.trait_value.value;
                    console.log("==============================");
                    console.log(`traitValue: ${traitValue}`);
                    console.log("==============================");


                    try {
                        // @ts-ignore
                        const {uri: newUri} = await metaplex.nfts().uploadMetadata({
                            ...nft.json,
                            attributes: [
                                ...nft.json.attributes,
                                {
                                    trait_type: traitType,
                                    value: traitValue
                                }]
                        }).run();
                        console.log(newUri);

                        // updated nft
                        // @ts-ignore
                        const {nft: updatedNft} = await metaplex.nfts().update({
                            nftOrSft: nft,
                            uri: newUri
                        }).run();

                        console.log(`updatedNft: ${updatedNft}`);

                        setNft(updatedNft);
                        await fetchNFT();
                    } catch (e) {
                        console.log(e);
                    }
                }


                }>
                    <div className={"flex flex-col relative top-5"}>
                        <label className={"block text-gray-500 font-bold relative bottom-3"}>Trait Type</label>
                        <input
                            className={"shadow appearance-none border rounded hover:bg-gray-50 dark:hover:bg-gray-600 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"}
                            type="text" id="trait_type" name="trait_type" placeholder={"Trait Type"} required/>
                        <label className={"block text-gray-500 font-bold relative top-0.5"}>Trait Value</label>
                        <input
                            className={"shadow appearance-none border rounded hover:bg-gray-50 dark:hover:bg-gray-600 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"}
                            type="text" id="trait_value" name="trait_value" placeholder={"Trait Value"}
                            required/>
                        <button className={"bg-purple-800 m-5 hover:bg-black text-white font-bold py-2 px-4 rounded"}
                                type={"submit"}>Change NFT
                        </button>
                    </div>
                </form>
            </section>}
        </section>
    )
}


