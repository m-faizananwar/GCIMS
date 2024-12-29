import React from "react";
import { Col } from "reactstrap";
import { Link } from "react-router-dom";
import "../../styles/car-item.css";
import { Link as ScrollLink } from 'react-scroll';


const CarItem = (props) => {
  const { imgUrl, model, carName, location, speed, price } = props.item;

  return (
    <Col lg="4" md="4" sm="6" className="mb-5">
      <div className="car__item">
        <div className="car__img">
          <img src={imgUrl} alt="" className="w-100" />
        </div>

        <div className="car__item-content mt-4">
          <h4 className="section__title text-center">{carName}</h4>
          <h6 className="rent__price text-center mt-">
            ${price}
          </h6>

          <div className="car__item-info d-flex align-items-center justify-content-between mt-3 mb-4">
            <span className=" d-flex align-items-center gap-1">
              <i className="ri-car-line"></i> {model}
            </span>
            <span className=" d-flex align-items-center gap-1">
              <i className="ri-gps-line"></i> {location}
            </span>
            <span className=" d-flex align-items-center gap-1">
              <i className="ri-timer-flash-line"></i> {speed}
            </span>
          </div>

          <button
  className="car__item-btn car__btn-rent"
  style={{
    display: "block",
    width: "90%", // Adjust width to your preference
    margin: "0 auto", // Centers the button horizontally
    fontSize: "18px", // Increase font size
    padding: "12px 24px", // Increase padding for a larger button
  }}
>
  <Link to={`/cars/${carName}`} style={{ textAlign: "center", display: "block", width: "100%", height: "100%" }}>
    Book
  </Link>
</button>





          
        </div>
      </div>
    </Col>
  );
};

export default CarItem;
