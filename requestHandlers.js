var start = ()=>{
    console.log("Request handler 'start' was called.");

    (function(milliseconds){
        var endTime = new Date().getTime() + milliseconds;
        while(new Date().getTime() < endTime);
    })(10000);

    return "Hello, start!";
}

var upload = ()=>{
    console.log("Request handler 'upload' was called.");
    return "Hello, upload!";
}

exports.start = start;
exports.upload = upload;