import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What is FINPAY?",
    answer: "FinPay is a cross-border payment and payment gateway platform that enables businesses to collect payments, settle funds efficiently, and manage international payment operations with secure and reliable infrastructure.",
  },
  {
    question: "Which payment methods are supported?",
    answer: "Depending on your approved account and integration, FinPay supports multiple payment collection methods and bank transfer solutions."
  },
  {
    question: "What currencies are supported?",
    answer: "Supported currencies depend on the merchant’s approved services and operating regions. Please contact our team for specific availability.",
  },
  {
    question: "Is there a minimum or maximum transaction limit?",
    answer: "Transaction limits vary based on merchant profile, verification level, and approved business category.",
  },
  {
    question: "How do I become a merchant?",
    answer: "Simply click Get Started or Contact Sales, submit your business information, complete verification, and our onboarding team will guide you through the process.",
  },
  {
    question: "Does FinPay support cryptocurrency payments?",
    answer: "Yes. FinPay supports cryptocurrency-based settlement solutions for eligible business clients. We facilitate digital asset payment workflows in accordance with applicable laws, regulations, and our compliance requirements.",
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
