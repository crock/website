import * as React from "react"
import { Link, graphql } from 'gatsby'

import Layout from "../components/layout"
import Seo from "../components/seo"

import * as styles from '../styles/Post.module.css'

const BlogPostTemplate = ({ data }) => {
    const post = data.markdownRemark

  console.log({post})

  return (
    <Layout>
        <Seo title={post.frontmatter.title} description={post.excerpt} />
        <h2 className={styles.title}>{post.frontmatter.title}</h2>
        <div className={styles.meta}>
            <span>Word Count: {post.wordCount.words}</span>
            {` · `}
            <span>Reading Time: { post.timeToRead } minute(s)</span>
        </div>
        <div className={styles.excerpt} dangerouslySetInnerHTML={{__html: post.html}}></div>
    </Layout>
  )
}

export const query = graphql`
    query PostQuery($slug: String!) {
    markdownRemark(frontmatter: {slug: {eq: $slug}}) {
        excerpt(format: PLAIN)
        html
        timeToRead
        wordCount {
            words
        }
        frontmatter {
            categories
            date
            lastmod
            tags
            title
        }
    }
    }
`

export default BlogPostTemplate
