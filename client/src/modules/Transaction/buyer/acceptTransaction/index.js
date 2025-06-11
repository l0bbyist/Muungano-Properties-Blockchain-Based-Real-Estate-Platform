import React from "react";
import { connect } from "react-redux";
import { convertWeiToVND } from "../../../../utils/convertCurrency";
import formatCurrency from "../../../../utils/formatCurrency";
import formatDate from "../../../../utils/formatDate";

const AcceptTransaction = (props) => {
  return (
    <div className="card">
      <div className="card-body">
        <div className="agent-details text-center">
          <img
            src={`${process.env.REACT_APP_BASE_URL}/check.png`}
            width="100"
            className="my-50"
          />
          <h5 className="mb-5">Deposit Yako Imefanikiwa!</h5>
          {props.transaction.state == "DEPOSIT_REQUEST" && (
            <p> Please wait for seller to accept transaction!</p>
          )}
          <hr />

          <h5 className="mb-5">Deposit Details</h5>
          <div className="col-6 offset-sm-3">
            <ul className="address-list">
              <li>
                <span>Deposit Date:</span>
                {formatDate(props.transaction.createdAt)}
              </li>
              <li>
                <span>Deposit Amount:</span>
                {formatCurrency(
                  convertWeiToVND(props.transaction.depositPrice)
                )}
                TZS
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { transaction: state.transaction.data };
};

export default connect(mapStateToProps, null)(AcceptTransaction);
