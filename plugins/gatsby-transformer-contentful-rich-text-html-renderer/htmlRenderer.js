const { BLOCKS, INLINES } = require('@contentful/rich-text-types')
const documentToHtmlString = require('@contentful/rich-text-html-renderer')
  .documentToHtmlString
var md = require('markdown-it')()
const icons = require('./icons')

// Options used in the documentToHtmlString renderer
const highlightCode = require('./prism/highlight-code.js')
var Prism = require('prismjs')
// require('prismjs/plugins/keep-markup/prism-keep-markup.js')

function htmlEntities(str) {
  if (typeof str !== 'string') return str

  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

module.exports.HTMLRendererOpts = {
  renderNode: {
    [INLINES.HYPERLINK]: node => {
      // Adding external links default to links in articles
      if (node.nodeType === 'hyperlink') {
        return `<a href=${
          node.data.uri
        } target="_blank" rel="noopener">${documentToHtmlString(node)}</a>`
      }
    },
    [INLINES.EMBEDDED_ENTRY]: node => {
      if (!node.data.target.fields) return null

      let { text } = node.data.target.fields
      const contentfulId = node.data.target.sys.contentType.sys.id

      if (contentfulId === 'highlight' && typeof text === 'string') {
        md.renderer.rules.paragraph_open = () => '<highlight>'
        md.renderer.rules.paragraph_close = () => '</highlight>'

        const html = md.render(text)
        return `${html}</highlight>`
      }
    },
    [BLOCKS.EMBEDDED_ENTRY]: node => {
      if (!node.data.target.fields) return null

      let {
        align,
        showDescription,
        withShadow,
        image,
        text,
        id,
      } = node.data.target.fields
      const contentfulId = node.data.target.sys.contentType.sys.id

      if (contentfulId === 'code') {
        const code = `var data = 1; \
        var data = 1; \
        var data = 1;`

        const higlighted = Prism.highlight(
          code,
          Prism.languages.javascript,
          node.data.target.fields.language.en.toLowerCase()
        )

        return `
          <pre class="language-js">
            <code class="language-js">
              ${higlighted}
            </code>
          </pre>
        `

        return Prism.highlight(
          code,
          Prism.languages.javascript,
          node.data.target.fields.language.en.toLowerCase()
        )
      }

      if (id && id.en && contentfulId === 'embed') {
        return `
          <twitter twitterId="${id.en}"></twitter>
        `
      }

      if (text && text.en && contentfulId === 'pullQuote') {
        return `
          <blockquote class="pull__quote">${text.en}</blockquote>
        `
      }

      if (image && (image.en || image.sys) && contentfulId === 'articleImage') {
        let fields = image.fields || image.en.fields
        let { file, title, description } = fields

        // Sometimes the file and filename exist outside of a locale (I don't know why! Previews are an example)
        // So here we just reprogram file to either be _just_ file or the en locale version of file
        file = file.en || file
        // Same goes for the other values
        title = title.en || title
        align = align.en || align

        withShadow = (withShadow && withShadow.en) || withShadow
        showDescription =
          (showDescription && showDescription.en) || showDescription
        description = (description && (description.en || description)) || null

        // Alt is either the title or the filename (if title is missing). Assumes en (wrong)
        const src = file.url
        const className = align.toLowerCase()
        const caption = htmlEntities(description)

        // Make the img tag that will be returned either way
        const img = `<img src="${src}" alt="${caption}" class="image__${className} ${
          withShadow ? 'image__with_shadow' : ''
        }" />`

        const figcaption = `<figcaption>${
          showDescription ? caption : ''
        }</figcaption>`

        // If there is a description, then we want to render that as a <caption>
        if (caption) {
          return `
          <figure>
            ${img}
            ${figcaption}
          </figure>
        `
        } else {
          return img
        }
      }

      if (contentfulId === 'callToAction') {
        let {
          heading,
          subheading,
          primaryCallToAction,
          secondaryCallToAction,
        } = node.data.target.fields

        heading = heading.en || heading
        subheading = subheading.en || subheading
        primaryCallToAction = primaryCallToAction.en || primaryCallToAction
        secondaryCallToAction =
          secondaryCallToAction.en || secondaryCallToAction

        function createLink(link) {
          if (link.fields) {
            let { text, url, icon } = link.fields
            text = text.en || text
            url = url.en || url
            icon = icon.en || icon

            const i = icons[icon]

            return text
              ? `<a href="${url}" target="_blank">${i + text}</a>`
              : ''
          }
          return ''
        }

        return `
          <div class="CallToAction">
            <div class="CallToAction__content">
              <h3>${heading}</h3>
              ${subheading && `<p>${subheading}</p>`}
              <div class="CallToAction__links">
                ${createLink(primaryCallToAction)}
                ${createLink(secondaryCallToAction)}
              </div>
            </div>
          </div>
          `
      }
    },
    [BLOCKS.EMBEDDED_ASSET]: (node, next) => {
      // todo : handle other assets
      // todo : lazy load these images

      if (!node.data.target.fields) return null
      let { file, title, description } = node.data.target.fields

      // Sometimes the file and filename exist outside of a locale (I don't know why! Previews are an example)
      // So here we just reprogram file to either be _just_ file or the en locale version of file
      file = file.en || file
      // Same goes for the other values
      title = title.en || title
      description = (description && (description.en || description)) || null

      // Alt is either the title or the filename (if title is missing). Assumes en (wrong)
      const alt = title || file.fileName
      const src = file.url

      // Caption is the description.
      const caption = htmlEntities(description)

      // Make the img tag that will be returned either way
      const img = `<img src="${src}" alt="${alt}" />`

      // If there is a description, then we want to render that as a <caption>
      if (caption) {
        return `
          <figure>
            ${img}
            <figcaption>${caption}</figcaption>
          </figure>
        `
      } else {
        return img
      }
    },
  },
}
