/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react'
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

export default function Article(props) {
  const classes = useStyles()
  const category = get(props, 'data.category')
  const firstUpdate = new Date(
    category.first_publication_date,
  ).toLocaleDateString()
  const lastUpdate = new Date(
    category.last_publication_date,
  ).toLocaleDateString()

  console.log(category.data.body.raw)
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
          <article className={classes.body}>
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
