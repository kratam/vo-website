import React from 'react'
import { Link } from 'gatsby'
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
    color: theme.palette.grey[100],
  },
}))

export default function Footer() {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Container maxWidth="md">
        <Grid container classes={{ root: classes.gridContainer }}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" classes={{ root: classes.title }}>
              Rólunk
            </Typography>
            <Typography variant="body1" classes={{ root: classes.item }}>
              <Link to="/about">Kik vagyunk, mi ez és miért csináljuk?</Link>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" classes={{ root: classes.title }}>
              Online Vendégkönyv
            </Typography>
            <Typography variant="body1" classes={{ root: classes.item }}>
              <Link to="/onve">
                NTAK kompatibilis szálláshelykezelő szoftver
                <br />
                próbáld ki az ingyenes 1 hónapot!
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}
