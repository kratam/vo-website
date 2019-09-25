import React from 'react'
import { Link } from 'gatsby'
import { Breadcrumbs as MUIBreadCrumbs, Typography } from '@material-ui/core'
import times from 'lodash/times'
import useWindowSize from '../../utils/hooks/useWindowSize'

const Breadcrumbs = ({ kbPathArray, allCategories }) => {
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
      className="breadcrumbs"
    >
      <Link to="/" className="breadcrumbs-item">
        <Typography variant="caption">Főoldal</Typography>
      </Link>
      {kbPathArray.map((path, i) => (
        <Link key={path} to={getPath(i)} className="breadcrumbs-item">
          <Typography variant="caption">
            {allCategories.find(c => c.node.uid === path).node.data.name.text}
          </Typography>
        </Link>
      ))}
    </MUIBreadCrumbs>
  )
}

export default Breadcrumbs
