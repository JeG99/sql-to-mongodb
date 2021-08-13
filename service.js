//https://www.npmjs.com/package/node-windows
var Service = require('node-windows').Service;

var svc = new Service({
    name: 'SQL Server - Mongo DB Migration',
    description: 'The migration script for the MIEMBROS SQLS database to be used in an iOS app with a MongoDB Server',
    script: ''
});

svc.on('install', function() {
    svc.start();
});

svc.install();