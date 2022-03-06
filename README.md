# get_crypto_prices
Get Crypto Prices - WebSocket

The main Node.js application file is index.js
you can run it as: "node index.js"
	1. index.html can be accessed through http://localhost:3000/
	2. WebSocket server is listening on port: 8080
	3. WebSocket client will reach server through URL - "ws://localhost:8080"

index.js invokes,
1. get_crypto_prices.js - will generates fake data to act as “test” crypto currency data using "chance" and write data to "crypto_prices.json". Data is updated every 3sec.
2. server.js - will act as both server to host "index.html" and WebSocket server.
index.html is acting as WebSocket client.

In node console you will see crypto currency data updates.
Using WebSocket, the same updates are sent to browser. You can observe these in browser console.
On connection establishment, all the data in "crypto_prices.json" is sent to browser and after this only the updates are sent. Browser will highlight the new updates.
