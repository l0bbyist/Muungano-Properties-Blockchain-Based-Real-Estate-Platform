import React, { Component } from "react";
import { loadScript } from "../../helper/utils";
import axios from "axios";
import formatCurrency from "../../utils/formatCurrency";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { requestLogin } from "../../modules/Login/actions"; // Import the login action directly

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
                  <div className="row justify-content-center">
                    <div className="col-xl-6 col-lg-6 col-md-8 col-12">
                      <div className="login-container text-center" style={{
                        backgroundColor: "white",
                        borderRadius: "1rem",
                        padding: "2rem",
                        boxShadow: "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
                        marginTop: "50px",
                        marginBottom: "50px",
                        width: "auto",
                        margin: "50px auto"
                      }}>
                        <img src="images/logo.jpg" alt="Logo" style={{
                          width: "100px",
                          height: "auto",
                          marginBottom: "1rem"
                        }} />
                        
                        <h1 style={{
                          marginTop: 0,
                          fontSize: "2.5rem",
                          whiteSpace: "nowrap",
                          marginBottom: "0.5rem"
                        }}>Muungano Properties</h1>
                        
                        {/* Same button style but with login action */}
                        <button onClick={this.props.handleLogin}
                          style={{
                            marginTop: "1rem",
                            width: "auto",
                            fontSize: "1.2rem",
                            borderRadius: "2rem",
                            padding: "0.5rem 2rem",
                            background: "#000080",  /*#000080*/
                            color: "white",
                            border: 0,
                            whiteSpace: "nowrap",
                            cursor: "pointer"
                          }}
                        >
                         Uhuru Blockchain
                        </button>
                        
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

// Connect component to Redux
const mapDispatchToProps = (dispatch) => {
  return {
    handleLogin: () => {
      dispatch(requestLogin());
    },
  };
};

export default connect(null, mapDispatchToProps)(HomePage);