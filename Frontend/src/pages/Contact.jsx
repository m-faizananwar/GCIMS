import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

import { Link } from "react-router-dom";
import { Container, Row, Col, Form, FormGroup, Input } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";

import "../styles/contact.css";

const socialLinks = [
  {
    url: "#",
    icon: "ri-facebook-line",
  },
  {
    url: "#",
    icon: "ri-instagram-line",
  },
  {
    url: "#",
    icon: "ri-linkedin-line",
  },
  {
    url: "#",
    icon: "ri-twitter-line",
  },
];

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_qcaivln', 'template_0v7gqm3', form.current, {
        publicKey: 'xeu5tMv1Sa80c70hg',
      })
      .then(
        () => {
          console.log('SUCCESS!');
          alert("Message Sent Successfully!"); // Show success pop-up
          form.current.reset(); // Clear form fields
        },
        (error) => {
          console.log('FAILED...', error.text);
          alert("Failed to send message. Please try again later.");
        },
      );
  };

  return (
    <Helmet title="Contact">
      <CommonSection title="Contact" />
      <section>
        <Container>
          <Row>
            <Col lg="7" md="7">
              <h6 className="fw-bold mb-4">Get In Touch</h6>
                
              <form ref={form} onSubmit={sendEmail}>
                <label>Name</label>
                <input type="text" name="user_name" />
                
                <label>Email</label>
                <input type="email" name="user_email" />
                
                <label>Message</label>
                <textarea name="message" rows="5" placeholder="Write your message here..."></textarea>
                
                <div className="send-btn-wrapper">
                  <button type="submit">Send</button>
                </div>
              </form>
            </Col>

            <Col lg="5" md="5">
              <div className="contact__info">
                <h6 className="fw-bold">Contact Information</h6>
                <p className="section__description mb-0"></p>

                <div className="d-flex align-items-center gap-2">
                  <h6 className="fs-6 mb-0">Phone:</h6>
                  <p className="section__description mb-0">+92 000-0000000</p>
                </div>

                <div className="d-flex align-items-center gap-2">
                  <h6 className="mb-0 fs-6">Email:</h6>
                  <p className="section__description mb-0">admin@gmail.com</p>
                </div>

                <h6 className="fw-bold mt-4">Follow Us</h6>

                <div className="d-flex align-items-center gap-4 mt-3">
                  {socialLinks.map((item, index) => (
                    <Link to={item.url} key={index} className="social__link-icon">
                      <i class={item.icon}></i>
                    </Link>
                  ))}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Contact;
