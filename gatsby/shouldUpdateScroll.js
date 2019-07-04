module.exports = ({ routerProps, prevRouterProps, getSavedScrollPosition }) => {
  const currentPosition = getSavedScrollPosition(routerProps.location)
  const topOfPage = [0, 0]
  const paginatedPages = ['/articles']
  /**
   * Check that the previous page was a paginated page, because we want to go
   * to the top of the page if the user clicks on research or announcments. If
   * the previous page is a paginated one we want to stay at the location instead
   * of navigating ot the top.
   */
  const previousLocation =
    (prevRouterProps && prevRouterProps.location.pathname) || ''
  const nextLocation = (routerProps && routerProps.location.pathname) || ''

  /**
   * We need to check that path the current and next page that is being navigated
   * to has pagination. If they both have pagination, then we want to keep the
   * scroll position so the user doesn't get thrown to the the top of the page.
   */
  const checkIfLocationHasPagination = (location, pathname) => {
    const pathParts = location.split('/')

    // Does it have page in the URL? Is it one of the pagination pages?
    return (
      pathParts[2] === 'page' ||
      pathParts[3] === 'page' ||
      location === pathname ||
      location.replace(/\/$/, '') === pathname
    )
  }

  const applyPaginationScrollPosition = paginatedPages.some(pathname => {
    const previousPageIsPaginated = checkIfLocationHasPagination(
      previousLocation,
      pathname
    )
    const nextPageIsPaginated = checkIfLocationHasPagination(
      nextLocation,
      pathname
    )

    return previousPageIsPaginated && nextPageIsPaginated
  })

  // Default to top of page
  let previousPosition = topOfPage

  if (prevRouterProps) {
    previousPosition = getSavedScrollPosition(prevRouterProps.location)
  }

  /**
   * There are pages in MC that have pagination on them. For example, /research
   * has pagination in the middle of the page. When a user clicks through pagination
   * we want to make sure the page doesn't go to the top on each action so we check
   * some logic to ensure they are still at the same scroll position
   */
  if (applyPaginationScrollPosition) {
    window.scrollTo(...previousPosition)

    /**
     * When a user navigates using the "<- Back" button that replaces the logo we want
     * to take the user back to the previous location instead of the default top of page.
     * This also comes into play if they swipe back or click the browser back button
     */
  } else if (routerProps.location.action === 'POP') {
    window.scrollTo(...currentPosition)

    /**
     * Finally, for all other cases, take the user back to the top of the page because
     * we don't know if it's paginated or they navigated using the back button.
     */
  } else {
    window.scrollTo(...topOfPage)
  }

  // Handling previous path into local storage for "Back" arrow button
  if (prevRouterProps) {
    window.localStorage.setItem(
      'previousPath',
      prevRouterProps.location.pathname
    )
  }

  return false
}
