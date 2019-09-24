import React from 'react'
import { Typography, Card } from '@material-ui/core'
import _ from 'lodash'

export default function BlogPostCard(props) {
  const title = _.get(props, 'post.data.title.html')
  return (
    <div>
      <Card>
        <Typography dangerouslySetInnerHTML={{ __html: title }} />
      </Card>
    </div>
  )
}
