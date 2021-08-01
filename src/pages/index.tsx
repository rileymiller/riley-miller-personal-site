import React from "react"
import { Link, graphql } from "gatsby"

import { Bio, IntroSection } from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Global, css } from "@emotion/core"
import { colors } from "../utils/colors"

import { rhythm } from "../utils/typography"

type Props = {
  data: {
    allMdx: any
    site: {
      siteMetadata: {
        title: string
      }
    }
  }
}

const BlogIndex = ({ data }: Props) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMdx.edges

  return (
    <>
      <Global
        styles={
          css`
          html {
            height: 100%;
          }
          body {
            height: 100%;
          }
          #___gatsby {
            height: 100%;
          }
          #gatsby-focus-wrapper {
            height: 100%;
          }
            a {
              color: ${colors.primaryBase};
              box-shadow:none;
            }
        `
        }
      />
      <Layout location={typeof window !== `undefined` ? window.location : ''} title={siteTitle}>
        <SEO title="Bio" />
        {/* <Bio /> */}
        <IntroSection />
        {/* {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug
        return (
          <div key={node.fields.slug}>
            <h3
              style={{
                marginBottom: rhythm(1 / 4),
              }}
            >
              <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                {title}
              </Link>
            </h3>
            <small>{node.frontmatter.date}</small>
            <p
              dangerouslySetInnerHTML={{
                __html: node.frontmatter.description || node.excerpt,
              }}
            />
          </div>
        )
      })} */}
      </Layout>
    </>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`