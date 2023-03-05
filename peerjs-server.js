const PROXIED_PORT = 9002;
const LISTEN_PORT = 9003;
const PRIVATE_KEY = '/home/keys/treepadcloud.com.key';
const PUBLIC_CERT = '/home/keys/treepadcloud.com.pem';

var http = require('http'),
    httpProxy = require('http-proxy');
var fs = require('fs');
var https = require('https');
const { PeerServer } = require("peer");

var keys = {
    key: fs.readFileSync(PRIVATE_KEY, 'utf8'),
    cert: fs.readFileSync(PUBLIC_CERT, 'utf8')
  }

var proxy = httpProxy.createServer({ws : true})

https.createServer(keys, (req, res) => {
	
    /*
     * INSERT CUSTOM AUTHENTICATION HERE TO PREVENT OPEN PEERJS SERVER
     */
	
	proxy.web(req, res, { 
		target: `http://127.0.0.1:${PROXIED_PORT}`});	
}).listen(LISTEN_PORT, '0.0.0.0');

const peerServer = PeerServer({
    host: '127.0.0.1',
	port: PROXIED_PORT,
	path: "/",
	proxied: true,
});