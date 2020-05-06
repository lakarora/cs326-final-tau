'use strict';
exports.__esModule = true;
var server_routing_1 = require("./server-routing");
var mongo_database_1 = require("./mongo-database");
var database = new mongo_database_1.Database();
var theServer = new server_routing_1.Server(database);
theServer.listen(process.env.PORT);
