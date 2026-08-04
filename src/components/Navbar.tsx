import { useState, useEffect } from "react";
import { motion, AnimatePresence, MotionValue } from "framer-motion";
import { Home, User, Settings, PhoneCall, Menu, X } from "lucide-react";

interface NavItem {
  id: string;
  label: string;
  icon: any;
}

const navItems: NavItem[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "about", label: "About", icon: User },
  { id: "services", label: "Services", icon: Settings },
  { id: "contact", label: "Contact", icon: PhoneCall }
];

interface NavbarProps {
  scrollYProgress?: MotionValue<number>;
}

export default function Navbar({ scrollYProgress: _ }: NavbarProps) {
  const [activeSection, setActiveSection] = useState("home");
  const [isVisible, setIsVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY;

      const heroSection = document.documentElement?.dataset?.heroSection;

      // Section 5 threshold: Navbar appears starting from Section 5 onwards (in hero scene or scrolled down to CryptoMarketSection/below)
      const isSection5Active = heroSection === "2";
      const isScrolledDown = scrollY > 40;

      setIsVisible(isSection5Active || isScrolledDown);

      // Select layout elements
      const homeEl = document.getElementById("home");
      const aboutEl = document.getElementById("about");
      const servicesEl = document.getElementById("services");
      const contactEl = document.getElementById("contact");

      const sections = [
        { id: "home", el: homeEl },
        { id: "about", el: aboutEl },
        { id: "services", el: servicesEl },
        { id: "contact", el: contactEl }
      ];

      let currentActive = "home";

      for (const section of sections) {
        if (section.el) {
          const rect = section.el.getBoundingClientRect();
          // Check if section is currently active in viewport
          if (rect.top <= windowHeight * 0.4 && rect.bottom > windowHeight * 0.4) {
            currentActive = section.id;
            break;
          }
        }
      }

      setActiveSection(currentActive);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("heroSectionChange", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("heroSectionChange", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!isVisible) {
      setMobileMenuOpen(false);
    }
  }, [isVisible]);

  const handleNavClick = (id: string) => {
    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const el = document.getElementById(id);
      if (el) {
        const rect = el.getBoundingClientRect();
        const absoluteTop = rect.top + window.scrollY;

        window.scrollTo({
          top: absoluteTop - 70, // offset for navigation bar clearance
          behavior: "smooth"
        });
      }
    }
  };

  return (
    <>
      {/* Desktop Spotlight Navigation Bar (STRICTLY UNCHANGED FOR DESKTOP VIEW) */}
      <div className="navbar-desktop-container fixed top-8 left-1/2 -translate-x-1/2 z-50 items-center justify-center w-full max-w-fit px-4 pointer-events-none">
        <motion.nav
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: isVisible ? 0 : -80, opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="flex items-center h-[56px] pl-6 pr-8 backdrop-blur-xl rounded-full shadow-[0_16px_40px_rgba(0,0,0,0.65)] relative"
          style={{
            border: "1px solid rgba(255, 255, 255, 0.08)",
            backgroundColor: "rgba(10, 10, 10, 0.92)",
            pointerEvents: isVisible ? "auto" : "none",
            paddingRight: "5px"
          }}
        >
          {/* Left-aligned Logo */}
          <div className="flex items-center h-full pr-6 mr-4 select-none pointer-events-none">
            <img src="/logo.png" alt="Finpay Logo" style={{ width: '68px', height: 'auto', opacity: 0.95 }} />
          </div>

          {/* Navigation buttons with tubelight layout */}
          <div className="flex items-center h-full gap-2 relative">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className="relative cursor-pointer text-xs font-semibold px-3 md:px-6 py-2 rounded-full transition-colors duration-300 select-none outline-none flex items-center"
                  style={{
                    color: isActive ? "#ffffff" : "rgba(255, 255, 255, 0.6)",
                    outline: "none"
                  }}
                >
                  <span>{item.label}</span>

                  {/* Active Tubelight Spotlight Indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-spotlight"
                      className="absolute inset-0 w-full bg-white/5 rounded-full -z-10"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    >
                      {/* Active Top Slit Light Beam */}
                      <div className="absolute -top-[2px] left-1/2 -translate-x-1/2 w-8 h-[2px] bg-[#00E6A7] rounded-t-full shadow-[0_0_8px_rgba(0,230,167,0.85)] z-20">
                        <div className="absolute w-12 h-6 bg-[#00E6A7]/20 rounded-full blur-md -top-2 -left-2" />
                        <div className="absolute w-8 h-6 bg-[#00E6A7]/20 rounded-full blur-md -top-1" />
                        <div className="absolute w-4 h-4 bg-[#00E6A7]/20 rounded-full blur-sm top-0 left-2" />
                      </div>
                    </motion.div>
                  )}
                </button>
              );
            })}

            {/* Tracker Button */}
            <a
              href="/tracker/FINPAY-WITH-TRACKER-1/index.html"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 md:ml-4 mr-3 flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 hover:scale-110"
              style={{
                backgroundColor: "#ffffff",
                color: "#050505",
                boxShadow: "0 0 12px rgba(255, 255, 255, 0.25)",
                marginRight: "16px"
              }}
            >
              <User size={17} strokeWidth={2.5} />
            </a>
          </div>
        </motion.nav>
      </div>

      {/* Mobile Right-Side Navigation Trigger & Menu Drawer (Strictly Mobile Only < 768px) */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: isVisible ? 0 : -50, opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="navbar-mobile-container"
        style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          left: "auto",
          zIndex: 9999,
          display: isVisible ? "flex" : "none",
          flexDirection: "column",
          alignItems: "flex-end",
          pointerEvents: isVisible ? "auto" : "none"
        }}
      >
        {/* Right-aligned Mobile Menu Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
          className="flex items-center justify-center w-11 h-11 rounded-full backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.85)] transition-all duration-200 active:scale-95 cursor-pointer relative z-50"
          style={{
            border: "1px solid rgba(255, 255, 255, 0.15)",
            backgroundColor: "rgba(12, 12, 12, 0.94)",
            color: "#ffffff"
          }}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Mobile Navigation Backdrop & Dropdown Menu */}
        <AnimatePresence>
          {mobileMenuOpen && isVisible && (
            <>
              {/* Click outside to close backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileMenuOpen(false)}
                className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs"
              />

              {/* Top-Right Dropdown Card */}
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="mt-3 w-52 py-3 px-2 rounded-2xl backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.95)] border border-white/10 flex flex-col gap-1 text-left relative overflow-hidden z-50"
                style={{
                  backgroundColor: "rgba(10, 10, 10, 0.96)",
                }}
              >
                {navItems.map((item) => {
                  const isActive = activeSection === item.id;
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        handleNavClick(item.id);
                        setMobileMenuOpen(false);
                      }}
                      className="flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 select-none cursor-pointer"
                      style={{
                        backgroundColor: isActive ? "rgba(0, 230, 167, 0.12)" : "transparent",
                        color: isActive ? "#00E6A7" : "rgba(255, 255, 255, 0.8)",
                      }}
                    >
                      <span className="flex items-center gap-3">
                        <Icon size={15} />
                        {item.label}
                      </span>
                      {isActive && <div className="w-1.5 h-1.5 rounded-full bg-[#00E6A7]" />}
                    </button>
                  );
                })}

                <div className="my-1 border-t border-white/10" />

                <a
                  href="/tracker/FINPAY-WITH-TRACKER-1/index.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-semibold text-white/90 hover:bg-white/5 transition-colors select-none"
                >
                  <span className="flex items-center gap-3">
                    <User size={15} />
                    Tracker
                  </span>
                </a>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
