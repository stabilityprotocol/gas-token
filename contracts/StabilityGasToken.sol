// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable2Step.sol";

contract StabilityGasToken is ERC20, Ownable2Step {
    bool public blockTransfers = false;

    modifier notBlockedTransfers() {
        require(
            blockTransfers == false,
            "StabilityGasToken: Transfers are blocked"
        );
        _;
    }

    constructor() ERC20("Stability Gas Token", "SGT") Ownable2Step() {
        _mint(msg.sender, 1e24);
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function burn(address to, uint256 amount) public onlyOwner {
        _burn(to, amount);
    }

    function _transfer(
        address from,
        address to,
        uint256 amount
    ) internal override notBlockedTransfers {
        super._transfer(from, to, amount);
    }

    function updateBlockTransfers(bool _blockTransfers) public onlyOwner {
        blockTransfers = _blockTransfers;
    }
}
