import React, { Component } from "react";
import { loadScript } from "../../helper/utils";
import axios from "axios";
import NotFound from "../NotFound";
import formatCurrency from "../../utils/formatCurrency";
import { connect } from "react-redux";

class Property extends Component {
  constructor(props) {
    super(props);
    this.state = {
      property: "",
      owner: "",
    };
  }
  async componentDidMount() {
    loadScript("/js/plugin.js");
    loadScript("/js/main.js");
    try {
      let propertyRP = await axios({
        method: "get",
        url: `${process.env.REACT_APP_BASE_URL_API}/certification/${this.props.match.params.hash}`,
      });
      let property = propertyRP.data.data;
      let ownerRP = await axios({
        method: "get",
        url: `${process.env.REACT_APP_BASE_URL_API}/users/${property.owners[0]}`,
      });
      let owner = ownerRP.data.data;
      this.setState({ property, owner });
    } catch (error) {
      this.props.history.push("/not-found.html");
    }
  }
  render() {
    let { property, owner } = this.state;
    return !this.state.property ? (
      ""
    ) : (
      <div className="property-details-wrap bg-cb">
        <div className="single-property-header v3 pt-100 property-carousel">
          <div className="container">
            <div
              id="carousel-thumb"
              className="carousel slide carousel-fade carousel-thumbnails list-gallery pt-2"
              data-ride="carousel"
            >
              <div className="carousel-inner" role="listbox">
                {property.moreInfo.galleries.map((item, index) => (
                  <div
                    className={`carousel-item ${index == 1 ? "active" : ""}`}
                    key={index}
                  >
                    <img
                      className="d-block w-100"
                      src={`${process.env.REACT_APP_BASE_URL_IMAGE}/images/${item}`}
                      alt="slide"
                      style={{ maxHeight: "450px" }}
                    />
                  </div>
                ))}
              </div>
              <a
                className="carousel-control-prev"
                href="#carousel-thumb"
                role="button"
                data-slide="prev"
              >
                <span className="lnr lnr-arrow-left" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
              </a>
              <a
                className="carousel-control-next"
                href="#carousel-thumb"
                role="button"
                data-slide="next"
              >
                <span className="lnr lnr-arrow-right" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
              </a>
              <ol className="carousel-indicators  list-gallery-thumb">
                {property.moreInfo.galleries.map((item, index) => (
                  <li
                    data-target="#carousel-thumb"
                    data-slide-to={index}
                    className=""
                    key={index}
                  >
                    <img
                      className="img-fluid d-block w-100"
                      src={`${process.env.REACT_APP_BASE_URL_IMAGE}/images/${item}`}
                      alt={item}
                    />
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
        <div className="single-property-details mt-20">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="list-details-title v3">
                  <div className="row">
                    <div className="col-lg-6 col-md-7 col-sm-12">
                      <div className="single-listing-title float-left">
                        <h2>
                          {property.moreInfo.title}
                          {/* <span className="btn v5">For Rent</span> */}
                        </h2>
                        <p>
                          <i className="fa fa-map-marker-alt"></i>
                          {property.properties.landLot.address}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xl-8 col-lg-12">
                <div className="listing-desc-wrap mr-30">
                  <div className="list-details-wrap">
                    <div id="description" className="list-details-section">
                      <h4>Description</h4>
                      <div className="overview-content">
                        <p className="mb-10">{property.moreInfo.description}</p>
                      </div>
                      <div className="mt-40">
                        <h4 className="list-subtitle">Address</h4>
                        <a
                          target="_blank"
                          href={`http://maps.google.com/?q=${property.properties.landLot.address}`}
                          className="location-map"
                        >
                          Tazama Ramani<i className="fa fa-map-marker-alt"></i>
                        </a>
                        <ul
                          className="listing-address"
                          className={{ columns: 1 }}
                        >
                          <li>
                            <span>{property.properties.landLot.address}</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div id="details" className="list-details-section">
                      <div className="mb-40">
                        <h4>Detailed Information</h4>
                        <ul className="property-info">
                          <li>
                            Floor Area:{" "}
                            <span>{property.moreInfo.areaFloor || "-/-"}</span>{" "}
                            m<sup>2</sup>
                          </li>
                          <li>
                            Number of Bedrooms:{" "}
                            <span>
                              {property.moreInfo.numOfBedrooms || "-/-"}
                            </span>
                          </li>
                          <li>
                            Number of Bathrooms:{" "}
                            <span>
                              {property.moreInfo.numOfBathrooms || "-/-"}
                            </span>
                          </li>
                          <li>
                            Value:{" "}
                            <span>
                              {formatCurrency(property.moreInfo.price) || 0}
                            </span>
                            {" TZS"}
                          </li>
                        </ul>
                      </div>
                      <div className="mb-40">
                        <h4>Utilities</h4>
                        <ul className="listing-features">
                          {property.moreInfo.utilities.map((util, index) => (
                            <li key={index}>
                              <i className="far fa-check-square"></i> {util}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div id="floor_plan" className="list-details-section">
                      <h4>Mchoro wa Plot</h4>
                      <div id="accordion10" role="tablist" className="pt-2">
                        {property.images.map((item, index) => (
                          <div className="card" key={index}>
                            <div
                              id="collapseOne"
                              className="panel-collapse collapse show"
                              role="tabpanel"
                              aria-labelledby="headingOne"
                              key={index}
                            >
                              <div className="card-body">
                                <a href="#" data-lightbox="single-1">
                                  <img
                                    src={`${process.env.REACT_APP_BASE_URL_IMAGE}/images/${item}`}
                                    alt="..."
                                  />
                                </a>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-12">
                <div id="list-sidebar" className="listing-sidebar">
                  <div className="widget mortgage-widget">
                    <div className="agent-details">
                      <h3>Transaction</h3>
                      <ul className="address-list" style={{ margin: 0 }}>
                        <li>
                          <span>Amount :</span>
                          {formatCurrency(property.moreInfo.price) || "-/-"}
                          {" TZS"}
                        </li>
                        <li>
                          <span>Tax:</span>
                          {formatCurrency(property.moreInfo.price * 0.005) ||
                            "-/-"}
                          {" TZS"}
                        </li>
                        <li>
                          <span>Total Amount:</span>
                          {formatCurrency(property.moreInfo.price * 1.05) ||
                            "-/-"}
                          {" TZS"}
                        </li>

                        <div className="mortgage-btn">
                          <button
                            disabled={property.owners.includes(
                              this.props.user.publicAddress
                            )}
                            style={{
                              cursor: property.owners.includes(
                                this.props.user.publicAddress
                              )
                                ? "not-allowed"
                                : "",
                            }}
                            onClick={() =>
                              this.props.history.push(
                                `/create-transaction/${property.transactionHash}`
                              )
                            }
                          >
                            Weka Deposit
                          </button>
                        </div>
                      </ul>
                    </div>
                  </div>
                  <div className="widget mortgage-widget">
                    <div className="agent-details">
                      {/* <h3>Giao dịch</h3> */}
                      <ul className="address-list" style={{ margin: 0 }}>
                        <div className="mortgage-btn">
                          <button
                            onClick={() =>
                              this.props.history.push(
                                `/property-standard/${property.transactionHash}`
                              )
                            }
                          >
                            View Property Information
                          </button>
                        </div>
                      </ul>
                    </div>
                    <div className="agent-details mt-15">
                      {/* <h3>Giao dịch</h3> */}
                      <ul className="address-list" style={{ margin: 0 }}>
                        <div className="mortgage-btn">
                          <button
                            onClick={() =>
                              this.props.history.push(
                                `/transactions-of-property/${property.transactionHash}/${property.idInBlockchain}`
                              )
                            }
                          >
                            View Transaction History
                          </button>
                        </div>
                      </ul>
                    </div>
                  </div>
                  <div className="widget mortgage-widget">
                    <div className="agent-details">
                      <h3>Contact Information</h3>
                      <ul className="address-list">
                        <li>
                          <span>Full Name :</span>
                          {owner.fullName}
                        </li>
                        <li>
                          <span>Email:</span>
                          {owner.email}
                        </li>
                        <li>
                          <span>Phone:</span>
                          {owner.phoneNumber}
                        </li>
                      </ul>
                      <ul className="social-buttons style1">
                        
                        
                      </ul>
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

const mapStateToProps = (state) => {
  return {
    user: state.user.data,
  };
};

export default connect(mapStateToProps, null)(Property);
