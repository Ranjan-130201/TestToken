import React, { useReducer, useCallback, useEffect } from "react";
import Web3 from "web3";
import EthContext from "./EthContext";
import { reducer, actions, initialState } from "./state";

function EthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const init = useCallback(
    async artifact => {
      if (artifact) {
        const {artifact1,artifact2}= artifact;
        const web3 = new Web3(Web3.givenProvider || "ws://localhost:7545");
        const accounts = await web3.eth.requestAccounts();
        const networkID = await web3.eth.net.getId();
        const abi1  = artifact1.abi;
        const abi2  = artifact2.abi;
        let address1,address2, contract1,contract2;
        try {
          address1 = artifact1.networks[networkID].address;
          address2 = artifact2.networks[networkID].address;
          contract1 = new web3.eth.Contract(abi1, address1);
          contract2 = new web3.eth.Contract(abi2, address2);

        } catch (err) {
          console.error(err);
        }
        dispatch({
          type: actions.init,
          data: { artifact1,artifact2, web3, accounts, networkID, contract1,contract2 }
        });
      }
    }, []);

  useEffect(() => {
    const tryInit = async () => {
      try {
        const artifact1 = require("../../contracts/TestToken.json");
        const artifact2 = require("../../contracts/TransactionReciept.json");
        const artifact= {artifact1,artifact2}
        init(artifact);
      } catch (err) {
        console.error(err);
      }
    };

    tryInit();
  }, [init]);

  useEffect(() => {
    const events = ["chainChanged", "accountsChanged"];
    const handleChange = () => {
      init(state.artifact1 && state.artifact2);
    };

    events.forEach(e => window.ethereum.on(e, handleChange));
    return () => {
      events.forEach(e => window.ethereum.removeListener(e, handleChange));
    };
  }, [init, state.artifact]);

  return (
    <EthContext.Provider value={{
      state,
      dispatch
    }}>
      {children}
    </EthContext.Provider>
  );
}

export default EthProvider;
