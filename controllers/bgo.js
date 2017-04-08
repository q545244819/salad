const AV = require('leanengine')
const Data = AV.Object.extend('Data')
const fs = require('fs')
const multiparty = require('multiparty')

exports.saveData = function* (req, res) {
  const body = req.body
  const user = req.session.user
  const form = new multiparty.Form()

  form.parse(req, function (err, fields, files) {
    const iconFile = files.upload[0]

    if (iconFile.size !== 0) {
      fs.readFile(iconFile.path, function (err, data) {
        if (err) {
          return res.redirect('/bgo/data')
        }

        const theFile = new AV.File(iconFile.originalFilename, data)

        theFile.save()
          .then(image => {
            const data = new Data({
              title: fields.title[0],
              content: fields.content[0],
              tags: fields.tags[0].split(';'),
              image
            })

            return data.save()
          })
          .then(data => {
            res.redirect('/bgo/data')
          })
          .catch(err => {
            console.error(err)

            res.redirect('/bgo/data')
          })
      })
    } else {
      res.redirect('/bgo/data')
    }
  })
}