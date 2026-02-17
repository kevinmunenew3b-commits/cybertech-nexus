import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import {
  Mail,
  MapPin,
  Send,
  Github,
  Linkedin,
  Twitter,
  Terminal,
  Instagram,
} from 'lucide-react';

/* =======================
   Social Links
======================= */
const socialLinks = [
  { icon: Github, href: 'https://github.com/kevin2tec', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/in/kevinw3b', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://x.com/cripplew3b', label: 'Twitter / X' },
  { icon: Instagram, href: 'https://instagram.com/cripplew3b', label: 'Instagram' },
];

const ContactSection = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const to = 'bytebugtech@gmail.com';
    const subject = encodeURIComponent(formData.subject);
    const body = encodeURIComponent(
      `Hi, my name is ${formData.name} (${formData.email}).\n\n${formData.message}`
    );

    window.open(
      `https://mail.google.com/mail/?view=cm&to=${to}&su=${subject}&body=${body}`,
      '_blank'
    );
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="py-24 relative bg-card/30"
    >
      {/* Decorative overlay */}
      <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="code-tag">&lt;contact&gt;</span>
          <h2 className="section-title text-gradient mt-4">
            Get In Touch
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* =======================
              LEFT: INFO
          ======================= */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="card-cyber p-8 space-y-8 relative isolate"
          >
            <div className="font-mono text-sm text-primary">
              // contact_info.json
            </div>

            <InfoItem
              icon={<Mail className="w-5 h-5 text-primary" />}
              title="Email"
              value={
                <a
                  href="mailto:bytebugtech@gmail.com"
                  className="relative z-10 pointer-events-auto hover:text-primary"
                >
                  bytebugtech@gmail.com
                </a>
              }
            />

            <InfoItem
              icon={<MapPin className="w-5 h-5 text-primary" />}
              title="Location"
              value="Remote · Worldwide"
            />

            <InfoItem
              icon={<Terminal className="w-5 h-5 text-primary" />}
              title="Response Time"
              value="Within 24 hours"
            />

            {/* Social Links */}
            <div className="pt-8 border-t border-border">
              <div className="font-mono text-sm text-primary mb-4">
                // social_links[]
              </div>

              <div className="relative isolate flex gap-4">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="
                      relative z-10 pointer-events-auto
                      w-12 h-12 rounded-lg bg-muted
                      border border-primary/20
                      flex items-center justify-center
                      text-muted-foreground
                      hover:text-primary hover:border-primary/50
                      hover:glow-box transition-all
                    "
                  >
                    <Icon className="w-5 h-5 pointer-events-none" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* =======================
              RIGHT: FORM (FIXED)
          ======================= */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="card-cyber p-8 space-y-6 relative isolate"
          >
            <div className="font-mono text-sm text-primary">
              // send_message()
            </div>

            <Input
              label="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Rex Doe"
            />

            <Input
              label="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="rex@email.com"
            />

            <Input
              label="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Project Inquiry"
            />

            <Textarea
              label="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell me about your project…"
            />

            <button
              type="submit"
              className="
                relative z-10 pointer-events-auto
                btn-cyber-filled w-full
                flex items-center justify-center gap-2
              "
            >
              <Send className="w-4 h-4 pointer-events-none" />
              Send Message
            </button>
          </motion.form>
        </div>

        <div className="text-center mt-16">
          <span className="code-tag">&lt;/contact&gt;</span>
        </div>
      </div>
    </section>
  );
};

/* =======================
   Reusable Components
======================= */

const InfoItem = ({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: React.ReactNode;
}) => (
  <div className="flex items-start gap-4">
    <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center pointer-events-none">
      {icon}
    </div>
    <div>
      <h4 className="font-semibold text-foreground">{title}</h4>
      <p className="text-muted-foreground">{value}</p>
    </div>
  </div>
);

const Input = ({ label, ...props }: any) => (
  <div className="relative isolate">
    <label className="block font-mono text-sm text-muted-foreground mb-2 pointer-events-none">
      {label} <span className="text-primary">*</span>
    </label>
    <input
      required
      {...props}
      className="
        relative z-10 pointer-events-auto
        w-full px-4 py-3 bg-muted
        border border-primary/20 rounded-lg
        font-mono text-foreground
        focus:outline-none focus:border-primary
        focus:ring-1 focus:ring-primary
        transition-all
      "
    />
  </div>
);

const Textarea = ({ label, ...props }: any) => (
  <div className="relative isolate">
    <label className="block font-mono text-sm text-muted-foreground mb-2 pointer-events-none">
      {label} <span className="text-primary">*</span>
    </label>
    <textarea
      required
      rows={5}
      {...props}
      className="
        relative z-10 pointer-events-auto
        w-full px-4 py-3 bg-muted
        border border-primary/20 rounded-lg
        font-mono text-foreground resize-none
        focus:outline-none focus:border-primary
        focus:ring-1 focus:ring-primary
        transition-all
      "
    />
  </div>
);

export default ContactSection;
