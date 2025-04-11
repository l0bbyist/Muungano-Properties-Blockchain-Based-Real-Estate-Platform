import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import "./index.css";
import { fetchSinglePropertyRequest } from "./actions";
import axios from "axios";

function PropertyStandard({ match, history, data, fetchSingleProperty }) {
  // console.log("PropertyStandard -> history", history);
  const idProperty = match.params.hash;
  const [owners, setOwners] = useState([]);

  useEffect(() => {
    fetchSingleProperty(idProperty);
    (async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL_API}/certification/owners/${idProperty}`
      );
      // console.log(response.data.data);
      setOwners(response.data.data);
    })();
  }, []);

  if (!data) {
    return "";
  } else {
    const { properties, images } = data;
    const notarizationDate = new Date(data.createdAt);
    return (
      <div className="mt-85 container">
        <div className="row">
          <div className="col-sm-6">
            <h5>Property Information</h5>
            <ol>
              <li className="ow-li-lv1">
                1. Owner(s):
                <ol type="a">
                  {owners.map((owner, index) => (
                    <li className="ow-li-lv2" key={index}>
                      <span>Mr/Mrs/Ms: </span>
                      {/* <span className="ml-0">  */}
                      {owner.fullName}
                      {/* </span> */}
                      <span>NIDA Details:</span> {owner.idNumber}
                    </li>
                  ))}
                </ol>
              </li>
              <li className="ow-li-lv1">
                2. Plot Details:
                <ol type="a">
                  <li className="ow-li-lv2">
                    <span>a) Plot No:</span> {properties.landLot.landLotNo}
                    <span>Map Sheet No:</span>{" "}
                    {properties.landLot.mapSheetNo || "-/-"}
                  </li>
                  <li className="ow-li-lv2">
                    <span>b) Address:</span>{" "}
                    {properties.landLot.address || "-/-"}
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
                  " -/-"
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
                      <span>d) Diện tích sàn:</span>{" "}
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
                  {!properties.perennialTree
                    ? " -/-"
                    : properties.perennialTree}
                </p>
              </li>
              <li className="ow-li-lv1">
                7. Note:{" "}
                <p>{!properties.notice ? " -/-" : properties.notice}</p>
              </li>
            </ol>
          </div>
          <div className="col-sm-6">
            <h5>Mchoro Wa Plot</h5>
            <div className="card">
              <div className="card-body">
                {images.map((img, index) => (
                  <img
                    alt="Mchoro Wa Plot"
                    src={`${process.env.REACT_APP_BASE_URL_IMAGE}/images/${img}`}
                    style={{ maxHeight: "100%" }}
                    key={index}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="col-sm-6 mt-10">
            <h5>Notary Information</h5>
            <ol>
              <li className="ow-li-lv1">
                1. Notary:
                <ol type="a">
                  <li className="ow-li-lv2">
                    <span>Mr/Mrs/Ms: </span>
                    {data.notary && data.notary.fullName}
                    <span>NIDA Details:</span> {data.notary && data.notary.idNumber}
                  </li>
                </ol>
              </li>
              <li className="ow-li-lv1">
                2. Notarization Date:{" "}
                <p>
                  {` Day ${notarizationDate.getDate()} Month ${notarizationDate.getMonth()} Year ${notarizationDate.getFullYear()}`}
                </p>
              </li>
            </ol>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.propertyStandard.data,
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSingleProperty: (txHash) => {
      dispatch(fetchSinglePropertyRequest(txHash));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PropertyStandard);
