import styled from 'styled-components'

import mediaqueries from '@styles/media'

const Section = styled.section<{
  relative?: string
  hideOnDesktop?: boolean
  hideOverflow?: boolean
  narrow?: boolean
  wide?: boolean
  minimal?: boolean
  fullwidth? : boolean
}>`
  position: ${p => (p.relative ? 'relative' : 'static')};
  width: 100%;
  max-width: ${p => (p.fullwidth ? '100vw !important' : '1220px')};
    margin: 0 auto;
  padding: ${p => (p.wide ? '0' : '0 1rem')};
  background: ${p =>
    p.background === 'dark' ? p.theme.colors.bg : 'transparent'};
  display: ${p => (p.hideOnDesktop ? 'none' : 'block')};

  ${mediaqueries.desktop`
    max-width: 100%;
    display: ${p => (p.hideOnDesktop ? 'none' : 'block')};
  `};

  ${mediaqueries.tablet`
    display: block;
    padding: 0;
  `};

  ${mediaqueries.phablet`
    max-width: 100%;
    ${p => p.hideOverflow && `overflow: hidden`};
  `};
`

export default Section
