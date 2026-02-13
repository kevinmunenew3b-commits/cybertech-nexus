import { motion } from 'framer-motion';
import { Shield, Heart, Github, Linkedin, Twitter, Instagram } from 'lucide-react';

const socialLinks = [
  { icon: Github, href: 'https://github.com/kevin2tec', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/in/KELVINMUNENE', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://x.com/cripplespider', label: 'Twitter' },
  { icon: Instagram, href: 'https://instagram.com/kevinw3b', label: 'Instagram' },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-primary/20 bg-background relative z-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <motion.a
            href="#home"
            className="flex items-center gap-2 group"
            whileHover={{ scale: 1.05 }}
          >
            <Shield className="w-6 h-6 text-primary" />
            <span className="font-mono font-bold text-lg text-gradient">
              &lt;SEC/&gt;
            </span>
          </motion.a>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-muted border border-primary/20 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 hover:glow-box transition-all"
                aria-label={social.label}
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-muted-foreground text-sm font-mono flex items-center gap-1">
            <span>&copy; {currentYear}</span>
            <span className="text-primary">|</span>
            <span>We dont break</span>
            <Heart className="w-4 h-4 text-destructive inline mx-1" />
            <span></span>
            <span className="text-primary ml-1">@kevinw3b</span>
          </p>

          {/* Secure Badge */}
          <div className="flex items-center gap-2 text-sm font-mono text-muted-foreground">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            <span>System Secure</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
