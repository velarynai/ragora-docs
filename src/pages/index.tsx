import React from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import { BookIcon, CodeIcon, PlugIcon, MessageIcon, TagIcon, RobotIcon } from '../components/icons';
import styles from './index.module.css';

const projects = [
  {
    title: 'Platform Docs',
    description: 'Getting started, features, integrations, and API reference for the Ragora platform.',
    link: '/docs/getting-started',
    Icon: BookIcon,
  },
  {
    title: 'SDKs',
    description: 'Official Python and TypeScript clients for the Ragora API.',
    link: '/sdk/getting-started',
    Icon: CodeIcon,
  },
  {
    title: 'MCP Server',
    description: 'Connect Claude, Cursor, and other AI assistants to your Ragora knowledge base.',
    link: '/mcp-server/overview',
    Icon: PlugIcon,
  },
  {
    title: 'Chat Widget',
    description: 'Embed an AI chatbot on any website with one line of code.',
    link: '/widget/getting-started',
    Icon: MessageIcon,
  },
  {
    title: 'GLiNER',
    description: 'HTTP inference server for named entity recognition using GLiNER models.',
    link: '/gliner/overview',
    Icon: TagIcon,
  },
  {
    title: 'OpenClaw',
    description: 'Teach AI agents how to use Ragora via MCP or REST API.',
    link: '/openclaw/overview',
    Icon: RobotIcon,
  },
];

function Hero() {
  return (
    <header className={styles.hero}>
      <div className={styles.heroGlow} />
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>
          Build smarter apps with{' '}
          <span className={styles.heroAccent}>AI-powered search</span>
        </h1>
        <p className={styles.heroSubtitle}>
          Upload your documents, connect your data sources, and get instant semantic search and AI chat over your knowledge base.
        </p>
        <div className={styles.heroButtons}>
          <Link className={styles.btnPrimary} to="/docs/getting-started">
            Get Started
          </Link>
          <Link className={styles.btnSecondary} to="/docs/api/overview">
            SDK Reference
          </Link>
        </div>

        <div className={styles.steps}>
          <div className={styles.step}>
            <div className={styles.stepNumber}>1</div>
            <div className={styles.stepText}>Create a workspace</div>
          </div>
          <div className={styles.stepArrow}>&rarr;</div>
          <div className={styles.step}>
            <div className={styles.stepNumber}>2</div>
            <div className={styles.stepText}>Upload your docs</div>
          </div>
          <div className={styles.stepArrow}>&rarr;</div>
          <div className={styles.step}>
            <div className={styles.stepNumber}>3</div>
            <div className={styles.stepText}>Search &amp; chat</div>
          </div>
        </div>
      </div>
    </header>
  );
}

function Stats() {
  return (
    <section className={styles.stats}>
      <div className="container">
        <div className={styles.statsGrid}>
          <div>
            <div className={styles.statValue}>50+</div>
            <div className={styles.statLabel}>File Types Supported</div>
          </div>
          <div>
            <div className={styles.statValue}>100+</div>
            <div className={styles.statLabel}>Languages</div>
          </div>
          <div>
            <div className={styles.statValue}>&lt;1s</div>
            <div className={styles.statLabel}>Search Latency</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ title, description, link, Icon }: {
  title: string;
  description: string;
  link: string;
  Icon: React.ComponentType<{ size?: number }>;
}) {
  return (
    <Link to={link} className={styles.cardLink}>
      <div className={styles.card}>
        <div className={styles.cardIcon}>
          <Icon size={24} />
        </div>
        <div className={styles.cardTitle}>
          {title}
          <span className={styles.cardArrow}>&rarr;</span>
        </div>
        <p className={styles.cardDescription}>{description}</p>
      </div>
    </Link>
  );
}

export default function Home(): React.JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title="Home" description={siteConfig.tagline}>
      <Hero />
      <Stats />
      <main>
        <section className={styles.projects}>
          <div className="container">
            <h2 className={styles.projectsTitle}>Explore the ecosystem</h2>
            <p className={styles.projectsSubtitle}>
              Everything you need to integrate Ragora into your stack.
            </p>
            <div className={styles.bentoGrid}>
              {projects.map((project, idx) => (
                <div key={project.title} className={styles.bentoItem}>
                  <ProjectCard {...project} />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
