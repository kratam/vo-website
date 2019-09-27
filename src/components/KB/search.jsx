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
import SearchIcon from '@material-ui/icons/Search'
import { Link } from 'gatsby'
import useWindowSize from '../../utils/hooks/useWindowSize'
import './search.css'

const Input = connectSearchBox(({ refine }) => {
  const size = useWindowSize()
  return (
    <Paper className="search-paper">
      <SearchIcon className="search-icon" />
      <InputBase
        autoFocus={size.width > 500 ? true : undefined}
        className="search-input"
        placeholder="kezdj el gépelni a kereséshez..."
        inputProps={{ 'aria-label': 'keresés a tudásbázisban' }}
        onChange={e => refine(e.target.value)}
      />
    </Paper>
  )
})

const Hit = ({ hit }) => {
  if (!hit._highlightResult.name) return null
  return (
    <Link to={`/kb/${hit.slug}`}>
      <Paper className="search-hit-paper">
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

export default function Search() {
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
    <Container maxWidth="sm" className="search-container">
      <Typography className="search-headline" variant="h6" gutterBottom>
        A rövidtávú szálláshelykiadás tudásbázisa
      </Typography>
      <InstantSearch searchClient={searchClient} indexName="knowledgebase">
        <Input />
        <Results />
      </InstantSearch>
    </Container>
  )
}
