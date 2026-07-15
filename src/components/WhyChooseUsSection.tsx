import { motion } from "framer-motion";

export default function WhyChooseUsSection() {
  const cardPoints = [
    "Fast settlement processing",
    "Multi-currency support",
    "Competitive exchange pricing",
    "Secure transaction handling",
    "International payment support",
    "Merchant-focused infrastructure",
    "High-volume transaction capability",
    "Dedicated onboarding assistance"
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  };

  const rightCardVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  return (
    <section
      className="relative w-full min-h-screen bg-black overflow-hidden flex items-center py-24 md:py-32"
      style={{
        backgroundImage: "radial-gradient(circle at 70% 50%, rgba(0, 230, 167, 0.05) 0%, transparent 60%)"
      }}
    >
      {/* Background Image (Covered and centered, phone shows in center/right on desktop) */}
      <div
        className="absolute inset-0 w-full h-full bg-center bg-cover bg-no-repeat opacity-80 pointer-events-none z-0"
        style={{
          backgroundImage: "url('/pg1.webp')",
        }}
      />

      {/* Dark overlay to ensure text readability */}
      <div
        className="absolute inset-0 bg-black/60 md:bg-black/35 z-10 pointer-events-none"
      />

      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Column: Text & Headings (5 columns on desktop) */}
          <motion.div
            className="lg:col-span-5 flex flex-col items-start"
            style={{ paddingLeft: '30px' }}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div
              className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#00E6A7]/20 bg-[#00E6A7]/5 rounded font-['Outfit'] text-xs font-semibold tracking-[0.15em] uppercase text-[#00E6A7] mb-6"
              variants={itemVariants}
            >
            </motion.div>

            <motion.h2
              className="font-['Outfit'] font-extrabold text-[clamp(2.5rem,5vw,3.8rem)] tracking-tight leading-tight text-white mb-6"
              variants={itemVariants}
            >
              Why Choose Us?
            </motion.h2>

            <motion.p
              className="font-['Sora'] text-[16px] leading-[1.7] text-zinc-300 max-w-[480px]"
              variants={itemVariants}
            >
              Accelerate global cash flow and simplify international treasury operations with a payment infrastructure built for high-volume enterprises.
            </motion.p>
          </motion.div>

          {/* Center Column: Empty space on desktop for the background phone mockup (3 columns) */}
          <div className="hidden lg:block lg:col-span-3 pointer-events-none" />

          {/* Right Column: Premium Floating Glass-style Feature Card (4 columns on desktop) */}
          <motion.div
            className="col-span-1 lg:col-span-4 lg:-translate-x-12 z-20 w-full"
            variants={rightCardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <div
              style={{
                width: "100%",
                maxWidth: "350px",
                marginLeft: "auto",
                marginRight: "30px",
                background: "rgba(255, 255, 255, 0.04)",
                backdropFilter: "blur(18px)",
                WebkitBackdropFilter: "blur(18px)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "24px",
                boxShadow: "0 20px 60px rgba(0, 0, 0, 0.35)",
                padding: "28px",
              }}
            >


              {/* Feature List with hover transformations */}
              <div className="flex flex-col gap-y-[12px] w-full">
                {cardPoints.map((point, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 group cursor-pointer"
                  >
                    {/* Glowing Bullet (8px) */}
                    <div
                      className="w-[8px] h-[8px] rounded-full bg-[#00E6A7] flex-shrink-0 transition-all duration-[250ms] group-hover:shadow-[0_0_12px_#00E6A7] group-hover:scale-110"
                      style={{
                        boxShadow: "0 0 6px rgba(0, 230, 167, 0.4)",
                      }}
                    />
                    {/* Feature Text (14.5px, line-height 1.7) */}
                    <span
                      className="font-['Sora'] text-[14.5px] font-medium text-white/90 leading-[1.7] transition-transform duration-[250ms] group-hover:translate-x-1"
                    >
                      {point}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
