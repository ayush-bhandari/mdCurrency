(function(){
	'use strict';

	angular
		.module('mdCurrency')
		.service('sharedProperties', function ($rootScope) {
	        var property = [];
			return {
	            getProperty: function () {
	                return property;
	            },
	            setProperty: function(value) {
	                property = value;
	                $rootScope.$broadcast('eventFired', {
                		data: 'something'
            		});
	            }
        	};
    	})
})();