const truffleAssert = require('truffle-assertions');
const contractTruffle = require('truffle-contract');
const { toWei, toBN, fromWei } = web3.utils;
const timeHelper = require('./utils/index');

/* Contract Artifacts */
const CheckDot = artifacts.require('CheckDot');


contract('Test', async (accounts) => {  
  let owner;
  let tester;

  let contract;

  let snapShotId; // test blockchain snapshot

  before(async () => {
    snapShotId = await timeHelper.takeSnapshot();

    // accounts
    console.log("--------------------------------------------------------------------------");
    owner = accounts[0];
    console.log('Owner                  address:', owner);
    tester = accounts[1]
    console.log('Tester                 address:', tester);

    // Contracts
    console.log("--------------------------------------------------------------------------");
    contract = await CheckDot.new(owner, { from: owner });
    console.log('Contract               address:', contract.address);
    console.log("--------------------------------------------------------------------------");
  });

  after(async () => {
    await timeHelper.revertToSnapShot(snapShotId);
  });

  it('Initial Balance', async () => {
    let balance = await contract.balanceOf(owner);

    assert.equal(web3.utils.fromWei(balance), "10000000", "Incorrect initial balance");
  });

  it('Send 100 CDT to tester', async () => {
    await contract.transfer(tester, toWei('100', 'ether'), { from: owner }); // add 100 tokens to tester

    let balanceTester = await contract.balanceOf(tester);

    assert.equal(balanceTester, toWei('100', 'ether'), 'Tester Balance should be equals 100 CDT');
  });

  it('Check CDT tester holding time', async () => {
    const currentBlockTimeStamp = ((await web3.eth.getBlock("latest")).timestamp);

    let time = await contract.holdTimeOf(tester);

    assert.equal(Number(time.toString()), Number(currentBlockTimeStamp), 'Tester Holding time error');
  });

});