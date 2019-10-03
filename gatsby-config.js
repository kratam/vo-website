/* eslint-disable global-require */
require('dotenv').config({
  path: `.env`,
})
const urljoin = require('url-join')
const _ = require('lodash')
const config = require('./data/SiteConfig')
const queries = require('./src/utils/algolia')

module.exports = {
  pathPrefix: config.pathPrefix === '' ? '/' : config.pathPrefix,
  siteMetadata: {
    title: config.siteTitle,
    description: config.siteDescription,
    siteUrl: urljoin(config.siteUrl, config.pathPrefix),
  },
  plugins: [
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allPrismicKbCategory } }) => {
              return allPrismicKbCategory.edges.map(edge => {
                // add the full parent category document to the data property
                const withParent = node => {
                  if (_.get(node, 'data.parent_category')) {
                    // eslint-disable-next-line camelcase
                    const parent_category = withParent(
                      node.data.parent_category.document[0],
                    )
                    const newData = { ...node.data, parent_category }
                    return { ...node, data: newData }
                  }
                  return node
                }

                // construct a path for a single category using the resolved parents (using withParent)
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
                const node = withParent(edge.node)
                const path = constructPath(node, node.uid)
                return {
                  title: edge.node.data.name.text,
                  description: edge.node.data.description.text,
                  date: edge.node.first_publication_date,
                  // eslint-disable-next-line prefer-template
                  url: site.siteMetadata.siteUrl + 'kb/' + path,
                  guid: path,
                  custom_elements: [
                    { 'content:encoded': edge.node.data.body.html },
                  ],
                }
              })
            },
            query: `
            {
              allPrismicKbCategory {
                edges {
                  node {
                    uid
                    first_publication_date
                    data {
                      body {
                        html
                      }
                      name {
                        text
                      }
                      description {
                        text
                      }
                      parent_category {
                        document {
                          ... on PrismicKbCategory {
                            uid
                            data {
                              parent_category {
                                document {
                                  ... on PrismicKbCategory {
                                    uid
                                    data {
                                      parent_category {
                                        document {
                                          ... on PrismicKbCategory {
                                            uid
                                            data {
                                              parent_category {
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
                                              name {
                                                text
                                              }
                                            }
                                          }
                                        }
                                      }
                                      name {
                                        text
                                      }
                                    }
                                  }
                                }
                              }
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
            `,
            output: '/rss-forum.xml',
            title: 'Feed for forum.vendegkonyv.online',
          },
        ],
      },
    },
    // {
    //   resolve: `gatsby-plugin-disqus`,
    //   options: {
    //     shortname: `vendegkonyv-online-tudasbazis`,
    //   },
    // },
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `Open Sans`,
            variants: [`400`, `600`],
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-material-ui`,
      options: {
        disableAutoprefixing: false,
        disableMinification: true,
      },
    },
    {
      resolve: 'gatsby-source-prismic',
      options: {
        repositoryName: 'vo-kb',
        accessToken: process.env.PRISMIC_API_KEY,
        schemas: {
          post: require('./schemas/post.json'),
          kbCategory: require('./schemas/kb_category.json'),
        },
        lang: '*',
        shouldNormalizeImage: (/* { node, key, value } */) => {
          return true
        },
      },
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-lodash',
    {
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: process.env.GATSBY_ALGOLIA_APP_ID,
        apiKey: process.env.ALGOLIA_ADMIN_KEY,
        queries,
        chunkSize: 10000, // default: 1000
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'assets',
        path: `${__dirname}/static/`,
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 690,
            },
          },
          {
            resolve: 'gatsby-remark-responsive-iframe',
          },
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-autolink-headers',
          'gatsby-remark-prismjs',
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: config.googleAnalyticsID,
      },
    },
    {
      resolve: 'gatsby-plugin-nprogress',
      options: {
        color: config.themeColor,
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    // 'gatsby-plugin-catch-links',
    'gatsby-plugin-netlify-cache',
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl: `https://vendegkonyv.online`,
      },
    },
    'gatsby-plugin-netlify',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: config.siteTitle,
        short_name: config.siteTitleShort,
        description: config.siteDescription,
        start_url: config.pathPrefix,
        background_color: config.backgroundColor,
        theme_color: config.themeColor,
        display: 'minimal-ui',
        // icons: [
        //   {
        //     src: '/logos/logo-192x192.png',
        //     sizes: '192x192',
        //     type: 'image/png',
        //   },
        //   {
        //     src: '/logos/logo-512x512.png',
        //     sizes: '512x512',
        //     type: 'image/png',
        //   },
        // ],
      },
    },
    // 'gatsby-plugin-offline',
    'gatsby-plugin-remove-serviceworker',
  ],
}
