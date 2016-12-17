(function(){
	'use strict';

	angular
		.module('selectCurrency')
		.controller('SelectCurrencyController', SelecCurrencyController);

	function SelectCurrencyController($attrs,$http,sharedProperties){
		var vm =this;
		// console.log($attrs.base);
		

		$http({
			method: 'GET',
			url: 'currencies.json'
		}).then(function successCallback(response) {
				console.log(response);
			}, function errorCallback(response) {
				
		});



		vm.base = null;
		if ($attrs.base == 'undefined'){
			vm.base = "USD";
			vm.currency = "USD";	
		}else{
			vm.base = $attrs.base;
			vm.currency = $attrs.base;
		}
		
		vm.symbol = "$";
	sharedProperties.setProperty(vm.symbol);

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


	function SelecCurrencyController($attrs,$http,sharedProperties){
		var vm =this;
		//console.log($attrs.base);
		vm.currencies = null;
		vm.baseCurrency = null;
		vm.currency = {
			name : null,
			short_name: null,
			symbol: null,
			rate: null
		};

		if ($attrs.base == null){
			//console.log($attrs.base);
			vm.currency = {
				name : "US Dollar",
				short_name: "USD",
				symbol: "$",
				rate: 1
			};
			sharedProperties.setProperty(vm.currency);
			vm.baseCurrency = "USD";
		}else{
			//console.log($attrs.base);
			$http({
				method: 'GET',
				url: 'currencies.json'
			}).then(function successCallback(response) {
					var i = 0;
					angular.forEach(response.data, function() {
						if ($attrs.base === response.data[i].short_name){
								vm.currency={
									name : response.data[i].name,
									short_name: response.data[i].short_name,
									symbol: response.data[i].symbol,
									rate: 1
								};
								sharedProperties.setProperty(vm.currency);
								vm.baseCurrency = $attrs.base;
							}
						i++;
					});
					// for (var i=0; i <= response.data.length; i++) {
					// 	if ($attrs.base === response.data[i].short_name){
					// 		vm.currency={
					// 			name : response.data[i].name,
					// 			short_name: response.data[i].short_name,
					// 			symbol: response.data[i].symbol,
					// 			rate: 1
					// 		};
					// 		sharedProperties.setProperty(vm.currency);
					// 		vm.baseCurrency = $attrs.base;
					// 	}
					// 	// else{
					// 	// 	vm.currency = {
					// 	// 		name : "US Dollar",
					// 	// 		short_name: "USD",
					// 	// 		symbol: "$",
					// 	// 		rate: 1
					// 	// 	};
					// 	// 	sharedProperties.setProperty(vm.currency);
					// 	// 	vm.base = "USD";
					// 	// }
					// }
					//console.log(response);
				}, function errorCallback(response) {
					// vm.currency = {
					// 	name : "US Dollar",
					// 	short_name: "USD",
					// 	symbol: "$",
					// 	rate: 1
					// };
					// sharedProperties.setProperty(vm.currency);
					// vm.base = "USD";
			});			
		}

		//vm.url = 'http://api.fixer.io/latest?base=' + vm.base;
		//http://api.fixer.io/latest?base=USD
		
		// $http({
		// 	method: 'GET',
		// 	url: vm.url
		// }).then(function successCallback(response) {
		// 		console.log(response.data.rates.AUD);
		// 	}, function errorCallback(response) {
				
		// });

		vm.loadCurrencies = function() {    
			$http({
				method: 'GET',
				url: 'currencies.json'
			}).then(function successCallback(response) {
					vm.currencies = response.data;
					//console.log(response);
				}, function errorCallback(response) {
					
			});
			//return vm.currencies;
		};

		vm.selectedCurrency = function(){
			console.log(vm.baseCurrency);
			vm.url = 'http://api.fixer.io/latest?base=' + vm.baseCurrency;
			//http://api.fixer.io/latest?base=USD
			//console.log(vm.baseCurrency);

			$http({
				method: 'GET',
				url: vm.url
			}).then(function successCallback(response) {
					//console.log(vm.base);
					angular.forEach(response.data.rates, function(value, key) {
					if (key === vm.currency.short_name){
						vm.currency.rate = value;
						sharedProperties.setProperty(vm.currency);
					}
					});
					//console.log(response.data.rates);
				}, function errorCallback(response) {
					
			});
			//sharedProperties.setProperty(vm.currency.symbol);
		}

	}
})();