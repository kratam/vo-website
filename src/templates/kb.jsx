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
import Comments from '../components/comments'
import Layout from '../layout/layout'

export default function KnowledgeBaseTemplate(props) {
  const category = get(props, 'data.category')
  const categories = get(props, 'data.subCategories.edges', [])
  const fullPath = `${get(props, 'data.site.siteMetadata.siteUrl')}kb/${get(
    props,
    'pageContext.mypath',
  )}`
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
            {category.data.body.raw && (
              <>
                <Article {...props} />
                <Comments
                  url={fullPath}
                  identifier={`kb/${props.pageContext.mypath}`}
                  title={category.data.name.text}
                />
              </>
            )}
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
        siteUrl
      }
    }
    category: prismicKbCategory(uid: { eq: $uid }) {
      ...kbArticleFragment
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
      ...subCategoriesFragment
    }
  }
`
