module.exports = (req, res, next) => {
  if (req.session.user) {
    next()
  } else {
    res.send(403)
  }
}