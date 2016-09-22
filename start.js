/**
 * Created by gao on 16/7/25.
 */
var server = require("./lib/novae");
var router = require("./lib/router");
var config = require("./config");

server.start(router.route,config.config.port,config.config.ip);