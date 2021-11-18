module.exports = {
  siteMetadata: {
    title: `Crocker Bytes`,
    description: `Somewhere beyond the realms of the internet, probably at a indie coffee shop drinking an iced mocha latte while coding random shit.`,
    author: `@gatorverse`,
    siteUrl: `https://crockerbytes.com/`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/content`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-source-rss-feed`,
      options: {
        url: `https://world.hey.com/croc/feed.atom`,
        name: `HeyWorld`,
        // Optional
        // Read parser document: https://github.com/bobby-brennan/rss-parser#readme
        parserOption: {
          customFields: {
            item: []
          }
        }
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
  ],
}
