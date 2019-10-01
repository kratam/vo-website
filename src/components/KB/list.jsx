/* eslint-disable react/jsx-wrap-multilines */
import React from 'react'
import sortBy from 'lodash/sortBy'
import {
  Paper,
  List,
  ListSubheader,
  ListItem,
  ListItemText,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { Link } from 'gatsby'

const useStyles = makeStyles(theme => ({
  paper: {
    marginBottom: 20,
  },
  list: {
    backgroundColor: theme.palette.background.paper,
  },
  itemText: {
    fontWeight: 600,
    fontSize: 18,
    color: theme.palette.grey[700],
  },
  subheader: {
    fontWeight: 700,
  },
}))

export default function CategoryList(props) {
  const classes = useStyles()
  const { categories: unsortedCategories, pathname } = props
  const categories = sortBy(unsortedCategories, o => o.node.data.order)
  return (
    <Paper classes={{ root: classes.paper }}>
      <List
        classes={{ root: classes.list }}
        disablePadding
        subheader={
          <ListSubheader component="div" classes={{ root: classes.subheader }}>
            Altémák
          </ListSubheader>
        }
      >
        {categories.map(({ node }) => (
          <Link to={`${pathname}/${node.uid}/`} key={node.uid}>
            <ListItem button>
              <ListItemText
                primaryTypographyProps={{ className: classes.itemText }}
                primary={node.data.name.text}
                secondary={node.data.description.text}
              />
            </ListItem>
          </Link>
        ))}
      </List>
    </Paper>
  )
}
