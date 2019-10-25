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
    max-height: 100vh !important;
  }
`;

const Container = styled(`div`)`
  @media (min-width: ${breakpoints.desktop}px) {
    align-items: flex-start;
    display: flex;
  }-
`;

const Details = styled(`div`)`
  position: relative;

  @media (min-width: ${breakpoints.desktop}px) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-right: -${spacing.xl}px;
    max-width: 800px;
    min-height: 490px;
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
      product: { id, images, variants }
    } = this.props

    console.log(donation);

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
              images={images}
              imageOnClick={toggleProductImagesBrowser}
            />
          ) : (
            <ProductImagesDesktop
              images={images}
              imageOnClick={toggleProductImagesBrowser}
              imageFeatured={productImageFeatured}
            />
          )}
          <Details>
            <BackLinkContainer>
              <BackLink vendor={prevUrl}>Back / Previous</BackLink>
            </BackLinkContainer>
            <ProductSpecs product={product} />
            <DonationForm id={donation.id} variants={donation.variants} />
            <ProductForm id={id} variants={variants} />
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