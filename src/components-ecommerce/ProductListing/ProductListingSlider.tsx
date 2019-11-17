import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import Img from 'gatsby-image'

import { HorizontalScroll, IntersectionObserver } from '@components'
import mediaqueries from '@styles/media'
import Flickity from 'react-flickity-component'

const flickityOptions = {
    initialIndex: 1,
    freeScroll: true,
    freeScrollFriction: 0.03,
    contain: true,
    prevNextButtons: false,
    cellAlign: 'right',
    lazyLoad: 5,
    imagesLoaded: true,
    selectedAttraction: 0.2,
    friction: 0.8,
    dragThreshold: 150,
    adaptiveHeight: true,
    groupCells: 2,
    fullscreen: true,
    wrapAround: true,
    groupCells: true,
    isDraggable: false
}

class ProductListingSlider extends Component {
  state = {
    activeIndex: 0,
    disabled: false,
    inView: false,
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyPress)
  }

  componentWillUnmount() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('keydown', this.handleKeyPress)
    }


  }

  handleKeyPress = ({ keyCode }) => {
    const leftKeyCode = 37
    const rightKeyCode = 39

    if (keyCode === leftKeyCode) {
      this.handlePrevClick()
    }
    if (keyCode === rightKeyCode) {
      this.handleNextClick()
    }
  }

  handleNextClick = () => {
    this.flkty.next({isWrapped: true});
  }

  handlePrevClick = () => {
    this.flkty.previous({isWrapped: true});
  }

  render() {
    const { children } = this.props
    const { activeIndex } = this.state
    const offset = activeIndex * 72 * -1

    return (
      <Fragment>
        <CareersImagesContainer>
          <Flickity
              flickityRef={c => this.flkty = c}
              className={'carousel'} // default ''
              elementType={'div'} // default 'div'
              options={flickityOptions} // takes flickity options {}
              disableImagesLoaded={false} // default false
              static
          >
            {this.props.children.map((child, index) => (
              <ImageContainer
                key={index}
                index={index}
                activeIndex={activeIndex}
                inView={this.state.inView}
                viewed={this.state.viewed}
                style={{ left: `${index * 36}rem` }}
                static
              >
                {child}
              </ImageContainer>
            ))}
          </Flickity>
          <GalleryControl
            disabled={false}
            onClick={this.handlePrevClick}
            data-a11y="false"
            left
          >
            <ChevronLeft />
          </GalleryControl>
          <GalleryControl
            disabled={false}
            onClick={this.handleNextClick}
            data-a11y="false"
            right
          >
            <ChevronRight />
          </GalleryControl>
        </CareersImagesContainer>
      </Fragment>
    )
  }
}

export default ProductListingSlider

const CareersImagesContainer = styled.div`
  position: relative;
  width: 100vw;
  max-width: 100vw;
  height: 555px;
  margin-top: 0;
  
  ${mediaqueries.phablet`
      margin-top: 0;
      height: 380px;
  `};
`

const CareersImagesContainerMobile = styled.div`
  display: none;
  ${mediaqueries.phablet`
    display: block;
    width: 100%;
    margin: 3rem 0;
  `};
`
/**
 * 0 ==> 0 1
 * 1 ==> 2 3
 * 2 ==> 4 5
 * 3 ==> 6 7
 *
 */
const ImageContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  font-size: 10rem;
  position: absolute;
  left: 0;
  height: 100%;
  border-radius: 3px;
  overflow: hidden; 

  .gatsby-image-wrapper {
    border-radius: 2px;
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center center;
  }
`

const ImageContainerMobile = styled.div`
  border-radius: 3px;
  overflow: hidden;
  width: 50vw;
  filter: grayscale(100);
  ${mediaqueries.tablet`
    width: 100%;
    filter: grayscale(0) !important;
  `};
`

const GalleryControl = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 95%;
  transform: translateY(-50%);
  ${p => {
    if (p.left) {
      return `left: 4rem;`
    }
    if (p.right) {
      return `right: 4rem;`
    }
  }};
  height: 4rem;
  width: 4rem;
  border-radius: 50%;
  z-index: 9;
  background: #fff;
  cursor: ${p => (p.disabled ? 'initial' : 'pointer')};
  opacity: ${p => (p.disabled ? 0.25 : 1)};
  transition: opacity 600ms cubic-bezier(0.7, 0, 0.2, 1);
  &[data-a11y='true']:focus::after {
    content: '';
    position: absolute;
    left: -12%;
    top: -12%;
    width: 124%;
    height: 124%;
    border: 3px solid ${p => p.theme.colors.purple};
    border-radius: 50%;
  }
  ${mediaqueries.desktop`
    ${p => {
      if (p.left) {
        return `left: 2rem;`
      }
      if (p.right) {
        return `right: 2rem;`
      }
    }};
  `};
  ${mediaqueries.desktop`
    ${p => {
      if (p.left) {
        return `left: 2rem;`
      }
      if (p.right) {
        return `right: 2rem;`
      }
    }};
  `};
`

const ChevronRight = ({ fill = '#090a0c' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" fill={fill} />
    <path d="M0 0h24v24H0z" fill="none" />
  </svg>
)

const ChevronLeft = ({ fill = '#090a0c' }) => (
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
