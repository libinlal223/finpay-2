import { useRef } from "react";
import { motion } from "framer-motion";
import DottedMap from "dotted-map";

interface MapProps {
  dots?: Array<{
    start: { lat: number; lng: number; label?: string };
    end: { lat: number; lng: number; label?: string };
  }>;
  lineColor?: string;
}

const projectPoint = (lat: number, lng: number) => {
  const x = (lng + 180) * (800 / 360);
  const y = (90 - lat) * (400 / 180);
  return { x, y };
};

const createCurvedPath = (
  start: { x: number; y: number },
  end: { x: number; y: number },
  curveHeight: number = -50
) => {
  const midX = (start.x + end.x) / 2;
  const midY = Math.min(start.y, end.y) + curveHeight;
  return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
};

// 6 major routes distributed matching the reference image layout
const globalRoutes = [
  // 1. Alaska/NW Canada → West Coast USA (California) [Low-medium arc]
  {
    start: { lat: 61.2181, lng: -149.9003 }, // Alaska
    end: { lat: 36.7783, lng: -119.4179 }, // California
    curveHeight: -25,
  },
  // 2. Alaska/NW Canada → East Coast South America (Brazil) [High transatlantic-ish arc]
  {
    start: { lat: 61.2181, lng: -149.9003 }, // Alaska
    end: { lat: -14.2350, lng: -51.9253 }, // Brazil
    curveHeight: -90,
  },
  // 3. Brazil → Western Europe (Portugal/Spain) [Medium-high Atlantic arc]
  {
    start: { lat: -14.2350, lng: -51.9253 }, // Brazil
    end: { lat: 39.3999, lng: -8.2245 }, // Portugal
    curveHeight: -60,
  },
  // 4. Western Europe → India/Central Asia [Medium-low Europe-Asia arc]
  {
    start: { lat: 51.1657, lng: 10.4515 }, // Germany
    end: { lat: 20.5937, lng: 78.9629 }, // India
    curveHeight: -45,
  },
  // 5. Central/East Africa (Kenya) → India/Central Asia [Low Indian Ocean arc]
  {
    start: { lat: -1.2921, lng: 36.8219 }, // Kenya
    end: { lat: 20.5937, lng: 78.9629 }, // India
    curveHeight: -30,
  },
  // 6. India/Central Asia → East Asia (Japan) [Medium East Asia arc]
  {
    start: { lat: 20.5937, lng: 78.9629 }, // India
    end: { lat: 35.6762, lng: 139.6503 }, // Japan
    curveHeight: -60,
  },
];

interface RouteProps {
  route: typeof globalRoutes[0];
  index: number;
  lineColor: string;
}

const PaymentRoute = ({ route, index, lineColor }: RouteProps) => {
  const startPoint = projectPoint(route.start.lat, route.start.lng);
  const endPoint = projectPoint(route.end.lat, route.end.lng);
  const pathD = createCurvedPath(startPoint, endPoint, route.curveHeight);

  const duration = 1.2;
  const startDelay = index * 0.35;
  const endDelay = startDelay + duration - 0.2;

  return (
    <g>
      {/* Route Path Line (draws once, stays permanently visible) */}
      <motion.path
        d={pathD}
        fill="none"
        stroke={lineColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0.8 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{
          duration,
          delay: startDelay,
          ease: "easeInOut",
        }}
      />

      {/* Start Node Indicator (scales up when path starts) */}
      <motion.circle
        cx={startPoint.x}
        cy={startPoint.y}
        r="3"
        fill={lineColor}
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
          delay: startDelay,
        }}
      />

      {/* End Node Indicator (scales up when path finishes drawing) */}
      <motion.circle
        cx={endPoint.x}
        cy={endPoint.y}
        r="3"
        fill={lineColor}
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
          delay: endDelay,
        }}
      />
    </g>
  );
};

const map = new DottedMap({ height: 100, grid: "diagonal" });

// Hardcoded dark theme (site is always dark)
const svgMap = map.getSVG({
  radius: 0.22,
  color: "#FFFFFF40",
  shape: "circle",
  backgroundColor: "black",
});

export default function WorldMap({
  dots: _dots = [],
  lineColor = "#0ea5e9",
}: MapProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  return (
    <div 
      className="w-full bg-black rounded-lg relative font-sans"
      style={{ width: '100%', aspectRatio: '2/1', position: 'relative', overflow: 'hidden' }}
    >
      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        className="pointer-events-none select-none"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        alt="world map"
        height="495"
        width="1056"
        draggable={false}
      />
      <svg
        ref={svgRef}
        viewBox="0 0 800 400"
        className="pointer-events-none select-none"
        style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: 10 }}
      >
        {/* ── Sequential Viewport-Triggered Payment Routes ── */}
        {globalRoutes.map((route, i) => (
          <PaymentRoute
            key={`route-${i}`}
            route={route}
            index={i}
            lineColor={lineColor}
          />
        ))}
      </svg>
    </div>
  );
}
