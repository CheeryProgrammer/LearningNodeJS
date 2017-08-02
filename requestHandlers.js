var exec = require("child_process").exec;
var querystring = require("querystring");
var fs = require("fs");
var formidable = require("formidable")

var start = (response) => {
    console.log("Request handler 'start' was called.");

    var body = '<!DOCTYPE html>' +
        '<html>' +
        '<head>' +
        '<meta http-equiv="Content-Type" content="text/html; ' +
        'charset=UTF-8" />' +
        '</head>' +
        '<body>' +
        '<form action="/upload" enctype="multipart/form-data" method="post">' +
        '<input type="file" name="upload" multiple="multiple"/>' +
        '<input type="submit" value="Upload file" />' +
        '</form>' +
        '</body>' +
        '</html>';
    response.writeHead(200, {
        "Content-Type": "text/html"
    });
    response.write(body);
    response.end();
}

var upload = (response, request) => {
    console.log("Request handler 'upload' was called.");
    var form = new formidable.IncomingForm();
    console.log("About to parse");
    form.parse(request, (err, fields, files) => {
        console.log("Parsing done");
        fs.rename(files.upload.path, "C:/tmp/image.jpg", (err) => {
            if (err) {
                fs.unlink("C:/tmp/image.jpg");
                fs.rename(files.upload.path, "C:/tmp/image.jpg");
            }
        });
        response.writeHead(200, {
            "Content-Type": "text/html"
        });
        response.write("received image: <br/>");
        response.write("<img src='/show' />");
        response.end();
    });
}

var show = (response) => {
    console.log("Request hangler 'show' was called.");
    fs.readFile("C:/tmp/image.jpg", (err, data) => {
        if (err) {
            response.writeHead(500, {
                'Content-Type': "text/plain; charset=UTF-8"
            });
            response.write("Error: " + err);
            response.end();
        } else {
            response.writeHead(200, {
                "Content-Type": "image/jpg"
            });
            response.write(data, "binary");
            response.end();
        }
    });
}

exports.start = start;
exports.upload = upload;
exports.show = show;