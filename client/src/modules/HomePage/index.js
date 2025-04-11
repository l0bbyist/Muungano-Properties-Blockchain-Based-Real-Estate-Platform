import React, { Component } from "react";
import { loadScript } from "../../helper/utils";
import axios from "axios";
import formatCurrency from "../../utils/formatCurrency";
import { Link } from "react-router-dom";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mostDeals: [],
    };
  }
  componentDidMount() {
    loadScript("/js/plugin.js");
    loadScript("/js/main.js");
    axios
      .get(`${process.env.REACT_APP_BASE_URL_API}/certification/selling`)
      .then((response) => {
        this.setState({ mostDeals: response.data.data });
      });
  }
  render() {
    return (
      <div>
        <div
          className="hero-parallax"
          style={{ backgroundImage: "url(images/header/header_11.jpg)" }}
        >
          <div className="overlay op-1"></div>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="hero-slider-item">
                  <div className="row">
                    <div className="col-xl-6 col-lg-6 col-md-12 col-12">
                      <div className="header-text v2">
                        <span>Karibu</span>
                        <h1>Muungano Properties</h1>
                        <p>
                          Property Management & Transactions Platform
                        </p>
                        <p>
                          Secure. Trusted. Reliable.
                        </p>
                        {/* <div className="row">
                          <div className="col-sm-12">
                            <div className="search_btn">
                              <Link to={`/listing`}>
                                Search
                              </Link>
                            </div>
                          </div>
                        </div> */}
                      </div>
                    </div>
                    <div className="col-xl-4 offset-xl-2 col-lg-5 offset-lg-1 col-md-12">
                      <div className="hero-slider-info">
                        <form className="hero__form v3 filter listing-filter">
                          <h4>Search For Properties</h4>
                          <div className="row">
                            <div className="col-md-12 mb-3">
                              <div className="input-search">
                                <input
                                  type="text"
                                  name="place-event"
                                  id="place-event"
                                  placeholder="Enter address..."
                                />
                              </div>
                            </div>
                            {/* <div className="col-lg-12 col-md-4 col-sm-6 mb-3">
                              <select className="hero__form-input  custom-select">
                                <option>Property Status</option>
                                <option>Any</option>
                                <option>For Rent</option>
                                <option>For Sale</option>
                              </select>
                            </div> */}
                            <div className="col-lg-12 col-md-4 col-sm-6 mb-3">
                              <select className="hero__form-input  custom-select">
                                <option>Property Type</option>
                                <option>Land</option>
                                <option>Detached House</option>
                                <option>Condominium</option>
                              </select>
                            </div>
                            <div className="col-lg-6 col-md-4 col-sm-6 mb-3">
                              <select className="hero__form-input  custom-select">
                                <option>Bedrooms</option>
                                <option>4</option>
                                <option>3</option>
                                <option>2</option>
                              </select>
                            </div>
                            <div className="col-lg-6 col-md-4 col-sm-6 mb-3">
                              <select className="hero__form-input  custom-select">
                                <option>Bathrooms</option>
                                <option>4</option>
                                <option>3</option>
                                <option>2</option>
                              </select>
                            </div>
                            <div className="col-lg-12 col-md-8 col-sm-12">
                              <div className="filter-sub-area style1">
                                <div className="filter-title mb-10">
                                  <p style={{ width: "100%" }}>
                                    Price :{" "}
                                    <span style={{ width: "85%" }}>
                                      <input type="text" id="amount_two" />
                                    </span>
                                  </p>
                                </div>
                                <div
                                  id="slider-range_two"
                                  className="price-range mb-20"
                                ></div>
                              </div>
                            </div>
                            <div className="col-sm-12">
                              <div className="search_btn">
                                <a
                                  onClick={() => {
                                    this.props.history.push("/listings");
                                  }}
                                >
                                  Search
                                </a>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
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

export default HomePage;
