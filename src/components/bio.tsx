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

export const UnorderedList = styled.ul({
  // listStylePosition: `inside`
})

export const IntroSection = () => (
  <section>
    <p>
      Hi Friends,
        </p>

    <p>
      My name is Riley Miller and welcome to my digital garden.
        </p>

    <p>
      I am a Founder, Engineer, Professor, Researcher, former college football player, and English Bulldog Dad. </p>

    <p>
      I'm currently a Software Engineer for Workday by day and starting LiveLot at night.
    </p>

    <p>
      I also recently finished up my Masters degree in Computer Science at Colorado School of Mines where I worked as a Graduate Teaching Fellow
      and Graduate Research Assistant while I wrote <a href="https://mountainscholar.org/handle/11124/174131"> my thesis </a> on applied Machine Learning for <a href="https://www.mturk.com/worker/help">crowdsourcing</a>
      {` `} platforms.
    </p>

    <p>
      The reason for this site: <b>I'm a teacher, and I'm <i>extremely</i> passionate about learning.</b>
    </p>

    <p>
      One of my greatest passions in life is to teach others what I'm passionate about whether that be my faith,
      software development, personal finance, or how to protect the quarterback. I believe that learning is one of the
      richest aspects of the human experience and I hope that this site will help others expand their knowledge.
    </p>

    <p>The idea behind structuring this site as a <a target={`_blank`}
      href={`https://joelhooks.com/digital-garden`}>Digital Garden</a> is to reduce the formality behind a lot of my writing. I don't want any of the content
      that I write on this site to be viewed as a "finished work". Treating this site as a digital garden will allow me to come back and improve previously
      written content as I expand my ideas or think of a better way to articulate a topic.
    </p>

    <p>
      I work with a lot of different technologies during the course of my week and have worked with many others in the past. I'm currently interested in building cool shit.
    </p>

    <p>
      In the past I've worked pretty heavily with Java, React, Docker, Jenkins, React Native, Bash, Frontend Testing (Jest, Cypress, Selenium, @testing-library), TensorFlow, C++, Node.js, Python, and Arch Linux.
      Whatever the tool is to get schwifty.
    </p>


    <p>
      👋 If you're trying to get ahold of me you can reach me via <a href={`mailto:rmllr000@gmail.com`}>email</a>,
          {` `}<a target={`_blank`} href={`https://twitter.com/riley_miller00`}>twitter</a>,{` `}
          or <a target={`_blank`} href={`https://www.linkedin.com/in/riley-miller-420044112/`}>LinkedIn</a>. 👋
        </p>

    <p>
      If I write something you like please share and if you have any feedback please feel free to reach me with any of the channels above.
    </p>
    <hr />
    <h2>Front-end Articles 💅</h2>
    <li>
      <a href="/gatsby/deploy-gatsby-s3-gh-actions/#git-repo-on-github">Deploy a Gatsby site to S3 with GitHub Actions</a>
    </li>
    <hr />
    <h2>Professing 👨‍🏫</h2>
    <p>
      I just finished teaching a section of Software Engineering at Mines this fall as an Adjunct Professor and have recently created
      some content for teaching SOLID principles. In the SOLID principles assignments below 👇, students create a lightweight API in Spring
      Boot to manage their imaginary digital wallets 💸.
    </p>
    <h3>Java Articles</h3>
    <li>
      <a href="/java-solid-principles-spring-boot-pt1">SOLID Principles in Spring Boot: Setup</a>
    </li>
    <li>
      <a href="/java-solid-principles-spring-boot-starter-code">SOLID Principles in Spring Boot: Starter Code Reference</a>
    </li>
    <li>
      <a href="/java-solid-principles-spring-boot-pt2">SOLID Principles in Spring Boot: Assignment Pt. 1</a>
    </li>
    <li>
      <a href="/java-solid-principles-spring-boot-pt3" >SOLID Principles in Spring Boot: Assignment Pt. 2</a>
    </li>
    <p>
      Last summer I taught a section of Data Structures at Colorado School of Mines as an Adjunct Professor and wrote some
      articles to provide supplementary materials to my students if you're interested in learning any C++. 👇
    </p>
    <h3>C++ Articles</h3>
    <UnorderedList>
      <li>
        <a href="/c++-objects-classes">Objects and Classes in C++</a>
      </li>
      <li>
        <a href="/c++-inheritance-subclass-definition">C++ Inheritance: Subclass Definition (Pt. 1)</a>
      </li>
      <li>
        <a href="/c++-inheritance-protected-members">C++ Inheritance: Protected Member Access (Pt. 2)</a>
      </li>
      <li>
        <a href="/c++-inheritance-relationship">C++ Inheritance: Inheritance Access Levels (Pt. 3)</a>
      </li>
      <li>
        <a href="/c++-inheritance-base-class-override">C++ Inheritance: Overriding Base Class Methods (Pt. 4)</a>
      </li>
      <li>
        <a href="/c++-inheritance-polymorphism">C++ Inheritance: Polymorphism (Pt. 5)</a>
      </li>
      <li>
        <a href="/c++-stl-set">C++ STL Sets</a>
      </li>
      <li>
        <a href="/c++-pointers">C++ Pointers</a>
      </li>
    </UnorderedList>
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