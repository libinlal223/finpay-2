import { useState, useEffect } from "react";
import { motion, useMotionValueEvent, MotionValue } from "framer-motion";

interface NavItem {
  id: string;
  label: string;
}

const navItems: NavItem[] = [
  { id: "home", label: "HOME" },
  { id: "about", label: "ABOUT" },
  { id: "services", label: "SERVICES" },
  { id: "solutions", label: "SOLUTIONS" },
  { id: "faq", label: "FAQ" }
];

interface NavbarProps {
  scrollYProgress: MotionValue<number>;
}

export default function Navbar({ scrollYProgress }: NavbarProps) {
  const [activeSection, setActiveSection] = useState("home");
  const [isVisible, setIsVisible] = useState(scrollYProgress.get() >= 0.90);

  // Sync visibility with Framer Motion scroll progress accurately
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setIsVisible(latest >= 0.90);
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      const windowHeight = window.innerHeight;

      // Select layout elements
      const homeEl = document.getElementById("home");
      const aboutEl = document.getElementById("about");
      const servicesEl = document.getElementById("services");
      const solutionsEl = document.getElementById("solutions");
      const faqEl = document.getElementById("faq");

      const sections = [
        { id: "home", el: homeEl },
        { id: "about", el: aboutEl },
        { id: "services", el: servicesEl },
        { id: "solutions", el: solutionsEl },
        { id: "faq", el: faqEl }
      ];

      let currentActive = "home";

      // 1500vh represents the 3D scroll animations spacer zone
      const isPastStorytelling = scrollPos > 1500 * (windowHeight / 100);

      if (isPastStorytelling) {
        for (const section of sections) {
          if (section.el) {
            const rect = section.el.getBoundingClientRect();
            // Section is active if it occupies the top-middle focal area of the viewport
            if (rect.top <= windowHeight * 0.4 && rect.bottom > windowHeight * 0.4) {
              currentActive = section.id;
              break;
            }
          }
        }
      } else {
        currentActive = "home";
      }

      setActiveSection(currentActive);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-center w-full max-w-fit px-4 pointer-events-none">
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: isVisible ? 0 : -80, opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex items-center h-[56px] px-6 backdrop-blur-xl rounded-full shadow-[0_16px_40px_rgba(0,0,0,0.65)] relative"
        style={{
          border: "1px solid rgba(255, 255, 255, 0.08)",
          backgroundColor: "rgba(10, 10, 10, 0.92)",
          pointerEvents: isVisible ? "auto" : "none"
        }}
      >
        {/* Left-aligned Logo */}
        <div className="flex items-center h-full pr-6 mr-4 border-r border-white/[0.08] select-none pointer-events-none">
          <img src="/logo.png" alt="Finpay Logo" style={{ width: '68px', height: 'auto', opacity: 0.95 }} />
        </div>

        {/* Navigation buttons with generous gaps */}
        <div className="flex items-center h-full gap-6 md:gap-10">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="relative h-full flex items-center px-1 font-['Outfit'] text-[0.8rem] md:text-[0.85rem] font-bold tracking-[0.08em] cursor-pointer transition-colors duration-300 outline-none select-none"
                style={{
                  color: isActive ? "#ffffff" : "rgba(255, 255, 255, 0.55)",
                  outline: "none"
                }}
              >
                {/* Text label with subtle glow when active */}
                <span
                  style={{
                    textShadow: isActive ? "0 0 10px rgba(0, 230, 167, 0.5)" : "none"
                  }}
                >
                  {item.label}
                </span>

                {/* Spotlight / Streetlight active indicator */}
                {isActive && (
                  <motion.div
                    layoutId="navbar-spotlight"
                    className="absolute inset-x-0 top-0 h-full pointer-events-none"
                    transition={{
                      type: "spring",
                      stiffness: 250,
                      damping: 30
                    }}
                  >
                    {/* Top slit bright light source */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-[#00E6A7] rounded-full shadow-[0_0_8px_rgba(0,230,167,0.85)] z-20" />

                    {/* Soft downward spotlight beam with 20px-30px blur */}
                    <div
                      className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-full pointer-events-none z-10"
                      style={{
                        background: "radial-gradient(circle at top, rgba(0, 230, 167, 0.35) 0%, rgba(0, 230, 167, 0.10) 45%, transparent 85%)",
                        filter: "blur(20px)"
                      }}
                    />
                  </motion.div>
                )}
              </button>
            );
          })}
        </div>
      </motion.nav>
    </div>
  );
}
