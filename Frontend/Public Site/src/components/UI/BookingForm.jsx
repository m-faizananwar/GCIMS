
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";  // Import useParams from react-router-dom
import { Form, FormGroup } from "reactstrap";
import emailjs from "@emailjs/browser";

const BookingForm = () => {
  const { slug } = useParams();  // Extract car name (slug) from URL parameters

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    journeyDate: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const submitHandler = (event) => {
    event.preventDefault();

    // Prepare EmailJS data, using the slug (car name) from the URL
    const emailData = {
      carName: slug,  // Here, the slug is the car name
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      journeyDate: formData.journeyDate,
      message: formData.message,
    };

    // Send email via EmailJS
    emailjs
      .send(
        "service_qcaivln",  // Replace with your EmailJS Service ID
        "template_gmtdgyg",  // Replace with your EmailJS Template ID
        emailData,
        "xeu5tMv1Sa80c70hg"  // Replace with your EmailJS Public Key
      )
      .then(
        (response) => {
          alert("Booking request sent successfully!");
          console.log("Email sent:", response);
        },
        (error) => {
          alert("Failed to send the booking request. Please try again.");
          console.error("Email error:", error);
        }
      );
  };

  return (
    <Form onSubmit={submitHandler}>
      <h3>Book {slug}</h3> {/* Display the car name using the slug */}

      <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <label htmlFor="firstName">First Name</label> {/* Label added */}
        <input
          type="text"
          name="firstName"
          placeholder=""

          value={formData.firstName}
          onChange={handleChange}
          required
        />
      </FormGroup>

      <FormGroup className="booking__form d-inline-block ms-1 mb-4">
        <label htmlFor="lastName">Last Name</label> {/* Label added */}
        <input
          type="text"
          name="lastName"
          placeholder=""

          value={formData.lastName}
          onChange={handleChange}
          required
        />
      </FormGroup>

      <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <label htmlFor="email">Email</label> {/* Label added */}
        <input
          type="email"
          name="email"
          placeholder=""

          value={formData.email}
          onChange={handleChange}
          required
        />
      </FormGroup>

      <FormGroup className="booking__form d-inline-block ms-1 mb-4">
        <label htmlFor="phone">Phone Number</label> {/* Label added */}
        <input
          type="number"
          name="phone"
          placeholder=""

          value={formData.phone}
          onChange={handleChange}
          required
        />
      </FormGroup>
  

      <FormGroup>
        <label htmlFor="message">Message</label> {/* Label added */}

        <textarea
          rows={5}
          className="textarea"
          name="message"

          placeholder="Write"
          value={formData.message}
          onChange={handleChange}
        ></textarea>
      </FormGroup>

      <button type="submit" className="btn btn-primary">
        Submit Booking
      </button>
    </Form>
  );
};

export default BookingForm;
