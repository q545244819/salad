const AV = require('leanengine')
const Question = AV.Object.extend('Question')

const count = 20

exports.search = (q, page = 1) => {
  const query = new AV.SearchQuery('Question')

  query.queryString(`*${q}*`)
  query.limit(count)
  query.skip(count * (page - 1))
  query.sortBy(new AV.SearchSortBuilder().descending('updatedAt'))
  query.include('user')

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

exports.find = (page = 1, solve) => {
  const query = new AV.Query('Question')

  query.limit(count)
  query.skip(count * (page - 1))
  query.descending('vote')
  query.include('solve', 'user')
  solve ? query.exists('solve') : query.doesNotExist('solve')

  return new Promise((resolve, reject) => {
    query.find()
      .then(results => {
        resolve({
          docs: results,
          hasPrevious: (page === 1 && page > 0) ? false : true,
          hasMore: results.length < count ? false : true,
          currentPage: page
        })
      })
      .catch(err => reject(err))
  })
}

exports.findById = id => {
  const query = new AV.Query('Question')

  query.equalTo('objectId', id)
  query.include('user')

  return query.first()
}