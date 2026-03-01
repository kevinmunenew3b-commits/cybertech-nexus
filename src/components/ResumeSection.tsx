import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Download, Mail, MapPin, Phone, Globe, Code, Shield, Bug, GraduationCap, Wrench, Trophy, Briefcase } from 'lucide-react';

const skills = {
  frontend: ['React.js', 'Next.js', 'JavaScript (ES6+)', 'HTML5', 'CSS3', 'Tailwind CSS', 'Responsive UI/UX'],
  programming: ['Python', 'JavaScript'],
  cyber: [
    'Linux pentesting tools (Kali, Parrot OS)',
    'Web app & network vulnerability assessments',
    'Bug bounty (OpenAI, Lovable, etc.)',
    'CTF competitions',
    'Custom pentesting tools',
  ],
  tools: ['Git & GitHub', 'VS Code', 'Vercel', 'Firebase', 'Supabase', 'REST APIs'],
};

const experience = [
  'Designed and developed dynamic dashboards and interactive UI components',
  'Integrated APIs and backend services',
  'Applied penetration testing knowledge to enhance web application security',
  'Developed custom automation scripts and tools for security researchers',
  'Optimized web applications for speed, responsiveness, and security',
  'Managed version control using Git',
];

const strengths = [
  'Secure coding and cybersecurity awareness',
  'Problem-solving & analytical thinking',
  'Passionate about modern web development',
  'Fast learner, adaptable, and detail-oriented',
];

const ResumeSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/kevin-munene-cv.txt';
    link.download = 'Kevin_Munene_CV.txt';
    link.click();
  };

  return (
    <section id="resume" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="code-tag">&lt;resume&gt;</span>
          <h2 className="section-title text-gradient mt-4">Download CV</h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Full-Stack Developer & Cybersecurity Enthusiast
          </p>
        </motion.div>

        {/* CV Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="card-cyber p-6 sm:p-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-primary/20">
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold font-mono text-gradient">KEVIN MUNENE</h3>
                <p className="text-muted-foreground font-mono text-sm mt-1">
                  Frontend Developer | Python Developer | Backend Developer | Cybersecurity Enthusiast
                </p>
                <div className="flex flex-wrap gap-4 mt-3 text-xs font-mono text-muted-foreground">
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-primary" /> Kenya</span>
                  <span className="flex items-center gap-1"><Mail className="w-3 h-3 text-primary" /> boatqofficial@gmail.com</span>
                  <span className="flex items-center gap-1"><Phone className="w-3 h-3 text-primary" /> 0741074468</span>
                  <a href="https://kevinw3bcodes.web.app" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-primary transition-colors">
                    <Globe className="w-3 h-3 text-primary" /> kevinw3bcodes.web.app
                  </a>
                </div>
              </div>
              <motion.button
                onClick={handleDownload}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-cyber-filled flex items-center gap-2 text-sm shrink-0"
              >
                <Download className="w-4 h-4" />
                Download CV
              </motion.button>
            </div>

            {/* Summary */}
            <div className="mb-8">
              <h4 className="font-mono text-sm text-primary mb-3 flex items-center gap-2">
                <Briefcase className="w-4 h-4" /> // professional_summary
              </h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Skilled Full-Stack Frontend Developer and Penetration Tester with extensive experience in React/Next.js,
                Python, and cybersecurity. Competed in numerous CTF competitions, discovered and reported vulnerabilities
                for companies including OpenAI and Lovable, and built custom tools to aid bug hunters.
              </p>
            </div>

            {/* Skills Grid */}
            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              <div>
                <h4 className="font-mono text-sm text-primary mb-3 flex items-center gap-2">
                  <Code className="w-4 h-4" /> // frontend_skills
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {skills.frontend.map((s) => (
                    <span key={s} className="px-2 py-1 text-xs font-mono bg-primary/10 border border-primary/30 rounded text-primary">{s}</span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-mono text-sm text-primary mb-3 flex items-center gap-2">
                  <Shield className="w-4 h-4" /> // cybersecurity
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {skills.cyber.map((s) => (
                    <span key={s} className="px-2 py-1 text-xs font-mono bg-secondary/10 border border-secondary/30 rounded text-secondary">{s}</span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-mono text-sm text-primary mb-3 flex items-center gap-2">
                  <Wrench className="w-4 h-4" /> // tools_and_platforms
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {skills.tools.map((s) => (
                    <span key={s} className="px-2 py-1 text-xs font-mono bg-accent/10 border border-accent/30 rounded text-accent">{s}</span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-mono text-sm text-primary mb-3 flex items-center gap-2">
                  <Trophy className="w-4 h-4" /> // core_strengths
                </h4>
                <ul className="space-y-1.5">
                  {strengths.map((s) => (
                    <li key={s} className="text-xs font-mono text-muted-foreground flex items-start gap-2">
                      <span className="text-primary mt-0.5">▸</span> {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Experience */}
            <div className="mb-8">
              <h4 className="font-mono text-sm text-primary mb-3 flex items-center gap-2">
                <Bug className="w-4 h-4" /> // experience
              </h4>
              <div className="bg-muted/30 rounded-lg p-4 border border-primary/10">
                <p className="text-xs font-mono text-primary mb-2">Frontend Developer / Backend Developer / Pentester — Freelance</p>
                <ul className="space-y-1.5">
                  {experience.map((e) => (
                    <li key={e} className="text-xs font-mono text-muted-foreground flex items-start gap-2">
                      <span className="text-secondary mt-0.5">▸</span> {e}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Education */}
            <div className="mb-8">
              <h4 className="font-mono text-sm text-primary mb-3 flex items-center gap-2">
                <GraduationCap className="w-4 h-4" /> // education
              </h4>
              <div className="bg-muted/30 rounded-lg p-4 border border-primary/10">
                <p className="text-sm font-mono text-foreground">Bachelor's Degree (Currently Pursuing)</p>
                <p className="text-xs font-mono text-muted-foreground mt-1">The Co-operative University of Kenya</p>
              </div>
            </div>

            {/* Download CTA */}
            <div className="text-center pt-6 border-t border-primary/20">
              <motion.button
                onClick={handleDownload}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-cyber flex items-center gap-2 mx-auto text-sm"
              >
                <Download className="w-4 h-4" />
                Download Full CV
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Closing Tag */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16"
        >
          <span className="code-tag">&lt;/resume&gt;</span>
        </motion.div>
      </div>
    </section>
  );
};

export default ResumeSection;
