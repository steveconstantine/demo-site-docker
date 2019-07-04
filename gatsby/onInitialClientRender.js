const globalHistory = require('@reach/router').globalHistory
const throttle = require('lodash/throttle')
const getWindowDimensions = require('../src/utils/index').getWindowDimensions

function handleAccessibilityFocus() {
  const elementsWithA11yFocus = Array.from(
    document.querySelectorAll('[data-a11y]')
  )

  document.addEventListener('keyup', event => {
    elementsWithA11yFocus.forEach(element => {
      if (element === event.target || element.contains(event.target)) {
        element.setAttribute('data-a11y', 'true')
      } else {
        element.setAttribute('data-a11y', 'false')
      }
    })
  })

  // On mouse click change data-a11y attribute false
  document.addEventListener('mousedown', event => {
    elementsWithA11yFocus.forEach(element => {
      if (element === event.target || element.contains(event.target)) {
        element.setAttribute('data-a11y', 'false')
      }
    })
  })
}

/**
 * handleFadeInAndOutOnScroll()
 * Attaches a scroll event listener to the window and will query for each
 * How to use:
 * <Element data-scroll-fade{true} />
 *
 */
function handleFadeInAndOutOnScroll() {
  const clamp = value => Math.min(Math.max(value, 0), 1)

  const handleScroll = throttle(() => {
    const { height } = getWindowDimensions()
    const elements = Array.from(document.querySelectorAll('[data-scroll-fade]'))

    elements.forEach(element => {
      const box = element.getBoundingClientRect()

      if (box.top < height / 3.33) {
        // Fade out the element when it reaches the top 2/3 of the page
        element.style.opacity = clamp(
          (box.top + element.offsetHeight / 1.5) / (height / 3.33)
        )
      } else {
        // Fade in the element from the bottom of the page
        element.style.opacity = clamp((1 - box.top / height) * 1.66)
      }
    })
  }, 15)

  window.addEventListener('scroll', handleScroll)
}

module.exports = () => {
  handleAccessibilityFocus()
  handleFadeInAndOutOnScroll()

  /**
   * This is a workaround for a bug in Gatsby
   * See https://github.com/gatsbyjs/gatsby/issues/8357 for more details
   */
  globalHistory._onTransitionComplete()
}
