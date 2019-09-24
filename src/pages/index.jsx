import React from 'react'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
import _ from 'lodash'
import { Card } from '@material-ui/core'
import BlogPostCard from '../components/blogpost'

export default function BlogPost(props) {
  const posts = _.get(props, 'data.allPrismicPost.edges')
  const categories = _.get(props, 'data.allPrismicKbCategory.edges')
  return (
    <div>
      <Helmet>
        <title>Online Vendégkönyv!</title>
      </Helmet>
      {posts.map(({ node: post }) => (
        <Link key={post.uid} to={`/blog/${post.uid}`}>
          <BlogPostCard post={post} />
        </Link>
      ))}
      {categories.map(({ node: category }) => (
        <Card key={category.uid}>{category.data.name.text}</Card>
      ))}
    </div>
  )
}

export const pageQuery = graphql`
  query IndexPage {
    allPrismicPost(limit: 10) {
      edges {
        node {
          uid
          data {
            title {
              html
            }
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
            parent_category {
              uid
            }
            name {
              text
            }
          }
        }
      }
    }
  }
`
