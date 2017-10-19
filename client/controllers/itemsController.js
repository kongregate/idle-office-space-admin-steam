var app = angular.module("AdminApp");

app.controller("ItemsController", function($rootScope, $scope, UserService) {
    $scope.itemsForm = {
        newItemName: null,
        newItemAmount: 0
    };

    $scope.getItemsInputList = function() {
        if ($scope.itemsForm.itemsInput === undefined) {
            var itemsInput = {};
            var existingItems = $rootScope.user.getItems();
            for (var itemName in existingItems) {
                itemsInput[itemName] = 0;
            }

            $scope.itemsForm.itemsInput = itemsInput;
        }
        return $scope.itemsForm.itemsInput;
    };

    $scope.isInventoryEmpty = function() {
        var i = 0;
        var userItems = $rootScope.user.getItems();
        if (userItems) {
            for(var itemName in userItems) { ++i; }
        }
        return (i === 0);
    };

    $scope.isAddNewItemLocked = function() {
        var result = true;
        if (!$rootScope.isInputLocked && 
            $scope.itemsForm.newItemName !== null && $scope.itemsForm.newItemName.length && 
            $scope.itemsForm.newItemAmount > 0) {
            result = false;
        }
        return result;
    };

    $scope.addItem = function(itemName, itemAmount, isNew) {
        $rootScope.isInputLocked = true;
        $rootScope.message.setInfoMessage("Adding " + itemAmount + " " + itemName + "...");

        var playFabId = $rootScope.user.getPlayFabId();
        $rootScope.inbox.backupInbox();
        $rootScope.inbox.addItemInboxItem(itemName, itemAmount);
        var changes = $rootScope.inbox.serializeInbox();

        UserService.updateInboxData(playFabId, changes).then(function(success) {
            $rootScope.isInputLocked = false;
            $rootScope.message.setSuccessMessage("Added " + itemAmount + " " + itemName);
            $rootScope.user.updateUserDataVersion(success.data);

            if (isNew) {
                $scope.itemsForm.itemsInput[$scope.itemsForm.newItemName] = 0;
                $scope.itemsForm.newItemName = null;
                $scope.itemsForm.newItemAmount = 0;
            }
            
        }, function(error) {
            $rootScope.isInputLocked = false;
            $rootScope.message.setErrorMessage("Failed to add "+ itemAmount + " " + itemName + "!", error);
            $rootScope.inbox.restoreInbox();
        });
    };
});