import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
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
      items: [
        'bots/message-sync',
        'bots/qa-bots',
      ],
    },
    {
      type: 'category',
      label: 'API Reference',
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
