const settings = require('../../../src/settings')

/**
 * Preface
 * N.B. Gatsby doesn't really support Graphql fragments because the
 * data is splintered across many many types. I'm going to use
 * template string interpolation which is bad practice,
 * but I can't think of a better way that maintains DRY
 *
 * Also Contentful returns us every locale ever, even if they're null.
 * Since title is a required field on all of our content,
 * I'm doing a not null check on that as part of each filter.
 * If there's a better way, I'm open to it!
 */

/**
 * Basic node data shared by every node whether it's an article, press link or legacy article.
 * If you add to this fragment you have to be sure that every single node has that field
 */
const basicNode = `
  id
  title
  node_locale
  excerpt {
    excerpt
  }
  excerptHtml {
    childRichTextHtml {
      html
    }
  }
  fields {
    postDate(formatString: "MMM. D, YYYY")
    pathPrefix
  }
`

/**
 * We cant use the GatsbyContentfulFixed_withWebp etc. fragments on a non-page query so
 * I'm redoing them with template literals here. I'm using the root package as reference:
 *
 * https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-source-contentful/src/fragments.js
 */
const GatsbyContentfulFixed_withWebp = `
  width
  height
  src
  srcSet
  srcWebp
  srcSetWebp
`

const GatsbyContentfulFluid_withWebp = `
  aspectRatio
  src
  srcSet
  srcWebp
  srcSetWebp
  sizes
`

/**
 * Imagery. I've chosen to render imagery based on component it might be needed in.
 * I've tried to be descriptive about where it will end up being used.
 *
 * Sometimes I'm using underscores for the alias. I'm trying to indicate the page and component.
 * e.g. Home__Hero is for the image in the hero of the homepage.
 *
 * I'm cranking the quality to 100 because a lot of the old legacy imagery
 * is really crappy res already. I don't want to double compress it.
 *
 * Also pulling this from variable to help unify parts of the app. Kinda awkward but best idea I had.
 */
const heroImageryField = `
  hero {
    ${settings.heroImageDimensions.reduce(
      (acc, [name, x, y]) => `
        ${acc}
        ${name}: fluid(maxWidth:${x}, quality: ${
        settings.imageQuality
      }) {
          ${GatsbyContentfulFluid_withWebp}
        }
      `,
      ``
    )}
  }
`

/**
 * Author avatars come in 2 sizes:
 *   * Small 64x64px used for CardPost and other components
 *   * Large 400x400px used for the author slug page
 */
const authorAvatarField = `
  avatar {
    small: fluid(maxWidth: 64, maxHeight: 64, quality: ${
      settings.imageQuality
    }) {
      ${GatsbyContentfulFluid_withWebp}
    }
    large: fluid(maxWidth: 400, maxHeight: 400, quality: ${
      settings.imageQuality
    }) {
      ${GatsbyContentfulFluid_withWebp}
    }
  }
`

const authorFields = `
  id
  name
  title
  slug
  biography {
    childRichTextHtml {
      html
    }
  }
  ${authorAvatarField}
`

const readingTime = `
  readingTime {
    text
    minutes
    words
    time
  }
`

const articlePreview = `
  backgroundImage {
    fluid(maxWidth: 1140, maxHeight: 380, quality: ${settings.imageQuality}) {
      ${GatsbyContentfulFluid_withWebp}
    }
    seo: fixed(width: 1200, height: 630, quality: ${settings.imageQuality}) {
      ${GatsbyContentfulFixed_withWebp}
    }
  }
  backgroundColor
`

/**
 * basicNode + any field that a post like node (modern or legacy) has on it
 */
const articleNode = `
  ${basicNode}
  slug
  shortUrl
  canonical
  featured
  productTag
  publicationDate(formatString: "MMM. D, YYYY")
  updatedAt(formatString: "MMM. D, YYYY")
  ${heroImageryField}
  author {
    ${authorFields}
  }
  fields {
    path
    ${readingTime}
  }
  body {
    childRichTextHtml {
      html
    }
  }
  disqusShortName
  buyMeACoffeeId
  ${articlePreview}
`

/**
 * Get articles
 *
 * @param {number} limit Number of posts you want to return
 * @param {boolean} featured Do you want featured posts or not. Undefined will return featured AND unfeatured
 *
 * @returns {object} Gatsby style GraphQL query with a key of posts {data: { posts: {edges: [ ... ]}}}
 */
module.exports.articles = `
  query GetArticles($featured: Boolean) {
    articles: allContentfulArticle(
      filter: { featured: {eq: $featured}, title: {ne: null} },
      sort: {fields: [publicationDate], order: DESC}
    ) {
      edges {
        node {
          ${articleNode}
        }
      }
    }
  }
`

module.exports.authors = `
  query GetAuthors($locale: String) {
    posts: allContentfulAuthor(
      filter: { node_locale: {eq: $locale}, name: {ne: null}, fullBiography: {fullBiography: {ne:null}} }
    ) {
      edges {
        node {
          ${authorFields}
          node_locale
        }
      }
    }
  }
`
