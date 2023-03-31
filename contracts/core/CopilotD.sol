// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CopilotD is Ownable {
    IERC20 public token;
    constructor (IERC20 _token, string memory _description) {
        token = _token;
        proposalEndTime = block.timestamp + 1 days;
    }

    uint256 private _tokenIdCounter;
    uint256 private _proposalIdCounter;
    uint256 public proposalEndTime;
    struct Proposal {
        uint256 id;
        string description;
        uint256 yesVotes;
        uint256 noVotes;
        bool executed;
    }

    mapping(uint256 => Proposal) public proposals;

    function createProposal(string memory description) public onlyOwner {
        proposals[_proposalIdCounter] = Proposal({
            id: _proposalIdCounter,
            description: description,
            yesVotes: 0,
            noVotes: 0,
            executed: false
        });
        _proposalIdCounter++;
    }

    function vote(uint256 proposalId, bool vote) public {
        require(proposalEndTime > block.timestamp, "Voting has ended");
        require(proposalId < _proposalIdCounter, "Invalid proposal id");
        require(!proposals[proposalId].executed, "Proposal has already been executed");

        if (vote) {
            proposals[proposalId].yesVotes++;
        } else {
            proposals[proposalId].noVotes++;
        }
    }

    function executeProposal(uint256 proposalId) public onlyOwner {
        require(proposalEndTime < block.timestamp, "Voting has not ended");
        require(proposalId < _proposalIdCounter, "Invalid proposal id");
        require(!proposals[proposalId].executed, "Proposal has already been executed");

        if (proposals[proposalId].yesVotes > proposals[proposalId].noVotes) {
            proposals[proposalId].executed = true;
        }
    }

    function proposalCount() public view returns (uint256) {
        return _proposalIdCounter;
    }

    function getProposal(uint256 proposalId) public view returns (Proposal memory) {
        return proposals[proposalId];
    }

    function getYesVotes(uint256 proposalId) public view returns (uint256) {
        return proposals[proposalId].yesVotes;
    }

    function getNoVotes(uint256 proposalId) public view returns (uint256) {
        return proposals[proposalId].noVotes;
    }
}