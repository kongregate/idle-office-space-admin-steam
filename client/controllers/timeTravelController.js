var app = angular.module("AdminApp");

app.controller("TimeTravelController", function($rootScope, $scope, UserService) {
    $scope.timeTravelForm = {
        inputValue: 0
    };

    $scope.modifyInputValue = function(value) {
        $scope.timeTravelForm.inputValue += value;
    };

    $scope.getTimeTravelInputDisplay = function() {
        return "You'll time travel " + formatDuration($scope.timeTravelForm.inputValue) + " (" + formatDate($scope.timeTravelForm.inputValue) + ")";
    };

    $scope.getTimeTravelDisplay = function() {
        var value = $rootScope.user.getTimer("timeTravel");

        if (value !== 0) {
            var message = "You're time travelling " + formatDuration(value);
            message += " (" +  formatDate(value) + ")";
            return message;
        }
        else {
            return "Time travel is off, Marty.";
        }
    };

    $scope.updateTimeTravel = function() {
        $rootScope.isInputLocked = true;
        $rootScope.message.setInfoMessage("Updating Time Travel to " + $scope.timeTravelForm.inputValue + " secs...");

        var playFabId = $rootScope.user.getPlayFabId();
        $rootScope.user.backupUser();
        $rootScope.user.setTimer("timeTravel", $scope.timeTravelForm.inputValue);
        var changes = $rootScope.user.serializeUser();

        UserService.updateUserData(playFabId, changes).then(function(success) {
            $rootScope.isInputLocked = false;
            $rootScope.message.setSuccessMessage("Updated Time Travel to " + $scope.timeTravelForm.inputValue + " secs");
            $rootScope.user.updateUserDataVersion(success.data);
            
        }, function(error) {
            $rootScope.isInputLocked = false;
            $rootScope.message.setErrorMessage("Failed to update Time Travel to " + $scope.timeTravelForm.inputValue + " secs!", error);
            $rootScope.user.restoreUser();
        });
    };

    formatDuration = function(inSecs) {
        var isNegative = (inSecs < 0);
        inSecs = Math.abs(inSecs);
        
        var days  = Math.floor(inSecs / 86400);
        var hours = Math.floor((inSecs - (days * 86400)) / 3600);
        var mins  = Math.floor((inSecs - (days * 86400) - (hours * 3600)) / 60);
        var secs  = inSecs - (days * 86400) - (hours * 3600) - (mins * 60);

        var result = (isNegative) ? "-" : "";
        var firstInput = true;
        
        if (days > 0) {
            if (firstInput) { firstInput = false; }
            else { result += ", "; }
            result += days + "d";
        }

        if (hours > 0) {
            if (firstInput) { firstInput = false; }
            else { result += ", "; }
            result += hours + "h";
        }
        
        if (mins > 0) {
            if (firstInput) { firstInput = false; }
            else { result += ", "; }
            result += mins + "m";
        }
        
        if (firstInput) { firstInput = false; }
        else { result += ", "; }
        result += secs + "s";

        return result;
    };

    formatDate = function(inSecs) {
        var d = new Date();
        d.setSeconds(d.getSeconds() + inSecs);
        return d.toUTCString();
    };
});