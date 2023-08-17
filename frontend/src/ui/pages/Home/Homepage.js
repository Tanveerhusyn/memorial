import React from "react";
import Header from "../../components/header/Header";
import Hero from "../../components/hero/Hero";
import Services from "../../components/services/Services";
import FindMemorial from "../../components/findmemorial/FindMemorial";
import Features from "../../components/features/Features";
import Testimonials from "../../components/testimonials/Testimonial";
import Share from "../../components/sharetestimonial/Share";
import Footer from "../../components/footer/Footer";

function Homepage() {
  return (
    <>
      <Hero />
      <FindMemorial />
      <Features />
      <Testimonials />
      <Share />
    </>
  );
}

export default Homepage;
