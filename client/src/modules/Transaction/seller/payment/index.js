import React from "react";
import { connect } from "react-redux";
import { convertWeiToVND } from "../../../../utils/convertCurrency";
import formatCurrency from "../../../../utils/formatCurrency";
import formatDate from "../../../../utils/formatDate";

const Payment = (props) => {
  return (
    <div className="card">
      <div className="card-body">
        <div className="agent-details text-center">
          <img
            src={`${process.env.REACT_APP_BASE_URL}/pending-payment.png`}
            width="150"
            className="my-50"
          />
          <h5 className="mb-5">You have accepted the transaction</h5>
          {props.transaction.state == "DEPOSIT_CONFIRMED" && (
            <p> Please wait for the buyer to pay the remaining amount!</p>
          )}
          <hr />

          <h5 className="mb-5">Payment Details</h5>
          <div className="col-6 offset-sm-3">
            <ul className="address-list">
              <li>
                <span>Deposit receipt date:</span>
                {formatDate(props.transaction.depositConfirmed.time)}
              </li>
              <li>
                <span>Deposit Received:</span>
                {formatCurrency(
                  convertWeiToVND(props.transaction.depositPrice)
                )}
                TZS
              </li>
              <li>
                <span>Remaining Amount:</span>
                {formatCurrency(
                  convertWeiToVND(
                    props.transaction.transferPrice -
                      props.transaction.depositPrice
                  )
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

export default connect(mapStateToProps, null)(Payment);
