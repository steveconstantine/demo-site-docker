require('dotenv').config()

const proxy = require('http-proxy-middleware')

exports.siteMetadata = {
  title: 'Cawdery Digital Consultant Agency',
  siteUrl: 'https://cawdery.co',
  pathPrefix: `/`,
}

exports.plugins = [
  'gatsby-plugin-react-helmet',
  `gatsby-image`,
  `gatsby-plugin-typescript`,
  `gatsby-plugin-sharp`,
  `gatsby-transformer-sharp`,
  `gatsby-transformer-remark`,
  'gatsby-plugin-netlify',
  'gatsby-plugin-netlify-cache',
  {
    resolve: `gatsby-plugin-styled-components`,
    options: {
      displayName: process.env.NODE_ENV === 'development',
    },
  },
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `assets`,
      path: `${__dirname}/src/assets/`,
    },
  },
  {
    resolve: `gatsby-source-contentful`,
    options: {
      spaceId: process.env.CONTENTFUL_SPACE_ID,
      accessToken: process.env.CONTENTFUL_DELIVERY_API_KEY,
      environment: process.env.CONTENTFUL_ENVIRONMENT,
    },
  },
  {
    resolve: 'gatsby-source-shopify',
    options: {
      shopName: 'cleantheocean',
      accessToken: process.env.SHOPIFY_ACCESS_TOKEN
    }
  },
  {
    resolve: `gatsby-plugin-emotion`,
    options: {
      // Accepts all options defined by `babel-plugin-emotion` plugin.
    },
  },
  {
    resolve: 'gatsby-plugin-manifest',
    options: {
      name: 'Narative',
      short_name: 'Narative',
      start_url: '/',
      background_color: '#111216',
      theme_color: '#111216',
      display: 'standalone',
      icon: 'src/assets/favicon/favicon.png',
    },
  },
  {
    resolve: 'gatsby-plugin-robots-txt',
    options: {
      host: 'https://cawdery.co',
      sitemap: 'https://cawdery.co/sitemap.xml',
      policy: [
        { userAgent: '*', disallow: ['/.netlify/', '/articles/preview/'] },
      ],
    },
  },
  {
    resolve: `gatsby-plugin-google-analytics`,
    options: {
      trackingId: 'UA-118232427-1',
    },
  },
  {
    resolve: `gatsby-plugin-facebook-pixel`,
    options: {
      pixelId: '2183075648607369',
    },
  },

  // These are our local plugins that can be found within ./plugins
  'gatsby-transformer-enhance-contentful',
  'gatsby-transformer-contentful-rich-text-html-renderer',
  `gatsby-plugin-twitter`,
]

// For lambda functions
exports.developMiddleware = app => {
  app.use(
    '/.netlify/functions/',
    proxy({
      target: 'http://localhost:9000',
      pathRewrite: {
        '/.netlify/functions/': '',
      },
    })
  )
}
