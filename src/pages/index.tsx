import React from 'react'
import { graphql } from 'gatsby'

import Layout from '@components/Layout'
import SEO from '@components/SEO'

import HomeHero from '../sections/home/Home.Hero'
import HomeAbout from '../sections/home/Home.About'
import HomeCallToAction from '../sections/home/Home.CallToAction'
import HomeTestimonial from '../sections/home/Home.Testimonial'
import HomeServices from '../sections/home/Home.Services'

/**
 * The home page of giftingwild.com!
 */
function IndexPage({ data, location }) {
  const contentful = data.allContentfulPage.edges[0].node
  const navConfig = {
    offset: true,
    fixed: true,
    theme: 'dark',
  }

  return (
    <Layout
      nav={navConfig}
      location={location}
      paddingBottom={true}
      background={"url('https://images.squarespace-cdn.com/content/v1/5b2ffc2a3c3a53bd6c829957/1535414006445-FZH3Q7Q4737BVCCSM66M/ke17ZwdGBToddI8pDm48kCMHgdKvgBtjr1p_wxI79hl7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1UXH1NgUy1J3SPXoAXSU1NLlEwQ1-mdcAYBUwEkYv-BbgQK7PAiDfWd0Koy0MH7DUzQ/whalesong8x32.jpg')"}
      withFooter={false}
    >
      <>
        <SEO
          title={contentful.seo.title}
          description={contentful.seo.description}
          image={contentful.seo.image.file.url}
          pathname={location.pathname}
        />
        <HomeHero />
      </>
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query HomePageQuery {
    allContentfulPage(filter: { pageName: { eq: "Home" } }) {
      edges {
        node {
          seo {
            title
            description
            image {
              file {
                url
              }
            }
          }
        }
      }
    }
  }
`
