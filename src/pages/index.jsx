import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import { Container } from '@material-ui/core'
import KBCards from '../components/KB/cardList'
import Search from '../components/KB/search'
import './index.css'

export default function BlogPost(props) {
  const categories = get(props, 'data.allPrismicKbCategory.edges')
  const noCoverImg = get(props, 'data.allImageSharp.edges[0].node')
  return (
    <div>
      <Helmet>
        <title>Online Vendégkönyv!</title>
      </Helmet>
      <Container maxWidth="md">
        <div className="index-search-container">
          <Search />
        </div>
        <div className="kb-card-holder">
          <KBCards
            categories={categories}
            noCoverImg={noCoverImg}
            pathname="/kb"
          />
        </div>
      </Container>
    </div>
  )
}

export const pageQuery = graphql`
  query IndexPage {
    allImageSharp(
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
    allPrismicKbCategory(
      filter: { data: { parent_category: { uid: { eq: null } } } }
    ) {
      edges {
        node {
          uid
          data {
            order
            icon
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
