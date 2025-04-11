import React from "react";
import "./errorWeb3.css";

const WrongNetwork = () => {
  return (
    <div className="text-center">
      <div className="p-2 failed_color">
        <h5 className="text-center dark-blue-text"> Wrong blockchain network!</h5>
        <div className="text-center dark-blue-text">
          Please switch to the network hapa tuko local{" "}
          <strong>{process.env.REACT_APP_WEB3_PROVIDER}</strong> to use the DApp
        </div>
      </div>
    </div>
  );
};

export default WrongNetwork;
