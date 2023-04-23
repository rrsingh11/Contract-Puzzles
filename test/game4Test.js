const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');
const { ethers } = require('hardhat');

describe('Game4', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game4');
    const game = await Game.deploy();

    const [addr1, addr2] = await ethers.getSigners();


    return { game, addr1, addr2 };
  }
  it('should be a winner', async function () {
    const { game, addr1, addr2 } = await loadFixture(deployContractAndSetVariables);

    // nested mappings are rough :}
    await game.connect(addr1).write(addr2.address)

    await game.connect(addr2).win(addr1.address);

    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});
