import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What is FINPAY and how does it support cross-border settlements?",
    answer: "FINPAY is an enterprise-grade financial infrastructure protocol enabling real-time cross-border clearing, settlement, and treasury management. We bypass complex intermediary networks to connect local clearing corridors directly, facilitating seamless multi-currency settlements with institutional liquidity.",
  },
  {
    question: "Which currencies and settlement corridors do you support?",
    answer: "We support key global clearing currencies including USD, EUR, GBP, SGD, AED, and INR across 80+ corridors covering North America, South America, Europe, the Middle East, India, and Southeast Asia.",
  },
  {
    question: "What are the typical settlement times?",
    answer: "Settlement times range from instant (real-time) to T+1 depending on the clearing corridor, currency pair, and time-of-day. This represents a significant acceleration over traditional SWIFT-based multi-day clearing routes.",
  },
  {
    question: "How secure are FINPAY transactions?",
    answer: "FINPAY incorporates bank-grade security protocols, including end-to-end data encryption, secure hardware security modules (HSMs), and strict compliance with international AML/KYC standards. Every transaction is monitored in real-time by automated transaction screening engines.",
  },
  {
    question: "Can FINPAY integrate with our ERP or existing payment systems?",
    answer: "Yes, FINPAY provides developer-friendly REST APIs, SDKs, and ready-made webhooks designed to integrate directly with major enterprise ERP systems, treasury portals, and standard banking core systems.",
  },
  {
    question: "Is there a minimum transaction volume?",
    answer: "FINPAY is optimized for high-volume digital merchants, cross-border businesses, and financial institutions. While there are standard commercial guidelines, we configure custom clearing tiers and thresholds based on your operational volume.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative w-full bg-black text-white py-36 px-6 overflow-hidden">
      <div className="mx-auto max-w-[660px] w-full relative z-10 flex flex-col items-center">

        {/* Header */}
        <div className="text-center mb-16 flex flex-col items-center">
          <span
            className="font-mono text-[0.8rem] font-bold tracking-[0.3em] uppercase block mb-3"
            style={{ color: "#00E6A7" }}
          >
            FAQ
          </span>
          <h2 className="font-['Outfit'] font-bold text-[clamp(2rem,4.5vw,52px)] text-white leading-[1.1] tracking-tight mb-5">
            Frequently Asked Questions
          </h2>
          <p
            className="font-['Sora'] text-[18px] leading-relaxed text-zinc-400 max-w-[500px]"
            style={{ color: "rgba(255,255,255,0.65)" }}
          >
            Everything you need to know about FINPAY</p>
        </div>
        <br />
        {/* Accordion container */}
        <div className="w-full flex flex-col mb-16">
          {faqData.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="w-full flex flex-col"
                style={{
                  borderBottom: "1px solid rgba(255,255,255,0.08)"
                }}
              >
                {/* Question Header */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between text-left cursor-pointer py-[22px] transition-opacity duration-200 hover:opacity-85"
                >
                  <span className="font-['Outfit'] font-semibold text-[18px] text-white leading-snug">
                    {item.question}
                  </span>
                  <div
                    className="ml-4 flex-shrink-0 transition-transform duration-300"
                    style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                  >
                    <ChevronDown
                      className="w-5 h-5 text-zinc-500"
                    />
                  </div>
                </button>

                {/* Answer Content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p
                        className="pb-6 font-['Sora'] text-[16px] leading-relaxed"
                        style={{ color: "rgba(255,255,255,0.65)" }}
                      >
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
        <br />
        {/* Bottom CTA */}
        <div
          className="text-center font-['Sora'] text-[16px] leading-relaxed"
          style={{ color: "rgba(255,255,255,0.65)" }}
        >
          Can't find what you're looking for?{" "}<br />
          <a
            href="#contact"
            className="font-medium hover:opacity-80 transition-all duration-200 inline-block mt-1"
            style={{ color: "#00E6A7" }}
          >
            Contact our customer support team
          </a>
        </div>

      </div>
    </section>
  );
}
