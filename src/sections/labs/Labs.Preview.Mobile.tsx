import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import styled from 'styled-components'

import Media from '@components/Media/Media.Img'
import mediaqueries from '@styles/media'

const previewQuery = graphql`
  query LabsPreviewMobile {
    needlBackground: file(name: { regex: "/needl-labs-mobile/" }) {
      childImageSharp {
        fluid(maxWidth: 670, maxHeight: 440, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    feyBackground: file(name: { regex: "/fey-labs-mobile/" }) {
      childImageSharp {
        fluid(maxWidth: 670, maxHeight: 440, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    commandlineBackground: file(name: { regex: "/commandline-labs-mobile/" }) {
      childImageSharp {
        fluid(maxWidth: 670, maxHeight: 440, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
  }
`

function LabsPreviewMobile() {
  const {
    needlBackground,
    feyBackground,
    commandlineBackground,
  } = useStaticQuery(previewQuery)

  /**
   * Bless Thiago for designing 3 unique looking cards that have the same sekelton.
   * That's why we're going with inline styles for each of them so we can reflect
   * the designs.
   */
  return (
    <>
      <PreviewCard style={{ background: '#23232A' }}>
        <Heading>
          <FeyLogo />
        </Heading>
        <Media src={feyBackground.childImageSharp.fluid} />
        <Border style={{ background: 'rgba(255,255,255,0.06)' }} />
        <Anchor
          href="https://feyapp.com"
          target="_blank"
          rel="noopener"
          style={{ background: '#1D1D23', color: '#E9DAAC' }}
        >
          Visit website
        </Anchor>
      </PreviewCard>
      
      <PreviewCard style={{ background: '#EFF0F4' }}>
        <Heading style={{ color: '#000' }}>Project Needle</Heading>
        <Media src={needlBackground.childImageSharp.fluid} />
        <Border style={{ background: 'rgba(0,0,0,0.06)' }} />
        <Anchor as="div" style={{ background: '#D6D9DE', color: '#A4A6AD' }}>
          Coming soon
        </Anchor>
      </PreviewCard>
    </>
  )
}

export default LabsPreviewMobile

const PreviewCard = styled.div`
  border-radius: 5px;
  overflow: hidden;
  background: red;
  margin-bottom: 25px;

  ${mediaqueries.desktop_up`
    display: none;
  `}
`

const Heading = styled.h3`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 0 15px;
  font-size: 22px;
  color: #fff;
  font-family: ${p => p.theme.fontfamily.serif};
`

const Anchor = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  font-size: 18px;
  font-weight: 600;
`

const Border = styled.div`
  position: relative;
  top: 1px;
  height: 1px;
`

const FeyLogo = () => (
  <svg
    width="69"
    height="26"
    viewBox="0 0 69 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
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
