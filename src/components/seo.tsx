import React from "react"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

type Props = {
  description?: string
  lang?: string
  meta?: []
  title: string
  imageUrl: string | null
  imageAlt: string
}

export const constructUrl = (baseUrl?: string, path?: string) =>
  (!baseUrl || !path) ? null : `${baseUrl}${path}`;

const SEO = ({ description, lang, meta, title, imageUrl, imageAlt }: Props) => {
  const { site, ogImageDefault } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            social {
              twitter
            }
            # Add this
            siteUrl
          }
        }
        # Add this
        ogImageDefault: file(relativePath: {eq: "rm-bg-icon.png"}) { 
          childImageSharp {
            fixed(height: 260, width: 260) {
              src
            }
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description

  const defaultImageUrl = constructUrl(site.siteMetadata.siteUrl, ogImageDefault?.childImageSharp?.fixed?.src)

  const ogImageUrl = imageUrl || defaultImageUrl

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          property: `og:image`,
          content: ogImageUrl
        },
        // If a post has an image, use the larger card. 
        // Otherwise the default image is just 
        // a small logo, so use the smaller card.
        { property: `twitter:card`, content: imageUrl ? `summary_large_image` : `summary`, },

        // Add image alt text
        // Falls back to default which describes the site logo
        { property: `twitter:image:alt`, content: imageAlt || "rileymiller.dev logo", },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(meta || [])}
    />
  )
}

export default SEO