import React from 'react';
import styled from '@emotion/styled';

import { breakpoints, colors, fonts, spacing } from '../../utils/styles';

const CollectionListingHeaderRoot = styled(`header`)`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 40em;
  padding: ${spacing.lg}px;
  text-align: center;
`;

const Title = styled(`h1`)`
  color: ${p => (p.theme == 'dark' ? '#fafafa' : '#08080b')};
  font-family: ${fonts.heading};
  font-size: 2.4rem;
  letter-spacing: -0.02em;
  line-height: 1;
  margin: 0;
  margin-top: ${spacing.md}px;

  @media (min-width: ${breakpoints.desktop}px) {
    font-size: 3rem;
  }
`;

const Intro = styled(`p`)`
  color: ${p => (p.theme == 'dark' ? '#fafafa' : '#08080b')};
  font-size: 1rem;
  line-height: 1.4;
  margin: 0;
  margin-top: ${spacing.md}px;

  @media (min-width: ${breakpoints.desktop}px) {
    font-size: 1.1rem;
    line-height: 1.6;
  }
`;

const CollectionListingHeader = (theme) => (
  <CollectionListingHeaderRoot>
    <Title>Get Gatsby Swag!</Title>
    <Intro>
      The money we charge for swag helps to cover production and shipping costs.
      In the unlikely event that Gatsby swag ends up turning a profit, we’ll
      reinvest that money into the open source community.
    </Intro>
  </CollectionListingHeaderRoot>
);

export default CollectionListingHeader;
