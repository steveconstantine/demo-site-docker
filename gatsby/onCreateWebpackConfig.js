'use strict'

const path = require('path')

module.exports = ({ actions, getConfig, stage }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        '@components': path.resolve(__dirname, '../src/components/'),
        '@styles': path.resolve(__dirname, '../src/styles/'),
        '@utils': path.resolve(__dirname, '../src/utils/'),
        '@typings': path.resolve(__dirname, '../src/typings/'),
        '@shortcuts': path.resolve(__dirname, '../src/shortcuts/'),
        '@store': path.resolve(__dirname, '../src/store/'),
      },
      extensions: ['.js', '.json', '.ts', '.tsx'],
    },
  })

  /**
   * This is tailored specifically to Netlify as their deployment process suggests
   * avoiding all cache-busting filenames.
   *
   * Gatsby issue covering the topic with replies from Netlify staff
   * https://github.com/gatsbyjs/gatsby/issues/11961
   *
   * Netlify explanation about their caching process
   * https://www.netlify.com/blog/2017/02/23/better-living-through-caching/
   */
  if (stage === 'build-javascript') {
    const newWebpackConfig = {
      ...getConfig(),
      output: {
        filename: `[name].js`,
        chunkFilename: `[name].js`,
        path: getConfig().output.path,
        publicPath: getConfig().output.publicPath,
      },
    }

    actions.replaceWebpackConfig(newWebpackConfig)
  }
}
