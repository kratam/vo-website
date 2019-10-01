/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/destructuring-assignment */
import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import { Container, Hidden } from '@material-ui/core'
import get from 'lodash/get'
import KBCards from '../components/KB/cardList'
import Article from '../components/KB/article'
import Search from '../components/KB/search'
import Breadcrumbs from '../components/KB/breadcrumbs'
import Background from '../components/background'
import Footer from '../components/footer'
import CategoryList from '../components/KB/list'
import Layout from '../layout/layout'

export default function KnowledgeBaseTemplate(props) {
  const category = get(props, 'data.category')
  const categories = get(props, 'data.subCategories.edges', [])
  const allCategories = get(props, 'data.allCategories.edges', [])
  const kbPathArray = get(props, 'pageContext.mypath').split('/')
  const seoPath = kbPathArray
    .map(
      path => allCategories.find(c => c.node.uid === path).node.data.name.text,
    )
    .join(' > ')

  return (
    <div>
      <Helmet>
        <title>
          {`${category.data.name.text} - ${props.data.site.siteMetadata.title}`}
        </title>
        <meta
          name="description"
          content={`${seoPath} > ${category.data.description.text ||
            category.data.name.text}`}
        />
      </Helmet>
      <Layout
        header={
          <Background>
            <Container maxWidth="md">
              <Search />
            </Container>
          </Background>
        }
        main={
          <Container maxWidth="md">
            <Breadcrumbs
              kbPathArray={kbPathArray}
              allCategories={allCategories}
            />
            {categories.length > 0 && (
              <>
                <Hidden xsDown implementation="css">
                  <KBCards
                    categories={categories}
                    pathname={props.location.pathname}
                  />
                </Hidden>
                <Hidden smUp implementation="css">
                  <CategoryList
                    categories={categories}
                    pathname={props.location.pathname}
                  />
                </Hidden>
              </>
            )}
            {category.data.body.raw && <Article {...props} />}
          </Container>
        }
        footer={<Footer />}
      />
    </div>
  )
}

export const pageQuery = graphql`
  query KBCategoryByUid($uid: String) {
    site {
      siteMetadata {
        title
      }
    }
    category: prismicKbCategory(uid: { eq: $uid }) {
      first_publication_date
      last_publication_date
      data {
        name {
          text
        }
        description {
          text
        }
        body {
          raw {
            type
            text
            spans {
              start
              end
              type
              data {
                link_type
                url
                target
                label
              }
            }
            oembed {
              type
              embed_url
              title
              provider_name
              thumbnail_url
              author_url
              version
              provider_url
              thumbnail_height
              thumbnail_width
              width
              height
              html
              author_name
            }
            url
            dimensions {
              width
              height
            }
          }
        }
      }
    }
    allCategories: allPrismicKbCategory {
      edges {
        node {
          uid
          data {
            name {
              text
            }
          }
        }
      }
    }
    subCategories: allPrismicKbCategory(
      filter: { data: { parent_category: { uid: { eq: $uid } } } }
    ) {
      edges {
        node {
          uid
          data {
            order
            cover {
              localFile {
                childImageSharp {
                  fixed(width: 270) {
                    ...GatsbyImageSharpFixed
                  }
                }
              }
            }
            name {
              text
            }
            description {
              text
            }
          }
        }
      }
    }
  }
`
