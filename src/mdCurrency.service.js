(function(){
	'use strict';

	angular
		.module('mdCurrency')
		.service('sharedProperties', function () {
	        var property = [];
			return {
	            getProperty: function () {
	                return property;
	            },
	            setProperty: function(value) {
	                property = value;
	            }
        	};
    	})
})();