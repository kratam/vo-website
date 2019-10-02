import React from 'react'
// import { Disqus /*  CommentCount */ } from 'gatsby-plugin-disqus'
import { Paper, Container, Typography } from '@material-ui/core'

export default function Comments() {
  return (
    <>
      <Paper>
        <Container maxWidth="md" style={{ paddingTop: 20, paddingBottom: 20 }}>
          <Typography variant="h4" gutterBottom>
            Hozzászólások
          </Typography>
          {/* <CommentCount config={props} placeholder="..." /> */}
          {/* <Disqus config={props} /> */}
          <div id="commento" />
        </Container>
      </Paper>
    </>
  )
}
