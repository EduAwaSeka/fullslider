var express = require("express"),
        app = express(),
        http = require("http"),
        url = require("url"),
        path = require("path"),
        fs = require("fs"),
        port = process.argv[2] || 8888,
        upload = require('loadimage.js'),
        managepresentation = require('managepresentation.js'),
        bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public/'));

app.use(bodyParser.urlencoded({
    limit: '100mb',
    extended: true
}));

app.use(bodyParser.json({ limit: '100mb' }));

app.get("/", function(request, response) {

    var uri = url.parse(request.url).pathname
            , filename = path.join(process.cwd(), uri);

    var contentTypesByExtension = {
        '.html': "text/html",
        '.css': "text/css",
        '.js': "text/javascript"
    };

    fs.exists(filename, function(exists) {
        if (!exists) {
            response.writeHead(404, {"Content-Type": "text/plain"});
            response.write("404 Not Found\n");
            response.end();
            return;
        }

        if (fs.statSync(filename).isDirectory())
            filename += '/public/index.html';

        fs.readFile(filename, "binary", function(err, file) {
            if (err) {
                response.writeHead(500, {"Content-Type": "text/plain"});
                response.write(err + "\n");
                response.end();
                return;
            }

            var headers = {};
            var contentType = contentTypesByExtension[path.extname(filename)];
            if (contentType)
                headers["Content-Type"] = contentType;
            response.writeHead(200, headers);
            response.write(file, "binary");
            response.end();
        });
    });
});

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
app.post('/uploadimage', multipartMiddleware, upload.uploadImage);
app.post('/upimagefromurl', upload.uploadUrlImage);

app.post('/toPDF', managepresentation.toPDF);
app.post('/exportPres', managepresentation.exportPresentation);
app.post('/getPres', managepresentation.getPresentation);
app.post('/downloadPres', managepresentation.downloadPresentation);

app.listen(parseInt(port, 10));

