import React, { Component } from 'react'
import styled from 'styled-components'

import mediaqueries from '@styles/media'
import { IntersectionObserver } from '@components'

const perks = [
  {
    heading: '100% remote',
    text: 'work from your couch, or from a beach',
  },
  {
    heading: 'Autonomy',
    text: 'build your own hours, work at your own pace',
  },
  {
    heading: 'Respect',
    text: 'companies trust us for what we build',
  },
  {
    heading: 'Vacation',
    text: '4 weeks paid plus sick days and holidays',
  },
  {
    heading: 'Competitive salaries',
    text: 'we pay what you deserve',
  },
  {
    heading: 'Executive decisions',
    text: 'we listen to you, at all times',
  },
  {
    heading: 'Health insurance',
    text: 'complete coverage in Canada',
  },
]

class Perks extends Component<{}, { animate: boolean }> {
  state = {
    animate: false,
  }

  render() {
    const { animate } = this.state

    // To-do: reintroduce intersection observer IntersectionObserver
    return (       
        <PerksContainer>
          <PerksList>
            {perks.map((perk, index) => (
              <PerksItemContainer key={perk.heading}>
                <PerksItem animate={animate} index={index}>
                  <PerksItemHighlight>
                    {perk.heading}{' '}
                    <PerksItemDash>&nbsp;-&nbsp;</PerksItemDash>
                  </PerksItemHighlight>
                  {perk.text}
                </PerksItem>
                {index !== perks.length - 1 && (
                  <PerksItemLineContainer>
                    <PerksItemLine animate={animate} index={index} />
                  </PerksItemLineContainer>
                )}
              </PerksItemContainer>
            ))}
          </PerksList>
        </PerksContainer>
    )
  }
}

export default Perks

const PerksContainer = styled.div`
  width: 100%;
  position: relative;
  top: -0.25rem;
`

const PerksList = styled.ul`
  list-style: none;
`

const PerksItemContainer = styled.li`
  position: relative;
`

const PerksItem = styled.div`
  color: ${p => p.theme.colors.grey};
  height: 5rem;
  display: flex;
  align-items: center;

  transform: ${p => (p.animate ? `translateY(0)` : `translateY(5rem)`)};
  opacity: ${p => (p.animate ? 1 : 0)};
  transition: all 1.5s cubic-bezier(0.165, 0.84, 0.44, 1) ${p => p.index * 75}ms;

  ${mediaqueries.tablet`
    flex-direction: column;
    align-items: flex-start;
    height: auto;
    padding: 1.5rem 0;
  `};
`

const PerksItemDash = styled.div`
  ${mediaqueries.tablet`
    display: none;
  `};
`

const PerksItemHighlight = styled.span`
  color: #fff;
  font-weight: 600;
  display: flex;
  align-items: center;
`

const PerksItemLineContainer = styled.div`
  overflow: hidden;
  width: 44%;
  height: 1px;

  position: absolute;
  left: 0;
  bottom: 0;

  ${mediaqueries.tablet`
    width: 100%;
  `};
`

const PerksItemLine = styled.div`
  width: 100%;
  height: 1px;
  transform: translateX(-100%);
  background: ${p => p.theme.colors.grey};
  transform: ${p => (p.animate ? `translateX(0)` : `translateX(-100%)`)};
  transition: transform 0.5s cubic-bezier(0.165, 0.84, 0.44, 1)
    ${p => p.index * 70 + 1200}ms;

  ${mediaqueries.tablet`
    background: ${p => p.theme.colors.grey};
    transition: transform 0.8s cubic-bezier(0.165, 0.84, 0.44, 1)
    ${p => p.index * 120 + 1200}ms;
  `};
`
