import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';

const projects = [
  {
    title: 'Platform Docs',
    description: 'Getting started, features, integrations, and API reference for the Ragora platform.',
    link: '/docs/getting-started',
    icon: '📚',
  },
  {
    title: 'SDKs',
    description: 'Official Python and TypeScript clients for the Ragora API.',
    link: '/sdk/getting-started',
    icon: '🔧',
  },
  {
    title: 'MCP Server',
    description: 'Connect Claude, Cursor, and other AI assistants to your Ragora knowledge base.',
    link: '/mcp-server/overview',
    icon: '🔌',
  },
  {
    title: 'Chat Widget',
    description: 'Embed an AI chatbot on any website with one line of code.',
    link: '/widget/getting-started',
    icon: '💬',
  },
  {
    title: 'GLiNER',
    description: 'HTTP inference server for named entity recognition using GLiNER models.',
    link: '/gliner/overview',
    icon: '🏷️',
  },
  {
    title: 'OpenClaw',
    description: 'Teach AI agents how to use Ragora via MCP or REST API.',
    link: '/openclaw/overview',
    icon: '🤖',
  },
];

function Hero() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--primary button--lg"
            to="/docs/getting-started">
            Get Started
          </Link>
          <Link
            className="button button--secondary button--lg"
            to="/docs/api/overview">
            API Reference
          </Link>
        </div>
      </div>
    </header>
  );
}

function ProjectCard({title, description, link, icon}: {
  title: string;
  description: string;
  link: string;
  icon: string;
}) {
  return (
    <div className={clsx('col col--4', styles.projectCard)}>
      <Link to={link} className={styles.cardLink}>
        <div className={styles.card}>
          <div className={styles.cardIcon}>{icon}</div>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </Link>
    </div>
  );
}

export default function Home(): React.JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="Home"
      description={siteConfig.tagline}>
      <Hero />
      <main>
        <section className={styles.projects}>
          <div className="container">
            <div className="row">
              {projects.map((project, idx) => (
                <ProjectCard key={idx} {...project} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
