import Web3 from "web3";

const providerUrl =
  process.env.REACT_APP_WEB3_PROVIDER || "http://127.0.0.1:7545";

const getWeb3 = async () => {
  if (typeof window !== "undefined" && window.ethereum) {
    const web3 = new Web3(window.ethereum);
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      return web3;
    } catch (error) {
      console.error("User denied account access", error);
      throw error;
    }
  } else if (typeof window !== "undefined" && window.web3) {
    console.log("Legacy dapp browser detected.");
    return new Web3(window.web3.currentProvider);
  } else {
    console.log("No web3 instance injected, using fallback provider.");
    const provider = new Web3.providers.HttpProvider(providerUrl);
    return new Web3(provider);
  }
};

export default getWeb3;
