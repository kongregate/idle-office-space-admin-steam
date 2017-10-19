var app = angular.module("AdminApp");

app.controller("WorkersController", function($rootScope, $scope, UserService) {
	$scope.workerNamesByCategory = {
		"Default": [
			"Anne",
			"BobPorter",
			"BobSlydell",
			"Brian",
			"Dom",
			"Drew",
			"DrSwanson",
			"FemaleTemp",
			"Joanna",
			"Laura",
			"Lawrence",
			"Lumbergh",
			"Michael",
			"Milton",
			"Nina",
			"Peggy",
			"Peter",
			"Rob",
			"Samir",
			"Stan",
			"Steve",
			"Tom"
		],
		"Kungfu": [
			"Anne_Kungfu",
			"BobPorter_Kungfu",
			"BobSlydell_Kungfu",
			"Brian_Kungfu",
			"Dom_Kungfu",
			"Drew_Kungfu",
			"DrSwanson_Kungfu",
			"FemaleTemp_Kungfu",
			"Joanna_Kungfu",
			"Laura_Kungfu",
			"Lawrence_Kungfu",
			"Lumbergh_Kungfu",
			"Michael_Kungfu",
			"Milton_Kungfu",
			"Nina_Kungfu",
			"Peggy_Kungfu",
			"Peter_Kungfu",
			"Rob_Kungfu",
			"Samir_Kungfu",
			"Stan_Kungfu",
			"Steve_Kungfu",
			"Tom_Kungfu"
		],
		"Hawaii": [
			"BobPorter_Hawaii",
			"BobSlydell_Hawaii",
			"Brian_Hawaii",
			"Dom_Hawaii",
			"Drew_Hawaii",
			"DrSwanson_Hawaii",
			"FemaleTemp_Hawaii",
			"Joanna_Hawaii",
			"Lawrence_Hawaii",
			"Lumbergh_Hawaii",
			"Michael_Hawaii",
			"Milton_Hawaii",
			"Nina_Hawaii",
			"Peter_Hawaii",
			"Rob_Hawaii",
			"Samir_Hawaii",
			"Stan_Hawaii",
			"Steve_Hawaii",
			"Tom_Hawaii"
		],
		"Sports": [
			"BobPorter_Sports",
			"BobSlydell_Sports",
			"Brian_Sports",
			"Dom_Sports",
			"Drew_Sports",
			"DrSwanson_Sports",
			"FemaleTemp_Sports",
			"Joanna_Sports",
			"Lawrence_Sports",
			"Lumbergh_Sports",
			"Michael_Sports",
			"Milton_Sports",
			"Nina_Sports",
			"Peter_Sports",
			"Rob_Sports",
			"Samir_Sports",
			"Stan_Sports",
			"Steve_Sports",
			"Tom_Sports"
		],
		"Summer": [
			"BobPorter_Summer",
			"BobSlydell_Summer",
			"Brian_Summer",
			"Dom_Summer",
			"Drew_Summer",
			"DrSwanson_Summer",
			"FemaleTemp_Summer",
			"Joanna_Summer",
			"Lawrence_Summer",
			"Lumbergh_Summer",
			"Michael_Summer",
			"Milton_Summer",
			"Nina_Summer",
			"Peter_Summer",
			"Rob_Summer",
			"Samir_Summer",
			"Stan_Summer",
			"Steve_Summer",
			"Tom_Summer"
		]
	};
	
	$scope.getWorkerCategories = function() {
		var result = [];
		
		for (var category in $scope.workerNamesByCategory) {
			result.push(category);
		}
		
		result.sort();
		
		return result;
	};
	
	$scope.getWorkerNamesByCategory = function(category) {
		var result = $scope.workerNamesByCategory[category];
		
		result.sort();
		
		return result;
	};
	
	$scope.getWorkerNames = function() {
		var result = [];
		
		for (var category in $scope.workerNamesByCategory) {
			var workerNames = $scope.getWorkerNamesByCategory(category);
			if (workerNames) {
				for (var i=0; i<workerNames.length; i++) {
					result.push(workerNames[i]);
				}
			}
		}
		
		return result;
	};
	
	$scope.getWorkerLevel = function(workerName) {
		var result = 0;
		var worker = $rootScope.user.getWorker(workerName);
		if (worker) {
			result = worker.level;
		}
		return result;
	};
	
	$scope.getWorkerXP = function(workerName) {
		var result = 0;
		var worker = $rootScope.user.getWorker(workerName);
		if (worker) {
			result = worker.xp;
		}
		return result;
	};
	
	$scope.addWorkerXP = function(workerName, xp) {
		$rootScope.isInputLocked = true;
		$rootScope.message.setInfoMessage("Adding " + xp + " XP to " + workerName + "...");

		var playFabId = $rootScope.user.getPlayFabId();
		$rootScope.inbox.backupInbox();
		$rootScope.inbox.addWorkerXPInboxItem(workerName, xp);
		var changes = $rootScope.inbox.serializeInbox();

		UserService.updateInboxData(playFabId, changes).then(function(success) {
			$rootScope.isInputLocked = false;
			$rootScope.message.setSuccessMessage("Added " + xp + " XP to " + workerName);
			$rootScope.user.updateUserDataVersion(success.data);
			
		}, function(error) {
			$rootScope.isInputLocked = false;
			$rootScope.message.setErrorMessage("Failed to add " + xp + " XP to " + workerName + "!", error);
			$rootScope.inbox.restoreInbox();
		});
	};
});