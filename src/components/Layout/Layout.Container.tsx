import React, { Component } from 'react'
import styled from 'styled-components'
import { navigate } from 'gatsby'
import Swipeable from 'react-swipeable'
import throttle from 'lodash/throttle'

import NavigationDesktop from '@components/Navigation/Navigation.Header'
import NavigationMobile from '@components/Navigation/Navigation.Mobile.Header'
import Footer from '@components/Navigation/Navigation.Footer'

import { calculateStyles } from './Layout.Hero.Mobile'
import { GoToIcon } from '../../icons/ui'

import mediaqueries from '@styles/media'

import {
  clamp,
  getBreakpointFromTheme,
  getWindowDimensions,
  scrollable,
} from '@utils'

interface LayoutProps {
  background?: string
  nav: {
    fixed?: boolean
    offset?: boolean
    theme?: string
  }
  withFooter?: boolean
}

interface LayoutState {
  active: boolean
  mobileNavOffset: number
  position: number
  element: string | HTMLElement
  mask: boolean
  previousPath: string
  showPreviousPath: boolean
}

const MOBILE_NAV_DURATION = 500
const MOBILE_NAV_OFFSET = 576
const MOBILE_NAV_OFFSET_SHORT = 420

class LayoutContainer extends Component<LayoutProps, LayoutState> {
  static defaultProps = {
    nav: {
      theme: 'light',
      offset: true,
      fixed: true,
      low: false,
    },
    footer: {
      visible: false,
      theme: 'dark',
    },
  }

  container = React.createRef()

  state = {
    active: false,
    element: 'placeholder',
    mobileNavOffset: 0,
    position: 0,
    mask: false,
    previousPath: '',
    showPreviousPath: false,
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize)

    window.addEventListener('beforeunload', () => {
      window.localStorage.setItem('previousPath', '')
    })

    if (this.props.nav.fixed && !this.props.nav.isContactPage) {
      window.addEventListener('scroll', this.handleScroll)

      this.setState({
        element: document.querySelector('[data-component="hero-mobile"]'),
      })
    }
  }

  componentWillUnmount() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.handleResize)

      if (this.props.nav.fixed && !this.props.nav.isContactPage) {
        window.removeEventListener('scroll', this.handleScroll)
      }
    }
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    if (typeof window !== 'undefined') {
      const previousPathFromStorage = localStorage.getItem('previousPath')
      const urlsThatUseBackButton = [{ path: '/articles', checkNest: true }]
      const currentPath = window.location.pathname
      const isNestedRoute = currentPath.split('/')[2]

      if (prevState.previousPath !== previousPathFromStorage) {
        this.setState({
          previousPath: previousPathFromStorage,
          showPreviousPath: urlsThatUseBackButton.some(rule => {
            const nest = rule.checkNest ? isNestedRoute : true
            return nest && currentPath.indexOf(rule.path) >= 0
          }),
        })
      }
    }
    return null
  }

  handleScroll = throttle(() => {
    this.setState({ position: clamp(window.pageYOffset, 0, 1000) })
  }, 30)
  /**
   * If the user were to resize their browser window to be larger
   * than our tablet breakpoint, the layout would reflow to a different
   * navigation system. Therefore, if we detect the mobile nav is open
   * and it's now behing handled by desktop we should close it and
   * pretend like nothing ever happened.
   */
  handleResize = throttle(() => {
    const { width } = getWindowDimensions()
    const tablet = getBreakpointFromTheme('tablet')

    // If it's greater than tablet and current open, close it!
    if (width > tablet && this.state.active) {
      this.closeMobileNav()
    }
  }, 30)

  /**
   * When we close the mobile nav we have to play a small trick
   * on the user to make it feel like the page transition is keeping state.
   * To do that, we put a Mask over the page content to make it
   * feel smoother and more enjoyable.
   */
  closeMobileNav = () => {
    this.setState({
      active: false,
      mobileNavOffset: 0,
    })

    // Don't forget to enable scrolling once the nav is closed!
    setTimeout(() => {
      scrollable('enable')
    }, MOBILE_NAV_DURATION)
  }

  /**
   * Since the mobile nav vertically offests the entire page we want to
   * ensure the page is still useable
   */
  openMobileNav = () => {
    const { height } = getWindowDimensions()
    const mobileNavOffset =
      height < 700 ? MOBILE_NAV_OFFSET_SHORT : MOBILE_NAV_OFFSET

    // Open the nav at the calculated offset, and then disable scrolling
    this.setState({ active: true, mobileNavOffset }, () =>
      scrollable('disable')
    )
  }

  /**
   * We're hijacking the <Link to="/path" /> functionality here. When a user
   * taps a link we prvent default, close the nav, apply the mask, and _then_
   * finally navigate to the new page.
   */
  navigateOut = (event, path) => {
    event.preventDefault()
    const pathname = window.location.pathname
    console.log('path');
    console.log(path);
    const isNavigatingToNewPage =
    !pathname.includes(path) || pathname.split('/')[2]

    // Nav closes
    this.closeMobileNav()

    // If it's a newly selected page, apply the mask and then wait wait a few ms
    if (isNavigatingToNewPage || path == '/') {
      this.setState({ mask: true })

      setTimeout(() => {
        navigate(path)
      }, MOBILE_NAV_DURATION)
    }
  }

  render() {
    const { background, children, nav, footer, paddingBottom } = this.props
    const {
      active,
      mask,
      mobileNavOffset,
      position,
      previousPath,
      showPreviousPath,
    } = this.state
    const navTheme = nav.theme


    return (
      <>
        <NavigationMobile active={active} navigateOut={this.navigateOut} />
        <Swipeable onSwipedUp={this.closeMobileNav}>
          <SiteContainer
            active={active}
            background={background}
            navOffset={nav.offset}
            low={nav.low}
            mobileNavOffset={mobileNavOffset}
            onClick={active ? this.closeMobileNav : () => {}}
            theme={navTheme}
            ref={this.container}
            paddingBottom={paddingBottom}
          >
            <main>
              {/*
               * This mobile navigation has to be within the main SiteContainer because
               * it's absolutely positioned and needs the relative parent to properly
               * animate opened and closed
               */}

              <MobileScroll fixed={nav.fixed} style={calculateStyles(position)}>
                <MobileMenu
                  fixed={nav.fixed}
                  active={active}
                  onClick={() => this.openMobileNav() }
                  aria-label="Mobile Navigation Button"
                >
                    <>
                      <LeftToggle active={active} theme={navTheme} />
                      <RightToggle active={active} theme={navTheme} />
                    </>
                </MobileMenu>
                {/* The desktop navigation also sits in the SiteContainer */}
                <NavigationDesktop nav={nav} theme={navTheme} />
              </MobileScroll>

              {/**
               * Finally, this Mask is only applied when navigation to a new page. It's how
               * we're able to make it feel smooth between mobile navigations
               */}
              <MaskMobile shouldMask={mask} theme={navTheme} />

              {/*The rest of the site lives in children!*/}
              {children}
              {footer.visible && <Footer mode={footer.theme} />}
            </main>
          </SiteContainer>
        </Swipeable>
      </>
    )
  }
}

export default LayoutContainer

const BackIconX = styled.div`
  display: block;
  position: relative;
  width: 128px;
  color: white;
`


const SiteContainer = styled.div`
  position: ${p => (p.active || p.mask ? 'fixed' : 'relative')};
  background: ${p =>
    p.background ||
    `linear-gradient(180deg, #08080b 0%, #0b0b0e 44.18%, #111216 100%)`};
  background-size: cover;
  background-position: top center;
  overflow-x: hidden;
  padding-bottom: ${p => (p.paddingBottom == true ? '265%' : '0')};
  min-height: 100vh;
  z-index: 5;

  ${p =>
    p.navOffset &&
    ` padding-top: 0;
  `};

  ${p =>
    p.navOffset &&
    mediaqueries.tablet`
      padding-top: 60px;
  `};

  ${mediaqueries.tablet`
    transform: ${p =>
      p.active ? `translateY(${p.mobileNavOffset}px)` : 'none'};
    transition: transform ${MOBILE_NAV_DURATION +
      60}ms cubic-bezier(0.52, 0.16, 0.24, 1);
    width: 100vw;
    touch-action: ${p => (p.active ? 'none' : 'initial')};
    padding-bottom: ${p => (p.paddingBottom == true ? '165%' : '0')};
  `}

   ${mediaqueries.phablet`
    padding-bottom: ${p => (p.paddingBottom == true ? '80%' : '5%')};
  `}

  &::after {
    content: '';
    position: absolute;
    top: ${p => (p.low ? '10px' : '-20px')};
    left: 0;
    width: 100%;
    height: 1px;
    background: ${p => (p.theme !== 'dark' ? '#fafafa' : '#08080b')};
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    box-shadow: 0px -20px 40px rgba(0, 0, 0, 0.2);
  }

  &::before {
    content: '';
    position: absolute;
    top: ${p => (p.low ? '11px' : '-21px')};
    left: 0;
    right: 0;
    margin: 0 auto;
    width: calc(100vw - 40px);
    height: 1px;
    background: radial-gradient(
      174px at 50.14% 100.05%,
      rgba(255, 255, 255, 0.25) 0%,
      rgba(255, 255, 255, 0.02) 100%
    );
  }
`


const MobileMenu = styled.button`
  position: ${p => (p.fixed ? 'fixed' : 'absolute')};
  z-index: 999;
  width: 30px;
  height: 30px;
  top: 15px;
  right: 55px;
  opacity: ${p => (p.active ? 0.5 : 1)};
  transition: transform 0.4s cubic-bezier(0.075, 0.82, 0.165, 1);

  &::before {
    content: '';
    position: absolute;
    width: 200%;
    height: 200%;
    left: -80%;
    top: -50%;
  }

  ${mediaqueries.tablet`
    right: 13.5vw;
  `}

  ${mediaqueries.phablet`
    right: 55px;
  `}

  ${mediaqueries.desktop_up`
    display: none;
    visibility: hidden;
  `}
`

const MobileHamburger = styled.button`
  position: ${p => (p.fixed ? 'fixed' : 'absolute')};
  z-index: 999;
  width: 128px;
  height: 30px;
  top: 46px;
  right: calc(12vw - 28px);
  padding-bottom: 5px;
  opacity: ${p => (p.active ? 0.5 : 1)};
  transition: transform 0.4s cubic-bezier(0.075, 0.82, 0.165, 1);

  &::before {
    content: '';
    position: absolute;
    width: 200%;
    height: 200%;
    left: -80%;
    top: -50%;
  }

  ${mediaqueries.desktop_up`
    display: none;
    visibility: hidden;
  `}
`

const MobileShop = styled.button`
  position: ${p => (p.fixed ? 'fixed' : 'absolute')};
  z-index: 999;
  width: 128px;
  height: 30px;
  top: 46px;
  right: calc(88px + 12vw);
  padding-bottom: 5px;
  opacity: ${p => (p.active ? 0.5 : 1)};
  transition: transform 0.4s cubic-bezier(0.075, 0.82, 0.165, 1);

  &::before {
    content: '';
    position: absolute;
    width: 200%;
    height: 200%;
    left: -80%;
    top: -50%;
  }

  ${mediaqueries.desktop_up`
    display: none;
    visibility: hidden;
  `}
`


const Toggle = styled.span`
  position: absolute;
  right: 10px;
  height: 1px;
  transition: transform 0.4s cubic-bezier(0.075, 0.82, 0.165, 1),
    width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
`

const LeftToggle = styled(Toggle)`
  color: ${p => (p.theme == 'dark' ? '#fafafa' : '#08080b')};
  top: 15px;
  width: ${p => (p.active ? '20px' : '15px')};
`

const RightToggle = styled(Toggle)`
  width: 20px;
  top: 9px;
  transform: initial;
`

const MaskMobile = styled.div`
  opacity: ${p => (p.shouldMask ? 1 : 0)};
  transition: opacity 0.5s linear;
  pointer-events: none;

  ${mediaqueries.tablet`
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background: ${p => (p.theme !== 'dark' ? '#08080b' : '#fff')};
    z-index: 9;
  `}
`

const MobileScroll = styled.div`
  ${mediaqueries.tablet`
  position: ${p => (p.fixed ? 'fixed' : 'absolute')};

    width: 100%;
    top: 0;
    left: 0;
    z-index: 10;
  `}
`

const BackChevron = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15.41 16.09L10.83 11.5L15.41 6.91L14 5.5L8 11.5L14 17.5L15.41 16.09Z"
      fill="white"
    />
  </svg>
)
