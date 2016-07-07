/**
 * Created by gao on 16/5/30.
 */
    /*
var fs=require('fs');
var mine=require('./mine').types;
var path=require('path');
var http=require("http");
var url=require("url");
var PORT=3000;
var server = http.createServer(function (request, response) {
    console.log(request.url);
    var pathname = url.parse(request.url).pathname;
    var realPath = path.join("/", pathname);
    console.log(realPath);
    var ext = path.extname(realPath);
    ext = ext ? ext.slice(1) : 'unknown';
    fs.exists(realPath, function (exists) {
        console.log(exists);
        if (!exists) {
            response.writeHead(404, {
                'Content-Type': 'text/plain'
            });

            response.write("This request URL " + pathname + " was not found on this server.");
            response.end();
        } else {
            fs.readFile(realPath, "/", function (err, file) {
                if (err) {
                    response.writeHead(500, {
                        'Content-Type': 'text/plain'
                    });
                    response.end(err);
                } else {
                    var contentType = mine[ext] || "text/plain";
                    response.writeHead(200, {
                        'Content-Type': contentType
                    });
                    response.write(file, "binary");
                    response.end();
                }
            });
        }
    });
});
server.listen(PORT);
exports.server=server;
console.log("Server runing at port: " + PORT + ".");
        */
var fs=require('fs');
var mine=require('./mine').types;
var path=require('path');
var http=require("http");
var url=require("url");
var os = require('os');

var start = function(route,PORT) {
    function onRequest(request, response) {
        //var pathname = url.parse(request.url).pathname;
        //console.log("Request for " + pathname + " received.");
        //
        //route(pathname);
        //
        //response.writeHead(200, {"Content-Type": "text/plain"});
        //response.write("Hello World");
        //response.end();
        var pathname = url.parse(request.url).pathname;
        var realPath = path.join("./", pathname);
        console.log(realPath);
        var ext = path.extname(realPath);

        ext = ext ? ext.slice(1) : 'unknown';
        console.log(ext);
        fs.exists(realPath, function (exists) {
            if (!exists) {
                response.writeHead(404, {
                    'Content-Type': 'text/plain'
                });

                response.write("This request URL " + pathname + " was not found on this server.");
                response.end();
            } else {
                fs.readFile(realPath, "binary", function (err, file) {
                    if (err) {
                        response.writeHead(500, {
                            'Content-Type': 'text/plain'
                        });
                        response.end(err);
                    } else {
                        var contentType = mine[ext] || "text/plain";
                        response.writeHead(200, {
                            'Content-Type': contentType
                        });
                        response.write(file, "binary");
                        response.end();
                    }
                });
            }
        });
    }

    //获得本机ip和本机host
    var IPv4,hostName;
    hostName=os.hostname();
    if(os.networkInterfaces() && os.networkInterfaces().en0 && os.networkInterfaces().en0.length>0){
        for(var i=0;i<os.networkInterfaces().en0.length;i++){
            if(os.networkInterfaces().en0[i].family=='IPv4'){
                IPv4=os.networkInterfaces().en0[i].address;
            }
        }
    } else {
        IPv4 = "cutInterfaces";
    }


    console.log('----------local IP: '+IPv4);
    console.log('----------local hostName: '+hostName);

    http.createServer(onRequest).listen(PORT);
    console.log("Server has started,PORT = ",PORT);
};

exports.start = start;