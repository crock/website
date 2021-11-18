import * as React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import '../styles/Header.module.css'

const Header = ({ siteTitle, description }) => {

  return (
    <header>
      <StaticImage
        src="../images/pfp.png"
        width={150}
        height={150}
        quality={95}
        formats={["auto", "webp", "avif"]}
        layout={`fixed`}
        alt="A smiling crocodile wearing Mickey Mouse ears and waving a Disney flag."
        style={{ margin: `0 auto 1.45rem`, display: `block` }}
      />

      <div style={{display: `flex`, flexDirection: `column`, justifyContent: `center`, alignItems: `center`, width: `75%`, margin: `0 auto`}}>
        <h1>Welcome to {siteTitle}!</h1>
        <p>{description}</p>
      </div>

      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/tools">Tools</Link>
        <Link to="/uses">Uses</Link>
        <Link to="/archive">Archive</Link>
      </nav>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
