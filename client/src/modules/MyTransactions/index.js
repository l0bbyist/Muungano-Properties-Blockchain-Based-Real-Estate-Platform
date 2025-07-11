import React, { Component } from "react";
import MaterialTable from "material-table";

import axios from "axios";
import Cookie from "../../helper/cookie";
import formatDate from "../../utils/formatDate";
import { convertWeiToVND } from "../../utils/convertCurrency";
import formatCurrency from "../../utils/formatCurrency";

const state = {
  DEPOSIT_REQUEST: "Depositing",
  DEPOSIT_CONFIRMED: "Deposit Confirmed",
  PAYMENT_REQUEST: "Processing Payment",
  PAYMENT_CONFIRMED: "Transaction Successful",
  CANCELED: "Canceled",
};

export default class MyTransactons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: "Address",
          field: "title",
        },
        {
          title: "Transaction Value",
          field: "transferPrice",
        },
        {
          title: "Start Date",
          field: "timeStart",
        },
        {
          title: "Transaction Type",
          field: "transactionType",
          render: (rowData) => (
            <span
              style={{
                backgroundColor: `$
                  {rowData.transactionType === "buy" ? "green" : "orange"}`,
                color: "white",
                padding: "5px 10px",
                width: "100px",
                textAlign: "center",
              }}
            >
              {rowData.transactionType}
            </span>
          ),
        },
        {
          title: "Status",
          field: "state",
          render: (rowData) => {
            switch (rowData.state) {
              case "CANCELED":
                return (
                  <span
                    style={{
                      color: "red",
                    }}
                  >
                    <i class="far fa-times-circle"></i> {state[rowData.state]}
                  </span>
                );
              case "PAYMENT_CONFIRMED":
                return (
                  <span
                    style={{
                      color: "green",
                    }}
                  >
                    <i class="fas fa-clipboard-check"></i>{" "}
                    {state[rowData.state]}
                  </span>
                );
              default:
                return (
                  <span
                    style={{
                      color: "orange",
                    }}
                  >
                    <i class="fas fa-spinner"></i> {state[rowData.state]}
                  </span>
                );
            }
          },
        },
        {
          title: "Check on Blockchain",
          field: "hash",
          render: (rowData) => (
            <a
              target="_blank"
              href={`${process.env.REACT_APP_EXPLORER}/tx/${rowData.hash}`}
            >
              {"View"}
            </a>
          ),
        },
      ],
      data: [],
      rowSelected: {},
      _isLoading: false,
    };
  }
  componentDidMount = async () => {
    this.fetchData();
  };

  fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL_API}/transaction`,
        {
          headers: {
            Authorization: `Bearer ${Cookie.getCookie("accessToken")}`,
          },
        }
      );
      const {
        properties,
        transactionBuy,
        transactionSale,
      } = response.data.data;

      let data1 = transactionBuy.map((transaction, index) => ({
        hash: transaction.transactionHash,
        title: properties.find(
          (item) => item.idInBlockchain == transaction.idPropertyInBlockchain
        ).properties.landLot.address,
        transferPrice: `${formatCurrency(
          convertWeiToVND(transaction.transferPrice)
        )} TZS`,
        timeStart: formatDate(transaction.timeStart),
        transactionType: "Buy",
        state: transaction.state,
      }));
      let data2 = transactionSale.map((transaction, index) => ({
        hash: transaction.transactionHash,
        title: properties.find(
          (item) => item.idInBlockchain == transaction.idPropertyInBlockchain
        ).properties.landLot.address,
        transferPrice: `${formatCurrency(
          convertWeiToVND(transaction.transferPrice)
        )} TZS`,
        timeStart: formatDate(transaction.timeStart),
        transactionType: "Sell",
        state: transaction.state,
      }));

      this.setState({
        data: [...data1, ...data2],
        _isLoading: false,
      });
    } catch (error) {
      console.log(error);
    }
  };

  previewDetail = (event, rowData) => {
    if (["PAYMENT_CONFIRMED", "CANCELED"].includes(rowData.state)) {
      this.props.history.push(`/transaction-detail/${rowData.hash}`);
    } else {
      this.props.history.push(`/transaction/${rowData.hash}`);
    }
  };

  render() {
    return (
      <div className="mt-100 container" style={{ maxWidth: "" }}>
        <MaterialTable
          isLoading={this.state._isLoading}
          title="My Transactions"
          columns={this.state.columns}
          options={{
            actionsColumnIndex: -1,
          }}
          data={this.state.data}
          actions={[
            (rowData) => ({
              name: "View Details",
              icon: "preview",
              tooltip: "View Details",
              onClick: (e) => this.previewDetail(e, rowData),
            }),
          ]}
        />
      </div>
    );
  }
}
