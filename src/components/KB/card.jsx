import React from 'react'
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from '@material-ui/core'
import { Link } from 'gatsby'
import './card.css'

export default function KBCard({ data, noCoverImg, uid, pathname }) {
  return (
    <Card className="kb-card-container">
      <Link to={`${pathname}/${uid}`}>
        <CardActionArea>
          <img
            className="card-cover"
            alt={data.name.text}
            src={data.cover.url || undefined}
            srcSet={data.cover.url ? undefined : noCoverImg.fluid.srcSet}
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              className="card-title"
            >
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
