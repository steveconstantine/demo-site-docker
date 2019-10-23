import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'

import Footer from '@components/Navigation/Navigation.Footer'
import Paginator from '@components/Navigation/Navigation.Paginator'
import Section from '@components/Section'
import SEO from '@components/SEO'
import Layout from '@components/Layout'
import ProductImagesBrowser from '../../components-ecommerce/ProductPage/ProductImagesBrowser';

import InterfaceContext, {
  defaultInterfaceContext
} from '../../context/InterfaceContext';

import ProductPage from '../../components-ecommerce/ProductPage';


function ProductPageTemplate({ data, location, pageContext }) {
  const seo = data.allShopifyProduct.edges[0].node
  const product = data.allShopifyProduct.edges[0].node
  const donation = pageContext.donation[0].node

  console.log(pageContext.donation[0].node);

  const description = product.description
  const image = product.images[0].localFile.childImageSharp.fixed.src

  const navConfig = {
    offset: true,
    fixed: true,
    theme: 'light',
  }

  const footerConfig = {
    visible: true,
  }

  return (
    <Layout nav={navConfig} footer={footerConfig} background={'url(' + image + ') top center'}>
      <>
          <SEO
            title={seo.title}
            description={seo.description}
            image={seo.images[0].localFile.childImageSharp.fluid.src}
            pathname={location.pathname}
          />
          <WhiteBackground>
            <Section narrow>
              <InterfaceContext.Consumer>
                {({
                            isDesktopViewport,
                            cartStatus,
                            toggleCart,
                            contributorAreaStatus,
                            toggleContributorArea,
                            productImagesBrowserStatus,
                            currentProductImages,
                            featureProductImage,
                            productImageFeatured,
                            toggleProductImagesBrowser,
                            setCurrentProductImages
                          }) => (
                          <>
                <ProductPage
                        donation={donation}
                        product={product}
                        prevUrl={location && location.state && location.state.prevUrl ? location.state.prevUrl : '/'}
                        isDesktopViewport={isDesktopViewport}
                        productImagesBrowserStatus={productImagesBrowserStatus}
                        productImageFeatured={productImageFeatured}
                        toggleProductImagesBrowser={toggleProductImagesBrowser}
                        setCurrentProductImages={setCurrentProductImages}
                 />
                            {currentProductImages.length > 0 && (
                              <ProductImagesBrowser
                                featureProductImage={featureProductImage}
                                images={currentProductImages}
                                position={productImagesBrowserStatus}
                                imageFeatured={productImageFeatured}
                                toggle={toggleProductImagesBrowser}
                                isDesktopViewport={isDesktopViewport}
                              />
                            )}
                          </>
                        )}
                </InterfaceContext.Consumer>
            </Section>
          </WhiteBackground>
        </>
    </Layout>
  )
}

export default ProductPageTemplate

export const query = graphql`
  query productQuery($productType: String!) {
    allShopifyProduct(filter: { 
      productType: { in: [$productType] } }
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
                  fixed {
                    ...GatsbyImageSharpFixed_withWebp
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
  min-height: calc(100vh - 120px);
`
