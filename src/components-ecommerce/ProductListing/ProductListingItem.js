import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import AniLink from 'gatsby-plugin-transition-link/AniLink';
import Image from 'gatsby-image';

import { MdShoppingCart, MdArrowForward } from 'react-icons/md';
import UserContext from '../../context/UserContext';

import {
  removeCareInstructions,
  cutDescriptionShort
} from '../../utils/helpers';

import {
  breakpoints,
  colors,
  fonts,
  radius,
  spacing,
  animations
} from '../../utils/styles';

const DESCRIPTION_LIMIT = 90;
const TRANSITION_DURATION = '250ms';

const ProductListingItemLink = styled(AniLink)`
  background: #00000066;
  border-radius: ${radius.large}px;
  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.15);
  margin-bottom: ${spacing.lg}px;
  overflow: hidden;
  text-decoration: none;
  flex-basis: 40vw;
  width: 40vw;
  max-height: 555px;
  transition: all ${TRANSITION_DURATION};
  margin-left: 3px;
  margin-right: 3px;
  opacity: 0.9;

  @media (min-width: ${breakpoints.tablet}px) {
    margin-left: 4px;
    margin-right: 4px;
    max-width: 400px;
  }

  @media (min-width: ${breakpoints.desktop}px) {
    flex-basis: 400px;
    justify-content: center;
    margin: 5px;
  }

   @media (max-width: ${breakpoints.phablet}px) {
    height: 400px;
    opacity: 1;
    filter: grayscale(0);
  }

  &:hover {
      filter: grayscale(0);
      opacity: 1;
      filter: brightness(105%);
  }

  @media (hover: hover) {
    :hover {
      background: #000;
    }
  }
`;

const Item = styled(`article`)`
  display: flex;
  flex-direction: column;
  max-height: 555px;
  padding: 36px 34px;

  @media (max-width: ${breakpoints.tablet}px) {
    height: 444px;
    padding: 12px 10px;
  }

  @media (min-width: ${breakpoints.tablet}px) {
    height: 555px;
  }
`;

const Preview = styled(`div`)`
  border-bottom: 0px solid ${colors.brandLight};
  border-radius: ${radius.large}px ${radius.large}px 0 0;
  margin: -${spacing.lg}px;
  margin-bottom: ${spacing.lg}px;
  overflow: hidden;
  position: relative;

  .gatsby-image-wrapper {
    transition: all ${TRANSITION_DURATION};
  }

  @media (hover: hover) {
    ${ProductListingItemLink}:hover & {
      .gatsby-image-wrapper {
        transform: scale(1.1);
      }
    }
  }
`;

const CodeEligibility = styled(`div`)`
  align-items: stretch;
  animation: ${animations.simpleEntry};
  border-radius: ${radius.default}px;
  bottom: 0;
  color: ${colors.lightest};
  display: flex;
  left: ${spacing.lg}px;
  overflow: hidden;
  position: absolute;
  right: ${spacing.lg}px;

  span {
    align-items: center;
    display: flex;
    height: 30px;
    justify-content: center;
  }

  span:first-of-type {
    background: #999;
    flex-basis: 35%;
    font-size: 0.9rem;
  }

  span:last-child {
    background: ${props =>
      props.freeWith === 'HOLYBUCKETS' ? colors.lemon : colors.brand};
    color: ${props =>
      props.freeWith === 'HOLYBUCKETS' ? colors.brand : colors.lemon};
    flex-basis: 65%;
    font-family: ${fonts.heading};
    font-size: 1rem;
  }
`;

const Name = styled(`h1`)`
  color: #dddde2;
  font-family: ${fonts.heading};
  font-size: 1.6rem;
  line-height: 1.2;
  margin: 0;
`;

const Description = styled(`p`)`
  color: #dddde2;
  flex-grow: 1;
  max-height: 75px;
  font-size: 1rem;
  line-height: 1.5;
`;

const PriceRow = styled(`div`)`
  align-items: flex-end;
  display: flex;
  justify-content: space-between;
  margin-top: ${spacing.xs}px;
`;

const Price = styled(`div`)`
  color: #dddde2;
  font-size: 1.4rem;
  font-weight: 500;
  letter-spacing: -0.02em;

  span {
    color: #FFF;
  }
`;

const Incentive = styled('div')`
  align-items: center;
  color: #dddde2;
  display: flex;
  font-size: 0.9rem;
  line-height: 1.3;
  margin-bottom: ${spacing['2xs']}px;
  margin-right: calc(-${spacing.lg}px - 55px);
  text-align: right;
  transition: all ${TRANSITION_DURATION};

  @media (hover: hover) {
    ${ProductListingItemLink}:hover & {
      transform: translateX(-80px);
    }
  }

    &:focus {
      outline: none !important;
  }

  > span {
    svg {
      display: inline;
      margin-right: -${spacing['3xs']}px;
      vertical-align: middle;
    }
  }
`;

const CartIcon = styled(`span`)`
  align-items: center;
  background: white;
  border-radius: ${radius.default}px 0 0 ${radius.default}px;
  display: flex;
  height: 40px;
  justify-content: center;
  margin-left: ${spacing.lg}px;
  position: relative;
  transition: all ${TRANSITION_DURATION};
  vertical-align: middle;
  width: 40px;

  @media (hover: hover) {
    ${ProductListingItemLink}:hover & {
      margin-left: ${spacing.xs}px;
    }
  }

  svg {
    color: black;
    height: 22px;
    position: relative;
    width: 22px;
  }
`;

const checkEligibility = ({ contributor, freeWith }) => {
  const { shopify } = contributor;

  let eligibleCodes = [];

  if (shopify && shopify.codes) {
    eligibleCodes = shopify.codes.filter(
      code => code.code === freeWith && code.used === false
    );
  }

  return eligibleCodes.length ? true : false;
};

const ProductListingItem = props => {
  const {
    product: {
      title,
      handle,
      description,
      variants: [firstVariant],
      images: [firstImage]
    }
  } = props;

  const { price } = firstVariant;
  const {
    localFile: {
      childImageSharp: { fluid }
    }
  } = firstImage;

  const freeWith =
    price >= 20 ? 'HOLYBUCKETS' : price >= 10 ? 'BUILDWITHGATSBY' : null;

  return (
    <UserContext.Consumer>
      {({ contributor }) => {
        return (
          <ProductListingItemLink fade to={`/product/${handle}`}>
            <Item>
              <Preview>
                <Image fluid={fluid} />
                
                {checkEligibility({
                  freeWith,
                  contributor
                }) && (
                  <CodeEligibility freeWith={freeWith}>
                    <span>free with </span>
                    <span>
                      Code Swag Level
                      {freeWith === 'HOLYBUCKETS' ? '2' : '1'}
                    </span>
                  </CodeEligibility>
                )}
              </Preview>
              <Name>{title}</Name>
              <Description>
                {cutDescriptionShort(
                  removeCareInstructions(description),
                  DESCRIPTION_LIMIT
                )}
              </Description>
              <PriceRow>
                <Price>
                </Price>
                <Incentive>
                  <span>
                    view details
                    <br />& buy <MdArrowForward />
                  </span>
                  <CartIcon>
                    <MdShoppingCart />
                  </CartIcon>
                </Incentive>
              </PriceRow>
            </Item>
          </ProductListingItemLink>
        );
      }}
    </UserContext.Consumer>
  );
};

ProductListingItem.propTypes = {
  product: PropTypes.object.isRequired
};

export default ProductListingItem;
