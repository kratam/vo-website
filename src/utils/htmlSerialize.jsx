/* eslint-disable no-fallthrough */
import React from 'react'
// import { Paper } from '@material-ui/core'
import { Link } from 'gatsby'

const htmlSerialize = (type, element, content, children, index) => {
  switch (type) {
    case 'label': {
      const props = {
        className: 'rt-callout',
        key: index,
      }
      return React.createElement('span', props, children)
    }
    case 'embed': {
      const props = {
        key: index,
        'data-oembed': element.oembed.embed_url,
        'data-oembed-type': element.oembed.type,
        'data-oembed-provider': element.oembed.provider_name,
        className: `rt-embed${element.label || ''}`,
      }

      const embedHtml = React.createElement('div', {
        dangerouslySetInnerHTML: { __html: element.oembed.html },
      })
      return React.createElement('div', props, embedHtml)
    }
    case 'hyperlink': {
      if (
        element.data.url &&
        (element.data.url.includes('https:///kb/') ||
          element.data.url.includes('https://kb/') ||
          element.data.url.includes('https://_kb/') ||
          element.data.url.includes('https://vendegkonyv.online/kb/'))
      ) {
        let to = element.data.url
          .replace('https:///kb/', '/kb/')
          .replace('https://kb/', '/kb/')
          .replace('https://_kb/', '/kb/')
          .replace('https://vendegkonyv.online/kb/', '/kb/')
        if (to.slice(-1) === '/') to = to.slice(0, -1)
        return (
          <Link key={index} to={to}>
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

    default:
      return null
  }
}

export default htmlSerialize
