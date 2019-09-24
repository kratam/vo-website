import React from 'react'
import _ from 'lodash'
import { Grid } from '@material-ui/core'
import KBCard from './card'
import './cardList.css'

export default function CardList(props) {
  const { noCoverImg, pathname } = props
  let { categories } = props
  categories = _.sortBy(categories, o => o.node.data.order)
  return (
    <Grid container spacing={3} justify="space-around">
      {categories.map(({ node }) => (
        <Grid item xs key={node.uid} className="kb-card">
          <KBCard {...node} noCoverImg={noCoverImg} pathname={pathname} />
        </Grid>
      ))}
    </Grid>
  )
}
