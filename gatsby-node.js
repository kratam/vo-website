const path = require('path')

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const blogPost = path.resolve('src/templates/blogpost.jsx')

  const prismicPosts = await graphql(
    `
      {
        allPrismicPost {
          edges {
            node {
              uid
            }
          }
        }
      }
    `,
  )

  prismicPosts.data.allPrismicPost.edges.forEach(({ node: post }) => {
    createPage({
      path: `blog/${post.uid}`,
      component: blogPost,
      context: {
        uid: post.uid,
      },
    })
  })
}
