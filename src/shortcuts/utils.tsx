/**
 * Huge shoutout to Storybook as the core architecture of our shortcuts
 * is based off of their source. Storybook is a development environment
 * for UI components. It allows you to browse a component library, view
 * the different states of each component, and interactively develop and
 * test components.
 *
 * https://github.com/storybooks/storybook
 */

import * as icons from '../icons/ui'

// The shortcut is our JSON-ifiable representation of a shortcut combination
type Shortcut = string[] | any

// Storybook
export const isShortcutTaken = (arr1: string[], arr2: string[]): boolean =>
  JSON.stringify(arr1) === JSON.stringify(arr2)

// This is outside the scoe of eventToShortcut() on purpose!
let customKeys: string[] = []

// Modified from Storybook
export const eventToShortcut = (e: KeyboardEvent): Shortcut | null => {
  /**
   * Within Narative we use other modifier keys beyond the classic ⌘, meta, and ⌥.
   * They must be defined within the list of customModifierKeys otherwise we
   * don't know when to listen to multiple keys
   */
  const customModifierKeys = ['G', 'N']
  const customModifierKeyPressed = customModifierKeys.includes(
    e.key.toUpperCase()
  )

  /**
   * In the case of a custom modifier being pressed we'll want it to an Array that exits
   * outside of the scope of this function. That way we can preserve the state beyond the
   * lifecycle with a closure. This allows us to have shortcuts such as G + S or N + N.
   */
  if (customModifierKeyPressed) {
    customKeys.push(e.key.toUpperCase())
  }

  // A Meta key only doesn't map to a shortcut. Needs to combine with another key!
  if (['Meta', 'Alt', 'Control', 'Shift'].includes(e.key)) {
    return null
  }

  const keys: any = []

  if (e.altKey) {
    keys.push('alt')
  }
  if (e.ctrlKey) {
    keys.push('control')
  }
  if (e.metaKey) {
    keys.push('meta')
  }
  if (e.shiftKey) {
    keys.push('shift')
  }

  // Handle all regular keys like A, B, C, etc
  // for the key "i" do not uppercase it!
  if (
    !customModifierKeyPressed &&
    e.key &&
    e.key.length === 1 &&
    e.key !== ' ' &&
    e.key !== 'i'
  ) {
    keys.push(e.key.toUpperCase())
  }

  // i is a special case becalse capital I and l/L look similar
  if (e.key === 'i') {
    keys.push(e.key)
  }
  if (e.key === ' ') {
    keys.push('space')
  }
  if (e.key === 'Escape') {
    keys.push('escape')
  }
  if (e.key === 'ArrowRight') {
    keys.push('ArrowRight')
  }
  if (e.key === 'ArrowDown') {
    keys.push('ArrowDown')
  }
  if (e.key === 'ArrowUp') {
    keys.push('ArrowUp')
  }
  if (e.key === 'ArrowLeft') {
    keys.push('ArrowLeft')
  }
  if (e.key === 'Tab') {
    keys.push('Tab')
  }

  // Add the custom modifier keys to the regular keys
  if (customKeys.length) {
    keys.unshift(customKeys[0])
  }

  // Reset customKeys back to an empty list
  if (
    keys.length === 2 ||
    !keys.some((key: string) => customKeys.includes(key))
  ) {
    customKeys = []
  }

  return keys.length > 0 ? keys : null
}

// Modified from Storybook
export const shortcutMatchesShortcut = (
  inputShortcut: Shortcut,
  shortcut: Shortcut
): boolean => {
  return (
    inputShortcut &&
    inputShortcut.length === shortcut.length &&
    !inputShortcut.find((key: string, i: number) => key !== shortcut[i])
  )
}

// Should this keyboard event trigger this keyboard shortcut?
export const eventMatchesShortcut = (
  e: KeyboardEvent,
  shortcut: Shortcut
): boolean => {
  return shortcutMatchesShortcut(eventToShortcut(e), shortcut)
}

// Display the shortcut as a human readable string
export const shortcutToHumanString = (shortcut: Shortcut): string => {
  return shortcut.map(keyToSymbol).join(' ')
}

export const isMacLike = () => {
  if (typeof window !== 'undefined') {
    return navigator && navigator.platform
      ? !!navigator.platform.match(/(Mac|iPhone|iPod|iPad)/i)
      : false
  }

  return true
}

// Fantastic utilities form stroybook
export const controlOrMetaSymbol = () => (isMacLike() ? '⌘' : 'ctrl')
export const controlOrMetaKey = () => (isMacLike() ? 'meta' : 'control')
export const optionOrAltSymbol = () => (isMacLike() ? '⌥' : 'alt')

// Modified utilities form stroybook
export const keyToSymbol = (key: string) => {
  if (key === 'alt') {
    return optionOrAltSymbol()
  }
  if (key === 'control') {
    return '⌃'
  }
  if (key === 'meta') {
    return controlOrMetaSymbol()
  }
  if (key === 'shift') {
    return icons.ShiftIcon
  }
  if (key === 'Enter' || key === 'Backspace' || key === 'Esc') {
    return ''
  }
  if (key === 'escape') {
    return 'Esc'
  }
  if (key === ' ') {
    return 'SPACE'
  }
  if (key === 'ArrowUp') {
    return '↑'
  }
  if (key === 'ArrowDown') {
    return '↓'
  }
  if (key === 'ArrowLeft') {
    return '←'
  }
  if (key === 'ArrowRight') {
    return '→'
  }
  if (key === 'i') {
    return key
  }

  return key.toUpperCase()
}
