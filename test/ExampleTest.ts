import {mineBlocks, setupFixture, toChainlinkPrice, toUsd} from "../helpers/utils";
import {formatEther, keccak256, parseEther, parseUnits} from "ethers/lib/utils";
import {expect} from "chai";
import {ethers} from "hardhat";
import {getDaiConfig, getWethConfig, getWmaticConfig} from "../helpers/params";
import {errors} from "../helpers/errors";
import {constants} from "ethers";

describe("MockA", async () => {
    let
        owner: any,
        user0: any,
        user1: any,
        user2: any,
        ma: any;
    beforeEach(async () => {
        let fixture = await setupFixture();
        ma = fixture.mockA;

        owner = fixture.owner;
        user0 = fixture.user0;
        user1 = fixture.user1;
        user2 = fixture.user2;
    })
    it("mockA.func => name()", async () => {
        expect(await ma.name()).to.equal("MockA");
    });

    it("mockA.func => symbol()", async () => {
        expect(await ma.symbol()).to.equal("MKA");
    });

    it("mockA.func => decimals()", async () => {
        expect(await ma.decimals()).to.equal(18);
    });

    it("mockA.func => totalSupply()", async () => {
        expect(await ma.totalSupply()).to.equal(parseEther("10000"));
    });

    it("mockA.func => balanceOf()", async () => {
        expect(await ma.balanceOf(owner.address)).to.equal(parseEther("10000"));
    });

    it("mockA.func => transfer()", async () => {
        await ma.transfer(user0.address, parseEther("100"));
        expect(await ma.balanceOf(owner.address)).to.equal(parseEther("9900"));
        expect(await ma.balanceOf(user0.address)).to.equal(parseEther("100"));
    });

    it("mockA.func => getVotes()", async () => {
        expect(await ma.getVotes(owner.address)).to.equal(parseEther("0"));
    });
});

describe("CopilotA", async () => {
    let
        owner: any,
        user0: any,
        user1: any,
        user2: any,
        ma: any,
        ca: any;
    beforeEach(async () => {
        let fixture = await setupFixture();
        ma = fixture.mockA;
        ca = fixture.copilotA;

        owner = fixture.owner;
        user0 = fixture.user0;
        user1 = fixture.user1;
        user2 = fixture.user2;
    })
    it("ca.func => address", async () => {
        console.log(`ca.address: ${ca.address}`);
    });
});

describe("CopilotB", async () => {
    let
        owner: any,
        user0: any,
        user1: any,
        user2: any,
        ma: any,
        cb: any;
    beforeEach(async () => {
        let fixture = await setupFixture();
        ma = fixture.mockA;
        cb = fixture.copilotB;

        owner = fixture.owner;
        user0 = fixture.user0;
        user1 = fixture.user1;
        user2 = fixture.user2;
    })
    it("cb.func => address", async () => {
        console.log(`cb.address: ${cb.address}`);
    });
});

describe("CopilotC", async () => {
    let
        owner: any,
        user0: any,
        user1: any,
        user2: any,
        ma: any,
        cc: any;
    beforeEach(async () => {
        let fixture = await setupFixture();
        ma = fixture.mockA;
        cc = fixture.copilotC;

        owner = fixture.owner;
        user0 = fixture.user0;
        user1 = fixture.user1;
        user2 = fixture.user2;
    });
    it("cc.func => address", async () => {
        expect(await cc.address).not.to.equal(constants.AddressZero);
    });

    it("cc.func => votingDelay()", async () => {
        expect(await cc.votingDelay()).to.equal(1);
    });

    it("cc.func => votingPeriod()", async () => {
        expect(await cc.votingPeriod()).to.equal(50400);
    });

    it("cc.func => propose()", async () => {
        await cc.propose([ma.address], [0], ["0x"], "test1");
        await cc.propose([ma.address], [1], ["0x"], "test2");
        await cc.propose([ma.address], [2], ["0x"], "test3");
    });

    it("cc.func => castVote()", async () => {

        let params: any = [[ma.address], [0], ["0x"], "test1"]

        // propose
        await cc.propose(...params);

        // get proposal id from hashProposal
        params[3] = keccak256(new Buffer(params[3]));
        let proposalId = await cc.hashProposal(...params);
        console.log(`proposalId: ${proposalId}`);

        // delegate votes
        await ma.delegate(owner.address);

        // wait for votingDelay
        await mineBlocks(1);

        await cc.castVote(proposalId, 1); //  0 against / 1 for / 2 abstain

        let votes = await cc.proposalVotes(proposalId);
        console.log(`againstVotes: ${votes[0]}`);
        console.log(`forVotes: ${votes[1]}`);
        console.log(`abstainVotes: ${votes[2]}`);

    });

    it("cc.func => castVote()", async () => {
        let params: any = [[ma.address], [0], ["0x"], "test1"]
        await cc.propose(...params);
        params[3] = keccak256(new Buffer(params[3]));
        let proposalId = await cc.hashProposal(...params);
        await ma.delegate(owner.address);
        await mineBlocks(1);
        await cc.castVote(proposalId, 1); //  0 against / 1 for / 2 abstain

        let votes = await cc.proposalVotes(proposalId);
        console.log(`againstVotes: ${formatEther(votes[0])}`);
        console.log(`forVotes: ${formatEther(votes[1])}`);
    });

    it("cc.func => castVote() v2", async () => {
        let params: any = [[ma.address], [0], ["0x"], "test1"]
        await cc.propose(...params);
        params[3] = keccak256(new Buffer(params[3]));
        let proposalId = await cc.hashProposal(...params);
        await ma.delegate(owner.address);
        await mineBlocks(1);
        await cc.castVote(proposalId, 1); //  0 against / 1 for / 2 abstain

        let votes = await cc.proposalVotes(proposalId);
        console.log(`againstVotes: ${formatEther(votes[0])}`);
        console.log(`forVotes: ${formatEther(votes[1])}`);
    });

});
