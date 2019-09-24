const _ = require('lodash')
const path = require('path')

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const kbCategories = await graphql(
    `
      fragment Parents on PrismicKbCategory {
        data {
          parent_category {
            ... on PrismicKbCategoryDataParent_category {
              document {
                ... on PrismicKbCategory {
                  uid
                  data {
                    name {
                      text
                    }
                  }
                  ... on PrismicKbCategory {
                    data {
                      parent_category {
                        ... on PrismicKbCategoryDataParent_category {
                          document {
                            ... on PrismicKbCategory {
                              uid
                              ... on PrismicKbCategory {
                                data {
                                  parent_category {
                                    ... on PrismicKbCategoryDataParent_category {
                                      document {
                                        ... on PrismicKbCategory {
                                          uid
                                          data {
                                            name {
                                              text
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                              data {
                                name {
                                  text
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      query {
        allPrismicKbCategory {
          edges {
            node {
              uid
              data {
                name {
                  text
                }
              }
              ...Parents
            }
          }
        }
      }
    `,
  )

  const kbCategory = path.resolve('src/templates/kb.jsx')

  const withParent = node => {
    if (_.get(node, 'data.parent_category')) {
      // eslint-disable-next-line camelcase
      const parent_category = withParent(node.data.parent_category.document[0])
      const newData = { ...node.data, parent_category }
      return { ...node, data: newData }
    }
    return node
  }

  const constructPath = (node, _path) => {
    if (_.get(node, 'data.parent_category')) {
      // eslint-disable-next-line no-param-reassign
      _path = constructPath(
        node.data.parent_category,
        `${node.data.parent_category.uid}/${_path}`,
      )
    }
    return _path
  }

  kbCategories.data.allPrismicKbCategory.edges.forEach(edge => {
    const node = withParent(edge.node)
    const mypath = constructPath(node, node.uid)
    createPage({
      path: `kb/${mypath}`,
      component: kbCategory,
      context: {
        uid: edge.node.uid,
        node,
        mypath,
      },
    })
  })

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
