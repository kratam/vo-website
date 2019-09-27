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
import Background from '../components/background'
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
  const noCoverImg = get(props, 'data.noCoverImg')
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
      <Background>
        <Search />
      </Background>
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
            <Container maxWidth="sm" style={{ padding: 0 }}>
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
              <article className="kb-body">
                <header>
                  <Typography variant="h1" gutterBottom>
                    {category.data.name.text}
                  </Typography>
                  <Typography
                    variant="h6"
                    style={{
                      paddingBottom: 30,
                      lineHeight: '1.2em',
                      color: '#ababab',
                    }}
                  >
                    {category.data.description.text}
                  </Typography>
                </header>
                <div className="richtext">
                  <RichText
                    render={category.data.body.raw}
                    htmlSerializer={htmlSerializer}
                  />
                </div>
              </article>
            </Container>
          </Paper>
        )}
      </Container>
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
              localFile {
                childImageSharp {
                  fixed(width: 280) {
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
