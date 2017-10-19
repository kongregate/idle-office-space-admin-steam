var app = angular.module("AdminApp");

app.factory("StringUtil", function() {
    return ({
    	trimTrailingZeroes: trimTrailingZeroes
    });
    
    function trimTrailingZeroes(value) {
    	var result = value;
		
    	// only trim if there's a decimal place
		if (value.indexOf('.') >= 0) {
			while ((value.slice(-1) === '0' || value.slice(-1) === '.') && value.indexOf('.') !== -1) {
		        value = value.substr(0, value.length - 1);
		    }
		}

		return result;
	}
});

app.run(function($rootScope, StringUtil) { 
  $rootScope.StringUtil = StringUtil;
});