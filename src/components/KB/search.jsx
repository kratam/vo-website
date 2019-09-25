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
import {
  Paper,
  InputBase,
  IconButton,
  Container,
  Typography,
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import { Link } from 'gatsby'
import './search.css'

const Input = connectSearchBox(({ refine }) => (
  <Paper className="search-paper">
    <InputBase
      className="search-input"
      placeholder="Keresés a tudásbázisban"
      inputProps={{ 'aria-label': 'keresés a tudásbázisban' }}
      onChange={e => refine(e.target.value)}
    />
    <IconButton className="search-icon" aria-label="keresés">
      <SearchIcon />
    </IconButton>
  </Paper>
))

const Hit = ({ hit }) => {
  return (
    <Link to={`/kb/${hit.slug}`}>
      <Paper className="search-hit-paper">
        <Typography variant="h5">
          <Highlight attribute="name" hit={hit}>
            {hit._highlightResult.name.value}
          </Highlight>
        </Typography>
        <Typography variant="body2">
          <Highlight attribute="description" hit={hit}>
            {hit._highlightResult.description.value}
          </Highlight>
        </Typography>
      </Paper>
    </Link>
  )
}

const ResultsComp = ({ searchState, searchResults }) => {
  if (!searchState.query) return null
  if (searchResults.nbHits > 0) return <Hits hitComponent={Hit} />
  return <div className="ais-noResult">Nincs találat &#x1F622;</div>
}

const Results = connectStateResults(ResultsComp)

export default function Search() {
  const searchClient = algoliasearch(
    process.env.GATSBY_ALGOLIA_APP_ID,
    process.env.GATSBY_ALGOLIA_SEARCH_KEY,
  )
  return (
    <Container maxWidth="sm" className="search-container">
      <InstantSearch searchClient={searchClient} indexName="knowledgebase">
        <Input />
        <Results />
      </InstantSearch>
    </Container>
  )
}
