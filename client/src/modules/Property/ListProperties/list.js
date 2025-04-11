import React, { Component } from "react";
import { Link } from "react-router-dom";

class ListProperties extends Component {
  render() {
    let { list, history } = this.props;
    return list.length === 0 ? (
      <h3 className="post-title text-center">You have no properties</h3>
    ) : (
      <div className="viewd-item-wrap row">
        {list.map((property, index) => (
          <div className="col-xl-4 col-md-6 col-sm-12" key={index}>
            <div className="single-property-box">
              <div className="property-item">
                <Link
                  className="property-img"
                  to={`property-standard/${property.transactionHash}`}
                >
                  <img
                    src={`${process.env.REACT_APP_BASE_URL_IMAGE}/images/${property.images[0]}`}
                    alt="#"
                  />
                </Link>
                <ul className="feature_text">
                  <li className="feature_or">
                    <span>
                      {property.state == 0
                        ? "Pending Approval"
                        : property.state == 1
                        ? "Approved"
                        : "For Sale"}
                    </span>
                  </li>
                </ul>
              </div>
              <div className="property-title-box">
                <div className="property-location">
                  <i className="fa fa-map-marker-alt"></i>
                  <p>{property.properties.landLot.address}</p>
                </div>
                <div
                  className="trending-bottom"
                  style={{ padding: "15px 0px" }}
                >
                  <div className="trend-right float-right">
                    <div className="trend-open">
                      <button
                        className="btn v4 ml-2 text-light"
                        style={{
                          background: "#6449e7",
                          border: "1px solid transparent",
                        }}
                        onClick={() =>
                          history.push(
                            `property-standard/${property.transactionHash}`
                          )
                        }
                      >
                        <i className="ion-edit"></i> Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default ListProperties;
