import jsonServer from 'json-server';
const server = jsonServer.create();
const db = jsonServer.router('local.db.json');
const middlewares = jsonServer.defaults();



// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// Use default router
server.use(db);
server.listen(80, () => {
    console.info('Server läuft auf Port 80 - öffnen Sie http://localhost im Browser');
})