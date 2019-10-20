import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import Img from 'gatsby-image'

import { HorizontalScroll, IntersectionObserver } from '@components'
import mediaqueries from '@styles/media'
import Flickity from 'react-flickity-component'

const flickityOptions = {
    initialIndex: 2,
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
    if (
      this.state.activeIndex === this.props.children.length / 2 - 1 ||
      this.state.disabled
    ) {
      return
    }

    this.setState({
      activeIndex: this.state.activeIndex + 0.5,
      disabled: true,
    })

    setTimeout(() => {
      this.setState({ disabled: false })
    }, 800)
  }

  handlePrevClick = () => {
    if (this.state.activeIndex === 0 || this.state.disabled) {
      return
    }

    this.setState({
      activeIndex: this.state.activeIndex - 0.5,
      disabled: true,
    })

    setTimeout(() => {
      this.setState({ disabled: false })
    }, 800)
  }

  render() {
    const { children } = this.props
    const { activeIndex } = this.state
    const offset = activeIndex * 72 * -1

    return (
      <Fragment>
        <CareersImagesContainer>
          <Flickity
              className={'carousel'} // default ''
              elementType={'div'} // default 'div'
              options={flickityOptions} // takes flickity options {}
              disableImagesLoaded={false} // default false
              reloadOnUpdate // default false
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
  align-items: center;
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

  ${mediaqueries.phablet`
    width: 25.5rem;
  `};
`

const ImageContainerMobile = styled.div`
  border-radius: 3px;
  overflow: hidden;
  width: 34rem;
  filter: grayscale(100);
  ${mediaqueries.tablet`
    width: 100%;
    filter: grayscale(0) !important;
  `};
`