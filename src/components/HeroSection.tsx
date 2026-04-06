import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Terminal, ChevronDown } from 'lucide-react';
import GlitchText from './GlitchText';
import HackerBadge from './HackerBadge';

const terminalScript = [
  {
    cmd: 'nmap -sV --script vuln target.com',
    output: [
      '[+] Starting Nmap scan...',
      '[+] Open ports: 22, 80, 443',
      '[!] Potential vulnerability detected on port 80'
    ]
  },
  {
    cmd: 'sqlmap -u "http://target.com/id=1" --dbs',
    output: [
      '[+] Parameter id is vulnerable',
      '[+] Found databases: users_db, payments_db'
    ]
  },
  {
    cmd: 'gobuster dir -u http://target.com -w wordlist.txt',
    output: [
      '[+] /admin (Status: 200)',
      '[+] /login (Status: 200)',
      '[+] /backup (Status: 403)'
    ]
  },
  {
    cmd: 'nuclei -t cves/ -u https://target.com',
    output: [
      '[!] CVE-2023-12345 detected',
      '[+] Report saved to report.txt'
    ]
  }
];

const MAX_LINES_BEFORE_RESET = 3;

const HeroSection = () => {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [typedLine, setTypedLine] = useState('');
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [history, setHistory] = useState([]);
  const [cycleCount, setCycleCount] = useState(0);

  const terminalRef = useRef<HTMLDivElement>(null);
  const fullText = 'Securing Digital Frontiers';

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index));
        index++;
      } else clearInterval(timer);
    }, 80);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorTimer);
  }, []);

  useEffect(() => {
    const current = terminalScript[lineIndex];
    if (!current) return;

    const speed = Math.random() * 50 + 15;

    if (charIndex < current.cmd.length) {
      const timeout = setTimeout(() => {
        setTypedLine((prev) => prev + current.cmd[charIndex]);
        setCharIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }

    const finishTimeout = setTimeout(() => {
      setHistory((prev) => [...prev, current]);
      setTypedLine('');
      setCharIndex(0);
      setLineIndex((prev) => prev + 1);
      setCycleCount((prev) => prev + 1);
    }, 800);

    return () => clearTimeout(finishTimeout);
  }, [charIndex, lineIndex]);

  useEffect(() => {
    if (cycleCount >= MAX_LINES_BEFORE_RESET) {
      const resetTimeout = setTimeout(() => {
        setHistory([]);
        setLineIndex(0);
        setCycleCount(0);
      }, 3000);

      return () => clearTimeout(resetTimeout);
    }
  }, [cycleCount]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history, typedLine]);

  const scrollToAbout = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden cyber-grid pt-20 md:pt-0">
      {/* Radial glow behind hero */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">

          {/* DESKTOP TERMINAL HEADER */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-primary/20 bg-card/60 backdrop-blur-md mb-8"
          >
            <Terminal className="w-4 h-4 text-primary" />
            <span className="font-mono text-sm text-primary/80">
              root@kevinw3b:~# access.granted
            </span>
          </motion.div>

          {/* TITLE */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold font-mono mb-6"
          >
            <GlitchText className="text-foreground">
              Ethical H-Pentester
            </GlitchText>
            <br />
            <span className="text-gradient">& Bug Bounty Hunter</span>
          </motion.h1>

          {/* MOBILE TERMINAL HEADER */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="md:hidden flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-card/60 backdrop-blur-md mb-6"
          >
            <Terminal className="w-4 h-4 text-primary" />
            <span className="font-mono text-sm text-primary/80">
              root@kevinw3b:~# access.granted
            </span>
          </motion.div>

          <HackerBadge />

          {/* HERO TYPING */}
          <div className="mb-8 mt-6">
            <p className="font-mono text-lg sm:text-xl md:text-2xl text-muted-foreground">
              <span className="text-primary">&gt; </span>
              {displayText}
              <span
                className={`inline-block w-3 h-6 bg-primary ml-1 ${
                  showCursor ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </p>
          </div>

          {/* TERMINAL */}
          <div className="mb-10 mx-auto max-w-lg">
            <div className="rounded-xl overflow-hidden border border-primary/15 shadow-[0_0_30px_hsl(160_100%_50%/0.08)]">
              {/* Terminal title bar */}
              <div className="flex items-center gap-2 px-4 py-2.5 bg-card/80 border-b border-primary/10">
                <span className="w-2.5 h-2.5 rounded-full bg-destructive/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-primary/70" />
                <span className="text-muted-foreground/60 font-mono text-xs ml-2">
                  kevinw3b — bash
                </span>
              </div>

              {/* Terminal body */}
              <div
                ref={terminalRef}
                className="bg-background/80 backdrop-blur-sm p-4 font-mono text-xs text-left h-56 overflow-y-auto"
              >
                <div className="space-y-2">
                  {history.map((item, i) => (
                    <div key={i}>
                      <div>
                        <span className="text-primary">root@kevinw3b</span>
                        <span className="text-muted-foreground">:~$ </span>
                        <span className="text-foreground/80">{item.cmd}</span>
                      </div>
                      {item.output.map((line, j) => (
                        <div key={j} className="text-primary/70 ml-4">
                          {line}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>

                <div className="mt-2">
                  <span className="text-primary">root@kevinw3b</span>
                  <span className="text-muted-foreground">:~$ </span>
                  <span className="text-foreground/80">{typedLine}</span>
                  <span
                    className={`inline-block w-2 h-4 bg-primary ml-0.5 ${
                      showCursor ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                </div>
              </div>
            </div>
          </div>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
            Founder of <span className="text-secondary font-semibold">Profinder</span> | Penetration Tester | Bug Bounty Hunter
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#contact" className="btn-cyber-filled">Hire Me</a>
            <a href="#services" className="btn-cyber">View Services</a>
          </div>
        </div>

        <motion.button
          onClick={scrollToAbout}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-primary/40 hover:text-primary transition-colors"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown size={28} />
        </motion.button>
      </div>
    </section>
  );
};

export default HeroSection;
