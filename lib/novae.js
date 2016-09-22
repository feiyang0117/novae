/**
 * Created by gao on 16/7/25.
 */

var fs=require('fs');
var mine=require('./mine').types;
var path=require('path');
var http=require("http");
var url=require("url");
var os = require('os');

var start = function(route,port,ip) {
    function onRequest(request, response) {
        var testUrl  = request.url;
        testUrl = testUrl == "/"? "/index.html":testUrl;
        var pathname = url.parse(testUrl).pathname || "";
        var realPath = path.join('./',pathname);
        var ext = path.extname(realPath);
        ext = ext ? ext.slice(1) : 'unknown';

        fs.exists(realPath, function (exist) {
            console.log(realPath,"====--------");
            if (!exist) {
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
                        response.end(err.message);
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

    http.createServer(onRequest).listen(port);
    console.log(`${ip}:${port} ,has started`);
};

exports.start = start;