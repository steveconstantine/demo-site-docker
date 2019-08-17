import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'

import Footer from '@components/Navigation/Navigation.Footer'
import Paginator from '@components/Navigation/Navigation.Paginator'
import Section from '@components/Section'
import SEO from '@components/SEO'
import Layout from '@components/Layout'
import CollectionListing from '../../components-ecommerce/CollectionListing'


function CollectionsPageTemplate({ data, location, pageContext }) {
  const seo = data.allShopifyCollection.edges[0].node
  const collections = data.allShopifyCollection.edges

  console.log(seo);

  const navConfig = {
    offset: true,
    fixed: true,
    theme: 'dark',
  }

  const footerConfig = {
    visible: false,
  }

  return (
    <Layout nav={navConfig} footer={footerConfig} background={'#08080b'}>
      <>
        <SEO
          title={seo.title}
          description={seo.description}
          image={'https://cdn.shopify.com/s/files/1/0734/4117/t/6/assets/logo.png'}
          pathname={location.pathname}
        />
        <>
          <CollectionListing nav={navConfig} collections={collections}/>
        </>
        <Footer mode="dark" />
      </>
    </Layout>
  )
}

export default CollectionsPageTemplate

export const query = graphql`
  query collectionsQuery {
    allShopifyCollection(
      sort: { fields: [updatedAt], order: ASC }
    ) {
      edges {
        node {
          id
          handle
          title
          description
          products {
          	images {
		      id
		      localFile {
		        childImageSharp {
		          fluid(maxWidth: 910, maxHeight: 910) {
					aspectRatio
		            src
		            srcSet
		            srcWebp
		            srcSetWebp
		            sizes
		          }
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
