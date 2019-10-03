import React from 'react'
// import { Disqus /*  CommentCount */ } from 'gatsby-plugin-disqus'
import { Paper, Container, Typography } from '@material-ui/core'

export default function Comments(props) {
  const { url: discourseEmbedUrl } = props
  window.DiscourseEmbed = {
    discourseUrl: 'https://forum.vendegkonyv.online/',
    discourseEmbedUrl,
  }
  const addDiscourse = () => {
    const d = document.createElement('script')
    d.type = 'text/javascript'
    d.async = true
    d.src = `${window.DiscourseEmbed.discourseUrl}javascripts/embed.js`
    ;(
      document.getElementsByTagName('head')[0] ||
      document.getElementsByTagName('body')[0]
    ).appendChild(d)
  }
  React.useEffect(() => addDiscourse(), [])

  return (
    <>
      <Paper>
        <Container maxWidth="md" style={{ paddingTop: 20, paddingBottom: 20 }}>
          <Typography variant="h4" gutterBottom>
            Hozzászólások
          </Typography>
          {/* <CommentCount config={props} placeholder="..." /> */}
          {/* <Disqus config={props} /> */}
          <div id="discourse-comments" />
        </Container>
      </Paper>
    </>
  )
}
