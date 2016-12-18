(function(){
	'use strict';

	angular
		.module('mdCurrency')
		.controller('CurrencyController', CurrencyController);

	function CurrencyController($rootScope,$attrs,sharedCurrency){
		var vm = this;
		vm.amount = $attrs.amount;
		vm.fraction = $attrs.fraction;
		vm.currency = sharedCurrency.getCurrency();
	    $rootScope.$on('currencyChanged', function(event, data) {
	        vm.currency = sharedCurrency.getCurrency();
	    })
	}
})();