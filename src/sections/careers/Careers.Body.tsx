import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import styled from 'styled-components'
import AniLink from 'gatsby-plugin-transition-link/AniLink'

import {
  CareersAccordian,
  CareersGraph,
  CareersImages,
  Perks,
  Section,
} from '@components'
import mediaqueries from '@styles/media'

import CareersRow from './Careers.Row'

// Grabbing all the gallery images. Returns an Array[] of images
const galleryQuery = graphql`
  query CareersBodyQuery {
    gallery: allFile(filter: { name: { regex: "/careers-gallery/" } }) {
      edges {
        node {
          childImageSharp {
            fluid(maxWidth: 960, quality: 100) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
      }
    }
  }
`

const galleryDescriptions = [
  'Gifting-Wild team members looking at new tech products',
  'Mack telling a funny story at a team dinner',
  'Gifting-Wild directing an onsite photoshoot',
  'Soya, our beloved cat',
  'Gifting-Wild team working together at a Cafe',
  'Gifting-Wild team out for dinner',
  'Gifting-Wild working on the assets for Hopper.com',
  'Gifting-Wild team visits the Hopper office',
]

/**
 * Careers Body
 * - Why Gifting-Wild
 * - Working at Gifting-Wild
 * - Rail/Horizontal Scroll of Gallery images
 * - Building our future (Labs/Studio)
 * - Careers
 */
function CareersBody() {
  const { gallery } = useStaticQuery(galleryQuery)

  return (
    <>
      <CareersRow header="Why Gifting-Wild">
        <SectionCopy maxWidth="69rem">
          At Gifting-Wild, nobody has a "boss". Instead, we hold a common goal,
          where everyone owns executive level decision, regardless of position.
          We teach and learn from each other everyday, with growth based on
          trust and relationships.
        </SectionCopy>
      </CareersRow>
      <CareersRow header="Working at Gifting-Wild">
        <FlexColumn>
          <WhatWeDoContent>
            <SectionCopy maxWidth="42rem">
              Not only are we mindful of the projects we select, we get to
              choose how and when we work, to ensure we're at our best.
            </SectionCopy>
          </WhatWeDoContent>
          <WhatWeDoList>
            <Perks />
          </WhatWeDoList>
        </FlexColumn>
      </CareersRow>

      {/* Horizontal scroll Gallery */}
      <CareersRow header="We have fun">
        <SectionCopy maxWidth="67rem">
          Since we're all remote, it's always a party when the team gets
          together. And we like food... a lot.
        </SectionCopy>
        <CareersImages
          images={gallery.edges}
          descriptions={galleryDescriptions}
        />
      </CareersRow>

      {/* Graph with Studio and Labs */}
      <CareersRow
        header={
          <div style={{ paddingRight: '2.5rem' }}>Building our future</div>
        }
      >
        <SectionCopy maxWidth="67rem">
          We engage with exceptional clients to fund our own ideas. Displaying
          our core beliefs through the development of our own products. We call
          this <LabsLink to="/labs">Gifting-Wild Labs</LabsLink>.
        </SectionCopy>
      </CareersRow>
      <CareersGraph />

      {/* Get a job at Gifting-Wild */}
      <CareersRow header="Say hello">
        <SectionCopy maxWidth="67rem">
          If you have the devotion, the curiosity and the desire to build great
          things, you might fit right in.
        </SectionCopy>
      </CareersRow>
      <Section narrow>
        <CareersAccordian />
      </Section>
    </>
  )
}

export default CareersBody

const SectionCopy = styled.p`
  color: #fff;
  font-size: 3.2rem;
  line-height: 1.2;
  max-width: ${props => (props.maxWidth ? props.maxWidth : '100%')};

  ${mediaqueries.desktop`
    font-size: 2.2rem;
    line-height: 1.4;
    max-width: 100%;
  `};

  ${mediaqueries.tablet`
    font-size: 1.8rem;
  `};
`

const WhatWeDoList = styled.div`
  width: 38rem;
  list-style: none;

  ${mediaqueries.desktop`
    width: 100%;
  `};
`

const FlexColumn = styled.div`
  display: flex;
  justify-content: space-between;

  ${mediaqueries.desktop`
    flex-direction: column;
  `};
`

const WhatWeDoContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${mediaqueries.desktop`
    margin-bottom: 2.5rem;
  `};
`

const LabsLink = styled(AniLink)`
  text-decoration: underline;
  text-decoration-color: ${p => p.theme.colors.gold};
  color: #fff;
  transition: color 0.3s ease-out;

  &:hover {
    color: ${p => p.theme.colors.gold};
  }
`
