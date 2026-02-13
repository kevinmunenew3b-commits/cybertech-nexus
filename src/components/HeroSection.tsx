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

      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-background pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">

          {/* DESKTOP TERMINAL HEADER */}
          <motion.div className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-card/50 backdrop-blur-sm mb-8">
            <Terminal className="w-4 h-4 text-primary" />
            <span className="font-mono text-sm text-primary">
              root@kevinw3b:~# access.granted
            </span>
          </motion.div>

          {/* TITLE */}
          <motion.h1 className="text-4xl sm:text-5xl md:text-7xl font-bold font-mono mb-6">
            <GlitchText className="text-foreground">
              Ethical H-Pentester
            </GlitchText>
            <br />
            <span className="text-gradient">& Bug Bounty Hunter</span>
          </motion.h1>

          {/* MOBILE TERMINAL HEADER (appears below title) */}
          <motion.div className="md:hidden flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-card/50 backdrop-blur-sm mb-6">
            <Terminal className="w-4 h-4 text-primary" />
            <span className="font-mono text-sm text-primary">
              root@kevinw3b:~# access.granted
            </span>
          </motion.div>

          <HackerBadge />

          {/* HERO TYPING */}
          <div className="mb-8">
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
          <div className="mb-8 mx-auto max-w-lg">
            <div
              ref={terminalRef}
              className="bg-black/95 border border-primary/40 rounded-lg p-3 font-mono text-xs text-left h-64 overflow-y-auto shadow-[0_0_20px_#00ff9960]"
            >
              <div className="flex items-center gap-2 mb-2 border-b border-green-500/20 pb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                <span className="text-green-400 ml-2">
                  root@kali:~# kevinw3b-terminal
                </span>
              </div>

              <div className="space-y-2">
                {history.map((item, i) => (
                  <div key={i}>
                    <div>
                      <span className="text-green-400">
                        root@kevinw3b
                      </span>
                      <span className="text-white">:~$ </span>
                      <span className="text-white">{item.cmd}</span>
                    </div>

                    {item.output.map((line, j) => (
                      <div key={j} className="text-green-300 ml-4">
                        {line}
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              <div className="mt-2">
                <span className="text-green-400">root@kali</span>
                <span className="text-white">:~$ </span>
                <span className="text-white">{typedLine}</span>
                <span
                  className={`inline-block w-2 h-4 bg-green-400 ml-1 ${
                    showCursor ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </div>
            </div>
          </div>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
            Founder of <span className="text-secondary font-semibold">
              Profinder
            </span> | Penetration Tester | Bug Bounty Hunter
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#contact" className="btn-cyber-filled">Hire Me</a>
            <a href="#services" className="btn-cyber">View Services</a>
          </div>
        </div>

        <motion.button
          onClick={scrollToAbout}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-primary/60 hover:text-primary"
        >
          <ChevronDown size={32} />
        </motion.button>
      </div>
    </section>
  );
};

export default HeroSection;
