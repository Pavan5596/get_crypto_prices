// server.js

const http = require('http');
const fs = require('fs');
const WebSocket = require('ws');

const runServer = () => {
	const wss = new WebSocket.Server({ port: 8080 });

	wss.on('connection', ws => {
		ws.on('message', message => {
			console.log(`Received message => ${message}`)
		})
		fs.readFile('./crypto_prices.json', 'utf8', function readFileCallback(err, data){
			if (err){
				console.log(err);
			} else {
				obj = JSON.parse(data);
				ws.send(JSON.stringify(obj));
			}
		});
		function sendUpdates(){
			//console.log('reading file');
			fs.readFile('./crypto_prices.json', 'utf8', function readFileCallback(err, data){
				if (err){
					console.log(err);
				} else {
					obj = JSON.parse(data);
					let dataToSend = [];
					Object.keys(obj).forEach(function(key) {
						let value = obj[key];
						//console.log('value.updated: '+value.updated);
						if(value.updated){
							dataToSend = obj[key];
						}
					});
					ws.send(JSON.stringify(dataToSend));
				}
			});
		}
		setInterval(sendUpdates,3000);
	});


	const server = http.createServer((req, res) => {
		res.writeHead(200, { 'content-type': 'text/html' })
		fs.createReadStream('index.html').pipe(res)
	});

	server.listen(process.env.PORT || 3000);
};

exports.runServer = runServer;
