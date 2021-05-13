import React from 'react'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import { MDXProvider, Components } from '@mdx-js/react'

import { Bio } from '../components/bio'
import Layout from '../components/layout'
import SEO, { constructUrl } from '../components/seo'
import { CodeBlock } from '../components/codeBlock'
// import CodeBlock from '../components/codeBlock'
import { MDXRenderer } from "gatsby-plugin-mdx"

import { rhythm, scale } from '../utils/typography'

interface Props {
  data: {
    mdx: any
    site: {
      siteMetadata: {
        title: string
        siteUrl: string
      }
    }
  }
  pageContext: any
  children: React.ReactNode
}

const preComponent = (props: any) => <div {...props} />

const components: Components = {
  pre: preComponent,
  code: CodeBlock
}

const BlogPostTemplate = ({ data, pageContext, children }: Props) => {
  const post = data.mdx
  const siteTitle = data.site.siteMetadata.title
  const featuredImgFluid = post.frontmatter?.featuredImage?.childImageSharp?.fluid

  const featuredImageDescription = post.frontmatter?.featuredImageDescription
  const photographerLink = post.frontmatter?.photographerLink
  const photographerName = post.frontmatter?.photographerName

  const { previous, next } = pageContext
  return (
    <MDXProvider
      components={
        components
      }
    >

      <Layout location={typeof window !== `undefined` ? window.location : ''} title={siteTitle}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
          imageUrl={constructUrl(
            data.site.siteMetadata.siteUrl, post.frontmatter.featuredImage?.childImageSharp?.fixed?.src
          )}
          imageAlt={post.frontmatter.imageAlt}
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
        {post.frontmatter?.featuredImage &&
          <>
            <Img
              style={{
                marginTop: rhythm(.2),
                marginBottom: rhythm(.3)
              }}
              fluid={featuredImgFluid}
            />
            {/* <div
              style={{
                textAlign: "center",
                fontSize: "14px",
                lineHeight: "28px",
              }}
              dangerouslySetInnerHTML={{ __html: post.frontmatter.imageTitleHtml }} /> */}
          </>
        }
        {featuredImageDescription &&
          <p style={{
            marginBottom: rhythm(1),
            display: `flex`,
            fontStyle: `italic`,
            justifyContent: `center`
          }}>
            {featuredImageDescription

            }
            <a
              style={{
                marginLeft: rhythm(.2)
              }}
              href={photographerLink}>{photographerName}</a>
          </p>
        }
        <MDXRenderer>{post.body}</MDXRenderer>
        {/* <div dangerouslySetInnerHTML={{ __html: post.html }} /> */}
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
    // </MDXProvider>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
        social {
          twitter
        }
        # Add this
        siteUrl
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      body
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        featuredImage {
          childImageSharp {
            fixed(height: 600, width: 1200) {
                src
            }
            fluid(maxWidth: 800) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      imageAlt
      imageTitleHtml
      featuredImageDescription
      photographerLink
      photographerName
      }
    }
  }
`