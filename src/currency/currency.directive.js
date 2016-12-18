(function(){
	'use strict';

	angular
		.module('mdCurrency')
		.directive('mdCurrency', mdCurrency);

	function mdCurrency() {
	    var directive = {
	        restrict: 'EA',
	        templateUrl: 'src/currency/currency.html',
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