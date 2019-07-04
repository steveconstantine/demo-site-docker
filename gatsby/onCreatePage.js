'use strict'

module.exports = ({ page, actions }) => {
  const { createPage, deletePage } = actions
  const oldPage = Object.assign({}, page)

  // Rewrite /preview to /articles/preview
  if (page.path === '/preview/') {
    page.path = '/articles/preview/'
  }

  if (page.path !== oldPage.path) {
    // Replace new page with old page
    deletePage(oldPage)
    createPage(page)
  }
}
