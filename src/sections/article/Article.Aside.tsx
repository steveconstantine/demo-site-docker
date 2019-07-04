import React, { Component, ReactNode } from 'react'
import styled from 'styled-components'
import throttle from 'lodash/throttle'

import HandleOverlap from './Article.HandleOverlap'

import mediaqueries from '@styles/media'
import { clamp } from '@utils'

interface AsideProps {
  children: ReactNode[] | ReactNode
  right?: boolean
  height: number
  offset: number
}

/**
 * Aside: the wonderful fixed positioned elements that are to the left
 * and the right of the written content on our articles. For example, the
 * progress bar and dark controls are within an Aside. The main responsibility
 * of this component is to show or hide its children if it's at the top or bottom
 * of the page!
 *
 * The left and right Asides!
 *
 * left Aside ----> |  content  | <--- right Aside
 *                  |  content  |
 *                  |  content  |
 *                  |  content  |
 *
 */
class Aside extends Component<AsideProps, { value: number }> {
  ticking = false

  state = { value: 0 }

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll)
    window.addEventListener('resize', this.onScroll)
  }

  componentWillUnmount() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', this.onScroll)
      window.removeEventListener('resize', this.onScroll)
    }
  }

  onScroll = throttle((event: Event) => {
    if (!this.ticking) {
      // RAF and make our progress calculation
      // on callback of the setState clear the thread
      window.requestAnimationFrame(() => {
        const percentComplete =
          ((window.scrollY - this.props.offset) /
            (this.props.height - this.props.offset)) *
          100

        this.setState(
          { value: clamp(+percentComplete.toFixed(2), -2, 105) },
          () => (this.ticking = false)
        )
      })
      // Prevent further scrolls triggers
      this.ticking = true
    }
  }, 16)

  render() {
    const { children, right } = this.props
    const { value } = this.state

    // If it's past the Hero or less than the Content length, show!
    const show = value > -1 && value < 100.2

    const childrenWithProps = React.Children.map(children, child =>
      React.cloneElement(child, { show })
    )

    return (
      <Frame right={right}>
        <Align show={show}>
          <HandleOverlap>{childrenWithProps}</HandleOverlap>
        </Align>
      </Frame>
    )
  }
}

export default Aside

const Frame = styled.aside`
  display: flex;
  justify-content: ${p => (p.right ? 'flex-end' : 'flex-start')};
  margin: 0 auto;
  max-width: 1140px;

  ${mediaqueries.desktop_medium`
    display: none;
  `}
`

const Align = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  transform: translateY(0px);
  top: 0;
  height: 100vh;
  z-index: 3;

  opacity: ${p => (p.show ? 1 : 0)};
  visibility: ${p => (p.show ? 'visible' : 'hidden')};
  transition: ${p =>
    p.show
      ? 'opacity 0.4s linear, visibility 0.4s linear'
      : 'opacity 0.2s linear, visibility 0.4s linear'};
`
