(function(){
	'use strict';

	angular
		.module('currency')
		.controller('CurrencyController', CurrencyController);

	function CurrencyController($attrs,sharedProperties){
		var vm = this;
		vm.amount = $attrs.amount;
		vm.fraction = $attrs.fraction;
		vm.currency = sharedProperties.getProperty();
		console.log(vm.amount);
		console.log(vm.fraction);
		console.log(vm.currency);
	}
})();