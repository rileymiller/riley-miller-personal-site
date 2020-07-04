import React from "react"
import { Link, graphql } from "gatsby"

import { Bio, IntroSection } from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Global, css } from "@emotion/core"
import { GLOBAL_COLORS } from "../utils/colors"

import { rhythm } from "../utils/typography"

type Props = {
  data: {
    allMarkdownRemark: any
    site: {
      siteMetadata: {
        title: string
      }
    }
  }
}

const BlogIndex = ({ data }: Props) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges

  return (
    <>
      <Global
        styles={
          css`
            a {
              color: ${GLOBAL_COLORS.bg_primary};
              box-shadow:none;
            }
        `
        }
      />
      <Layout location={typeof window !== `undefined` ? window.location : ''} title={siteTitle}>
        <SEO title="Bio" />
        <Bio />
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
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
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