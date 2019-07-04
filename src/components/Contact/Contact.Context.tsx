import React, { createContext, useState, ReactChild } from 'react'
import { navigate } from 'gatsby'
import { getBreakpointFromTheme, getWindowDimensions } from '@utils'

// it returns two components Provider and Consumer
export const ContactContext = createContext({
  showContact: false,
  toggleContact: (event?: Event) => {},
})

export function ContactProvider({ children }: { children: ReactChild }) {
  const [showContact, setShowContact] = useState(false)

  function toggleContact(event?: Event) {
    if (event) {
      event.preventDefault()
      event.stopPropagation()
    }

    const { width } = getWindowDimensions()
    const tablet = getBreakpointFromTheme('tablet')

    if (width > tablet) {
      setShowContact(prevContact => !prevContact)
    } else {
      navigate('/contact')
    }
  }

  return (
    <ContactContext.Provider value={{ showContact, toggleContact }}>
      {children}
    </ContactContext.Provider>
  )
}
