/* eslint-disable no-fallthrough */
import React from 'react'
import { Typography } from '@material-ui/core'
import { Link } from 'gatsby'

function propsWithUniqueKey(props, key) {
  return Object.assign(props || {}, { key })
}

const htmlSerialize = (type, element, content, children, index) => {
  switch (type) {
    case 'hyperlink': {
      if (
        element.data.url &&
        (element.data.url.includes('https:///kb/') ||
          element.data.url.includes('https://kb/') ||
          element.data.url.includes('https://_kb/') ||
          element.data.url.includes('https://vendegkonyv.online/kb/'))
      ) {
        return (
          <Link
            key={index}
            to={element.data.url
              .replace('https:///kb/', '/kb/')
              .replace('https://kb/', '/kb/')
              .replace('https://_kb/', '/kb/')
              .replace('https://vendegkonyv.online/kb/', '/kb/')}
          >
            {content}
          </Link>
        )
      }
    }
    case 'heading1': {
      return React.createElement(
        Typography,
        propsWithUniqueKey({ variant: 'h1', gutterBottom: true }, index),
        children,
      )
    }
    case 'heading2': {
      return React.createElement(
        Typography,
        propsWithUniqueKey({ variant: 'h2', gutterBottom: true }, index),
        children,
      )
    }
    case 'heading3': {
      return React.createElement(
        Typography,
        propsWithUniqueKey({ variant: 'h3', gutterBottom: true }, index),
        children,
      )
    }
    case 'heading4': {
      return React.createElement(
        Typography,
        propsWithUniqueKey({ variant: 'h4', gutterBottom: true }, index),
        children,
      )
    }
    case 'heading5': {
      return React.createElement(
        Typography,
        propsWithUniqueKey({ variant: 'h5', gutterBottom: true }, index),
        children,
      )
    }
    case 'heading6': {
      return React.createElement(
        Typography,
        propsWithUniqueKey({ variant: 'h6', gutterBottom: true }, index),
        children,
      )
    }
    case 'paragraph': {
      return React.createElement(
        Typography,
        propsWithUniqueKey({ variant: 'body1', gutterBottom: true }, index),
        children,
      )
    }
    default:
      return null
  }
}

export default htmlSerialize
