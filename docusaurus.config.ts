import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Ragora Docs',
  tagline: 'AI-powered knowledge search platform',
  favicon: 'img/favicon.ico',

  stylesheets: [
    {
      href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap',
      type: 'text/css',
    },
  ],

  future: {
    v4: true,
  },

  url: 'https://docs.ragora.app',
  baseUrl: '/',

  organizationName: 'velarynai',
  projectName: 'ragora-docs',

  onBrokenLinks: 'throw',

  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'sdk',
        path: 'docs-sdk',
        routeBasePath: 'sdk',
        sidebarPath: './sidebars-sdk.ts',
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'mcp-server',
        path: 'docs-mcp-server',
        routeBasePath: 'mcp-server',
        sidebarPath: './sidebars-mcp-server.ts',
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'widget',
        path: 'docs-widget',
        routeBasePath: 'widget',
        sidebarPath: './sidebars-widget.ts',
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'gliner',
        path: 'docs-gliner',
        routeBasePath: 'gliner',
        sidebarPath: './sidebars-gliner.ts',
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'openclaw',
        path: 'docs-openclaw',
        routeBasePath: 'openclaw',
        sidebarPath: './sidebars-openclaw.ts',
      },
    ],
  ],

  scripts: [
    {
      src: 'https://api.ragora.app/widget/ragora-chat.js',
      'data-key': 'wk_dc4cc171-5354-4875-9f46-a1abb0e2c77a',
      'data-mode': 'search',
      'data-trigger-selector': '.ask-ai-trigger',
      'data-shortcut': 'true',
      'data-theme': 'auto',
      async: true,
      defer: true,
    },
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/velarynai/ragora-docs/tree/main/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl: 'https://github.com/velarynai/ragora-docs/tree/main/',
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        gtag: {
          trackingID: 'G-YQ1D91LCYX',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/ragora-social-card.png',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Ragora',
      logo: {
        alt: 'Ragora Logo',
        src: 'img/logo.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          type: 'dropdown',
          label: 'Projects',
          position: 'left',
          items: [
            { to: '/sdk/getting-started', label: 'SDKs' },
            { to: '/mcp-server/overview', label: 'MCP Server' },
            { to: '/widget/getting-started', label: 'Chat Widget' },
            { to: '/gliner/overview', label: 'GLiNER' },
            { to: '/openclaw/overview', label: 'OpenClaw' },
          ],
        },
        {
          to: '/docs/api/overview',
          label: 'SDK Reference',
          position: 'left',
        },
        { to: '/blog', label: 'Blog', position: 'left' },
        {
          href: 'https://ragora.app',
          label: 'Go to App',
          position: 'right',
        },
        {
          href: 'https://github.com/velarynai',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            { label: 'Getting Started', to: '/docs/getting-started' },
            { label: 'SDK Reference', to: '/docs/api/overview' },
            { label: 'SDKs', to: '/sdk/getting-started' },
          ],
        },
        {
          title: 'Projects',
          items: [
            { label: 'MCP Server', to: '/mcp-server/overview' },
            { label: 'Chat Widget', to: '/widget/getting-started' },
            { label: 'GLiNER', to: '/gliner/overview' },
            { label: 'OpenClaw', to: '/openclaw/overview' },
          ],
        },
        {
          title: 'Community',
          items: [
            { label: 'Discord', href: 'https://discord.gg/ragora' },
            { label: 'GitHub', href: 'https://github.com/velarynai' },
            { label: 'Contact', href: 'https://ragora.app/contact' },
          ],
        },
        {
          title: 'More',
          items: [
            { label: 'Blog', to: '/blog' },
            { label: 'Ragora App', href: 'https://ragora.app' },
            { label: 'Advanced App', href: 'https://advanced.ragora.app' },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Ragora`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.oneDark,
      additionalLanguages: ['bash', 'json', 'python', 'go', 'typescript'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
