import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/find-car-form.css"; // Keep the original CSS
import { Form, FormGroup } from "reactstrap";

const FindCarForm = () => {
  const [filters, setFilters] = useState({
    name: "",
    model: "",
    location: "",
    minPrice: "",
    maxPrice: "",
  });
  const [errorMessage, setErrorMessage] = useState(""); // State to handle the error message
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if name is empty before submitting
    if (!filters.name) {
      setErrorMessage("This field is required"); // Set error message
      return;
    }

    // Construct query parameters from the filters
    const queryParams = new URLSearchParams(filters).toString();

    // Redirect to /cars with query parameters
    navigate(`/cars?${queryParams}`);
  };

  return (
    <Form className="form" onSubmit={handleSubmit}>
      <div className="d-flex align-items-center justify-content-between flex-wrap">
        <FormGroup className="form__group">
          {/* Error message displayed above the input if the name is empty */}
          {errorMessage && (
            <div
              style={{
                color: "red",
                fontSize: "12px",
                marginBottom: "5px",
                marginTop: "-5px",
              }}
            >
              {errorMessage}
            </div>
          )}

          <input
            type="text"
            name="name"
            value={filters.name}
            onChange={handleInputChange}
            required
            placeholder=" "
          />
          <label htmlFor="name">Name</label>
        </FormGroup>

        <FormGroup className="form__group">
          <input
            type="text"
            name="model"
            value={filters.model}
            onChange={handleInputChange}
            placeholder=" "
          />
          <label htmlFor="model">Model</label>
        </FormGroup>

        <FormGroup className="form__group">
          <input
            type="text"
            name="location"
            value={filters.location}
            onChange={handleInputChange}
            placeholder=" "
          />
          <label htmlFor="location">Location</label>
        </FormGroup>

        <div>
          <label>Min Price:</label>
          <input
            type="number"
            name="minPrice"
            value={filters.minPrice}
            onChange={handleInputChange}
            placeholder={`${filters.maxPrice ? filters.maxPrice - 1 : ""}`}
            max={filters.maxPrice || ""}
          />
        </div>
        
        <div>
          <label>Max Price:</label>
          <input
            type="number"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleInputChange}
            placeholder={`${filters.minPrice ? Number(filters.minPrice) + 1 : ""}`}
            min={filters.minPrice || ""}
          />
        </div>


        <FormGroup className="form__group">
          <button className="btn find__car-btn" type="submit" disabled={!filters.name}>
            Find Car
          </button>
        </FormGroup>
      </div>
    </Form>
  );
};

export default FindCarForm;
