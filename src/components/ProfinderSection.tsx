import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Rocket, Users, CheckCircle, ArrowRight, Globe, Zap } from 'lucide-react';

const features = [
  {
    icon: Users,
    title: 'Verified Experts',
    description: 'Connect with thoroughly vetted cybersecurity professionals.',
  },
  {
    icon: Zap,
    title: 'Fast Matching',
    description: 'AI-powered matching to find the right expert for your needs.',
  },
  {
    icon: Globe,
    title: 'Global Network',
    description: 'Access security talent from around the world.',
  },
  {
    icon: CheckCircle,
    title: 'Quality Assured',
    description: 'Every project backed by our quality guarantee.',
  },
];

const ProfinderSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="profinder" className="py-24 relative overflow-hidden" ref={ref}>
      {/* Background Effects */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, hsl(var(--secondary) / 0.15) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="code-tag">&lt;profinder&gt;</span>
          <h2 className="section-title mt-4">
            <span className="text-foreground">My Startup: </span>
            <span className="text-gradient-accent">Profinder</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-secondary/30 bg-secondary/10 mb-6">
              <Rocket className="w-4 h-4 text-secondary" />
              <span className="font-mono text-sm text-secondary">Founder & CEO</span>
            </div>

            <h3 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
              Revolutionizing How Businesses
              <span className="text-secondary"> Find Security Talent</span>
            </h3>

            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Profinder is more than a cybersecurity marketplace it’s a professional discovery platform designed to connect businesses with trusted experts, locally and globally.
Whether you need cybersecurity specialists, technical professionals, or industry experts, Profinder streamlines the process of finding, verifying, and hiring the right talent for the job.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-10 h-10 rounded-lg bg-secondary/10 border border-secondary/30 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground text-sm">
                      {feature.title}
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.a
              href="#contact"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.8 }}
              className="inline-flex items-center gap-2 text-secondary font-mono hover:gap-4 transition-all group"
            >
              Learn more about Profinder
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </motion.div>

          {/* Visual Element */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative"
          >
            <div className="card-cyber p-8 relative overflow-hidden">
              {/* Decorative code lines */}
              <div className="font-mono text-sm space-y-3 text-muted-foreground/60">
                <div>
                  <span className="text-primary">const</span>{' '}
                  <span className="text-secondary">profinder</span> = {'{'}
                </div>
                <div className="pl-4">
                  <span className="text-accent">mission</span>:{' '}
                  <span className="text-foreground/80">"Secure the digital world"</span>,
                </div>
                <div className="pl-4">
                  <span className="text-accent">experts</span>:{' '}
                  <span className="text-primary">1500</span>+,
                </div>
                <div className="pl-4">
                  <span className="text-accent">countries</span>:{' '}
                  <span className="text-primary">15</span>+,
                </div>
                <div className="pl-4">
                  <span className="text-accent">projects</span>:{' '}
                  <span className="text-primary">300</span>+,
                </div>
                <div className="pl-4">
                  <span className="text-accent">satisfaction</span>:{' '}
                  <span className="text-secondary">"98%"</span>,
                </div>
                <div>{'};'}</div>
                <div className="pt-4">
                  <span className="text-primary">export default</span>{' '}
                  <span className="text-secondary">profinder</span>;
                </div>
              </div>

              {/* Glow effect */}
              <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-secondary/20 rounded-full blur-3xl" />
            </div>

            {/* Stats badges */}
            <motion.div
              className="absolute -top-4 -right-4 px-4 py-2 bg-card border border-secondary/50 rounded-lg shadow-lg"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <div className="font-mono text-sm">
                <span className="text-secondary">↑ 150%</span>
                <span className="text-muted-foreground ml-2">Growth</span>
              </div>
            </motion.div>

            <motion.div
              className="absolute -bottom-4 -left-4 px-4 py-2 bg-card border border-primary/50 rounded-lg shadow-lg"
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
            >
              <div className="font-mono text-sm">
                <span className="text-primary">★ 4.9</span>
                <span className="text-muted-foreground ml-2">Rating</span>
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
          <span className="code-tag">&lt;/profinder&gt;</span>
        </motion.div>
      </div>
    </section>
  );
};

export default ProfinderSection;
