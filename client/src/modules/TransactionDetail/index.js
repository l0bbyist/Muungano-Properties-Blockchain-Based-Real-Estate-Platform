import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import formatDate from "../../utils/formatDate";
import { convertWeiToVND } from "../../utils/convertCurrency";
import axios from "axios";
import formatCurrency from "../../utils/formatCurrency";

function TransactionDetail(props) {
  const [buyers, setBuyers] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [transaction, setTransaction] = useState({});
  const [property, setProperty] = useState({});

  // get all user infor from publicAddress
  const getUserProfile = async (publicAddress) => {
    const response = await axios({
      method: "GET",
      url: `${process.env.REACT_APP_BASE_URL_API}/users/${publicAddress}`,
    });
    return response.data.data;
  };

  const getParticipantsInfo = async (buyers, sellers) => {
    const promises1 = buyers.map((publicAddress) =>
      getUserProfile(publicAddress)
    );
    const promises2 = sellers.map((publicAddress) =>
      getUserProfile(publicAddress)
    );
    return Promise.all([Promise.all(promises1), Promise.all(promises2)]);
  };

  // get participants information
  useEffect(() => {
    (async () => {
      const responseT = await axios({
        method: "get",
        url: `${process.env.REACT_APP_BASE_URL_API}/transaction/${props.match.params.txHash}`,
      });
      let transaction = responseT.data.data;
      const responseP = await axios({
        method: "get",
        url: `${process.env.REACT_APP_BASE_URL_API}/certification/id-in-blockchain/${transaction.idPropertyInBlockchain}`,
      });
      let property = responseP.data.data;
      const [buyersInfo, sellersInfo] = await getParticipantsInfo(
        transaction.buyers,
        transaction.sellers
      );
      setTransaction(transaction);
      setProperty(property);
      setBuyers(buyersInfo);
      setSellers(sellersInfo);
    })();
  }, []);

  let renderTimeline = (transaction) => {
    let cycleTransaction = [
      "DEPOSIT_REQUEST",
      "DEPOSIT_CANCELED_BY_BUYER",
      "DEPOSIT_CANCELED_BY_SELLER",
      "DEPOSIT_CONFIRMED",
      "DEPOSIT_BROKEN_BY_SELLER",
      "DEPOSIT_BROKEN_BY_BUYER",
      "PAYMENT_REQUEST",
      "DEPOSIT_BROKEN_BY_BUYER",
      "TRANSFER_CANCELED_BY_SELLER",
      "PAYMENT_CONFIRMED",
    ];

    const data = {
      DEPOSIT_REQUEST: {
        // title: `${buyers[0] && buyers[0].fullName} deposit`,
        title: `Deposit Required`,
        time: formatDate(transaction.createdAt),
        description: `${
          buyers[0] && buyers[0].fullName
        } sent deposit request to ${
          sellers[0] && sellers[0].fullName
        } value ${formatCurrency(
          convertWeiToVND(transaction.depositPrice)
        )} TZS`,
        explorer: transaction.transactionHash,
      },

      DEPOSIT_CANCELED_BY_BUYER: {
        // title: `${buyers[0] && buyers[0].fullName} Cancel deposit`,
        title: `Transaction Halted`,
        time:
          transaction.transactionCanceled &&
          formatDate(transaction.transactionCanceled.time),
        description: `${
          buyers[0] && buyers[0].fullName
        } cancelled deposit request and got deposit back ${formatCurrency(
          convertWeiToVND(transaction.depositPrice)
        )} TZS`,
        explorer:
          transaction.transactionCanceled &&
          transaction.transactionCanceled.txHash,
      },

      DEPOSIT_CANCELED_BY_SELLER: {
        // title: `${sellers[0] && sellers[0].fullName} từ chối giao dịch`,
        title: `Transaction Halted`,
        time:
          transaction.transactionCanceled &&
          formatDate(transaction.transactionCanceled.time),
        description: `${
          sellers[0] && sellers[0].fullName
        } refused the transaction and ${
          buyers[0] && buyers[0].fullName
        } received back ${formatCurrency(
          convertWeiToVND(transaction.depositPrice)
        )} TZS deposit `,
        explorer:
          transaction.transactionCanceled &&
          transaction.transactionCanceled.txHash,
      },

      DEPOSIT_CONFIRMED: {
        // title: `${
        //   sellers[0] && sellers[0].fullName
        // } chấp nhận giao dịch và nhận đặt cọc`,
        title: `Accept Transactions`,
        time:
          transaction.depositConfirmed &&
          formatDate(transaction.depositConfirmed.time),
        description: `${
          sellers[0] && sellers[0].fullName
        } accepted transactions with ${
          buyers[0] && buyers[0].fullName
        } and received ${formatCurrency(
          convertWeiToVND(transaction.depositPrice)
        )} TZS deposit`,
        explorer:
          transaction.depositConfirmed && transaction.depositConfirmed.txHash,
      },

      DEPOSIT_BROKEN_BY_SELLER: {
        // title: `${sellers[0] && sellers[0].fullName} hủy giao dịch`,
        title: `Transaction Failed`,
        time:
          transaction.transactionCanceled &&
          formatDate(transaction.transactionCanceled.time),
        description: `${
          sellers[0] && sellers[0].fullName
        } Cancellation of transaction and compensation for contract ${
          buyers[0] && buyers[0].fullName
        } value ${formatCurrency(
          convertWeiToVND(transaction.depositPrice * 2)
        )} TZS`,
        explorer:
          transaction.transactionCanceled &&
          transaction.transactionCanceled.txHash,
      },

      DEPOSIT_BROKEN_BY_BUYER: {
        // title: `${buyers[0] && buyers[0].fullName} hủy giao dịch`,
        title: `Transaction Failed`,
        time:
          transaction.transactionCanceled &&
          formatDate(transaction.transactionCanceled.time),
        description: `${
          buyers[0] && buyers[0].fullName
        } Cancelled transaction and lost deposit`,
        explorer:
          transaction.transactionCanceled &&
          transaction.transactionCanceled.txHash,
      },

      PAYMENT_REQUEST: {
        // title: `${buyers[0] && buyers[0].fullName} thanh toán số tiền còn lại`,
        title: `Payment`,
        time: transaction.payment && formatDate(transaction.payment.time),
        description: `${
          buyers[0] && buyers[0].fullName
        } paid the remaining amount: ${formatCurrency(
          convertWeiToVND(transaction.transferPrice - transaction.depositPrice)
        )} TZS to ${
          sellers[0] && sellers[0].fullName
        } plus tax ${formatCurrency(
          convertWeiToVND(transaction.transferPrice * 0.005)
        )} TZS`,
        explorer: transaction.payment && transaction.payment.txHash,
      },

      TRANSFER_CANCELED_BY_BUYER: {
        // title: `${buyers[0] && buyers[0].fullName} hủy giao dịch`,
        title: `Transaction Failed`,
        time:
          transaction.transactionCanceled &&
          formatDate(transaction.transactionCanceled.time),
        description: `${
          buyers[0] && buyers[0].fullName
        } Cancelled transaction and got back amt paid prior ${formatCurrency(
          convertWeiToVND(transaction.transferPrice - transaction.depositPrice)
        )} TZS + tax ${formatCurrency(
          convertWeiToVND(transaction.transferPrice * 0.005)
        )} TZS and lost deposit`,
        explorer:
          transaction.transactionCanceled &&
          transaction.transactionCanceled.txHash,

        explorer: transaction.payment && transaction.payment.txHash,
      },
      TRANSFER_CANCELED_BY_SELLER: {
        // title: `${sellers[0] && sellers[0].fullName} hủy giao dịch`,
        title: `Transaction Failed`,
        time:
          transaction.transactionCanceled &&
          formatDate(transaction.transactionCanceled.time),
        description: `${
          sellers[0] && sellers[0].fullName
        } Cancellation of transaction and contract compensation ${formatCurrency(
          convertWeiToVND(transaction.depositPrice * 2)
        )} TZS to ${buyers[0] && buyers[0].fullName}.  ${
          buyers[0] && buyers[0].fullName
        } multiply the amount paid and the contract compensation.`,
        explorer:
          transaction.transactionCanceled &&
          transaction.transactionCanceled.txHash,
      },
      PAYMENT_CONFIRMED: {
        // title: `${sellers[0] && sellers[0].fullName} chấp nhận thanh toán`,
        title: `Confirm Transaction`,
        time:
          transaction.paymentConfirmed &&
          formatDate(transaction.paymentConfirmed.time),
        description: `${
          sellers[0] && sellers[0].fullName
        } received the remaining amount: ${formatCurrency(
          convertWeiToVND(transaction.transferPrice - transaction.depositPrice)
        )} TZS - tax ${formatCurrency(
          convertWeiToVND(transaction.transferPrice * 0.002)
        )} TZS. ${buyers[0] && buyers[0].fullName} took ownership of property`,
        explorer:
          transaction.paymentConfirmed && transaction.paymentConfirmed.txHash,
      },
    };

    return cycleTransaction.map((item, index) => {
      let pos = 0;
      if (transaction.state == "CANCELED") {
        pos = cycleTransaction.findIndex(
          (item) => item == transaction.transactionCanceled.reason
        );
      } else {
        pos = cycleTransaction.findIndex((item) => item == transaction.state);
      }
      if (
        index < pos &&
        (item.includes("BROKEN") || item.includes("CANCELED"))
      ) {
        return "";
      }
      if (index > pos) {
        return "";
      }
      return (
        <div class="row" key={index}>
          <div class="col-auto text-center flex-column d-none d-sm-flex">
            <div class="row h-50">
              <div class="col border-right">&nbsp;</div>
              <div class="col">&nbsp;</div>
            </div>
            <h5 class="m-2">
              <span class="badge badge-pill bg-success border">&nbsp;</span>
            </h5>
            <div class="row h-50">
              <div class="col border-right">&nbsp;</div>
              <div class="col">&nbsp;</div>
            </div>
          </div>
          <div class="col py-2">
            <div class="card border-success shadow">
              <div class="card-body">
                <div class="float-right text-success">{data[item].time}</div>
                <h4 class="card-title text-success">{data[item].title}</h4>
                <p class="card-text">{data[item].description}</p>
                <a
                  target="_blank"
                  href={`${process.env.REACT_APP_EXPLORER}/tx/${data[item].explorer}`}
                >
                  Check Transactions on Blockchain
                </a>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="container mt-100">
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="agent-details col-6">
              <h5>Asset (s)</h5>
              <ul className="address-list">
                <li>
                  <span>Location:</span>
                  {property &&
                    property.properties &&
                    property.properties.landLot.address}
                </li>
                <li>
                  <span>Deposit Value:</span>
                  {formatCurrency(
                    convertWeiToVND(transaction.depositPrice)
                  )}{" "}
                  TZS
                </li>
                <li>
                  <span>Transaction Value:</span>
                  {formatCurrency(
                    convertWeiToVND(transaction.transferPrice)
                  )}{" "}
                  TZS
                </li>
              </ul>
            </div>
            <div className="agent-details col-6">
              <h5>Transaction Time</h5>
              <ul className="address-list">
                <li>
                  <span>Start Date:</span>
                  {formatDate(transaction.timeStart)}
                </li>
                <li>
                  <span>End Date:</span>
                  {formatDate(transaction.timeEnd)}
                </li>
              </ul>
            </div>

            <hr />
            <div className="agent-details col-6">
              <h5>Transferring Party</h5>
              {sellers.map((item, index) => (
                <ul className="address-list" key={index}>
                  <li>
                    <span>Full Name:</span>
                    {item.fullName}
                  </li>
                  <li>
                    <span>NIDA ID:</span>
                    {item.idNumber}
                  </li>
                  <li>
                    <span>Email:</span>
                    {item.email}
                  </li>
                </ul>
              ))}
            </div>
            <div className="agent-details col-6">
              <h5>Transferee</h5>
              {buyers.map((item, index) => (
                <ul className="address-list" key={index}>
                  <li>
                    <span>Full Name:</span>
                    {item.fullName}
                  </li>
                  <li>
                    <span>NIDA ID:</span>
                    {item.idNumber}
                  </li>
                  <li>
                    <span>Email:</span>
                    {item.email}
                  </li>
                </ul>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div class="container py-2">
        <h3 class="font-weight-light text-center text-muted py-3">
          Transaction History
        </h3>
        {renderTimeline(transaction)}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    transaction: state.transaction.data,
    property: state.transaction.property,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(TransactionDetail);
