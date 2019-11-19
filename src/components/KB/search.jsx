/* eslint-disable no-underscore-dangle */
/* eslint-disable no-shadow */
import React from 'react'
import {
  InstantSearch,
  Hits,
  connectStateResults,
  connectSearchBox,
  Highlight,
} from 'react-instantsearch-dom'
import algoliasearch from 'algoliasearch/lite'
import { Paper, InputBase, Container, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import SearchIcon from '@material-ui/icons/Search'
import { Link } from 'gatsby'
import useWindowSize from '../../utils/hooks/useWindowSize'

const useInputStyles = makeStyles(() => ({
  paper: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    margin: 12,
    height: 24,
    color: 'grey',
  },
  input: {
    flex: 1,
  },
}))

const Input = connectSearchBox(({ refine }) => {
  const classes = useInputStyles()
  const size = useWindowSize()
  return (
    <Paper classes={{ root: classes.paper }}>
      <SearchIcon classes={{ root: classes.icon }} />
      <InputBase
        autoFocus={size.width > 800 ? true : undefined}
        classes={{ root: classes.input }}
        placeholder="kezdj el gépelni a kereséshez..."
        inputProps={{ 'aria-label': 'keresés a tudásbázisban' }}
        onChange={e => refine(e.target.value)}
      />
    </Paper>
  )
})

const useHitStyles = makeStyles(() => ({
  paper: {
    padding: '8px 16px',
    marginTop: 2,
    color: '#3f3f3f',
  },
}))

const Hit = ({ hit }) => {
  const classes = useHitStyles()
  if (!hit._highlightResult.name) return null
  return (
    <Link to={`/kb/${hit.slug}`}>
      <Paper classes={{ root: classes.paper }}>
        <Typography variant="h5">
          <Highlight attribute="name" hit={hit}>
            {hit._highlightResult.name.value}
          </Highlight>
        </Typography>
        {hit._highlightResult.description && (
          <Typography variant="body2">
            <Highlight attribute="description" hit={hit}>
              {hit._highlightResult.description.value}
            </Highlight>
          </Typography>
        )}
      </Paper>
    </Link>
  )
}

const ResultsComp = ({ searchState, searchResults, searching }) => {
  if (!searchState.query) return null
  if (searchResults.nbHits > 0) return <Hits hitComponent={Hit} />
  if (searching) return null
  return <div className="ais-noResult">Nincs találat &#x1F622;</div>
}

const Results = connectStateResults(ResultsComp)

const useStyles = makeStyles(() => ({
  container: {
    padding: '40px 0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  headline: {
    color: '#fff',
    textAlign: 'center',
    textDecoration: props => (props.isMainPage ? undefined : 'underline'),
  },
}))

export default function Search({ isMainPage }) {
  const classes = useStyles({ isMainPage })
  const algoliaClient = algoliasearch(
    process.env.GATSBY_ALGOLIA_APP_ID,
    process.env.GATSBY_ALGOLIA_SEARCH_KEY,
  )

  const searchClient = {
    search(requests) {
      if (requests.every(({ params }) => !params.query)) {
        return Promise.resolve({
          results: requests.map(() => ({
            hits: [],
            nbHits: 0,
            nbPages: 0,
            processingTimeMS: 0,
          })),
        })
      }

      return algoliaClient.search(requests)
    },
  }

  return (
    <Container maxWidth="sm" classes={{ root: classes.container }}>
      <Link to="/" style={{ cursor: 'pointer' }}>
        <Typography
          classes={{ root: classes.headline }}
          variant="h6"
          gutterBottom
        >
          A rövidtávú szálláshelykiadás tudásbázisa
        </Typography>
      </Link>
      <InstantSearch searchClient={searchClient} indexName="knowledgebase">
        <Input />
        <Results />
      </InstantSearch>
    </Container>
  )
}
