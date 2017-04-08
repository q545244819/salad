const AV = require('leanengine')
const Data = AV.Object.extend('Data')

exports.search = q => {
  const query = new AV.SearchQuery('Data')

  query.queryString(`*${q}*`)

  return query.find()
}