// SPDX-License-Identifier: MIT

/* INSTRUCTIONS

1.  Customize the contract to suit your project by changing the
    values for TOKEN_NAME and TOKEN_SYMBOL variables below.

2.  Compile the contract from the 'Compile' tab in Remix

3.  Go to the 'Deploy' tab and change your environment to 'Injected Web3'
    (the default is 'JavaScript VM (London)')

4.  If you haven't already, sign in to and connect your MetaMask wallet

5.  Make sure to select the correct contract from the 'CONTRACT' dropdown menu

6.  Deploy the contract

7.  Copy the contract address and paste it into your JavaScript file in the proper location

*/
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract PhotoNFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    string private TOKEN_NAME = "DavidSonToken";    // 1. Change this to the name of your NFT series
    string private TOKEN_SYMBOL = "DST";  // 2. Change this to your NFT symbol (3-5 characters)

    constructor() ERC721(DavidSonToken, DST) {}

    function mintPhoto(string memory tokenURI) public returns (uint256) {
        
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }
}