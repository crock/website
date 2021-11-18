import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

import * as styles from '../styles/Home.module.css'

const IndexPage = ({ data }) => {
  const mdPosts = data.allMarkdownRemark.edges.map(edge => edge.node)
  const heyPosts = data.allFeedHeyWorld.edges.map(edge => edge.node)

  const posts = mdPosts.concat(heyPosts).map(post => {
    const words = post.excerpt.split(/\s+/g)
    const readingTimeInMinutes = Math.floor(words.length / 228) + 1;
    const trimmedExcerpt = words.length > 30 ? `${words.slice(0, 30).join(' ')}...` : post.excerpt

    if (post.frontmatter) {
      return { ...post, ...post.frontmatter, excerpt: trimmedExcerpt }
    } else {
      return { ...post, categories: ['Hey World'], tags: [], wordCount: { words: words.length }, excerpt: trimmedExcerpt, timeToRead: readingTimeInMinutes }
    }
  })
  console.log({posts})

  const PostCard = ({post}) => (
    <article key={post.id}>
        <strong className={styles.title}>{post.title}</strong>
        <div className={styles.meta}>
          <span>Word Count: {post.wordCount.words}</span>
          {` · `}
          <span>Reading Time: { post.timeToRead } minute(s)</span>
        </div>
        <p className={styles.excerpt}>{post.excerpt}</p>
    </article>
  ) 

  return (
    <Layout>
      <Seo title="Home" />
      <h2>From The Blog</h2>
      { posts.length ? posts.map(post => (
        post.link ? <a key={post.id} target="_blank" rel="noreferrer" className={styles.card} href={post.link}><PostCard post={post} /></a> : <Link key={post.id} className={styles.card} to={`/blog/${post.slug}`}><PostCard post={post} /></Link>
      )) : null }
    </Layout>
  )
}

export const query = graphql`
  query BlogPostsQuery {
  allFeedHeyWorld(sort: {fields: pubDate, order: DESC}) {
    edges {
      node {
        id
        excerpt: contentSnippet
        html: content
        date: pubDate
        title
        link
      }
    }
  }
  allMarkdownRemark(
    filter: {frontmatter: {draft: {eq: false}}}
    sort: {fields: frontmatter___date, order: DESC}
  ) {
    edges {
      node {
        id
        frontmatter {
          categories
          date
          lastmod
          tags
          title
          slug
        }
        html
        timeToRead
        wordCount {
          words
        }
        excerpt(format: PLAIN)
      }
    }
  }
}


`

export default IndexPage
