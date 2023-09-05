import { ethers } from 'hardhat';

async function main() {
  console.log('Getting signers');

  const [owner, user] = await ethers.getSigners();

  console.log(`Owner: ${owner.address}`);
  console.log(`User: ${user.address}`);

  console.log('Deploying the smart contracts');

  const Sport = await ethers.getContractFactory('Sport');
  const Team = await ethers.getContractFactory('Team');

  const sport = await Sport.deploy('Sport', 'SPRT', 3);
  await sport.deployed();

  const team = await Team.deploy('Team', 'TEAM');
  await team.deployed();

  console.log(`Sport smart contract deployed to ${sport.address}.`);
  console.log(`Team smart contract deployed to ${team.address}.`);

  console.log('Minting Sport NFTs');

  await sport.mint(owner.address, 3);
  //await album.mint(user.address, 1);

  console.log(`Sport balance of owner: ${await sport.balanceOf(owner.address)}`);
  //console.log(`Sport balance of user: ${await album.balanceOf(user.address)}`);

  console.log('Adding asset entries to the Sport smart contract');

  await sport.addAssetEntry(
    'ipfs://QmUuu6oBfY8QAPzyUugjxw5u41qKcp4hrYyWCt7wGmCJ7C/sporty-profile.png',
  );
  await sport.addAssetEntry(
    'ipfs://QmbiM5vdezttJRQq97X9t3qQ271S97fQZ57okTvu96kQy4/intentssportsball-baseball.png',
  );
  await sport.addAssetEntry(
    'ipfs://QmbiM5vdezttJRQq97X9t3qQ271S97fQZ57okTvu96kQy4/intentssportsball-football.png',
  );
  await sport.addAssetEntry(
    'ipfs://QmbiM5vdezttJRQq97X9t3qQ271S97fQZ57okTvu96kQy4/intentssportsball-bball.png',
  );

  console.log('Adding assets to the Sport NFTs');

  await sport.addAssetToTokens([1, 2, 3], 1);
  await sport.addAssetToTokens([1], 2);
  await sport.addAssetToTokens([2], 3);
  await sport.addAssetToTokens([3], 4);

  console.log(`Active assets of Sport NFT 1: ${(await sport.getActiveAssets(1)).length}`);
  console.log(`Pending assets of Sport NFT 1: ${(await sport.getPendingAssets(1)).length}`);
  console.log(`Active assets of Sport NFT 2: ${(await sport.getActiveAssets(2)).length}`);
  console.log(`Pending assets of Sport NFT 2: ${(await sport.getPendingAssets(2)).length}`);
  console.log(`Active assets of Sport NFT 3: ${(await sport.getActiveAssets(3)).length}`);
  console.log(`Pending assets of Sport NFT 3: ${(await sport.getPendingAssets(3)).length}`);

  //console.log('Accepting assets for Sport NFT 3');

  // await album.connect(user).acceptAsset(3, 0, 1);
  // await album.connect(user).acceptAsset(3, 0, 2);

  // console.log(`Active assets of Sport NFT 3: ${(await album.getActiveAssets(3)).length}`);
  // console.log(`Pending assets of Sport NFT 3: ${(await album.getPendingAssets(3)).length}`);

  console.log('Minting Song NFTs into Sport NFTs');

  await team.nestMint(sport.address, 1, 30);
  await team.nestMint(sport.address, 2, 32);
  await team.nestMint(sport.address, 3, 32);

  console.log(`Active child tokens of Sport NFT 1: ${(await sport.childrenOf(1)).length}`);
  console.log(`Pending child tokens of Sport NFT 1: ${(await sport.pendingChildrenOf(1)).length}`);
  console.log(`Active child tokens of Sport NFT 2: ${(await sport.childrenOf(2)).length}`);
  console.log(`Pending child tokens of Sport NFT 2: ${(await sport.pendingChildrenOf(2)).length}`);
  console.log(`Active child tokens of Sport NFT 3: ${(await sport.childrenOf(3)).length}`);
  console.log(`Pending child tokens of Sport NFT 3: ${(await sport.pendingChildrenOf(3)).length}`);

  console.log('Accepting child tokens for Sport NFTs');

  await sport.acceptChild(1, 0, team.address, 1); // (tokenId, index, childContract, childTokenId)
  await sport.acceptChild(1, 0, team.address, 3);
  await sport.acceptChild(1, 0, team.address, 2);
  await sport.acceptChild(2, 0, team.address, 4);
  await sport.acceptChild(2, 0, team.address, 6);
  await sport.acceptChild(2, 0, team.address, 5);
  // await album.connect(user).acceptChild(3, 0, team.address, 7);
  // await album.connect(user).acceptChild(3, 0, team.address, 9);
  // await album.connect(user).acceptChild(3, 0, team.address, 8);

  console.log(`Active child tokens of Sport NFT 1: ${(await sport.childrenOf(1)).length}`);
  console.log(`Pending child tokens of Sport NFT 1: ${(await sport.pendingChildrenOf(1)).length}`);
  console.log(`Active child tokens of Sport NFT 2: ${(await sport.childrenOf(2)).length}`);
  console.log(`Pending child tokens of Sport NFT 2: ${(await sport.pendingChildrenOf(2)).length}`);
  console.log(`Active child tokens of Sport NFT 3: ${(await sport.childrenOf(3)).length}`);
  console.log(`Pending child tokens of Sport NFT 3: ${(await sport.pendingChildrenOf(3)).length}`);

  console.log('Adding asset entries to the Song smart contract');

  await team.addAssetEntry('ipfs://audio1');
  await team.addAssetEntry('ipfs://metadata1');
  await team.addAssetEntry('ipfs://lyrics1');
  await team.addAssetEntry('ipfs://audio2');
  await team.addAssetEntry('ipfs://metadata2');
  await team.addAssetEntry('ipfs://lyrics2');
  await team.addAssetEntry('ipfs://audio3');
  await team.addAssetEntry('ipfs://metadata3');
  await team.addAssetEntry('ipfs://lyrics3');

  console.log('Adding assets to the Team NFTs');

  await team.addAssetToTokens([1, 4, 7], [1, 2, 3]);
  await team.addAssetToTokens([2, 5, 8], [4, 5, 6]);
  await team.addAssetToTokens([3, 6, 9], [7, 8, 9]);

  console.log(`Active assets of Team NFT 1: ${(await team.getActiveAssets(1)).length}`);
  console.log(`Pending assets of Team NFT 1: ${(await team.getPendingAssets(1)).length}`);
  console.log(`Active assets of Team NFT 4: ${(await team.getActiveAssets(4)).length}`);
  console.log(`Pending assets of Team NFT 4: ${(await team.getPendingAssets(4)).length}`);
  console.log(`Active assets of Team NFT 7: ${(await team.getActiveAssets(7)).length}`);
  console.log(`Pending assets of Team NFT 7: ${(await team.getPendingAssets(7)).length}`);

  console.log('Accepting assets for the Team NFTs not belonging to the owner');

  // await team.connect(user).acceptAsset(7, 0, 1);
  // await team.connect(user).acceptAsset(7, 0, 3);
  // await team.connect(user).acceptAsset(7, 0, 2);
  // await team.connect(user).acceptAsset(8, 0, 4);
  // await team.connect(user).acceptAsset(8, 0, 6);
  // await team.connect(user).acceptAsset(8, 0, 5);
  // await team.connect(user).acceptAsset(9, 0, 7);
  // await team.connect(user).acceptAsset(9, 0, 9);
  // await team.connect(user).acceptAsset(9, 0, 8);

  console.log(`Active assets of Song NFT 1: ${(await team.getActiveAssets(1)).length}`);
  console.log(`Pending assets of Song NFT 1: ${(await team.getPendingAssets(1)).length}`);
  console.log(`Active assets of Song NFT 4: ${(await team.getActiveAssets(4)).length}`);
  console.log(`Pending assets of Song NFT 4: ${(await team.getPendingAssets(4)).length}`);
  console.log(`Active assets of Song NFT 7: ${(await team.getActiveAssets(7)).length}`);
  console.log(`Pending assets of Song NFT 7: ${(await team.getPendingAssets(7)).length}`);

  console.log('Observing the child-parent relationship');

  console.log(`Children of Sport NFT 1: ${await sport.childrenOf(1)}`);
  console.log(`Children of Sport NFT 2: ${await sport.childrenOf(2)}`);
  console.log(`Children of Sport NFT 3: ${await sport.childrenOf(3)}`);
  console.log(`Parent of Sport NFT 1: ${await sport.directOwnerOf(1)}`);
  console.log(`Parent of Team NFT 1: ${await team.directOwnerOf(1)}`);
  console.log(`Parent of Team NFT 4: ${await team.directOwnerOf(4)}`);
  console.log(`Parent of Team NFT 7: ${await team.directOwnerOf(7)}`);
  console.log(`Owner of Team NFT 1: ${await team.ownerOf(1)}`);
  console.log(`Owner of Team NFT 4: ${await team.ownerOf(4)}`);
  console.log(`Owner of Team NFT 7: ${await team.ownerOf(7)}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
