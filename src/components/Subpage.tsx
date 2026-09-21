import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Shield, 
  FileText, 
  Lock, 
  Code, 
  Headphones, 
  ArrowLeft, 
  CheckCircle2, 
  ExternalLink,
  ChevronRight,
  Mail
} from "lucide-react";

interface SubpageProps {
  route: string;
}

type TabType = "terms" | "privacy" | "security" | "docs" | "support";

export default function Subpage({ route }: SubpageProps) {
  const routeToTab = (r: string): TabType => {
    switch (r) {
      case "#privacy":
        return "privacy";
      case "#security":
        return "security";
      case "#docs":
        return "docs";
      case "#support":
        return "support";
      case "#terms":
      default:
        return "terms";
    }
  };

  const [activeTab, setActiveTab] = useState<TabType>(routeToTab(route));

  useEffect(() => {
    setActiveTab(routeToTab(route));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [route]);

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    window.location.hash = `#${tab}`;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const tabs = [
    { id: "terms" as TabType, label: "Terms of Service", icon: FileText },
    { id: "privacy" as TabType, label: "Privacy Policy", icon: Lock },
    { id: "security" as TabType, label: "Security & Risk", icon: Shield },
    { id: "docs" as TabType, label: "API & Integration", icon: Code },
    { id: "support" as TabType, label: "Support & SLA", icon: Headphones },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-300 font-sans selection:bg-[#00E6A7]/30 selection:text-[#00E6A7]">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#050505]/85 border-b border-white/[0.08]">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 transition-opacity hover:opacity-85">
            <img 
              src="/logo.png" 
              alt="FINPAY Logo" 
              className="h-10 w-auto object-contain"
            />
            <span className="hidden sm:inline-block font-['Outfit'] font-bold text-white text-lg tracking-wider">
              FINPAY <span className="text-[#00E6A7] text-xs font-mono ml-1 px-2 py-0.5 rounded bg-[#00E6A7]/10 border border-[#00E6A7]/20">LEGAL &amp; DOCS</span>
            </span>
          </a>

          <a 
            href="#" 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold font-['Outfit'] tracking-wide text-white bg-white/[0.06] border border-white/[0.12] hover:bg-[#00E6A7]/10 hover:border-[#00E6A7]/40 hover:text-[#00E6A7] transition-all duration-200 shadow-sm"
          >
            <ArrowLeft size={14} />
            <span>Return to FinPay Platform</span>
          </a>
        </div>

        {/* Tab Selection Navigation */}
        <div className="max-w-6xl mx-auto px-6 overflow-x-auto no-scrollbar border-t border-white/[0.04]">
          <nav className="flex space-x-2 py-2.5 min-w-max">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold font-['Outfit'] tracking-wide transition-all cursor-pointer select-none ${
                    isActive
                      ? "bg-[#00E6A7]/15 text-[#00E6A7] border border-[#00E6A7]/30 shadow-[0_0_15px_rgba(0,230,167,0.15)]"
                      : "text-zinc-400 hover:text-white hover:bg-white/[0.04] border border-transparent"
                  }`}
                >
                  <Icon size={14} className={isActive ? "text-[#00E6A7]" : "text-zinc-500"} />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Main Legal Content Container */}
      <main className="max-w-4xl mx-auto px-6 py-12 md:py-16">
        <AnimatePresence mode="wait">
          {activeTab === "terms" && <TermsSection key="terms" />}
          {activeTab === "privacy" && <PrivacySection key="privacy" />}
          {activeTab === "security" && <SecuritySection key="security" />}
          {activeTab === "docs" && <DocsSection key="docs" />}
          {activeTab === "support" && <SupportSection key="support" />}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/[0.08] bg-black py-10 px-6 text-center text-xs font-['Sora'] text-zinc-500">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 FINPAY Global (finpayzo.com). All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="mailto:support@finpayzo.com" className="hover:text-white transition-colors flex items-center gap-1.5">
              <Mail size={12} /> support@finpayzo.com
            </a>
            <a href="#" className="hover:text-white transition-colors">Platform Home</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. TERMS OF SERVICE
// ─────────────────────────────────────────────────────────────────────────────
function TermsSection() {
  return (
    <motion.article
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="space-y-10"
    >
      <div className="border-b border-white/[0.08] pb-6">
        <span className="text-[11px] font-mono tracking-widest uppercase text-[#00E6A7] font-semibold">Institutional Agreement</span>
        <h1 className="text-3xl md:text-4xl font-extrabold font-['Outfit'] text-white mt-1 mb-2">Terms of Service</h1>
        <p className="text-sm text-zinc-400 font-['Sora']">Last updated: September 2026 • Effective immediately for all registered partners and clients.</p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-bold font-['Outfit'] text-white flex items-center gap-2.5">
          <span className="w-6 h-6 rounded-full bg-[#00E6A7]/10 text-[#00E6A7] text-xs flex items-center justify-center font-mono font-bold">1</span>
          Acceptance of Terms
        </h2>
        <p className="leading-relaxed text-sm text-zinc-300">
          By accessing or utilizing the FinPay digital settlement infrastructure, portal, APIs, and currency exchange rails provided at <strong className="text-white">finpayzo.com</strong>, you agree to comply with and be bound by these Terms of Service. If you represent an enterprise or institutional merchant, you confirm that you possess the full legal authority to bind that entity.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold font-['Outfit'] text-white flex items-center gap-2.5">
          <span className="w-6 h-6 rounded-full bg-[#00E6A7]/10 text-[#00E6A7] text-xs flex items-center justify-center font-mono font-bold">2</span>
          Settlement Services &amp; Digital Asset Protocol
        </h2>
        <p className="leading-relaxed text-sm text-zinc-300">
          FinPay provides next-generation multi-currency settlement rails, digital liquidity solutions, stablecoin settlement services (including USDT and USDC), and cross-border payment gateway integrations. Users acknowledge that digital asset transactions on public distributed ledger networks are subject to operational network validation delays and market liquidity dynamics.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold font-['Outfit'] text-white flex items-center gap-2.5">
          <span className="w-6 h-6 rounded-full bg-[#00E6A7]/10 text-[#00E6A7] text-xs flex items-center justify-center font-mono font-bold">3</span>
          KYC, KYB &amp; Anti-Money Laundering (AML) Compliance
        </h2>
        <p className="leading-relaxed text-sm text-zinc-300">
          In strict adherence to international financial regulatory frameworks, FATF recommendations, and local jurisdiction mandates, FinPay enforces stringent Know-Your-Customer (KYC) and Know-Your-Business (KYB) verifications. All corporate accounts must pass identity verification, ultimate beneficial owner (UBO) screening, and sanctions list cross-referencing prior to settlement execution.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold font-['Outfit'] text-white flex items-center gap-2.5">
          <span className="w-6 h-6 rounded-full bg-[#00E6A7]/10 text-[#00E6A7] text-xs flex items-center justify-center font-mono font-bold">4</span>
          Transaction Finality &amp; Irreversibility
        </h2>
        <p className="leading-relaxed text-sm text-zinc-300">
          Digital asset transfers, on-chain crypto settlements, and confirmed wire transmissions executed through authorized API keys or merchant credentials are inherently final and irreversible. Clients bear sole responsibility for verifying counterparty wallet addresses, network tags, and beneficiary bank routing information before confirmation.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold font-['Outfit'] text-white flex items-center gap-2.5">
          <span className="w-6 h-6 rounded-full bg-[#00E6A7]/10 text-[#00E6A7] text-xs flex items-center justify-center font-mono font-bold">5</span>
          Limitation of Liability
        </h2>
        <p className="leading-relaxed text-sm text-zinc-300">
          To the maximum extent permitted by applicable law, FinPay and its affiliates shall not be liable for any indirect, incidental, punitive, or consequential damages arising from market rate fluctuations, network forks, third-party custody disruptions, or force majeure events.
        </p>
      </section>
    </motion.article>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. PRIVACY POLICY
// ─────────────────────────────────────────────────────────────────────────────
function PrivacySection() {
  return (
    <motion.article
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="space-y-10"
    >
      <div className="border-b border-white/[0.08] pb-6">
        <span className="text-[11px] font-mono tracking-widest uppercase text-[#00E6A7] font-semibold">Data Governance</span>
        <h1 className="text-3xl md:text-4xl font-extrabold font-['Outfit'] text-white mt-1 mb-2">Privacy Policy</h1>
        <p className="text-sm text-zinc-400 font-['Sora']">Last updated: September 2026 • FinPay Global Data Protection Framework.</p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-bold font-['Outfit'] text-white flex items-center gap-2.5">
          <span className="w-6 h-6 rounded-full bg-[#00E6A7]/10 text-[#00E6A7] text-xs flex items-center justify-center font-mono font-bold">1</span>
          Information We Collect
        </h2>
        <p className="leading-relaxed text-sm text-zinc-300">
          To facilitate secure global payment settlements, we collect business operational data, including corporate registration certificates, proof of address, director identification, transaction volume metrics, settlement wallet addresses, IP addresses, and operational telemetry.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold font-['Outfit'] text-white flex items-center gap-2.5">
          <span className="w-6 h-6 rounded-full bg-[#00E6A7]/10 text-[#00E6A7] text-xs flex items-center justify-center font-mono font-bold">2</span>
          How Your Data Is Utilized
        </h2>
        <ul className="space-y-2.5 text-sm text-zinc-300">
          <li className="flex items-start gap-2">
            <CheckCircle2 size={16} className="text-[#00E6A7] shrink-0 mt-0.5" />
            <span>Processing and settling institutional fiat and digital currency transactions.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 size={16} className="text-[#00E6A7] shrink-0 mt-0.5" />
            <span>Fulfilling mandatory international anti-money laundering (AML) and counter-terrorist financing (CTF) screening.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 size={16} className="text-[#00E6A7] shrink-0 mt-0.5" />
            <span>Preventing fraud, unauthorized API access, and safeguarding platform stability.</span>
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold font-['Outfit'] text-white flex items-center gap-2.5">
          <span className="w-6 h-6 rounded-full bg-[#00E6A7]/10 text-[#00E6A7] text-xs flex items-center justify-center font-mono font-bold">3</span>
          Security &amp; Encryption Standards
        </h2>
        <p className="leading-relaxed text-sm text-zinc-300">
          All client information and payload communications are encrypted using AES-256 standards at rest and TLS 1.3 in transit. Sensitive access keys and signature credentials are maintained within dedicated hardware security modules (HSM) with strict zero-knowledge isolation.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold font-['Outfit'] text-white flex items-center gap-2.5">
          <span className="w-6 h-6 rounded-full bg-[#00E6A7]/10 text-[#00E6A7] text-xs flex items-center justify-center font-mono font-bold">4</span>
          Data Subject Rights &amp; Inquiries
        </h2>
        <p className="leading-relaxed text-sm text-zinc-300">
          In accordance with global privacy benchmarks (including GDPR principles), you have the right to request access to, rectification of, or deletion of your personal records, subject to statutory retention obligations mandated by financial regulators. For privacy requests, contact <strong className="text-white">support@finpayzo.com</strong>.
        </p>
      </section>
    </motion.article>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. SECURITY & RISK
// ─────────────────────────────────────────────────────────────────────────────
function SecuritySection() {
  return (
    <motion.article
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="space-y-10"
    >
      <div className="border-b border-white/[0.08] pb-6">
        <span className="text-[11px] font-mono tracking-widest uppercase text-[#00E6A7] font-semibold">Institutional Infrastructure</span>
        <h1 className="text-3xl md:text-4xl font-extrabold font-['Outfit'] text-white mt-1 mb-2">Security &amp; Risk Architecture</h1>
        <p className="text-sm text-zinc-400 font-['Sora']">Zero-trust architecture, multi-sig treasury governance, and real-time on-chain surveillance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
          <div className="w-10 h-10 rounded-xl bg-[#00E6A7]/10 border border-[#00E6A7]/20 flex items-center justify-center text-[#00E6A7] mb-3">
            <Lock size={18} />
          </div>
          <h3 className="font-['Outfit'] font-bold text-white text-base mb-1">Multi-Party Computation (MPC)</h3>
          <p className="text-xs text-zinc-400 leading-relaxed font-['Sora']">
            No single point of failure. Private key shards are distributed across geographically redundant HSM nodes requiring multi-quorum sign-off.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
          <div className="w-10 h-10 rounded-xl bg-[#00E6A7]/10 border border-[#00E6A7]/20 flex items-center justify-center text-[#00E6A7] mb-3">
            <Shield size={18} />
          </div>
          <h3 className="font-['Outfit'] font-bold text-white text-base mb-1">Automated Sanctions Screening</h3>
          <p className="text-xs text-zinc-400 leading-relaxed font-['Sora']">
            Every transaction is evaluated in real time against global OFAC, EU, and UN sanctions lists, blocking tainted addresses instantly.
          </p>
        </div>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-bold font-['Outfit'] text-white">Continuous Penetration Testing &amp; Auditing</h2>
        <p className="leading-relaxed text-sm text-zinc-300">
          Our core infrastructure undergoes routine vulnerability assessments, smart contract audits, and independent SOC2 / ISO-27001 posture validation to ensure bulletproof resilience for high-value settlement flows.
        </p>
      </section>
    </motion.article>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. API & INTEGRATION DOCS
// ─────────────────────────────────────────────────────────────────────────────
function DocsSection() {
  return (
    <motion.article
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="space-y-10"
    >
      <div className="border-b border-white/[0.08] pb-6">
        <span className="text-[11px] font-mono tracking-widest uppercase text-[#00E6A7] font-semibold">Developer Hub</span>
        <h1 className="text-3xl md:text-4xl font-extrabold font-['Outfit'] text-white mt-1 mb-2">API &amp; Integration</h1>
        <p className="text-sm text-zinc-400 font-['Sora']">Enterprise REST APIs and Webhook orchestration for instant digital settlement.</p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-bold font-['Outfit'] text-white">Integration Overview</h2>
        <p className="leading-relaxed text-sm text-zinc-300">
          FinPay exposes high-availability RESTful endpoints allowing enterprises to generate dynamic settlement deposit addresses, query real-time FX liquidity pricing, execute automated batch payouts, and reconcile payment states via HMAC-signed webhooks.
        </p>
      </section>

      <div className="p-5 rounded-2xl bg-[#09090b] border border-white/[0.1] font-mono text-xs text-zinc-300 overflow-x-auto">
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-2 mb-3 text-zinc-500">
          <span>POST /v1/settlements/create</span>
          <span className="text-[#00E6A7]">TLS 1.3 Encrypted</span>
        </div>
        <pre className="text-zinc-400">
{`{
  "merchant_id": "mer_live_89104",
  "currency": "USDT",
  "network": "TRON_TRC20",
  "target_amount": 50000.00,
  "settlement_currency": "USD",
  "webhook_url": "https://api.yourdomain.com/callbacks/finpay"
}`}
        </pre>
      </div>

      <div className="p-6 rounded-2xl bg-[#00E6A7]/[0.04] border border-[#00E6A7]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h4 className="font-['Outfit'] font-bold text-white text-base">Request Developer Sandbox Access</h4>
          <p className="text-xs text-zinc-400 mt-1 font-['Sora']">Access staging keys, interactive Postman collections, and dedicated engineering onboarding.</p>
        </div>
        <a 
          href="https://wa.me/639707725004" 
          target="_blank" 
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold font-['Outfit'] bg-[#00E6A7] text-black hover:bg-[#00c68f] transition-all shrink-0"
        >
          <span>Contact Tech Onboarding</span>
          <ExternalLink size={14} />
        </a>
      </div>
    </motion.article>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. SUPPORT & SLA
// ─────────────────────────────────────────────────────────────────────────────
function SupportSection() {
  return (
    <motion.article
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="space-y-10"
    >
      <div className="border-b border-white/[0.08] pb-6">
        <span className="text-[11px] font-mono tracking-widest uppercase text-[#00E6A7] font-semibold">24/7 Rapid Response</span>
        <h1 className="text-3xl md:text-4xl font-extrabold font-['Outfit'] text-white mt-1 mb-2">Support &amp; Enterprise SLA</h1>
        <p className="text-sm text-zinc-400 font-['Sora']">Dedicated operational assistance across global trading and banking sessions.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <a 
          href="https://wa.me/639707725004"
          target="_blank"
          rel="noreferrer"
          className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-[#00E6A7]/40 hover:bg-[#00E6A7]/[0.03] transition-all group"
        >
          <span className="text-xs font-mono uppercase text-[#00A380] font-bold">Instant Dispatch</span>
          <h3 className="font-['Outfit'] font-bold text-white text-lg mt-1 mb-2 group-hover:text-[#00E6A7] transition-colors flex items-center gap-1.5">
            WhatsApp Direct Desk <ChevronRight size={16} className="text-[#00E6A7] group-hover:translate-x-1 transition-transform" />
          </h3>
          <p className="text-xs text-zinc-400 font-['Sora'] leading-relaxed">
            Real-time chat with designated treasury managers for transaction clearance and liquidity quotes.
          </p>
        </a>

        <a 
          href="https://telegram.me/+uxOjP6RkG6I5M2Fl"
          target="_blank"
          rel="noreferrer"
          className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-[#24A1DE]/40 hover:bg-[#24A1DE]/[0.03] transition-all group"
        >
          <span className="text-xs font-mono uppercase text-[#24A1DE] font-bold">Official Broadcast</span>
          <h3 className="font-['Outfit'] font-bold text-white text-lg mt-1 mb-2 group-hover:text-[#24A1DE] transition-colors flex items-center gap-1.5">
            Telegram Channel <ChevronRight size={16} className="text-[#24A1DE] group-hover:translate-x-1 transition-transform" />
          </h3>
          <p className="text-xs text-zinc-400 font-['Sora'] leading-relaxed">
            Network status alerts, banking clearance maintenance windows, and platform release advisories.
          </p>
        </a>
      </div>

      <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-4">
        <h3 className="font-['Outfit'] font-bold text-white text-lg">SLA Guarantees</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="p-4 rounded-xl bg-black/40 border border-white/[0.05]">
            <p className="text-2xl font-black font-['Outfit'] text-[#00E6A7]">99.98%</p>
            <p className="text-xs text-zinc-400 mt-1 font-['Sora']">Infrastructure Uptime</p>
          </div>
          <div className="p-4 rounded-xl bg-black/40 border border-white/[0.05]">
            <p className="text-2xl font-black font-['Outfit'] text-white">&lt; 15 mins</p>
            <p className="text-xs text-zinc-400 mt-1 font-['Sora']">Priority Ticket Response</p>
          </div>
          <div className="p-4 rounded-xl bg-black/40 border border-white/[0.05]">
            <p className="text-2xl font-black font-['Outfit'] text-white">24/7/365</p>
            <p className="text-xs text-zinc-400 mt-1 font-['Sora']">Live Operations Desk</p>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
