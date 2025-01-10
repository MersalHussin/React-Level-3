import React from "react";
import Model from "../../shared/Model";
import ReactLoading from "react-loading";

function HomeModel({
  closeModel,
  data,
  dataValue,
  titleName,
  titleInput,
  detailsInput,
  addFunc,
  submitBTN,
  showLoading,
}) {
  return (
    <Model closeFunc={closeModel}>
      <div style={{ textAlign: "left" }}>
        <input
          placeholder="Add Title"
          required
          type="text"
          name="title"
          onChange={(e) => {
            titleInput(e);
          }}
          value={titleName}
        />

        <div className="add-details" style={{ display: "flex" }}>
          <input
            placeholder="Add Details"
            required
            type="text"
            name="details"
            onChange={(e) => {
              detailsInput(e);
            }}
            value= {`${dataValue}`}
          />

          <button
            style={{
              width: "fit-content",
              height: "fit-content",
              padding: "15px",
            }}
            onClick={(e) => {
              addFunc(e);
            }}
          >
            add
          </button>
        </div>

        <ul className="list">
          {data.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

        <button
          className={`${showLoading && "disabled"}`}
          onClick={(e) => {
            submitBTN(e);
          }}
        >
          {showLoading ? (
            <ReactLoading
              type={"spin"}
              color={"white"}
              height={20}
              width={20}
            />
          ) : (
            "Submit"
          )}
        </button>
      </div>
    </Model>
  );
}

export default HomeModel;
