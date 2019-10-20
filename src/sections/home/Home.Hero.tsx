import React, { useContext } from 'react'
import styled from 'styled-components'
import { navigate } from 'gatsby'

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
              <TextContainer>
                <Transitions.CSS.FadeIn>
                  <Heading.h1>
                    Gifting Wild - A Wild Way of Gifting.
                  </Heading.h1>
                </Transitions.CSS.FadeIn>
              </TextContainer>
              <ProductListingHero />
               <Transitions.CSS.FadeIn>
                <MainText>
                  We're Getting Ready Now.
                </MainText>
                <ButtonArrow onClick={() => {
                            event.preventDefault()
                            toggleContact()
                          }} text="Get in touch" />
                <ButtonArrow onClick={() => navigate('/collection')} text="Browse our Art" />
              </Transitions.CSS.FadeIn>
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
  top: 10px;

  ${mediaqueries.tablet`
    position: relative;
    max-width: 100vw;
    top: 50px;
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

const MainText = styled.p`
  font-size: 3.2rem;
  font-weight: 400;
  color: #FEFEFE;
  line-height: 1.3;
  margin-bottom: 50px;

  ${mediaqueries.phablet`
    font-size: 2.2rem;
  `};
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
