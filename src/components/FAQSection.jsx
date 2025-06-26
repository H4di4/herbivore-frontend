// src/components/FAQSection.jsx

import { useState } from "react";
import Newsletter from "./Newsletter";
import Footer from "./Footer";

const faqs = [
{
    question: "What is your return policy?",
    answer:
      "We want you to love your skincare. If you're not fully satisfied with your purchase, you may return any item within 30 days of delivery for a full refund. Products must be at least half full and returned in their original packaging.",
  },
  {
    question: "Do you offer international shipping?",
    answer:
      "Yes, we proudly offer international shipping to many countries around the world. Shipping rates and delivery times vary depending on your location and will be calculated at checkout.",
  },
  {
    question: "How can I track my order?",
    answer:
      "Once your order has been processed and shipped, you will receive a confirmation email that includes your tracking number and a direct link to follow your package’s journey. ",
  },{
    question : " Is there a shipping charge?",
    answer : "Shipping fees vary by location. For example, in Japan, a flat rate of 600 yen is charged for orders under 11,000 yen, with free shipping for orders over that amount. Delivery is typically via Sagawa Express."
  },
  {
    question: "How long will it take for my order to arrive?",
    answer : "Orders are usually processed and shipped within 1-2 business days. Delivery times can vary depending on the shipping method and destination. For instance, in the U.S., standard shipping may take up to 10 business days."
  }
];

export default function FAQSection() {
  const [openItems, setOpenItems] = useState({});

  const toggleFAQ = (index) => {
    setOpenItems((prev) => ({
      ...prev,
      [index]: !prev[index], // toggle only this index
    }));
  };

  return (
    <>
  
    <div className="max-w-2xl mx-auto py-10 px-4 mt-8">
      <h2 className="text-3xl font-normal text-center mb-8 border-b p-8">FREQUENTLY ASKED QUESTIONS</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b pb-4">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full text-left flex justify-between items-center focus:outline-none"
            >
              <span className="text-[16px] font-bold text-[rgb(59,59,59)]">{faq.question}</span>
              <span className="text-xl text-gray-700">
                {openItems[index] ? "−" : "+"}
              </span>
            </button>
            {openItems[index] && (
              <p className="mt-2 text-black text-[14px] transition duration-300 ease-in-out ">
                {faq.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
    <div className="mt-20">

   
    <Newsletter/>
    <Footer/>
     </div> 
      </>
  );
}