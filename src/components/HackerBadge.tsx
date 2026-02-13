import { motion } from 'framer-motion';
import { Bug, Crosshair, Skull } from 'lucide-react';

const badges = [
  { icon: Bug, label: 'Bug Bounty Hunter', color: 'text-secondary' },
  { icon: Crosshair, label: 'Penetration Tester', color: 'text-primary' },
  { icon: Skull, label: 'Red Teamer', color: 'text-accent' },
];

const HackerBadge = () => {
  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {badges.map((badge, index) => (
        <motion.div
          key={badge.label}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 1.2 + index * 0.15 }}
          whileHover={{ scale: 1.1, y: -3 }}
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-card/60 backdrop-blur-sm font-mono text-xs uppercase tracking-wider"
        >
          <badge.icon className={`w-3.5 h-3.5 ${badge.color}`} />
          <span className="text-muted-foreground">{badge.label}</span>
        </motion.div>
      ))}
    </div>
  );
};

export default HackerBadge;
