module.exports = function (req, res, next) {
  if (req.method === 'POST' && (req.url.startsWith('/authInfo'))) {
    // Converts POST to GET and move payload to query params
    // This way it will make JSON Server that it's GET request
    req.method = 'GET'
    req.query = req.body
  }
  // Continue to JSON Server router
  next();
}
