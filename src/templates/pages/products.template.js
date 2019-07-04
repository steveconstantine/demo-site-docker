import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'

import Footer from '@components/Navigation/Navigation.Footer'
import Paginator from '@components/Navigation/Navigation.Paginator'
import Section from '@components/Section'
import SEO from '@components/SEO'
import Layout from '@components/Layout'
import ProductListing from '../../components-ecommerce/ProductListing'


function ProductsPageTemplate({ data, location, pageContext }) {
  const seo = data.allShopifyProduct.edges[0].node
  console.log(seo);
  const { products } = data.allShopifyProduct.edges

  const navConfig = {
    offset: true,
    fixed: true,
    theme: 'light',
  }

  const footerConfig = {
    visible: false,
  }

  return (
    <Layout nav={navConfig} footer={footerConfig} background={'#FFFFFF'}>
      <>
        <SEO
          title={seo.title}
          description={seo.description}
          image={seo.images[0].localFile.childImageSharp.fluid.src}
          pathname={location.pathname}
        />
        <WhiteBackground>
          <Section narrow>
            <ProductListing products={products}/>
          </Section>
          <Footer mode="light" />
        </WhiteBackground>
      </>
    </Layout>
  )
}

export default ProductsPageTemplate

export const query = graphql`
  query productsQuery {
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
    }
`;

const WhiteBackground = styled.div`
  position: relative;
  background: #fafafa;
`

