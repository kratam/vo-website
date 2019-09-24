import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import { Typography, Card } from '@material-ui/core'
import _ from 'lodash'

export default function BlogPost(props) {
  const post = _.get(props, 'data.prismicPost.data')
  return (
    <div>
      <Helmet>
        <title>{post.title.text}</title>
      </Helmet>
      <Card>
        <Typography dangerouslySetInnerHTML={{ __html: post.body.html }} />
      </Card>
    </div>
  )
}

export const pageQuery = graphql`
  query PostByUid($uid: String) {
    prismicPost(uid: { eq: $uid }) {
      uid
      data {
        title {
          text
        }
        body {
          html
        }
      }
    }
  }
`
