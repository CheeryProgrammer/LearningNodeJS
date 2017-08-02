var http = require("http");
var url = require("url");

var start = function (route, handle) {
    var onRequest = (request, response) => {

        var pathname = url.parse(request.url).pathname;
        route(handle, pathname, response, request);
        console.log("Request recieved");
    }

    http.createServer(onRequest).listen(8888);
    console.log("Http sever started");
}

exports.start = start;