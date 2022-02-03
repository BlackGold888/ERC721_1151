//SPDX-License-Identifier: Unlicense

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract BLACKGOLD is ERC721, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("BLACKGOLDTOKEN", "BGT") {}

    function _baseURI() internal pure override returns (string memory) {
        return "https://ipfs.io/ipfs/QmWvLf8u1Vsd4TFLM289m3SxCwFNcc6NT7wYA3MbP1EjqK?filename=metadata.json";
    }
    
    function safeMint(address to) public onlyOwner {
        _tokenIdCounter.increment();
        _safeMint(to, _tokenIdCounter.current());
    }
}