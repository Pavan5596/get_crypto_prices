const gcp = require('./get_crypto_prices');
const rs = require('./server');

gcp.getPrices();
rs.runServer();
