import React from 'react'
import styled from 'styled-components'
import { useStaticQuery, graphql } from 'gatsby'

import shortcuts, { constants } from '@shortcuts'
import { ViewIcon, BookIcon, ExternalIcon } from '../../icons/ui'

/**
 * Command Line Parts
 *
 * A somewhat messay utility file for the Command Line. Based on the currently
 * active Command Line (Default, Read, etc) we have to generate the appropriate list
 * and heading.
 */
const articlesQuery = graphql`
  query GetArticles {
    allContentfulArticle(sort: { fields: [publicationDate], order: DESC }) {
      edges {
        node {
          title
          slug
          featured
        }
      }
    }
  }
`

function createDefaultList() {
  return shortcuts.getShortcutsFiltered()
}

function createReadingList(articles) {
  return [
    {
      name: constants.GO_TO_ARTICLES,
      keys: ['G', 'A'],
      label: ['All ', 'Articles'],
      icon: BookIcon,
    },
    ...articles.map(article => ({
      name: constants.GO_TO_ARTICLE,
      label: [article.node.title],
      path: article.node.slug,
      featured: article.node.featured,
      icon: ViewIcon,
    })),
  ]
}

function createOpenSourceList() {
  return [
    {
      name: constants.GO_TO_NARATIVE_GITHUB,
      keys: [],
      label: ['Narative.co code'],
      icon: ViewIcon,
      external: true,
    },
    {
      name: constants.GO_TO_NARATIVE,
      keys: [],
      label: ['Narative.co design'],
      icon: ViewIcon,
      external: true,
    },
    {
      name: constants.GO_TO_FEY_LOGO,
      keys: [],
      label: ['Fey logo design'],
      icon: ViewIcon,
      external: true,
    },
    {
      name: constants.GO_TO_HOPPER_WWW,
      keys: [],
      label: ['Hopper.com design'],
      icon: ViewIcon,
      external: true,
    },
    // {
    //   name: constants.GO_TO_HOPPER_MEDIA,
    //   keys: [],
    //   label: ['Hopper Media Center design'],
    //   icon: ViewIcon,
    //   external: true,
    // },
  ]
}

export default function createCommandLineParts(name: string) {
  const {
    allContentfulArticle: { edges: articles },
  } = useStaticQuery(articlesQuery)

  let list
  let placeholder
  let CommandLineHeading

  switch (name) {
    case constants.COMMAND_LINE_DEFAULT:
      list = createDefaultList()
      CommandLineHeading = Default
      placeholder = 'Search commands'
      break

    case constants.COMMAND_LINE_READ:
      list = createReadingList(articles)
      CommandLineHeading = Back
      placeholder = 'Search articles'
      break
    case constants.COMMAND_LINE_OPEN_SOURCE:
      list = createOpenSourceList()
      CommandLineHeading = Back
      placeholder = 'Search projects'
      break

    default:
      list = createDefaultList()
      CommandLineHeading = Default
      placeholder = 'Search commands'
  }

  return {
    list,
    placeholder,
    CommandLineHeading,
  }
}

function Default() {
  return (
    <>
      <Logo />
      <Heading>Narative Command</Heading>
    </>
  )
}

function Back() {
  return (
    <BackButton
      onClick={() =>
        shortcuts.handleShortcutFeature({
          name: constants.COMMAND_LINE_DEFAULT,
        })
      }
    >
      <BackArrow />
      <Heading>Back</Heading>
    </BackButton>
  )
}
const Heading = styled.h1`
  font-size: 16px;
  margin-left: 15px;
  color: ${p => p.theme.colors.moon};
  font-weight: 400;
`

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`

const BackButton = styled.button`
  display: flex;
  align-items: center;
`

const Logo = () => (
  <svg
    width="19"
    height="18"
    viewBox="0 0 19 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M15.9336 15.2598H3V17.2546H15.9336V15.2598Z" fill="#FAFAFA" />
    <path
      d="M3.00391 6.19336V14.2761L6.96385 11.4983V8.96641L3.00391 6.19336Z"
      fill="#FAFAFA"
    />
    <path
      d="M15.9244 8.37989L15.9229 0.345703L11.9473 3.09214V5.58335L15.9244 8.37989Z"
      fill="#FAFAFA"
    />
    <path
      d="M15.9266 14.283V9.38044L3.00391 0.345703V5.20599L15.9266 14.283Z"
      fill="#FAFAFA"
    />
  </svg>
)

const BackArrow = () => (
  <svg
    width="19"
    height="18"
    viewBox="0 0 19 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="1.5"
      y="17"
      width="16"
      height="16"
      rx="2.5"
      transform="rotate(-90 1.5 17)"
      fill="white"
      fillOpacity="0.95"
    />
    <path
      d="M9.44125 12.9004L9.44125 11.4504L12.5 11.4504C12.7485 11.4504 12.95 11.2489 12.95 11.0004L12.95 7.20039C12.95 7.08104 12.9026 6.96658 12.8182 6.88219C12.7338 6.7978 12.6193 6.75039 12.5 6.75039L9.44125 6.75039L9.44125 5.30039C9.44125 5.11491 9.32745 4.94843 9.15462 4.8811C8.9818 4.81376 8.78536 4.85936 8.65987 4.99594L5.16862 8.79594C5.01046 8.96809 5.01046 9.23269 5.16863 9.40484L8.65987 13.2048C8.78536 13.3414 8.9818 13.387 9.15462 13.3197C9.32745 13.2523 9.44125 13.0859 9.44125 12.9004Z"
      stroke="#08080B"
      strokeWidth="0.9"
      strokeLinejoin="round"
    />
  </svg>
)
