import React from 'react'
import sortBy from 'lodash/sortBy'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import KBCard from './card'

const useStyles = makeStyles(() => ({
  item: {
    maxWidth: 302,
  },
}))

export default function CardList(props) {
  const classes = useStyles()
  const { pathname } = props
  let { categories } = props
  categories = sortBy(categories, o => o.node.data.order)
  return (
    <Grid container spacing={4} justify="space-around">
      {categories.map(({ node }) => (
        <Grid item xs key={node.uid} classes={{ root: classes.item }}>
          <KBCard {...node} pathname={pathname} />
        </Grid>
      ))}
    </Grid>
  )
}
