import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'

import Footer from '@components/Navigation/Navigation.Footer'
import Paginator from '@components/Navigation/Navigation.Paginator'
import Section from '@components/Section'
import SEO from '@components/SEO'
import Layout from '@components/Layout'

import InterfaceContext, {
  defaultInterfaceContext
} from '../../context/InterfaceContext';

import ProductPage from '../../components-ecommerce/ProductPage';


function ProductPageTemplate({ data, location, pageContext }) {
  console.log(data);
  const seo = data.shopifyProduct
  const product = data.shopifyProduct

  const description = product.description
  const image = product.images[0].localFile.childImageSharp.fluid.src

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
       <InterfaceContext.Consumer>
          {({
            isDesktopViewport,
            productImagesBrowserStatus,
            productImageFeatured,
            toggleProductImagesBrowser,
            setCurrentProductImages
          }) => (
            <>
              <SEO
                title={seo.title}
                description={seo.description}
                image={seo.images[0].localFile.childImageSharp.fluid.src}
                pathname={location.pathname}
              />
              <Section narrow>
                <ProductPage
                        product={product}
                        isDesktopViewport={isDesktopViewport}
                        productImagesBrowserStatus={productImagesBrowserStatus}
                        productImageFeatured={productImageFeatured}
                        toggleProductImagesBrowser={toggleProductImagesBrowser}
                        setCurrentProductImages={setCurrentProductImages}
                 />
              </Section>
              <Footer mode="light" />
            </>
            )}
       </InterfaceContext.Consumer>
      </>
    </Layout>
  )
}

export default ProductPageTemplate

export const query = graphql`
  query($handle: String!) {
    shopifyProduct(handle: { eq: $handle }) {
      id
      title
      handle
      description
      productType
      vendor
      variants {
        shopifyId
        title
        price
        availableForSale
      }
      images {
        id
        altText
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
`;

const WhiteBackground = styled.div`
  position: relative;
  background: #fafafa;
`
