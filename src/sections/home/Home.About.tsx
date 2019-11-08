import React, { useContext } from 'react'
import styled from 'styled-components'
import { useStaticQuery, graphql, navigate } from 'gatsby'
import { ContactContext } from '@components/Contact/Contact.Context'

import Section from '@components/Section'
import Heading from '@components/Heading'
import Sticky from '@components/Sticky'
import Media from '@components/Media/Media.Img'
import ButtonArrow from '@components/Button/Button.Arrow' 

import mediaqueries from '@styles/media'

const aboutText = [
  `More than 5 trillion pieces of plastic, weighing nearly 269,000 tons, are littering the world's oceans according to a study by the scientific journal PLOS One. The study is the first of its kind to gather data from around the world on floating plastic.<br/>
  <em>Source:</em> <a style="color:#FAFAFA; text-decoration: underline;" href="https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0111913" target="_blank" >https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0111913/</a>`,
  `Coastal land-based human dispersal account for 80% of ocean plastic pollution, globally. Over 6.5 million tons of litter enter the world’s Ocean each year. 50% is long-lasting plastic that will drift for hundreds of years before it is degraded.<br/>
  <em>Source:</em> <a style="color:#FAFAFA; text-decoration: underline;" href="https://www.worldoceannetwork.org/won-part-6/carem-wod-2014-4/thematic-resources-pollution/" target="_blank">
  https://www.worldoceannetwork.org/won-part-6/carem-wod-2014-4/thematic-resources-pollution/facts-figures-pollution/</a>`,
  `More than a million seabirds and over 100,000 marine mammals die every year from plastic. Every day, more and more marine creatures are dying and washing ashore full of plastic and trash.<br/>   
  <em>Source:</em> <a style="color:#FAFAFA; text-decoration: underline;" href="http://www.perseus-net.eu/site/content.php?locale=1&sel=517&artid=565" target="_blank">http://www.perseus-net.eu/site/content.php?locale=1&sel=517&artid=565</a>`,
  `Please view this information and more on <a style="color:#FAFAFA; text-decoration: underline; font-size: 22px;" href="https://oceanlegacy.ca" target="_blank" >oceanlegacy.ca</a>. We are proud to support Ocean Legacy Foundation in their efforts to solve the global ocean pollution crisis.`,
  `Thanks for your attention to gifting wild,<br/>
  Ben and Steve`
]

const imageQuery = graphql`
  query ShapeImageQuery {
    glow: file(name: { regex: "/mobile-glow/" }) {
      childImageSharp {
        fluid(maxWidth: 787, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
  }
`

/**
 * <HomeAbout />
 *
 * The challenge was to create a FadeIn and FadeOut effect as the user
 * scrolls over the main Paragraphs of the homepage.
 *
 * To accomplish this we do two things
 * 1. Using a Padding/Margin trick to get the FadeOut to work nicely
 * 2. Overlaying a fixed gradient to get the FadeIn to work nicely
- */
const HomeAbout = () => {
  const { glow } = useStaticQuery(imageQuery)
  const { toggleContact } = useContext(ContactContext)

  return (
    <>
      <MobileContainer>
        <MediaContainer>
        </MediaContainer>
      </MobileContainer>
      <Gradient>
        <Grid narrow>
          <div>
          </div>
          <div>
            <MainText>
              GIFTING WILD<br/><span>Giving opportunity for a healthy ocean.</span>
            </MainText>
            {aboutText.map(text => (
              <TextContainer data-scroll-fade={true}>
                <Text dangerouslySetInnerHTML={{ __html: text }} />
              </TextContainer>
            ))}
            <ButtonContainer data-scroll-fade={true}>
                <ButtonArrow onClick={() => {
                            event.preventDefault()
                            toggleContact()
                          }} text="Get in touch" />
                <ButtonArrow onClick={() => navigate('/articles')} text="Read our Articles" />
            </ButtonContainer>
          </div>
        </Grid>
      </Gradient>
    </>
  )
}

export default HomeAbout

const MainText = styled.h1`
  font-size: 5rem;
  font-weight: 700;
  color: #FEFEFE;
  line-height: 1.3;
  margin-bottom: 50px;
  text-align: center; 
  margin-bottom: 65px;

  ${mediaqueries.phablet`
    font-size: 3.2rem;
  `};

  span {
    font-weight: 400;
  }
`

const Gradient = styled.div`
  position: relative;
  z-index: 1;
  background: transparent;
`

const Grid = styled(Section)`
  position: relative;
  display: grid;
  grid-template-columns: 135px 870px;
  grid-column-gap: 10px;
  padding-top: 100px;
  padding-bottom: 30px;
  z-index: 2;

  ${mediaqueries.tablet`
    padding-top: 80px;
    display: block;
    padding-bottom: 100;
  `}
`

const TextContainer = styled.div`
  position: relative;
  padding-top: 0;
  margin-bottom: 85px;
  will-change: opacity;

  a {
    font-size: 2.25rem;
  }

  em {
    font-size: 2.45rem;
  }

  ${mediaqueries.tablet`
    a {
      font-size: 1.45rem;
    }
    em {
      font-size: 1.65rem;
    }
    font-size: 1.8rem;
    top: 0;
    margin: 0;
    padding: 0 0 40px 0;
  `};
`

const ButtonContainer = styled.div`
  will-change: opacity;
  padding: 0 10px;
`

const Text = styled.p`
  font-size: 32px;
  color: #fff;
  padding: 0 10px;

  ${mediaqueries.tablet`
    font-size: 22px;
  `};
`

const AboutHeading = styled(Heading.h2)`
  position: relative;
  color: ${p => p.theme.colors.grey};
`

const MobileContainer = styled.div`
  position: relative;
  max-width: 100vw;
  margin-bottom: -85%;
  overflow-x: hidden;

  ${mediaqueries.tablet_up`
    display: none;
  `}
`

const MediaContainer = styled.div`
  position: static;
  left: 0;
  top: -100px;
  height: 400px;
  width: 100%;
`

const Slash = () => (
  <svg
    width="100%"
    viewBox="0 0 375 761"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g filter="url(#filter0_f)">
      <path
        d="M329.998 436.561L45 637.141V734.469L329.984 534.782L329.998 436.561Z"
        stroke="url(#paint0_linear)"
        strokeWidth="12"
      />
    </g>
    <g filter="url(#filter1_dd)">
      <path
        d="M329.998 379.319L45 178.816V81.528L329.984 281.14L329.998 379.319Z"
        stroke="white"
        strokeWidth="12"
      />
    </g>
    <rect
      x="35.5"
      y="66.5"
      width="6"
      height="6"
      fill="black"
      stroke="#93C3EA"
    />
    <rect
      x="35.5"
      y="388.5"
      width="6"
      height="6"
      fill="black"
      stroke="#93C3EA"
    />
    <rect
      x="333.5"
      y="388.5"
      width="6"
      height="6"
      fill="black"
      stroke="#93C3EA"
    />
    <rect
      x="333.5"
      y="66.5"
      width="6"
      height="6"
      fill="black"
      stroke="#93C3EA"
    />
    <rect
      x="42.25"
      y="69.25"
      width="290.5"
      height="0.5"
      fill="#73737D"
      stroke="#93C3EA"
      strokeWidth="0.5"
    />
    <rect
      x="42.25"
      y="391.25"
      width="290.5"
      height="0.5"
      fill="#73737D"
      stroke="#93C3EA"
      strokeWidth="0.5"
    />
    <rect
      x="336.771"
      y="73.2706"
      width="314.459"
      height="0.54123"
      transform="rotate(90 336.771 73.2706)"
      fill="#73737D"
      stroke="#93C3EA"
      strokeWidth="0.54123"
    />
    <rect
      x="38.7706"
      y="73.2706"
      width="314.459"
      height="0.54123"
      transform="rotate(90 38.7706 73.2706)"
      fill="#73737D"
      stroke="#93C3EA"
      strokeWidth="0.54123"
    />
    <defs>
      <filter
        id="filter0_f"
        x="24"
        y="410"
        width="327"
        height="351"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feGaussianBlur stdDeviation="7.5" result="effect1_foregroundBlur" />
      </filter>
      <filter
        id="filter1_dd"
        x="-31"
        y="0"
        width="437"
        height="460.877"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset />
        <feGaussianBlur stdDeviation="35" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.399641 0 0 0 0 0.453299 0 0 0 0 0.554653 0 0 0 0.6 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset />
        <feGaussianBlur stdDeviation="5" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.2 0"
        />
        <feBlend
          mode="normal"
          in2="effect1_dropShadow"
          result="effect2_dropShadow"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect2_dropShadow"
          result="shape"
        />
      </filter>
      <linearGradient
        id="paint0_linear"
        x1="187.5"
        y1="552"
        x2="187.5"
        y2="425"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" stopOpacity="0" />
        <stop offset="1" stopColor="white" stopOpacity="0.2" />
      </linearGradient>
    </defs>
  </svg>
)
