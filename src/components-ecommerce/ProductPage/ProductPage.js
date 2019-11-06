import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import DonationForm from './DonationForm';
import ProductImagesMobile from './ProductImagesMobile';
import ProductImagesDesktop from './ProductImagesDesktop';
import ProductSpecs from './ProductSpecs';
import ProductForm from './ProductForm';
import BackLink from './BackLink';
import { isMobile } from 'react-device-detect'

import { breakpoints, spacing } from '../../utils/styles';

const ProductPageRoot = styled('div')`
  padding-bottom: ${spacing.md}px;

  @media (min-width: ${breakpoints.desktop}px) {
    align-items: center;
    display: flex;
    justify-content: center;
    min-height: calc(100vh - 480px);
    padding: ${spacing.xl}px;
    width: 100%;
  }
`;

const Container = styled(`div`)`
  width: 100%;
  @media (min-width: ${breakpoints.desktop}px) {
    align-items: flex-start;
    display: flex;
  }
`;

const DonationContainer = styled(`div`)`
    align-items: flex-end;
    justify-content: flex-end;
    align-self: flex-end;
    display: flex;
    margin: 0 100% 0;
    padding-right: 10px;

    @media all and (min-width: 1000px) {
      margin: 0 0 0 auto;
    }
`;

const Details = styled(`div`)`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 800px;
  min-height: 490px;
  
  @media (min-width: 1024px) {
    min-width: 650px;
  }
`;

const BackLinkContainer = styled(`div`)`
  position: relative;

  @media (min-width: ${breakpoints.desktop}px) {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    max-width: 555px;
  }
`;

class ProductPage extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const images = this.props.product.images
    this.props.setCurrentProductImages(images)
  }

  render() {
    const {
      donation,
      product,
    } = this.props

    const prevUrl = this.props.prevUrl
    const {
      isDesktopViewport,
      productImageFeatured,
      toggleProductImagesBrowser
    } = this.props

    return (
      <ProductPageRoot>
        <Container>
          { isMobile ? (
            <ProductImagesMobile
              images={product.images}
              imageOnClick={toggleProductImagesBrowser}
            />
          ) : (
            <ProductImagesDesktop
              images={product.images}
              imageOnClick={toggleProductImagesBrowser}
              imageFeatured={productImageFeatured}
            />
          )}
          <Details>
            <BackLinkContainer>
              <BackLink vendor={prevUrl}>Back / Previous</BackLink>
            </BackLinkContainer>
            <ProductSpecs product={product} id={donation.id} variants={donation.variants} />
            <ProductForm id={product.id} variants={product.variants} />
          </Details>
        </Container>
      </ProductPageRoot>
    );
  }
}


ProductPage.propTypes = {
  product: PropTypes.object.isRequired,
  productImagesBrowserStatus: PropTypes.string.isRequired,
  toggleProductImagesBrowser: PropTypes.func.isRequired,
  setCurrentProductImages: PropTypes.func.isRequired,
  productImageFeatured: PropTypes.object,
  isDesktopViewport: PropTypes.bool
};

export default ProductPage;