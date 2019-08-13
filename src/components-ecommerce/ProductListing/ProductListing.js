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

const ProductListing = () => (
    <StaticQuery
      query={graphql`
            query ProductListingQuery {
              allShopifyProduct(
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
          hero: file(name: { regex: "/labs-hero-phone/" }) {
            childImageSharp {
              fluid(maxWidth: 1060, quality: 100) {
                ...GatsbyImageSharpFluid_noBase64
              }
            }
          }
          heroBody: file(name: { regex: "/labs-floating-phone-body/" }) {
            childImageSharp {
              fluid(maxWidth: 1060, quality: 100) {
                ...GatsbyImageSharpFluid_noBase64
              }
            }
          }
          heroScreen: file(name: { regex: "/labs-floating-phone-screen/" }) {
            childImageSharp {
              fluid(maxWidth: 1060, quality: 100) {
                ...GatsbyImageSharpFluid_noBase64
              }
            }
          }
          needlBackground: file(name: { regex: "/needl-labs-desktop/" }) {
            childImageSharp {
              fluid(maxWidth: 1140, maxHeight: 380, quality: 100) {
                ...GatsbyImageSharpFluid_noBase64
              }
            }
          }
          feyBackground: file(name: { regex: "/fey-labs-desktop/" }) {
            childImageSharp {
              fluid(maxWidth: 1140, maxHeight: 380, quality: 100) {
                ...GatsbyImageSharpFluid_noBase64
              }
            }
          }
          commandlineBackground: file(name: { regex: "/commandline-labs-desktop/" }) {
            publicURL
          }
        }
      `}
      render={({ allShopifyProduct,
      hero,
      heroBody,
      heroScreen,
      needlBackground,
      feyBackground,
      commandlineBackground }) => {
        const pageBackground = 'linear-gradient(180deg, #08080b 50%, #191D23 100%)'
      const navConfig = {
        fixed: true,
        theme: 'light',
        offset: true,
      }
      const footerConfig = {
        visible: true,
      }

      // Start the bulb up animation once the image has laoded
      const [showScreen, setShowScreen] = useState(false)

      // Inlining our products to get the right variables we need in scope!
      const products = [
        {
          logo: FeyLogo,
          background: feyBackground.childImageSharp.fluid,
          backgroundColor: '#1A1A1A',
          excerpt:
            'Sick of tracking your trades across Evernote, Excel files and countless screenshots? Fey gives you the complete picture of your portfolio, with fast data entry, always-on risk analysis and more.',
          children: (
            <>
              <HorizontalRule />
              <div>
                <LinkToProduct
                  target="_blank"
                  data-a11y="false"
                  href="https://feyapp.com"
                >
                  <GlobeIcon aria-hidden="true" />
                  Visit website
                </LinkToProduct>
                <LinkToProduct
                  target="_blank"
                  data-a11y="false"
                  href="https://narative.co/design/open/fey"
                >
                  <FigmaIcon aria-hidden="true" /> View in Figma
                </LinkToProduct>
              </div>
            </>
          ),
        },
        {
          logo: CommandlineLogo,
          background: commandlineBackground.publicURL,
          backgroundColor: '#222838',
          excerpt:
            'Computers have plenty of buttons, so we wondered: why explore the web with just one? Narative Command lets you instantly access any page on Narative.co with simple keyboard shortcuts.',
          children: (
            <>
              <HorizontalRule />
              <LinkToProduct dark as="div">
                Try it out! Just press <Symbol>{keyToSymbol('meta')}</Symbol>{' '}
                <Symbol>K</Symbol>
              </LinkToProduct>
            </>
          ),
        },
        {
          logo: NeedlLogo,
          background: needlBackground.childImageSharp.fluid,
          backgroundColor: '#D6D9DE',
          excerpt:
            "Whether you're looking to get inked or you're a tattoo artist yourself, this upcoming app will help you get what you need. Find artists and styles, schedule appointments, book flashes and get paid.",
          children: (
            <>
              <HorizontalRule dark />
              <LinkToProduct dark as="div">
                Coming: when it’s ready
              </LinkToProduct>
            </>
          ),
        },
      ];
      return (
          <>
            <LayoutHeroMobile>
              <HeroSection>
                <ContentContainer>
                  <div />
                  <Transitions.CSS.FadeIn>
                    <TextContainer>
                      <Pill text="Labs" />
                      <Heading.h2 styles="h1">
                        Whether with our clients or all by ourselves, we're always
                        busy building something new.
                      </Heading.h2>
                      <MainText color={navConfig.theme}>
                        Take a peek at the products we're creating in-house at
                        Narative.
                      </MainText>
                    </TextContainer>
                  </Transitions.CSS.FadeIn>
                  <ScrollIndicator />
                </ContentContainer>

                <HeroImage>
                  <Media
                    critical
                    onLoad={() => setShowScreen(true)}
                    src={heroBody.childImageSharp.fluid}
                  />
                  <div
                    style={{
                      opacity: showScreen ? 1 : 0,
                      transition: 'opacity 1s ease 0.5s',
                    }}
                  >
                    <Media critical src={heroScreen.childImageSharp.fluid} />
                  </div>
                </HeroImage>
              </HeroSection>
            </LayoutHeroMobile>
            <HeroImageMobile>
              <Media critical src={hero.childImageSharp.fluid} />
            </HeroImageMobile>
            <Section narrow>
              <ProductListingContainer>
                <ProductListingSlider>
                  {allShopifyProduct.edges.map(({ node: product }) => (
                    <ProductListingItem key={product.id} product={product} />
                  ))}
                </ProductListingSlider>
              </ProductListingContainer>
            </Section>
            <Section narrow>
              {products.map(product => (
                <LabsPreview key={product.excerpt} product={product} />
              ))}
            </Section>
            <Section narrow>
              <LabsPreviewMobile />
            </Section>
          </>
    )}}
  />
);

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
  height: calc(100vh - 140px);
  min-height: 440px;

  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${mediaqueries.tablet`
    height: calc(100vh - 90px);
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

const NeedlLogo = () => (
  <svg
    width="161"
    height="23"
    viewBox="0 0 161 23"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>Needl Logo</title>
    <path
      d="M6.096 11.592H8.376C12.984 11.592 14.304 9.048 14.304 6.408C14.304 2.928 12.12 1.32 8.328 1.32H0.696V2.472C1.944 2.496 2.328 2.832 2.328 4.2V15.192C2.328 16.56 1.944 16.896 0.696 16.896V18H8.136V16.896C6.504 16.896 6.096 16.536 6.096 15.168V11.592ZM10.296 6.456C10.296 9.048 9.6 9.816 7.704 9.816H6.096V3.024H7.512C9.6 3.024 10.296 3.936 10.296 6.456ZM20.7566 8.544C20.7086 6.96 20.1806 5.784 20.0126 5.472H19.6526L15.7886 6.432V7.488C16.9886 7.536 17.2286 7.776 17.2286 9.528V15.24C17.2286 16.608 16.9646 16.896 15.7646 16.92V18H22.7006V16.92C21.0686 16.896 20.8046 16.608 20.8046 15.24V11.496C20.8046 9.624 21.2846 9.048 23.1086 9.048C23.6846 9.048 23.9966 9.12 24.4286 9.24L25.1006 5.616C24.9086 5.544 24.5726 5.472 24.2126 5.472C22.8926 5.472 21.3566 6.48 20.7566 8.544ZM37.9461 11.712C37.9461 7.512 35.4501 5.472 31.9701 5.472C28.1541 5.472 25.7541 8.04 25.7541 11.928C25.7541 15.96 28.0101 18.312 31.7781 18.312C35.1141 18.312 37.9461 16.272 37.9461 11.712ZM34.0341 11.616C34.0341 15.312 33.3141 16.824 31.8981 16.824C30.1701 16.824 29.6661 15.336 29.6661 11.976C29.6661 8.184 30.3381 7.008 31.8501 7.008C33.2901 7.008 34.0341 8.136 34.0341 11.616ZM40.8531 17.616C40.8531 20.088 40.3971 21.216 38.9331 21.888L39.6291 22.944C41.8371 22.416 44.4051 21.192 44.4051 17.616V5.592H43.8771L39.3891 6.432V7.488C40.5891 7.536 40.8531 7.776 40.8531 9.528V17.616ZM44.6211 2.4C44.6211 1.248 43.7091 0.311999 42.5331 0.311999C41.3331 0.311999 40.3491 1.248 40.3491 2.4C40.3491 3.576 41.3091 4.512 42.4611 4.512C43.6611 4.512 44.6211 3.576 44.6211 2.4ZM53.5076 16.224C51.2036 16.224 50.2916 15.12 50.1956 12.408H57.4916V11.376C57.4916 7.704 55.9556 5.472 52.1876 5.472C48.7076 5.472 46.3556 7.8 46.3556 11.856C46.3556 15.936 48.5396 18.288 52.2596 18.288C54.3956 18.288 55.9796 17.64 57.2756 16.368L56.6996 15.384C55.6676 15.936 54.5156 16.224 53.5076 16.224ZM52.2116 6.96C53.4596 6.96 53.9396 7.872 53.9396 10.776H50.2196C50.3876 7.848 50.9876 6.96 52.2116 6.96ZM69.1628 6.456C68.3228 5.904 67.1228 5.496 65.2268 5.496C61.8908 5.496 59.0588 7.776 59.0588 12.096C59.0588 16.296 61.6988 18.288 64.9148 18.288C66.7388 18.288 68.3708 17.64 69.4748 16.344L68.8268 15.432C67.8188 16.032 67.1228 16.296 65.9948 16.296C64.1948 16.296 62.7548 15.144 62.7548 11.544C62.7548 7.872 64.0988 6.984 65.2268 6.984C66.2108 6.984 66.4028 7.608 66.4988 9.096H69.1628V6.456ZM78.381 5.784H75.477C75.477 4.56 75.573 3.12 75.693 2.256L73.197 2.568C72.597 3.48 72.237 4.656 72.093 5.736L70.485 6.384V7.608H71.925V14.856C71.925 17.496 73.149 18.312 75.333 18.312C76.653 18.312 77.685 18.024 78.597 17.448L78.237 16.2C77.685 16.416 77.301 16.488 76.869 16.488C75.669 16.488 75.501 15.84 75.501 14.064V7.608H77.997L78.381 5.784ZM96.9332 8.856C96.9332 10.248 97.0772 11.88 97.1492 12.432H97.0292C96.7652 11.736 96.1892 10.488 95.4452 9.312L90.3572 1.32H84.8132V2.472C86.0612 2.496 86.4452 2.832 86.4452 4.2V15.192C86.4452 16.56 86.0612 16.896 84.8132 16.896V18H90.1652V16.896C88.8932 16.896 88.5092 16.56 88.5092 15.192V8.976C88.5092 7.44 88.3652 5.856 88.2932 5.304H88.3892C88.6292 5.832 89.2532 7.128 90.3812 8.88L96.2612 18H98.9492V4.2C98.9492 2.832 99.3092 2.496 100.557 2.472V1.32H95.2772V2.472C96.5492 2.496 96.9332 2.832 96.9332 4.2V8.856ZM108.89 16.224C106.586 16.224 105.674 15.12 105.578 12.408H112.874V11.376C112.874 7.704 111.338 5.472 107.57 5.472C104.09 5.472 101.738 7.8 101.738 11.856C101.738 15.936 103.922 18.288 107.642 18.288C109.778 18.288 111.362 17.64 112.658 16.368L112.082 15.384C111.05 15.936 109.898 16.224 108.89 16.224ZM107.594 6.96C108.842 6.96 109.322 7.872 109.322 10.776H105.602C105.77 7.848 106.37 6.96 107.594 6.96ZM121.594 16.224C119.29 16.224 118.378 15.12 118.282 12.408H125.578V11.376C125.578 7.704 124.042 5.472 120.274 5.472C116.794 5.472 114.442 7.8 114.442 11.856C114.442 15.936 116.626 18.288 120.346 18.288C122.482 18.288 124.066 17.64 125.362 16.368L124.786 15.384C123.754 15.936 122.602 16.224 121.594 16.224ZM120.298 6.96C121.546 6.96 122.026 7.872 122.026 10.776H118.306C118.474 7.848 119.074 6.96 120.298 6.96ZM135.689 16.368C135.761 17.376 136.169 18.12 136.337 18.312H136.697L140.585 17.448V16.464C139.313 16.368 139.049 16.176 139.049 14.424V0.383999H138.425L133.961 1.032V2.088C135.137 2.136 135.497 2.376 135.497 4.128V6.672C134.897 5.928 133.841 5.496 132.641 5.496C129.497 5.496 127.145 7.464 127.145 11.976C127.145 16.368 129.161 18.288 131.969 18.288C133.601 18.288 135.017 17.496 135.689 16.368ZM131.033 11.712C131.033 8.352 131.993 7.512 133.433 7.512C134.201 7.512 134.945 7.752 135.497 8.4V15.072C134.825 15.744 134.081 16.08 133.289 16.08C131.849 16.08 131.033 15.096 131.033 11.712ZM146.521 2.76C146.521 1.32 146.209 0.623999 146.089 0.383999H145.729L141.385 1.032V2.088C142.609 2.136 142.969 2.376 142.969 4.128V15.24C142.969 16.608 142.705 16.896 141.481 16.92V18H148.009V16.92C146.761 16.896 146.521 16.584 146.521 15.216V2.76ZM156.445 16.224C154.141 16.224 153.229 15.12 153.133 12.408H160.429V11.376C160.429 7.704 158.893 5.472 155.125 5.472C151.645 5.472 149.293 7.8 149.293 11.856C149.293 15.936 151.477 18.288 155.197 18.288C157.333 18.288 158.917 17.64 160.213 16.368L159.637 15.384C158.605 15.936 157.453 16.224 156.445 16.224ZM155.149 6.96C156.397 6.96 156.877 7.872 156.877 10.776H153.157C153.325 7.848 153.925 6.96 155.149 6.96Z"
      fill="black"
    />
  </svg>
)

const FeyLogo = () => (
  <svg
    width="69"
    height="26"
    viewBox="0 0 69 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>Fey Logo</title>
    <path
      d="M59.8015 15.4941L54 6H58.1844L61.5 12.2293L64.8384 6H69L63.2017 15.4941V20.8128C63.2009 21.1274 63.0799 21.4289 62.8653 21.6513C62.6507 21.8737 62.3599 21.9991 62.0564 22H59.8015V15.4941Z"
      fill="white"
    />
    <path
      d="M41.161 6.00002H51V8.06922C51 8.38434 50.8784 8.68656 50.6619 8.90939C50.4454 9.13222 50.1517 9.2574 49.8456 9.2574H43.4338V12.2414H48.6157V14.3106C48.6148 14.6254 48.4929 14.9271 48.2766 15.1497C48.0603 15.3724 47.7672 15.4979 47.4612 15.4987H43.4338V18.746H50.9934V20.8118C50.9939 20.968 50.9643 21.1227 50.9064 21.267C50.8486 21.4114 50.7636 21.5426 50.6563 21.653C50.549 21.7634 50.4216 21.8509 50.2813 21.9105C50.141 21.97 49.9907 22.0004 49.839 22H40V7.1882C40 7.0316 40.0301 6.87654 40.0885 6.73194C40.1469 6.58734 40.2325 6.45606 40.3404 6.34563C40.4483 6.23521 40.5764 6.14783 40.7172 6.08852C40.858 6.02921 41.0088 5.99913 41.161 6.00002Z"
      fill="white"
    />
    <path
      d="M28.2742 22H26V7.18744C26 6.87251 26.1217 6.57048 26.3383 6.34779C26.555 6.1251 26.8488 6 27.1551 6H37V8.06789C36.9991 8.38254 36.8772 8.68406 36.6607 8.90655C36.4443 9.12904 36.151 9.25443 35.8449 9.25532H29.4195V12.2374H34.634V14.3053C34.634 14.6202 34.5122 14.9222 34.2956 15.1449C34.079 15.3676 33.7852 15.4927 33.4788 15.4927H29.4195V20.8159C29.4195 21.1288 29.299 21.429 29.0844 21.6508C28.8698 21.8727 28.5785 21.9982 28.2742 22Z"
      fill="white"
    />
    <path
      d="M12.3557 21.3519C12.5597 21.5565 12.7218 21.8006 12.8324 22.0701C12.943 22.3395 13 22.6289 13 22.9211C13 23.2134 12.943 23.5028 12.8324 23.7722C12.7218 24.0417 12.5597 24.2858 12.3557 24.4904L10.8777 26L9.37507 24.459C8.55033 23.6131 8.06222 22.4836 8.00555 21.29C7.94888 20.0964 8.3277 18.9238 9.06842 18L12.3557 21.3519Z"
      fill="white"
    />
    <path
      d="M12.3612 9.60037C12.7703 10.0148 13 10.5764 13 11.162C13 11.7476 12.7703 12.3093 12.3612 12.7237L8.53364 16.5955C7.98718 17.1448 7.55408 17.7985 7.25948 18.5186C6.96489 19.2386 6.81469 20.0108 6.8176 20.79C6.81853 21.1966 6.86021 21.602 6.942 22L5.43328 20.4319C4.51549 19.5021 4 18.2418 4 16.9279C4 15.6139 4.51549 14.3536 5.43328 13.4238L10.7983 8L12.3612 9.60037Z"
      fill="white"
    />
    <path
      d="M12.3504 1.6047C12.7663 2.02399 13 2.59237 13 3.18499C13 3.77761 12.7663 4.34599 12.3504 4.76528L4.63302 12.5447C3.93442 13.247 3.42076 14.1137 3.13851 15.0662C2.85626 16.0187 2.81432 17.0271 3.01649 18L1.45492 16.4246C0.993711 15.9611 0.627808 15.4106 0.378155 14.8046C0.128502 14.1986 0 13.549 0 12.8929C0 12.2369 0.128502 11.5873 0.378155 10.9813C0.627808 10.3753 0.993711 9.82477 1.45492 9.3613L10.7532 0L12.3504 1.6047Z"
      fill="white"
    />
  </svg>
)

const CommandlineLogo = () => (
  <svg
    width="267"
    height="19"
    viewBox="0 0 267 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.8163 8.85552C12.8163 10.2475 12.9603 11.8795 13.0323 12.4315H12.9123C12.6483 11.7355 12.0723 10.4875 11.3283 9.31152L6.24029 1.31952H0.696289V2.47152C1.94429 2.49552 2.32829 2.83152 2.32829 4.19952V15.1915C2.32829 16.5595 1.94429 16.8955 0.696289 16.8955V17.9995H6.04829V16.8955C4.77629 16.8955 4.39229 16.5595 4.39229 15.1915V8.97552C4.39229 7.43952 4.24829 5.85552 4.17629 5.30352H4.27229C4.51229 5.83152 5.13629 7.12752 6.26429 8.87952L12.1443 17.9995H14.8323V4.19952C14.8323 2.83152 15.1923 2.49552 16.4403 2.47152V1.31952H11.1603V2.47152C12.4323 2.49552 12.8163 2.83152 12.8163 4.19952V8.85552Z"
      fill="#FAFAFA"
    />
    <path
      d="M28.0347 14.3995C28.0347 12.2155 28.1307 10.2235 28.1307 9.50352C28.1307 6.69552 26.2107 5.47152 23.4507 5.47152C21.5067 5.47152 19.5387 6.07152 18.2667 6.81552V9.26353H20.9067C21.0747 7.99152 21.4587 7.07952 22.8267 7.07952C24.0987 7.07952 24.5547 7.87152 24.5547 9.71952V10.8235C24.2427 10.7995 23.6907 10.7755 23.4027 10.7755C19.6347 10.7755 17.4987 11.9515 17.4987 14.7835C17.4987 17.2555 19.1787 18.3355 21.3147 18.3355C23.2107 18.3355 24.2427 17.3275 24.6507 16.4635C24.8427 17.4715 25.6347 18.1435 27.1227 18.1435C28.1787 18.1435 29.0667 17.8795 29.5707 17.5675V16.5355C28.2987 16.4875 28.0347 16.1995 28.0347 14.3995ZM24.5067 12.1675L24.4347 15.2155C24.0027 15.7675 23.2347 16.1035 22.6107 16.1035C21.6987 16.1035 21.1707 15.6955 21.1707 14.3275C21.1707 12.8635 22.0347 12.1675 23.6667 12.1675H24.5067Z"
      fill="#FAFAFA"
    />
    <path
      d="M35.4757 8.54352C35.4277 6.95952 34.8997 5.78352 34.7317 5.47152H34.3717L30.5077 6.43152V7.48752C31.7077 7.53552 31.9477 7.77552 31.9477 9.52752V15.2395C31.9477 16.6075 31.6837 16.8955 30.4837 16.9195V17.9995H37.4197V16.9195C35.7877 16.8955 35.5237 16.6075 35.5237 15.2395V11.4955C35.5237 9.62352 36.0037 9.04752 37.8277 9.04752C38.4037 9.04752 38.7157 9.11952 39.1477 9.23952L39.8197 5.61552C39.6277 5.54352 39.2917 5.47152 38.9317 5.47152C37.6117 5.47152 36.0757 6.47952 35.4757 8.54352Z"
      fill="#FAFAFA"
    />
    <path
      d="M51.1207 14.3995C51.1207 12.2155 51.2167 10.2235 51.2167 9.50352C51.2167 6.69552 49.2967 5.47152 46.5367 5.47152C44.5927 5.47152 42.6247 6.07152 41.3527 6.81552V9.26353H43.9927C44.1607 7.99152 44.5447 7.07952 45.9127 7.07952C47.1847 7.07952 47.6407 7.87152 47.6407 9.71952V10.8235C47.3287 10.7995 46.7767 10.7755 46.4887 10.7755C42.7207 10.7755 40.5847 11.9515 40.5847 14.7835C40.5847 17.2555 42.2647 18.3355 44.4007 18.3355C46.2967 18.3355 47.3287 17.3275 47.7367 16.4635C47.9287 17.4715 48.7207 18.1435 50.2087 18.1435C51.2647 18.1435 52.1527 17.8795 52.6567 17.5675V16.5355C51.3847 16.4875 51.1207 16.1995 51.1207 14.3995ZM47.5927 12.1675L47.5207 15.2155C47.0887 15.7675 46.3207 16.1035 45.6967 16.1035C44.7847 16.1035 44.2567 15.6955 44.2567 14.3275C44.2567 12.8635 45.1207 12.1675 46.7527 12.1675H47.5927Z"
      fill="#FAFAFA"
    />
    <path
      d="M61.2016 5.78352H58.2976C58.2976 4.55953 58.3936 3.11952 58.5136 2.25552L56.0176 2.56752C55.4176 3.47952 55.0576 4.65552 54.9136 5.73552L53.3056 6.38352V7.60752H54.7456V14.8555C54.7456 17.4955 55.9696 18.3115 58.1536 18.3115C59.4736 18.3115 60.5056 18.0235 61.4176 17.4475L61.0576 16.1995C60.5056 16.4155 60.1216 16.4875 59.6896 16.4875C58.4896 16.4875 58.3216 15.8395 58.3216 14.0635V7.60752H60.8176L61.2016 5.78352Z"
      fill="#FAFAFA"
    />
    <path
      d="M68.6752 17.9995V16.9195C67.4272 16.8955 67.2112 16.6075 67.2112 15.2395V5.59152H66.6832L62.1952 6.43152V7.48752C63.3952 7.53552 63.6352 7.77552 63.6352 9.52752V15.2395C63.6352 16.6075 63.3712 16.8955 62.1712 16.9195V17.9995H68.6752ZM67.4032 2.39952C67.4032 1.24752 66.4912 0.311523 65.3152 0.311523C64.1152 0.311523 63.1552 1.24752 63.1552 2.39952C63.1552 3.57552 64.1152 4.51152 65.2672 4.51152C66.4672 4.51152 67.4032 3.57552 67.4032 2.39952Z"
      fill="#FAFAFA"
    />
    <path
      d="M76.4309 18.1195L79.9589 8.37552C80.3909 7.22352 80.6789 7.00752 81.6389 6.88752V5.78352H76.6229V6.88752C77.6069 6.91152 78.0389 7.15152 78.0389 7.72752C78.0389 7.87152 77.9909 8.06352 77.9189 8.30352L76.3829 13.0315C76.1429 13.8235 75.9269 14.6875 75.9029 14.8795H75.7589C75.7109 14.5195 75.5669 13.8235 75.3029 13.0315L73.6709 8.30352C73.5749 8.06352 73.5269 7.87152 73.5269 7.70352C73.5269 7.19952 73.8869 6.91152 74.8949 6.88752V5.78352H68.3909V6.88752C69.2309 7.00752 69.4709 7.22352 69.9269 8.37552L73.6709 18.1195H76.4309Z"
      fill="#FAFAFA"
    />
    <path
      d="M89.0157 16.2235C86.7117 16.2235 85.7997 15.1195 85.7037 12.4075H92.9997V11.3755C92.9997 7.70352 91.4637 5.47152 87.6957 5.47152C84.2157 5.47152 81.8637 7.79952 81.8637 11.8555C81.8637 15.9355 84.0477 18.2875 87.7677 18.2875C89.9037 18.2875 91.4877 17.6395 92.7837 16.3675L92.2077 15.3835C91.1757 15.9355 90.0237 16.2235 89.0157 16.2235ZM87.7197 6.95952C88.9677 6.95952 89.4477 7.87152 89.4477 10.7755H85.7277C85.8957 7.84752 86.4957 6.95952 87.7197 6.95952Z"
      fill="#FAFAFA"
    />
    <path
      d="M107.661 18.2875C110.061 18.2875 112.125 17.6875 113.109 16.9675V13.7995H110.637C110.325 15.7675 109.701 16.6555 107.805 16.6555C105.741 16.6555 104.301 15.5515 104.301 9.74352C104.301 4.27152 105.549 2.73552 107.805 2.73552C109.461 2.73552 110.013 3.67152 110.397 5.49552H112.989V2.23152C111.837 1.48752 110.205 1.03152 107.853 1.03152C103.245 1.03152 100.101 3.79152 100.101 9.88752C100.101 15.2875 102.765 18.2875 107.661 18.2875Z"
      fill="#FAFAFA"
    />
    <path
      d="M127.032 11.7115C127.032 7.51153 124.536 5.47152 121.056 5.47152C117.24 5.47152 114.84 8.03952 114.84 11.9275C114.84 15.9595 117.096 18.3115 120.864 18.3115C124.2 18.3115 127.032 16.2715 127.032 11.7115ZM123.12 11.6155C123.12 15.3115 122.4 16.8235 120.984 16.8235C119.256 16.8235 118.752 15.3355 118.752 11.9755C118.752 8.18353 119.424 7.00752 120.936 7.00752C122.376 7.00752 123.12 8.13552 123.12 11.6155Z"
      fill="#FAFAFA"
    />
    <path
      d="M140.475 7.60752C139.971 6.28752 138.771 5.49552 137.355 5.49552C135.627 5.49552 134.427 6.31152 133.395 7.55952C133.323 6.59952 132.891 5.75952 132.747 5.47152H132.387L128.523 6.43152V7.48752C129.723 7.53552 129.963 7.77552 129.963 9.52752V15.2395C129.963 16.6075 129.699 16.8955 128.499 16.9195V17.9995H134.883V16.9195C133.659 16.9195 133.539 16.6075 133.539 15.3115V8.87952C134.163 8.44752 134.811 8.01552 135.771 8.01552C136.683 8.01552 137.211 8.51952 137.211 9.95952V15.3115C137.211 16.6075 137.067 16.9195 135.867 16.9195V17.9995H142.083V16.9195C140.955 16.8955 140.787 16.6075 140.787 15.3115V8.80752C141.363 8.39952 142.011 8.01552 142.947 8.01552C143.859 8.01552 144.387 8.51952 144.387 9.95952V15.3115C144.387 16.6075 144.243 16.9195 143.043 16.9195V17.9995H149.379V16.9195C148.203 16.8955 147.939 16.6075 147.939 15.2395V9.11952C147.939 6.64752 146.451 5.49552 144.531 5.49552C142.827 5.49552 141.507 6.33552 140.475 7.60752Z"
      fill="#FAFAFA"
    />
    <path
      d="M162.342 7.60752C161.838 6.28752 160.638 5.49552 159.222 5.49552C157.494 5.49552 156.294 6.31152 155.262 7.55952C155.19 6.59952 154.758 5.75952 154.614 5.47152H154.254L150.39 6.43152V7.48752C151.59 7.53552 151.83 7.77552 151.83 9.52752V15.2395C151.83 16.6075 151.566 16.8955 150.366 16.9195V17.9995H156.75V16.9195C155.526 16.9195 155.406 16.6075 155.406 15.3115V8.87952C156.03 8.44752 156.678 8.01552 157.638 8.01552C158.55 8.01552 159.078 8.51952 159.078 9.95952V15.3115C159.078 16.6075 158.934 16.9195 157.734 16.9195V17.9995H163.95V16.9195C162.822 16.8955 162.654 16.6075 162.654 15.3115V8.80752C163.23 8.39952 163.878 8.01552 164.814 8.01552C165.726 8.01552 166.254 8.51952 166.254 9.95952V15.3115C166.254 16.6075 166.11 16.9195 164.91 16.9195V17.9995H171.246V16.9195C170.07 16.8955 169.806 16.6075 169.806 15.2395V9.11952C169.806 6.64752 168.318 5.49552 166.398 5.49552C164.694 5.49552 163.374 6.33552 162.342 7.60752Z"
      fill="#FAFAFA"
    />
    <path
      d="M182.746 14.3995C182.746 12.2155 182.842 10.2235 182.842 9.50352C182.842 6.69552 180.922 5.47152 178.162 5.47152C176.218 5.47152 174.25 6.07152 172.978 6.81552V9.26353H175.618C175.786 7.99152 176.17 7.07952 177.538 7.07952C178.81 7.07952 179.266 7.87152 179.266 9.71952V10.8235C178.954 10.7995 178.402 10.7755 178.114 10.7755C174.346 10.7755 172.21 11.9515 172.21 14.7835C172.21 17.2555 173.89 18.3355 176.026 18.3355C177.922 18.3355 178.954 17.3275 179.362 16.4635C179.554 17.4715 180.346 18.1435 181.834 18.1435C182.89 18.1435 183.778 17.8795 184.282 17.5675V16.5355C183.01 16.4875 182.746 16.1995 182.746 14.3995ZM179.218 12.1675L179.146 15.2155C178.714 15.7675 177.946 16.1035 177.322 16.1035C176.41 16.1035 175.882 15.6955 175.882 14.3275C175.882 12.8635 176.746 12.1675 178.378 12.1675H179.218Z"
      fill="#FAFAFA"
    />
    <path
      d="M197.795 9.11952C197.795 6.64752 196.283 5.49552 194.315 5.49552C192.443 5.49552 191.171 6.45552 190.139 7.63152C190.067 6.67152 189.611 5.73552 189.443 5.47152H189.083L185.219 6.43152V7.48752C186.419 7.53552 186.659 7.77552 186.659 9.52752V15.2395C186.659 16.6075 186.395 16.8955 185.195 16.9195V17.9995H191.699V16.9195C190.451 16.8955 190.235 16.5835 190.235 15.2875V8.92752C190.859 8.44752 191.579 8.01552 192.635 8.01552C193.643 8.01552 194.219 8.51952 194.219 9.95952V15.2875C194.219 16.5835 194.003 16.8955 192.779 16.9195V17.9995H199.211V16.9195C198.059 16.8955 197.795 16.6075 197.795 15.2395V9.11952Z"
      fill="#FAFAFA"
    />
    <path
      d="M208.955 16.3675C209.027 17.3755 209.435 18.1195 209.603 18.3115H209.963L213.851 17.4475V16.4635C212.579 16.3675 212.315 16.1755 212.315 14.4235V0.383524H211.691L207.227 1.03152V2.08752C208.403 2.13552 208.763 2.37552 208.763 4.12752V6.67152C208.163 5.92752 207.107 5.49552 205.907 5.49552C202.763 5.49552 200.411 7.46352 200.411 11.9755C200.411 16.3675 202.427 18.2875 205.235 18.2875C206.867 18.2875 208.283 17.4955 208.955 16.3675ZM204.299 11.7115C204.299 8.35153 205.259 7.51152 206.699 7.51152C207.467 7.51152 208.211 7.75152 208.763 8.39952V15.0715C208.091 15.7435 207.347 16.0795 206.555 16.0795C205.115 16.0795 204.299 15.0955 204.299 11.7115Z"
      fill="#FAFAFA"
    />
    <path
      d="M222.213 1H219V6.79266H222.213V5.81998H220.129V4.23938H222.126V3.26669H220.129V1.97268H222.213V1Z"
      fill="#E9DAAC"
    />
    <path
      d="M222.718 6.79266H224.073L225.41 4.67361L226.678 6.79266H228.033L226.053 3.73567L227.833 1H226.478L225.41 2.79772L224.394 1H223.039L224.767 3.73567L222.718 6.79266Z"
      fill="#E9DAAC"
    />
    <path
      d="M228.864 1V6.79266H229.993V4.64755H230.722C231.391 4.64755 231.868 4.45649 232.19 4.13516C232.633 3.69224 232.667 3.06695 232.667 2.84115C232.667 2.42428 232.546 1.85978 232.077 1.44292C231.651 1.06948 231.2 1 230.548 1H228.864ZM229.993 1.97268H230.383C230.653 1.97268 230.948 1.99005 231.182 2.15506C231.347 2.27664 231.504 2.49376 231.504 2.81509C231.504 3.06695 231.399 3.32749 231.191 3.4925C230.948 3.67487 230.67 3.67487 230.453 3.67487H229.993V1.97268Z"
      fill="#E9DAAC"
    />
    <path
      d="M236.716 1H233.503V6.79266H236.716V5.81998H234.632V4.23938H236.629V3.26669H234.632V1.97268H236.716V1Z"
      fill="#E9DAAC"
    />
    <path
      d="M237.811 1V6.79266H238.94V4.46518H239.079L240.625 6.79266H242.032L240.225 4.35228C240.503 4.30017 240.712 4.20464 240.859 4.10042C241.311 3.79646 241.537 3.30143 241.537 2.73693C241.537 2.3027 241.407 1.80767 240.964 1.43423C240.694 1.20843 240.286 1 239.487 1H237.811ZM238.94 1.92057H239.279C239.487 1.92057 240.373 1.92926 240.373 2.78904C240.373 3.64013 239.479 3.66619 239.261 3.66619H238.94V1.92057Z"
      fill="#E9DAAC"
    />
    <path d="M242.798 1V6.79266H243.927V1H242.798Z" fill="#E9DAAC" />
    <path
      d="M244.954 6.79266H246.1L246.691 3.22327L248.176 6.79266H248.558L250.112 3.22327L250.633 6.79266H251.78L250.807 1H249.991L248.384 4.68229L246.847 1H246.031L244.954 6.79266Z"
      fill="#E9DAAC"
    />
    <path
      d="M256.019 1H252.806V6.79266H256.019V5.81998H253.935V4.23938H255.932V3.26669H253.935V1.97268H256.019V1Z"
      fill="#E9DAAC"
    />
    <path
      d="M258.243 6.79266V2.91931L261.769 6.79266H262.551V1H261.422V4.86467L257.896 1H257.114V6.79266H258.243Z"
      fill="#E9DAAC"
    />
    <path
      d="M267 1.97268V1H263.266V1.97268H264.568V6.79266H265.697V1.97268H267Z"
      fill="#E9DAAC"
    />
  </svg>
)

const GlobeIcon = () => (
  <svg
    width="19"
    height="14"
    viewBox="0 0 19 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.20896 13.9999C7.34271 14.0075 5.54559 13.2942 4.19251 12.0089C3.99106 11.8171 3.90719 11.5325 3.97251 11.2622C4.03782 10.9919 4.24239 10.7769 4.50915 10.6983C4.77591 10.6197 5.06434 10.6894 5.26579 10.8811C6.33096 11.8879 7.74335 12.445 9.20896 12.4366C9.75609 12.4375 10.3006 12.3616 10.8267 12.2111C11.2297 12.1183 11.6349 12.3572 11.7488 12.7548C11.8627 13.1524 11.6455 13.5697 11.2544 13.7043C10.5898 13.898 9.90125 13.9975 9.20896 13.9999ZM16.3176 8.00353C16.3654 7.67126 16.3888 7.33593 16.3876 7.00024C16.3321 3.08455 13.117 -0.0470396 9.20122 0.000534954C6.45785 -0.00568609 3.94655 1.53903 2.71483 3.99037C2.52583 4.37695 2.68601 4.84355 3.07259 5.03254C3.45918 5.22154 3.92578 5.06136 4.11477 4.67478C5.08411 2.75804 7.05334 1.55361 9.20122 1.5638C12.258 1.51614 14.7767 3.95138 14.8321 7.00802C14.8331 7.26825 14.8149 7.5282 14.7777 7.78576C14.7464 7.99001 14.7978 8.19829 14.9203 8.36463C15.0429 8.53097 15.2266 8.6417 15.431 8.67239H15.5632C15.9535 8.67623 16.2863 8.39008 16.3409 8.00353H16.3176ZM18.5887 9.07689C18.6387 8.88411 18.6545 8.68405 18.6354 8.48581C18.5826 8.06792 18.2068 7.76795 17.7876 7.80917C17.3762 7.86566 17.0817 8.23547 17.1188 8.64913C16.9632 9.23244 13.9456 9.92464 8.81246 8.64913C4.92374 7.66918 2.26385 6.11369 1.65721 5.07929C1.5883 4.98755 1.55264 4.8751 1.5561 4.76041C1.65121 4.35218 1.4057 3.94202 1.00097 3.83297C0.596247 3.72393 0.177909 3.95523 0.0550537 4.35598C-0.0711348 4.8728 0.021739 5.41878 0.311709 5.86481C1.25278 7.45919 4.43376 9.14689 8.42359 10.1502C10.2864 10.6343 12.2001 10.8954 14.1245 10.9279C16.4266 10.9824 18.2387 10.4224 18.5965 9.07689H18.5887Z"
      fill="white"
    />
  </svg>
)

const FigmaIcon = () => (
  <svg
    width="12"
    height="16"
    viewBox="0 0 12 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.5172 3.07248C1.5172 2.04865 2.34845 1.2174 3.37228 1.2174H5.22737V4.92756H3.37228C2.34845 4.92756 1.5172 4.09631 1.5172 3.07248ZM3.37228 0C1.6761 0 0.299805 1.3763 0.299805 3.07248C0.299805 4.08075 0.78612 4.97598 1.53686 5.53629C0.78612 6.0966 0.299805 6.99184 0.299805 8.00011C0.299805 9.00831 0.78606 9.9035 1.53672 10.4638C0.78606 11.0241 0.299805 11.9193 0.299805 12.9275C0.299805 14.6237 1.6761 16 3.37228 16C5.06846 16 6.44476 14.6237 6.44476 12.9275V11.0726V10.4639V10.4637V10.4489C6.96038 10.8403 7.60325 11.0726 8.30012 11.0726C9.99631 11.0726 11.3726 9.69629 11.3726 8.00011C11.3726 6.99184 10.8863 6.09661 10.1355 5.5363C10.8863 4.97598 11.3726 4.08075 11.3726 3.07248C11.3726 1.3763 9.99631 0 8.30012 0H6.44476H5.83634H5.83606H5.22764H3.37228ZM3.37228 6.14502C2.34845 6.14502 1.5172 6.97627 1.5172 8.00011C1.5172 9.0177 2.33834 9.84504 3.35357 9.8551L3.37228 9.85504H5.22736V6.14502H3.37228ZM1.5172 12.9275C1.5172 11.9099 2.33834 11.0826 3.35357 11.0725L3.37228 11.0726H5.22736V12.9275C5.22736 13.9514 4.39611 14.7826 3.37228 14.7826C2.34845 14.7826 1.5172 13.9514 1.5172 12.9275ZM6.44504 4.92756H8.30012C9.32396 4.92756 10.1552 4.09631 10.1552 3.07248C10.1552 2.04865 9.32396 1.2174 8.30012 1.2174H6.44504V4.92756ZM6.44504 8.00011C6.44504 6.97627 7.27629 6.14502 8.30012 6.14502C9.32396 6.14502 10.1552 6.97627 10.1552 8.00011C10.1552 9.02394 9.32396 9.85519 8.30012 9.85519C7.27629 9.85519 6.44504 9.02394 6.44504 8.00011Z"
      fill="white"
    />
  </svg>
)


export default ProductListing;
