import React,{useState,useEffect,createContext} from "react";

import connect from "./connect";
export default function Navbar(){
    const [loading,setLoading] = useState(false);
    const [account,setAccount] = useState(null);
    const [contract,setContract] = useState(null);
    const [total,setTotal] = useState(0);
    const loadConnect = async ()=>{
      setLoading(true);
      const [add,con] =await connect();
      setAccount(add);
      setContract(con);
      setTotal((await con.funds()).toString()/(10**18));
    }
    const renderButton = ()=>{
      if(account==null){
        if(loading){
          return <button className="p-4 mr-5 bg-green-300 rounded-lg">connecting..</button>;
        }
        else{
          return <button onClick = {loadConnect} className="p-4 mr-5 bg-green-300 rounded-lg">Connect wallet</button>;
        }
      }
      else{
        return <button className="p-4 mr-5 bg-green-300 rounded-lg">Connected</button>;
      }
    }

    return (
      
        <div className="flex justify-between p-5">
            <div className="font-rob text-2xl font-semibold p-5">Solarzu</div>
            <div className="flex items-center gap-5">
                <div>Total deposits : {total}</div>
                {renderButton()}
            </div>
        </div>
      
    )
}

