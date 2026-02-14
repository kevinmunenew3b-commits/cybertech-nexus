import { motion } from 'framer-motion';
import { ExternalLink, Github, Heart, ArrowLeft, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

import project1 from '@/assets/project-1.jpg';
import project2 from '@/assets/project-2.jpg';
import project3 from '@/assets/project-3.jpg';
import redreconImg from '@/assets/recon.png';

/* ================================
   CENTRAL SUPPORT LINKS
================================ */
const SUPPORT_LINKS = {
  buyMeCoffee: 'https://coff.ee/kevinw3b',
  github: 'https://github.com/kevin2tec',
};

/* ================================
   PROJECTS DATA
================================ */
const projects = [
  {
    id: 1,
    title: 'RedRecon',
    description:
      'Passive and active web reconnaissance tool that discovers endpoints, JS files, exposed secrets, and technology stacks with real-time terminal output.',
    image: redreconImg,
    tags: ['Python', 'Recon', 'Security', 'Terminal'],
    liveUrl: 'https://github.com/kevin2tec/redrecon',
    githubUrl: 'https://github.com/kevin2tec/redrecon',
  },
  {
    id: 2,
    title: '404Trick',
    description:
      'Bug bounty hunting tool designed to find hidden bugs and vulnerabilities. Lets you discover those elusive security flaws.',
    image: project1,
    tags: ['Python', 'Bug Bounty', 'Security'],
    liveUrl: 'https://github.com/kevin2tec/404Trick',
    githubUrl: 'https://github.com/kevin2tec/404Trick',
  },
  {
    id: 3,
    title: 'U-SEARCH',
    description:
      'OSINT username search tool for discovering accounts across multiple platforms. Powerful reconnaissance utility for security researchers.',
    image: project2,
    tags: ['Python', 'OSINT', 'Recon'],
    liveUrl: 'https://github.com/kevin2tec/U-SEARCH',
    githubUrl: 'https://github.com/kevin2tec/U-SEARCH',
  },
  {
    id: 4,
    title: 'CyberShield Portfolio',
    description:
      'A sleek, hacker-themed portfolio website built with React, TypeScript & Tailwind CSS. Features matrix rain animations, glitch effects, and a fully functional contact system.',
    image: project3,
    tags: ['React', 'TypeScript', 'Tailwind', 'Framer Motion'],
    liveUrl: '#',
    githubUrl: '#',
    isPurchasable: true,
  },
];

/* ================================
   PROJECTS COMPONENT
================================ */
const Projects = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="scanline" />

      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-background/90 backdrop-blur-md border-b border-primary/20">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link
            to="/"
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-mono">Back to Home</span>
          </Link>
          <span className="font-mono text-primary">&lt;projects/&gt;</span>
        </div>
      </header>

      {/* MAIN */}
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">

          {/* TITLE */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="code-tag">&lt;my_work&gt;</span>
            <h1 className="section-title text-gradient mt-4">Projects</h1>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              A collection of security tools, frameworks, and experiments built
              while learning and exploring offensive security.
            </p>
          </motion.div>

          {/* PROJECTS GRID */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card-cyber overflow-hidden"
              >
                {/* IMAGE → GITHUB PROFILE */}
                <a
                  href={SUPPORT_LINKS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block relative h-48 overflow-hidden cursor-pointer"
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                </a>

                <div className="p-6">
                  <div className="font-mono text-sm text-primary mb-2">
                    // project_{project.id}
                  </div>

                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs font-mono bg-primary/10 text-primary border border-primary/30 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm font-mono">
                    {(project as any).isPurchasable ? (
                      <a
                        href="/#contact"
                        className="flex items-center gap-2 px-4 py-2 bg-primary/20 border border-primary/40 rounded-lg hover:bg-primary/30 text-primary transition-colors"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Purchase — Contact Me
                      </a>
                    ) : (
                      <>
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 hover:text-primary transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Live
                        </a>
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 hover:text-primary transition-colors"
                        >
                          <Github className="w-4 h-4" />
                          Code
                        </a>
                      </>
                    )}

                    <a
                      href={SUPPORT_LINKS.buyMeCoffee}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary transition-colors"
                    >
                      ☕ Support
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* SUPPORT */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="card-cyber p-8 text-center"
          >
            <div className="font-mono text-sm text-primary mb-4">
              // support_my_work()
            </div>

            <h2 className="text-2xl font-bold mb-4">Support My Work</h2>

            <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
              If you enjoy my work or follow my learning journey, consider
              supporting it. Every coffee helps keep the terminal running ☕
            </p>

            <div className="flex justify-center gap-4 flex-wrap">
              <a
                href={SUPPORT_LINKS.buyMeCoffee}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-cyber-filled inline-flex items-center gap-2"
              >
                <Heart className="w-4 h-4" />
                Buy Me a Coffee
              </a>

              <a
                href={SUPPORT_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-cyber-outline inline-flex items-center gap-2"
              >
                
              </a>
            </div>
          </motion.div>

          <div className="text-center mt-16">
            <span className="code-tag">&lt;/my_work&gt;</span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Projects;
