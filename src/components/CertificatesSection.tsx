import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Award, ExternalLink, Calendar, Building } from 'lucide-react';

const certificates = [
  {
    title: 'Introduction to Critical Infrastructure Protection (ICIP)',
    issuer: 'OPSWAT Academy',
    date: '2025',
    credentialUrl: 'https://learn.opswat.com/',
    description: 'Comprehensive training on protecting critical infrastructure systems, covering OT/ICS security fundamentals, network architecture, and threat landscapes targeting industrial control systems.',
    tags: ['Critical Infrastructure', 'ICS/OT Security', 'Network Defense'],
  },
];

const CertificatesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="certificates" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="code-tag">&lt;certificates&gt;</span>
          <h2 className="section-title text-gradient mt-4">Certifications</h2>
          <p className="text-muted-foreground font-mono text-sm mt-2">
            // verified_credentials.list()
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto grid gap-6">
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.15 }}
              className="card-cyber p-6 group hover:border-primary/40 transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row gap-5">
                {/* Icon */}
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Award className="w-7 h-7 text-primary" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                    <h3 className="text-lg font-bold text-foreground font-mono leading-tight">
                      {cert.title}
                    </h3>
                    {cert.credentialUrl && (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs font-mono text-primary hover:text-secondary transition-colors shrink-0"
                      >
                        <ExternalLink className="w-3 h-3" />
                        Verify
                      </a>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground font-mono">
                    <span className="flex items-center gap-1.5">
                      <Building className="w-4 h-4 text-secondary" />
                      {cert.issuer}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-secondary" />
                      {cert.date}
                    </span>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {cert.description}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {cert.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 text-xs font-mono bg-primary/10 border border-primary/20 rounded text-primary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Closing Tag */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <span className="code-tag">&lt;/certificates&gt;</span>
        </motion.div>
      </div>
    </section>
  );
};

export default CertificatesSection;
