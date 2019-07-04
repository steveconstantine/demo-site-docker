import React from 'react'
import styled from 'styled-components'
import { isMobile } from 'react-device-detect'

import Heading from '@components/Heading'
import IntersectionObserver from '@components/IntersectionObserver'
import Section from '@components/Section'
import ScrollIndicator from '@components/ScrollIndicator'
import Media from '@components/Media/Media.Img'

import mediaqueries from '@styles/media'

// Based on a condition will animate or not. A workaround for media queries
const inlineAnimate = (cond: boolean) => (obj: any) => (cond ? obj : {})

const ProductHero = ({ product }) => {
  const vendor = product.vendor

  return (
    <IntersectionObserver
      render={({
        boundingClientRect: { height },
        visiblePercentage,
      }: {
        boundingClientRect: { height: number }
        visiblePercentage: number
      }) => {
        // If it's mobile don't animate since it's janky and doesn't add much value
        const canAnimate = inlineAnimate(height > 540 && !isMobile)
        const headerOffset = canAnimate({
          transform: `translateY(${(100 - visiblePercentage) * 1.33}px)`,
          opacity: 1 - ((100 - visiblePercentage) / 100) * 1.66,
        })

        return (
          <Hero>
            <HeroContent>
              <Section>
                <Header style={headerOffset}>
                  <HeroTitle>{product.title}</HeroTitle>
                  <HeroSubtitle>
                    By {vendor.name}
                    {vendor.title && `, ${vendor.title}`}
                  </HeroSubtitle>
                </Header>
              </Section>
            </HeroContent>
            <RelativeSection>
              <ScrollIndicator mode="dark" disableScrollAnimation />
              <ReadingTime>{product.readingTime.text}</ReadingTime>
            </RelativeSection>
            <Image>
              <Media critical src={product.images.edges.node[0].src} />
            </Image>
          </Hero>
        )
      }}
    />
  )
}

export default ProductHero

const Hero = styled.div`
  position: relative;
  z-index: 5;
  min-height: 600px;
  height: 100vh;
  background: #fafafa;
  display: flex;
  overflow: hidden;

  ${mediaqueries.tablet`
    min-height: 100vh;
    background: linear-gradient(#191c22, #08080B 3%);
  `}
`

const HeroContent = styled.div`
  position: absolute;
  height: 100%;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  overflow: hidden;

  ${mediaqueries.tablet`
    min-height: 100vh;
    margin-top: 10px;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    background: #fafafa;
  `}
`

const Header = styled.header`
  max-width: 680px;

  ${mediaqueries.tablet`
    max-width: 480px;
  `}
`

const HeroTitle = styled(Heading.h1)`
  font-size: 48px;
  color: #000;
  font-family: ${p => p.theme.fontfamily.serif};
  font-weight: 700;

  ${mediaqueries.tablet`
    font-size: 32px;
    line-height: 1.3;
  `}
`

const HeroSubtitle = styled.div`
  font-size: 18px;
  color: rgba(0, 0, 0, 0.3);
  font-weight: 800;
`

const RelativeSection = styled(Section)`
  position: relative;
  width: 100%;
  position: absolute;
  bottom: 0;
  margin: 0 auto;
  left: 0;
  right: 0;
`

const ReadingTime = styled.div`
  top: 6px;
  left: 51px;
  position: absolute;
  font-weight: 700;
  color: rgba(0, 0, 0, 0.3);
`

const Image = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: -1;
  right: -40%;
  overflow: visible;

  & > div {
    top: 50%;
    transform: translateY(-50%);
    overflow: visible;
    height: 100%;

    img {
      object-position: left center !important;
    }
  }

  /* This is for product previews */
  & > img {
    position: absolute;
    top: 0;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
    object-position: left center !important;
  }

  ${mediaqueries.tablet`
    display: none;
  `}
`
