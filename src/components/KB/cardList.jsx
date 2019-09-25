import React from 'react'
import sortBy from 'lodash/sortBy'
import { Grid } from '@material-ui/core'
import KBCard from './card'
import './cardList.css'

export default function CardList(props) {
  const { pathname } = props
  let { categories } = props
  categories = sortBy(categories, o => o.node.data.order)
  return (
    <Grid container spacing={5} justify="space-around">
      {categories.map(({ node }) => (
        <Grid item xs key={node.uid} className="kb-cardlist-griditem">
          <KBCard {...node} pathname={pathname} />
        </Grid>
      ))}
    </Grid>
  )
}
