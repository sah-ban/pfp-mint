// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v4.9/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v4.9/contracts/access/Ownable.sol";

contract Pfp is ERC721URIStorage, Ownable {
    string public baseURI;
    uint256 public constant MINT_FEE = 0.0003 ether;
    address public constant FEE_RECIPIENT = 0x21808EE320eDF64c019A6bb0F7E4bFB3d62F06Ec;

    event Minted(address indexed minter, uint256 indexed fid, string url);

    constructor() ERC721("Farcaster PFP", "PFP") {
        baseURI = "https://pfp.itscashless.com/api/metadata";
    }

    /**
     * @dev Mint a First Cast NFT for a specific Farcaster fid
     * @param fid The Farcaster ID (used as tokenId)
     * @param url The URL associated with this cast (e.g. original cast URL)
     */
    function mint(uint256 fid, string memory url) external payable {
        require(msg.value >= MINT_FEE, "Insufficient ETH sent");
        require(!isMinted(fid), "You already minted");

        _safeMint(msg.sender, fid);

        string memory tokenURI = string(
            abi.encodePacked(
                baseURI,
                "?fid=",
                toString(fid),
                "&url=",
                url
            )
        );

        _setTokenURI(fid, tokenURI);

        // Send fee to fixed recipient
        payable(FEE_RECIPIENT).transfer(msg.value);

        emit Minted(msg.sender, fid, url);
    }

    /**
     * @dev Check if a particular fid has already been minted
     * @param fid The Farcaster ID to check
     * @return true if already minted, false otherwise
     */
    function isMinted(uint256 fid) public view returns (bool) {
        return _exists(fid);
    }

    // Owner-only functions
    function updateBaseURI(string memory newBaseURI) external onlyOwner {
        baseURI = newBaseURI;
    }

    // Helper function: uint256 to string
    function toString(uint256 value) internal pure returns (string memory) {
        if (value == 0) return "0";
        uint256 temp = value;
        uint256 digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        bytes memory buffer = new bytes(digits);
        while (value != 0) {
            digits--;
            buffer[digits] = bytes1(uint8(48 + (value % 10)));
            value /= 10;
        }
        return string(buffer);
    }

    // Optional: Allow owner to withdraw any stuck ETH (safety)
    function withdrawStuckETH() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
}