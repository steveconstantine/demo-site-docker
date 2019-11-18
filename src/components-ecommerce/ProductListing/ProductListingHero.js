import React, { useState } from 'react'
import { graphql, StaticQuery } from 'gatsby'
import styled from 'styled-components'

import SEO from '@components/SEO'
import Layout from '@components/Layout'
import Section from '@components/Section'
import Heading from '@components/Heading'
import LayoutHeroMobile from '@components/Layout/Layout.Hero.Mobile'
import Media from '@components/Media/Media.Img'
import ScrollIndicator from '@components/ScrollIndicator'
import Pill from '@components/Pill'
import Transitions from '@components/Transitions'

import mediaqueries from '@styles/media'
import { breakpoints, spacing } from '../../utils/styles'
import { keyToSymbol } from '@shortcuts'

import LabsPreview from '../../sections/labs/Labs.Preview'
import LabsPreviewMobile from '../../sections/labs/Labs.Preview.Mobile'

import ProductListingHeader from './ProductListingHeader'
import ProductListingItem from './ProductListingItem'
import ProductListingSlider from './ProductListingSlider'
import DonationForm from '../ProductPage/DonationForm'

const ProductListingHero = () => (
    <StaticQuery
      query={graphql`
            query ProductListingHeroQuery {
              products: allShopifyProduct(
              filter: { 
                handle: { ne: "donation" } }
              sort: { fields: [publishedAt], order: ASC }
            ) {
              edges {
                node {
                  id
                  handle
                  title
                  description
                  productType
                  variants {
                    shopifyId
                    title
                    price
                    availableForSale
                  }
                  images {
                    id
                    localFile {
                      childImageSharp {
                        fluid(maxWidth: 910, maxHeight: 910) {
                          ...GatsbyImageSharpFluid_withWebp
                        }
                    }
                  }
                }
              }
            }
          }
        }
      `}
      render={({ products }) => {
        const pageBackground = 'linear-gradient(180deg, #08080b 50%, #191D23 100%)'
      const navConfig = {
        fixed: true,
        theme: 'light',
        offset: true,
      }
      const footerConfig = {
        visible: true,
      }

      // const [showScreen, setShowScreen] = useState(false)

      return (
          <>
            <Section fullwidth narrow>
              <ProductListingContainer>
                <ProductListingSlider>
                  {products.edges.map(({ node: product }) => (
                    <ProductListingItem key={product.id} product={product} />
                  ))}
                </ProductListingSlider>
                <Spacer/>
              </ProductListingContainer>
            </Section>
          </>
    )}}
  />
);

const Spacer = styled(`div`)`
  height: 40px;
`

const ProductListingContainer = styled(`div`)`
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (min-width: ${breakpoints.desktop}px) {
    flex-direction: row;
    flex-wrap: wrap;
  }
`;

const HeroSection = styled(Section)`
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${mediaqueries.tablet`
    pointer-events: none;
  `};
`

const HeroImage = styled.div`
  position: relative;
  width: 610px;
  top: -180px;
  right: -40px;
  animation: float 4.8s ease-in-out infinite 1.4s;

  @keyframes float {
    0% {
      transform: translatey(0px);
    }
    50% {
      transform: translatey(-8px);
    }
    100% {
      transform: translatey(0px);
    }
  }

  ${mediaqueries.tablet`
    display: none;
  `};

  .gatsby-image-wrapper {
    position: absolute !important;
    top: -180px;
    left: 0;
    width: 100%;
  }
`

const HeroImageMobile = styled(HeroImage)`
  display: none;

  ${mediaqueries.tablet`
    display: block;
    width: 100%;
    top: 0;
    right: 0;
    margin-bottom: 60px;
  `};

  .gatsby-image-wrapper {
    position: relative !important;
    top: 0;
    left: 0;
    width: 100%;
  }
`

const TextContainer = styled.div`
  max-width: 560px;

  ${mediaqueries.phablet`
    position: relative;
    top: -50px;
  `}
`

const MainText = styled.p`
  font-size: 3.2rem;
  font-weight: 400;
  color: ${p => (p.color == 'light' ? '#08080b' : '#FAFAFA')};
  line-height: 1.3;

  ${mediaqueries.phablet`
    font-size: 2.2rem;
  `};
`

const ContentContainer = styled.div`
  min-height: 440px;

  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${mediaqueries.tablet`
    padding: 0;
    user-select: none;
    pointer-events: none;
  `};
`

const HorizontalRule = styled.hr`
  width: 140px;
  height: 1px;
  border: none;
  margin-bottom: 30px;
  background: ${p => (p.dark ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255,255,255,0.1)')};

  ${mediaqueries.phablet`
    width: 100%;
    margin: 0 auto 25px;
    background: ${p =>
      p.dark ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255,255,255,0.1)'};
  `}
`

const LinkToProduct = styled.a`
  position: relative;
  font-weight: 600;
  font-size: 16px;
  color: ${p => (p.dark ? p.theme.colors.grey : '#fff')};

  svg {
    margin-right: 13px;
  }

  &:nth-child(2) {
    margin-left: 30px;
  }

  &[data-a11y='true']:focus::after {
    content: '';
    position: absolute;
    left: -10%;
    top: -42%;
    width: 120%;
    height: 200%;
    border: 2px solid ${p => p.theme.colors.purple};
    background: rgba(255, 255, 255, 0.01);
    border-radius: 5px;
  }

  ${mediaqueries.tablet`
    display: block;
    margin: 0 auto;
    color: ${p => (p.dark ? '#000' : '#fff')};

    &:nth-child(2) {
      margin: 15px auto 0;
    }

      svg {
        display: none;
      }
  `}
`

const Symbol = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 16px;
  min-width: 16px;
  text-align: center;
  border-radius: 2.5px;
  padding: 1px 2px;
  color: ${p => p.theme.colors.bg};
  background: ${p => p.theme.colors.moon};
  font-size: 12px;
  font-weight: 400;
  margin-left: 5px;
`


export default ProductListingHero;
