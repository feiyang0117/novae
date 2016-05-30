/**
 * Created by gao on 16/5/30.
 */
var server = require("./novae");
var router = require("./router");
var config = require("../config");

server.start(router.route,config.config.port);