/** @type {import("pliny/config").PlinyConfig } */
const siteMetadata = {
  title: 'CuB3y0nd\'s Portfolio',
  author: 'CuB3y0nd',
  headerTitle: 'CuB3y0nd\'s Writings',
  description: '开发者、网络安全爱好者、Pwner。',
  language: 'zh-cn',
  theme: 'system', // system, dark or light
  siteUrl: 'https://www.cubeyond.net',
  siteRepo: 'https://github.com/CuB3y0nd/cubeyond.net',
  siteLogo: '/static/images/logo.png',
  socialBanner: '/static/images/twitter-card.png',
  email: 'root@cubeyond.net',
  github: 'https://github.com/CuB3y0nd',
  twitter: 'https://twitter.com/CuB3y0nd',
  discord: 'https://discord.gg/JhxANCX65g',
  locale: 'en-US',
  // analytics: {
  //   // If you want to use an analytics provider you have to add it to the
  //   // content security policy in the `next.config.js` file.
  //   // supports Plausible, Simple Analytics, Umami, Posthog or Google Analytics.
  //   umamiAnalytics: {
  //     // We use an env variable for this site to avoid other users cloning our analytics ID
  //     umamiWebsiteId: process***REMOVED***.NEXT_UMAMI_ID, // e.g. 123e4567-e89b-12d3-a456-426614174000
  //   },
  //   plausibleAnalytics: {
  //     plausibleDataDomain: '', // e.g. tailwind-nextjs-starter-blog.vercel.app
  //   },
  //   simpleAnalytics: {},
  //   posthogAnalytics: {
  //     posthogProjectApiKey: '', // e.g. 123e4567-e89b-12d3-a456-426614174000
  //   },
  //   googleAnalytics: {
  //     googleAnalyticsId: '', // e.g. G-XXXXXXX
  //   },
  // },
  newsletter: {
    // supports mailchimp, buttondown, convertkit, klaviyo, revue, emailoctopus
    // Please add your ***REMOVED*** file and modify it according to your selection
    provider: 'mailchimp',
  },
  comments: {
    // If you want to use an analytics provider you have to add it to the
    // content security policy in the `next.config.js` file.
    // Select a provider and use the environment variables associated to it
    // https://vercel.com/docs/environment-variables
    provider: 'giscus', // supported providers: giscus, utterances, disqus
    giscusConfig: {
      // Visit the link below, and follow the steps in the 'configuration' section
      // https://giscus.app/
      repo: process***REMOVED***.NEXT_PUBLIC_GISCUS_REPO,
      repositoryId: process***REMOVED***.NEXT_PUBLIC_GISCUS_REPOSITORY_ID,
      category: process***REMOVED***.NEXT_PUBLIC_GISCUS_CATEGORY,
      categoryId: process***REMOVED***.NEXT_PUBLIC_GISCUS_CATEGORY_ID,
      mapping: 'pathname', // supported options: pathname, url, title
      reactions: '1', // Emoji reactions: 1 = enable / 0 = disable
      // Send discussion metadata periodically to the parent window: 1 = enable / 0 = disable
      metadata: '0',
      // theme example: light, dark, dark_dimmed, dark_high_contrast
      // transparent_dark, preferred_color_scheme, custom
      theme: 'light',
      // theme when dark mode
      darkTheme: 'transparent_dark',
      // If the theme option above is set to 'custom`
      // please provide a link below to your custom theme css file.
      // example: https://giscus.app/themes/custom_example.css
      themeURL: '',
      // This corresponds to the `data-lang="en"` in giscus's configurations
      lang: 'en',
    },
  },
  search: {
    provider: 'kbar', // kbar or algolia
    kbarConfig: {
      searchDocumentsPath: 'search.json', // path to load documents to search
    },
    // provider: 'algolia',
    // algoliaConfig: {
    //   // The application ID provided by Algolia
    //   appId: 'R2IYF7ETH7',
    //   // Public API key: it is safe to commit it
    //   apiKey: '599cec31baffa4868cae4e79f180729b',
    //   indexName: 'docsearch',
    // },
  },
}

module.exports = siteMetadata
