// /* eslint-disable no-console */
// const Prismic = require('prismic-javascript')

// const apiEndpoint = 'https://vo-kb.prismic.io/api/v2'

// const getParent = (result, results) => {
//   return results.find(r => r.uid === result.parent)
// }

// const getParents = (result, results, parents = []) => {
//   const parent = getParent(result, results)
//   if (parent) return getParents(parent, results, [...parents, parent])
//   return parents
// }

// const constructPath = result =>
//   [result.uid, ...result.parents.map(p => p.uid)].reverse().join('/')

// const getAllCategories = () =>
//   Prismic.getApi(apiEndpoint)
//     .then(
//       api => api.query(''), // An empty query will return all the documents
//     )
//     .then(response => {
//       return response.results
//         .filter(r => r.type === 'kb_category')
//         .map(r => ({
//           uid: r.uid,
//           parent: r.data.parent_category && r.data.parent_category.uid,
//         }))
//         .map((r, i, array) => ({ ...r, parents: getParents(r, array) }))
//         .map(r => ({ ...r, fullpath: constructPath(r) }))
//     })
//     .catch(err => console.error('Could not get prismic results', err))

// module.exports = getAllCategories
