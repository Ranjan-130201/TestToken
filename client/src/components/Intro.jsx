import React, { useEffect,useState } from 'react';
import useEth from '../contexts/EthContext/useEth.js';
import './intro.css';
function Intro(){
const {state}= useEth();
const {web3,contract1,contract2}=state;
const [account, setAccount]=useState(null);
const [balance, setBalance]=useState(null);
const [reciverAddress,setReciverAddress]=useState('');
const [ammount,setAmmount]=useState('');
const [refresh,setRefresh]=useState(false);
const [transactionReceipt,setTransationReceipt]=useState({});
const [Hash,setHash]= useState(null);
const tokenAddress='0x0904931f8428177bc02887df330958b958D7c650';
useEffect(()=>{
    const changeNetwork=async ()=>{
    await web3.givenProvider.request({
    method: 'wallet_switchEthereumChain',
    params: [{ chainId: '0x5' }],
  });
}
state.web3 && changeNetwork();
})
const addToken= async()=>{
    try {
        const wasAdded = await web3.givenProvider.request({
          method: 'wallet_watchAsset',
          params: {
            type: 'ERC20',
            options: {
                address: tokenAddress,
                symbol: 'TT',
                decimals: 18,
                image: 'https://tse3.mm.bing.net/th?id=OIP.kDZdtC5WIQ1Sa6HcwMrpZgHaGm&pid=Api&P=0',
            },
          },
        });
}catch(e){
    console.log(e);
}
}
useEffect(()=>{
    const loadAccount=async()=>{
        const accounts= await state.accounts[0];
        setAccount(accounts)
    }
    state.web3 && loadAccount()
},
[state.web3]);

useEffect(()=>{
    const loadBalance=async()=>{
        const {contract1,web3}= state;
        const balance= await contract1.methods.balanceOf(account).call({from: account});
        const tobalance= web3.utils.fromWei(balance,'ether')
        setBalance(tobalance);
    }
   account && web3 && loadBalance();
},[account,web3,refresh]);

const mint= async()=>{
    try{
    const {contract1}= state;
    await contract1.methods.mintCommon().send({from:account});
    }catch(e){
        console.log("error",e)
    }
    setRefresh(!refresh);
}
const handleChangeReciverAddress=(e)=>{
    try{
    setReciverAddress(e.target.value);
   
    }catch(e){
        console.log("error in address",e)
    }
}
const handleChangeammount=(e)=>{
    try{
    setAmmount(e.target.value);
    
    }catch(e){
        console.log("error in ammount",e)
    }
}
const transfer= async()=>{
    try{
    await contract1.methods.transfer(reciverAddress, web3.utils.toWei(ammount,'ether')).send({from:account})
    .then((value)=>{
        setTransationReceipt(value?{
        from: value.from ,
        to: value.to ,
        blockHash: value.blockHash ,
        blockNumber: value.blockNumber ,
        contractAddress: value.contractAddress ,
        cumulativeGasUsed: value.cumulativeGasUsed,
        gasUsed: value.gasUsed ,
        status: value.status ,
        transactionHash: value.transactionHash ,
       }:' ')});

    }catch(e){
        console.log("error",e)
    };
    setRefresh(!refresh);
}
useEffect(()=>{
const receiptContract=async()=>{
    if(transactionReceipt){
        try{await contract2.methods.fechReciept(transactionReceipt.from,transactionReceipt.to,transactionReceipt.blockHash,
            transactionReceipt.blockNumber,transactionReceipt.contractAddress? transactionReceipt.contractAddress:" ",transactionReceipt.cumulativeGasUsed,
            transactionReceipt.status, transactionReceipt.transactionHash).send({from:account})
            .on('transactionHash', function(hash){
                    setHash(hash);
            });
        }catch(e){
                console.log("error",e)
            }
    }
}
transactionReceipt && receiptContract();
setRefresh(!refresh);
},[transactionReceipt]);
return(
    <main>
    <div>
        <h1>Welcome To Test Token </h1>
    </div>
    <div className='content'>
    <h3>Account: {account}</h3>
    <h3>Balance: {balance} TT</h3>
    <div>
     <button onClick={addToken} className="button-add">Add Token To Metamask</button>
    </div>
    <div>
    <input type="text"
        id="reciverAddress"
        name="reciverAddress"
        onChange={handleChangeReciverAddress}
        value={reciverAddress}
        placeholder="Enter Reciver Address"
        style={{width:"28%",height:"25px",margin:"10px 0 15px"}} />
    </div>
    <div>
    <input type="text" placeholder='Enter the value of ether' 
        id="ammount"
        name="ammount"
        onChange={handleChangeammount}
        value={ammount}
        style={{width:"12%",height:"25px",margin:"10px 0 25px"}}/>
        </div>
        <button onClick={transfer} className="button-transfer" disabled={!reciverAddress && !ammount}>Transfer</button>
        </div>
        <div>
    <button onClick={mint} className="button-transfer" >Mint</button>
    </div>
    <div style={{ display: "flex",justifyContent:" center"}}>

    <ul style={{listStyle: "none",textAlign:"left",position:"relative"}}>
    <h4>Your Transaction info: </h4>
        <li>From: {transactionReceipt.from}</li>
        <li>To: {transactionReceipt.to}</li>
        <li>Block Hash: {transactionReceipt.blockHash}</li>
        <li>Block Number: {transactionReceipt.blockNumber}</li>
        <li>Contract Address: {transactionReceipt.contractAddress}</li>
        <li>Cumulative Gas Used: {transactionReceipt.cumulativeGasUsed}</li>
        <li>Gas Used: {transactionReceipt.gasUsed}</li>
        <li>Transaction Hash: {transactionReceipt.transactionHash}</li>
    </ul>
    </div>
    <br></br>
    <p><h4>Transation hash of Reciept: {Hash}</h4></p>
    
    </main>
)
}

export default Intro;