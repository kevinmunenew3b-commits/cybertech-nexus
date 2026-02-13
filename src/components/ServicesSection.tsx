import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  Search, 
  Shield, 
  FileCode, 
  Cloud, 
  Bug, 
  AlertTriangle,
  Target,
  Smartphone
} from 'lucide-react';

const services = [
  {
    icon: Search,
    title: 'Penetration Testing',
    description: 'Full-scope pentesting simulating real-world attacks on your infrastructure, networks, and web applications.',
    features: ['Web & API Pentesting', 'Network Intrusion Testing', 'Social Engineering'],
  },
  {
    icon: Bug,
    title: 'Bug Bounty Consulting',
    description: 'Leverage my bug bounty experience to set up or improve your vulnerability disclosure program.',
    features: ['Program Setup & Triage', 'Scope Definition', 'Researcher Relations'],
  },
  {
    icon: Target,
    title: 'Red Team Operations',
    description: 'Advanced adversary simulation to test your organization\'s detection and response capabilities.',
    features: ['APT Simulation', 'Physical Security Tests', 'C2 Infrastructure'],
  },
  {
    icon: FileCode,
    title: 'Secure Code Review',
    description: 'Manual and automated source code analysis to find security flaws before attackers do.',
    features: ['SAST & DAST', 'Logic Flaw Detection', 'OWASP Top 10 Coverage'],
  },
  {
    icon: Cloud,
    title: 'Cloud Security',
    description: 'Harden your cloud infrastructure across AWS, Azure, and GCP against misconfigurations and breaches.',
    features: ['Config Audits', 'IAM Assessment', 'Container Security'],
  },
  {
    icon: Smartphone,
    title: 'Mobile App Security',
    description: 'Reverse engineering and dynamic analysis of iOS and Android apps to uncover hidden vulnerabilities.',
    features: ['APK/IPA Analysis', 'API Interception', 'Runtime Manipulation'],
  },
];

const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="services" className="py-24 relative bg-card/30" ref={ref}>
      {/* Background Pattern */}
      <div className="absolute inset-0 cyber-grid opacity-30" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="code-tag">&lt;services&gt;</span>
          <h2 className="section-title text-gradient mt-4">What I Offer</h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Offensive security services from an active bug bounty hunter and penetration tester.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group"
            >
              <div className="card-cyber p-6 h-full flex flex-col animate-border-flow">
                {/* Icon */}
                <div className="w-14 h-14 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center mb-6 group-hover:glow-box group-hover:animate-pulse-glow transition-all duration-300">
                  <service.icon className="w-7 h-7 text-primary" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold font-mono text-foreground mb-3">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-grow">
                  {service.description}
                </p>

                {/* Features */}
                <div className="space-y-2">
                  {service.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-2 text-sm"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <a href="#contact" className="btn-cyber-filled">
            Request a Quote
          </a>
        </motion.div>

        {/* Closing Tag */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center mt-16"
        >
          <span className="code-tag">&lt;/services&gt;</span>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
