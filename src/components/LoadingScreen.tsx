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
      {/* Cyber grid background */}
      <div className="absolute inset-0 cyber-grid opacity-30" />

      {/* Scanlines */}
      <div className="scanline" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-6 px-6">
        {/* Profile Picture */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative"
        >
          <div className="w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden border-2 border-primary/50 animate-pulse-glow">
            <img
              src={profileAvatar}
              alt="Kevin Munene"
              width={144}
              height={144}
              className="w-full h-full object-cover grayscale"
            />
          </div>
          {/* Glow ring */}
          <div className="absolute inset-0 rounded-full border border-primary/20 animate-ping opacity-30" />
        </motion.div>

        {/* Logo / Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <h1 className="font-mono text-2xl md:text-4xl font-bold text-primary glow-text tracking-widest uppercase">
            Kevin Munene
          </h1>
          <p className="font-mono text-xs md:text-sm text-muted-foreground mt-2 tracking-wider">
            [ SYSTEM BOOT SEQUENCE ]
          </p>
        </motion.div>

        {/* Progress bar */}
        <div className="w-64 md:w-80">
          <div className="h-1 w-full bg-muted rounded-full overflow-hidden border border-primary/20">
            <motion.div
              className="h-full bg-primary"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.05 }}
            />
          </div>
          <div className="flex justify-between mt-2 font-mono text-xs text-primary/70">
            <span>{statusText}</span>
            <span>{Math.floor(progress)}%</span>
          </div>
        </div>

        {/* Terminal lines */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="font-mono text-[10px] md:text-xs text-muted-foreground/60 space-y-1 max-w-md"
        >
          {progress > 10 && <p>&gt; ssh root@192.168.1.1 -p 443</p>}
          {progress > 25 && <p>&gt; sudo nmap -sS -O target_host</p>}
          {progress > 45 && <p>&gt; cat /etc/shadow | hashcat -m 1800</p>}
          {progress > 65 && <p>&gt; msfconsole -q -x "use exploit/multi"</p>}
          {progress > 85 && (
            <p className="text-primary">&gt; Connection established. Welcome back.</p>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
