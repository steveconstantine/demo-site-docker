import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import { breakpoints, colors, fonts, spacing } from '../../utils/styles';

const ProductSpecsRoot = styled(`div`)`
  padding: 40px 32px 32px;
  border-radius: 5px;
  background: #00000044;

  @media (min-width: ${breakpoints.tablet}px) {
    padding: 40px 32px 32px;
    margin: 40px 36px 0px 32px;
  }
`;

const Name = styled(`h1`)`
  color: #FFF;
  font-family: ${fonts.heading};
  font-size: 2.8rem;
  font-weight: 500;
  margin: 0;
  mix-blend-mode: hard-light;
`;

const Description = styled(`p`)`
  color: #FFF;
  font-size: 2rem;
  line-height: 1.5;
  mix-blend-mode: hard-light;
`;

const Price = styled(`div`)`
  color: #FFF;
  font-size: 2.8rem;
  font-weight: 500;
  letter-spacing: -0.02em;
  mix-blend-mode: hard-light;

  span {
    color: #FFF;
  }
`;

const removeCareInstructions = desc =>
  desc.split(/Care Instructions/).slice(0, 1);

const ProductSpecs = props => {
  const {
    product: {
      title,
      description,
      variants: [variant]
    }
  } = props;

  const { price } = variant;

  return (
    <ProductSpecsRoot>
      <Name>{title}</Name>
      <Description>{removeCareInstructions(description)}</Description>
      <Price>
        <span>USD</span> ${price}
      </Price>
    </ProductSpecsRoot>
  );
};

ProductSpecs.propTypes = {
  product: PropTypes.object.isRequired
};

export default ProductSpecs;
