var app = angular.module("AdminApp");

app.controller("InboxController", function($rootScope, $scope, UserService) {

    $scope.getAwardTimestampDisplay = function(data) {
        var d = new Date(data.awardTimestamp * 1000);
        return "Added " + d.toUTCString();
    };

    $scope.getClaimTimestampDisplay = function(data) {
        var d = new Date(data.claimTimestamp * 1000);
        return "Claimed " + d.toUTCString();
    };

    $scope.getDataDisplay = function(data) {
        var result = "Unable to parse data";

        if (data) {
            if (data.tags && data.tags.indexOf("AdminGrant") >= 0) {
                if (data.tags.indexOf("Resource") >= 0) {
                    if (data.tags.indexOf("GrantToEvent") >= 0) {
                        result = "Admin Resource Grant (Event), " + data.reward.amount + " " + data.reward.resourceName;   
                    } else {
                        result = "Admin Resource Grant (Core Game), " + data.reward.amount + " " + data.reward.resourceName;
                    }
                } else if (data.tags.indexOf("Item") >= 0) {
                    result = "Admin Item Grant, " + data.reward.count + " " + data.reward.name;
                } else if (data.tags.indexOf("BankAccountDeposit") >= 0) {
                    result = "Admin Bank Account Deposit, " + data.reward.amount + " " + data.reward.accountName;
                } else if (data.tags.indexOf("Worker") >= 0) {
                    result = "Admin Worker Grant, " + data.reward.xp + " " + data.reward.workerName + " XP";
                } else {
                    result = JSON.stringify(data, null, '\t');
                }
            }
        }

        return result;
    };

    $scope.deleteInboxItem = function(index) {
        $rootScope.isInputLocked = true;
        $rootScope.message.setInfoMessage("Deleting Inbox Item...");

        var playFabId = $rootScope.user.getPlayFabId();
        $rootScope.inbox.backupInbox();
        $rootScope.inbox.deleteInboxItem(index);
        var changes = $rootScope.inbox.serializeInbox();

        UserService.updateInboxData(playFabId, changes).then(function(success) {
            $rootScope.isInputLocked = false;
            $rootScope.message.setSuccessMessage("Deleted Inbox Item");
            $rootScope.user.updateUserDataVersion(success.data);
            
        }, function(error) {
            $rootScope.isInputLocked = false;
            $rootScope.message.setErrorMessage("Failed to delete Inbox Item!", error);
            $rootScope.inbox.restoreInbox();
        });
    };
});