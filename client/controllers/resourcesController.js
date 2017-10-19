var app = angular.module("AdminApp");

app.controller("ResourcesController", function($rootScope, $scope, UserService) {
	$scope.resourceNamesByCategory = {
		"Default": [
			"Points",
			"Prestige",
			"Premium",
			"CrossEvent"
		],
		"Mission": [
			"Mission1",
			"Mission2",
			"Mission3"
		]
	};
	
	$scope.getResourceCategories = function() {
		var result = [];
		
		for (var category in $scope.resourceNamesByCategory) {
			result.push(category);
		}
		
		//result.sort();
		
		return result;
	};
	
	$scope.getResourceNamesByCategory = function(category) {
		var result = $scope.resourceNamesByCategory[category];
		
		//result.sort();
		
		return result;
	};
	
	$scope.getResourceNames = function() {
		var result = [];
		
		for (var category in $scope.resourceNamesByCategory) {
			var resourceNames = $scope.getResourceNamesByCategory(category);
			if (resourceNames) {
				for (var i=0; i<resourceNames.length; i++) {
					result.push(resourceNames[i]);
				}
			}
		}
		
		return result;
	};

    $scope.addResource = function(resourceName, resourceAmount) {
        $rootScope.isInputLocked = true;
        $rootScope.message.setInfoMessage("Adding " + resourceAmount + " " + resourceName + "...");

        var playFabId = $rootScope.user.getPlayFabId();
        $rootScope.inbox.backupInbox();
        $rootScope.inbox.addResourceInboxItem(resourceName, resourceAmount);
        var changes = $rootScope.inbox.serializeInbox();

        UserService.updateInboxData(playFabId, changes).then(function(success) {
            $rootScope.isInputLocked = false;
            $rootScope.message.setSuccessMessage("Added " + resourceAmount + " " + resourceName);
            $rootScope.user.updateUserDataVersion(success.data);
            
        }, function(error) {
            $rootScope.isInputLocked = false;
            $rootScope.message.setErrorMessage("Failed to add " + resourceAmount + " " + resourceName + "!", error);
            $rootScope.inbox.restoreInbox();
        });
    };
});