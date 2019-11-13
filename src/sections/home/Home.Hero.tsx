import React, { useContext } from 'react'
import styled from 'styled-components'
import { navigate } from 'gatsby'
import { ContactContext } from '@components/Contact/Contact.Context'

import { ButtonArrow, Section, Heading } from '@components'
import ShapeShifter from '@components/ShapeShifter'
import Transitions from '@components/Transitions'
import LayoutHeroMobile from '@components/Layout/Layout.Hero.Mobile'

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
           <ButtonContainer>
                <RoundedButtonArrow onClick={() => {
                            event.preventDefault()
                            toggleContact()
                          }} text="Get in touch" />
                <ButtonArrow onClick={() => navigate('/articles')} text="Read our Articles" />
            </ButtonContainer>
        </Section>
      </HomeHeroContainer>
    </LayoutHeroMobile>
  )
}

export default HomeHero


const RoundedButtonArrow = styled(ButtonArrow)`
border: 2px solid white !importat;
border-radius: 4px !important;
`;

const HomeHeroContainer = styled.div`
  ${mediaqueries.desktop`
    #mirror-mask {
      display: none;
  `}
`

const ButtonContainer = styled.div`
  padding: 0 10px;
  margin: 10px auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  max-width: 440px;
  a {
    flex-grow: 1;
    text-align: center;
    color: #FAFAFA !important;
  }
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
    min-height: 100%;
    padding: 0;
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
