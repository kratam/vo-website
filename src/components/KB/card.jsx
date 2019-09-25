import React from 'react'
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from '@material-ui/core'
import { Link, useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image/withIEPolyfill'
import get from 'lodash/get'
import './card.css'

export default function KBCard({ data, uid, pathname }) {
  const localData = useStaticQuery(graphql`
    query KBCardQuery {
      noCoverImg: file(relativePath: { eq: "no-cover.jpg" }) {
        childImageSharp {
          fixed(width: 300) {
            ...GatsbyImageSharpFixed_withWebp
          }
        }
      }
    }
  `)
  return (
    <Card className="kb-card-container">
      <Link to={`${pathname}/${uid}`}>
        <CardActionArea className="kb-card-actionarea">
          <Img
            fixed={
              get(data, 'cover.localFile.childImageSharp.fixed') ||
              get(localData, 'noCoverImg.childImageSharp.fixed')
            }
            objectFit="cover"
            objectPosition="50% 50%"
            style={{ height: 140 }}
          />
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
        </CardActionArea>
      </Link>
    </Card>
  )
}
