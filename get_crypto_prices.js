var chance = require('chance').Chance();
const fs = require('fs');

const getPrices = () => {
	var _data = [
		{
			"name": "Ethereum",
			"price": {0: 30000, 1: 32000},
			"change": {0: -5, 1: 5},
			"volume": {0: 20, 1: 25},
			"marketCap": {0: 600, 1: 700},
		},
		{
			"name": "Litecoin",
			"price": {0: 10000, 1: 12000},
			"change": {0: -15, 1: 5},
			"volume": {0: 10, 1: 25},
			"marketCap": {0: 400, 1: 600},
		},
		{
			"name": "Cardano",
			"price": {0: 2000, 1: 4000},
			"change": {0: -5, 1: 15},
			"volume": {0: 20, 1: 25},
			"marketCap": {0: 300, 1: 400},
		},
		{
			"name": "Polkadot",
			"price": {0: 5000, 1: 7000},
			"change": {0: -5, 1: 5},
			"volume": {0: 10, 1: 15},
			"marketCap": {0: 60, 1: 70},
		},
		{
			"name": "Bitcoin",
			"price": {0: 12000, 1: 22000},
			"change": {0: -8, 1: 10},
			"volume": {0: 6, 1: 12},
			"marketCap": {0: 30, 1: 40},
		},
		{
			"name": "Stellar",
			"price": {0: 6000, 1: 7000},
			"change": {0: -5, 1: 5},
			"volume": {0: 5, 1: 20},
			"marketCap": {0: 50, 1: 70},
		},
		{
			"name": "Dogecoin",
			"price": {0: 5000, 1: 6000},
			"change": {0: -5, 1: 10},
			"volume": {0: 20, 1: 25},
			"marketCap": {0: 10, 1: 30},
		},
		{
			"name": "Binance",
			"price": {0: 4000, 1: 5000},
			"change": {0: -10, 1: 15},
			"volume": {0: 20, 1: 25},
			"marketCap": {0: 10, 1: 15},
		}
	];

	let cryptoData = [];
	_data.forEach(element => {
		let _name = element.name;
		let _price = chance.euro({min: element.price[0], max: element.price[1]});
		let _change = chance.integer({min: element.change[0], max: element.change[1]});
			_change = String(_change) + "%";
		let _volume = chance.euro({min: element.volume[0], max: element.volume[1]});
		let _marketCap = chance.euro({min: element.marketCap[0], max: element.marketCap[1]});
		let _updated = false;
		let _cryptoData = {
			"name": _name,
			"price": _price,
			"change": _change,
			"volume": _volume,
			"marketCap": _marketCap,
			"updated": _updated,
		};
		cryptoData.push(_cryptoData);
	});
	let data = JSON.stringify(cryptoData, null, 2);
	fs.writeFileSync('./crypto_prices.json', data);

	function updateRandomData(){
		let element = _data[chance.integer({min: 0, max: 7})];
		let _name = element.name;
		let _price = chance.euro({min: element.price[0], max: element.price[1]});
		let _change = chance.integer({min: element.change[0], max: element.change[1]});
			if(_change>0) _change = "+"+_change;
			_change = String(_change) + "%";
		let _volume = chance.euro({min: element.volume[0], max: element.volume[1]});
		let _marketCap = chance.euro({min: element.marketCap[0], max: element.marketCap[1]});
		let _updated = true;
		let _cryptoData = {
			"name": _name,
			"price": _price,
			"change": _change,
			"volume": _volume,
			"marketCap": _marketCap,
			"updated": _updated,
		};

/*		let count = 2;
		if(chance.bool() && (count!=0)) { delete _cryptoData["price"]; count--;}
		if(chance.bool() && (count!=0)) { delete _cryptoData["change"]; count--;}
		if(chance.bool() && (count!=0)) { delete _cryptoData["volume"]; count--;}
		if(chance.bool() && (count!=0)) { delete _cryptoData["marketCap"]; count--;}*/

		console.log('For "'+_name+'" changing these values:');
		console.log(_cryptoData);
		fs.readFile('./crypto_prices.json', 'utf8', function readFileCallback(err, data){
			if (err){
				console.log(err);
			} else {
				obj = JSON.parse(data);
				Object.keys(obj).forEach(function(key) {
					let value = obj[key];
					if(value["name"] === _cryptoData["name"]){
						Object.keys(_cryptoData).forEach(function(k) {
							let val = _cryptoData[k];
							if(k!="name"){
								//console.log('Updating: '+k+'::'+val);
								value[k] = val;
							}
						});
					}
				});
				Object.keys(obj).forEach(function(key) {
					let value = obj[key];
					if(value["name"] !== _cryptoData["name"]){
						value.updated = false;
					}
				});
				//console.log(obj);
				json = JSON.stringify(obj, null, 2);
				fs.writeFile('./crypto_prices.json', json, function writeFileCallback(err, data){
					if (err) {
						console.error(err)
						return;
					} else {
						//console.log('File write successful');
					}
				});
			}
		});
	}
	setInterval(updateRandomData,3000);
};

exports.getPrices = getPrices;
