import React from "react"
import style from "@emotion/styled"
import { Link } from "gatsby"
import { GLOBAL_COLORS } from "../utils/colors"
import { rhythm, scale } from "../utils/typography"

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
  }
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

const Layout = ({ location, title, children }: Props) => {
  const rootPath = `${__PATH_PREFIX__}/`

  const RootHeader = () => (
    <RootTitle>
      <TitleLink
        to={`/`}
      >
        {title}
      </TitleLink>
    </RootTitle>
  )

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