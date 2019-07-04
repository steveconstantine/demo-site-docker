import { useEffect, useState } from 'react'
import { apiCall } from '@utils/api'
import { theme } from '@styles'
import throttle from 'lodash/throttle'

export { apiCall }

/**
 * Clamp a number between min and max
 *
 * @param {number} value The number you want clamped
 * @param {number} min
 * @param {number} max
 *
 * @example
 *    clamp(5, 1, 10) 5
 *    clamp(50, 1, 10) 10
 *    clamp(0.5, 1, 10) 1
 */
export const clamp = (value: number, min: number, max: number) =>
  value < min ? min : value > max ? max : value

/**
 * Create an array of numbers len elements long
 *
 * @param {number} start Start of you range
 * @param {number} len How many items of step 1 do you want in the range?
 * @param {number} step Defaults to incrementing every 1
 *
 * @example
 *    range(1, 5) [1, 2, 3, 4, 5]
 *    range(3, 5) [3, 4, 5, 6, 7]
 *    range(1, 5, 0.1) [1, 1.1, 1.2, 1.3, 1.4]
 */
export const range = (start: number, len: number, step: number = 1) =>
  len
    ? new Array(len)
        .fill(undefined)
        .map((_, i) => +(start + i * step).toFixed(4))
    : []

/**
 * Debounce a fn by a given number of ms
 *
 * @see {@link https://medium.com/@TCAS3/debounce-deep-dive-javascript-es6-e6f8d983b7a1}
 * @param {function} fn Function you want to debounce
 * @param {number} time Amount in ms to debounce. Defaults to 100ms
 * @returns {function} Your function debounced by given ms
 */
export const debounce = (fn: () => any, time = 100) => {
  let timeout: ReturnType<typeof setTimeout>

  return function() {
    const functionCall = () => fn.apply(this, arguments)

    clearTimeout(timeout)
    timeout = setTimeout(functionCall, time)
  }
}

/**
 * Extract from the theme a specific breakpoint size
 *
 * @param {string} name Name of the breakpoint we wish to retrieve
 *                      All options can be found in styles/theme
 *
 * @example
 *    getBreakpointFromTheme('tablet') 768
 */
export const getBreakpointFromTheme: (arg0: string) => number = name =>
  theme.breakpoints.find(([label, _]) => label === name)![1]

export const getWindowDimensions = (): { height: number; width: number } => {
  if (typeof window !== 'undefined') {
    const width =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth

    const height =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight

    return {
      height,
      width,
    }
  }

  return {
    width: 0,
    height: 0,
  }
}

export function useResize() {
  const [dimensions, setDimensions] = useState({ width: 1280, height: 900 })

  useEffect(() => {
    const handleResize = throttle(
      () => setDimensions(getWindowDimensions()),
      50
    )
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  })

  return dimensions
}

/**
 * Enable or disable scrolling behavior. Particularly useful for mobile interactions
 * and toggling of different drawers.
 *
 * @param {string} action enable or disable
 *
 * @example
 *    scrollable('enable') Will allow the user to scroll again
 *    scrollable('disable') Will freeze the screen
 */
export const scrollable = (action: string) => {
  if (action.toLowerCase() === 'enable') {
    document.body.style.cssText = null
  } else {
    document.body.style.overflow = 'hidden'
    document.body.style.height = '100%'
  }
}

export function useScrollPosition() {
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const handleScroll = throttle(() => setOffset(window.pageYOffset), 30)
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return offset
}

/**
 * Used in componentDidMount to start an animation.
 * This avoids the annoying behaviour of triggering
 * and animation on mount but it not flowing correctly
 * due to fram timing.
 */
export function startAnimation(callback) {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      callback()
    })
  })
}

/**
 * Returns the X and Y coordinates of a selected piece of Text.
 * This will always return the top left corner of the selection.
 */
export const getHighlightedTextPositioning = () => {
  let doc: any = window.document
  let sel = doc.selection
  let range
  let rects
  let rect: any = {}

  let x = 0
  let y = 0

  if (sel) {
    if (sel.type !== 'Control') {
      range = sel.createRange()
      range.collapse(true)
      x = range.boundingLeft
      y = range.boundingTop
    }
  } else if (window.getSelection) {
    sel = window.getSelection()
    if (sel.rangeCount) {
      range = sel.getRangeAt(0).cloneRange()

      if (range.getClientRects) {
        range.collapse(true)
        rects = range.getClientRects()

        if (rects.length > 0) {
          rect = rects[0]
        }

        x = rect.left
        y = rect.top
      }

      // Fall back to inserting a temporary element
      if (x === 0 && y === 0) {
        var span = doc.createElement('span')
        if (span.getClientRects) {
          // Ensure span has dimensions and position by
          // adding a zero-width space character
          span.appendChild(doc.createTextNode('\u200b'))
          range.insertNode(span)
          rect = span.getClientRects()[0]
          x = rect.left
          y = rect.top
          var spanParent = span.parentNode
          spanParent.removeChild(span)

          // Glue any broken text nodes back together
          spanParent.normalize()
        }
      }
    }
  }

  return { x, y }
}

export const getSelectionDimensions = () => {
  let doc: any = window.document
  let sel = doc.selection
  let range

  let width = 0
  let height = 0

  if (sel) {
    if (sel.type !== 'Control') {
      range = sel.createRange()
      width = range.boundingWidth
      height = range.boundingHeight
    }
  } else if (window.getSelection) {
    sel = window.getSelection()
    if (sel.rangeCount) {
      range = sel.getRangeAt(0).cloneRange()
      if (range.getBoundingClientRect) {
        var rect = range.getBoundingClientRect()
        width = rect.right - rect.left
        height = rect.bottom - rect.top
      }
    }
  }

  return { width, height }
}

export function getSelectionText() {
  let text = ''
  if (window.getSelection) {
    text = window.getSelection().toString()
  } else if (document.selection && document.selection.type != 'Control') {
    text = document.selection.createRange().text
  }
  return text
}

export function useActiveListItem(initial: number, list: any[]): number {
  const [active, setActive] = useState<number>(initial)
  const length: number = list.length

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      switch (event.key) {
        case 'ArrowUp':
          setActive(currentActive => {
            if (currentActive === 0) return length - 1

            return currentActive - 1
          })
          break
        case 'ArrowDown':
          setActive(currentActive => {
            if (currentActive === length - 1) return 0

            return currentActive + 1
          })
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [length])

  if (active >= length) {
    setActive(length - 1)
  }

  return active > 0 ? active : 0
}
