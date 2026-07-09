import { motion } from "framer-motion";

export default function Footer() {
  const containerVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };
  <br />
  return (
    <footer className="w-full bg-[#000000] text-white pb-24 px-6 md:px-12 relative z-10 font-sans" style={{ paddingTop: '64px' }}>
      <div className="max-w-7xl mx-auto w-full">

        {/* Top Section: 4-Column Grid using stable CSS classes */}
        <motion.div
          className="footer-grid"
          style={{ paddingBottom: '24px' }}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Column 1: FINPAY Logo, Socials */}
          <motion.div className="flex flex-col items-start" variants={itemVariants}>
            <div className="flex items-center gap-3 mb-8">
              <img
                src="/logofoot.png"
                alt="FINPAY Logo"
                className="object-contain"
                style={{ height: '100px', width: 'auto' }}
              />
            </div>

            {/* Social Icons (styled 22px, gray, hover to FINPAY green, shifted 10px right) */}
            <div className="flex items-center gap-4" style={{ marginLeft: '10px' }}>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="footer-social-icon"
              >
                <svg className="w-[22px] h-[22px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="footer-social-icon"
              >
                <svg className="w-[22px] h-[22px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                className="footer-social-icon"
              >
                <svg className="w-[22px] h-[22px]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://telegram.org"
                target="_blank"
                rel="noreferrer"
                className="footer-social-icon"
              >
                <svg className="w-[22px] h-[22px]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-1-.65-.35-1 .22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.69-.52.36-1 .53-1.42.52-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.42-1.42-.88.03-.24.35-.49.97-.74 3.79-1.65 6.32-2.74 7.59-3.27 3.61-1.5 4.36-1.76 4.85-1.77.11 0 .35.03.5.15.13.1.17.24.18.34.01.07.02.24.01.4z" />
                </svg>
              </a>
              <a
                href="mailto:support@finpay.com"
                className="footer-social-icon"
              >
                <svg className="w-[22px] h-[22px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </a>
            </div>
          </motion.div>

          {/* Column 2: Company */}
          <motion.div className="footer-column-align flex flex-col items-start" variants={itemVariants}>
            <h4 className="footer-heading">
              Company
            </h4>
            <div className="flex flex-col gap-4">
              <a href="#about" className="footer-link">
                About
              </a>
              <a href="#services" className="footer-link">
                Services
              </a>
              <a href="#network" className="footer-link">
                Global Network
              </a>
              <a href="#faq" className="footer-link">
                FAQ
              </a>
              <a href="#contact" className="footer-link">
                Contact
              </a>
            </div>
          </motion.div>

          {/* Column 3: Services */}
          <motion.div className="footer-column-align flex flex-col items-start" variants={itemVariants}>
            <h4 className="footer-heading">
              Services
            </h4>
            <div className="flex flex-col gap-4">
              <a href="#payments" className="footer-link">
                Cross-Border Payments
              </a>
              <a href="#settlement" className="footer-link">
                Multi-Currency Settlement
              </a>
              <a href="#treasury" className="footer-link">
                Treasury Solutions
              </a>
              <a href="#gateway" className="footer-link">
                Payment Gateway
              </a>
              <a href="#api" className="footer-link">
                API Integration
              </a>
            </div>
          </motion.div>

          {/* Column 4: Resources */}
          <motion.div className="footer-column-align flex flex-col items-start" variants={itemVariants}>
            <h4 className="footer-heading">
              Resources
            </h4>
            <div className="flex flex-col gap-4">
              <a href="#docs" className="footer-link">
                Documentation
              </a>
              <a href="#security" className="footer-link">
                Security
              </a>
              <a href="#privacy" className="footer-link">
                Privacy Policy
              </a>
              <a href="#terms" className="footer-link">
                Terms
              </a>
              <a href="#support" className="footer-link">
                Support
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <div
          className="w-full"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)", marginTop: '24px', marginBottom: '24px' }}
        />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 font-['Sora'] text-[14px] text-zinc-500" style={{ paddingTop: '6px' }}>
          <div>
            © 2026 FINPAY. All rights reserved.
          </div>
          <div className="flex items-center gap-8">
            <a href="#terms" className="footer-link">
              Terms of Service
            </a>
            <a href="#privacy" className="footer-link">
              Privacy Policy
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
