import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
// import { connect } from "react-redux";
// import actions from "../actions";

class LandForm extends Component {
  getValue(data) {
    console.log(data);
  }
  render() {
    const { handleSubmit } = this.props;
    // console.log(handleClick);
    return (
      <div>
        <form onSubmit={handleSubmit(this.getValue)}>
          <div className="row ">
            <div className="col-md-4">
              <div className="form-group">
                <label>Plot No:</label>
                <Field
                  type="number"
                  component="input"
                  className="form-control filter-input"
                  placeholder=" "
                  name="landLotNo"
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label>Map Sheet No:</label>
                <Field
                  name="mapSheetNo"
                  type="text"
                  className="form-control filter-input"
                  placeholder=" "
                  component="input"
                />
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group">
                <label>Address </label>
                <Field
                  name="address"
                  component="input"
                  type="text"
                  className="form-control filter-input"
                  placeholder=" "
                />
              </div>
            </div>

            <div className="col-md-4">
              <div className="form-group">
                <label>
                  Area
                </label>
                <div className="input-group">
                  <Field
                    name="commonUseArea"
                    component="input"
                    type="number"
                    className="form-control filter-input"
                    placeholder=" "
                  />
                  <div className="input-group-append">
                    <span className="input-group-text"> m<sup>2</sup> </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label>
                  Distance From Town Centre
                </label>
                <div className="input-group">
                  <Field
                    name="privateUseArea"
                    component="input"
                    type="number"
                    className="form-control filter-input"
                    placeholder=" "
                  />
                  <div className="input-group-append">
                    <span className="input-group-text"> km </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label>Muda Wa Umiliki</label>
                <Field
                  name="timeOfUse"
                  component="input"
                  type="text"
                  className="form-control filter-input"
                  placeholder=" "
                />
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group">
                <label>Matumizi </label>
                <Field
                  name="purposeOfUse"
                  component="input"
                  type="text"
                  className="form-control filter-input"
                  placeholder="Makazi, Biashara, Kilimo n.k"
                />
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group">
                <label>Other Details</label>
                <Field
                  name="originOfUse"
                  component="textarea"
                  className="form-control"
                  rows="4"
                  placeholder=" "
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

// const mapStateToProps = state => ({
//   addProperty: state.addProperty,
//   form: state.form
// });

// const mapDispatchToProps = dispatch => {
//   return {
//     handleClick: data => {
//       dispatch(actions.fillForm(data));
//     }
//   };
// };

// const connected = connect(mapStateToProps, mapDispatchToProps)(LandForm);

LandForm = reduxForm({
  // a unique name for the form
  form: "land"
})(LandForm);

export default LandForm;
