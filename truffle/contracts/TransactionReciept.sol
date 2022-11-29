// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TransactionReciept{
    string public From;
    string public To;
    string public BlockHash;
    string public BlockNumber;
    string public ContractAddress;
    string public CumulativeGasUsed;
    string public Status;
    string public TransactionHash;

    function fechReciept(string memory _From,string memory _to,string memory _BlockHash,
    string memory _BlockNumber,string memory _ContractAddress,string memory _CumulativeGasUsed,string memory _Status,
    string memory _TransactionHash)public returns(string memory, string memory,string memory,string memory,string memory,
    string memory,string memory,string memory) {
        From=_From;
        To=_to;
        BlockHash=_BlockHash;
        BlockNumber=_BlockNumber;
        ContractAddress=_ContractAddress;
        CumulativeGasUsed=_CumulativeGasUsed;
        Status=_Status;
        TransactionHash=_TransactionHash;
        return (From,To,BlockHash,BlockNumber,ContractAddress,CumulativeGasUsed,Status,TransactionHash);
    }

}
// ganache: 0x4a419B15b691176ca0bE583cb19F8810e4F8e49f
// goerli add:0xb5136273658905dd53E4f408f8c76c4b68E8159e
// goerli hash: 0xba1d1b02614897c9888aa87cad4e440439adae11031f1f9375f6585077418992