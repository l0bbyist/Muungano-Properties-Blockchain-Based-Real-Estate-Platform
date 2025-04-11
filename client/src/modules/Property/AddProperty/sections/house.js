/// proplem: Can't ignore value of field disabled before send request
import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";

class HouseForm extends Component {
  getValue(data) {
    console.log(data);
  }
  constructor(props) {
    super(props);
    this.state = {
      houseType: 1,
    };
    this.houseType = {
      "Nhà chung cư": 0,
      "Nhà ở riêng lẻ": 1,
    };
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.getValue)}>
        <div className="row">
          <div className="col-md-12">
            <div className="form-group">
              <label>Housing Type</label>
              <Field
                name="houseType"
                component="select"
                className="form-control filter-input"
                onChange={(e) =>
                  this.setState({ houseType: this.houseType[e.target.value] })
                }
              >
                <option></option>
                <option value="Nhà ở riêng lẻ">Apartment</option>
                <option value="Nhà chung cư">Individual</option>
              </Field>
            </div>
          </div>

          <div className="col-md-12">
            <div className="form-group">
              <label>Address</label>
              <Field
                name="address"
                component="input"
                type="text"
                className="form-control filter-input"
                placeholder="Apartment/House Address"
              />
            </div>
          </div>

          {this.state.houseType ? (
            <div className="col-md-6">
              <div className="form-group">
                <label>Construction Area</label>
                <div className="input-group">
                  <Field
                    name="constructionArea"
                    component="input"
                    type="number"
                    className="form-control filter-input"
                    placeholder=" "
                    disabled={this.houseType[this.state.houseType]}
                  />
                  <div className="input-group-append">
                    <span className="input-group-text">
                      {" "}
                      m<sup>2</sup>{" "}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          <div className="col-md-6">
            <div className="form-group">
              <label>Floor Area</label>
              <div className="input-group">
                <Field
                  name="floorArea"
                  component="input"
                  type="number"
                  className="form-control filter-input"
                  placeholder=" "
                />
                <div className="input-group-append">
                  <span className="input-group-text">
                    {" "}
                    m<sup>2</sup>{" "}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {this.state.houseType ? (
            <div className="col-md-6">
              <div className="form-group">
                <label>Level</label>
                <Field
                  name="level"
                  component="input"
                  type="text"
                  className="form-control filter-input"
                  placeholder=" "
                />
              </div>
            </div>
          ) : null}

          {this.state.houseType ? (
            <div className="col-md-6">
              <div className="form-group">
                <label>Floors</label>
                <Field
                  name="numberOfFloor"
                  component="input"
                  type="text"
                  className="form-control filter-input"
                  placeholder=" "
                />
              </div>
            </div>
          ) : null}

          <div className="col-md-6">
            <div className="form-group">
              <label>Form of Ownership</label>
              <Field
                name="formOfOwn"
                component="input"
                className="form-control filter-input"
                type="text"
                placeholder=" "
              />
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <label>Time Of Ownership</label>
              <Field
                name="timeOfOwn"
                component="input"
                className="form-control filter-input"
                type="text"
                placeholder=" "
              />
            </div>
          </div>
        </div>
      </form>
    );
  }
}
HouseForm = reduxForm({
  // a unique name for the form
  form: "house",
})(HouseForm);

export default HouseForm;
