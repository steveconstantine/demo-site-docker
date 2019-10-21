import React from 'react'
import { SponsorButtonStyles } from '@styles'

export const SponsorButton = ({ sponsorId }) => (
  <div className="sponsor-button">
    <SponsorButtonStyles />
    <a
      className="bmc-button"
      target="_blank"
      rel="noopener noreferrer"
      href={`https://www.buymeacoffee.com/${sponsorId}`}
    >
      <img
        src="https://www.buymeacoffee.com/assets/img/BMC-btn-logo.svg"
        alt="Contribute to a Legit Cause"
      />
      <span>Donate toward Ocean Clean-up</span>
    </a>
  </div>
)
