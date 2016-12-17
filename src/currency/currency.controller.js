(function(){
	'use strict';

	angular
		.module('currency')
		.controller('CurrencyController', CurrencyController);

	function CurrencyController($scope,$attrs,sharedProperties){
		var vm = this;
		vm.amount = $attrs.amount;
		vm.fraction = $attrs.fraction;
		//vm.currency = sharedProperties.getProperty();
		console.log(vm.amount);
		console.log(vm.fraction);
		//console.log(vm.currency);
		 $scope.someFunction = function() {
		        vm.currency = sharedProperties.getProperty();
				console.log(vm.currency);
		
		    }
		    $scope.$on('eventFired', function(event, data) {
		        $scope.someFunction();
		    })
	}
})();