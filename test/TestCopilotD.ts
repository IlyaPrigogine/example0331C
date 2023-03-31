import {setupFixture, toChainlinkPrice, toUsd} from "../helpers/utils";
import {formatEther, parseEther, parseUnits} from "ethers/lib/utils";
import {expect} from "chai";
import {ethers} from "hardhat";
import {getDaiConfig, getWethConfig, getWmaticConfig} from "../helpers/params";
import {errors} from "../helpers/errors";
import {constants} from "ethers";
import {describe} from "mocha";

describe("CopilotD", async () => {
    let
        owner: any,
        user0: any,
        user1: any,
        user2: any,
        ma: any,
        cd: any;
    beforeEach(async () => {
        let fixture = await setupFixture();
        ma = fixture.mockA;
        cd = fixture.copilotD;

        owner = fixture.owner;
        user0 = fixture.user0;
        user1 = fixture.user1;
        user2 = fixture.user2;
    });
    it("cd.func => address", async () => {
        expect(await cd.address).not.to.equal(constants.AddressZero);
    });

    it("cd.func => createProposal()", async () => {
        await cd.createProposal("TEST001");
        expect(await cd.proposalCount()).to.equal(1);
    });

    it("cd.func => vote()", async () => {
        await cd.createProposal("TEST001");
        await cd.vote(0, true);
        await cd.connect(user0).vote(0,true);
        await cd.connect(user1).vote(0,false);

        console.log(`cd.getProposal(0): ${await cd.getProposal(0)}`);
        console.log(`cd.getYesVotes(0): ${await cd.getYesVotes(0)}`);
        console.log(`cd.getNoVotes(0): ${await cd.getNoVotes(0)}`);

        expect(await cd.getYesVotes(0)).to.equal(2);
        expect(await cd.getNoVotes(0)).to.equal(1);
    });

    it("cd.func => executeProposal()", async () => {
        await cd.createProposal("TEST001");
        await cd.vote(0, true);
        await cd.connect(user0).vote(0,true);
        await cd.connect(user1).vote(0,false);
        await cd.executeProposal(0);
    });

});