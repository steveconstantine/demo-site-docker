import { createGlobalStyle } from 'styled-components'
import { theme } from '@styles/theme'

/**
 * injectGlobal is technically an escape hatch provided by styled-components
 * that will enforce global cascading style rules which is against the whole
 * styled-components theory. This is where we define fronts, global resets,
 * and the very base styles.
 */
export const GlobalStyles = createGlobalStyle`
    /**
   * Thanks to Benjamin De Cock
   * https://gist.github.com/bendc/ac03faac0bf2aee25b49e5fd260a727d
   */
  :root {-
    --ease-in-quad: cubic-bezier(.55, .085, .68, .53);
    --ease-in-cubic: cubic-bezier(.550, .055, .675, .19);
    --ease-in-quart: cubic-bezier(.895, .03, .685, .22);
    --ease-in-quint: cubic-bezier(.755, .05, .855, .06);
    --ease-in-expo: cubic-bezier(.95, .05, .795, .035);
    --ease-in-circ: cubic-bezier(.6, .04, .98, .335);

    --ease-out-quad: cubic-bezier(.25, .46, .45, .94);
    --ease-out-cubic: cubic-bezier(.215, .61, .355, 1);
    --ease-out-quart: cubic-bezier(.165, .84, .44, 1);
    --ease-out-quint: cubic-bezier(.23, 1, .32, 1);
    --ease-out-expo: cubic-bezier(.19, 1, .22, 1);
    --ease-out-circ: cubic-bezier(.075, .82, .165, 1);

    --ease-in-out-quad: cubic-bezier(.455, .03, .515, .955);
    --ease-in-out-cubic: cubic-bezier(.645, .045, .355, 1);
    --ease-in-out-quart: cubic-bezier(.77, 0, .175, 1);
    --ease-in-out-quint: cubic-bezier(.86, 0, .07, 1);
    --ease-in-out-expo: cubic-bezier(1, 0, 0, 1);
    --ease-in-out-circ: cubic-bezier(.785, .135, .15, .86);

    --ease-in-out-back: cubic-bezier(0.68, -0.55, 0.265, 1.55);
    --ease-out-back: cubic-bezier(0.175, 0.885, 0.32, 1.275);
    --ease-in-back: cubic-bezier(0.6, -0.28, 0.735, 0.045);
  }

  @font-face {
    font-family: '-apple-system',
    'BlinkMacSystemFont',
	  'San Francisco',
	  'Helvetica Neue',
    'Helvetica',
    'Ubuntu',
    'Roboto',
    'Noto',
    'Segoe UI',
    'Arial',
    sans-serif;
    font-weight: 400;
    font-style: normal;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
    margin: 0;
    padding: 0;
    font-size: inherit;
  }

  :root {
    -ms-overflow-style: -ms-autohiding-scrollbar;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    cursor: default;
    font-size: 0.625rem;
    line-height: 1.4;
  }

  body {
    font-family: 'futura-pt',
    '-apple-system',
    'BlinkMacSystemFont',
	  'San Francisco',
	  'Helvetica Neue',
    'Helvetica',
    'Ubuntu',
    'Roboto',
    'Noto',
    'Segoe UI',
    'Arial',
    sans-serif;
    font-size: 1.6rem;
    margin: 0;
    color: ${theme.colors.black};
    background: #08080B;
    font-weight: 400;
    height: 100%;
  }

  button,
  a {
    text-decoration: none;
    cursor: pointer;
  }

  a {
    color: #FAFAFA;
  }

  a:focus {
    outline: none;
  }

  p {
    color: ${theme.colors.black};
    font-size: 1.8rem;
  }
  
  [hidden] {
    display: none;
  }

  [unselectable] {
    user-select: none;
  }

  audio,
  canvas,
  iframe,
  img,
  svg,
  video {
    vertical-align: middle;
  }


  select {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    border: none;
    background-color: transparent;
    width: 100%;

    &::-ms-expand {
      display: none;
    }

    option {
      color: #262626;
    }
}


  input, textarea, select, button {
    font-family: '-apple-system',
    'BlinkMacSystemFont',
	  'San Francisco',
	  'Helvetica Neue',
    'Helvetica',
    'Ubuntu',
    'Roboto',
    'Noto',
    'Segoe UI',
    'Arial',
    sans-serif;

    &:-webkit-autofill {
      box-shadow: 0 0 0 1000px white inset !important;
    }
  }

  .underline {
    text-decoration: underline;
  }

  button,
  input,
  select,
  textarea {
    color: inherit;
    font-family: inherit;
    font-style: inherit;
    font-weight: inherit;
  }

  code,
  kbd,
  pre,
  samp {
    font-family: monospace;
  }

  fieldset,
  button {
    appearance: none;
    border: none;
    outline: none;
    background: transparent;
  }

  table {
    border-collapse: separate;
    border-spacing: 0;
  }

  audio:not([controls]) {
    display: none; 
  }

  details {
    display: block; 
  }

  input {
    color: $text-color;

    &:focus,
    &:active {
      outline: none;
    }

    &::-webkit-input-placeholder,
    &:-moz-placeholder,
    &::-moz-placeholder,
    &:-ms-input-placeholder, 
    &::-webkit-input-placeholder {
      color: rgba(0, 0, 0, 0.25);
    }

    &[type="number"] {
      width: auto;
    }

    &[type="search"] {
      -webkit-appearance: textfield;

      &::-webkit-search-cancel-button,
      &::-webkit-search-decoration {
        -webkit-appearance: none;
      }
    }
  }

  .carousel-cell {
  width: 33.1%; /* full width */
  margin-right: 10px;
  }

  .flickity-slider {
    height: 555px;
  }
  
  .flickity-viewport {
    width: 100vw;
    outline: none;

    &:focus {
      outline: none;
    }
  }

  .flickity-page-dots {
    display: none;
  }

  .is-selected {
    opacity: 1 !important;
    filter: grayscale(0) !important;
    transition: transform 0.8s cubic-bezier(0.7, 0, 0.2, 1);
  }

  .flickity-enabled {
    outline: none;

    &:focus {
      outline: none;
    }
  }


  @media screen and (max-width: 767px) {
    .hide-on-mobile {
      visibility: hidden;
    }
    .flickity-slider {
      height: 555px;
    }
  }

  section > div.guest {
    display: none !important;
  }
 
  #disqus_thread  {
    padding: 10px !important;
  }

  .disqus-comment-count {
    padding: 0 10px !important;
    text-align: center !important;
  }

  #variant > option {
    color: white;
  }

  .ant-popover-inner {
    background-color: #000000BB !important;
  }

  .ant-input-number {
    height: 56px !important;
    background-color: black !important;
    border: 3px solid #FAFAFA;
    width: 100% !important;
  }

  .ant-popover-arrow {
    background-color: #000000BB !important;
    border-right-color: #000000BB !important;
    border-bottom-color: #000000BB !important;
  }

  .ant-popover {
    max-width: 500px;
    width: 100vw;
    height: 0;
    transform-origin: 0 0 !important;

    @media all and (max-width: 540px) {
      left: 0 !important;
    }
  }

   .ant-popover-content {

    transform: translateY(-35px); 
    max-width: 400px;

    @media all and (min-width: 1025px) {
      transform: translate(125px, -35px);
    }

    @media all and (min-width: 768px) and (max-width: 1024px) {
      transform: translate(100px, -35px);
    }
  }

  .ant-popover-arrow {
    visibility: hidden;
  }

  .ant-input-number-input {
    height: 54px !important;
    border-radius: 3px !important;
    width: 100%;
    color: white;
    font-size: 20px !important;
    font-weight: 900 !important;
    font-family: '-apple-system', 'BlinkMacSystemFont', 'San Francisco', 'Helvetica Neue', 'Helvetica', 'Ubuntu', 'Roboto', 'Noto', 'Segoe UI', 'Arial', sans-serif !important;
    &:focus {
      box-shadow: 0 0 0 3px white;
      outline: 0;
      -webkit-transition: box-shadow 0.15s ease-in-out;
      transition: box-shadow 0.15s ease-in-out;
    }
  }

  .headroom-wrapper { 
    height: 50px !important;
  }

  a:hover {
    color: #FAFAFA !important;
    text-shadow: 1px 1px 1px white, 0 0 5px lightblue, 0 0 2px white;
  }
`