/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React from 'react'
import {
  Card,
  // CardActionArea,
  CardContent,
  Typography,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { Link, useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image/withIEPolyfill'
import get from 'lodash/get'

const useStyles = makeStyles(theme => ({
  container: {
    width: 270,
  },
  actionArea: {
    [theme.breakpoints.up('sm')]: {
      minHeight: props => (props.isRootCategory ? 250 : 120),
    },
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    lineHeight: '110%',
  },
  cover: {
    width: '110%',
    objectFit: 'cover',
    height: 140,
  },
}))

export default function KBCard({ data, uid, pathname }) {
  const [raised, setRaised] = React.useState(false)
  const localData = useStaticQuery(graphql`
    query KBCardQuery {
      noCoverImg: file(relativePath: { eq: "no-cover.jpg" }) {
        childImageSharp {
          fixed(width: 270) {
            ...GatsbyImageSharpFixed_withWebp
          }
        }
      }
    }
  `)
  const isRootCategory = get(data, 'parent_category') === null
  const classes = useStyles({ isRootCategory })
  // const hasImg = get(data, 'cover.localFile.childImageSharp.fixed', false)
  return (
    <Card
      raised={raised}
      classes={{ root: classes.container }}
      onMouseOver={() => setRaised(true)}
      onMouseOut={() => setRaised(false)}
    >
      <Link to={`${pathname}/${uid}`}>
        <div className={classes.actionArea}>
          {isRootCategory && (
            <Img
              fixed={
                get(data, 'cover.localFile.childImageSharp.fixed') ||
                get(localData, 'noCoverImg.childImageSharp.fixed')
              }
              objectFit="cover"
              objectPosition="50% 50%"
              style={{ height: 140, maxWidth: 270 }}
            />
          )}
          <CardContent>
            <Typography gutterBottom variant="h6" className={classes.title}>
              {data.name.text}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {data.description.text}
            </Typography>
          </CardContent>
        </div>
      </Link>
    </Card>
  )
}
