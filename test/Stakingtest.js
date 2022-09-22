const { expect } = require("chai");
const { ethers } = require("hardhat");


describe("TOKEN TEST", async function () {

    let stakingToken;

    async function deploy() {

        const _supply = ethers.utils.parseEther("1000000");

        const _owner = "0x3769C1F158DB28A5a098C00ACC8EE6cdF91B27E3"
        const StakingToken = await ethers.getContractFactory("StakingToken");
        stakingToken = await StakingToken.deploy(_owner, _supply);
        await stakingToken.deployed();
        console.log("StakingToken ==>", stakingToken.address)
    }

    before("Before", async () => {
        accounts = await ethers.getSigners();

        await deploy();

    })

    it("should Token name be", async () => {
        //let TokenName
        try {
            TokenName = await stakingToken.name();
        } catch (error) {
            console.log(error)
        }

        console.log("TokenName: ", TokenName);

        expect(TokenName).to.equal("SAMRATH");

    })

    it("Symbol check", async () => {
        try {
            TokenSymbol = await stakingToken.symbol();
        } catch (error) {
            console.log(error)
        }

        console.log("TokenSymbol ==>", TokenSymbol);
        expect(TokenSymbol).to.equal("SAM");

    })

    it("Balnace of Sender", async () => {
        try {
            balanceSender = await stakingToken.balanceOf(accounts[0].address)
            balanceSender = balanceSender.toString()
            console.log("balanceSender ========>", BigNumber(balanceSender))
        } catch (error) {
            console.log(error)
        }
        expect(balanceSender).to.equal("0");
    })

    it("Owner", async () => {
        let conOwner
        try {
            conOwner = await stakingToken.owner();
        } catch (error) {

        }
        console.log("conOwner ===>", conOwner);
        expect(conOwner).to.equal(accounts[0].address);
    })

    it('should add stakeholder', async () => {
        holderCountBefore = await stakingToken.stakeHolderCount()
        console.log("Token holder counts ==>", holderCountBefore)

        await stakingToken.addStakeholder(accounts[5].address)

        holderCountAfter = await stakingToken.stakeHolderCount()
        console.log("Token holder counts ==>", holderCountAfter)

        expect(holderCountBefore).to.equal(0)
        expect(holderCountAfter).to.equal(1)
        expect(holderCountAfter).to.above(holderCountBefore)

    });

    it('should remove stakeholder', async () => {
        holderCountBefore = await stakingToken.stakeHolderCount()
        console.log("Token holder counts ==>", holderCountBefore)

        await stakingToken.removeStakeholder(accounts[5].address)

        holderCountAfter = await stakingToken.stakeHolderCount()
        console.log("Token holder counts ==>", holderCountAfter)

        expect(holderCountBefore).to.equal(1)
        expect(holderCountAfter).to.equal(0)
        expect(holderCountAfter).to.below(holderCountBefore)

    });

    it('should create stake', async () => {
        stakeBefore = await stakingToken.stakeOf(accounts[1].address)
        console.log("stakeBefore ==>", stakeBefore)

        await stakingToken.mint(accounts[1].address, ethers.utils.parseEther("1000"))

        userTokenBalBefore = await stakingToken.balanceOf(accounts[1].address)
        console.log("balance of user before ====>", userTokenBalBefore)

        await stakingToken.connect(accounts[1]).createStake(ethers.utils.parseEther("100"))

        stakeAfter = await stakingToken.stakeOf(accounts[1].address)
        console.log("stakeAfter ==>", stakeAfter)

        userTokenBalAfter = await stakingToken.balanceOf(accounts[1].address)
        console.log("balance of user after ====>", userTokenBalAfter)

        expect(stakeBefore).to.equal(0)
        expect(String(stakeAfter)).to.equal("100000000000000000000")

        expect(String(userTokenBalBefore)).to.equal("1000000000000000000000")
        expect(String(userTokenBalAfter)).to.equal("900000000000000000000")

    });

    it('should remove stake', async () => {
        stakeBefore = await stakingToken.stakeOf(accounts[1].address)
        console.log("stakeBefore ==>", stakeBefore)

        userTokenBalBefore = await stakingToken.balanceOf(accounts[1].address)
        console.log("balance of user before ====>", userTokenBalBefore)

        await stakingToken.connect(accounts[1]).removeStake(ethers.utils.parseEther("50"))

        stakeAfter = await stakingToken.stakeOf(accounts[1].address)
        console.log("stakeAfter ==>", stakeAfter)

        userTokenBalAfter = await stakingToken.balanceOf(accounts[1].address)
        console.log("balance of user after ====>", userTokenBalAfter)

        expect(String(stakeBefore)).to.equal("100000000000000000000")
        expect(String(stakeAfter)).to.equal("50000000000000000000")

        expect(String(userTokenBalBefore)).to.equal("900000000000000000000")
        expect(String(userTokenBalAfter)).to.equal("950000000000000000000")

    });






});










  // [
        //     owner, ankit, bhuvan, chitra, daksh, ekta, fateh, gagan, hari, isha,] = accounts;
