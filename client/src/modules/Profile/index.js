import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({ user: state.user });

class Profile extends Component {
  render() {
    let user = this.props.user && JSON.parse(localStorage.getItem("user"));
    return (
      <div className="container">
        <div className="row mt-75">
          <div className="col-md-2"></div>
          <div className="col-md-8">
            <div className="recent-activity">
              <div className="act-title">
                <h5>Personal Information</h5>
              </div>
              <div className="profile-wrap">
                <div className="row mb-50">
                  <div className="col-lg-5 col-md-6 col-sm-5">
                    <img
                      src={`${process.env.REACT_APP_BASE_URL_IMAGE}/avatar/${user.avatar}`}
                      alt="..."
                      className="img-responsive"
                    />
                  </div>
                  <div className="col-lg-7 col-md-6 col-sm-7">
                    <div className="agent-details">
                      {/* <h3>User Personal Information</h3> */}
                      <ul className="address-list">
                        <li>
                          <span>Full Name:</span>
                          {user.fullName || "Please update your information"}
                        </li>
                        <li>
                          <span>Public Address:</span>
                          {user.publicAddress || "Please update your information"}
                        </li>
                        <li>
                          <span>ID Card/Identity Card:</span>
                          {user.idNumber || "Please update your information"}
                        </li>
                        <li>
                          <span>Date of Birth:</span>
                          {user.birthday || "Please update your information"}
                        </li>
                        <li>
                          <span>Hometown:</span>
                          {user.homeLand || "Please update your information"}
                        </li>
                        <li>
                          <span>Permanent Residence:</span>
                          {user.permanentResidence || "Please update your information"}
                        </li>
                        <li>
                          <span>Phone Number:</span>
                          {user.phoneNumber || "Please update your information"}
                        </li>
                        <li>
                          <span>Email:</span>
                          {user.email || "Please update your information"}
                        </li>
                      </ul>
                      
                      <Link to="/user/profile/edit" className="btn v3 mt-50">
                        Update Personal Information
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Profile);
