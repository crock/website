const path = require(`path`)
// Log out information after a build is done
exports.onPostBuild = ({ reporter }) => {
  reporter.info(`Your Gatsby site has been built!`)
}
// Create blog pages dynamically
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const blogPostTemplate = path.resolve(`src/templates/blog-post.js`)
  const pageTemplate = path.resolve(`src/templates/page.js`)
  const result = await graphql(`
  query BlogPostsQuery {
    allMarkdownRemark(filter: {frontmatter: {draft: {eq: false}, isBlogPost: {eq: true}}}) {
      edges {
        node {
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
            slug
          }
        }
      }
    }

    mdPages: allMarkdownRemark(filter: {frontmatter: {isBlogPost: {eq: false}}}) {
      edges {
        node {
          id
          frontmatter {
            slug
            title
          }
        }
      }
    }
  }
  `)

  if (!result.data) {
    reporter.error('Could not fetch markdown posts.')
  }

  const posts = result.data.allMarkdownRemark.edges.map(edge => edge.node)
  posts.forEach(post => {
    createPage({
      path: `/blog/${post.frontmatter.slug}`,
      component: blogPostTemplate,
      context: {
        slug: post.frontmatter.slug,
      },
    })
  })

  const pages = result.data.mdPages.edges.map(edge => edge.node)
  pages.forEach(page => {
    createPage({
      path: page.frontmatter.slug,
      component: pageTemplate,
      context: {
        slug: page.frontmatter.slug,
      },
    })
  })
}