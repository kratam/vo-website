import React from 'react'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  main: {
    flexGrow: 1,
  },
}))

export default function Layout({ header, main, footer }) {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      {header}
      <div className={classes.main}>{main}</div>
      {footer}
    </div>
  )
}
