const AV = require('leanengine')
const Data = AV.Object.extend('Data')

const count = 20

exports.search = (q, page = 0) => {
  const query = new AV.SearchQuery('Data')

  query.queryString(`*${q}*`)
  query.limit(count)
  query.skip(count * (page - 1))
  query.sortBy(new AV.SearchSortBuilder().descending('updatedAt'))

  return new Promise((resolve, reject) => {
    query.find()
      .then(results => {
        resolve({
          docs: results,
          hasLastPage: (page === 1 && page > 0) ? false : true,
          hasMore: query.hasMore(),
          currentPage: page
        })
      })
      .catch(err => reject(err))
  })
}