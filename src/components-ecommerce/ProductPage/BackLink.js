import React from 'react';
import { navigate } from 'gatsby';
import AniLink from 'gatsby-plugin-transition-link/AniLink'
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { MdArrowBack } from 'react-icons/md';

import { Button } from '../shared/Buttons';

import { breakpoints, colors, fonts, spacing } from '../../utils/styles';

const BackLinkRoot = styled(`div`)`
  background: #00000088;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 10px;
  position: fixed;
  width: 100%;
  border-radius: 5px;
  text-align: center;

  @media (max-width: ${breakpoints.desktop}px) {
    z-index: 1000;
  }

  @media (min-width: ${breakpoints.desktop}px) {
    padding: 0 ${spacing.xl}px;
    margin-left: 36px;
    position: relative;
    width: 50%;
    display: grid;
  }
`;

const BackToListing = styled(AniLink)`
  width: 100%;
  color: white !important;
  border-radius: 4px;

  @media (min-width: ${breakpoints.desktop}px) {
    width: auto;
  }
`;

const BackLink = ({ vendor, children, className }) => (
  <BackLinkRoot className={className}>
    <BackToListing fade to={vendor}>
      <MdArrowBack /> {children}
    </BackToListing>
  </BackLinkRoot>
);

BackLink.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

export default BackLink;
