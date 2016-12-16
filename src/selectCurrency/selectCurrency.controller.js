(function(){
	'use strict';

	angular
		.module('selectCurrency')
		.controller('SelectCurrencyController', SelectCurrencyController);

	function SelectCurrencyController($attrs,$http,sharedProperties){
		var vm =this;
		// console.log($attrs.base);
		
		vm.base = null;
		if ($attrs.base == 'undefined'){
			vm.base = "USD";
			vm.currency = "USD";	
		}else{
			vm.base = $attrs.base;
			vm.currency = $attrs.base;
		}
		
		vm.symbol = "$";
  		vm.currencies = null;
		console.log(vm.currency);
		console.log(vm.base);
		vm.url = 'http://api.fixer.io/latest?base=' + vm.base;
		//http://api.fixer.io/latest?base=USD
		
		// $http({
		// 	method: 'GET',
		// 	url: vm.url
		// }).then(function successCallback(response) {
		// 		console.log(response.data.rates.AUD);
		// 	}, function errorCallback(response) {
				
		// });

		vm.loadCurrencies = function() {    
			vm.currencies =  vm.currencies  || 	[
				{
					"name":"Australian Dollar",
					"short_name":"AUD",
					"symbol":"$"
				},
				{
					"name":"Bulgarian Lev",
					"short_name":"BGN",
					"symbol":"лв"
				},
				{
					"name":"Brazilian Real",
					"short_name":"BRL",
					"symbol":"R$"
				},
				{
					"name":"Canadian Dollar",
					"short_name":"CAD",
					"symbol":"$"
				},
				{
					"name":"Swiss Franc",
					"short_name":"CHF",
					"symbol":"CHF"
				},
				{
					"name":"Yuan Renminbi",
					"short_name":"CNY",
					"symbol":"¥"
				},
				{
					"name":"Czech Koruna",
					"short_name":"CZK",
					"symbol":"Kč"
				},
				{
					"name":"Danish Krone",
					"short_name":"DKK",
					"symbol":"kr"
				},
				{
					"name":"Euro",
					"short_name":"EUR",
					"symbol":"€"
				},
				{
					"name":"Pound Sterling",
					"short_name":"GBP",
					"symbol":"£"
				},
				{
					"name":"Hong Kong Dollar",
					"short_name":"HKD",
					"symbol":"$"
				},
				{
					"name":"Croatian Kuna",
					"short_name":"HRK",
					"symbol":"kn"
				},
				{
					"name":"Forint",
					"short_name":"HUF",
					"symbol":"Ft"
				},
				{
					"name":"Rupiah",
					"short_name":"IDR",
					"symbol":"Rp"
				},
				{
					"name":"New Israeli Sheqel",
					"short_name":"ILS",
					"symbol":"₪"
				},
				{
					"name":"Indian Rupee",
					"short_name":"INR",
					"symbol":"₹"
				},
				{
					"name":"Yen",
					"short_name":"JPY",
					"symbol":"¥"
				},
				{
					"name":"Won",
					"short_name":"KRW",
					"symbol":"₩"
				},
				{
					"name":"Mexican Peso",
					"short_name":"MXN",
					"symbol":"$"
				},
				{
					"name":"Malaysian Ringgit",
					"short_name":"MYR",
					"symbol":"RM"
				},
				{
					"name":"Norwegian Krone",
					"short_name":"NOK",
					"symbol":"kr"
				},
				{
					"name":"New Zealand Dollar",
					"short_name":"NZD",
					"symbol":"$"
				},
				{
					"name":"Philippine Peso",
					"short_name":"PHP",
					"symbol":"₱"
				},
				{
					"name":"Zloty",
					"short_name":"PLN",
					"symbol":"zł"
				},
				{
					"name":"New Romanian Leu",
					"short_name":"RON",
					"symbol":"lei"
				},
				{
					"name":"Russian Ruble",
					"short_name":"RUB",
					"symbol":"руб"
				},
				{
					"name":"Swedish Krona",
					"short_name":"SEK",
					"symbol":"kr"
				},
				{
					"name":"Singapore Dollar",
					"short_name":"SGD",
					"symbol":"$"
				},
				{
					"name":"Baht",
					"short_name":"THB",
					"symbol":"฿"
				},
				{
					"name":"Turkish Lira",
					"short_name":"TRY",
					"symbol":"₺"
				},
				{
					"name":"US Dollar",
					"short_name":"USD",
					"symbol":"$"
				},
				{
					"name":"Rand",
					"short_name":"ZAR",
					"symbol":"R"
				}
			]
		};
		vm.selectedCurrency = function(){
			console.log(vm.currency);
			sharedProperties.setProperty(vm.currency.symbol);
		}

	}
})();