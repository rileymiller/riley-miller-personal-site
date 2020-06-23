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

import { rhythm } from "../utils/typography"


export const IntroSection = () => (
  <section>
    <p>
      Hi Friends
        </p>

    <p>
      My name is Riley Miller and welcome to my personal site. I am a skilled Software Engineer, Professor, Co-founder, Researcher, and former
      college football player.
        </p>

    <p>
      This site is designed to hold some of the thoughts that I have developed over the years with notes on technology, starting a company,
          software development, and anything that I find interesting. The idea behind having a <a target={`_blank`}
        href={`https://joelhooks.com/digital-garden`}>Digital Garden</a> is to focus on the development and curation of valuable content,
            instead of waiting for my work to be picture-perfect.
        </p>

    <p>
      👋 If you're trying to get ahold of me you can reach me via <a href={`mailto:rmllr000@gmail.com`}>email</a>,
          {` `}<a target={`_blank`} href={`https://twitter.com/riley_miller00`}>twitter</a>,{` `}
          or <a target={`_blank`} href={`https://www.linkedin.com/in/riley-miller-420044112/`}>LinkedIn</a>. 👋
        </p>

    <p>
      If I write something you like please share and if you have any feedback please feel free to reach me with any of the channels above 👆
        </p>
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
          {` `}
          <a target={`_blank`} href={`https://twitter.com/${social.twitter}`}>
            You should follow him on Twitter 👈
        </a>
        </p>
      </ProfileContainer>
    </BioContainer>
  )
}