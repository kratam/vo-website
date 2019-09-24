const _ = require('lodash')

const categoriesQuery = `{
  categories: allPrismicKbCategory {
    edges {
      node {
        ...on PrismicKbCategory {
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
        uid
        data {
          name { text }
          description { text }
          body { text }
        }
      }
    }
  }
}`

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

const flatten = arr => {
  return arr
    .map(edge => ({ node: withParent(edge.node) }))
    .map(edge => ({ ...edge, slug: constructPath(edge.node, edge.node.uid) }))
    .map(({ slug, node: { data: { name, description, body } } }) => ({
      name: name.text,
      description: description.text,
      body: body.text,
      slug,
      objectID: slug,
    }))
}

const settings = { attributesToSnippet: [`description:20`] }

const queries = [
  {
    query: categoriesQuery,
    transformer: ({ data }) => flatten(data.categories.edges),
    indexName: `knowledgebase`,
    settings,
  },
]
module.exports = queries
