truffle init
1. vue create frontend-app
2. npm i web3@1.0.0-beta.34 truffle-contract
3. CSS: https://tailwindcss.com/docs/installation/
4. npm run dev

Deploying the contract locally:
1. truffle create migration "name_of_the_file"
2. copy the contract from remix to "contracts" in truffle-project
3. in created migration file "name_of_the_file" write:

const nameOfTheContract = artifacts.require('./name_of_the_file');
module.exports = function(deployer) {
	deployer.deploy(nameOfTheContract)
}

4. truffle develop // runs local RPC - Blockchain
and execute migrate // compile and deploy contract
5. create a couple of accounts in metamask
6. in "src" of project, create contract folder, then index.js file and write:

import contract from 'truffle-contract';
import storageArtifact from '../../build/contracts/nameofTheContract';

const nameOfTheContract = contract(storageArtifact); // kind of a constructor

export {
	nameOfTheContract
}

7. in vuex store/index.js write

...
...
import Web3 from 'web3';
import {nameOfTheContract} from "../contracts";

8. initialize web3, write:

initWeb3({dispatch}) {
	...
		if(typeof web3 !== 'undefined') {
		window.web3 = new Web3(web3.currentProvider); // our instance of metamask, provided by Metamask
		nameOfTheContract.setProvider(web3.currentProvider);
		dispatch('watchWeb3Account');
		...
	}
},
watchWeb3Account({commit, dispatch, state}) {
	setInterval(async () => {
		const accounts = await web3.eth.getAccounts();
		const activeAccount = accounts[0];
		
		if(!activeAccount) return;
		
		if(activeAccount !== state.account) {
			// change an account via mutation
		}
	}, 500);
}

NOTE: web3 is now a part of the DOM, write in console window.web3, web3.web3.currentProvider(says which provider is used)
and in App.vue in mounted, write:

this.$store.dispatch('initWeb3')

9. There where data from the blockchain are to be inserted, write:

 let instance = await nameOfTheContract.deployed(); // getting the contract
 try {
	await contract.setData(state.name, state.age, {from: state.account/*, gas: 1000*/}); // call to any method from the contract API
	// NOTE: every writing into the contract, requires "{from: state.account/*, gas: 1000*/}"!, otherwise not
 } catch(err) {}
 

