import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Download, Mail, MapPin, Phone, Globe, Code, Shield, Wrench, Trophy, Briefcase, GraduationCap, Bug, Loader2 } from 'lucide-react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

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

const projectExperience = [
  'Built scalable, production-ready web applications using React and Next.js',
  'Integrated secure authentication systems and backend services',
  'Applied cybersecurity best practices to protect user data',
  'Deployed responsive and high-performance applications',
];

const ctfExperience = [
  'Competed in multiple CTF competitions, solving complex web, crypto, and network challenges',
  'Discovered and responsibly disclosed vulnerabilities in companies including OpenAI and Lovable',
  'Built custom tools and scripts to streamline bug hunting and penetration testing',
];

const ResumeSection = () => {
  const ref = useRef(null);
  const pdfRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    if (!pdfRef.current || isGenerating) return;
    setIsGenerating(true);

    try {
      // Show hidden content for PDF
      pdfRef.current.style.display = 'block';

      const canvas = await html2canvas(pdfRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#0a0a0f',
      });

      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgData = canvas.toDataURL('image/png');

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('Kevin_Munene_CV.pdf');
    } catch (err) {
      console.error('PDF generation failed:', err);
    } finally {
      if (pdfRef.current) pdfRef.current.style.display = 'none';
      setIsGenerating(false);
    }
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

        {/* Visible Preview Card (condensed) */}
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
              </div>
              <motion.button
                onClick={handleDownload}
                disabled={isGenerating}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-cyber-filled flex items-center gap-2 text-sm shrink-0 disabled:opacity-50"
              >
                {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                {isGenerating ? 'Generating...' : 'Download CV'}
              </motion.button>
            </div>

            {/* Summary */}
            <div className="mb-8">
              <h4 className="font-mono text-sm text-primary mb-3 flex items-center gap-2">
                <Briefcase className="w-4 h-4" /> // professional_summary
              </h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Skilled Full-Stack Frontend Developer and Penetration Tester with extensive experience in React/Next.js,
                Python, and cybersecurity. Download the full CV for complete details.
              </p>
            </div>

            {/* Skills Grid (only frontend & cyber shown) */}
            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              <div>
                <h4 className="font-mono text-sm text-primary mb-3 flex items-center gap-2">
                  <Code className="w-4 h-4" /> // frontend_skills
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {skills.frontend.slice(0, 4).map((s) => (
                    <span key={s} className="px-2 py-1 text-xs font-mono bg-primary/10 border border-primary/30 rounded text-primary">{s}</span>
                  ))}
                  <span className="px-2 py-1 text-xs font-mono text-muted-foreground">+{skills.frontend.length - 4} more</span>
                </div>
              </div>
              <div>
                <h4 className="font-mono text-sm text-primary mb-3 flex items-center gap-2">
                  <Shield className="w-4 h-4" /> // cybersecurity
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {skills.cyber.slice(0, 3).map((s) => (
                    <span key={s} className="px-2 py-1 text-xs font-mono bg-secondary/10 border border-secondary/30 rounded text-secondary">{s}</span>
                  ))}
                  <span className="px-2 py-1 text-xs font-mono text-muted-foreground">+{skills.cyber.length - 3} more</span>
                </div>
              </div>
            </div>

            {/* Download CTA */}
            <div className="text-center pt-6 border-t border-primary/20">
              <p className="text-xs text-muted-foreground mb-4 font-mono">// download full CV for complete skills, experience, education & more</p>
              <motion.button
                onClick={handleDownload}
                disabled={isGenerating}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-cyber flex items-center gap-2 mx-auto text-sm disabled:opacity-50"
              >
                {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                {isGenerating ? 'Generating PDF...' : 'Download Full CV'}
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

      {/* Hidden Full CV for PDF generation */}
      <div
        ref={pdfRef}
        style={{ display: 'none', position: 'absolute', left: '-9999px', top: 0 }}
      >
        <div style={{ width: '794px', padding: '40px', backgroundColor: '#0a0a0f', color: '#e0e0e0', fontFamily: 'monospace', fontSize: '12px', lineHeight: '1.6' }}>
          {/* PDF Header */}
          <div style={{ borderBottom: '2px solid #00ff41', paddingBottom: '16px', marginBottom: '20px' }}>
            <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#00ff41', margin: 0 }}>KEVIN MUNENE</h1>
            <p style={{ color: '#aaa', margin: '4px 0 12px' }}>Frontend Developer | Python Developer | Backend Developer | Cybersecurity Enthusiast</p>
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', fontSize: '11px', color: '#888' }}>
              <span>📍 Kenya</span>
              <span>📧 boatqofficial@gmail.com</span>
              <span>📱 0741074468</span>
              <span>🌐 kevinw3bcodes.web.app</span>
            </div>
          </div>

          {/* Summary */}
          <div style={{ marginBottom: '20px' }}>
            <h2 style={{ fontSize: '14px', color: '#00ff41', borderBottom: '1px solid #333', paddingBottom: '4px', marginBottom: '8px' }}>PROFESSIONAL SUMMARY</h2>
            <p style={{ color: '#ccc' }}>
              Skilled Full-Stack Frontend Developer and Penetration Tester with extensive experience in React/Next.js,
              Python, and cybersecurity. Competed in numerous CTF competitions, discovered and reported vulnerabilities
              for companies including OpenAI and Lovable, and built custom tools to aid bug hunters. Adept at combining
              secure coding practices with innovative development to deliver fast, scalable, and secure web applications.
            </p>
          </div>

          {/* Skills */}
          <div style={{ marginBottom: '20px' }}>
            <h2 style={{ fontSize: '14px', color: '#00ff41', borderBottom: '1px solid #333', paddingBottom: '4px', marginBottom: '8px' }}>TECHNICAL SKILLS</h2>
            <p><strong style={{ color: '#00ff41' }}>Frontend:</strong> {skills.frontend.join(', ')}</p>
            <p><strong style={{ color: '#00ff41' }}>Programming:</strong> {skills.programming.join(', ')}</p>
            <p><strong style={{ color: '#00ff41' }}>Cybersecurity:</strong></p>
            <ul style={{ paddingLeft: '20px', margin: '4px 0' }}>
              {skills.cyber.map((s) => <li key={s} style={{ color: '#ccc' }}>{s}</li>)}
            </ul>
            <p><strong style={{ color: '#00ff41' }}>Tools & Platforms:</strong> {skills.tools.join(', ')}</p>
          </div>

          {/* Project Experience */}
          <div style={{ marginBottom: '20px' }}>
            <h2 style={{ fontSize: '14px', color: '#00ff41', borderBottom: '1px solid #333', paddingBottom: '4px', marginBottom: '8px' }}>PROJECT EXPERIENCE</h2>
            <p style={{ color: '#00ff41', fontWeight: 'bold', marginBottom: '4px' }}>Portfolio Projects — kevinw3bcodes.web.app</p>
            <ul style={{ paddingLeft: '20px', margin: '4px 0' }}>
              {projectExperience.map((e) => <li key={e} style={{ color: '#ccc' }}>{e}</li>)}
            </ul>
            <p style={{ color: '#00ff41', fontWeight: 'bold', marginBottom: '4px', marginTop: '12px' }}>CTF & Bug Bounty Experience</p>
            <ul style={{ paddingLeft: '20px', margin: '4px 0' }}>
              {ctfExperience.map((e) => <li key={e} style={{ color: '#ccc' }}>{e}</li>)}
            </ul>
          </div>

          {/* Experience */}
          <div style={{ marginBottom: '20px' }}>
            <h2 style={{ fontSize: '14px', color: '#00ff41', borderBottom: '1px solid #333', paddingBottom: '4px', marginBottom: '8px' }}>EXPERIENCE</h2>
            <p style={{ color: '#00ff41', fontWeight: 'bold', marginBottom: '4px' }}>Frontend Developer / Backend Developer / Pentester — Freelance</p>
            <ul style={{ paddingLeft: '20px', margin: '4px 0' }}>
              {experience.map((e) => <li key={e} style={{ color: '#ccc' }}>{e}</li>)}
            </ul>
          </div>

          {/* Education */}
          <div style={{ marginBottom: '20px' }}>
            <h2 style={{ fontSize: '14px', color: '#00ff41', borderBottom: '1px solid #333', paddingBottom: '4px', marginBottom: '8px' }}>EDUCATION</h2>
            <p style={{ color: '#ccc' }}>Bachelor's Degree (Currently Pursuing)</p>
            <p style={{ color: '#888' }}>The Co-operative University of Kenya</p>
          </div>

          {/* Strengths */}
          <div>
            <h2 style={{ fontSize: '14px', color: '#00ff41', borderBottom: '1px solid #333', paddingBottom: '4px', marginBottom: '8px' }}>CORE STRENGTHS</h2>
            <ul style={{ paddingLeft: '20px', margin: '4px 0' }}>
              {strengths.map((s) => <li key={s} style={{ color: '#ccc' }}>{s}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResumeSection;
