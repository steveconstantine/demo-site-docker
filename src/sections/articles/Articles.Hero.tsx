import React, { useEffect, useState, useRef } from 'react'
import { graphql, StaticQuery } from 'gatsby'
import styled from 'styled-components'

import Heading from '@components/Heading'
import ScrollIndicator from '@components/ScrollIndicator'
import Media from '@components/Media/Media.Img'
import Pill from '@components/Pill'
import LayoutHeroMobile from '@components/Layout/Layout.Hero.Mobile'
import Transitions from '@components/Transitions'

import mediaqueries from '@styles/media'
import { Section } from '@components'
import { startAnimation } from '@utils'

const gwLogo = require('../../assets/logo/logo_331.png');

function ArticlesHero() {
  const [current, setCurrent] = useState(0)
  const [imageLoaded, setImageLoaded] = useState(false)

  const text = useRef()

  return (
        <LayoutHeroMobile>
          <HeroSection relative>
            <ContentContainer>
              <div />
              <Transitions.CSS.FadeIn>
                <TextContainer>
                  <Pill text="Articles" />
                  <Heading.h2 styles="h1">
                    Gifting Wild.
                  </Heading.h2>
                  <MainText>
                    Read about our mission and goals.
                  </MainText>
                </TextContainer>
              </Transitions.CSS.FadeIn>
              <ScrollIndicator />
            </ContentContainer>
            <HeroImage>
              <Media
                loading='eager'
                src={gwLogo}
                onLoad={() => setImageLoaded(true)}
              />
            </HeroImage>
          </HeroSection>
        </LayoutHeroMobile>
    )
}

export default ArticlesHero

const HeroSection = styled(Section)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const HeroImage = styled.div`
  width: 640px;
  position: absolute;
  right: -10px;
  top: 42%;
  transform: translateY(-50%);

  ${mediaqueries.desktop_medium`
    display: none;
  `};

  ${mediaqueries.phablet`
    width: 100%;
    margin-bottom: 60px;
  `};
`

const HeroImageText = styled.p`
  opacity: ${p => (p.imageLoaded ? 1 : 0)};
  transition: opacity 0.3s;
  position: absolute;
  color: #b798f2;
  width: 214.87px;
  top: 198px;
  left: 170px;
  font-size: 12px;
  transform: perspective(333px) rotateX(-42deg);
`

const Caret = styled.span`
  position: relative;

  &::after {
    content: '';
    position: absolute;
    right: -2px;
    top: 4px;
    height: 70%;
    width: 1px;
    background: #b798f2;
    animation: blink 1s step-end infinite;
  }

  @keyframes blink {
    from,
    to {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
  }
`

const ContentContainer = styled.div`
  height: calc(100vh - 140px);
  min-height: 600px;

  a {
    color: #fff;
    font-size: 22px;
  }

  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${mediaqueries.desktop_medium`
    min-height: 360px;
  `};

  @media screen and (max-height: 800px) {
    min-height: 360px;
  }

  ${mediaqueries.phablet`
    height: calc(100vh - 90px);
    padding: 0;
  `};
`

const TextContainer = styled.div`
  max-width: 570px;

  ${mediaqueries.phablet`
    position: relative;
    top: -50px;
  `};
`

const MainText = styled.p`
  font-size: 3.2rem;
  font-weight: 400;
  color: ${p => p.theme.colors.grey};
  line-height: 1.3;

  ${mediaqueries.phablet`
    font-size: 2.2rem;
  `};
`
