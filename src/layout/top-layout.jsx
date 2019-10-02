import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/styles'
import Helmet from 'react-helmet'
import config from '../../data/SiteConfig'

import Viewport from './viewport'

export default function TopLayout({ children, theme }) {
  return (
    <>
      <Viewport />
      <Helmet>
        <meta name="description" content={config.siteDescription} />
      </Helmet>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        {children}
      </ThemeProvider>
    </>
  )
}
