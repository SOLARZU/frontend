import React,{ useState, useEffect, useMemo } from "react";
import { useMoralis } from "react-moralis";
import { ethers } from "ethers";
export default function Bnpl(){
    const {
		Moralis,
		user,
		logout,
		authenticate,
		enableWeb3,
		isInitialized,
		isAuthenticated,
		isWeb3Enabled,
	} = useMoralis();
	const [values, setValues] = useState({ tokenAddress: "", tokenId: "" });
	const web3Account = useMemo(
		() => isAuthenticated && user.get("accounts")[0],
		[user, isAuthenticated],
	);
    const createBuyOrder = async () => {
		await Moralis.Plugins.opensea.createBuyOrder({
			network: "testnet",
			tokenAddress: values.tokenAddress,
			tokenId: values.tokenId,
			tokenType: "ERC721",
			amount: 0.0001,
			userAddress: userAddress,
			paymentTokenAddress: "0xc778417e063141139fce010982780140aa0cd5ab",
		});

		console.log("Create Buy Order Successful");
	};

	useEffect(() => {
		if (isInitialized) {
			Moralis.initPlugins();
		}
	}, []);

	useEffect(() => {
		if (isAuthenticated && !isWeb3Enabled) {
			enableWeb3();
		}
	}, [isAuthenticated]);

    return (
        <div className="px-24">
            <div className="flex flex-row-reverse">
                {
                    isAuthenticated ?
                    <div>
                        {web3Account}
                        <button className="p-4 rounded-xl bg-green-300 mb-5 ml-5" onClick={logout}>log out</button>
                    </div>
                    :
                    <button className="p-4 rounded-xl bg-green-300 mb-5" onClick={authenticate}>Sign in</button>

                }
            </div>
            <div className="flex items-center flex-col gap-5">
                <div className="text-xl">OpenSea buy order</div>
                <input type="text" placeholder="Nft address" className="p-3" id="nft_address" onChange={(e)=> setValues({...values,tokenAddress : e.target.value})}></input>
                <input type="number" placeholder="Token Id" className="p-3" id="token_id" onChange={(e)=> setValues({...values,tokenId : e.target.value})}></input>
                <button className="p-4 rounded-xl bg-green-300" onClick = {createBuyOrder}>Create buy order</button>
            </div>
        </div>
    )
}