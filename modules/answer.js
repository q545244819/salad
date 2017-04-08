const AV = require('leanengine')
const Answer = AV.Object.extend('Answer')

const count = 20

exports.search = (q, page = 1) => {
  const query = new AV.SearchQuery('Answer')

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

exports.findByQuestion = (question) => {
  const query = new AV.Query('Answer')

  query.equalTo('question', AV.Object.createWithoutData('Question', question))
  query.descending('vote')
  query.descending('updatedAt')
  query.include('user')
  
  return query.find()
}