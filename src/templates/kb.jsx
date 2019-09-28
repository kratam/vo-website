/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/destructuring-assignment */
import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import { Paper, Container, Typography } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import get from 'lodash/get'
import { RichText } from 'prismic-reactjs'
import KBCards from '../components/KB/cardList'
import Search from '../components/KB/search'
import Breadcrumbs from '../components/KB/breadcrumbs'
import Background from '../components/background'
import CategoryList from '../components/KB/list'
import htmlSerializer from '../utils/htmlSerialize'

const useStyles = makeStyles(theme => ({
  paperContainer: {
    paddingTop: 32,
  },
  paper: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
    marginBottom: 20,
    [theme.breakpoints.down('sm')]: {
      paddingBottom: 20,
    },
  },
  title: {
    marginTop: 20,
    marginBottom: 4,
  },
  lastUpdate: {
    paddingTop: 8,
    marginRight: -12,
    textAlign: 'right',
    lineHeight: '110%',
  },
  [theme.breakpoints.up('md')]: {
    marginTop: 12,
  },
  body: {},
}))

export default function KnowledgeBaseTemplate(props) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'))
  const classes = useStyles()
  const category = get(props, 'data.category')
  const firstUpdate = new Date(
    category.first_publication_date,
  ).toLocaleDateString()
  const lastUpdate = new Date(
    category.last_publication_date,
  ).toLocaleDateString()
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
      <Background>
        <Container maxWidth="md">
          <Search />
        </Container>
      </Background>
      <Container maxWidth="md">
        <Breadcrumbs kbPathArray={kbPathArray} allCategories={allCategories} />
        {categories.length > 0 && isMobile ? (
          <CategoryList
            categories={categories}
            pathname={props.location.pathname}
          />
        ) : (
          <KBCards categories={categories} pathname={props.location.pathname} />
        )}
        {category.data.body.raw && (
          <div className={classes.paperContainer}>
            <Paper classes={{ root: classes.paper }}>
              <Typography
                variant="caption"
                classes={{ root: classes.lastUpdate }}
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
              <Container maxWidth="sm" style={{ padding: 0 }}>
                <article className={classes.body}>
                  <header style={{ marginBottom: 30 }}>
                    <Typography
                      variant="h1"
                      gutterBottom
                      classes={{ root: classes.title }}
                    >
                      {category.data.name.text}
                    </Typography>
                    {category.data.description.text && (
                      <Typography
                        variant="h6"
                        style={{
                          lineHeight: '1.2em',
                          color: '#ababab',
                        }}
                      >
                        {category.data.description.text}
                      </Typography>
                    )}
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
          </div>
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
