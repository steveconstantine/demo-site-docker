import React, { useContext } from 'react'
import styled from 'styled-components'

import { ButtonArrow, Section, Heading } from '@components'
import ShapeShifter from '@components/ShapeShifter'
import Transitions from '@components/Transitions'
import LayoutHeroMobile from '@components/Layout/Layout.Hero.Mobile'
import { ContactContext } from '@components/Contact/Contact.Context'

import mediaqueries from '@styles/media'

import ProductListingHero from '../../components-ecommerce/ProductListing/ProductListingHero'

function HomeHero() {
  const { toggleContact } = useContext(ContactContext)

  return (
    <LayoutHeroMobile>
      <HomeHeroContainer id="home-hero">
        <Section fullwidth wide>
          <ContentContainer>
            <ProductContainer>
              <ProductListingHero />
            </ProductContainer>
          </ContentContainer>
        </Section>
      </HomeHeroContainer>
    </LayoutHeroMobile>
  )
}

export default HomeHero

const HomeHeroContainer = styled.div`
  ${mediaqueries.desktop`
    #mirror-mask {
      display: none;
  `}
`

const TextContainer = styled.div`
  position: absolute;
  z-index: 10;
  max-width: 100vw;
  top: -44px;

  ${mediaqueries.tablet`
    position: relative;
    max-width: 100vw;
    top: 0;
  `}
`

const ProductContainer = styled.div`
  position: relative;
  z-index: 9;
  max-width: 100vw;
  top: 10px;

  ${mediaqueries.phablet`
    position: relative;
    max-width: 100vw;
  `}
`

const ContentContainer = styled.div`
  min-height: 600px;
  padding-top: 35px;
  z-index: 0;

  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${mediaqueries.phablet`
    height: calc(100vh - 180px);
    min-height: 100%;
    padding: 0;
    top: -40px;
    display: block !important;
  `};

  ${mediaqueries.desktop_medium`
    min-height: 360px;
  `};

  @media screen and (max-height: 800px) {
    min-height: 360px;
  }

  @media screen and (max-height: 648px) {
    top: 0;
  }
`
