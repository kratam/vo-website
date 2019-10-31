import React from 'react'
import { Link } from 'gatsby'
import { Breadcrumbs as MUIBreadCrumbs, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import times from 'lodash/times'

const useStyles = makeStyles(() => ({
  root: {
    fontSize: 14,
    marginTop: 6,
    marginBottom: 6,
  },
  link: {
    padding: 4,
  },
  separator: {
    marginLeft: 0,
    marginRight: 0,
  },
}))

const Breadcrumbs = ({ kbPathArray, allCategories }) => {
  const classes = useStyles()
  const getPath = i => {
    let ret = '/kb'
    times(i + 1, n => {
      ret = `${ret}/${kbPathArray[n]}`
    })
    return ret
  }
  return (
    <MUIBreadCrumbs
      aria-label="breadcrumb"
      classes={{ root: classes.root, separator: classes.separator }}
      component="div"
    >
      <Typography variant="caption" component="div">
        <Link to="/" className={classes.link}>
          Főoldal
        </Link>
      </Typography>
      {kbPathArray.map((path, i) => (
        <Typography key={path} variant="caption" component="div">
          <Link to={getPath(i)} className={classes.link}>
            {allCategories.find(c => c.node.uid === path).node.data.name.text}
          </Link>
        </Typography>
      ))}
    </MUIBreadCrumbs>
  )
}

export default Breadcrumbs
