require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  pathPrefix: `/frontend`,
  assetPrefix: `http://localhost:1337`,
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
  },
  plugins: [
    `node-sass`,
    `gatsby-plugin-sass`,
    `underscore`,
    `typography`,
    `three`,
    {
      resolve: `gatsby-source-strapi`,
      options: {
        apiURL: process.env.GATSBY_API_URL || `http://localhost:1337`,
        contentTypes: [`candidate`],
        excludedTypes: [`user`],
        singleTypes: [`settings`, `homepage`, `menu`],
        preprocessNodes: (allEntities) => undefined, // default to null
        queryLimit: 1000, // Default to 100
        loginData: {
          identifier: "samuel@atelierharfang.ch",
          password: "Kenobi1313",
        },
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-yaml`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/data`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/images/`,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
