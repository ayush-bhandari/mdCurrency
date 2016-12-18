(function(){
	'use strict';

	angular
		.module('mdCurrency')
		.controller('SelectCurrencyController', SelectCurrencyController);

	function SelectCurrencyController($attrs,$http,sharedCurrency){
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
			sharedCurrency.setCurrency(vm.currency);
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
								sharedCurrency.setCurrency(vm.currency);
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
			if (vm.currency.short_name === vm.baseCurrency){
				vm.currency.rate = 1;
				sharedCurrency.setCurrency(vm.currency);
			}else{
				$http({
						method: 'GET',
						url: 'currencyAPI.json'
					}).then(function successCallback(res) {
						vm.url = res.data.api_url + res.data.api_key + res.data.api_params + vm.baseCurrency;
						//http://api.fixer.io/latest?base=USD
						$http({
							method: 'GET',
							url: vm.url
						}).then(function successCallback(response) {
								angular.forEach(response.data.rates, function(value, key) {
									if (key === vm.currency.short_name){
										vm.currency.rate = value;
										sharedCurrency.setCurrency(vm.currency);
									}
								});
							}, function errorCallback(response) {
								
						});
					}, function errorCallback(res) {
						
				});
				
			}
			
		}

	}
})();