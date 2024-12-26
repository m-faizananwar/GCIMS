import { useState } from "react";
import "../../styles/find-car-form.css";
import { Form, FormGroup } from "reactstrap";

const FindCarForm = () => {
  const [minPrice, setMinPrice] = useState(""); // Set to empty string initially
  const [maxPrice, setMaxPrice] = useState(""); // Set to empty string initially

  const handleMinPriceChange = (e) => {
    const value = Math.max(0, e.target.value); // Ensure minPrice is not less than 0
    setMinPrice(value);

    // If minPrice is greater than maxPrice, update maxPrice to minPrice + 1
    if (value >= maxPrice) {
      setMaxPrice(value + 1); // Ensure maxPrice is at least 1 greater than minPrice
    }
  };

  const handleMaxPriceChange = (e) => {
    let value = Math.max(0, e.target.value); // Ensure maxPrice is not less than 0

    // If maxPrice is less than minPrice, update maxPrice to minPrice + 1
    if (value < minPrice) {
      value = minPrice + 1; // Ensure maxPrice is always at least 1 greater than minPrice
    }

    setMaxPrice(value);
  };

  return (
    <Form className="form">
      <div className="d-flex align-items-center justify-content-between flex-wrap">
        <FormGroup className="form__group">
          <input type="text" id="name" placeholder=" " required />
          <label htmlFor="name">Name</label>
        </FormGroup>

        <FormGroup className="form__group">
          <input type="text" id="model" placeholder=" " />
          <label htmlFor="model">Model</label>
        </FormGroup>

        <FormGroup className="form__group">
          <input type="text" id="location" placeholder=" " required />
          <label htmlFor="location">Location</label>
        </FormGroup>

        <FormGroup className="form__group">
          <input type="text" id="city" placeholder=" " />
          <label htmlFor="city">City</label>
        </FormGroup>

        <FormGroup className="form__group price-range-group">
          <div className="price-input-wrapper">
            <input
              type="number"
              id="minPrice"
              placeholder=" "
              min="0"
              value={minPrice !== "" ? minPrice : ""}
              onChange={handleMinPriceChange}
            />
            <label htmlFor="minPrice">Min Price</label>
          </div>

          <span className="mx-2">-</span>

          <div className="price-input-wrapper">
            <input
              type="number"
              id="maxPrice"
              placeholder=" "
              min="0"
              value={maxPrice !== "" ? maxPrice : ""}
              onChange={handleMaxPriceChange}
            />
            <label htmlFor="maxPrice">Max Price</label>
          </div>
        </FormGroup>

        <FormGroup className="form__group">
          <button className="btn find__car-btn">Find Car</button>
        </FormGroup>
      </div>
    </Form>
  );
};

export default FindCarForm;
