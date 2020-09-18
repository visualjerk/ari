// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'ari',
  icon: {
    favicon: './src/assets/favicon.png',
    touchicon: './src/assets/favicon.png',
  },
  siteUrl: 'https://visualjerk.github.io',
  pathPrefix: '/ari',
  settings: {
    web: process.env.URL_WEB || false,
    twitter: process.env.URL_TWITTER || false,
    github: process.env.URL_GITHUB || 'https://github.com/visualjerk/ari',
    nav: {
      links: [{ path: '/docs/', title: 'Docs' }],
    },
    sidebar: [
      {
        name: 'docs',
        sections: [
          {
            title: 'Getting Started',
            items: ['/docs/'],
          },
          {
            title: 'Components',
            items: ['/docs/button/', '/docs/modal/', '/docs/popover/'],
          },
        ],
      },
    ],
  },
  plugins: [
    {
      use: '@gridsome/source-filesystem',
      options: {
        baseDir: './content',
        path: '**/*.md',
        typeName: 'MarkdownPage',
        remark: {
          externalLinksTarget: '_blank',
          externalLinksRel: ['noopener', 'noreferrer'],
          plugins: ['@gridsome/remark-prismjs'],
        },
      },
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        baseDir: '../src',
        path: '**/*.md',
        pathPrefix: '/docs',
        index: ['README'],
        typeName: 'MarkdownPage',
        remark: {
          externalLinksTarget: '_blank',
          externalLinksRel: ['noopener', 'noreferrer'],
          plugins: ['@gridsome/remark-prismjs'],
        },
      },
    },
    {
      use: 'gridsome-plugin-tailwindcss',
      options: {
        tailwindConfig: './tailwind.config.js',
        purgeConfig: {
          // Prevent purging of prism classes.
          whitelistPatternsChildren: [/token$/],
        },
      },
    },
    {
      use: '@gridsome/plugin-sitemap',
      options: {},
    },
  ],
}
