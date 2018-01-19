(function() {
	'use strict';
	
	angular
		.module('warehouse.document')
		.directive('documentDirective', documentDirective);

	function documentDirective() {
		var documentDirective = {
			templateUrl: 'app/components/document/table-settings.html',
			restrict: 'E',
			scope: {
				"data": "="
			}
		};
		return documentDirective;
	}
})();