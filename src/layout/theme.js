/* eslint-disable import/no-mutable-exports */
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles'

let theme = createMuiTheme({
  typography: {
    h1: {
      fontSize: '3.75em',
    },
    h2: {
      fontSize: '3em',
    },
    h3: {
      fontSize: '2.75em',
    },
    h4: {
      fontSize: '2.5em',
    },
    h5: {
      fontSize: '2.25em',
    },
    h6: {
      fontSize: '2em',
    },
  },
})
theme = responsiveFontSizes(theme)

export default theme
