import React, { Component } from "react";
import MaterialTable from "material-table";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ToastSuccess from "../../components/ToastCustom/ToastSuccess";
import axios from "axios";
import Cookie from "../../helper/cookie";
import verificationData from './id_verification_data.json';

export default class ManagementUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { title: "NIDA ID", field: "idNumber" },
        { title: "Full Name", field: "fullname" },
        {
          title: "Status",
          field: "state",
          lookup: { 0: "Not Approved", 1: "Waiting For Approval", 2: "Approved" },
        },
      ],
      data: [],
      web3: null,
      userSelected: {},
      _isLoading: false,
      openAction: false,
      isIdVerified: false
    };
  }

  componentDidMount = async () => {
    this.fetchData();
  };

  fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL_API}/users`,
        {
          headers: {
            Authorization: `Bearer ${Cookie.getCookie("accessToken")}`,
          },
        }
      );
      const owners = response.data.data.filter((user) => user.isVerified === 1);

      this.setState({
        data: owners.map((owner) => ({
          idNumber: owner.idNumber,
          fullname: owner.fullName,
          state: owner.isVerified,
          ...owner,
        })),
        _isLoading: false,
      });
    } catch (error) {
      console.log(error);
    }
  };

  previewUser = (event, rowData) => {
    const isVerified = verificationData.some(item => 
      item.fullName.toLowerCase() === rowData.fullname.toLowerCase() && 
      item.idNumber === rowData.idNumber
    );
    
    this.setState({ 
      openAction: true, 
      userSelected: rowData,
      isIdVerified: isVerified 
    });
  };

  closePreview = () => {
    this.setState({ openAction: false });
  };

  verifyAccount = async () => {
    if (!this.state.isIdVerified) {
      toast.error("Cannot approve - ID verification failed", {
        position: toast.POSITION.BOTTOM_RIGHT
      });
      return;
    }

    try {
      await axios.get(
        `${process.env.REACT_APP_BASE_URL_API}/users/verify-account?userId=${this.state.userSelected._id}`,
        {
          headers: {
            Authorization: `Bearer ${Cookie.getCookie("accessToken")}`,
          },
        }
      );
      toast.success(<ToastSuccess message={"Approved successfully."} />, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      this.fetchData();
    } catch (error) {
      toast.error("Approval failed: " + error.message, {
        position: toast.POSITION.BOTTOM_RIGHT
      });
    } finally {
      this.closePreview();
    }
  };

  render() {
    return (
      <div className="mt-100 container" style={{ maxWidth: "800px" }}>
        <MaterialTable
          isLoading={this.state._isLoading}
          title="User Management"
          columns={this.state.columns}
          options={{ actionsColumnIndex: -1 }}
          data={this.state.data}
          actions={[
            (rowData) => ({
              icon: "preview",
              tooltip: "View User",
              onClick: (e) => this.previewUser(e, rowData),
            }),
          ]}
        />

        <Dialog
          open={this.state.openAction}
          onClose={this.closePreview}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth="md"
        >
          <DialogContent>
              <div className="db-add-listing">
                <div className="row">
                  <div className="col-md-12">
                    {this.state.userSelected.imageIdNumber
                      ? this.state.userSelected.imageIdNumber.map((image) => (
                          <img
                            className="col-sm-6"
                            src={`${process.env.REACT_APP_BASE_URL_IMAGE}/CMND/${image}`}
                          />
                        ))
                      : ""}

                  <div className="form-group">
                    <label className="font-weight-bold">Full Name</label>
                    <input
                      value={this.state.userSelected.fullname || ''}
                      disabled
                      type="text"
                      className="form-control"
                    />
                  </div>

                  <div className="form-group">
                    <label className="font-weight-bold">NIDA ID</label>
                    <div className="d-flex align-items-center">
                      <input
                        value={this.state.userSelected.idNumber || ''}
                        disabled
                        className="form-control"
                      />
                      <span className={`ml-2 badge ${this.state.isIdVerified ? 'badge-success' : 'badge-danger'}`}>
                        {this.state.isIdVerified ? '✓ Matched' : '✗ No Match'}
                      </span>
                    </div>
                    {!this.state.isIdVerified && (
                      <small className="text-danger font-italic">
                        Cannot approve - ID doesn't match official records
                      </small>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="font-weight-bold">Date Of Birth</label>
                    <input
                      value={this.state.userSelected.birthday || ''}
                      disabled
                      className="form-control"
                    />
                  </div>

                  <div className="form-group">
                    <label className="font-weight-bold">Poastal Code</label>
                    <input
                      value={this.state.userSelected.homeLand || ''}
                      disabled
                      className="form-control"
                    />
                  </div>

                  <div className="form-group">
                    <label className="font-weight-bold">Current Residence</label>
                    <input
                      value={this.state.userSelected.permanentResidence || ''}
                      disabled
                      className="form-control"
                    />
                  </div>

                  <div className="form-group">
                    <label className="font-weight-bold">Phone</label>
                    <input
                      value={this.state.userSelected.phoneNumber || ''}
                      disabled
                      className="form-control"
                    />
                  </div>

                  <div className="form-group">
                    <label className="font-weight-bold">Email</label>
                    <input
                      value={this.state.userSelected.email || ''}
                      disabled
                      className="form-control"
                    />
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closePreview} color="primary">
              Cancel
            </Button>
            <Button
              onClick={this.verifyAccount}
              color="primary"
              autoFocus
              disabled={!this.state.isIdVerified}
              style={{
                backgroundColor: this.state.isIdVerified ? '#4CAF50' : '#cccccc',
                color: this.state.isIdVerified ? 'white' : '#666666'
              }}
            >
              Approve
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}