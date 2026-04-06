import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Shield } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { name: 'Home', href: '#home', isSection: true },
  { name: 'About', href: '#about', isSection: true },
  { name: 'Services', href: '#services', isSection: true },
  { name: 'Resume', href: '#resume', isSection: true },
  { name: 'Certificates', href: '#certificates', isSection: true },
  { name: 'Projects', href: '/projects', isSection: false },
  { name: 'Zero Day', href: '/zero-day', isSection: false },
  { name: 'Profinder', href: '#profinder', isSection: true },
  { name: 'Contact', href: '#contact', isSection: true },
];

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const handleNavClick = (link: typeof navLinks[0], e: React.MouseEvent) => {
    if (link.isSection) {
      e.preventDefault();
      if (location.pathname !== '/') {
        window.location.href = '/' + link.href;
      } else {
        scrollToSection(link.href);
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'bg-background/80 backdrop-blur-xl border-b border-primary/10 shadow-[0_2px_20px_hsl(160_100%_50%/0.05)]'
            : ''
        }`}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.a
              href="#home"
              className="flex items-center gap-2 group"
              whileHover={{ scale: 1.05 }}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#home');
              }}
            >
              <Shield className="w-7 h-7 text-primary group-hover:drop-shadow-[0_0_8px_hsl(160_100%_50%/0.6)] transition-all" />
              <span className="font-mono font-bold text-lg text-gradient">
                &lt;SEC/&gt;
              </span>
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                link.isSection ? (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(link, e)}
                    className="font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors duration-300 relative group py-1"
                    whileHover={{ y: -1 }}
                  >
                    {link.name}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full shadow-[0_0_4px_hsl(160_100%_50%/0.5)]" />
                  </motion.a>
                ) : (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors duration-300 relative group py-1"
                  >
                    <motion.span whileHover={{ y: -1 }} className="inline-block">
                      {link.name}
                    </motion.span>
                    <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full shadow-[0_0_4px_hsl(160_100%_50%/0.5)]" />
                  </Link>
                )
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-primary/70 hover:text-primary p-2 transition-colors"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 z-30 bg-background/98 backdrop-blur-2xl md:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-6">
              {navLinks.map((link, index) => (
                link.isSection ? (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(link, e)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.07 }}
                    className="font-mono text-xl uppercase tracking-widest text-foreground/80 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </motion.a>
                ) : (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.07 }}
                  >
                    <Link
                      to={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="font-mono text-xl uppercase tracking-widest text-foreground/80 hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                )
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
