import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { MdArrowBack } from 'react-icons/md';

import { Button } from '../shared/Buttons';

import { breakpoints, colors, fonts, spacing } from '../../utils/styles';

const BackLinkRoot = styled(`div`)`
  background: transparent;
  bottom: 0;
  left: 0;
  padding: ${spacing.md}px;
  padding-top: ${spacing.lg}px;
  position: fixed;
  width: 100%;

  @media (min-width: ${breakpoints.desktop}px) {
    padding: 0 ${spacing.xl}px;
    position: relative;
    width: 50%;
    display: grid;
  }
`;

const BackToListing = styled(Button)`
  width: 100%;
  background: #FFFFFFBB !important;

  @media (min-width: ${breakpoints.desktop}px) {
    width: auto;
  }
`;

const BackLink = ({ vendor, children, className }) => (
  <BackLinkRoot className={className}>
    <BackToListing to={"/" + vendor}>
      <MdArrowBack /> {children}
    </BackToListing>
  </BackLinkRoot>
);

BackLink.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

export default BackLink;
