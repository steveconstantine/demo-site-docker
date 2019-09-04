import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import styled from 'styled-components'

import Media from '@components/Media/Media.Img'
import SocialLinksOL from '@components/SocialLinksOL'
import mediaqueries from '@styles/media'


import OceanLegacyLogo from '../../assets/labs/oceanlegacy/oceanlegacy_logo_2019.png'

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
      <PreviewCard style={{ background: '#b1dbe1' }}>
        <Heading>
          <FeyLogo />
        </Heading>
        <Media src={''} />
        <Border style={{ background: 'rgba(255,255,255,0.06)' }} />
        <LinkContainer>
          <LinkToProduct
            target="_blank"
            data-a11y="false"
            href="https://oceanlegacy.ca"
          >
            <GlobeIcon aria-hidden="true" />
            Visit website
          </LinkToProduct>
          <LinkToProduct
            target="_blank"
            data-a11y="false"
            href="https://www.giftingwild.com/donate"
          >
            <FigmaIcon aria-hidden="true" /> Donate
          </LinkToProduct>
          <SocialLinksOL />
        </LinkContainer>
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

const PreviewCard = styled.div`
  border-radius: 5px;
  overflow: hidden;
  background: red;
  margin-bottom: 25px;

  ${mediaqueries.desktop_up`
    display: none;
  `}
`

const LinkContainer = styled.div`
  display: flex;
  align-self: center;
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

const LinkToProduct = styled.a`
  position: relative;
  font-weight: 600;
  font-size: 16px;
  padding: 15px;
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

      svg {
        display: none;
      }
  `}
`


const Border = styled.div`
  position: relative;
  top: 1px;
  height: 1px;
`

const FeyLogo = () => (
  <img src={OceanLegacyLogo} alt="Support Ocean Legacy" height="100px" width="auto" />
)