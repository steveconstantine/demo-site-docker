import React from 'react'
import styled from 'styled-components'

import Paginator from '@components/Navigation/Navigation.Paginator'

import mediaqueries from '@styles/media'

function ArticlesPagination({ pageContext }) {
  if (pageContext.pageCount <= 1) return null

  return (
    <HorizontalRule>
      <Paginator {...pageContext} />
    </HorizontalRule>
  )
}

export default ArticlesPagination

const HorizontalRule = styled.div`
  position: relative;
  color: rgba(0, 0, 0, 0.25);

  ${mediaqueries.tablet`
    margin-bottom: 60px;
  `}

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 12px;
    width: 100%;
    height: 1px;
    background: rgba(0, 0, 0, 0.25);
  }

  & > nav {
    position: relative;
    background: #fafafa;
    z-index: 1;
    top: -17px;
    width: ${(230 / 1140) * 100}%;

    ${mediaqueries.tablet`
      width: auto;
      padding-right: 20px;
    `}
  }
`
