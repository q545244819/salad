const AV = require('leanengine')
const Question = AV.Object.extend('Question')

const count = 20

exports.search = (q, page = 1) => {
  const query = new AV.SearchQuery('Question')

  query.queryString(`*${q}*`)
  query.limit(count)
  query.skip(count * (page - 1))
  query.sortBy(new AV.SearchSortBuilder().descending('updatedAt'))

  return new Promise((resolve, reject) => {
    query.find()
      .then(results => {
        resolve({
          docs: results,
          hasPrevious: (page === 1 && page > 0) ? false : true,
          hasMore: results.length < count ? false : query.hasMore(),
          currentPage: page
        })
      })
      .catch(err => reject(err))
  })
}