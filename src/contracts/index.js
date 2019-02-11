import contract from 'truffle-contract';
import nageArtifact from '../../build/contracts/NageContract';

const NageContract = contract(nageArtifact); // myObject = new StorageContract()

export {
  NageContract
};
