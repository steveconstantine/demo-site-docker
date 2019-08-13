import React, { useEffect, useContext } from 'react'
import styled from 'styled-components'
import Transition from 'react-transition-group/Transition'

import Hidden from '@components/Hidden'
import { ContactContext } from '@components/Contact/Contact.Context'

import mediaqueries from '@styles/media'
import { scrollable } from '@utils'
import { ExIcon } from '../../icons/ui'
import { useReduxState } from '@store'

import ContactForm from '../../sections/contact/Contact.ContactForm'

function ContactSlideIn() {
  const { showContact, toggleContact } = useContext(ContactContext)
  const [{ name }] = useReduxState(state => ({
    name: state.shortcuts.name,
  }))

  useEffect(() => {
    if (showContact) {
      scrollable('disable')

      function handleEscKeyPress(event: KeyboardEvent) {
        if (event.key === 'Escape') {
          toggleContact(event)
        }
      }

      window.addEventListener('keydown', handleEscKeyPress)

      return () => window.removeEventListener('keydown', handleEscKeyPress)
    } else {
      scrollable('enable')
    }
  }, [showContact])

  useEffect(() => {
    if (name === 'CONTACT') {
      scrollable('disable')
      toggleContact()
    } else {
      if (!name.includes('COMMAND_LINE')) {
        scrollable('enable')
      }
    }
  }, [name])

  return (
    <Frame tabIndex={showContact ? 0 : -1} aria-hidden={!showContact}>
      {' '}
      <Mask isActive={showContact} onClick={toggleContact} />
      <CloseContainer
        onClick={toggleContact}
        animation={showContact}
        data-a11y="false"
      >
        <ExIcon />
        <Hidden>Close Contact Form</Hidden>
      </CloseContainer>
      <SlideIn in={showContact}>
        {showContact && (
          <FormContainer>
            <ContactForm baseDelay={300} />
          </FormContainer>
        )}
      </SlideIn>
    </Frame>
  )
}

export default ContactSlideIn

const defaultStyle = {
  transform: 'translateY(100vh)',
}

const transitionStyles = {
  entering: { opacity: 0, transform: 'translateY(100vh)' },
  entered: { opacity: 1, transform: 'translateY(40px)' },
  exiting: { opacity: 1, transform: 'translateY(40px)' },
  exited: { opacity: 1, transform: 'translateY(100vh)' },
}

const SlideIn = ({ in: inProp, children }) => (
  <Transition in={inProp} timeout={0}>
    {state => (
      <SlideInContainer
        style={{
          ...defaultStyle,
          ...transitionStyles[state],
        }}
      >
        {children}
      </SlideInContainer>
    )}
  </Transition>
)

const Frame = styled.div`
  position: relative;
  z-index: 11;
`

const Mask = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  background: rgba(17, 18, 22, 0.2);
  pointer-events: ${p => (p.isActive ? 'initial' : 'none')};
  opacity: ${p => (p.isActive ? 1 : 0)};
  transition: opacity ${p => (p.isActive ? '0.7s' : '0')}
    ${p => (p.isActive ? '0.3s' : '')};
`

const SlideInContainer = styled.div`
  width: 100vw;
  height: calc(100vh - 40px);
  top: 20px;
  right: 0px;
  padding-top: 0;
  z-index: 9;
  position: fixed;
  overflow-y: scroll;
  transition: transform 1s cubic-bezier(0.19, 1, 0.22, 1);
  will-change: transform;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background: url('https://cdn.shopify.com/s/files/1/0708/4517/t/7/assets/photo-gallery-1492-Raven-Magic_1024x1024.jpg?6282936110242184875');
  background-size: cover !important;
  background-position: top center;
  backface-visibility: hidden;
  filter: blur(0);

  ${mediaqueries.tablet`
    display: none;
    opacity: 0;
    visibility: hidden;
  `};
`

const FormContainer = styled.div`
  position: relative;
  width: calc(100% - 0px);
  margin: 0;
  padding-top: 50px;
  z-index: 99999;
  background: -moz-linear-gradient(top,  rgba(55,55,55,0.55) 0%, rgba(41,137,216,0.4) 49%, rgba(41,137,216,0.28) 90%, rgba(125,185,232,0.25) 100%); /* FF3.6-15 */
  background: -webkit-linear-gradient(top,  rgba(55,55,55,0.55) 0%,rgba(41,137,216,0.4) 49%,rgba(41,137,216,0.28) 90%,rgba(125,185,232,0.25) 100%); /* Chrome10-25,Safari5.1-6 */
  background: linear-gradient(to bottom,  rgba(55,55,55,0.55) 0%,rgba(41,137,216,0.4) 49%,rgba(41,137,216,0.28) 90%,rgba(125,185,232,0.25) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#8c373737', endColorstr='#407db9e8',GradientType=0 ); /* IE6-9 */
`

const CloseContainer = styled.button`
  position: fixed;
  z-index: 1000;
  right: 0;
  left: 0;
  margin: 0 auto;
  top: 24px;
  cursor: pointer;
  border-radius: 50%;
  height: 40px;
  width: 40px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;

  opacity: ${p => (p.animation ? 1 : 0)};
  transform: translateY(${p => (p.animation ? '0' : '-120px')});
  transition: transform 0.7s cubic-bezier(0.215, 0.61, 0.355, 1)
      ${p => (p.animation ? '0.2s' : '0s')},
    opacity 0s linear ${p => (p.animation ? '0s' : '1s')};

  ${mediaqueries.tablet`
    display: none;
  `};

  &::after {
    content: '';
    position: absolute;
    height: 40px;
    width: 40px;
    top: 0;
    border-radius: 50%;
    transform: scale(0.8);
    transition: all 200ms ${p => p.theme.transitions.in};
  }

  &:hover::after {
    background: rgba(0, 0, 0, 0.03);
    transform: scale(1);
  }

  &[data-a11y='true']:focus {
    border: 2px solid ${p => p.theme.colors.purple};
  }
`
