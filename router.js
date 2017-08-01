var route = function(handle, pathname){
    if(typeof handle[pathname] === 'function')
    {
        return handle[pathname]();
    }
    else
    {
        console.log("Not found handler for " + pathname);
        return "404 Not found";
    }
}

exports.route = route;