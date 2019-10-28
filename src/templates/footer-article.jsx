/* eslint-disable react/jsx-wrap-multilines */
import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import { Container, Paper, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import Background from '../components/background'
import Search from '../components/KB/search'
import Layout from '../layout/layout'
import Footer from '../components/footer'

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(4),
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  article: {
    '& a': {
      color: '#1976d2',
    },
  },
}))

export default function FooterArticle({ data }) {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark
  const classes = useStyles()
  return (
    <div>
      <Helmet>
        <title>{frontmatter.title}</title>
      </Helmet>
      <Layout
        header={
          <Background>
            <Container maxWidth="md">
              <Search />
            </Container>
          </Background>
        }
        main={
          <Container maxWidth="md">
            <Paper classes={{ root: classes.paper }}>
              <Container maxWidth="sm">
                <div>
                  <Typography variant="h1">{frontmatter.title}</Typography>
                  <div
                    className={classes.article}
                    dangerouslySetInnerHTML={{ __html: html }}
                  />
                </div>
              </Container>
            </Paper>
          </Container>
        }
        footer={<Footer />}
      />
    </div>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        title
      }
    }
  }
`
