import React, { Component, useContext } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { Link, navigate } from 'gatsby'
import AniLink from 'gatsby-plugin-transition-link/AniLink'
import OutsideClickHandler from 'react-outside-click-handler'
import { isMobileOnly } from 'react-device-detect'

import Headroom from 'react-headroom'

import { Section, Logo } from '@components'
import mediaqueries from '@styles/media'
import { ContactContext } from '@components/Contact/Contact.Context'

import Cart from '../../components-ecommerce/Cart'

import InterfaceContext, {
  defaultInterfaceContext
} from '../../context/InterfaceContext'

import shortcuts, { constants, keyToSymbol } from '@shortcuts'

const navLinks = [
  { to: '/', text: 'Home' },
  { to: '/articles', text: 'Articles' },
  { to: '/contact', text: 'Contact' },
]

const animateIn = [
  { width: '15px', transform: 'initial' },
  {
    width: '20px',
    transform: 'translate3d(3px, -2px, 0) rotate(90deg)',
  },
  {
    width: '20px',
    transform: 'translate3d(3px, -2px, 0) rotate(90deg)',
  },
  {
    width: '20px',
    transform: 'translate3d(-3px, -2px, 0) rotate(90deg)',
  },
]

const animateOut = [
  {
    width: '20px',
    transform: 'translate3d(-3px, -2px, 0) rotate(90deg)',
  },
  { width: '15px', transform: 'initial' },
]

const themes = {
  light: {
    color: '#08080b',
    pseudo: 'transparent',
    symbol: {
      color: '#000',
      background: 'rgba(255,255,255,0.3)',
    },
  },
  dark: {
    color: '#fafafa',
    pseudo: 'transparent',
    symbol: {
      color: '#1D2128',
      background: '#dbdbdc',
    },
  },
}

interface NavigationState {
  active: boolean
  previousPath: string
  showPreviousPath: boolean
}

class Navigation extends Component<{}, NavigationState> {
  leftToggle = React.createRef()

  state = {
    active: false,
    previousPath: '',
    showPreviousPath: false,
    shortenCart: false,
  }

  componentDidMount() {
    const previousPath = localStorage.getItem('previousPath')
    this.setState({ previousPath })

    window.addEventListener('keydown', this.handleEscKeyPress)
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    if (typeof window !== 'undefined') {
      const previousPathFromStorage = localStorage.getItem('previousPath')
      const urlsThatUseBackButton = ['/articles/']

      if (prevState.previousPath !== previousPathFromStorage) {
        this.setState({
          previousPath: previousPathFromStorage,
          showPreviousPath: urlsThatUseBackButton.some(
            pathname => window.location.pathname.indexOf(pathname) >= 0
          ),
        })
      }
    }
    return null
  }

  componentWillUnmount() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('keydown', this.handleEscKeyPress)
    }
  }

  handleEscKeyPress = ({ key }) => {
    if (key === 'Escape') {
      this.handleOutsideClick()
    }
    if (key === 'g') {
      if (!this.state.active && !document.getElementById('CommandLineInput')) {
        this.handleToggleClick()
      }
    }
  }

  handleToggleClick = () => {
    const $toggle = this.leftToggle.current
    this.handleShortcutReset()

    this.setState(
      {
        active: !this.state.active,
      },
      () => {
        if (!isMobileOnly) {
          if (this.state.active && $toggle) {
            $toggle.animate(animateIn, {
              duration: 900,
              fill: 'both',
              easing: 'cubic-bezier(0.075, 0.82, 0.165, 1)',
            })
          } else {
            this.handleCloseAnimation()
          }
        }
      }
    )
  }

  handleShortcutReset = () => {
    shortcuts.handleShortcutFeature({ name: constants.ESCAPE })
  }

  handleCloseAnimation = () => {
    const $toggle = this.leftToggle.current

    if ($toggle) {
      $toggle.animate(animateOut, {
        duration: 250,
        fill: 'both',
        easing: 'cubic-bezier(0.075, 0.82, 0.165, 1)',
      })
    }
  }

  handleOutsideClick = () => {
    if (this.state.active) {
      this.handleCloseAnimation()
      this.setState({ active: false })
    }
  }

  navigateOut = (event, path) => {
    event.preventDefault()
    this.handleOutsideClick()

    if (path === '#') return

    if (path === '/') { 
      setTimeout(() => { navigate('/') }, 250)
      return
    }

    setTimeout(() => {
      navigate(path)
    }, 250)
  }

  shortenCart = () => {
    this.setState({ shortenCart: true });
  }


  lengthenCart = () => {
    this.setState({ lengthenCart: false });
  }


  render() {
    const { active, previousPath, showPreviousPath, shortenCart } = this.state
    const { nav } = this.props
    const fill = nav.theme === 'dark' ? '#fafafa' : '#08080b'
    const theme = themes[nav.theme]

    return (
      <ThemeProvider theme={theme}>
        <Headroom onUnpin={this.shortenCart} onPin={this.lengthenCart} onUnfix={this.lengthenCart}>
          <OutsideClickHandler onOutsideClick={this.handleOutsideClick}>
            <NavFixedContainer theme={nav.theme} navFixed={nav.fixed}>
              <Section>
                <NavContainer>
                  <Left>
                      {previousPath && showPreviousPath && (
                        <LogoBack
                          onClick={() => window.history.back()}
                          data-a11y="false"
                        >
                          <BackChevron />
                        </LogoBack>
                      )}
                      <LogoMask>
                        <LogoContainer
                          fade
                          to="/"
                          onClick={this.handleShortcutReset}
                          aria-label="Back home"
                          data-a11y="false"
                        >
                          <Logo fill={fill} onlySymbol={isMobileOnly} />
                        </LogoContainer>
                      </LogoMask>
                      <MainText
                          aria-label="Back home"
                          data-a11y="false"
                          fade
                          to="/">
                        GIFTING WILD<br/><span>Giving opportunity for a healthy ocean.</span>
                      </MainText>
                    </Left>
                    <Right>
                      <ToggleContainer
                        onClick={this.handleToggleClick}
                        aria-label="Mobile Navigation Button"
                        air-expanded={active}
                        aria-haspopup="true"
                        aria-controls="menu-list"
                        data-a11y="false"
                      >
                        <LeftToggle
                          active={active}
                          ref={this.leftToggle}
                          aria-hidden="true"
                        />
                        <RightToggle active={active} aria-hidden="true" />
                      </ToggleContainer>
                      <Nav>
                        <DesktopNavList id="menunav.theme-list">
                          <NavItems
                            active={active}
                            handleClick={this.navigateOut}
                            handleOutsideClick={this.handleOutsideClick}
                          />
                        </DesktopNavList>
                      </Nav>
                      <CartItem>
                        <InterfaceContext.Consumer>
                          {({
                            isDesktopViewport,
                            cartStatus,
                            toggleCart,
                            contributorAreaStatus,
                            toggleContributorArea,
                            productImagesBrowserStatus,
                            currentProductImages,
                            featureProductImage,
                            productImageFeatured,
                            toggleProductImagesBrowser
                          }) => (
                           <Cart
                                theme={nav.theme}
                                isDesktopViewport={isDesktopViewport}
                                status={cartStatus}
                                toggle={toggleCart}
                                shortenCart={shortenCart}
                                contributorAreaStatus={contributorAreaStatus}
                                productImagesBrowserStatus={productImagesBrowserStatus}
                              />
                          )}
                        </InterfaceContext.Consumer>
                      </CartItem>
                    </Right>
                </NavContainer>
              </Section>
            </NavFixedContainer>
          </OutsideClickHandler>
        </Headroom>
      </ThemeProvider>
    )
  }
}

export default Navigation

const NavItems = ({ active, handleClick, handleOutsideClick, color }) => {
  const { toggleContact } = useContext(ContactContext)

  return navLinks.map((nav, index) => {
    const delay = active ? 30 * (navLinks.length - index) : 30 * index

    if (nav.to === '/') {
     return (
        <NavItem key={nav.to}>
          <NavAnchor
            fade
            active={active && nav.to === '/' ? active : undefined}
            disabled={nav.disabled}
            to={nav.to}
            delay={delay}
            tabIndex={active ? 0 : -1}
            onClick={event => handleClick(event, nav.to)}
            data-a11y="false"
          >
            {nav.text}
          </NavAnchor>
        </NavItem>
      )
    }

    if (nav.to === '/contact') {
      return (
        <NavItem key={nav.to}>
          <ContactNavAnchor
            active={active && nav.to !== '/' ? active : undefined}
            disabled={nav.disabled}
            to={nav.to}
            delay={delay}
            tabIndex={active ? 0 : -1}
            onClick={event => {
              event.preventDefault()
              toggleContact(event)
              handleOutsideClick()
            }}
            data-a11y="false"
            getProps={({ isPartiallyCurrent }) =>
              isPartiallyCurrent && nav.to !== "/" ? { ['data-active']: 'true' } : null
            }
          >
            {nav.text}
          </ContactNavAnchor>
        </NavItem>
      )
    }

    return (
      <NavItem key={nav.to}>
        <NavAnchor
          fade
          active={active && nav.to !== '/' ? active : undefined}
          disabled={nav.disabled}
          to={nav.to}
          delay={delay}
          tabIndex={active ? 0 : -1}
          onClick={event => handleClick(event, nav.to)}
          data-a11y="false"
          getProps={({ isPartiallyCurrent }) =>
            isPartiallyCurrent && nav.to !== "/" ? { ['data-active']: 'true' } : null
          }
        >
          {nav.text}
        </NavAnchor>
      </NavItem>
    )
  })
}

const MainText = styled(AniLink)`
  font-size: 3rem;
  font-weight: 700;
  color: #FEFEFE;
  line-height: 0.5;
  text-align: left; 
  padding-top: 3px; 
  margin-bottom: 0;

  &:hover {
    color: #FAFAFA;
  }

  span {
    font-size: 1.5rem;
    font-weight: 400;
  }

  ${mediaqueries.phablet`
    line-height: 0.5;
    font-size: 2.7rem;
    padding-top: 6px;
    span {
      font-size: 1.11rem;
    }
  `};
`

const NavFixedContainer = styled.div`
  width: 100%;
  top: 0;
  left: 0;
  z-index: 10;
  background-color: ${p => (p.theme == 'light' ? '#FAFAFA99' : '#00000066')};
  ${mediaqueries.tablet`
    position: ${p => (p.navFixed ? 'fixed' : 'absolute')};
  `}
`

const NavContainer = styled.div`
  position: relative;
  z-index: 100;
  padding-top: 7.5px;
  display: flex;
  height: 50px;
  width: 95%;
  justify-content: space-between;

  ${mediaqueries.desktop_medium`
    padding-top: 7.5px;
  `};

  ${mediaqueries.tablet`
    width: 85%;
  `}

  @media screen and (max-height: 800px) {
    padding-top: 10px;
  }
`

const LogoBack = styled.button`
  position: absolute;
  left: -44px;
  top: 107px;

  svg {
    transition: transform 0.25s var(--ease-out-quad);
  }

  &:hover svg,
  &:focus svg {
    transform: translateX(-4px);
  }

  &[data-a11y='true']:focus::after {
    content: '';
    position: absolute;
    left: 0;
    top: 1px;
    width: 100%;
    height: 100%;
    border: 2px solid ${p => p.theme.colors.purple};
    background: rgba(255, 255, 255, 0.01);
    border-radius: 5px;
  }

  ${mediaqueries.desktop_medium`
    top: 57px;
    left: -34px;
  `}

  @media screen and (max-height: 800px) {
    top: 67px;
  }

  ${mediaqueries.tablet`
    display: none;
  `}
`

const LogoContainer = styled(AniLink)`
  position: relative;
  transition: filter 0.3s var(--ease-out-quad);
  max-width: 414px;
  display: flex;
  padding: 0 1px;

  &:hover {
    filter: brightness(120%);
  }

  &[data-a11y='true']:focus::after {
    content: '';
    position: absolute;
    left: -10%;
    top: -42%;
    width: 120%;
    height: 200%;
    border: 2px solid ${p => p.theme.colors.purple};
    background: rgba(255, 255, 255, 0.01);
    border-radius: 5px;
  }
`

const LogoMask = styled.div`
  display: flex !important;
  align-items: center;
  flex-direction: row-reverse;
  display: inline-block;
  max-width: 100%;
  padding-right: 2px;

  ${mediaqueries.tablet`
    overflow: hidden;
  `}
`

const ToggleContainer = styled.button`
  position: relative;
  height: 40px;
  width: 40px;
  right: -10px;
  cursor: pointer;

  &[data-a11y='true']:focus::after {
    content: '';
    position: absolute;
    left: 0;
    top: 1px;
    width: 100%;
    height: 100%;
    border: 2px solid ${p => p.theme.colors.purple};
    background: rgba(255, 255, 255, 0.01);
    border-radius: 5px;
  }

  ${mediaqueries.phablet`
    width: 30px;
    height: 30px;
    right: -10px;
  `};
`

const Toggle = styled.span`
  position: absolute;
  right: 10px;
  height: 1px;
  background: ${p => p.theme.color};
  transition: transform 0.4s cubic-bezier(0.075, 0.82, 0.165, 1),
    width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
`

const LeftToggle = styled(Toggle)`
  top: 23px;
  width: ${p => (p.active ? '20px' : '15px')};

  ${mediaqueries.phablet`
    top: 15px;
    width: 15px;
  `};

  &::after {
    content: '';
    position: absolute;
    height: 1px;
    background: ${p => p.theme.pseudo};
    width: 100%;
    bottom: -1px;
    left: 0;
  }
`

const RightToggle = styled(Toggle)`
  top: 17px;
  width: 20px;
  transform: ${p =>
    p.active ? 'translate3d(3px, 4px, 0) rotate(90deg)' : 'initial'};

  ${mediaqueries.phablet`
    top: 9px;
    transform: initial;
  `};

  &::after {
    content: '';
    position: absolute;
    height: 1px;
    background: ${p => p.theme.pseudo};
    width: 100%;
    bottom: -1px;
    left: 0;
  }
`

const Nav = styled.nav``

const Right = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
`


const Left = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: row;
`

const DesktopNavList = styled.ul`
  list-style: none;
  margin: 0;

  ${mediaqueries.tablet`
    display: none;
  `};
`

const NavItem = styled.li`
  display: inline-block;
  margin-right: 50px;

  &:last-child {
    margin-right: 25px;
  }

  ${mediaqueries.tablet`
    margin-right: 40px;

    &:first-child {
      display: none;
    }

    &:last-child {
      margin-right: 30px;
    }
  `};

  ${mediaqueries.phablet`
    display: block;
    margin: 0 auto;

    &:first-child {
      display: block;
    }

    &:last-child {
      margin: 0 auto;
    }
  `};
`

const CommandLineItem = styled.li`
  right: -120px;
  position: absolute;
  display: inline-block;

  ${mediaqueries.desktop_large`
    display: none;
  `};
`

const CartItem = styled.li`
  right: -40px;
  position: absolute;
  display: inline-block;

  ${mediaqueries.desktop_up`
    right: -36.6px;
  `};
`

const NavAnchor = styled(AniLink)`
  display: flex;
  height: 40px;
  align-items: center;
  color: ${p => p.theme.color};
  font-weight: 600;
  font-size: 18px;
  transition: opacity 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.9) ${p => p.delay}ms,
    transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.9) ${p => p.delay}ms;

  pointer-events: ${p => (p.active ? 'initial' : 'none')};
  opacity: ${p => (p.active ? (p.disabled ? 0.15 : 0.888) : 0)};
  transform: ${p => (p.active ? 'translateX(0)' : 'translateX(12px)')};

  &[data-active='true'] {
    &::after {
      content: '';
      position: absolute;
      margin: 0 auto;
      left: 0;
      right: 0;
      bottom: 4px;
      height: 1px;
      width: 20px;
      background: ${p => p.theme.color};
    }
  }

  &:hover {
    opacity: ${p => (p.disabled ? 0.15 : 1)};
    color: #FAFAFA !important;
  }

  &:focus {
    outline: none;
  }

  &[data-a11y='true']:focus::after {
    content: '';
    position: absolute;
    left: -25%;
    top: 2%;
    width: 150%;
    height: 100%;
    border: 2px solid ${p => p.theme.colors.purple};
    background: rgba(255, 255, 255, 0.01);
    border-radius: 5px;
  }

  ${mediaqueries.phablet`
    display: none;
  `};
`

const ContactNavAnchor = styled(Link)`
  display: flex;
  height: 40px;
  align-items: center;
  color: ${p => p.theme.color};
  font-weight: 600;
  font-size: 18px;
  transition: opacity 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.9) ${p => p.delay}ms,
    transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.9) ${p => p.delay}ms;

  pointer-events: ${p => (p.active ? 'initial' : 'none')};
  opacity: ${p => (p.active ? (p.disabled ? 0.15 : 0.888) : 0)};
  transform: ${p => (p.active ? 'translateX(0)' : 'translateX(12px)')};

  &[data-active='true'] {
    &::after {
      content: '';
      position: absolute;
      margin: 0 auto;
      left: 0;
      right: 0;
      bottom: 4px;
      height: 1px;
      width: 20px;
      background: ${p => p.theme.color};
    }
  }

  &:hover {
    opacity: ${p => (p.disabled ? 0.15 : 1)};
    color: #FAFAFA !important;
  }

  &:focus {
    outline: none;
  }

  &[data-a11y='true']:focus::after {
    content: '';
    position: absolute;
    left: -25%;
    top: 2%;
    width: 150%;
    height: 100%;
    border: 2px solid ${p => p.theme.colors.purple};
    background: rgba(255, 255, 255, 0.01);
    border-radius: 5px;
  }

  ${mediaqueries.phablet`
    display: none;
  `};
`

const NavSymbols = styled.a`
  position: relative;
  top: 1px;
  display: flex;
  height: 40px;
  align-items: center;
  color: ${p => p.theme.color};
  font-size: 13px;
  transition: opacity 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.9) ${p => p.delay}ms,
    transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.9) ${p => p.delay}ms;

  pointer-events: ${p => (p.active ? 'initial' : 'none')};
  opacity: ${p => (p.active ? (p.disabled ? 0.15 : 1) : 0)};
  transform: ${p => (p.active ? 'translateX(0)' : 'translateX(-12px)')};

  &:hover {
    opacity: ${p => (p.disabled ? 0.15 : 0.6)};
  }

  &:focus {
    outline: none;
  }

  ${mediaqueries.desktop`
    display: none;
  `}
`

const Symbol = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 16px;
  width: 16px;
  text-align: center;
  border-radius: 2.5px;
  padding: 1px 4px;
  color: ${p => p.theme.symbol.color};
  background: ${p => p.theme.symbol.background};
  font-size: 12px;

  &:not(:last-child) {
    margin-right: 7px;
  }
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
      fill="black"
    />
  </svg>
)
