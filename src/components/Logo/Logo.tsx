import React from 'react'
import styled from 'styled-components'
import GWSymbol from '../../assets/logo/logo.png'
import GWLogo from '../../assets/logo/gw_logo.png'

import mediaqueries from '@styles/media'

const LogoSymbolContainer = styled.div`
  height: 40px;
  width: 40px;

  ${mediaqueries.phablet`
    height: 40px;
    width: 40px;
  `};
`
/**
 * An inline SVG for Gifting-Wild Logo with aria labels
 *
 * @param {String} fill dark or light
 */
const Logo = ({
  fill = '#fff',
  onlySymbol = false,
}: {
    fill?: string
    onlySymbol?: boolean
  }) => {
  if (onlySymbol) {
    return (
      <LogoSymbolContainer>
        <img src={GWSymbol} height={'40px'} width={'auto'} alt={"Gifting Wild - A Wild Way of Gifting"} />
      </LogoSymbolContainer>
    )
  }

  return (
    <img src={GWLogo} height={'40px'} width={'auto'} alt={"Gifting Wild - A Wild Way of Gifting"} />
  )
}

export default Logo
