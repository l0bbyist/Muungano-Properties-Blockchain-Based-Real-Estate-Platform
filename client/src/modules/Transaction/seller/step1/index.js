import React from "react";
import { connect } from "react-redux";

const StepOne = (props) => {
  return (
    <div className="card">
      <div className="card-body">
        <div className="agent-details text-center">
          <img
            src={`${process.env.REACT_APP_BASE_URL}/pending-payment.png`}
            width="150"
            className="my-50"
          />
          <h5 className="mb-5">You have a deposit offer</h5>
          <p> Vigezo & Masharti Kuzingatiwa!</p>
          <hr />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { transaction: state.transaction.data };
};

export default connect(mapStateToProps, null)(StepOne);
