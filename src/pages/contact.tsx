import React, { Component, Fragment } from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import Transition from 'react-transition-group/Transition'

import Section from '@components/Section'
import Layout from '@components/Layout'
import SEO from '@components/SEO'
import Hidden from '@components/Hidden'

import transitions from '@styles/transitions'
import mediaqueries from '@styles/media'
import { startAnimation } from '@utils'
import { ExIcon } from '../icons/ui'

import ContactForm from '../sections/contact/Contact.ContactForm'
import PhoneForm from '../sections/contact/Contact.PhoneForm'

/**
 * The contact page has a bit more complexity to it due to the nature
 * of animating in and wanting this page to handle more like a modal
 * than a regular page.
 *
 * Starting the animation will slidein the form.
 * Pressing the ESC key will navigate from the page like a modal.
 */

class ContactPage extends Component<{}, { animation: string }> {
  state = { animation: '' }

  componentDidMount() {
    startAnimation(() => {
      this.setState({
        animation: 'start',
      })
    })

    window.addEventListener('keydown', this.handleEscKeyPress)
  }

  componentWillUnmount() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('keydown', this.handleEscKeyPress)
    }
  }

  exitContactPage = () => {
    this.setState({ animation: '' })

    // Wait for the animation out to navigate to the previous page
    setTimeout(() => {
      window.history.back()
    }, 550)
  }

  handleEscKeyPress = ({ key }) => {
    if (key === 'Escape') {
      this.exitContactPage()
    }
  }

  render() {
    const { animation } = this.state
    const navConfig = {
      offset: true,
      fixed: true,
      isContactPage: true,
      theme: 'dark',
    }

    return (
      <Layout nav={navConfig} background="#08080b" withFooter={false}>
        <Fragment>
          <SEO
            title="Contact"
            pathname={this.props.location.pathname}
            image={this.props.data.contactMeta.childImageSharp.fixed.src}
          />
          <Hidden>
            <h1>Contact</h1>
          </Hidden>
          <FixedElement>
            <Section>
              <PhoneFormContainer>
                <TextContainer animation={animation}>
                  <MainText>
                    <HighlightText>No time to fill a form?</HighlightText> No
                    problem, leave us your phone number and we'll call you back
                    within 24 hours.
                  </MainText>
                  <PhoneForm />
                </TextContainer>
              </PhoneFormContainer>
            </Section>
          </FixedElement>
          <SlideIn in={animation === 'start'}>
            <FormContainer
              animation={animation}
              transitionDelay={500}
              transitionDelayMobile={300}
            >
              <ContactForm baseDelay={1000} />
            </FormContainer>
          </SlideIn>
          <CloseContainer onClick={this.exitContactPage} animation={animation}>
            <ExIcon />
          </CloseContainer>
        </Fragment>
      </Layout>
    )
  }
}

export default ContactPage

export const pageQuery = graphql`
  query ContactPageQuery {
    contactMeta: file(name: { regex: "/narative-meta/" }) {
      childImageSharp {
        fixed(width: 1200, quality: 100) {
          ...GatsbyImageSharpFixed_noBase64
        }
      }
    }
  }
`

const defaultStyle = {
  transform: 'translateY(100vh)',
}

const transitionStyles = {
  entering: { opacity: 0, transform: 'translateY(100vh)' },
  entered: { opacity: 1, transform: 'translateY(40px)' },
  exiting: { opacity: 1, transform: 'translateY(100vh)' },
  exited: { opacity: 0, transform: 'translateY(100vh)' },
}

const SlideIn = ({ in: inProp, children }) => (
  <Transition in={inProp} timeout={600}>
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

const SlideInContainer = styled.div`
  width: 100%;
  height: calc(100vh - 40px);
  top: 0px;
  right: 0px;
  padding-top: 125px;
  z-index: 0;
  position: fixed;
  overflow-y: scroll;
  transition: transform 1.1s cubic-bezier(0.19, 1, 0.22, 1);
  will-change: transform;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background: url('https://cdn.shopify.com/s/files/1/0708/4517/t/7/assets/photo-gallery-1492-Raven-Magic_1024x1024.jpg?6282936110242184875');
  background-size: cover;
  background-position: center center;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  filter: blur(0);

  ${mediaqueries.tablet`
    width: 100%;
    position: relative;
    top: 310px;
    height: auto;
    box-shadow: none;
    padding-top: 0;
    overflow: initial;
    overflow-y: scroll;

    &::before {
      content: '';
      position: absolute;
      top: 20px;
      width: 42px;
      margin: 0 auto;
      left: 0;
      right: 0;
      height: 4px;
      background: rgba(0, 0, 0, 0.2);
      border-radius: 100px;
    }
  `};
`

const TextContainer = styled.div`
  ${transitions.fadeIn};
`

const MainText = styled.p`
  font-size: 1.8rem;
  font-weight: 400;
  color: ${p => p.theme.colors.grey};
  margin-bottom: 2rem;
`

const FixedElement = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  width: 100%;
`

const PhoneFormContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  display: none;

  ${mediaqueries.tablet`
    display: block;
    padding: 13rem 0 1rem;
  `};
`

const FormContainer = styled.div`
  position: relative;
  width: 100%;
  margin: 0 auto;
  width: 100%;
  padding-top: 7rem;
  background: -moz-linear-gradient(top,  rgba(55,55,55,0.55) 0%, rgba(41,137,216,0.4) 49%, rgba(41,137,216,0.28) 90%, rgba(125,185,232,0.25) 100%); /* FF3.6-15 */
  background: -webkit-linear-gradient(top,  rgba(55,55,55,0.55) 0%,rgba(41,137,216,0.4) 49%,rgba(41,137,216,0.28) 90%,rgba(125,185,232,0.25) 100%); /* Chrome10-25,Safari5.1-6 */
  background: linear-gradient(to bottom,  rgba(55,55,55,0.55) 0%,rgba(41,137,216,0.4) 49%,rgba(41,137,216,0.28) 90%,rgba(125,185,232,0.25) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#8c373737', endColorstr='#407db9e8',GradientType=0 ); /* IE6-9 */
  z-index: 99999;
`

const HighlightText = styled.span`
  display: block;
  color: #fff;
  ${p => p.underline && `text-decoration: underline`};
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

  transform: translateY(${p => (p.animation ? '0' : '-80px')});
  transition: transform 0.7s cubic-bezier(0.215, 0.61, 0.355, 1)
    ${p => (p.animation ? '1s' : '0s')};

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
`
