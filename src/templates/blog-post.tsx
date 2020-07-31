import React from 'react'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'

import { Bio } from '../components/bio'
import Layout from '../components/layout'
import SEO from '../components/seo'
import { rhythm, scale } from '../utils/typography'

interface Props {
  data: {
    markdownRemark: any
    site: {
      siteMetadata: {
        title: string
      }
    }
  }
  pageContext: any
}

const BlogPostTemplate = ({ data, pageContext }: Props) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title
  const featuredImgFluid = post.frontmatter?.featuredImage?.childImageSharp?.fluid
  const featuredImgDescription = post.frontmatter?.featuredImageDescription
  const photographerLink = post.frontmatter?.photographerLink
  const photographerName = post.frontmatter?.photographerName

  const { previous, next } = pageContext
  return (
    <Layout location={typeof window !== `undefined` ? window.location : ''} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <h1
        style={{
          marginTop: rhythm(1),
          marginBottom: rhythm(.1),
        }}
      >
        {post.frontmatter.title}
      </h1>
      <p
        style={{
          ...scale(-1 / 5),
          display: `block`,
          marginBottom: rhythm(.1)
        }}
      >
        {post.frontmatter.date}
      </p>
      {post.frontmatter?.featuredImage && <Img
        style={{
          marginTop: rhythm(.2),
          marginBottom: rhythm(.3)
        }}
        fluid={featuredImgFluid}
      />}
      {featuredImgDescription &&
        <p style={{
          // fontSize: rhythm
          marginBottom: rhythm(1),
          display: `flex`,
          fontWeight: `bold`,
          justifyContent: `center`
        }}>
          <div>{featuredImgDescription}</div>
          <a
            style={{
              marginLeft: rhythm(.2)
            }}
            href={photographerLink}>{photographerName}</a>
        </p>}

      <div dangerouslySetInnerHTML={{ __html: post.html }} />
      <hr
        style={{
          marginBottom: rhythm(1),
        }}
      />
      <Bio />

      <ul
        style={{
          display: `flex`,
          flexWrap: `wrap`,
          justifyContent: `space-between`,
          listStyle: `none`,
          padding: 0,
        }}
      >
        <li>
          {previous && (
            <Link to={previous.fields.slug} rel="prev">
              ← {previous.frontmatter.title}
            </Link>
          )}
        </li>
        <li>
          {next && (
            <Link to={next.fields.slug} rel="next">
              {next.frontmatter.title} →
            </Link>
          )}
        </li>
      </ul>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        featuredImage {
          childImageSharp {
            fluid(maxWidth: 800) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      featuredImageDescription
      photographerLink
      photographerName
      }
    }
  }
`