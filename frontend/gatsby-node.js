/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

 exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === "build-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /bad-module/,
            use: loaders.null(),
          },
        ],
      },
    })
  }
}

// Create some pages relative to "Article"
// ==========================================================================
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(
    `
      {
        candidates: allStrapiCandidate {
          edges {
            node {
              strapiId
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  // Create blog articles pages.
  const candidates = result.data.candidates.edges
  candidates.forEach((candidate, index) => {
    createPage({
      path: `/candidate/${candidate.node.strapiId}`,
      component: require.resolve("./src/templates/candidate.js"),
      context: {
        id: candidate.node.strapiId,
      },
    })
  })
}
