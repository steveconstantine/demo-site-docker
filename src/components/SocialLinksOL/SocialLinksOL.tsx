import React, { Fragment } from 'react'
import styled from 'styled-components'
import settings from '../../settings'

import * as SocialIcons from '../../icons/social'
import mediaqueries from '@styles/media'

const SocialLinksOL = ({ fill = 'white' }: { fill: string }) => (
  <Fragment>
    <SocialIconContainer
      target="_blank"
      rel="noopener"
      data-a11y="false"
      aria-label="Link to Facebook"
      href={settings.urls.ol.facebook}
    >
      <SocialIcons.FacebookIcon fill={fill} />
    </SocialIconContainer>
    <SocialIconContainer
      target="_blank"
      rel="noopener"
      data-a11y="false"
      aria-label="Link to Twitter"
      href={settings.urls.ol.twitter}
    >
      <SocialIcons.TwitterIcon fill={fill} />
    </SocialIconContainer>
    <SocialIconContainer
      target="_blank"
      rel="noopener"
      data-a11y="false"
      aria-label="Link to Instagram"
      href={settings.urls.ol.instagram}
    >
      <SocialIcons.InstagramIcon fill={fill} />
    </SocialIconContainer>
  </Fragment>
)

export default SocialLinksOL

const SocialIconContainer = styled.a`
  position: relative;
  margin-left: 2.12rem;
  text-decoration: none;

  &:first-child {
    margin-left: 0;
  }

  &:last-child {
    margin-right: 5.55rem;
  }

  &[data-a11y='true']:focus::after {
    content: '';
    position: absolute;
    left: -50%;
    top: -10%;
    width: 200%;
    height: 120%;
    border: 2px solid ${p => p.theme.colors.purple};
    background: rgba(255, 255, 255, 0.01);
    border-radius: 5px;
  }

  ${mediaqueries.tablet`
    margin: 3.5rem;
    display: flex;
    align-self: center;
  `};
`