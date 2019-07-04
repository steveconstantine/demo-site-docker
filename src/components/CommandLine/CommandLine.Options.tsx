import React, { useState, ReactElement, useEffect, useRef } from 'react'
import Fuse from 'fuse.js'
import styled from 'styled-components'

import shortcuts, { constants, keyToSymbol } from '@shortcuts'
import { ExternalIcon } from '../../icons/ui'

interface CommandProps {
  list?: any[]
  name: string
  placeholder: string
}

// https://fusejs.io for more insight on the config parameters
const fuseOptions = {
  threshold: 0.25,
  location: 0,
  distance: 140, // A large distance so we can search articles easily
  maxPatternLength: 20,
  minMatchCharLength: 2,
  keys: ['search'], // Dynamically genreated key on the shortcut object
}

function handleShortcutSelection(shortcut: { name: string }) {
  const enhancedShortcut = { ...shortcut, source: constants.COMMAND_LINE }
  shortcuts.handleShortcutFeature(enhancedShortcut)
}

function createSearchableStrings(item) {
  return { ...item, search: item.label.join('') }
}

function CommandLineOptions({ list = [], name, placeholder }: CommandProps) {
  const searchableList = list.map(createSearchableStrings)
  const fuse = new Fuse(searchableList, fuseOptions)

  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)

  const [value, setValue] = useState<string>('')
  const [activeCommand, setActive] = useState<number>(0)
  const [isUsingMouse, setIsUsingMouse] = useState<boolean>(false)

  const results: [] = value ? fuse.search(value) : list

  const numberOfOptions: number = list.length
  const numberOfResults: number = results.length

  // Focus input on render
  useEffect(() => {
    inputRef.current.focus()
  }, [])

  // Clear text input input and reset highlighted to 0
  useEffect(() => {
    setValue('')
    setActive(0)
  }, [name])

  // Handling up and down arrow keys to scroll through the list of items
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      switch (event.key) {
        case 'ArrowUp':
          listRef.current.style.pointerEvents = 'none'
          setIsUsingMouse(false)
          setActive(currentActive => {
            if (currentActive === 0) return numberOfOptions - 1

            return currentActive - 1
          })
          break
        case 'ArrowDown':
          listRef.current.style.pointerEvents = 'none'
          setIsUsingMouse(false)
          setActive(currentActive => {
            if (currentActive === numberOfOptions - 1) return 0

            return currentActive + 1
          })
          break
        default:
          return
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [numberOfOptions])

  /**
   * Reset the active command as the results change because it's possible
   * the activeCommand goes beyond the search results leaving no highlighted
   * option.
   */
  useEffect(() => {
    if (activeCommand >= numberOfResults) {
      return setActive(numberOfResults - 1)
    }
    if (activeCommand === -1) {
      return setActive(0)
    }
  }, [numberOfResults])

  /**
   * The user is able to use their mouse to change the highlighted input,
   * but it's not the same as simple hover styles. The active higlighted
   * is updated on mouseOver so we have to turn off the mouse events when
   * the user is typing on their keyboard. This avoids any weird reset behaviour.
   *
   * So, when the user moves their mouse we turn off the ability to scroll the
   * list. This fixes all the weird issues such as scrolling back to their old position
   * on mousemove.
   */
  useEffect(() => {
    function handleMouseMove() {
      setIsUsingMouse(true)
      listRef.current.style.pointerEvents = ''
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  /**
   * Handling scrolling of the list as the user scrolls up and down with
   * their arrows keys. Since the list if 4 items in view we only want to
   * start scrolling if the user reaches past the 4th item.
   */
  if (listRef.current && !isUsingMouse) {
    if (activeCommand > 3) {
      listRef.current.scrollTo({ top: (activeCommand - 3) * 61 })
    } else {
      listRef.current.scrollTo({ top: 0 })
    }
  }

  return (
    <>
      <Form
        onSubmit={event => {
          // On Enter we fire the shortcut they want
          event.preventDefault()
          handleShortcutSelection(results[activeCommand])
        }}
      >
        <StyledInput
          ref={inputRef}
          value={value}
          placeholder={placeholder}
          type="text"
          id="CommandLineInput"
          autoComplete="Off"
          onChange={event => setValue(event.target.value)}
        />
      </Form>
      <List ref={listRef}>
        {results.map((shortcut: any, index) => {
          const highlight = index === activeCommand

          return (
            <Shortcut
              key={shortcut.search}
              highlight={highlight}
              onClick={() => handleShortcutSelection(results[index])}
              onMouseOver={() => setActive(index)}
            >
              {/* labelToHighlighted()
               *  Generates the left side of the command line shortcut option.
               *  This includes teh icon and regular and higlighted text.
               *  👁 regular text BOLD HIGHLIGHTED
               */}
              {labelToHighlighted(shortcut.label, shortcut.icon, highlight)}
              <ShortcutKeys>
                {shortcut.keys &&
                  shortcut.keys.map((key: any) => {
                    let symbol = keyToSymbol(key)
                    if (typeof symbol === 'function') symbol = symbol()

                    return <Symbol key={key}>{symbol}</Symbol>
                  })}
                {shortcut.featured && <Featured>Featured</Featured>}
                {shortcut.external && <ExternalIcon />}
              </ShortcutKeys>
            </Shortcut>
          )
        })}
      </List>
    </>
  )
}

export default CommandLineOptions

const labelToHighlighted = (
  label: string,
  icon: React.ReactElement,
  highlight?: boolean
): ReactElement => {
  const fill: string = highlight ? '#6166DC' : '#73737D'
  const Icon = icon

  return (
    <Label>
      <Icon fill={fill} />
      <LabelText>
        <Regular highlight={highlight} label={label[0]}>
          {label[0]}
        </Regular>
        <Highlight highlight={highlight}>{label[1]}</Highlight>
      </LabelText>
    </Label>
  )
}

const Label = styled.div`
  display: flex;
  align-items: center;
`

const LabelText = styled.div`
  display: flex;
  align-items: center;
  margin-left: 14px;
`

const Regular = styled.div<{ highlight: boolean | undefined }>`
  color: ${p => (p.highlight ? '#fff' : p.theme.colors.moon)};
  ${p => p.label && `margin-right: 5px`};
`

const Highlight = styled.div<{ highlight: boolean | undefined }>`
  color: ${p => (p.highlight ? '#fff' : p.theme.colors.moon)};
  font-weight: 600;
`

const Form = styled.form`
  padding: 24px 24px 0 24px;
  margin-bottom: 30px;
`

const List = styled.ul`
  position: relative;
  list-style: none;
  height: 244px;
  overflow-y: auto;
  overflow-x: hidden;

  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    width: 0 !important;
  }
`

const Shortcut = styled.li<{ highlight: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${p => (p.highlight ? 'rgba(17, 18, 22, 0.5)' : 'transparent')};
  padding: 0 24px;
  height: 61px;
  font-size: 18px;
  color: ${p => p.theme.colors.moon};
  cursor: pointer;

  svg {
    position: relative;
    left: -3px;
  }
`

const ShortcutKeys = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
`

const Symbol = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 16px;
  min-width: 16px;
  text-align: center;
  border-radius: 2.5px;
  padding: 1px 4px;
  color: #000;
  background: ${p => p.theme.colors.moon};

  &:not(:last-child) {
    margin-right: 8px;
  }

  svg {
    position: absolute;
    left: 3px;
  }
`

const StyledInput = styled.input`
  height: 44px;
  width: 100%;
  background: transparent;
  font-size: 32px;
  color: ${p => p.theme.colors.moon};
  border: none;
  caret-color: ${p => p.theme.colors.purple};

  ::-webkit-input-placeholder {
    color: rgba(255, 255, 255, 0.15);
    font-weight: 200;
  }
  ::placeholder {
    color: rgba(255, 255, 255, 0.15);
    font-weight: 200;
  }
`

const Featured = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 16px;
  padding: 1px 4px;
  border-radius: 2.5px;
  background: ${p => p.theme.colors.gold};
  color: #000;
  font-size: 10px;
  text-align: center;
`
