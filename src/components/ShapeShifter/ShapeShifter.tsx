/**
 * <ShapeShift />
 * The editable, morphing shape in the Hero of the homepage.
 *
 * This Component is closely referenced from this codepen:
 * https://codepen.io/zz85/pen/gbOoVP
 *
 * Yes, it's a bit of spaghetti, but I ended up continuing down the
 * original codepend's path instead of refactoring and coming up
 * with a full new solution.
 *
 * Yes, it animates width/height of an HTML element which is extremely
 * costly to do. In fact, it only works decently well on Chrome and is
 * disabled on Safari and Firefox
 *
 * With all that said, enjoy.
 */

import React, { useEffect, useRef, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import throttle from 'lodash/throttle'
import { useStaticQuery, graphql } from 'gatsby'
import { isSafari, isFireFox } from 'react-device-detect'

import Media from '@components/Media/Media.Img'
import mediaqueries from '@styles/media'

// The SVG shapes and data required to properly morph and place them
import shapes from './Shapes'

const minWidth: number = 0
const minHeight: number = 0

// Thresholds
const MARGINS: number = 4

// Round utility
const round = num => Math.round(num)

// End of what's configurable.
let clicked: {} | null = null

let onRightEdge: boolean
let onBottomEdge: boolean
let onLeftEdge: boolean
let onTopEdge: boolean

let b: number
let x: number
let y: number

let event: Event

let redraw: boolean = false
let shift: boolean = false

let pressedKeys: {} = {}

/**
 * To avoid rendering a linear-gradient or using the original CSS
 * blur and scale effects we're loading in a static image to display
 * as the Glow.
 *
 * This avoids gradient banding as much as we can!
 */
const imageQuery = graphql`
  query ShapeShipfterQuery {
    glowImage: file(name: { regex: "/glow-shape-background/" }) {
      childImageSharp {
        fixed(width: 375, height: 375, quality: 100) {
          ...GatsbyImageSharpFixed_noBase64
        }
      }
    }
  }
`

// The main component
function ShapeShifter() {
  const [activeShape, setActiveShape] = useState(0)
  const [animate, setAnimate] = useState(false)

  const Active = shapes[activeShape]
  const activeStyles = {
    width: Active.width,
    height: Active.height,
  }
  const resetActiveStyles = JSON.stringify({
    ...activeStyles,
    maxHeight: Active.maxHeight,
  })

  const { glowImage } = useStaticQuery(imageQuery)

  /**
   * Refs
   *
   * Throughout the component we use refs a lot. The original shape and
   * the mirror both need their own refs so there is a bit of repeating
   * in that case.
   */

  const vector = useRef()
  const vectorMirror = useRef()

  const shape = useRef()
  const shapeMirror = useRef()

  const rel = useRef()
  const relMirror = useRef()

  const numbers = useRef()
  const glow = useRef()

  /**
   * Attaching all the event listeners and initializating the ShapeShifter
   * We're also disabling the events for Safari and Firefox in this case.
   */
  useEffect(() => {
    const $shape = shape.current
    setAnimate(true)
    setTimeout(() => {
      createMirrorMask()
    }, 0)

    if (isSafari || isFireFox) return

    $shape.addEventListener('mousedown', onMouseDown)
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)
    window.addEventListener('resize', createMirrorMask)

    // Alt and Shift
    document.addEventListener('keydown', onKeydown)
    document.addEventListener('keyup', onKeyup)

    // Remove all the events when unselected
    return () => {
      $shape.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup', onUp)
      window.removeEventListener('resize', createMirrorMask)

      // Alt and Shift
      document.removeEventListener('keydown', onKeydown)
      document.removeEventListener('keyup', onKeyup)
    }
  }, [activeShape, animate])

  /**
   * The Mirror Mask is what sits on top of the Mirror Shape to create that
   * gradient effect. If you were to remove this function then the Mirror
   * shape would look like the original except slightly blurry.
   *
   * Do note that each time the shape changes or the screen resizes we have
   * to delete the previous mask and create a new one.
   */
  const createMirrorMask = throttle(() => {
    const previousMask = document.getElementById('mirror-mask')
    const homeHero = document.getElementById('home-hero')
    const mask = document.createElement('div')
    const offsetTop =
      shape.current.getBoundingClientRect().bottom +
      document.documentElement.scrollTop

    if (previousMask) {
      previousMask.remove()
    }

    mask.id = 'mirror-mask'
    mask.style.cssText = `
      position: absolute;
      top: 90vh;
      left: 0;
      width: 100%;
      height: 10vh;
      background: linear-gradient(to bottom, rgba(8, 8, 11, 0.05), rgb(8, 8, 11) 20%);
      pointer-events: none;
      z-index: 1;
      transition: transform 0.6s ease;
    `
    homeHero.appendChild(mask)
  }, 15)

  /**
   * |
   * |
   * Creating all the events listeners for the ShapeShifter
   * |
   * |
   */
  const onMove = throttle(function(e) {
    updateGlobalSettings(e)

    event = e
    redraw = true
  }, 15)

  function onKeydown(event) {
    pressedKeys[event.key] = event.key
    redraw = true
  }

  function onKeyup(event) {
    delete pressedKeys[event.key]
    redraw = true
  }

  function onMouseDown(event) {
    onDown(event)
    event.preventDefault()
  }

  function onDown(event) {
    updateGlobalSettings(event)
    shape.current.style.transition = 'unset'
    shapeMirror.current.style.transition = 'unset'
    glow.current.style.opacity = 0
    glow.current.style.transition = 'opacity 0.1s'

    let isResizing = onRightEdge || onBottomEdge || onTopEdge || onLeftEdge

    clicked = {
      cx: event.clientX,
      cy: event.clientY,
      w: b.width,
      h: b.height,
      isResizing,
      onTopEdge,
      onLeftEdge,
      onRightEdge,
      onBottomEdge,
    }
  }

  function onUp(event) {
    updateGlobalSettings(event)
    resetStyles(shape.current)
    resetStyles(shapeMirror.current, 'mirror')

    clicked = null
  }

  /**
   * updateGlobalSettings()
   * Think of this as a mass setState, except mutating and inline.
   * Pretty gross, but pretty effective!
   *
   * On each move and up we reset the globals.
   */
  function updateGlobalSettings(event) {
    if (!shape.current) return

    b = shape.current.getBoundingClientRect()
    x = event.clientX - b.left
    y = event.clientY - b.top

    onTopEdge = y < MARGINS
    onLeftEdge = x < MARGINS
    onRightEdge = x >= b.width - MARGINS
    onBottomEdge = y >= b.height - MARGINS
  }

  /**
   * resetStyles()
   * After the user has interacted with shape and let go we need to spring
   * the shape back into its original position and state.
   */
  function resetStyles($el, mirror) {
    const reset = JSON.parse($el.getAttribute('data-reset'))
    const corners = document.querySelectorAll('[data-corner]')
    const isInverted = $el.style.transform.includes('-1')
    corners.forEach(corner => (corner.style.borderColor = '#6166dc'))

    $el.style.transform = ''
    $el.style.transition = `
      width 0.45s cubic-bezier(0.1, 0.8, 0.1, 1.2),
      height 0.45s cubic-bezier(0.1, 0.8, 0.1, 1.2),
      transform 0.3s ease
    `
    $el.style.width = `${reset.width}px`
    $el.style.height = `${reset.height}px`

    if (isInverted) {
      $el.style.top = `unset`
      $el.style.right = `unset`
      $el.style.bottom = `unset`
      $el.style.left = `unset`
    }

    if (!mirror) {
      $el.style.borderColor = '#6166dc'
    }

    numbers.current.style.opacity = 0
    numbers.current.style.transform = ''
    numbers.current.style.color = '#6166dc'
    glow.current.style.opacity = 0.6
    glow.current.style.transition = 'opacity 0.3s linear'
  }

  // Handles showing of the Width x Heights units under the shape
  function addWidthAndHeightUnits() {
    numbers.current.innerHTML = `${round(b.width)} x ${round(b.height)}`
    numbers.current.style.opacity = 1
  }

  /**
   * When the user presses Alt we want to center align the Shape so when
   * its being resized it mirrors it and keeps the shape center.
   */
  function handleAlt($el, $rel) {
    if (pressedKeys.Alt) {
      $el.style.top = ''
      $el.style.right = ''
      $el.style.bottom = ''
      $el.style.left = ''
      $rel.style.display = 'flex'
      $rel.style.alignItems = 'center'
      $rel.style.justifyContent = 'center'
    } else {
      $rel.style.display = ''
      $rel.style.alignItems = ''
      $rel.style.justifyContent = ''
    }
  }

  /**
   * There's also the ability to press shift! This will alter the shape
   * to have the same width and height at all times.
   */
  function handleShift($el, len) {
    const maxHeight = JSON.parse($el.getAttribute('data-reset')).maxHeight
    const limitedLength = len > maxHeight ? maxHeight : len

    if (pressedKeys.Shift) {
      $el.style.width = `${Math.abs(limitedLength)}px`
      $el.style.height = `${Math.abs(limitedLength)}px`
    }
  }

  // User clicked the left edge of the shape
  function handleLeft($el, len) {
    if (len > minWidth) {
      $el.style.width = `${len}px`
      $el.style.transform = `scaleX(1)`
      numbers.current.style.transform = `scaleX(1)`
      $el.style.right = 0
      $el.style.left = ''
    } else {
      $el.style.width = `${Math.abs(len)}px`
      $el.style.transform = `scaleX(-1)`
      numbers.current.style.transform = `scaleX(-1)`
      $el.style.left = '100%'
      $el.style.right = ''
    }
  }

  // User clicked the right edge of the shape
  function handleRight($el, len) {
    if (len > minWidth) {
      $el.style.width = `${len}px`
      $el.style.transform = `scaleX(1)`
      numbers.current.style.transform = `scaleX(1)`
      $el.style.left = 0
      $el.style.right = ''
    } else {
      $el.style.width = `${Math.abs(len)}px`
      $el.style.transform = `scaleX(-1)`
      numbers.current.style.transform = `scaleX(-1)`
      $el.style.right = '100%'
      $el.style.left = ''
    }
  }

  // User clicked the top edge of the shape
  function handleTop($el, len, mirror) {
    const maxHeight = JSON.parse($el.getAttribute('data-reset')).maxHeight
    const lengthLimited = pressedKeys.Alt && len > maxHeight ? maxHeight : len

    if (len > minHeight) {
      $el.style.height = `${lengthLimited}px`
    }

    if (mirror) {
      $el.style.top = 0
      $el.style.bottom = ''
    } else {
      $el.style.bottom = 0
      $el.style.top = ''
      $el.style.transform = `scaleX(1)`
      numbers.current.style.transform = `scaleX(1)`
    }
  }

  // User clicked the bottom edge of the shape
  function handleBottom($el, len, mirror) {
    if (len > minHeight) {
      $el.style.height = `${len}px`
      $el.style.transform = `scaleY(1)`
      numbers.current.style.transform = `scaleY(1)`
      $el.style.bottom = ''
      $el.style.top = 0

      if (mirror) {
        $el.style.top = 'unset'
        $el.style.bottom = 0
      }
    } else {
      if (!mirror) {
        $el.style.height = `${Math.abs(len)}px`
        $el.style.transform = `scaleY(-1)`
        numbers.current.style.transform = `scaleY(-1)`
        $el.style.bottom = '100%'
        $el.style.top = 'unset'
      }
    }
  }

  /**
   * If the user has moved their mouse into the area of the reflection or
   * below then indicate that it's not possible to resize a shape like that
   * by changing the outline to red.
   */
  function handleOutOfBoundsError(isOutOfBounds: boolean) {
    const corners = document.querySelectorAll('[data-corner]')

    if (isOutOfBounds) {
      shape.current.style.borderColor = '#FF5E5E'
      corners.forEach(corner => (corner.style.borderColor = '#FF5E5E'))
      numbers.current.style.color = '#FF5E5E'
    } else {
      shape.current.style.borderColor = '#6166dc'
      numbers.current.style.color = '#6166dc'
      corners.forEach(corner => (corner.style.borderColor = '#6166dc'))
    }
  }

  ;(function animate() {
    if (typeof window === 'undefined') return
    requestAnimationFrame(animate)

    const $shape = shape.current
    const $rel = rel.current

    if (!$shape) return
    if (!redraw) return

    const $shapeMirror = shapeMirror.current
    const $relMirror = relMirror.current

    redraw = false

    if (clicked && clicked.isResizing) {
      if (clicked.onRightEdge) {
        let currentWidth = event.clientX - clicked.cx + clicked.w

        handleRight($shape, currentWidth)
        handleRight($shapeMirror, currentWidth, 'mirror')
        handleShift($shape, currentWidth)
        handleShift($shapeMirror, currentWidth)
      }

      if (clicked.onBottomEdge) {
        const maxHeight = JSON.parse($shape.getAttribute('data-reset'))
          .maxHeight

        let currentHeight = clicked.h + event.clientY - clicked.cy
        const isOutOfBounds = Math.max(y, minHeight) > maxHeight

        if (isOutOfBounds) {
          currentHeight = maxHeight
        }

        handleBottom($shape, currentHeight)
        handleBottom($shapeMirror, currentHeight, 'mirror')
        handleShift($shape, currentHeight)
        handleShift($shapeMirror, currentHeight)
        handleOutOfBoundsError(isOutOfBounds)
      }

      if (clicked.onLeftEdge) {
        const currentWidth = clicked.cx - event.clientX + clicked.w

        handleLeft($shape, currentWidth)
        handleLeft($shapeMirror, currentWidth, 'mirror')
        handleShift($shape, currentWidth)
        handleShift($shapeMirror, currentWidth)
      }

      if (clicked.onTopEdge) {
        let currentHeight = Math.max(
          clicked.cy - event.clientY + clicked.h,
          minHeight
        )

        handleTop($shape, currentHeight)
        handleTop($shapeMirror, currentHeight, 'mirror')
        handleShift($shape, currentHeight)
        handleShift($shapeMirror, currentHeight)
        handleOutOfBoundsError(currentHeight <= 0)
      }

      addWidthAndHeightUnits()
      handleAlt($shape, $rel)
      handleAlt($shapeMirror, $relMirror)
    }

    // This code executes when mouse moves without clicking
    // style cursor
    if ((onRightEdge && onBottomEdge) || (onLeftEdge && onTopEdge)) {
      $shape.style.cursor = 'nwse-resize'
    } else if ((onRightEdge && onTopEdge) || (onBottomEdge && onLeftEdge)) {
      $shape.style.cursor = 'nesw-resize'
    } else if (onRightEdge || onLeftEdge) {
      $shape.style.cursor = 'ew-resize'
    } else if (onBottomEdge || onTopEdge) {
      $shape.style.cursor = 'ns-resize'
    } else {
      $shape.style.cursor = 'default'
    }
  })()

  function handleShapeMorph(start, end, $el, $rel) {
    const mask = document.getElementById('mirror-mask')
    const nextShape =
      activeShape + 1 === shapes.length ? shapes[0] : shapes[activeShape + 1]

    const maskOffset = (Active.height - nextShape.height) * -1

    TweenLite.to(start, 0.6, {
      morphSVG: end,
      yoyo: true,
      shapeIndex: [10],
      ease: Power4.easeInOut,
    })

    $rel.style.width = `${nextShape.width}px`
    $rel.style.height = `${nextShape.height}px`
    $el.style.width = `${nextShape.width}px`
    $el.style.height = `${nextShape.height}px`
    mask.style.transform = `translateY(${maskOffset}px)`
    vector.current.style.transform = nextShape.styles.transform
    vectorMirror.current.style.transform = nextShape.styles.transform
  }

  function handleShapeMorphClick() {
    if (shift) return
    shift = true

    handleShapeMorph('#start', '#end', shape.current, rel.current)
    handleShapeMorph(
      '#start-mirror',
      '#end-mirror',
      shapeMirror.current,
      relMirror.current
    )

    setTimeout(() => {
      shift = false

      if (activeShape === shapes.length - 1) {
        setActiveShape(0)
      } else {
        setActiveShape(curr => curr + 1)
      }
    }, 600)
  }

  return (
    <Frame animate={animate}>
      <ShapesContainer>
        <Relative ref={rel} style={activeStyles}>
          <ShapeGlow ref={glow} animate={animate}>
            <Media src={glowImage.childImageSharp.fixed} />
          </ShapeGlow>
          <ShapeContainer
            style={activeStyles}
            ref={shape}
            data-reset={resetActiveStyles}
            animate={animate}
          >
            <Vector style={Active.styles} ref={vector}>
              <Active.Shape />
            </Vector>
            <Numbers ref={numbers} />
            <HandleShapeShift onClick={handleShapeMorphClick} />
            <Corners animate={animate}>
              <TopLeftCorner data-corner="top-left" />
              <TopRightCorner data-corner="top-right" />
              <BottomLeftCorner data-corner="bottom-left" />
              <BottomRightCorner data-corner="bottom-right" />
            </Corners>
          </ShapeContainer>
        </Relative>
        <Mirror>
          <Relative ref={relMirror} style={activeStyles} mirror>
            <ShapeContainer
              style={activeStyles}
              data-reset={resetActiveStyles}
              ref={shapeMirror}
              animate={animate}
              mirror
            >
              <Blur>
                <Vector style={Active.styles} ref={vectorMirror}>
                  <Active.Mirror />
                </Vector>
              </Blur>
            </ShapeContainer>
          </Relative>
        </Mirror>
      </ShapesContainer>
    </Frame>
  )
}

export default ShapeShifter

const scaleIn = keyframes`
  from { transform: scale(1.2); opacity: 0.001 }
  to { transform: scale(1); opacity: 1 }
`

const fadeIn = keyframes`
  0% { opacity: 0.001 }
  100% {  opacity: 1 }
`

const Frame = styled.div`
  position: relative;
  width: 45%;
  display: flex;
  justify-items: center;
  height: 100%;
  justify-content: center;
  align-items: center;
  align-self: flex-start;
  flex-direction: column;
  user-select: none;
  border-color: ${p => (p.animate ? '#6166dc' : 'transparent')};
  opacity: 0.001;
  transform: scale(1.2);
  animation: ${scaleIn} 3.2s cubic-bezier(0.25, 0.1, 0.25, 1) 0.3s forwards,
    ${fadeIn} 3s 0.3s forwards;

  ${mediaqueries.desktop`
    display: none;
  `}

  #end, #end-mirror {
    visibility: hidden;
  }

  svg {
    pointer-events: none;
  }
`

const Vector = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  transition: transform 0.5s ease;
  pointer-events: none;
`

const ShapesContainer = styled.div`
  position: absolute;
  top: calc(50% - 185px);
  right: 80px;
`

const Mirror = styled.div`
  position: absolute;
  top: 100%;
  z-index: 1;
  opacity: 0.2;
  pointer-events: none;
`

const Blur = styled.div`
  filter: blur(6px);
  width: 100%;
  height: 100%;
`

const HandleShapeShift = styled.div`
  position: absolute;
  left: 3px;
  top: 3px;
  width: calc(100% - 6px);
  height: calc(100% - 6px);
  z-index: 2;
  cursor: pointer;
`

const Relative = styled.div`
  position: relative;
  z-index: 1;
  transition: width 0.6s ease, height 0.6s ease;

  ${p =>
    p.mirror &&
    `
    top: 35px;
    z-index: 0;
    pointer-events: none;
  `};
`

const ShapeContainer = styled.div`
  position: absolute;
  cursor: pointer;
  will-change: width, height, transform;
  border: 1px solid transparent;
  border-color: ${p => (p.animate ? '#6166dc' : 'transparent')};
  opacity: ${p => (p.animate ? 1 : 0)};
  z-index: 1;
  transition: opacity 3s ease-out 0.5s, border-color 1.4s 1.3s, width 1.1s,
    height 1.1s;

  &::after {
    content: '';
    position: absolute;
    left: -8px;
    top: -8px;
    height: calc(100% + 16px);
    width: calc(100% + 16px);
    z-index: 1;
  }

  ${p =>
    !p.mirror &&
    `
    svg {
      position: absolute;
      top: 0;
      left: 0;
    }
  `}

  ${p =>
    p.mirror &&
    `
    z-index: 0;
    border: 1px solid transparent;
  `}
`

const ShapeGlow = styled.div`
  opacity: ${p => (p.animate ? 1 : 0.001)};
  transition: opacity 1.4s 2.6s;
  pointer-events: none;
  position: absolute;
  width: 375px;
  height: 375px;
  left: -40px;
  top: -50px;
  transform: scale(1.8, 2.2);

  ${mediaqueries.desktop_large`
      transform: scale(1.4, 2.4);
  `}
`

const Corners = styled.div`
  opacity: ${p => (p.animate ? 1 : 0)};
  transition: opacity 1.4s 1.3s;
  pointer-events: none;
`

const Corner = styled.div`
  height: 7px;
  width: 7px;
  background: #111216;
  border: 1px solid #6166dc;
  position: absolute;
`

const TopLeftCorner = styled(Corner)`
  top: -3px;
  left: -3px;
`

const TopRightCorner = styled(Corner)`
  top: -3px;
  right: -3px;
`

const BottomLeftCorner = styled(Corner)`
  bottom: -3px;
  left: -3px;
`

const BottomRightCorner = styled(Corner)`
  bottom: -3px;
  right: -3px;
`

const Numbers = styled.div`
  position: absolute;
  bottom: -24px;
  min-width: 50px;
  left: 0;
  right: 0;
  margin: 0 auto;
  text-align: center;
  font-size: 12px;
  color: #6166dc;
  transition: opacity 0.1s linear;
  pointer-events: none;
`
