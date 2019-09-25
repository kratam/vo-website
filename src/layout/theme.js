/* eslint-disable import/no-mutable-exports */
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles'

let theme = createMuiTheme({
  palette: {
    text: {
      primary: '#3a3c4c',
    },
  },
  typography: {
    h1: {
      fontSize: '2.75em',
    },
    h2: {
      fontSize: '2.5em',
    },
    h3: {
      fontSize: '2.25em',
    },
    h4: {
      fontSize: '2em',
    },
    h5: {
      fontSize: '1.75em',
    },
    h6: {
      fontSize: '1.5em',
    },
  },
})
theme = responsiveFontSizes(theme)

export default theme
