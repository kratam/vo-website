/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/destructuring-assignment */
import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import { Paper, Container, Typography } from '@material-ui/core'
import get from 'lodash/get'
import { RichText } from 'prismic-reactjs'
import KBCards from '../components/KB/cardList'
import Search from '../components/KB/search'
import Breadcrumbs from '../components/KB/breadcrumbs'
import htmlSerializer from '../utils/htmlSerialize'
import './kb.css'

export default function KnowledgeBaseTemplate(props) {
  const category = get(props, 'data.category')
  const firstUpdate = new Date(
    category.first_publication_date,
  ).toLocaleDateString()
  const lastUpdate = new Date(
    category.last_publication_date,
  ).toLocaleDateString()
  const categories = get(props, 'data.subCategories.edges', [])
  const noCoverImg = get(props, 'data.noCover.edges[0].node')
  const allCategories = get(props, 'data.allCategories.edges', [])
  const kbPathArray = get(props, 'pageContext.mypath').split('/')
  return (
    <div>
      <Helmet>
        <title>{category.data.name.text}</title>
      </Helmet>
      <Search />
      <Container maxWidth="md">
        <Breadcrumbs kbPathArray={kbPathArray} allCategories={allCategories} />
        {categories.length > 0 && (
          <div className="kb-cards-holder">
            <KBCards
              categories={categories}
              noCoverImg={noCoverImg}
              pathname={props.location.pathname}
            />
          </div>
        )}
        {category.data.body.raw && (
          <Paper className="kb-body-paper">
            <Typography
              variant="caption"
              className="kb-body-lastupdate"
              component="div"
            >
              Készült: {firstUpdate}
              {lastUpdate !== firstUpdate && (
                <>
                  <br />
                  Frissült: {lastUpdate}
                </>
              )}
            </Typography>
            <div className="kb-body">
              <RichText
                render={category.data.body.raw}
                htmlSerializer={htmlSerializer}
              />
            </div>
          </Paper>
        )}
      </Container>
    </div>
  )
}

export const pageQuery = graphql`
  query KBCategoryByUid($uid: String) {
    noCover: allImageSharp(
      filter: { original: { src: { regex: "/static/no-cover/" } } }
    ) {
      edges {
        node {
          fluid {
            srcSet
          }
        }
      }
    }
    category: prismicKbCategory(uid: { eq: $uid }) {
      first_publication_date
      last_publication_date
      data {
        name {
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
              }
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
              url
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
