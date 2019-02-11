import Vue from 'vue'
import Vuex from 'vuex'
import Web3 from 'web3'
import * as types from './mutation-types';
import { NageContract } from '../contracts';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    account: '',
    name: '',
    age: ''
  },
  getters: {
    account: state => state.account,
    name: state => state.name,
    age: state => state.age == 0 ? '' : state.age
  },
  mutations: {
    [types.UPDATE_ACCOUNT](state, account) {
      state.account = account;
    },
    [types.UPDATE_NAME](state, name) {
      state.name = name;
    },
    [types.UPDATE_AGE](state, age) {
      state.age = age;
    }
  },
  actions: {
    async initWeb3({dispatch}) {
      if(window.web3) {
        window.web3 = new Web3(web3.currentProvider); // use our own version of metamask

        try {
            await window.ethereum.enable(); // from 2nd November 2018
            console.log('initWeb3');
        } catch (error) {
            console.log('ACCESS DENIED BY USER');
        }

        dispatch('watchWeb3Account');
        dispatch('setContractProvider');

        if (web3) {
          switch (web3.version.network) {
            case '1':
              console.log('This is mainnet');
              break;
            case '2':
              console.log('This is the deprecated Morden test network.');
              break;
            case '3':
              console.log('This is the ropsten test network.');
              break;
            case '4':
              console.log('This is the Rinkeby test network.');
              break;
            case '42':
              console.log('This is the Kovan test network.');
              break;
            default:
              console.log('This is an unknown network.');
          }
        } else {
          console.log('No web3? You should consider trying MetaMask!');
          web3 = new Web3(web3.currentProvider);
        }
      } else if(window.ethereum) {
          try {
              await ethereum.enable();
          } catch (error) {
              // User denied account access...
          }
      } else {
          console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
      }
    },
    watchWeb3Account({commit, dispatch, state}) {
      setInterval(async () => {
        const accounts = await web3.eth.getAccounts();
        const activeAccount = accounts[0];

        console.log('watchWeb3Account');

        if(!activeAccount) return;

        console.log('watchWeb3Account33333333');
        console.log(accounts);
        if(activeAccount !== state.account) {
          commit(types.UPDATE_ACCOUNT, activeAccount);
          dispatch('getInitialData');
        }
      }, 500);
    },
    setContractProvider() {
      NageContract.setProvider(new Web3.providers.HttpProvider("http://localhost:9545")); // to which network our contract belongs
    },
    async setData({state}) {
      let instance = await NageContract.deployed(); // gets deployed version of contract(latest)
      try {
        let result = await instance.setData(state.name, state.age, {from: state.account});
        console.log('success');
        console.log(result);
      } catch(err) {
          console.log('Greskica:');
          console.log(err)
      }
    },
    async getInitialData({commit, state}) {
      let instance = await NageContract.deployed();
      const result = await instance.getPersonData(state.account);

      /*commit(types.UPDATE_NAME, result[0]);
      commit(types.UPDATE_AGE, result[1].words[0]);*/
      commit(types.UPDATE_NAME, result[0]);
      commit(types.UPDATE_AGE, result[1].words[0]);
    }
  }
})
