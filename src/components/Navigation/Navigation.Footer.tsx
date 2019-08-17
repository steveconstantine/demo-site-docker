import React, { useContext } from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

import Section from '@components/Section'
import SocialLinks from '@components/SocialLinks'
import Logo from '@components/Logo'
import { ContactContext } from '@components/Contact/Contact.Context'

import mediaqueries from '@styles/media'
import shortcuts, { constants } from '@shortcuts'

const footerLinks = [
  { to: '/careers', text: 'Careers' },
  { to: '/labs', text: 'Labs' },
  { to: '/articles', text: 'Articles' },
  { to: '/contact', text: 'Contact' },
]

function handleShortcutReset() {
  shortcuts.handleShortcutFeature({ name: constants.ESCAPE })
}

/**
 * The sites Footer is basic right now. But we have to account for light or
 * dark backgrounds. Therefore, if you pass in dark or light mode it will
 * render accordinly!
 */
const Footer = ({ mode = 'dark' }: { mode?: string }) => {
  const { toggleContact } = useContext(ContactContext)
  const color = mode === 'dark' ? '#fff' : '#000'
  const transparentColor =
    mode === 'dark' ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)'

  return (
    <Section narrow>
      <Frame color={color}>
        <CopyRight>© {new Date().getFullYear()} Gifting-Wild Studio Inc.</CopyRight>
        <Left color={color}>
          <LogoContainer to="/" data-a11y="false">
            <Logo fill={color} onlySymbol />
          </LogoContainer>
          <SocialIconsFooter>
            <SocialLinks fill={transparentColor} />
          </SocialIconsFooter>
        </Left>
        <Right>
          {footerLinks.map(link => {
            if (link.to === '/contact') {
              return (
                <FooterLink
                  key={link.to}
                  color={color}
                  onClick={event => {
                    event.preventDefault()
                    toggleContact(event)
                  }}
                  to={link.to}
                  data-a11y="false"
                  getProps={({ isPartiallyCurrent }) =>
                    isPartiallyCurrent ? { ['data-active']: 'true' } : null
                  }
                >
                  {link.text}
                </FooterLink>
              )
            }

            return (
              <FooterLink
                key={link.to}
                color={color}
                to={link.to}
                data-a11y="false"
                getProps={({ isPartiallyCurrent }) =>
                  isPartiallyCurrent ? { ['data-active']: 'true' } : null
                }
                onClick={handleShortcutReset}
              >
                {link.text}
              </FooterLink>
            )
          })}
        </Right>
      </Frame>
    </Section>
  )
}

export default Footer

const Frame = styled.footer`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 115px 0 55px;

  ${mediaqueries.tablet`
    justify-content: center;
    flex-direction: column-reverse;
    padding: 80px 0;
    margin-top: 65px;

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 1px;
      background: ${p => p.color};
      opacity: 0.3;
    }
  `};
`

const Left = styled.div`
  display: flex;

  ${mediaqueries.tablet`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 60px;
    opacity: 1;
  `};

  svg path {
    transition: fill 0.3s cubic-bezier(0.3, 0.46, 0.45, 0.9);
  }

  a:hover svg path {
    fill: ${p => p.color};
  }
`

const Right = styled.div`
  display: flex;
  align-items: center;

  ${mediaqueries.tablet`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 60px;
  `};

  ${mediaqueries.phablet`
    width: 100%;
  `}
`

const LogoContainer = styled(Link)`
  position: relative;
  opacity: 0.3;
  transition: opacity 0.3s cubic-bezier(0.3, 0.46, 0.45, 0.9);

  &:hover {
    opacity: 1;
  }

  ${mediaqueries.tablet`
    display: none;
  `}

  &[data-a11y='true']:focus::after {
    content: '';
    position: absolute;
    left: -50%;
    top: -10%;
    width: 200%;
    height: 120%;
    border: 2px solid ${p => p.theme.colors.purple};
    background: rgba(255, 255, 255, 0.01);
    border-radius: 5px;
  }
`

const SocialIconsFooter = styled.div`
  display: flex;
  align-items: center;
  margin-left: 50px;

  ${mediaqueries.desktop`
    margin-left: 35px;
  `};

  ${mediaqueries.tablet`
    margin: 0 auto;
  `}
`

const FooterLink = styled(Link)`
  position: relative;
  font-weight: 600;
  font-size: 18px;
  color: ${p => p.color};
  transition: opacity 0.3s cubic-bezier(0.3, 0.46, 0.45, 0.9);

  &[data-active='true'] {
    &::after {
      content: '';
      position: absolute;
      margin: 0 auto;
      left: 0;
      right: 0;
      bottom: -5px;
      height: 1px;
      width: 20px;
      background: ${p => p.color};
    }
  }

  &:hover {
    opacity: 0.6;
  }

  &[data-a11y='true']:focus::after {
    content: '';
    position: absolute;
    left: -10%;
    top: -5%;
    width: 120%;
    height: 120%;
    border: 2px solid ${p => p.theme.colors.purple};
    background: rgba(255, 255, 255, 0.01);
    border-radius: 5px;
  }

  &:not(:last-child) {
    margin-right: 60px;
  }

  ${mediaqueries.desktop`
    &:not(:last-child) {
      margin-right: 35px;
    }
  `};

  ${mediaqueries.tablet`
    font-weight: 400;
    opacity: 1;
    font-size: 22px;

    &:hover {
      opacity: 1;
    }

    &:not(:last-child) {
      margin: 0 auto 35px;
    }
  `}
`

const CopyRight = styled.div`
  color: ${p => p.theme.colors.grey};
  text-align: center;

  ${mediaqueries.desktop_up`
    display: none;
  `}
`
