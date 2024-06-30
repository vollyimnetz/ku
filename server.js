import jsonServer from 'json-server';
import os from 'os';
const server = jsonServer.create();
const db = jsonServer.router('local.db.json');
const middlewares = jsonServer.defaults();



// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// Use default router
server.use(db);
server.listen(80, () => {
    console.info('Server läuft auf Port 80 - öffnen Sie http://localhost im Browser');

    const ipv4Addresses = getIPv4Addresses();

    console.log('\nDas ist warscheinlich die öffentliche IPv4 Addresses:');
    ipv4Addresses.forEach((ip) => {
        console.log(`\nhttp://${ip}`);
    });
});



// getIPv4Addresses.js

function getIPv4Addresses() {
  const interfaces = os.networkInterfaces();
  const addresses = [];
  const whiteList = ['192.168.0', '192.168.1', '192.168.178', '192.168.179'];

  for(let iface in interfaces) {
    for(let alias of interfaces[iface]) {
      if(alias.family === 'IPv4' && !alias.internal) {
        if(whiteList.some((ip) => alias.address.startsWith(ip))) {
            addresses.push(alias.address);
        }
      }
    }
  }
  return addresses;
}