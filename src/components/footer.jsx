import React from 'react'
import { Container, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.grey[400],
    minHeight: 200,
    marginTop: theme.spacing(4),
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  gridContainer: {
    [theme.breakpoints.down('xs')]: {
      paddingLeft: theme.spacing(4),
    },
  },
  title: {
    color: 'white',
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(2),
  },
  item: {
    color: theme.palette.grey[200],
  },
}))

export default function Footer() {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Container maxWidth="md">
        <Grid container classes={{ root: classes.gridContainer }}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" classes={{ root: classes.title }}>
              Rólunk
            </Typography>
            <Typography variant="body1" classes={{ root: classes.item }}>
              Kik vagyunk?
            </Typography>
            <Typography variant="body1" classes={{ root: classes.item }}>
              Miért csináljuk ezt az oldalt?
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" classes={{ root: classes.title }}>
              A tudásbázisról
            </Typography>
            <Typography variant="body1" classes={{ root: classes.item }}>
              Kik vagyunk?
            </Typography>
            <Typography variant="body1" classes={{ root: classes.item }}>
              Miért csináljuk ezt az oldalt?
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" classes={{ root: classes.title }}>
              Az alkalmazásról
            </Typography>
            <Typography variant="body1" classes={{ root: classes.item }}>
              Kik vagyunk?
            </Typography>
            <Typography variant="body1" classes={{ root: classes.item }}>
              Miért csináljuk ezt az oldalt?
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}
