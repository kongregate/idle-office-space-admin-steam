var app = angular.module("AdminApp");

app.controller("BankAccountsController", function($rootScope, $scope, UserService) {
    $scope.bankAccountsForm = {};

    $scope.getBankAccountsInputList = function() {
        if ($scope.bankAccountsForm.bankAccountsInput === undefined) {
            var bankAccountsInput = {
                banked_premium: "0"
            };
            $scope.bankAccountsForm.bankAccountsInput = bankAccountsInput;
        }
        return $scope.bankAccountsForm.bankAccountsInput;
    };

    $scope.addBankAccountDeposit = function(accountName, depositAmount) {
        $rootScope.isInputLocked = true;
        $rootScope.message.setInfoMessage("Adding " + depositAmount + " " + accountName + " deposit...");

        var playFabId = $rootScope.user.getPlayFabId();
        $rootScope.inbox.backupInbox();
        $rootScope.inbox.addBankAccountDepositInboxItem(accountName, depositAmount);
        var changes = $rootScope.inbox.serializeInbox();

        UserService.updateInboxData(playFabId, changes).then(function(success) {
            $rootScope.isInputLocked = false;
            $rootScope.message.setSuccessMessage("Added " + depositAmount + " " + accountName + " deposit");
            $rootScope.user.updateUserDataVersion(success.data);
            
        }, function(error) {
            $rootScope.isInputLocked = false;
            $rootScope.message.setErrorMessage("Failed to add " + depositAmount + " " + accountName + " deposit!", error);
            $rootScope.inbox.restoreInbox();
        });
    };
});