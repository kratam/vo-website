import React from 'react'
import { Link } from 'gatsby'
import { Breadcrumbs as MUIBreadCrumbs, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import times from 'lodash/times'
import useWindowSize from '../../utils/hooks/useWindowSize'

const useStyles = makeStyles(() => ({
  root: {
    fontSize: 14,
    marginTop: 6,
    marginBottom: 6,
  },
}))

const Breadcrumbs = ({ kbPathArray, allCategories }) => {
  const classes = useStyles()
  const size = useWindowSize()
  const getPath = i => {
    let ret = '/kb'
    times(i + 1, n => {
      ret = `${ret}/${kbPathArray[n]}`
    })
    return ret
  }
  return (
    <MUIBreadCrumbs
      maxItems={size.width < 400 ? 3 : undefined}
      aria-label="breadcrumb"
      className={classes.root}
      component="div"
    >
      <Link to="/">
        <Typography variant="caption">Főoldal</Typography>
      </Link>
      {kbPathArray.map((path, i) => (
        <Link key={path} to={getPath(i)}>
          <Typography variant="caption">
            {allCategories.find(c => c.node.uid === path).node.data.name.text}
          </Typography>
        </Link>
      ))}
    </MUIBreadCrumbs>
  )
}

export default Breadcrumbs
