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
  width: 24px;
  border-radius: 5px;
  text-align: center;
  position: fixed;

  @media (max-width: ${breakpoints.desktop}px) {
    z-index: 1000;
  }

  @media (min-width: ${breakpoints.desktop}px) {
    margin-left: 36px;
    display: grid;
    position: static;
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
      <ChevronLeft /> {children}
    </BackToListing>
  </BackLinkRoot>
);

BackLink.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

export default BackLink;

const ChevronLeft = ({ fill = '#FAFAFA' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" fill={fill} />
    <path d="M0 0h24v24H0z" fill="none" />
  </svg>
)
