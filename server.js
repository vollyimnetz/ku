import jsonServer from 'json-server';

const server = jsonServer.create();
const db = jsonServer.router('local.db.json');
const middlewares = jsonServer.defaults();


console.info('Server läuft auf Port 80');

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);


// Add custom routes before JSON Server router
server.get('/my-local-ip', (req, res) => {
    res.jsonp( {result: getLocalAdress() } );
})

// Use default router
server.use(db);
server.listen(80, () => {
    console.log('JSON Server is running')
})


//const opn = require('opn');
//opn('http://localhost');



function getLocalAdress() {
    return 'test';
}
