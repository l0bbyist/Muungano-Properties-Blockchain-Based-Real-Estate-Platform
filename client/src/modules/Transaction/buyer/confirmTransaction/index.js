import React from "react";
import { connect } from "react-redux";
import { convertWeiToVND } from "../../../../utils/convertCurrency";
import formatCurrency from "../../../../utils/formatCurrency";
import formatDate from "../../../../utils/formatDate";

const ConfirmTransaction = (props) => {
  return (
    <div className="card">
      <div className="card-body">
        <div className="agent-details text-center">
          <img
            src={`${process.env.REACT_APP_BASE_URL}/payment.png`}
            width="150"
            className="my-50"
          />
          <h5 className="mb-5">Your payment has been successful!</h5>
          {props.transaction.state == "PAYMENT_REQUEST" && (
            <p> Please wait for seller to confirm payment!</p>
          )}
          <hr />

          <h5 className="mb-5">Payment Details</h5>
          <div className="col-6 offset-sm-3">
            <ul className="address-list">
              <li>
                <span>Deposit Amount:</span>
                {formatCurrency(
                  convertWeiToVND(props.transaction.depositPrice)
                )}
                TZS
              </li>
              <li>
                <span>Payment amount:</span>
                {formatCurrency(
                  convertWeiToVND(
                    props.transaction.transferPrice -
                      props.transaction.depositPrice
                  )
                )}
                TZS
              </li>
              <li>
                <span>Personal income tax:</span>
                {formatCurrency(
                  convertWeiToVND(props.transaction.transferPrice * 0.005)
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

export default connect(mapStateToProps, null)(ConfirmTransaction);
