import React from 'react'
import {
  Card,
  // CardActionArea,
  CardContent,
  Typography,
} from '@material-ui/core'
import { Link, useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image/withIEPolyfill'
import get from 'lodash/get'
import './card.css'

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
  // const hasImg = get(data, 'cover.localFile.childImageSharp.fixed', false)
  return (
    // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
    <Card
      className="kb-card-container"
      raised={raised}
      onMouseOver={() => setRaised(true)}
      onMouseOut={() => setRaised(false)}
    >
      <Link to={`${pathname}/${uid}`}>
        <div
          className={`kb-card-actionarea ${isRootCategory ? '' : 'shorter'}`}
        >
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
            <Typography gutterBottom variant="h6" className="card-title">
              {data.name.text}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              className="card-description"
            >
              {data.description.text}
            </Typography>
          </CardContent>
        </div>
      </Link>
    </Card>
  )
}
