// Add express in our project
var path = require("path");

var express = require('express');
var app = express();

var bodyParser = require('body-parser');

// Allowing our app to use the body parser package.
app.use(bodyParser.urlencoded({extended:false}))

var axios = require("axios").default;

var options = {
method: 'GET',
url: 'https://latest-stock-price.p.rapidapi.com/price',
params: {Indices: 'NIFTY 50'},
headers: {
	'x-rapidapi-host': 'latest-stock-price.p.rapidapi.com',
	'x-rapidapi-key': '7c46f62870mshb9cc79e1d4dae5ep119c75jsn8410b2d39a51'
}
};

app.get("/", function(req, res) {
	res.sendFile(path.join(__dirname , "index.html"));
});

// HANDLING THE POST REQUEST ON /DATA ROUTE.
app.post("/data", function(req, res) {

		var itemSelectedFromDropdown = req.body.stockSelected;

		axios.request(options).then(function (response) {

					var dataFromResponse = response.data;
				for(var i = 0; i<dataFromResponse.length; i++){
				if(dataFromResponse[i].symbol == itemSelectedFromDropdown){

						var dataOfStock = dataFromResponse[i];

						res.send("<html><link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css'><script src='https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js'></script><script src='https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js'></script><body style='background-image: linear-gradient(#2c3e50,#000000);'><table style='padding:50px;' class='table table-bordered'><h1><strong style='margin-left: 40%; color: white; font-family: sans-serif'> " + dataOfStock.symbol + "</strong></h1><br>"+
						"<tr><tr><h1><td style='padding:25px; font-family: sans-serif;font-size:25px;color:white;background-image: linear-gradient(#fe8c00,#f83600);'> Open: </td><td style='padding:25px; font-family: sans-serif;font-size:25px;color:white'>" + dataOfStock.open + "</td></h1></tr>" +
						"<tr><h1><td style='padding:25px; font-family: sans-serif;font-size:25px;color:white;background-image: linear-gradient(#fe8c00,#f83600);'> Day High:</td><td style='padding:25px; font-family: sans-serif;font-size:25px;color:green'> "+ dataOfStock.dayHigh + "</td></h1></tr>" +
						"<tr><h1><td style='padding:25px; font-family: sans-serif;font-size:25px;color:white;background-image: linear-gradient(#fe8c00,#f83600);'> Day Low:</td><td style='padding:25px; font-family: sans-serif;font-size:25px;color:red'> "+ dataOfStock.dayLow + "</td></h1></tr>" +
						"<tr><h1><td style='padding:25px; font-family: sans-serif;font-size:25px;color:white;background-image: linear-gradient(#fe8c00,#f83600);'> Last Price:</td><td style='padding:25px; font-family: sans-serif;font-size:25px;color:white'> "+ dataOfStock.lastPrice + "</td></h1></tr>" +
						"<tr><h1><td style='padding:25px; font-family: sans-serif;font-size:25px;color:white;background-image: linear-gradient(#fe8c00,#f83600);'> Previous Close:</td><td style='padding:25px; font-family: sans-serif;font-size:25px;color:white'> "+ dataOfStock.previousClose + "</td></h1></tr>" +
						"<tr><h1><td style='padding:25px; font-family: sans-serif;font-size:25px;color:white;background-image: linear-gradient(#fe8c00,#f83600);'> Year High:</td><td style='padding:25px; font-family: sans-serif;font-size:25px;color:green'> "+ dataOfStock.yearHigh + "</td></h1></tr>" +
						"<tr><h1><td style='padding:25px; font-family: sans-serif;font-size:25px;color:white;background-image: linear-gradient(#fe8c00,#f83600);'> Year Low:</td><td style='padding:25px; font-family: sans-serif;font-size:25px;color:red'> "+ dataOfStock.yearLow + "</td></h1></tr>" +
						"<tr><h1><td style='padding:25px; font-family: sans-serif;font-size:25px;color:white;background-image: linear-gradient(#fe8c00,#f83600);'> Last Update Time:</td><td style='padding:25px; font-family: sans-serif;font-size:25px;color:white'> "+ dataOfStock.lastUpdateTime + "</td></h1></tr>" +
						"</tr></table></body></html>")
				}
				}
		
		}).catch(function (error) {
		console.error(error)
		});
});


var port = 3000;
app.listen(port, function() {
	console.log("Server started successfully at port 3000!");
});



