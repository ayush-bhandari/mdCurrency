(function(){
	'use strict';

	angular
		.module('mdCurrency')
		.directive('mdSelectCurrency', mdSelectCurrency);

	function mdSelectCurrency() {
	    var directive = {
	        restrict: 'EA',
	        templateUrl: 'src/selectCurrency/selectCurrency.html',
	        scope: {
                base: '@base'
            },
	        controller: 'SelectCurrencyController',
	        controllerAs: 'vm',
	        bindToController: true
	    };
	    return directive;
	}
})();