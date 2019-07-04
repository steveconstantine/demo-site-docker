import React, { Component } from 'react'
import styled from 'styled-components'
import throttle from 'lodash/throttle'

import { clamp } from '@utils'

export interface IProgress {
  height: number
  offset: number
  onClose?: () => void
}

class Progress extends Component<
  IProgress,
  {
    value: number
    headings: []
    hint: boolean
    hasHinted: boolean
    topOfArticle: number
  }
> {
  ticking = false

  state = { value: 0, headings: [], hint: false, hasHinted: false }

  componentDidMount() {
    this.handleProgressHeadings()

    window.addEventListener('scroll', this.onScroll)
    window.addEventListener('resize', this.onScroll)
  }

  componentWillUnmount() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', this.onScroll)
      window.removeEventListener('resize', this.onScroll)
    }
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.offset !== this.props.offset ||
      prevProps.height !== this.props.height
    ) {
      this.handleProgressHeadings()
    }
  }

  handleProgressHeadings = () => {
    const { height } = this.props
    const allHeadings = Array.from(document.querySelectorAll('h2')).reverse()

    const introduciton = {
      text: 'Introduction',
      offset: 0,
      offetPercentage: 0,
    }

    const headings = allHeadings
      .map(heading => {
        const offset = heading.offsetTop
        const text = heading.innerText
        const offetPercentage = (offset / height) * 100

        return {
          text,
          offset,
          offetPercentage,
        }
      })
      .reverse()

    this.setState({ headings: [introduciton, ...headings] })
  }

  onScroll = throttle((event: Event) => {
    const { offset, height } = this.props
    const { hasHinted } = this.state

    if (!this.ticking) {
      // RAF and make our progress calculation
      // on callback of the setState clear the thread
      window.requestAnimationFrame(() => {
        const percentComplete =
          ((window.scrollY - offset) / (height - offset)) * 100

        this.setState(
          { value: clamp(+percentComplete.toFixed(2), -2, 104) },
          () => (this.ticking = false)
        )

        /**
         * Toggling the hint of the progress headings at the start of the
         * article. Once the user has scrolled into view past the article hero
         * we want to display the hover state for just under 3 seconds.
         */
        if (!hasHinted && window.scrollY > offset - 60) {
          this.setState({
            hint: true,
          })

          setTimeout(() => {
            this.setState({
              hint: false,
              hasHinted: true,
            })
          }, 2600)
        }
      })
      // Prevent further scrolls triggers
      this.ticking = true
    }
  })

  render = () => {
    const { value, headings, hint } = this.state

    return (
      <Frame tabIndex={-1} value={value} hint={hint}>
        <Introduction onClick={() => scrollTo(0, 0)}>
          <Arrow />
        </Introduction>
        <ProgressBar>
          {headings.map((heading, index) => {
            const previousOffset = headings[index - 1]
              ? headings[index - 1].offetPercentage
              : 0
            const nextOffset = headings[index + 1]
              ? headings[index + 1].offetPercentage
              : 100

            const start = value - heading.offetPercentage
            const multiplier = 100 / (nextOffset - heading.offetPercentage)

            const individualOFfset = {
              transform: `translateY(${start - 100}%)`,
              height: 100 * multiplier + '%',
            }

            const isActive =
              value > previousOffset &&
              value > heading.offetPercentage &&
              value < nextOffset

            return (
              <Frame key={heading.text}>
                <Chapter
                  value={value}
                  offset={heading.offetPercentage}
                  previousOffset={previousOffset}
                  nextOffset={nextOffset}
                  onClick={() =>
                    scrollTo(0, heading.offset + this.props.offset + 65)
                  }
                >
                  <ChapterProgress style={individualOFfset} />
                </Chapter>
                <HeadingHover>
                  <Heading
                    isActive={isActive}
                    onClick={() =>
                      scrollTo(0, heading.offset + this.props.offset + 65)
                    }
                  >
                    <Truncate>
                      <HeadingBackground isActive={isActive}>
                        {heading.text}
                      </HeadingBackground>
                    </Truncate>
                  </Heading>
                </HeadingHover>
              </Frame>
            )
          })}
        </ProgressBar>
      </Frame>
    )
  }
}

export default Progress

const ProgressBar = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 1px;
  height: calc(88vh - 40px);
  max-height: 520px;
  outline: none;
  user-select: none;
`

const HeadingHover = styled.div`
  opacity: 0;
  transition: opacity 0.3s linear;
`

const Introduction = styled.div`
  position: absolute;
  top: -26px;
  left: -4px;
  cursor: pointer;

  svg path {
    fill: ${p => p.theme.mode.text};
  }
`

const Frame = styled.div`
  position: relative;
  flex: 1;
  padding-bottom: 5px;
  outline: none;
  user-select: none;

  &::before {
    content: '';
    position: absolute;
    height: 100%;
    width: 20px;
    left: -20px;
    top: 0;
  }

  &:hover ${HeadingHover} {
    opacity: 1;
  }

  ${p =>
    p.hint &&
    `
    ${HeadingHover} {
      opacity: 1;
    }
  `}
`

const Chapter = styled.div`
  position: relative;
  height: 100%;
  margin-bottom: 5px;
  background-color: ${p => p.theme.mode.progress.bg};
  overflow: hidden;
`

const ChapterProgress = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: ${p => p.theme.mode.text};
  top: 0;
`

const Truncate = styled.div`
  width: 188px;
  padding: 4px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const HeadingBackground = styled.span`
  position: relative;

  &::before {
    content: '';
    display: inline-block;
    width: 115%;
    max-width: 198px;
    height: 130%;
    border-radius: 5px;
    background: ${p => p.theme.mode.background};
    opacity: ${p => (p.isActive ? 0.4 : 1)};
    left: -7.5%;
    top: -15%;
    position: absolute;
    z-index: -1;
  }
`

const Heading = styled.h6`
  cursor: pointer;
  display: flex;
  align-items: center;
  position: absolute;
  left: 0;
  padding-left: 18px;
  top: 0;
  bottom: 0;

  color: ${p => p.theme.mode.text};
  opacity: ${p => (p.isActive ? '1 !important' : 0.25)};
  font-weight: 400;
  transition: opacity 0.3s;

  &:hover,
  &:focus {
    opacity: 0.5;
  }

  &:hover ${HeadingBackground} {
    opacity: 0.4;
  }
`

const Arrow = () => (
  <svg
    width="9"
    height="12"
    viewBox="0 0 9 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M4.85355 0.646446C4.65829 0.451184 4.34171 0.451184 4.14645 0.646446L0.964467 3.82843C0.769204 4.02369 0.769204 4.34027 0.964467 4.53553C1.15973 4.7308 1.47631 4.7308 1.67157 4.53553L4.5 1.70711L7.32843 4.53553C7.52369 4.7308 7.84027 4.7308 8.03553 4.53553C8.2308 4.34027 8.2308 4.02369 8.03553 3.82843L4.85355 0.646446ZM5 12L5 1L4 1L4 12L5 12Z" />
  </svg>
)
