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
  console.log(data);
  const seo = data.allShopifyProduct.edges[0].node
  const product = data.allShopifyProduct.edges[0].node  
  const donation = pageContext.donation[0].node

  console.log(product);

  const description = product.description
  const image = product.images[0].localFile.childImageSharp.fixed.src

  console.log('template product data & image');
  console.log(product);

  const navConfig = {
    offset: true,
    fixed: true,
    theme: 'dark',
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
  query productQuery($handle: String!) {
    allShopifyProduct(filter: { 
      handle: { eq: $handle } }
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
                  fluid(maxHeight: 10000) {
                    aspectRatio
                    src
                    srcSet
                    srcWebp
                    srcSetWebp
                    sizes
                  }
                  fixed(quality: 100) {
                    width
                    height
                    src
                    srcSet
                    srcWebp
                    srcSetWebp
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