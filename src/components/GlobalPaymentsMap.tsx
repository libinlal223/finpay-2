import { motion } from "framer-motion";
import WorldMap from "./ui/world-map";

export default function GlobalPaymentsMap() {
  return (
    <section className="relative w-full bg-black text-white py-24 px-6 md:px-10 lg:px-16 xl:px-24 overflow-hidden">

      {/* Subtle background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full blur-[140px] pointer-events-none z-0"
        style={{ backgroundColor: 'rgba(0, 230, 167, 0.03)' }}
      />

      <div className="mx-auto max-w-[1320px] w-full relative z-10">

        {/* Header Block */}
        <div className="mb-16 text-center">
          <span
            className="font-mono text-[0.75rem] md:text-[0.8rem] font-bold uppercase tracking-[0.3em] block mb-3"
            style={{ color: 'rgba(0, 230, 167, 0.75)' }}
          >
            GLOBAL REACH
          </span>

          <h2 className="font-['Outfit'] font-extrabold text-[clamp(2.2rem,4vw,3.2rem)] text-white leading-tight tracking-wide">
            Global{" "}
            <span style={{ color: '#00E6A7' }}>
              {"Payments".split("").map((letter, index) => (
                <motion.span
                  key={index}
                  className="inline-block"
                  initial={{ y: 8, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.2 + index * 0.04,
                    ease: "easeOut",
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </span>{" "}
            Without Borders
          </h2>

          <motion.p
            className="mx-auto mt-6 max-w-2xl font-['Sora'] text-[0.88rem] leading-relaxed"
            style={{ color: 'rgba(161, 161, 170, 1)' }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            Connect businesses across continents with secure, fast, and reliable multi-currency
            payment infrastructure. FINPAY enables seamless settlements worldwide with
            enterprise-grade speed, trust, and liquidity.
          </motion.p>
        </div>

        {/* World Map */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <WorldMap
            lineColor="#00E6A7"
            dots={[
              // India → UAE
              { start: { lat: 20.5937, lng: 78.9629 }, end: { lat: 25.2048, lng: 55.2708 } },
              // India → Malaysia
              { start: { lat: 20.5937, lng: 78.9629 }, end: { lat: 3.1390, lng: 101.6869 } },
              // India → China
              { start: { lat: 20.5937, lng: 78.9629 }, end: { lat: 39.9042, lng: 116.4074 } },
              // India → Bangladesh
              { start: { lat: 20.5937, lng: 78.9629 }, end: { lat: 23.8103, lng: 90.4125 } },
              // India → Japan
              { start: { lat: 20.5937, lng: 78.9629 }, end: { lat: 35.6762, lng: 139.6503 } },
              // India → Nepal
              { start: { lat: 20.5937, lng: 78.9629 }, end: { lat: 27.7172, lng: 85.3240 } },
              // India → Indonesia
              { start: { lat: 20.5937, lng: 78.9629 }, end: { lat: -6.2088, lng: 106.8456 } },
              // UAE → India
              { start: { lat: 25.2048, lng: 55.2708 }, end: { lat: 20.5937, lng: 78.9629 } },
              // UK → India
              { start: { lat: 51.5072, lng: -0.1276 }, end: { lat: 20.5937, lng: 78.9629 } },
              // USA → India
              { start: { lat: 40.7128, lng: -74.0060 }, end: { lat: 20.5937, lng: 78.9629 } },
            ]}
          />
        </motion.div>

      </div>
    </section>
  );
}
