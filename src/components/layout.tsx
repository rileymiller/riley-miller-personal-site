import React, { useState } from "react"
import style from "@emotion/styled"
import { Link } from "gatsby"
import { GLOBAL_COLORS } from "../utils/colors"
import { rhythm, scale } from "../utils/typography"
import { css } from "@emotion/core"

type Props = {
  location?: Location | string
  title: string
  children?: any
}

const TitleLink = style(Link)({
  boxShadow: `none`,
  textDecoration: `none`,
  color: `inherit`,
  [`:hover`]: {
    color: `${GLOBAL_COLORS.bg_primary}`
  },
  display: `flex`,
  alignItems: `center`
})

const RootTitle = style.h1({
  ...scale(1.5),
  marginBottom: rhythm(1.5),
  marginTop: 0,
})

const SecondaryTitle = style.h3({
  fontFamily: `Montserrat, sans-serif`,
  marginTop: 0,
})

type LogoProps = {
  isHovered: boolean
}
const RM_Logo = (props: LogoProps) => {
  const fill = props.isHovered ? GLOBAL_COLORS.bg_primary : `black`
  return (
    <svg width="140" height="140" viewBox="0 0 57 57" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="28.5" cy="28.5" r="28.5" fill={fill} />
      <path d="M8.56516 41.2468C8.70146 41.487 9.00665 41.5711 9.2468 41.4348L13.1604 39.2136C13.4005 39.0773 13.4847 38.7721 13.3484 38.532C13.2121 38.2918 12.9069 38.2076 12.6668 38.3439L9.18804 40.3184L7.21362 36.8396C7.07731 36.5995 6.77213 36.5153 6.53197 36.6516C6.29182 36.7879 6.20763 37.0931 6.34393 37.3332L8.56516 41.2468ZM16.518 11.867L8.518 40.867L9.482 41.133L17.482 12.133L16.518 11.867Z" fill="white" />
      <path d="M17 12.5C25.4 15.3 30.1667 22 31.5 25C28.3 28.2 18.1667 26.3333 13.5 25L26.5 43" stroke="white" />
      <path d="M26.534 41.1812C26.6341 41.4386 26.9239 41.5661 27.1812 41.466L31.3752 39.835C31.6326 39.7349 31.7601 39.4451 31.66 39.1878C31.5599 38.9304 31.2702 38.8029 31.0128 38.903L27.2848 40.3528L25.835 36.6248C25.7349 36.3674 25.4451 36.2399 25.1878 36.34C24.9304 36.4401 24.8029 36.7298 24.903 36.9872L26.534 41.1812ZM37.5423 15.7986L26.5423 40.7986L27.4577 41.2014L38.4577 16.2014L37.5423 15.7986Z" fill="white" />
      <line x1="37.4989" y1="15.9667" x2="38.4989" y2="30.9667" stroke="white" />
      <line x1="47.4287" y1="16.2572" x2="38.4287" y2="31.2572" stroke="white" />
      <path d="M46.6464 41.3536C46.8417 41.5488 47.1583 41.5488 47.3536 41.3536L50.5355 38.1716C50.7308 37.9763 50.7308 37.6597 50.5355 37.4645C50.3403 37.2692 50.0237 37.2692 49.8284 37.4645L47 40.2929L44.1716 37.4645C43.9763 37.2692 43.6597 37.2692 43.4645 37.4645C43.2692 37.6597 43.2692 37.9763 43.4645 38.1716L46.6464 41.3536ZM46.5 15V41H47.5V15H46.5Z" fill="white" />
    </svg>
  )
}



const Layout = ({ location, title, children }: Props) => {
  const rootPath = `${__PATH_PREFIX__}/`

  const RootHeader = () => {
    const [isHovered, isHoveredSet] = useState(false)
    return (
      <RootTitle
        onMouseEnter={() => isHoveredSet(true)}
        onMouseLeave={() => isHoveredSet(false)}
      >
        <TitleLink
          to={`/`}
          css={css`
            @media (max-width: 420px) {
              justify-content: center;
            }

            svg {
              margin-right: 12px;
            }
          `}
        >
          <RM_Logo isHovered={isHovered} />
          <div
            css={css`
            @media (max-width: 420px) {
              display: none;
            }
          `}
          >

            {title}
          </div>
        </TitleLink>
      </RootTitle >
    )
  }


  const SecondaryHeader = () => (
    <SecondaryTitle>
      <TitleLink
        to={`/`}
      >
        {title}
      </TitleLink>
    </SecondaryTitle>
  )


  return (
    <div
      style={{
        marginLeft: `auto`,
        marginRight: `auto`,
        maxWidth: rhythm(24),
        padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
      }}
    >
      <header>{(location.pathname === rootPath) ? <RootHeader /> : <SecondaryHeader />}</header>
      <main>{children}</main>
      <footer>
        © {new Date().getFullYear()}, Authored with ❤️ by Riley
        {` `}
      </footer>
    </div>
  )
}

export default Layout