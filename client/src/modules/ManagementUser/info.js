import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Field, reduxForm } from "redux-form";
import { UpdateUser } from "../Profile/EditProfile/actions";
import tanzaniaRegions from "./mikoa_ya_tanzania.json";

class Info extends Component {
  constructor() {
    super();
    this.handleUpdate = this.handleUpdate.bind(this);
    this.state = {
      selectedRegion: "",
      selectedDistrict: "",
      selectedCouncil: "",
      availableDistricts: [],
      availableCouncils: []
    };
  }

  componentDidMount() {
    const user = this.props.user;
    this.props.change("fullName", user.fullName || "");
    this.props.change("idNumber", user.idNumber || "");
    this.props.change("homeLand", user.homeLand || "");
    this.props.change("birthday", user.birthday || "");
    this.props.change("permanentResidence", user.permanentResidence || "");

    if (user.permanentResidence) {
      this.parseExistingResidence(user.permanentResidence);
    }
  }

  parseExistingResidence(residence) {
    const parts = residence.split(', ');
    if (parts.length >= 1) {
      const region = parts[0];
      this.handleRegionChange({ target: { value: region } });
      if (parts.length >= 2) {
        setTimeout(() => {
          this.handleDistrictChange({ target: { value: parts[1] } });
          if (parts.length >= 3) {
            setTimeout(() => {
              this.setState({ selectedCouncil: parts[2] });
            }, 100);
          }
        }, 100);
      }
    }
  }

  handleRegionChange = (event) => {
    const selectedRegion = event.target.value;
    const allRegions = { ...tanzaniaRegions.mkoa, ...tanzaniaRegions };
    const regionData = allRegions[selectedRegion];

    this.setState({
      selectedRegion,
      selectedDistrict: "",
      selectedCouncil: "",
      availableDistricts: regionData ? Object.keys(regionData.wilaya) : [],
      availableCouncils: []
    });

    this.updatePermanentResidence(selectedRegion, "", "");
  };

  handleDistrictChange = (event) => {
    const selectedDistrict = event.target.value;
    const allRegions = { ...tanzaniaRegions.mkoa, ...tanzaniaRegions };
    const regionData = allRegions[this.state.selectedRegion];

    let districtData;
    if (regionData && regionData.wilaya) {
      districtData = regionData.wilaya[selectedDistrict];
    } else {
      districtData = undefined;
    }

    this.setState({
      selectedDistrict,
      selectedCouncil: "",
      availableCouncils: districtData ? districtData.halmashauri : []
    });

    this.updatePermanentResidence(this.state.selectedRegion, selectedDistrict, "");
  };

  handleCouncilChange = (event) => {
    const selectedCouncil = event.target.value;
    this.setState({ selectedCouncil });

    this.updatePermanentResidence(
      this.state.selectedRegion,
      this.state.selectedDistrict,
      selectedCouncil
    );
  };

  updatePermanentResidence = (region, district, council) => {
    let residence = "";
    if (region) residence += region;
    if (district) residence += `, ${district}`;
    if (council) residence += `, ${council}`;
    this.props.change("permanentResidence", residence);
  };

  handleUpdate() {
    axios({
      method: "put",
      url: `${process.env.REACT_APP_BASE_URL_API}/users`,
      data: this.props.profile.values,
      headers: {
        Authorization: `Bearer ${this.props.accessToken}`,
      },
    })
      .then((response) => {
        this.props.actUpdate(response.data.data);
        localStorage.setItem("user", JSON.stringify(response.data.data));
        window.location.href = `/verify-account?step=${this.nextStep()}`;
      })
      .catch((err) => alert(err));
  }

  nextStep() {
    return this.getStep() + 1;
  }

  getStep() {
    return Number(new URLSearchParams(location.search).get("step")) || 0;
  }

  render() {
    const {
      selectedRegion,
      selectedDistrict,
      selectedCouncil,
      availableDistricts,
      availableCouncils
    } = this.state;

    const regions = Object.keys({ ...tanzaniaRegions.mkoa, ...tanzaniaRegions });

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8">
            <div className="db-add-list-wrap">
              <div className="db-add-listing">
                <form onSubmit={this.props.handleSubmit(this.handleUpdate)}>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <label>Full Name</label>
                        <Field
                          component="input"
                          name="fullName"
                          type="text"
                          className="form-control filter-input"
                          placeholder="Enter your full name"
                        />
                      </div>
                    </div>

                    <div className="col-md-12">
                      <div className="form-group">
                        <label>NIDA ID</label>
                        <Field
                          component="input"
                          name="idNumber"
                          type="text"
                          className="form-control filter-input"
                          placeholder="xxxxxx xx xxx xxxxx"
                        />
                      </div>
                    </div>

                    <div className="col-md-12">
                      <div className="form-group">
                        <label>Date Of Birth</label>
                        <Field
                          component="input"
                          name="birthday"
                          type="date"
                          className="form-control filter-input"
                        />
                      </div>
                    </div>

                    <div className="col-md-12">
                      <div className="form-group">
                        <label>Postal Code</label>
                        <Field
                          component="input"
                          name="homeLand"
                          type="text"
                          className="form-control filter-input"
                          placeholder="Enter postal code"
                        />
                      </div>
                    </div>

                    {/* Permanent Residence Dropdowns */}
                    <div className="col-md-12">
                      <div className="form-group">
                        <label>Permanent Residence</label>

                        {/* Region Dropdown */}
                        <div className="mb-2">
                          <label className="small-label">Region (Mkoa)</label>
                          <select
                            className="form-control filter-input"
                            value={selectedRegion}
                            onChange={this.handleRegionChange}
                          >
                            <option value="">Select Region</option>
                            {regions.map((region) => (
                              <option key={region} value={region}>
                                {region}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* District Dropdown */}
                        {selectedRegion && (
                          <div className="mb-2">
                            <label className="small-label">District (Wilaya)</label>
                            <select
                              className="form-control filter-input"
                              value={selectedDistrict}
                              onChange={this.handleDistrictChange}
                            >
                              <option value="">Select District</option>
                              {availableDistricts.map((district) => (
                                <option key={district} value={district}>
                                  {district}
                                </option>
                              ))}
                            </select>
                          </div>
                        )}

                        {/* Council Dropdown */}
                        {selectedDistrict && (
                          <div className="mb-2">
                            <label className="small-label">Council (Halmashauri)</label>
                            <select
                              className="form-control filter-input"
                              value={selectedCouncil}
                              onChange={this.handleCouncilChange}
                            >
                              <option value="">Select Council</option>
                              {availableCouncils.map((council) => (
                                <option key={council} value={council}>
                                  {council}
                                </option>
                              ))}
                            </select>
                          </div>
                        )}

                        {/* Hidden field to store the complete address */}
                        <Field
                          component="input"
                          name="permanentResidence"
                          type="hidden"
                        />

                        {(selectedRegion || selectedDistrict || selectedCouncil) && (
                          <div className="selected-residence">
                            <small className="text-muted">
                              Selected: {[selectedRegion, selectedDistrict, selectedCouncil]
                                .filter(Boolean)
                                .join(", ")}
                            </small>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="col-md-12">
                      <button className="btn v3" type="submit">
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

Info = reduxForm({
  form: "profile",
})(Info);

const mapStateToProps = (state) => ({
  profile: state.form.profile,
  accessToken: state.login.accessToken,
  user: state.user.data,
});

const mapDispatchToProps = (dispatch) => {
  return {
    actUpdate: (user) => {
      dispatch(UpdateUser(user));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Info);
