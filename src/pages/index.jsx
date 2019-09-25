/* eslint-disable react/destructuring-assignment */
import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import { Container } from '@material-ui/core'
import KBCards from '../components/KB/cardList'
import Search from '../components/KB/search'
import Background from '../components/background'
import './index.css'

export default function BlogPost(props) {
  const categories = get(props, 'data.allPrismicKbCategory.edges')
  return (
    <div>
      <Helmet>
        <title>{props.data.site.siteMetadata.title}</title>
      </Helmet>
      <Background>
        <Container maxWidth="md">
          <div className="index-search-container">
            <Search />
          </div>
        </Container>
      </Background>
      <Container maxWidth="md">
        <div className="kb-card-holder">
          <KBCards categories={categories} pathname="/kb" />
        </div>
      </Container>
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
