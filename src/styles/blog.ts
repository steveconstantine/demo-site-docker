import { createGlobalStyle } from 'styled-components'

export const SocialShareStyles = createGlobalStyle`

.github {
  float: right;
  padding: 14px;
  opacity: 0.6;
}

.resp-sharing-button__link,
.resp-sharing-button__icon {
  display: inline-block;
  vertical-align: middle;
  border: none;
}

.resp-sharing-button__link {
  text-decoration: none;
  color: #fff;
  margin: 4px;
  height: 33px;

  .service-label {
    font-size: 12px;
    padding-right: 4px;
  }
}

.resp-sharing-button {
  height: 33px;
  border-radius: 6px;
  transition: 25ms ease-out;
  padding: 3px 8px 3px 10px;
  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
}

.resp-sharing-button__icon svg {
  width: 1em;
  height: 1.5em;
  margin-right: 0.4em;
  vertical-align: top;
}

.resp-sharing-button__icon {
  stroke: #fff;
  fill: none;
}

.resp-sharing-button__icon--solid {
  fill: #fff;
  stroke: none;
}


.resp-sharing-button--facebook {
  background-color: #3b5998;
}

.resp-sharing-button--facebook:hover {
  background-color: #2d4373;
}

.resp-sharing-button--facebook {
  background-color: #3b5998;
  border-color: #3b5998;
}

.resp-sharing-button--facebook:hover,
.resp-sharing-button--facebook:active {
  background-color: #2d4373;
  border-color: #2d4373;
}

.resp-sharing-button--twitter {
  background-color: #55acee;
}

.resp-sharing-button--twitter:hover {
  background-color: #2795e9;
}

.resp-sharing-button--twitter {
  background-color: #55acee;
  border-color: #55acee;
}

.resp-sharing-button--twitter:hover,
.resp-sharing-button--twitter:active {
  background-color: #2795e9;
  border-color: #2795e9;
}`

export const SponsorButtonStyles = createGlobalStyle`
.sponsor-button {
  text-align: center;
  margin: 4px;

  .bmc-button {
    display: inline-block;
    padding: 0px 7px;
    width: auto;
    height: 33px;
    text-decoration: none;
    background-color: #bb5794;
    color: #ffffff;
    border: 1px solid transparent;
    border-radius: 6px;
    letter-spacing: -0.08px;
    box-sizing: border-box;
    font-size: 12px;
    line-height: 30px;
    text-align: left;

    &:hover,
    &:active {
      background-color: #a0457d;
    }

    img {
      width: 20px;
      margin-bottom: 1px;
      box-shadow: none;
      border: none;
      vertical-align: middle;
    }

    span {
      margin-left: 6px;
    }
  }
}`