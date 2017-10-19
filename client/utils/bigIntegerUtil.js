const SCIENTIFIC_NOTATION_REQUIRED_LENGTH = 7;

var app = angular.module("AdminApp");

app.factory("BigIntegerUtil", function(StringUtil) {
    return ({
    	abbreviateScientificNotation: abbreviateScientificNotation
    });
    
    function abbreviateScientificNotation(number, placesAfterDecimal = 3, trimTrailingZeros = true) {
    	var result = "0";
		
		if (number && number != result) {
			if (number.length >= SCIENTIFIC_NOTATION_REQUIRED_LENGTH) {
				result = "";
				
				// consider most significant number
				result += number[0];
				
				// consider the next n significant numbers, where n = placesAfterDecimal
				var numbersAfterDecimal = "";
				for (var i=1; i<=placesAfterDecimal; i++) {
					if (i >= number.length) {
						break;
					}
	
					var charToAdd = number[i];
					numbersAfterDecimal += charToAdd;
				}
				if (numbersAfterDecimal) {
					result += "." + numbersAfterDecimal;
				}
	
				// trim trailing zeros if required
				if (trimTrailingZeros) {
					result = StringUtil.trimTrailingZeroes(result);
				}
				
				// append scientific notation
				result += "E+" + (number.length - 1);
	
			} else {
				result = number;
			}
		}

		return result;
	}
});

app.run(function($rootScope, BigIntegerUtil) { 
  $rootScope.BigIntegerUtil = BigIntegerUtil;
});