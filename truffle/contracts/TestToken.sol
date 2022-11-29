// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TestToken is ERC20("TestToken", "TT"){
    address payable public owner;
    constructor(){
        owner= payable(msg.sender);
        _mint(msg.sender, 1000 * (10 ** decimals()));
    }
    modifier onlyOwner{
        require(msg.sender== owner);
        _;
    }
    function mintCommon() public{
        _mint(msg.sender, 20 * (10 ** decimals()));
    }
    function destroy() public onlyOwner{
        selfdestruct(owner);
    }
}

// ganshe:0x9EBf23b72a16805a526D511410c68a788661Df28
// goerli contract address:  0x0904931f8428177bc02887df330958b958D7c650
// goerli hash: 0x03890568564df2ae7ee0bf16cdaf484bcbfa4a783e36cbd52430e75f7dde1495