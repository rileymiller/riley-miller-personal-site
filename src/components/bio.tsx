/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"
import styled from "@emotion/styled"
import { css } from '@emotion/core'
import { rhythm } from "../utils/typography"
import Icon from './icon' 
import { syncIconPath } from "./icon/paths"
import { flex, flexColumn, flexCenter} from '../styles/globals'
import { colors } from '../utils/colors'

export const UnorderedList = styled.ul({
  // listStylePosition: `inside`
})

export const IntroSection = () => (
  <section css={[flexColumn]}>
    <p>
      hey 👋! I'm riley

    </p>

    <p>
      now: Cofounder and CTO at <a target="_blank" href="https://spore.build/">Spore</a> 🍄
    </p>

    <p>in the past i founded a company called LiveLot that used CV to streamline parking on
      college campuses. learned a ton during the 3 years I spent building LiveLot and discovered I want to spend my life building big ideas. i also worked at workday straight out of school for 9 months before
      I quit to focus on building startups full time. i love my purty wife. i played college football for 5 years. im a Christian. i thank God for the life i get to lead
    </p>

    <p>
    education: being extremely online, undergrad: cs at colorado school of mines, masters: cs at colorado school of mines 
         (<a target="_blank" href="https://mountainscholar.org/handle/11124/174131">thesis</a>)
    </p>


    
    <a href="/legacy">Old 🗄</a>
  </section>
)

export const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/fb-profile.png/" }) {
        childImageSharp {
          fixed(width: 70, height: 70) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author
          social {
            twitter
          }
        }
      }
    }
  `)

  const { author, social } = data.site.siteMetadata

  const BioContainer = styled.div({
    display: `flex`,
    flexDirection: `column`,
  })

  const ProfileContainer = styled.div({
    display: `flex`,
    alignItems: `flex-end`,
    [`@media (max-width: 420px)`]: {
      alignItems: `flex-start`,
      marginBottom: rhythm(.5)
    },
    marginBottom: rhythm(1.5)

  })

  return (
    <BioContainer>
      <ProfileContainer>

        <Image
          fixed={data.avatar.childImageSharp.fixed}
          alt={author.name}
          style={{
            marginRight: rhythm(1 / 2),
            marginBottom: 0,
            minWidth: 70,
            borderRadius: `100%`,
          }}
          imgStyle={{
            borderRadius: `50%`,
          }}
        />
        <p>
          Written by <strong>{author}</strong>
          {`, `}
          <a target={`_blank`} href={`https://twitter.com/${social.twitter}`}>
            follow me on Twitter 🐦
        </a>
        </p>
      </ProfileContainer>
    </BioContainer>
  )
}
