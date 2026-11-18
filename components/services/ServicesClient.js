"use client";

import { useState } from "react";
import ServicesHero from "./ServicesHero";
import ServicesOverview from "./ServicesOverview";
import ServicesWorkflow from "./ServicesWorkflow";
import WhyWorkWithMe from "./WhyWorkWithMe";
import ServicesFAQ from "./ServicesFAQ";
import ServicesInquiryForm from "./ServicesInquiryForm";

export default function ServicesClient() {
  const [selectedService, setSelectedService] = useState("Web Application Development");

  const handleSelectService = (serviceName) => {
    setSelectedService(serviceName);
  };

  return (
    <>
      <ServicesHero onSelectService={handleSelectService} />
      <ServicesOverview onSelectService={handleSelectService} />
      <ServicesWorkflow />
      <WhyWorkWithMe />
      <ServicesFAQ />
      <ServicesInquiryForm 
        selectedService={selectedService} 
        onServiceChange={handleSelectService}
      />
    </>
  );
}
