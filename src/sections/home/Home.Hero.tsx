import React, { useContext } from 'react'
import styled from 'styled-components'
import { navigate } from 'gatsby'

import { ButtonArrow, Section, Heading } from '@components'
import ScrollIndicator from '@components/ScrollIndicator'
import ShapeShifter from '@components/ShapeShifter'
import IntersectionObserver from '@components/IntersectionObserver'
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
        <Section>
          <IntersectionObserver
            render={({ intersectionRatio: ir }) => (
              <ContentContainer
                style={ir ? { opacity: ir * ir } : { opacity: 1 }}
              >
                <TextContainer>
                  <Transitions.CSS.FadeIn>
                    <Heading.h1>
                      <br/>
                      <br/>
                      Gifting Wild - A Wild Way of Gifting.
                    </Heading.h1>
                    <MainText>
                      We're a team with senior startup experience here to help
                      your business take the next step.
                    </MainText>
                    <ButtonArrow onClick={() => {
                                event.preventDefault()
                                toggleContact()
                              }} text="Get in touch" />
                    <ButtonArrow onClick={() => navigate('/collection')} text="Browse our Art" />
                  </Transitions.CSS.FadeIn>
                </TextContainer>
                <ProductContainer>
                  <ProductListingHero />
                </ProductContainer>
              </ContentContainer>
            )}
          />
          <ScrollIndicator />
        </Section>
      </HomeHeroContainer>
    </LayoutHeroMobile>
  )
}

export default HomeHero

const HomeHeroContainer = styled.div`
  overflow-x: hidden;
  ${mediaqueries.desktop`
    #mirror-mask {
      display: none;
  `}
`

const TextContainer = styled.div`
  position: relative;
  z-index: 10;
  max-width: 50vw;
  top: 10px;

  ${mediaqueries.phablet`
    position: relative;
    max-width: 100vw;
  `}
`

const ProductContainer = styled.div`
  position: relative;
  z-index: 9;
  max-width: 50vw;
  top: 10px;

  ${mediaqueries.phablet`
    position: relative;
    max-width: 100vw;
  `}
`

const MainText = styled.p`
  font-size: 3.2rem;
  font-weight: 400;
  color: ${p => p.theme.colors.grey};
  line-height: 1.3;
  margin-bottom: 50px;

  ${mediaqueries.phablet`
    font-size: 2.2rem;
  `};
`

const ContentContainer = styled.div`
  height: calc(100vh - 230px);
  min-height: 600px;
  padding-top: 10px;
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
    top: -60px;
  }
`
