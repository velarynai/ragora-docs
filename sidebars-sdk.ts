import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  sdkSidebar: [
    'getting-started',
    {
      type: 'category',
      label: 'Python',
      items: [
        'python/installation',
        'python/usage',
      ],
    },
    {
      type: 'category',
      label: 'TypeScript',
      items: [
        'typescript/installation',
        'typescript/usage',
      ],
    },
  ],
};

export default sidebars;
