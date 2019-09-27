/* eslint-disable no-fallthrough */
import React from 'react'
// import { Typography } from '@material-ui/core'
import { Link } from 'gatsby'

// function propsWithUniqueKey(props, key) {
//   return Object.assign(props || {}, { key })
// }

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
      // default external link

      return (
        <a
          href={element.data.url}
          target={element.data.target || '_blank'}
          rel="noopener"
          key={index}
        >
          {content}
        </a>
      )
    }
    // case 'heading1': {
    //   return React.createElement(
    //     Typography,
    //     propsWithUniqueKey(
    //       { variant: 'h1', gutterBottom: true, className: 'richtext h h1' },
    //       index,
    //     ),
    //     children,
    //   )
    // }
    // case 'heading2': {
    //   return React.createElement(
    //     Typography,
    //     propsWithUniqueKey(
    //       { variant: 'h2', gutterBottom: true, className: 'richtext h h2' },
    //       index,
    //     ),
    //     children,
    //   )
    // }
    // case 'heading3': {
    //   return React.createElement(
    //     Typography,
    //     propsWithUniqueKey(
    //       { variant: 'h3', gutterBottom: true, className: 'richtext h h3' },
    //       index,
    //     ),
    //     children,
    //   )
    // }
    // case 'heading4': {
    //   return React.createElement(
    //     Typography,
    //     propsWithUniqueKey(
    //       { variant: 'h4', gutterBottom: true, className: 'richtext h h4' },
    //       index,
    //     ),
    //     children,
    //   )
    // }
    // case 'heading5': {
    //   return React.createElement(
    //     Typography,
    //     propsWithUniqueKey(
    //       { variant: 'h5', gutterBottom: true, className: 'richtext h h5' },
    //       index,
    //     ),
    //     children,
    //   )
    // }
    // case 'heading6': {
    //   return React.createElement(
    //     Typography,
    //     propsWithUniqueKey(
    //       { variant: 'h6', gutterBottom: true, className: 'richtext h h6' },
    //       index,
    //     ),
    //     children,
    //   )
    // }
    // case 'paragraph': {
    //   return React.createElement(
    //     Typography,
    //     propsWithUniqueKey(
    //       { variant: 'body1', gutterBottom: true, className: 'richtext p' },
    //       index,
    //     ),
    //     children,
    //   )
    // }
    default:
      return null
  }
}

export default htmlSerialize
