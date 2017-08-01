var http = require("http");
var url = require("url");

var start = function(route, handle){
    var onRequest = (request, response) => {
        var postData = "";
        var pathname = url.parse(request.url).pathname;
        request.setEncoding("utf8");
        request.addListener("data", dataChunk => {
            postData+=dataChunk;
            console.log("Received post-data chunk: '"
             + dataChunk 
             + "'.");
        });
        request.addListener("end", ()=>{
            route(handle, pathname, response, postData);
        });
        console.log("Request recieved");
    }

    http.createServer(onRequest).listen(8888);
    console.log("Http sever started");
}

exports.start = start;