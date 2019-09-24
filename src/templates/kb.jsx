/* eslint-disable react/destructuring-assignment */
import React from 'react'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
import { Breadcrumbs, Paper, Typography, Container } from '@material-ui/core'
import _ from 'lodash'
import KBCards from '../components/KB/cardList'
import Search from '../components/KB/search'
import './kb.css'

const Breadc = ({ kbPathArray, allCategories }) => {
  const getPath = i => {
    let ret = '/kb'
    _.times(i + 1, n => {
      ret = `${ret}/${kbPathArray[n]}`
    })
    return ret
  }
  return (
    <Breadcrumbs aria-label="breadcrumb" className="breadcrumbs">
      <Link to="/" className="breadcrumbs-item">
        <Typography variant="caption">Főoldal</Typography>
      </Link>
      {kbPathArray.map((path, i) => (
        <Link key={path} to={getPath(i)} className="breadcrumbs-item">
          <Typography variant="caption">
            {allCategories.find(c => c.node.uid === path).node.data.name.text}
          </Typography>
        </Link>
      ))}
    </Breadcrumbs>
  )
}

export default function KnowledgeBaseTemplate(props) {
  const category = _.get(props, 'data.category.data')
  const categories = _.get(props, 'data.subCategories.edges', [])
  const noCoverImg = _.get(props, 'data.noCover.edges[0].node')
  const allCategories = _.get(props, 'data.allCategories.edges', [])
  const kbPathArray = _.get(props, 'pageContext.mypath').split('/')
  return (
    <div>
      <Helmet>
        <title>{category.name.text}</title>
      </Helmet>
      <Search />
      <Container maxWidth="md">
        <Breadc kbPathArray={kbPathArray} allCategories={allCategories} />
        {categories.length > 0 && (
          <div className="kb-cards-holder">
            <KBCards
              categories={categories}
              noCoverImg={noCoverImg}
              pathname={props.location.pathname}
            />
          </div>
        )}
        {category.body.html && (
          <Paper className="kb-body-paper">
            <Typography
              dangerouslySetInnerHTML={{ __html: category.body.html }}
              className="kb-body"
            />
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
      data {
        name {
          text
        }
        body {
          html
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
