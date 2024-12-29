import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import CarItem from "../components/UI/CarItem";
import carData from "../assets/data/carData"; // Import your dummy data
import { useLocation } from "react-router-dom";

// Import your images
import img01 from "../assets/all-images/cars-img/nissan-offer.png";
import img02 from "../assets/all-images/cars-img/offer-toyota.png";
import img03 from "../assets/all-images/cars-img/bmw-offer.png";
import img04 from "../assets/all-images/cars-img/nissan-offer.png";
import img05 from "../assets/all-images/cars-img/offer-toyota.png";
import img06 from "../assets/all-images/cars-img/mercedes-offer.png";
import img07 from "../assets/all-images/cars-img/toyota-offer-2.png";
import img08 from "../assets/all-images/cars-img/mercedes-offer.png";

// Store all images in an array for random selection
const carImages = [img01, img02, img03, img04, img05, img06, img07, img08];

const CarListing = () => {
  const [fetchedCars, setFetchedCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null); // To capture any errors
  const [sortOrder, setSortOrder] = useState("default"); // Track sort order (default by default)
  const location = useLocation(); // Used to get query parameters

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    // Extract filter parameters
    const name = searchParams.get("name") || "";
    const model = searchParams.get("model") || "";
    const locationFilter = searchParams.get("location") || "";
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");

    let fetchUrl = "http://localhost:8080/cars"; // Default URL

    if (name || model || locationFilter || minPrice || maxPrice) {
      if (minPrice || maxPrice) {
        fetchUrl = `http://localhost:8080/cars/search?name=${name}&model=${model}&country=${locationFilter}&minprice=${minPrice || ''}&maxprice=${maxPrice || ''}`;
      } else {
        fetchUrl = `http://localhost:8080/cars/search?name=${name}&model=${model}&country=${locationFilter}`;
      }
    }

    // Adjust the fetch URL based on the sort order
    if (sortOrder === "low") {
      fetchUrl = "http://localhost:8080/cars/sorted/price/ascending"; // Low to High
    } else if (sortOrder === "high") {
      fetchUrl = "http://localhost:8080/cars/sorted/price/descending"; // High to Low
    } else if (sortOrder === "make-ASC") {
      fetchUrl = "http://localhost:8080/cars/sorted/make/ascending"; // Make ASC
    } else if (sortOrder === "make-DESC") {
      fetchUrl = "http://localhost:8080/cars/sorted/make/descending"; // Make DESC
    } else if (sortOrder === "make-and-model-ASC") {
      fetchUrl = "http://localhost:8080/cars/sorted/make_and_model/ascending"; // Make and Model ASC
    } else if (sortOrder === "make-and-model-DESC") {
      fetchUrl = "http://localhost:8080/cars/sorted/make_and_model/descending"; // Make and Model DESC
    } else if (sortOrder === "age-ASC") {
      fetchUrl = "http://localhost:8080/cars/sorted/age/ascending"; // Age ASC
    } else if (sortOrder === "age-DESC") {
      fetchUrl = "http://localhost:8080/cars/sorted/age/descending"; // Age DESC
    } else if (sortOrder === "date-ASC") {
      fetchUrl = "http://localhost:8080/cars/sorted/date/ascending"; // Date ASC
    } else if (sortOrder === "date-DESC") {
      fetchUrl = "http://localhost:8080/cars/sorted/date/descending"; // Date DESC
    }

    fetch(fetchUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Directly parse JSON response
      })
      .then((data) => {
        console.log("Fetched Data:", data); // Log the fetched data

        // Map and format fetched data to match carData's structure
        const updatedCars = data.map((car, index) => {
          // Randomly assign an image from the array
          const randomImage = carImages[Math.floor(Math.random() * carImages.length)];

          return {
            id: car.id || index,
            brand: car.brand || "Unknown Brand",
            carName: car.carName || `Car ${index + 1}`,
            imgUrl: randomImage, // Use the randomly selected image
            model: car.model || "Unknown Model",
            price: car.price || "Unknown",
            speed: car.speed || "Unknown Speed",
            location: car.location || "Unknown Location",
            gender: car.gender || "Unknown",
            description: car.description || "No description available",
          };
        });

        // Overwrite the carData array locally
        carData.length = 0; // Clear the existing array
        carData.push(...updatedCars); // Add the updated data to carData

        console.log("Updated carData Array:", carData); // Log the updated carData

        setFetchedCars(updatedCars);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error.message);
        setIsLoading(false);
      });
  }, [location.search, sortOrder]); // Re-run the fetch when sortOrder changes

  const carsToDisplay = isLoading ? [] : carData;

  const handleSortChange = (event) => {
    setSortOrder(event.target.value); // Update the sortOrder based on user selection
  };

  return (
    <Helmet title="Cars">
      <CommonSection title="Car Listing" />

      <section>
        <Container>
          <Row>
            <Col lg="12">
              <div className="d-flex align-items-center gap-3 mb-5">
                <span className="d-flex align-items-center gap-2">
                  <i className="ri-sort-asc"></i> Sort By
                </span>
                <select onChange={handleSortChange} value={sortOrder}>
                  <option value="default">Default</option>
                  <option value="low">Low to High</option>
                  <option value="high">High to Low</option>
                  <option value="make-ASC">Make ASC</option>
                  <option value="make-DESC">Make DESC</option>
                  <option value="make-and-model-ASC">Make and Model ASC</option>
                  <option value="make-and-model-DESC">Make and Model DESC</option>
                  <option value="age-ASC">Age ASC</option>
                  <option value="age-DESC">Age DESC</option>
                  <option value="date-ASC">Date ASC</option>
                  <option value="date-DESC">Date DESC</option>
                </select>
              </div>
            </Col>

            {/* Display loading message when data is being fetched */}
            {isLoading && <div>Loading...</div>}

            {/* Check if there was an error and display it */}
            {error && <div>Error: {error}</div>}

            {/* Displaying the fetched data */}
            {!isLoading && carsToDisplay.length === 0 && <div>No Cars Available</div>}

            {!isLoading &&
              carsToDisplay.length > 0 &&
              carsToDisplay.map((item) => <CarItem item={item} key={item.id} />)}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default CarListing;
