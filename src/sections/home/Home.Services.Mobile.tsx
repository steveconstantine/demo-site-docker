import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Link, StaticQuery, graphql } from 'gatsby'
import throttle from 'lodash/throttle'

import Heading from '@components/Heading'
import Section from '@components/Section'
import HorizontalScroll from '@components/HorizontalScroll'
import Media from '@components/Media/Media.Img'

import { services } from './Home.Services'
import mediaqueries from '@styles/media'
import { clamp } from '@utils'

const imageQuery = graphql`
  query SerivesMobileImageQuery {
    firstImage: file(name: { regex: "/mobile-home-brand/" }) {
      childImageSharp {
        fluid(maxWidth: 440, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    secondImage: file(name: { regex: "/mobile-home-build/" }) {
      childImageSharp {
        fluid(maxWidth: 440, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    thirdImage: file(name: { regex: "/mobile-home-grow/" }) {
      childImageSharp {
        fluid(maxWidth: 440, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
  }
`

function HomeServicesMobile() {
  const element = React.createRef()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const $el = element.current

    const handleScroll = throttle(() => {
      const maxOffset = $el.scrollWidth - $el.clientWidth
      const position = clamp($el.scrollLeft / maxOffset, 0, 100)
      setProgress(position)
    }, 14)

    $el.addEventListener('scroll', handleScroll)
    return () => $el.removeEventListener('scroll', handleScroll)
  }, [])

  const first = progress <= 0.333
  const second = progress >= 0.334 && progress <= 0.666
  const third = progress >= 0.667

  return (
    <StaticQuery
      query={imageQuery}
      render={({ firstImage, secondImage, thirdImage }) => {
        const images = [firstImage, secondImage, thirdImage]
        const progressOffset = { transform: `translateX(-${progress * 160}px)` }

        return (
          <Frame>
            <Section narrow>
              <CardHeading>
                Gifting-Wild helps you <Highlight active={first}>brand</Highlight>,{' '}
                <Highlight active={second}>build</Highlight> and{' '}
                <Highlight active={third}>grow</Highlight>
              </CardHeading>
              <HorizontalScroll
                list={services}
                name="service"
                narrow
                innerRef={element}
                render={({ service, index }) => {
                  const startingOffset = {
                    transform: `translateX(${index * 80}px)`,
                  }

                  return (
                    <Card key={service.heading}>
                      <List>
                        {service.list.map(item => (
                          <Item key={item}>{item}</Item>
                        ))}
                      </List>
                      <CardLink to={service.link.to}>
                        {service.link.text}
                      </CardLink>

                      <Image style={progressOffset}>
                        <Media
                          style={startingOffset}
                          src={images[index].childImageSharp.fluid}
                        />
                      </Image>
                    </Card>
                  )
                }}
              />
              <Progress>
                <Value
                  style={{ transform: `translateX(${progress * 200}%)` }}
                />
              </Progress>
            </Section>
          </Frame>
        )
      }}
    />
  )
}

export default HomeServicesMobile

const Frame = styled.div`
  position: relative;
  z-index: 3;
  padding-top: 110px;
  padding-bottom: 80px;
  background: linear-gradient(#0f1015, #101216);

  ${mediaqueries.desktop_up`
    display: none;
  `}
`

const Card = styled.div`
  position: relative;
  min-height: 400px;
  background: #1d2128;
  border-radius: 5px;
  overflow: hidden;
  text-align: center;
`

const CardHeading = styled(Heading.h3)`
  color: ${p => p.theme.colors.grey};
  max-width: 276px;
  margin-bottom: 30px;
`

const Image = styled.div`
  position: absolute;
  margin: 0 auto;
  height: 60%;
  width: 130%;
  left: -15%;
  bottom: 9%;
  z-index: 0;
`

const List = styled.ul`
  position: relative;
  list-style: none;
  margin: 35px auto 20px;
  z-index: 1;
`

const Item = styled.li`
  font-size: 18px;
  color: #fafafa;
`

const CardLink = styled(Link)`
  position: relative;
  display: inline-block;
  font-size: 18px;
  font-weight: 600;
  text-decoration-line: underline;
  color: ${p => p.theme.colors.gold};
  margin-bottom: 15px;
  z-index: 1;
`

const Highlight = styled.span`
  color: ${p => (p.active ? '#fff' : p.theme.colors.grey)};
  transition: color 0.3s ease-in-out;
`

const Progress = styled.div`
  margin-top: 40px;
  position: relative;
  width: 100%;
  height: 2px;
  background: #1d2128;
  overflow: hidden;
`

const Value = styled.div`
  position: absolute;
  left: 0;
  width: 33%;
  height: 2px;
  background: #fff;
`
