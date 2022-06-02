import { providers, Contract } from "ethers";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import CoinbaseWalletSDK from '@coinbase/wallet-sdk';
import Fortmatic from "fortmatic";
import  {abi,address} from "../constants/index";
export default async function connect(props){
    const customNetworkOptions = {
        rpcUrl: 'https://rinkeby.infura.io/v3/733090e883aa457fb9f1d09cb80796d3',
        chainId: 4
    }
    const providerOptions = {
        walletconnect: {
            package: WalletConnectProvider, // required
            options: {
              infuraId: "733090e883aa457fb9f1d09cb80796d3" // required
            }
        },
        coinbasewallet: {
            package: CoinbaseWalletSDK, 
            options: {
              appName: "Solarzu", 
              infuraId: "733090e883aa457fb9f1d09cb80796d3",
              rpc: "", 
              chainId: 1, 
              darkMode: false 
            }
          },
        fortmatic: {
            package: Fortmatic, // required
            options: {
              key: "FORTMATIC_KEY", // required
              network: customNetworkOptions // if we don't pass it, it will default to localhost:8454
            }
        }
      };
    
      
    const web3Modal = new Web3Modal({
        network: "mainnet", 
        cacheProvider: true,
        providerOptions
    });
    const instance = await web3Modal.connect();
    const provider = new providers.Web3Provider(instance);
    const signer =  provider.getSigner();
    const signerAdd = await signer.getAddress();
    const contract = new Contract(address,abi,signer);
    return [signerAdd,contract];
}