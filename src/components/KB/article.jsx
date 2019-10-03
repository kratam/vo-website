/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react'
import { graphql } from 'gatsby'
import { Paper, Container, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import get from 'lodash/get'
import { RichText } from 'prismic-reactjs'
import htmlSerializer from '../../utils/htmlSerialize'

const useStyles = makeStyles(theme => ({
  paperContainer: {
    paddingTop: 32,
  },
  paper: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
    marginBottom: 20,
    [theme.breakpoints.down('sm')]: {
      paddingBottom: 20,
    },
  },
  title: {
    marginTop: 20,
    marginBottom: 4,
  },
  lastUpdate: {
    paddingTop: 8,
    marginRight: -12,
    textAlign: 'right',
    lineHeight: '110%',
    color: theme.palette.grey[500],
  },
  [theme.breakpoints.up('md')]: {
    marginTop: 12,
  },
}))

function parseDate(date) {
  const parsed = Date.parse(date)
  if (!Number.isNaN(parsed)) {
    return parsed
  }

  return Date.parse(date.replace(/-/g, '/').replace(/[a-z]+/gi, ' '))
}

function formatDate(date) {
  return `${date.getFullYear()}.${`0${date.getMonth()}`.slice(
    -2,
  )}.${`0${date.getDate()}`.slice(-2)}.`
}

export default function Article(props) {
  const classes = useStyles()
  const category = get(props, 'data.category')
  const firstUpdate = formatDate(
    new Date(parseDate(category.first_publication_date)),
  )
  const lastUpdate = formatDate(
    new Date(parseDate(category.last_publication_date)),
  )

  return (
    <div className={classes.paperContainer}>
      <Paper classes={{ root: classes.paper }}>
        <Typography
          variant="caption"
          classes={{ root: classes.lastUpdate }}
          component="div"
        >
          Készült: {firstUpdate}
          {lastUpdate !== firstUpdate && (
            <>
              <br />
              Frissült: {lastUpdate}
            </>
          )}
        </Typography>
        <Container maxWidth="sm" style={{ padding: 0 }}>
          <article className={`${classes.body} kb-article`}>
            <header style={{ marginBottom: 30 }}>
              <Typography
                variant="h1"
                gutterBottom
                classes={{ root: classes.title }}
              >
                {category.data.name.text}
              </Typography>
              {category.data.description.text && (
                <Typography
                  variant="h6"
                  style={{
                    lineHeight: '1.2em',
                    color: '#ababab',
                  }}
                >
                  {category.data.description.text}
                </Typography>
              )}
            </header>
            <div className="richtext">
              <RichText
                render={category.data.body.raw}
                htmlSerializer={htmlSerializer}
              />
            </div>
          </article>
        </Container>
      </Paper>
    </div>
  )
}

export const articleFragment = graphql`
  fragment kbArticleFragment on PrismicKbCategory {
    first_publication_date
    last_publication_date
    data {
      name {
        text
      }
      description {
        text
      }
      body {
        raw {
          type
          text
          spans {
            start
            end
            type
            data {
              link_type
              url
              target
              label
            }
          }
          oembed {
            type
            embed_url
            title
            provider_name
            thumbnail_url
            author_url
            version
            provider_url
            thumbnail_height
            thumbnail_width
            width
            height
            html
            author_name
          }
          url
          dimensions {
            width
            height
          }
        }
      }
    }
  }
`
