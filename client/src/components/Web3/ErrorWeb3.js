import React from "react";
import IconNoWeb3 from "./IconNoWeb3";
import InstallMetaMask from "./InstallMetamask";
import "./errorWeb3.css";

const ErrorWeb3 = () => (
  <div className="Web3Provider-container">
    <div className="Web3Provider-wrapper box-shadow">
      <div className="Web3Provider-image">
        <IconNoWeb3 />
      </div>
      <h1 className="Web3Provider-title text-shadow-simple">Web3 Not Found</h1>
      {/* dangerouslySetInnerHTML={{ __html:  }} */}

      <p className="Web3Provider-message">
        It seems that you are using a browser that does not have Web3 available. Please make sure that you are using a browser with Web3 integration, such as{" "}
        <a href="https://brave.com/">Brave</a> or Parity. If you are using the MetaMask or Parity extension on your browser, make sure it is enabled
      </p>
    </div>
    <InstallMetaMask />
  </div>
);

export default ErrorWeb3;
