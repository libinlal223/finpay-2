import { motion } from 'framer-motion';

export default function FinPayContactSection() {
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const,
        staggerChildren: 0.12
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }
    }
  };

  const iconFloatTransition = {
    duration: 3.5,
    repeat: Infinity,
    ease: "easeInOut" as const
  };

  const arrowVariants = {
    initial: { x: 0 },
    hover: { x: 4 }
  };

  const iconVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.08 }
  };

  return (
    <section id="contact" className="contact-section">
      <style>{`
        .contact-section {
          background-color: #000000;
          position: relative;
          width: 100%;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 112px 24px;
          box-sizing: border-box;
        }
        .contact-container {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr;
          gap: 48px;
          align-items: center;
          box-sizing: border-box;
        }
        @media (min-width: 1024px) {
          .contact-container {
            grid-template-columns: minmax(0, 0.38fr) minmax(0, 0.62fr);
            gap: 64px;
          }
        }
        .contact-left {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        text-align: left;
        width: 100%;
        margin: 0;
        padding-right: 24px;
        box-sizing: border-box;
        }

        @media (max-width: 1023px) {
          .contact-left {
            padding-right: 0;
          }
        }
        .contact-label {
          font-family: 'Rosehot', monospace !important;
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 0.25em;
          color: #00E6A7;
          text-shadow: 0 0 8px rgba(0, 230, 167, 0.5);
          text-transform: uppercase;
          margin-bottom: 16px;
          display: block;
        }
        .contact-heading {
          margin-bottom: 24px;
        }
        .contact-desc {
          font-family: 'Sora', sans-serif;
          font-size: 0.95rem;
          line-height: 1.6;
          color: #a1a1aa;
          max-width: 380px;
        }
        .contact-right {
          display: flex;
          flex-direction: column;
          gap: 24px;
          width: 100%;
          min-width: 0;

        }
        .contact-card {
          position: relative;
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          gap: 24px;

          width: 100%;
          min-width: 0;
          height: 160px;

          padding: 32px;
          box-sizing: border-box;

          border-radius: 24px;
          background: rgba(10,10,10,.95);
          border: 1px solid rgba(255,255,255,.08);

          box-shadow: 0 12px 32px rgba(0,0,0,.4);

          transition: .35s cubic-bezier(.16,1,.3,1);
        }
        .contact-card-icon-wrapper {
          flex-shrink: 0;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }
        .whatsapp-icon-wrapper {
          background-color: rgba(0, 163, 128, 0.1);
          border: 1px solid rgba(0, 163, 128, 0.2);
          color: #00A380;
        }
        .telegram-icon-wrapper {
          background-color: rgba(36, 161, 222, 0.1);
          border: 1px solid rgba(36, 161, 222, 0.2);
          color: #24A1DE;
        }
        .contact-card-info {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100%;
          flex-grow: 1;
        }
        .contact-card-title {
          font-family: 'Outfit', sans-serif;
          font-weight: 700;
          font-size: 1.12rem;
          color: #ffffff;
          line-height: 1.2;
          margin-bottom: 4px;
        }
        .contact-card-desc {
          font-family: 'Sora', sans-serif;
          font-size: 0.82rem;
          color: #a1a1aa;
          line-height: 1.4;
        }
        .contact-card-link-container {
          margin-top: 8px;
        }
        .contact-card-link {
          font-family: 'Outfit', sans-serif;
          font-weight: 600;
          font-size: 0.88rem;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          text-decoration: none;
          transition: all 0.3s ease;
        }
        .contact-card-link:hover {
          text-decoration: underline;
        }
        .contact-card-arrow {
          display: inline-block;
          transition: transform 0.3s ease;
        }
      `}</style>

      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#00E6A7]/[0.015] blur-[150px] rounded-full z-0 pointer-events-none"></div>

      <motion.div
        className="contact-container relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* LEFT COLUMN */}
        <motion.div className="contact-left" variants={itemVariants}>
          <span className="contact-label">
            GET IN TOUCH
          </span>
          <h3 className="shiny-text font-['Outfit'] font-[800] text-[clamp(2.2rem,4vw,3rem)] leading-[1.05] tracking-[-0.03em] contact-heading">
            Need Assistance?
          </h3>
          <p className="contact-desc">
            Our support team is available to help you with account setup, transactions and operational queries.
          </p>
        </motion.div>

        {/* RIGHT COLUMN */}
        <motion.div className="contact-right" variants={itemVariants}>

          {/* Card 1: WhatsApp Support */}
          <motion.div
            className="contact-card"
            whileHover="hover"
            onClick={() => window.open("https://wa.me/639707725004", "_blank", "noopener,noreferrer")}
            variants={{
              initial: {},
              hover: {
                y: -4,
                borderColor: "rgba(0, 163, 128, 0.4)",
                boxShadow: "0 15px 30px rgba(0, 163, 128, 0.12), inset 0 1px 1px rgba(255, 255, 255, 0.02)"
              }
            }}
          >
            {/* Left: Circular Icon Badge */}
            <motion.div
              className="contact-card-icon-wrapper whatsapp-icon-wrapper"
              variants={iconVariants}
              animate={{ y: [0, -3, 0] }}
              transition={iconFloatTransition}
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.335 4.978L2 22l5.176-1.358a9.932 9.932 0 0 0 4.83 1.254h.005c5.507 0 9.991-4.479 9.992-9.985.001-2.668-1.037-5.176-2.927-7.067C17.185 3.037 14.679 2 12.012 2zm5.727 13.935c-.244.688-1.22 1.259-1.688 1.314-.467.056-.913.255-2.983-.603-2.651-1.096-4.329-3.784-4.461-3.96-.133-.175-1.082-1.439-1.082-2.744 0-1.305.688-1.943.932-2.203.244-.26.532-.325.71-.325.18 0 .358.001.513.008.163.008.384-.061.603.468.243.585.83 2.023.902 2.169.072.146.12.316.02.508-.098.195-.146.316-.292.487-.146.172-.308.384-.44.513-.146.143-.3.3-.129.593.172.292.762 1.254 1.636 2.03.1.089.198.175.293.253 1.13 1.008 1.996 1.157 2.293 1.272.298.116.467.098.643-.1.176-.198.761-.884.965-1.189.204-.305.408-.254.688-.149.28.104 1.776.837 2.083.993.307.156.511.23.585.358.074.129.074.747-.17 1.438z" />
              </svg>
            </motion.div>

            {/* Right: Info Column */}
            <div className="contact-card-info">
              <div>
                <h3 className="contact-card-title">
                  WhatsApp Support
                </h3>
                <p className="contact-card-desc">
                  Chat directly with our support team for quick assistance.
                </p>
              </div>

              <div className="contact-card-link-container">
                <a
                  href="https://wa.me/639707725004"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-card-link"
                  style={{ color: '#00A380' }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <span>Chat on WhatsApp</span>
                  <motion.span variants={arrowVariants} className="contact-card-arrow">→</motion.span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Telegram Channel */}
          <motion.div
            className="contact-card"
            whileHover="hover"
            onClick={() => window.open("https://telegram.me/+uxOjP6RkG6I5M2Fl", "_blank", "noopener,noreferrer")}
            variants={{
              initial: {},
              hover: {
                y: -4,
                borderColor: "rgba(36, 161, 222, 0.4)",
                boxShadow: "0 15px 30px rgba(36, 161, 222, 0.12), inset 0 1px 1px rgba(255, 255, 255, 0.02)"
              }
            }}
          >
            {/* Left: Circular Icon Badge */}
            <motion.div
              className="contact-card-icon-wrapper telegram-icon-wrapper"
              variants={iconVariants}
              animate={{ y: [0, 3, 0] }}
              transition={iconFloatTransition}
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-1-.65-.35-1 .22-1.6 1.48-1.54 2.72-2.92 2.84-3.44.02-.07.03-.31-.11-.44-.15-.12-.37-.08-.53-.05-.23.05-3.87 2.46-5.46 3.53-.35.24-.67.35-.97.34-.33 0-.96-.18-1.43-.33-.58-.19-1.04-.29-1-.62.02-.17.25-.35.68-.53 2.67-1.16 4.45-1.93 5.35-2.3 2.56-1.05 3.09-1.23 3.44-1.23.08 0 .25.02.36.11.09.07.12.17.13.26.01.07 0 .21-.02.27z" />
              </svg>
            </motion.div>

            {/* Right: Info Column */}
            <div className="contact-card-info">
              <div>
                <h3 className="contact-card-title">
                  Telegram Channel
                </h3>
                <p className="contact-card-desc">
                  Join our official Telegram channel for updates and announcements.
                </p>
              </div>

              <div className="contact-card-link-container">
                <a
                  href="https://telegram.me/+uxOjP6RkG6I5M2Fl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-card-link"
                  style={{ color: '#24A1DE' }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <span>Join Telegram</span>
                  <motion.span variants={arrowVariants} className="contact-card-arrow">→</motion.span>
                </a>
              </div>
            </div>
          </motion.div>

        </motion.div>

      </motion.div>
    </section>
  );
}
