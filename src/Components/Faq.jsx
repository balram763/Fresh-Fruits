import React from "react";
import { Link } from "react-router-dom";

const Faq = () => {
  return (
    <div className="container my-5">
      <h2 className="text-center text-success mb-4">Frequently Asked Questions</h2>

      <div className="accordion" id="faqAccordion">
        

        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#faq1"
            >
              What is FreshFruits99?
            </button>
          </h2>
          <div id="faq1" className="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
            <div className="accordion-body">
              FreshFruits99 is an online store that delivers fresh, organic, and high-quality fruits directly to your doorstep.
            </div>
          </div>
        </div>

        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#faq2"
            >
              Do you offer organic fruits?
            </button>
          </h2>
          <div id="faq2" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
            <div className="accordion-body">
              Yes! All our fruits are sourced from certified organic farms, ensuring they are fresh, chemical-free, and 100% natural.
            </div>
          </div>
        </div>

        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#faq3"
            >
              How can I place an order?
            </button>
          </h2>
          <div id="faq3" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
            <div className="accordion-body">
              You can browse our website, add your favorite fruits to the cart, and proceed to checkout for a seamless ordering experience.
            </div>
          </div>
        </div>


        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#faq4"
            >
              What payment methods do you accept?
            </button>
          </h2>
          <div id="faq4" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
            <div className="accordion-body">
              We accept Cash on delivery (COD) Only we Are Working to Add more Payment Methods.
            </div>
          </div>
        </div>


        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#faq5"
            >
              Do you provide home delivery?
            </button>
          </h2>
          <div id="faq5" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
            <div className="accordion-body">
              Yes! We offer fast and reliable home delivery services across multiple locations.
            </div>
          </div>
        </div>

      </div>
      <Link to={'/'} className="btn btn-success py-2 mt-3 fw-bold shadow-sm">
                Back To Store
              </Link>
    </div>
  );
};

export default Faq;
