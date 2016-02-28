var express  = require("express"),  
    app      = express(),
    http     = require("http"),
	url = require("url"),
    path = require("path"),
    fs = require("fs"),
    port = process.argv[2] || 8888;
	
app.use(express.static(path.join(__dirname, 'public')));
upload = require('./public/app/js/loadimage.js');

app.get("/",function(request, response) {

  var uri = url.parse(request.url).pathname
    , filename = path.join(process.cwd(), uri);

  var contentTypesByExtension = {
    '.html': "text/html",
    '.css':  "text/css",
    '.js':   "text/javascript"
  };

  fs.exists(filename, function(exists) {
    if(!exists) {
      response.writeHead(404, {"Content-Type": "text/plain"});
      response.write("404 Not Found\n");
      response.end();
      return;
    }

    if (fs.statSync(filename).isDirectory()) filename += '/public/index.html';

    fs.readFile(filename, "binary", function(err, file) {
      if(err) {        
        response.writeHead(500, {"Content-Type": "text/plain"});
        response.write(err + "\n");
        response.end();
        return;
      }

      var headers = {};
      var contentType = contentTypesByExtension[path.extname(filename)];
      if (contentType) headers["Content-Type"] = contentType;
      response.writeHead(200, headers);
      response.write(file, "binary");
      response.end();
    });
  });
});

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
app.post('/upload',multipartMiddleware, upload.Uploads);

app.listen(parseInt(port, 10));

