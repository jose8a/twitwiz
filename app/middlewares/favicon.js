// ===================================================
// -- Client Favicon Request
// --   ensures that no error is logged due to no
//        favicon returned by the API
// ===================================================
var faviconHandler = function(req, res, next) {
  // control for favicon
  if (req.url === '/favicon.ico') {
    res.writeHead(200, {'Content-Type': 'image/x-icon'} );
    res.end();
    console.log('favicon requested');
    return;
  }
};

module.exports = faviconHandler;
