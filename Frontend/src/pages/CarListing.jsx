import { useState, useEffect } from "react";

import img01 from "../assets/all-images/cars-img/nissan-offer.png";
import img02 from "../assets/all-images/cars-img/offer-toyota.png";
import img03 from "../assets/all-images/cars-img/bmw-offer.png";
import img04 from "../assets/all-images/cars-img/nissan-offer.png";
import img05 from "../assets/all-images/cars-img/offer-toyota.png";
import img06 from "../assets/all-images/cars-img/mercedes-offer.png";
import img07 from "../assets/all-images/cars-img/toyota-offer-2.png";
import img08 from "../assets/all-images/cars-img/mercedes-offer.png";

const CarListing = () => {
  const [carData, setCarData] = useState([]); // State to store car data

  useEffect(() => {
    const fetchCarData = async () => {
      try {
        const response = await fetch("http://localhost:8080/cars");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        // Array of imported images
        const images = [img01, img02, img03, img04, img05, img06, img07, img08];

        // Transform the data: assign IDs and random images
        const finalCarData = data.map((car, index) => ({
          id: index + 1, // Assign sequential IDs starting from 1
          make: car.make,
          model: car.model,
          buyerGender: car.buyer_gender,
          buyerAge: car.buyer_age,
          location: `${car.city}, ${car.country}`,
          color: car.color,
          newCar: car.new_car,
          purchaseDate: car.purchase_date,
          price: car.sale_price,
          speed: `${car.top_speed} km/h`,
          imgUrl: images[Math.floor(Math.random() * images.length)], // Random image
        }));

        setCarData(finalCarData); // Set the transformed data into state
      } catch (error) {
        console.error("Error fetching car data:", error);
      }
    };

    fetchCarData();
  }, []); // Fetch data once on component mount

  return (
    <div>
      <h1>Car Listings</h1>
      <ul>
        {carData.map((car) => (
          <li key={car.id}>
            <img src={car.imgUrl} alt={`${car.make} ${car.model}`} width={100} />
            <h3>
              {car.make} {car.model}
            </h3>
            <p>Price: ${car.price}</p>
            <p>Top Speed: {car.speed}</p>
            <p>Location: {car.location}</p>
            <p>Buyer Gender: {car.buyerGender}</p>
            <p>Buyer Age: {car.buyerAge}</p>
            <p>Purchase Date: {car.purchaseDate}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CarListing;
