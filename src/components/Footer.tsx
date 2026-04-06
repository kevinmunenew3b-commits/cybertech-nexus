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
    <footer className="py-8 border-t border-primary/10 bg-background relative z-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <motion.a
            href="#home"
            className="flex items-center gap-2 group"
            whileHover={{ scale: 1.05 }}
          >
            <Shield className="w-5 h-5 text-primary" />
            <span className="font-mono font-bold text-sm text-gradient">
              &lt;SEC/&gt;
            </span>
          </motion.a>

          <div className="flex items-center gap-2">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-muted/50 border border-primary/10 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 hover:shadow-[0_0_12px_hsl(160_100%_50%/0.15)] transition-all"
                aria-label={social.label}
              >
                <social.icon className="w-3.5 h-3.5" />
              </a>
            ))}
          </div>

          <p className="text-muted-foreground text-xs font-mono flex items-center gap-1">
            <span>&copy; {currentYear}</span>
            <span className="text-primary/40">|</span>
            <span>We dont break</span>
            <Heart className="w-3 h-3 text-destructive/70 inline mx-0.5" />
            <span className="text-primary/60 ml-0.5">@kevinw3b</span>
          </p>

          <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground/60">
            <span className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-pulse" />
            <span>System Secure</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
