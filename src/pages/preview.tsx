import React, { useEffect, useState } from 'react'
import { mergeDeepRight } from 'ramda'
import styled from 'styled-components'

import Layout from '@components/Layout'
import Logo from '@components/Logo'
import Heading from '@components/Heading'
import mediaqueries from '@styles/media'
import Article from '../templates/posts/article.template'

import settings from '../settings'

function Preview(props) {
  const [hasFetched, setHasFetched] = useState(false)
  const [article, setArticle] = useState()
  const [error, setError] = useState()

  const fauxProps = mergeDeepRight(props, {
    pageContext: { article, relateds: [] },
    pathContext: { article },
  })

  useEffect(() => {
    const entryId = new URL(props.location.href).searchParams.get('entry')
    const endpoint = `${settings.urls.netlify.preview}?entry=${entryId}`

    const handleErrors = async response => {
      if (!response.ok) throw Error(await response.json())
      return response
    }

    // Fetch the endpoint passing the entry ID
    fetch(endpoint)
      .then(handleErrors)
      .then(response => response.json())
      .then(node => {
        setArticle(node)
        setHasFetched(true)
      })
      .catch(({ message: error }) => {
        setError(error)
        setHasFetched(true)
      })
  }, [])

  if (!hasFetched || error) {
    return <PreviewState error={error} />
  }

  return (
    <>
      <Article {...fauxProps} />
      <PreviewIndicator>Preview</PreviewIndicator>
    </>
  )
}

export default Preview

const PreviewIndicator = styled.div`
  position: fixed;
  right: 15px;
  bottom: 15px;
  width: 92px;
  height: 30px;
  border-radius: 5px;
  background-color: #6166dc;
  z-index: 2147483647;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 600;

  ${mediaqueries.tablet`
    display: none;
  `}
`

const FadeIn = styled.div`
  opacity: 0;
  animation: fadein 0.45s ease-out 0.1s forwards;

  @keyframes fadein {
    from {
      opacity: 0;
      transform: scale(0.94);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`
const PreviewState = ({ error }) => (
  <Layout>
    <PreviewFrame>
      <Heading.h1 styles="h2">
        <FadeIn>{error || <Logo fill="#000" onlySymbol />}</FadeIn>
      </Heading.h1>
    </PreviewFrame>
  </Layout>
)

const PreviewFrame = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  min-width: 100vw;
  position: fixed;
  top: 0;
  height: 100%;
  background: #fafafa;
  color: #000;
  z-index: 99999;
`
