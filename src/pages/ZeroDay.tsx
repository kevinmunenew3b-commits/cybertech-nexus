import { motion } from 'framer-motion';
import { ArrowLeft, AlertTriangle, Clock, Shield, Bug, ExternalLink, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import zerodayOpenaiImg from '@/assets/zeroday-openai.jpg';

const reports = [
  {
    id: 1,
    title: 'Client-Side System Time Manipulation Bypasses Image Generation Rate Limits & Messaging in ChatGPT',
    target: 'OpenAI — ChatGPT',
    severity: 'High',
    status: 'Reported',
    date: '2025',
    image: zerodayOpenaiImg,
    tags: ['Zero-Day', 'Rate Limit Bypass', 'Client-Side', 'ChatGPT'],
    summary:
      'Discovered that manipulating the local system clock on the client device allows an attacker to completely bypass image generation rate limits and messaging quotas enforced by ChatGPT. The vulnerability exists because the rate-limiting logic relies on client-side timestamps rather than server-side validation.',
    impact: [
      'Unlimited DALL·E image generations without paying for Plus/Pro',
      'Bypass of messaging rate limits on GPT-4 and GPT-4o',
      'Financial loss to OpenAI through resource abuse',
      'Potential for automated abuse at scale',
    ],
    steps: [
      'Open ChatGPT and exhaust the image generation or messaging quota',
      'Open system settings and advance the clock forward (e.g. +24 hours)',
      'Return to ChatGPT — the rate limit resets immediately',
      'Generate unlimited images or send unlimited messages',
      'Repeat by advancing the clock further each time',
    ],
    techDetails:
      'The rate-limiting mechanism stores the usage window timestamp on the client side (likely via localStorage or a cookie tied to local time). When the system clock is changed, the client-side check calculates that the rate window has expired, allowing the user to bypass the quota without any server-side re-validation. This is a classic TOCTOU (Time-of-Check to Time-of-Use) flaw where the "check" happens on an untrusted client.',
  },
];

const severityColor: Record<string, string> = {
  Critical: 'text-red-500 border-red-500/40 bg-red-500/10',
  High: 'text-orange-400 border-orange-400/40 bg-orange-400/10',
  Medium: 'text-yellow-400 border-yellow-400/40 bg-yellow-400/10',
  Low: 'text-secondary border-secondary/40 bg-secondary/10',
};

const ZeroDay = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="scanline" />

      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-background/90 backdrop-blur-md border-b border-primary/20">
        <div className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <Link
            to="/"
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-mono text-sm sm:text-base">Back to Home</span>
          </Link>
          <span className="font-mono text-primary text-sm sm:text-base">&lt;zero_day/&gt;</span>
        </div>
      </header>

      {/* MAIN */}
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6">

          {/* PAGE TITLE */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            <span className="code-tag">&lt;zero_day_reports&gt;</span>
            <h1 className="section-title text-gradient mt-4 text-2xl sm:text-3xl md:text-4xl">
              Zero-Day Discoveries
            </h1>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-sm sm:text-base">
              Real vulnerability reports from my security research. These are
              zero-day findings reported responsibly through official disclosure
              channels.
            </p>

            {/* Stats bar */}
            <div className="flex flex-wrap justify-center gap-4 sm:gap-8 mt-8">
              {[
                { icon: Bug, label: 'Vulnerabilities', value: '1' },
                { icon: AlertTriangle, label: 'Zero-Days', value: '1' },
                { icon: Shield, label: 'Responsibly Disclosed', value: '100%' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg border border-primary/20 bg-card/50"
                >
                  <stat.icon className="w-4 h-4 text-primary" />
                  <span className="font-mono text-xs sm:text-sm">
                    <span className="text-primary font-bold">{stat.value}</span>{' '}
                    <span className="text-muted-foreground">{stat.label}</span>
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* REPORTS */}
          <div className="space-y-8 sm:space-y-12">
            {reports.map((report, index) => (
              <motion.article
                key={report.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="card-cyber overflow-hidden"
              >
                {/* Hero image */}
                <div className="relative h-48 sm:h-64 md:h-80 overflow-hidden">
                  <img
                    src={report.image}
                    alt={report.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />

                  {/* Severity badge */}
                  <div className="absolute top-4 right-4">
                    <span
                      className={`px-3 py-1 text-xs font-mono font-bold uppercase rounded border ${severityColor[report.severity]}`}
                    >
                      {report.severity} Severity
                    </span>
                  </div>

                  {/* Target overlay */}
                  <div className="absolute bottom-4 left-4 sm:left-6">
                    <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground mb-1">
                      <Clock className="w-3 h-3" />
                      {report.date}
                      <span className="mx-1 text-primary">|</span>
                      <span className="text-primary">{report.status}</span>
                    </div>
                    <p className="font-mono text-sm sm:text-base text-primary">
                      Target: {report.target}
                    </p>
                  </div>
                </div>

                <div className="p-4 sm:p-6 md:p-8">
                  {/* Title */}
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold font-mono mb-4 leading-tight">
                    {report.title}
                  </h2>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {report.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs font-mono bg-primary/10 text-primary border border-primary/30 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Summary */}
                  <div className="mb-6">
                    <h3 className="font-mono text-sm text-primary mb-2 flex items-center gap-2">
                      <ChevronRight className="w-4 h-4" /> Summary
                    </h3>
                    <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                      {report.summary}
                    </p>
                  </div>

                  {/* Impact */}
                  <div className="mb-6">
                    <h3 className="font-mono text-sm text-primary mb-2 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" /> Impact
                    </h3>
                    <ul className="space-y-2">
                      {report.impact.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-muted-foreground text-sm sm:text-base"
                        >
                          <span className="text-destructive mt-1 shrink-0">▸</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Steps to Reproduce */}
                  <div className="mb-6">
                    <h3 className="font-mono text-sm text-primary mb-2 flex items-center gap-2">
                      <Bug className="w-4 h-4" /> Steps to Reproduce
                    </h3>
                    <div className="bg-black/60 border border-primary/20 rounded-lg p-3 sm:p-4 font-mono text-xs sm:text-sm space-y-2">
                      {report.steps.map((step, i) => (
                        <div key={i} className="flex gap-3">
                          <span className="text-primary shrink-0">
                            [{String(i + 1).padStart(2, '0')}]
                          </span>
                          <span className="text-muted-foreground">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Technical Details */}
                  <div className="mb-6">
                    <h3 className="font-mono text-sm text-primary mb-2 flex items-center gap-2">
                      <Shield className="w-4 h-4" /> Technical Analysis
                    </h3>
                    <div className="bg-card/80 border border-primary/10 rounded-lg p-3 sm:p-4">
                      <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                        {report.techDetails}
                      </p>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-primary/10">
                    <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                      <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
                      Responsibly Disclosed
                    </div>
                    <span className="font-mono text-xs text-muted-foreground">
                      // discovered by @kevinw3b
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="card-cyber p-6 sm:p-8 text-center mt-12 sm:mt-16"
          >
            <div className="font-mono text-sm text-primary mb-4">
              // more_reports_incoming()
            </div>
            <h2 className="text-xl sm:text-2xl font-bold mb-4">More Reports Coming Soon</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-6 text-sm sm:text-base">
              I'm actively hunting for vulnerabilities across major platforms.
              Stay tuned for more zero-day disclosures and security research.
            </p>
            <Link to="/#contact" className="btn-cyber-filled inline-flex items-center gap-2">
              <ExternalLink className="w-4 h-4" />
              Get in Touch
            </Link>
          </motion.div>

          <div className="text-center mt-12 sm:mt-16">
            <span className="code-tag">&lt;/zero_day_reports&gt;</span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ZeroDay;
