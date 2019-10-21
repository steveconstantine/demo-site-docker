import React, { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { StaticQuery, graphql } from 'gatsby'

import { ButtonArrow, CopyToClipboard } from '@components'
import mediaqueries from '@styles/media'

const fadein = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

function CareersAccordian() {
  const [openRowIndex, setOpenRowIndex] = useState<null | number>(null)
  const [copied, setCopied] = useState<boolean>(false)

  function handleIndexOpen(index: number) {
    if (index === openRowIndex) {
      return setOpenRowIndex(null)
    }

    return setOpenRowIndex(index)
  }

  return (
    <StaticQuery
      query={graphql`
        query HeadingQuery {
          allContentfulCareer(filter: { active: { eq: true } }) {
            edges {
              node {
                description {
                    childRichTextHtml {
                      html
                    }
                }
                title
                location
              }
            }
          }
        }
      `}
      render={({ allContentfulCareer }) => {
        const careers = allContentfulCareer && allContentfulCareer.edges

        if (!careers || careers.length === 0) {
          return (
            <AccordianContainer empty>
              <AccordianCareersEmail copied={copied}>
                <span
                  style={{
                    display: copied ? 'none' : 'inline',
                    maxWidth: '61rem',
                  }}
                >
                  There are currently no available positions. But if you believe
                  you have something unique to bring to the team, get in touch
                  at{' '}
                  <Anchor href="mailto:careers@giftingwild.com">
                    careers@giftingwild.com
                  </Anchor>
                  .<HideOnMobile> We love meeting new people!</HideOnMobile>
                </span>
                <div
                  onClick={() => setCopied(true)}
                  style={{ justifySelf: 'flex-end' }}
                >
                  <CopyToClipboard copyOnClick="careers@giftingwild.com" />
                </div>
              </AccordianCareersEmail>
            </AccordianContainer>
          )
        }

        return (
          <AccordianContainer>
            <AccordianList>
              {careers.map(({ node }, index) => (
                <CareersAccordianItem
                  key={node.title}
                  handleIndexOpen={handleIndexOpen}
                  career={node}
                  index={index}
                  isOpen={openRowIndex === index}
                />
              ))}
            </AccordianList>
            <AccordianCareersEmail copied={copied}>
              <span style={{ display: copied ? 'none' : 'inline' }}>
                Don't see a position you're looking for? Send us a message to{' '}
                <Anchor href="mailto:careers@giftingwild.com">
                  careers@giftingwild.com
                </Anchor>
              </span>
              <div
                onClick={() => setCopied(true)}
                style={{ justifySelf: 'flex-end' }}
              >
                <CopyToClipboard copyOnClick="careers@giftingwild.com" />
              </div>
            </AccordianCareersEmail>
          </AccordianContainer>
        )
      }}
    />
  )
}

export default CareersAccordian

const CareersAccordianItem = ({
  career,
  handleIndexOpen,
  index,
  isOpen,
}: {
  career: { title: string; location: string }
  handleIndexOpen: () => {}
  index: number
  isOpen: boolean
}) => {
  const mailTo = `mailTo:careers@giftingwild.com?subject=${career.title} @ Gifting-Wild`

  return (
    <AccordianListItem isOpen={isOpen} onClick={() => handleIndexOpen(index)}>
      <AccordianListTop>
        <span>
          <AccordianListTitle>{career.title}</AccordianListTitle>
          <AccordianListLocation>{career.location}</AccordianListLocation>
        </span>
        <IconContainer isOpen={isOpen} />
      </AccordianListTop>

      {isOpen && (
        <div>
          <AccordianListDescription
            dangerouslySetInnerHTML={{
              __html:
                career.description
                  .childRichTextHtml.html,
            }}
          />
          <AccordianMailTo href={mailTo} target="_blank">
            <ButtonArrow text="Apply now" />
          </AccordianMailTo>
        </div>
      )}
    </AccordianListItem>
  )
}

const AccordianContainer = styled.div`
  color: #fff;
  max-width: 69rem;
  /* min-height: 55rem; */
  margin: 0 0 5rem 26.3rem;
  position: relative;
  top: -14rem;
  transition: height 0.5s ease;

  ${p =>
    p.empty &&
    `
    border-top: 1px solid #707173;
    border-bottom: 1px solid #707173;
    min-height: auto;
    top: -10rem;
    padding-bottom: 3rem;
  `};

  ${mediaqueries.desktop`
    margin:  0 auto 15rem;
    top: -4rem;
    min-height: auto;
  `};

  ${mediaqueries.tablet`
    margin:  0 auto 10rem;
    top: ${p => (p.empty ? '0rem' : '-4rem')};
    height: auto;
    background: #1D2128;
    border-radius: 5px;
    border: none;
    padding: 2rem;
  `};

  ${mediaqueries.phone`
    top: ${p => (p.empty ? '0rem' : '-2rem')};
  `};
`

const AccordianList = styled.ul`
  list-style: none;
`

const IconContainer = styled.div`
  position: relative;

  &::before {
    content: '';
    position: absolute;
    right: 4px;
    top: 12px;
    height: 2px;
    width: 8px;
    background: #fff;
    transform: rotate(${p => (p.isOpen ? -45 : 45)}deg);
    transition: transform 300ms ease;
  }

  &::after {
    content: '';
    position: absolute;
    right: 0px;
    top: 12px;
    height: 2px;
    width: 8px;
    background: #fff;
    transform: rotate(${p => (p.isOpen ? 45 : -45)}deg);
    transition: transform 300ms ease;
  }
`

const AccordianListItem = styled.li`
  border-bottom: 1px solid #707173;
  padding: 2.5rem 0;
  cursor: pointer;
`

const AccordianListTop = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`

const AccordianListTitle = styled.h4`
  font-family: 'futura-pt';
  font-size: 1.8rem;
  font-weight: 600;
  color: #fff;
`

const AccordianListLocation = styled.div`
  color: ${p => p.theme.colors.grey};
`

const AccordianListDescription = styled.div`
  position: relative;
  margin-top: 5rem;
  margin-bottom: 2.5rem;
  opacity: 0;
  animation: 0.6s ease-out ${fadein} forwards;

  p {
    margin-bottom: 2rem;
    color: ${p => p.theme.colors.grey};
  }

  &::before {
    content: '';
    position: absolute;
    top: -2.5rem;
    left: 0;
    width: 2.5rem;
    height: 1px;
    background: #c4c4c4;
    animation: 325ms forwards scale ease;
    transform-origin: 0% 50%;
  }

  @keyframes scale {
    from {
      transform: scale(0);
    }

    to {
      transform: scale(1);
    }
  }
`

const AccordianMailTo = styled.a`
  display: flex;
  align-items: center;
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 2.5rem;
  color: #fff;
  opacity: 0;
  animation: 1.4s ease-out ${fadein} forwards;
`

const AccordianCareersEmail = styled.div`
  display: flex;
  justify-content: ${p => (p.copied ? 'flex-end' : 'space-between')};
  align-items: center;
  margin-top: 3rem;
  color: ${p => p.theme.colors.grey};
  font-weight: 400;

  a {
    color: #fff;
  }

  ${mediaqueries.tablet`
    font-size: 1.4rem;
    margin-top: 0;

    span {
      width: 80%;
    }
  `};
`

const HideOnMobile = styled.span`
  ${mediaqueries.tablet`
    display: none;
  `}
`

const Anchor = styled.a`
  &:hover,
  &:focus {
    text-decoration: underline;
  }
`
