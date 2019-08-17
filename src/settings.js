/**
 * Isomorphic settings file (hence not typescript and commonjs notation)
 */

module.exports.urls = {
  authors: 'authors',
  articles: 'articles',
  collections: 'collections',
  products: 'products',
  netlify: {
    preview: '/.netlify/functions/preview',
  },
  linkedin: 'https://www.linkedin.com/company/giftingwild',
  instagram: 'http://instagram.com/giftingwild.com',
  twitter: 'https://twitter.com/giftingwild',
  facebook: 'https://www.facebook.com/giftingwild.com',
}

module.exports.imageQuality = 100

/**
 * What size do we want to cut hero images to?
 */
module.exports.heroImageDimensions = [
  ['CardPreview', 1200, 680],
  ['Article__Featured', 1200, 825],
  ['Article__Hero', 3200, 2200],
]
