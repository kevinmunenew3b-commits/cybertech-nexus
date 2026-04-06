import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import profileAvatar from '@/assets/profile-avatar.jpg';

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Initializing system...');

  const statusMessages = [
    'Initializing system...',
    'Loading kernel modules...',
    'Establishing secure connection...',
    'Decrypting payload...',
    'Mounting file systems...',
    'Scanning network interfaces...',
    'Injecting dependencies...',
    'Compiling exploit chain...',
    'Bypassing firewall...',
    'Access granted.',
  ];

  useEffect(() => {
    const duration = 5000;
    const interval = 50;
    const step = 100 / (duration / interval);
    let current = 0;

    const timer = setInterval(() => {
      current += step;
      if (current >= 100) {
        current = 100;
        clearInterval(timer);
        setTimeout(onComplete, 400);
      }
      setProgress(current);
      const msgIndex = Math.min(
        Math.floor((current / 100) * statusMessages.length),
        statusMessages.length - 1
      );
      setStatusText(statusMessages[msgIndex]);
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Subtle grid */}
      <div className="absolute inset-0 cyber-grid opacity-20" />

      {/* Scanlines */}
      <div className="scanline" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-8 px-6">
        {/* Profile Picture with glow ring */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative"
        >
          <div className="w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden border-2 border-primary/40 animate-pulse-glow">
            <img
              src={profileAvatar}
              alt="Kevin Munene"
              width={144}
              height={144}
              className="w-full h-full object-cover"
              style={{ filter: 'grayscale(0.6) brightness(0.9) contrast(1.1)' }}
            />
          </div>
          {/* Outer glow ring */}
          <div className="absolute -inset-2 rounded-full border border-primary/15 animate-ping opacity-20" />
          <div className="absolute -inset-1 rounded-full border border-primary/10" />
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <h1 className="font-mono text-2xl md:text-4xl font-bold text-primary glow-text tracking-widest uppercase">
            Kevin Munene
          </h1>
          <p className="font-mono text-xs md:text-sm text-muted-foreground mt-3 tracking-wider">
            [ SYSTEM BOOT SEQUENCE ]
          </p>
        </motion.div>

        {/* Progress bar */}
        <div className="w-72 md:w-96">
          <div className="h-0.5 w-full bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(90deg, hsl(160 100% 50%), hsl(190 100% 50%))',
                boxShadow: '0 0 10px hsl(160 100% 50% / 0.5)',
              }}
              transition={{ duration: 0.05 }}
            />
          </div>
          <div className="flex justify-between mt-3 font-mono text-xs text-primary/60">
            <span>{statusText}</span>
            <span className="text-primary">{Math.floor(progress)}%</span>
          </div>
        </div>

        {/* Terminal lines */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="font-mono text-[10px] md:text-xs text-muted-foreground/50 space-y-1.5 max-w-md"
        >
          {progress > 10 && <p className="text-muted-foreground/40">&gt; ssh root@192.168.1.1 -p 443</p>}
          {progress > 25 && <p className="text-muted-foreground/40">&gt; sudo nmap -sS -O target_host</p>}
          {progress > 45 && <p className="text-muted-foreground/40">&gt; cat /etc/shadow | hashcat -m 1800</p>}
          {progress > 65 && <p className="text-muted-foreground/40">&gt; msfconsole -q -x "use exploit/multi"</p>}
          {progress > 85 && (
            <p className="text-primary glow-text">&gt; Connection established. Welcome back.</p>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
