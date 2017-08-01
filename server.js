var http = require("http");
var url = require("url");

var start = function(route, handle){
    var onRequest = (request, response) => {
        var pathname = url.parse(request.url).pathname;
        response.writeHead(200, {"Content-Type": "text/plain"});
        var content = route(handle, pathname);
        response.write(content);
        response.end();
        console.log("Request recieved");
    }

    http.createServer(onRequest).listen(8888);
    console.log("Http sever started");
}

exports.start = start;