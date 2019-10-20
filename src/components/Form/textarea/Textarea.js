import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { isMobile } from 'react-device-detect'

import mediaqueries from '@styles/media'

import {
  colors
} from '../../../utils/styles';

class Textarea extends Component {
  textarea = React.createRef()

  state = { value: '', rows: 1 }

  componentDidMount() {
    if (this.state.rows > 1) {
      this.handleTyping()
    }
  }

  static getDerivedStateFromProps(props) {
    if (typeof window !== 'undefined') {
      const rows = isMobile ? 1 : props.rows || 1

      return { rows }
    }
  }

  handleTyping = () => {
    const textarea = this.textarea.current

    this.setState({ value: textarea.value })
    textarea.style.height = 'auto'
    textarea.style.height = textarea.scrollHeight + 'px'
  }

  render() {
    const { field, label, maxLength, rows, ...props } = this.props
    const hasError =
      props.form.touched[field.name] && props.form.errors[field.name]

    return (
      <InputContainer>
        <InputBorder hasError={hasError}>
          <StyledInput
            onInput={this.handleTyping}
            ref={this.textarea}
            rows={this.state.rows}
            autoComplete="Off"
            maxLength={maxLength || 290}
            {...field}
            {...props}
          />
          <LabelAnimation hasValue={this.state.value}>
            <StyledLabel hasError={hasError}>{label}</StyledLabel>
          </LabelAnimation>
          <InputBorderActive hasError={hasError} />
        </InputBorder>
        <InputError hasError={hasError}>
          {hasError && props.form.errors[field.name]}
        </InputError>
      </InputContainer>
    )
  }
}

Textarea.propTypes = {
  label: PropTypes.string.isRequired,
}

export default Textarea

const InputContainer = styled.div`
  position: relative;
  top: -15px;
  padding: 1.4rem 0 1rem;
  width: 500px;

  ${mediaqueries.tablet`
    top: 0;
    padding: 1.4rem 0 2rem;
    width: 100%;
  `};
`

const InputError = styled.div`
  position: absolute;
  color: ${colors.error};
  font-size: 1.2rem;

  ${mediaqueries.tablet`
    bottom: 0.5rem;
  `};
`

const InputBorder = styled.div`
  position: relative;

  ${mediaqueries.tablet`
    padding: 0.35em 0;
  ${p =>
    p.hasError
      ? `border-bottom: 1px solid ${colors.error}`
      : `border-bottom: 1px solid #b9bbbe`};
    `};
`

const InputBorderActive = styled.div`
  ${mediaqueries.tablet`
    position: absolute;
    left: 0;
    right: 0;
    bottom: -1px;
    width: 100%;
    height: 1px;
    border-bottom: 1px solid #FFF;
    transform-origin: left;
    transform: scale(0);
    transition: all 400ms cubic-bezier(0.23, 1, 0.32, 1);
  `};

  ${p => p.hasError && `display: none;`};
`

const StyledLabel = styled.label`
  display: block;
  font-size: 3.2rem;
  color: ${p => (p.hasError ? colors.error : 'rgba(255,255,255,0.88)')};
  border: none;
  pointer-events: none;

  ${mediaqueries.tablet`
    font-size: 1.6rem;
    color: ${p => (p.hasError ? colors.error : 'rgba(255,255,255,0.88)')};
  `};
`

const LabelAnimation = styled.span`
  display: block;
  position: absolute;
  bottom: 0;
  pointer-events: none;
  width: 100%;
  height: 100%;
  font-weight: 300;

  transform: perspective(100px);
  transform-origin: 0 0;
  transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1),
    color 0.4s cubic-bezier(0.25, 0.8, 0.25, 1),
    font-weight 0.3s cubic-bezier(0.25, 0.8, 0.25, 1) 0.1s,
    width 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);

  ${p =>
    p.hasValue &&
    `
    label {
      color: #FFF;
    }

    font-weight: 500;
    width: 133.3333333%;
    transform: translateY(-1.28125em) scale(0.45) perspective(100px)
      translateZ(0.001px);
  `};

  ${mediaqueries.tablet`
  ${p =>
    p.hasValue &&
    `
      width: 133.3333333%;
      transform: translateY(-1.28125em) scale(0.8) perspective(100px)
        translateZ(0.001px);
        `}`};

  ${mediaqueries.tablet`
    padding-top: 0.55rem;
  `};
`

const StyledInput = styled.textarea`
  display: block;
  width: 100%;
  font-size: 3.2rem;
  font-weight: 300;
  height: 4.8rem;
  border: none;
  background: transparent;
  color: white;
  -webkit-text-fill-color: white;
  resize: none;

  ${mediaqueries.tablet`
    font-size: 1.6rem;
    height: 1.8rem;
    color: #FFF;
  `};

  &:active,
  &:focus {
    outline: none;
  }

  &[value]:not([value='']) ~ ${LabelAnimation} {
    label {
      color: #FFF;
    }

    font-weight: 500;
    width: 133.3333333%;
    transform: translateY(-1.28125em) scale(0.45) perspective(100px)
      translateZ(0.001px);

    ${mediaqueries.tablet`
      width: 133.3333333%;
      transform: translateY(-1.28125em) scale(0.8) perspective(100px)
        translateZ(0.001px);
    `};
  }

  &:active ~ ${LabelAnimation}, &:focus ~ ${LabelAnimation} {
    label {
      color: #FFF;
    }

    font-weight: 500;
    width: 133.3333333%;
    transform: translateY(-1.28125em) scale(0.45) perspective(100px)
      translateZ(0.001px);

    ${mediaqueries.tablet`
      width: 133.3333333%;
      transform: translateY(-1.28125em) scale(0.8) perspective(100px)
        translateZ(0.001px);
    `};
  }

  &:active ~ ${InputBorderActive}, &:focus ~ ${InputBorderActive} {
    transform: scale(1);
  }
`
