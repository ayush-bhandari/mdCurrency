(function(){
	'use strict';

	angular
		.module('selectCurrency')
		.controller('SelectCurrencyController', SelectCurrencyController);

	function SelectCurrencyController($attrs,$http,sharedProperties){
		var vm =this;
		vm.currencies = null;
		vm.baseCurrency = null;
		vm.currency = {
			name : null,
			short_name: null,
			symbol: null,
			rate: null
		};

		if ($attrs.base == null){
			vm.currency = {
				name : "US Dollar",
				short_name: "USD",
				symbol: "$",
				rate: 1
			};
			sharedProperties.setProperty(vm.currency);
			vm.baseCurrency = "USD";
		}else{
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
				}, function errorCallback(response) {
					
			});			
		}

		vm.loadCurrencies = function() {    
			$http({
				method: 'GET',
				url: 'currencies.json'
			}).then(function successCallback(response) {
					vm.currencies = response.data;
				}, function errorCallback(response) {
					
			});
		};

		vm.selectedCurrency = function(){
			vm.url = 'http://api.fixer.io/latest?base=' + vm.baseCurrency;
			//http://api.fixer.io/latest?base=USD
			$http({
				method: 'GET',
				url: vm.url
			}).then(function successCallback(response) {
					angular.forEach(response.data.rates, function(value, key) {
						if (key === vm.currency.short_name){
							vm.currency.rate = value;
							sharedProperties.setProperty(vm.currency);
						}
					});
				}, function errorCallback(response) {
					
			});
		}

	}
})();