var app = angular.module("AdminApp");

app.controller("UserController", function($rootScope, $scope, $window, UserModel, InboxModel, UserService) {
    $scope.userForm = {
        id: "",
        showFlags: false,
        showCounters: false,
        showTimers: false,
        showTags: false,
        showGameLogs: false
    };

    $scope.showEventHistory = function() {
        var url = "https://developer.playfab.com/en-us/1F6/players/" + $rootScope.user.getPlayFabId() + "/event-history";
        $window.open(url, '_blank');
    };

    $scope.showIAPs = function() {
        var url = "https://developer.playfab.com/en-us/1F6/players/" + $rootScope.user.getPlayFabId() + "/purchases";
        $window.open(url, '_blank');
    };
    
    $scope.getTimestampDisplay = function(timestamp) {
        var d = new Date(timestamp * 1000);
        return d.toUTCString();
    };

    $scope.fetchUser = function() {
        $rootScope.isInputLocked = true;
        $rootScope.message.setInfoMessage("Fetching user " + $scope.userForm.id + "...");
        $rootScope.user = null;
        $rootScope.inbox = null;

        UserService.getAllData($scope.userForm.id).then(function(success) {
            $rootScope.isInputLocked = false;
            $rootScope.message.setSuccessMessage("Found user " + $scope.userForm.id);

            // create user model for core game data
            $rootScope.user = new UserModel(success.data, "user");

            // create user models for event data
            $rootScope.eventUsers = {};
            for (var key in success.data.InfoResultPayload.UserData) {
                if (key !== "user" && key !== "inbox" && key !== "adminInbox") {
                    $rootScope.eventUsers[key] = new UserModel(success.data, key);
                }
            }

            // create inbox model
            $rootScope.inbox = new InboxModel(success.data);
            
        }, function(error) {
            $rootScope.isInputLocked = false;
            $rootScope.message.setErrorMessage("Unable to find user " + $scope.userForm.id + "!", error);
        });
    };
});