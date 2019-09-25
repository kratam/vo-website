import React from 'react'
import { Typography, Card } from '@material-ui/core'
import get from 'lodash/get'

export default function BlogPostCard(props) {
  const title = get(props, 'post.data.title.html')
  return (
    <div>
      <Card>
        <Typography dangerouslySetInnerHTML={{ __html: title }} />
      </Card>
    </div>
  )
}
