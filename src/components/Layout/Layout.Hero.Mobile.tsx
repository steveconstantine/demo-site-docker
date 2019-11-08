import React from 'react'
import styled from 'styled-components'

import mediaqueries from '@styles/media'
import {
  clamp,
  getWindowDimensions,
  getBreakpointFromTheme,
  useScrollPosition,
} from '@utils'

export function calculateStyles(position: number): {} {
  const { width, height } = getWindowDimensions()
  const breakpoint = getBreakpointFromTheme('tablet')

  const styles = {
    opacity: 1 - position / height / 0.8,
  }

  return width > breakpoint || position <= 0 ? {} : styles
}

function LayoutHeroMobile({ children }) {
  const position = clamp(useScrollPosition(), 0, 1000)

  return (
    <>
      <Frame style={calculateStyles(position)}>{children}</Frame>
    </>
  )
}

export default LayoutHeroMobile

const Frame = styled.div`
  ${mediaqueries.tablet`
    height: 50vh;
    min-height: 550px;
    top: 100vh;
    position: static;
    z-index: 0;
    width: 100vw;
    background-position: center center;

    @media screen and (max-height: 600px) {
      padding-top: 4px;
    }
  `}
`
