/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/destructuring-assignment */
import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import { Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import KBCards from '../components/KB/cardList'
import Search from '../components/KB/search'
import Background from '../components/background'
import Footer from '../components/footer'
import Layout from '../layout/layout'

const useStyles = makeStyles(theme => ({
  searchContainer: {
    paddingTop: 80,
    paddingBottom: 80,
    [theme.breakpoints.down(700)]: {
      paddingTop: 40,
      paddingBottom: 40,
    },
    [theme.breakpoints.down(400)]: {
      paddingTop: 0,
      paddingBottom: 30,
    },
  },
  cardHolder: {
    paddingTop: 30,
  },
}))

export default function BlogPost(props) {
  const classes = useStyles()
  const categories = get(props, 'data.allPrismicKbCategory.edges')
  return (
    <div>
      <Helmet>
        <title>{props.data.site.siteMetadata.title}</title>
      </Helmet>
      <Layout
        header={
          <Background>
            <Container maxWidth="md">
              <div className={classes.searchContainer}>
                <Search />
              </div>
            </Container>
          </Background>
        }
        main={
          <Container maxWidth="md">
            <div className={classes.cardHolder}>
              <KBCards categories={categories} pathname="/kb" />
            </div>
          </Container>
        }
        footer={<Footer />}
      />
    </div>
  )
}
export const pageQuery = graphql`
  query IndexPage {
    site {
      siteMetadata {
        title
      }
    }
    allPrismicKbCategory(
      filter: { data: { parent_category: { uid: { eq: null } } } }
    ) {
      edges {
        node {
          uid
          data {
            parent_category {
              uid
            }
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
