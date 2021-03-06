(function(){
	'use strict';

	angular
		.module('mdCurrency',[])
		.service('sharedCurrency', sharedCurrency)
		.controller('SelectCurrencyController', SelectCurrencyController)
		.controller('CurrencyController', CurrencyController)
		.directive('mdSelectCurrency', mdSelectCurrency)
		.directive('mdCurrency', mdCurrency);

	function sharedCurrency($rootScope) {
        var currency = [];
		return {
            getCurrency: function () {
                return currency;
            },
            setCurrency: function(value) {
                currency = value;
                $rootScope.$broadcast('currencyChanged');
            }
    	};
    }
    	
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
				url: 'node_modules/md-currency/currencies.json'
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
				url: 'node_modules/md-currency/currencies.json'
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
						url: 'node_modules/md-currency/currencyAPI.json'
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

	function CurrencyController($rootScope,$attrs,sharedCurrency){
		var vm = this;
		vm.amount = $attrs.amount;
		vm.fraction = $attrs.fraction;
		vm.currency = sharedCurrency.getCurrency();
	    $rootScope.$on('currencyChanged', function(event, data) {
	        vm.currency = sharedCurrency.getCurrency();
	    })
	}

	function mdSelectCurrency() {
	    var directive = {
	        restrict: 'EA',
	        template: '<md-select placeholder="<b>{{vm.currency.symbol}}</b> {{vm.currency.short_name}}" ng-model="vm.currency" md-on-open="vm.loadCurrencies()" md-on-close="vm.selectedCurrency()"><md-option ng-value="eachCurrency" ng-repeat="eachCurrency in vm.currencies"><b>{{eachCurrency.symbol}}</b> {{eachCurrency.short_name}}</md-option></md-select>',
	        scope: {
                base: '@base'
            },
	        controller: 'SelectCurrencyController',
	        controllerAs: 'vm',
	        bindToController: true
	    };
	    return directive;
	}

	function mdCurrency() {
	    var directive = {
	        restrict: 'EA',
	        template: "<p><b>{{vm.currency.symbol}}</b>{{vm.amount * vm.currency.rate | currency:' ':vm.fraction}}</p>",
	        scope: {
                amount: '=amount',
                fraction: '=fraction'
            },
	        controller: 'CurrencyController',
	        controllerAs: 'vm',
	        bindToController: true
	    };
	    return directive;
	}
})();