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
import * as constants from './constants'
import { controlOrMetaKey } from './utils'

/**
 * All Narative shortcuts are defined here. This is the master document
 * that controls what keys are listened for on the keydown event listener
 */
const shortcuts = [
  {
    name: constants.COMMAND_LINE_DEFAULT,
    keys: [controlOrMetaKey(), 'K'],
    label: ['Open ', 'Command Line'],
    icon: icons.GoToIcon,
  },
  {
    name: constants.CONTACT,
    keys: ['C'],
    label: ['', 'Contact us'],
    icon: icons.MailIcon,
  },
  {
/**
 * In the case that we need to preload state this will stay as a function
 * that accepts an initial state object. As for right now we do not initialize
 * our app with state so we're exporting this as an executed function.
 *
 * @param preloadedState any {}
 */
    name: constants.COMMAND_LINE_READ,
    keys: ['shift', 'A'],
    label: ['Read', 'Articles'],
    icon: icons.BookIcon,
  },
  {
    name: constants.COMMAND_LINE_OPEN_SOURCE,
    keys: ['shift', 'O'],
    label: ['View', 'Open Source'],
    icon: icons.OpenSourceIcon,
  },
  {
    name: constants.GO_TO_LABS,
    keys: ['G', 'L'],
    label: ['Go to', ' Labs'],
    icon: icons.LaptopIcon,
  },
  {
    name: constants.GO_TO_CAREERS,
    keys: ['G', 'C'],
    label: ['Go to ', 'Careers'],
    icon: icons.LightbulbIcon,
  },
  {
    name: constants.GO_TO_HOME,
    keys: ['G', 'H'],
    label: ['Go to ', 'Home'],
    icon: icons.SlashIcon,
  },
  {
    name: constants.GO_TO_ARTICLES,
    keys: ['G', 'A'],
    label: ['Go to ', 'Articles'],
    icon: icons.BookIcon,
  },
  {
    name: constants.GO_TO_FEY,
    keys: [],
    label: ['Go to ', ' Feyapp.com'],
    external: true,
    icon: icons.FeyIcon,
  },
  {
    name: constants.GO_TO_TWITTER,
    keys: [],
    label: ['Go to ', ' Twitter'],
    external: true,
    icon: icons.TwitterIcon,
  },
  {
    name: constants.GO_TO_INSTAGRAM,
    keys: [],
    label: ['Go to ', ' Instagram'],
    external: true,
    icon: icons.InstagramIcon,
  },
  {
    name: constants.GO_TO_LINKEDIN,
    keys: [],
    label: ['Go to ', ' LinkedIn'],
    external: true,
    icon: icons.LinkedInIcon,
  },
  {
    name: constants.ESCAPE,
    keys: ['escape'],
    label: ['Close ', 'Command Line'],
    icon: icons.GoToIcon,
  },
]

export default shortcuts
