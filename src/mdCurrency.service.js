(function(){
	'use strict';

	angular
		.module('mdCurrency')
		.service('sharedCurrency', function ($rootScope) {
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
    	})
})();