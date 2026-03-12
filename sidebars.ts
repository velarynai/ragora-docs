import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    'intro',
    'getting-started',
    {
      type: 'category',
      label: 'Guides',
      items: [
        'guides/workspaces',
        'guides/adding-data',
        'guides/integrations-guide',
        'guides/settings',
        'guides/marketplace-guide',
        'guides/billing-guide',
      ],
    },
    {
      type: 'category',
      label: 'Features',
      items: [
        'features/how-it-works',
        'features/use-cases',
      ],
    },
    {
      type: 'category',
      label: 'Integrations',
      link: { type: 'doc', id: 'integrations/index' },
      items: [
        'integrations/mcp-guide',
        'integrations/connectors',
        'integrations/openclaw',
        'integrations/chat-widget',
      ],
    },
    {
      type: 'category',
      label: 'Bots',
      link: { type: 'doc', id: 'bots/index' },
      items: [
        'bots/message-sync',
        'bots/qa-bots',
      ],
    },
    {
      type: 'category',
      label: 'SDK Reference',
      items: [
        'api/overview',
        'api/retrieve',
        'api/chat-completions',
        'api/documents',
        'api/collections',
        'api/billing',
        'api/marketplace',
        'api/errors',
      ],
    },
    'billing',
    'marketplace',
    'faq',
  ],
};

export default sidebars;
