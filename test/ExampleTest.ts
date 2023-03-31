import {setupFixture, toChainlinkPrice, toUsd} from "../helpers/utils";
import {formatEther, parseEther, parseUnits} from "ethers/lib/utils";
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
