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
  padding: 0 0;
  padding-top: ${spacing.lg}px;
  position: fixed;
  width: 100%;
  border-radius-top: 5px;
  border-radius-bottom: 5px;
  z-index: 1000;

  @media (min-width: ${breakpoints.desktop}px) {
    padding: 0 ${spacing.xl}px;
    position: relative;
    width: 50%;
    display: grid;
  }
`;

const BackToListing = styled(Button)`
  width: 100%;
  background: #000000BB !important;
  color: white !important;
  border-radius: 4px;

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
