import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Shield, Bug, Lock, Code, Server, Zap, Target, Wifi, Database } from 'lucide-react';

const skills = [
  { name: 'Web Development', icon: Code, level: 90 },
  { name: 'Penetration Testing', icon: Bug, level: 95 },
  { name: 'Bug Bounty Hunting', icon: Target, level: 93 },
  { name: 'Network Security', icon: Server, level: 90 },
  { name: 'Web App Security', icon: Shield, level: 92 },
  { name: 'Wireless Attacks', icon: Wifi, level: 85 },
  { name: 'Database & Backend', icon: Database, level: 88 },
];

const certifications = [
  'CEH', 'OSCP', 'CISSP', 'CompTIA Security+', 'GPEN', 'eWPT'
];

const tools = [
  'Burp Suite', 'Metasploit', 'Nmap', 'Wireshark', 'Hashcat',
  'John the Ripper', 'SQLMap', 'Nuclei', 'Gobuster', 'Frida',
];

const platforms = [
  { name: 'HackerOne', rank: 'Top 5%' },
  { name: 'Bugcrowd', rank: 'P1 Hunter' },
  { name: 'Synack', rank: 'Red Team' },
];

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="code-tag">&lt;about&gt;</span>
          <h2 className="section-title text-gradient mt-4">Who I Am</h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* About Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="card-cyber p-8">
              <div className="font-mono text-sm text-primary mb-4">
                // whoami
              </div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">
                Developer, Pentester & Bug Bounty Hunter
              </h3>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
             <p>
  I live in the terminal. I'm a <span className="text-primary font-semibold">developer</span> who builds modern web applications 
  and a passionate explorer of <span className="text-primary font-semibold">offensive security</span>. I enjoy understanding 
  how systems work — and how they break — so they can be built stronger. From full-stack apps to network pentesting, 
  every project is an opportunity to learn.
</p>

<p>
  As a growing <span className="text-secondary font-semibold">bug bounty hunter</span>, 
  I actively hunt for vulnerabilities, responsibly report them, and learn from every finding. 
  Each bug uncovered is a step forward in making the internet a little safer.
</p>

<p>
  I’m also the founder of <span className="text-secondary font-semibold">Profinder</span>, 
  a platform in progress aimed at connecting businesses with verified security professionals. 
  The goal is simple: <span className="text-primary">make security accessible to everyone</span>.
</p>

<p className="italic opacity-80">
  “The more I learn, the more I realize how much I don’t know.” — Albert Einstein
</p>

              </div>

              {/* Certifications */}
              <div className="mt-8">
                <div className="font-mono text-sm text-primary mb-3">
                  // certifications[]
                </div>
                <div className="flex flex-wrap gap-2">
                  {certifications.map((cert) => (
                    <span
                      key={cert}
                      className="px-3 py-1 text-sm font-mono bg-primary/10 border border-primary/30 rounded text-primary"
                    >
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bug Bounty Platforms */}
            <div className="card-cyber p-6">
              <div className="font-mono text-sm text-primary mb-4">
                // bug_bounty_platforms[]
              </div>
              <div className="grid grid-cols-3 gap-3">
                {platforms.map((platform, index) => (
                  <motion.div
                    key={platform.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                    className="text-center p-3 rounded-lg bg-muted/50 border border-primary/10"
                  >
                    <div className="font-mono text-xs text-muted-foreground mb-1">{platform.name}</div>
                    <div className="font-mono text-sm font-bold text-secondary">{platform.rank}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Toolkit */}
            <div className="card-cyber p-6">
              <div className="font-mono text-sm text-primary mb-4">
                // toolkit.list()
              </div>
              <div className="flex flex-wrap gap-2">
                {tools.map((tool, index) => (
                  <motion.span
                    key={tool}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: 1 + index * 0.05 }}
                    className="px-2 py-1 text-xs font-mono bg-accent/10 border border-accent/20 rounded text-accent"
                  >
                    {tool}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="card-cyber p-8">
              <div className="font-mono text-sm text-primary mb-6">
                // skills.matrix
              </div>
              <div className="space-y-6">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <skill.icon className="w-5 h-5 text-primary" />
                        <span className="font-mono text-sm text-foreground">
                          {skill.name}
                        </span>
                      </div>
                      <span className="font-mono text-sm text-primary">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : {}}
                        transition={{ duration: 1, delay: 0.6 + index * 0.1 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Terminal-style kill chain */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="card-cyber p-6 mt-6"
            >
              <div className="font-mono text-sm text-primary mb-4">
                // attack_methodology.sh
              </div>
              <div className="font-mono text-xs space-y-2">
                {[
                  { step: '01', label: 'Reconnaissance', desc: 'OSINT & target mapping' },
                  { step: '02', label: 'Scanning', desc: 'Port & vulnerability scanning' },
                  { step: '03', label: 'Exploitation', desc: 'Gaining initial access' },
                  { step: '04', label: 'Post-Exploitation', desc: 'Privilege escalation & pivoting' },
                  { step: '05', label: 'Reporting', desc: 'Documentation & remediation' },
                ].map((item, index) => (
                  <motion.div
                    key={item.step}
                    initial={{ opacity: 0, x: -15 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.3, delay: 1.4 + index * 0.1 }}
                    className="flex items-center gap-3 p-2 rounded bg-muted/30 hover:bg-primary/5 transition-colors group"
                  >
                    <span className="text-primary font-bold w-6">[{item.step}]</span>
                    <span className="text-foreground font-semibold">{item.label}</span>
                    <span className="text-muted-foreground hidden sm:inline">→ {item.desc}</span>
                    <span className="ml-auto text-secondary opacity-0 group-hover:opacity-100 transition-opacity">✓</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Closing Tag */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center mt-16"
        >
          <span className="code-tag">&lt;/about&gt;</span>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
