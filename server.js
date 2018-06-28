const jsonServer = require('json-server')

const server = jsonServer.create();
const router = jsonServer.router('local.db.json');
const middlewares = jsonServer.defaults();
var os = require('os');


console.info('Folgende URL im Browser öffnen: ', getLocalAdress());

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);


// Add custom routes before JSON Server router
server.get('/my-local-ip', (req, res) => {
    res.jsonp( {result: getLocalAdress() } );
})

// Use default router
server.use(router);
server.listen(80, () => {
    console.log('JSON Server is running')
})


//const opn = require('opn');
//opn('http://localhost');



function getLocalAdress() {
    var settings = null;
    try {
        var settings = require('./local.settings.json');
    } catch (e) { }

    var localAddress = '';
    if (settings !== null && typeof settings.ip === "string") {
        localAddress = settings.ip
    } else {
        var interfaces = os.networkInterfaces();
        for (var k in interfaces) {
            for (var k2 in interfaces[k]) {
                var address = interfaces[k][k2];
                if (address.family === 'IPv4' && !address.internal) {
                    if (address.address.startsWith('192.168.178.')) localAddress = address.address;
                }
            }
        }
    }
    return localAddress;
}
