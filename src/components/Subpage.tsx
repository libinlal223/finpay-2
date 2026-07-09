import { motion } from "framer-motion";

interface SubpageProps {
  route: string;
}

export default function Subpage({ route }: SubpageProps) {
  return (
    <div className="min-h-screen bg-[#000000] flex flex-col items-center justify-center relative z-50">
      <motion.a 
        href="#"
        className="flex flex-col items-center gap-6 cursor-pointer group"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <img 
          src="/logofoot.png" 
          alt="FINPAY Logo" 
          className="object-contain transition-opacity duration-200 group-hover:opacity-85" 
          style={{ height: '80px', width: 'auto' }}
        />
        <span className="font-['Outfit'] font-semibold text-[13px] tracking-[0.2em] text-[#00E6A7] transition-colors duration-200 group-hover:text-[#00c68f] uppercase">
          Go Back Home
        </span>
      </motion.a>
    </div>
  );
}
