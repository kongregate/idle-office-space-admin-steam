var app = angular.module("AdminApp");

app.controller("EventResourcesController", function($rootScope, $scope, UserService) {
    $scope.resourcesForm = {};

    $scope.getEventResourcesInputList = function() {
        if ($scope.resourcesForm.resourcesInput === undefined) {
            var resourcesInput = {
                Points: "0",
                Prestige: "0",
                Event: "0",
                EventUncommon: "0",
                EventRare: "0",
            };
            $scope.resourcesForm.resourcesInput = resourcesInput;
        }
        return $scope.resourcesForm.resourcesInput;
    };

    $scope.getEventResources = function(resourceName) {
        var eventResources = {};
        for (var eventKey in $rootScope.eventUsers) {
            var eventUserModel = $rootScope.eventUsers[eventKey];
            var eventResourceDisplay = eventUserModel.getResource(resourceName);

            var iapSavedStat = eventUserModel.getSavedStat("resource_" + resourceName + "_iap");
            if (iapSavedStat) {
                eventResourceDisplay += ", from IAP = " + iapSavedStat.all;
            }

            eventResources[eventKey] = eventResourceDisplay;
        }
        return eventResources;
    };

    $scope.addEventResource = function(resourceName, resourceAmount) {
        $rootScope.isInputLocked = true;
        $rootScope.message.setInfoMessage("Adding " + resourceAmount + " " + resourceName + " for events...");

        var playFabId = $rootScope.user.getPlayFabId();
        $rootScope.inbox.backupInbox();
        $rootScope.inbox.addEventResourceInboxItem(resourceName, resourceAmount);
        var changes = $rootScope.inbox.serializeInbox();

        UserService.updateInboxData(playFabId, changes).then(function(success) {
            $rootScope.isInputLocked = false;
            $rootScope.message.setSuccessMessage("Added " + resourceAmount + " " + resourceName + " for events");
            $rootScope.user.updateUserDataVersion(success.data);
            
        }, function(error) {
            $rootScope.isInputLocked = false;
            $rootScope.message.setErrorMessage("Failed to add " + resourceAmount + " " + resourceName + " for events!", error);
            $rootScope.inbox.restoreInbox();
        });
    };
});