import React, { Component } from "react";
import { connect } from "react-redux";
import "./overview.css";
import axios from "axios";

export class Overview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      owners: [], // map public address to profile
    };
  }

  componentDidMount() {
    (async () => {
      const p1 = this.props.overview.owners.map((publicAddress) =>
        axios.get(
          `${process.env.REACT_APP_BASE_URL_API}/users/${publicAddress}`
        )
      );
      const ps1 = await Promise.all(p1);
      const ownersInfo = ps1.map((item) => item.data.data);
      this.setState({ owners: ownersInfo }); // map publicAddress to user profile
    })();
  }

  render() {
    console.log(this.state.owners);
    const { properties, images } = this.props.overview;
    return (
      <div className="row mt-20">
        <div className="col-sm-6">
          <h5>Mchoro Wa Plot</h5>
          <div className="card">
            <div className="card-body">
              {images.map((img, index) => (
                <img
                  alt=""
                  src={`${process.env.REACT_APP_BASE_URL_IMAGE}/images/${img}`}
                  style={{ maxHeight: "100%" }}
                  key={index}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <h5>Property Information</h5>
          <ol>
            <li className="ow-li-lv1">
              1. Owner(s):
              <ol type="a">
                {this.state.owners.map((user, index) => (
                  <li className="ow-li-lv2" key={index}>
                    <span>Mr/Mrs/Ms:</span>&nbsp;
                    <span className="ml-0"> {user.fullName} </span>
                    <span>NIDA Details:</span> {user.idNumber}
                  </li>
                ))}
              </ol>
            </li>

            <li className="ow-li-lv1">
              2. Plot Details:
              <ol type="a">
                <li className="ow-li-lv2">
                  <span>a) Plot No:</span>{" "}
                  {properties.landLot.landLotNo || "-/-"}
                  <span>Map Sheet No:</span>{" "}
                  {properties.landLot.mapSheetNo || "-/-"}
                </li>
                <li className="ow-li-lv2">
                  <span>b) Address:</span> {properties.landLot.address}
                </li>
                <li className="ow-li-lv2">
                  <span>c) Area:</span>{" "}
                  {properties.landLot.commonUseArea || 0} m<sup>2</sup>
                  <span>Distance From Town Centre:</span>{" "}
                  {properties.landLot.privateUseArea || 0} km
                </li>
                <li className="ow-li-lv2">
                  <span>d) Matumizi:</span>{" "}
                  {properties.landLot.purposeOfUse || "-/-"}
                </li>
                <li className="ow-li-lv2">
                  <span>e) Muda Wa Umiliki:</span>{" "}
                  {properties.landLot.timeOfUse || "-/-"}
                </li>
                <li className="ow-li-lv2">
                  <span>f) Other Details:</span>{" "}
                  {properties.landLot.originOfUse || "-/-"}
                </li>
              </ol>
            </li>
            <li className="ow-li-lv1">
              3. Housing:
              {!properties.house ? (
                <p>-/-</p>
              ) : (
                <ol type="a">
                  <li className="ow-li-lv2">
                    <span>a) Housing Type:</span> {properties.house.houseType}
                  </li>
                  <li className="ow-li-lv2">
                    <span>b) Address:</span> {properties.house.address}
                  </li>
                  <li className="ow-li-lv2">
                    <span>c) Construction Area:</span>{" "}
                    {properties.house.constructionArea} m<sup>2</sup>
                  </li>
                  <li className="ow-li-lv2">
                    <span>d) Floor Area:</span> {" "}
                    {properties.house.floorArea} m<sup>2</sup>
                  </li>
                  <li className="ow-li-lv2">
                    <span>e) Level:</span> {properties.house.level}
                  </li>
                  <li className="ow-li-lv2">
                    <span>f) Form of Ownership:</span>{" "}
                    {properties.house.formOfOwn}
                  </li>
                  <li className="ow-li-lv2">
                    <span>g) Time Of Ownership:</span>{" "}
                    {properties.house.timeOfOwn}
                  </li>
                </ol>
              )}
            </li>
            <li className="ow-li-lv1">
              4. Other Construction Works:{" "}
              <p>
                {" "}
                {!properties.otherConstruction
                  ? " -/-"
                  : properties.otherConstruction}
              </p>
            </li>
            <li className="ow-li-lv1">
              5. Shamba La Miti:{" "}
              <p>
                {!properties.prodForestIsArtificial
                  ? " -/-"
                  : properties.prodForestIsArtificial}
              </p>
            </li>
            <li className="ow-li-lv1">
              6. Perennial Plants:{" "}
              <p>
                {!properties.perennialTree ? " -/-" : properties.perennialTree}
              </p>
            </li>
            <li className="ow-li-lv1">
              7. Note:{" "}
              <p>{!properties.notice ? " -/-" : properties.notice}</p>
            </li>
          </ol>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  overview: state.addProperty.data,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Overview);
