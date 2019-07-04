import React, { useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import OutsideClickHandler from 'react-outside-click-handler'

import CommandLineOptions from '@components/CommandLine/CommandLine.Options'
import CommandLineTips from '@components/CommandLine/CommandLine.Tips'
import createCommandLineParts from './parts'

import shortcuts, { constants } from '@shortcuts'
import { useReduxState } from '@store'
import { CloseIcon } from '../../icons/ui'
import { scrollable, getBreakpointFromTheme, useResize } from '@utils'

import mediaqueries from '@styles/media'

/**
 *      __                                                 _     __
 *    / __\  ___   _ __ ___   _ __ ___    __ _  _ __    __| |   / /  (_) _ __    ___
 *   / /    / _ \ | '_ ` _ \ | '_ ` _ \  / _` || '_ \  / _` |  / /   | || '_ \  / _ \
 *  / /___ | (_) || | | | | || | | | | || (_| || | | || (_| | / /___ | || | | ||  __/
 *  \____/  \___/ |_| |_| |_||_| |_| |_| \__,_||_| |_| \__,_| \____/ |_||_| |_| \___|
 *
 * Respsible for the ['meta', 'k] shortcut on narative.co
 *
 * How it works:
 * - Create a modal shell that can be summond via a command
 * - Grab the name of the active shortcut for this command line
 * - Generate the appropriate shortcut options to show in the command line
 *   based on the shortcut
 */

function handleClose() {
  shortcuts.handleShortcutFeature({ name: constants.ESCAPE })
}

function CommandLine() {
  const selectShortcutName = state => ({ name: state.shortcuts.name })
  const [{ name }] = useReduxState(selectShortcutName)
  const { width } = useResize()

  const screenIsWideEnough = width > getBreakpointFromTheme('desktop')
  const open = screenIsWideEnough && name.includes('COMMAND_LINE')
  const { list, placeholder, CommandLineHeading } = createCommandLineParts(name)

  useEffect(() => {
    // Depending if the commandline is open or not we have to disable scroll
    if (open) {
      scrollable('disable')
    } else {
      scrollable('enable')
    }

    // On tablets and phones we don't give access to the command line
    if (!screenIsWideEnough) handleClose()
  }, [open])

  /**
   * We only show tips if the command line is not opened
   * "Next time, hit G A to go to articles"
   */
  if (!open) return <CommandLineTips />

  return (
    <OutsideClickHandler onOutsideClick={handleClose}>
      <Background />
      <Frame>
        <Header>
          <LogoContainer>
            <CommandLineHeading />
          </LogoContainer>
          <CloseButton onClick={handleClose}>
            <CloseIcon />
          </CloseButton>
        </Header>
        <CommandLineOptions
          key={name}
          list={list}
          name={name}
          placeholder={placeholder}
        />
      </Frame>
    </OutsideClickHandler>
  )
}

export default CommandLine

const fadeInAndUp = keyframes`
  from { opacity: 0; transform: translate(-50%, -48.8%); }
  to { opacity: 1; transform: translate(-50%, -50%); }
`

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1;  }
`

const Frame = styled.div`
  z-index: 2147483647;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0 auto;
  height: 418px;
  width: 712px;
  background: rgba(29, 33, 40, 0.98);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0px 25px 30px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  opacity: 0;

  will-change: opacity, transform;
  animation: ${fadeInAndUp} 0.25s forwards;
  overflow: hidden;

  ${mediaqueries.desktop`
    display: none;
  `}
`

const Background = styled.div`
  position: fixed;
  z-index: 2147483646;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  user-select: none;
  background: rgba(0, 0, 0, 0.66);
  will-change: opacity;
  animation: ${fadeIn} 0.25s forwards;
`
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 0;
  margin: 0 24px;
  border-bottom: 1px solid rgba(115, 115, 125, 0.3);
`

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`

const CloseButton = styled.button``
