import React, { Component } from "react";

export default class Filter extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="hero__form v1 filter listing-filter property-filter">
              <div className="row">
                <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 py-3 pl-30 pr-0">
                  <div className="input-search">
                    <input
                      type="text"
                      name="place-event"
                      id="place-event"
                      placeholder="Enter Adress ..."
                    />
                  </div>
                </div>
                <div className="col-xl-2 col-lg-6 col-md-6 col-sm-12 col-12 py-3 pl-30 pr-0">
                  <select className="hero__form-input  custom-select">
                    <option>Asset Type</option>
                    <option>Land</option>
                    <option>Residential House</option>
                    <option>Appartment</option>
                  </select>
                </div>
                <div className="col-xl-2 col-lg-6 col-md-6 col-sm-12 col-12 py-3 pl-30 pr-0">
                  <select className="hero__form-input  custom-select">
                    <option>Bedroom</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </select>
                </div>
                <div className="col-xl-2 col-lg-6 col-md-6 col-sm-12 col-12 py-3 pl-30 pr-0">
                  <select className="hero__form-input  custom-select">
                    <option>Bathroom</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </select>
                </div>
                <div className="col-xl-2 col-lg-6 col-md-6 col-sm-12 col-12 py-3 pl-30 pr-0">
                  <div className="submit_btn">
                    <button className="btn v3" type="submit">
                      Search
                    </button>
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
