import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import Cookie from "../../helper/cookie";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../../components/Loading/loading";

class Info extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      code: 0,
      loading: false,
    };
  }

  sendCode = (e) => {
    this.setState({ loading: true });
    e.preventDefault();

    axios({
      method: "post",
      url: `${process.env.REACT_APP_BASE_URL_API}/otp/verify-email?email=${this.state.email}`,
      headers: {
        Authorization: `Bearer ${Cookie.getCookie("accessToken")}`,
      },
    })
      .then(() => {
        this.setState({ loading: false });
        toast.info("Please check your email and enter the verification code.", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: false,
        });
      })
      .catch(() => {
        this.setState({ loading: false });
        toast.error("VerifCode code generation failed!", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      });
  };

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleUpdate = async (e) => {
    this.setState({ loading: true });
    e.preventDefault();
    try {
      await axios({
        method: "post",
        url: `${process.env.REACT_APP_BASE_URL_API}/otp/verify?code=${this.state.code}&email=${this.state.email}`,
        headers: {
          Authorization: `Bearer ${Cookie.getCookie("accessToken")}`,
        },
      });
      const user = await axios({
        method: "get",
        url: `${process.env.REACT_APP_BASE_URL_API}/users/me`,
        headers: {
          Authorization: `Bearer ${Cookie.getCookie("accessToken")}`,
        },
      });
      this.setState({ loading: false });
      localStorage.setItem("user", JSON.stringify(user.data.data));
      toast.success(
        "Information has been saved. Please contact the program officer for verification.",
        {
          position: toast.POSITION.BOTTOM_RIGHT,
        }
      );
      window.location.href = "/";
    } catch (error) {
      this.setState({ loading: false });
      toast.error("Invalid email or verification code!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  render() {
    return (
      <div className="container">
        <Loading isLoading={this.state.loading} />
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8">
            <div className="db-add-list-wrap">
              <div className="db-add-listing">
                <form>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <label>Email</label>
                        <input
                          name="email"
                          type="text"
                          className="form-control filter-input"
                          placeholder="Confirmation email"
                          onChange={(e) => this.handleChange(e)}
                        />
                      </div>
                    </div>

                    <div className="col-md-12 mb-10">
                      <button
                        className="btn v4"
                        style={{
                          backgroundColor: "#6449e7",
                          color: "white !important",
                        }}
                        onClick={(e) => this.sendCode(e)}
                      >
                        Get Verificatio Code
                      </button>
                    </div>

                    <div className="col-md-12">
                      <div className="form-group">
                        <label>Code</label>
                        <input
                          name="code"
                          type="text"
                          className="form-control filter-input"
                          placeholder="Enter email verification code..."
                          onChange={(e) => this.handleChange(e)}
                        />
                      </div>
                    </div>

                    <div className="col-md-12">
                      <button
                        className="btn v3"
                        onClick={(e) => this.handleUpdate(e)}
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  profile: state.form.profile,
  accessToken: state.login.accessToken,
  user: state.user.data,
});

const mapDispatchToProps = (dispatch) => {};

export default connect(mapStateToProps, mapDispatchToProps)(Info);
