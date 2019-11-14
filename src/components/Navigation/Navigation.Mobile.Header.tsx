import React from 'react'
import styled from 'styled-components'
import AniLink from 'gatsby-plugin-transition-link/AniLink'

import SocialLinks from '@components/SocialLinks'
import mediaqueries from '@styles/media'

const footerLinks = [
  { to: '/', text: 'Home' },
  { to: '/articles', text: 'Articles' },
  { to: '/contact', text: 'Contact' },
]

/**
 * The fixed navigation sitting "behind" the mobile version of giftingwild.com
 * All the link functionality is taken over by the passed in navigateOut()
 * function that delays and allows us to animate between states.
 *
 * @param navigateOut
 */
const NavigationMobile = ({
  active,
  navigateOut,
}: {
  active: boolean
  navigateOut: (Event, string) => void
}) => {
  const isActive = active ? active : undefined

  return (
  <>
    <Frame active={isActive}>
      <InnerFrame active={isActive}/>
        <SocialIconsHeader active={isActive}>
          <SocialLinks fill="#fff" />
        </SocialIconsHeader>
        <HorizontalRule active={isActive} />
        <MobileLinks active={isActive}>
          {footerLinks.map((link, index) => {
          if (link.to === "/") {
            return (
              <StyledLink
                  active={ link.to === "/" ? isActive : undefined }
                  key={link.to}
                  index={index}
                  to={link.to}
                  onClick={event => navigateOut(event, link.to)}
                  getProps={({ isPartiallyCurrent }) =>
                    isPartiallyCurrent ? { ['data-active']: 'false' } : null
                  }
                >{link.text}
              </StyledLink>
            )
          }
            return (
              <StyledLink
                  fade
                  active={ isActive ? isActive : undefined}
                  key={link.to}
                  index={index}
                  to={link.to}
                  onClick={event => navigateOut(event, link.to)}
                  getProps={({ isPartiallyCurrent }) =>
                    isPartiallyCurrent ? { ['data-active']: 'true' } : null
                  }
                >{link.text}
              </StyledLink>
          )})}
        </MobileLinks>
    </Frame>
  </>
  )
}

export default NavigationMobile

const Frame = styled.nav`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 0;
  padding: 80px 0;
  height: 100vh;
  background: url("http://images.ctfassets.net/j2t3naiy5hbn/5JmhIGLQtNff7f2vX75k00/f1c911fc2db738c1850cfca392743c52/73127235_431656320818214_7937070713712672768_n.jpg?w=1024&h=1377&q=100");
  transition: background 0s ${p => (p.active ? '0' : '0.5s')};
  background-size: cover;
  background-position: 40% center;

  @media screen and (max-height: 700px) {
    padding: 40px 0;
  }

  ${mediaqueries.desktop_up`
    display: none;
    visibility: hidden;
  `}
`

const InnerFrame = styled.div`
  position: fixed;
  left: 0;
  top: -80px;
  width: 100%;
  z-index: 0;
  padding: 80px 0;
  height: calc(100vh + 80px);
  background: #08080b;
  opacity: ${p => (p.active ? '0' : '1')};
  transition: opacity 0.5s ease-in-out;
`;

const SocialIconsHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 60px;
  z-index: 6;

  opacity: ${p => (p.active ? 1 : 0)};
  transform: translateY(${p => (p.active ? 0 : -12)}px);
  transition: all 0.5s var(--ease-out-quad) 100ms;

  @media screen and (max-height: 700px) {
    margin-bottom: 40px;
  }
`

const HorizontalRule = styled.hr`
  border: none;
  height: 1px;
  background: rgba(255, 255, 255, 0.25);
  margin: 0 40px 65px;

  opacity: ${p => (p.active ? 1 : 0)};
  transform: scaleX(${p => (p.active ? 1 : 0.6)});
  transition: transform 0.5s var(--ease-out-quad), opacity 0.4s ease-out;

  @media screen and (max-height: 700px) {
    margin: 0 40px 25px;
  }
`

const MobileLinks = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 6;
`

const StyledLink = styled(AniLink)`
  position: relative;
  font-size: 22px;
  color: #fff;
  display: inline-block;
  margin: 0 auto;
  text-align: center;
  z-index: 6;

  opacity: ${p => (p.active ? 1 : 0)};
  transform: translateY(${p => (p.active ? 0 : -10)}px);
  transition: all 0.5s cubic-bezier(0.32, 0.08, 0.24, 1)
    ${p => p.index * 28 + 175}ms;

  &[data-active='true'] {
    color: #73737d;
  }

  padding: 15px;
  margin-bottom: 5px;

  @media screen and (max-height: 700px) {
    margin-bottom: 0;
  }
`
