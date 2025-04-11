import React, { Component } from "react";
import MaterialTable from "material-table";
import getWeb3 from "../../helper/getWeb3";
import RoleBasedAclContract from "../../contracts/RoleBasedAcl.json";
import { addRoleRequest, removeRoleRequest, roleChanged, setContractInstance } from "./action";
import { connect } from "react-redux";

class Role extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        // { title: "No", field: "tableData.id" },
        {
          title: "Public Address",
          field: "publicAddress",
        },
        {
          title: "Role",
          field: "role",
          lookup: { 0: "Administrator", 1: "Notary" },
        },
      ],
      data: [],
      web3: null,
      accounts: null,
      contract: null,
      _isLoading: false,
    };
    this.role = ["Super Admin", "Notary"];
  }
  componentDidMount = async () => {
    //let user = JSON.parse(localStorage.getItem("user"));
    //if (!user || user.role !== "Super Admin") {
      //window.location.href = process.env.REACT_APP_BASE_URL;
    //}
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = RoleBasedAclContract.networks[networkId];
      if (!deployedNetwork) {
        alert(
          `Wrong blockchain network.\nPlease switch to network ${process.env.REACT_APP_WEB3_PROVIDER}`
        );
        throw new Error(
          `Switch blockchain network to ${process.env.REACT_APP_WEB3_PROVIDER}`
        );
      }
      const instance = new web3.eth.Contract(
        RoleBasedAclContract.abi,
        deployedNetwork && deployedNetwork.address
      );
      
      // handle change account in metamask
      //window.ethereum.on("accountsChanged", (accounts) => {
        //this.setState({ accounts });
      //});
      
      // Set web3, accounts, and contract to the state, and then proceed with an
      this.setState(
        {
          web3,
          accounts,
          contract: instance,
        },
        this.fetchData
      );
      
      // Add this line to save the contract to Redux store
      this.props.setContractInstance(instance);
      
    } catch (error) {
      console.log(error);
      console.error(error);
    }
  };

  componentDidUpdate(preProps, preState) {
    if (this.props.socket && this.props.socket !== preProps.socket) {
      this.props.socket.on("role_changed", (data) => {
        this.props.roleChangedSuccess();
        //setTimeout for dev
        setTimeout(() => {
          this.fetchData();
        }, 500);
      });
    }
    if (this.props.loading != preState._isLoading) {
      this.setState({ _isLoading: this.props.loading });
    }
  }

  fetchData = async () => {
    const { contract } = this.state;
    try {
      const response = await contract.methods.getAllAddressAndRole().call();
      const listAddressAndRole = response[0].map((item, index) => {
        return {
          // no: index,
          publicAddress: item,
          role: response[1][index],
        };
      });

      this.setState({
        _isLoading: false,
        data: listAddressAndRole,
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    if (!this.state.web3) {
      return (
        <div className="mt-75  text-center">
          <p>Wrong blockchain network</p> Please switch to network{" "}
          {process.env.REACT_APP_WEB3_PROVIDER}
        </div>
      );
    }
    return (
      <div className="mt-100 container ">
        <MaterialTable
          isLoading={this.state._isLoading}
          title="User Role Management"
          columns={this.state.columns}
          options={{
            actionsColumnIndex: -1,
          }}
          data={this.state.data}
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve, reject) => {
                this.props.addRoleRequest(newData);
                resolve();
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve, reject) => {
                this.props.removeRoleRequest(oldData);
                resolve();
              }),
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.role.loading,
  socket: state.header.socket,
});

const mapDispatchToProps = (dispatch) => {
  return {
    addRoleRequest: (data) => {
      dispatch(addRoleRequest(data));
    },
    removeRoleRequest: (data) => {
      dispatch(removeRoleRequest(data));
    },
    roleChangedSuccess: () => {
      dispatch(roleChanged());
    },
    setContractInstance: (instance) => {
      dispatch(setContractInstance(instance));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Role);