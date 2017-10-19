var app = angular.module("AdminApp", []);

// TODO: route provider?


app.controller("navBarController", function($scope, $window, $interval) {
     $scope.clock = Date.now();
     $interval(function () { $scope.clock = Date.now(); }, 1000);

     $scope.searchPlayers = function() {
        return $window.open("https://developer.playfab.com/en-us/1F6/players", '_blank');
     };
});


app.factory('MessageModel', function() {  
    function MessageModel() {
    }

    MessageModel.prototype = {
        setInfoMessage: function(message) {
            this.messageClass = "alert alert-info";
            this.messageText = message;
        },
        setSuccessMessage: function(message) {
            this.messageClass = "alert alert-success";
            this.messageText = message;
        },
        setErrorMessage: function(message, error) {
            this.messageClass = "alert alert-danger";
            this.messageText = message;
            if (error && error.data) {
                this.messageText += "  errorCode: " + error.data.errorCode;
                this.messageText += ", errorMessage: " + error.data.errorMessage;
                this.messageText += ", errorDetails: " + JSON.stringify(error.data.errorDetails);
            }
            else {
                this.messageText += "  No error message provided";
            }
        }
    };
    return MessageModel;
});


app.controller("messageController", function($rootScope, MessageModel) {
     $rootScope.message = new MessageModel();
});

// confirm dialog directive
app.directive('ngConfirmSubmit', [ function() {
    return {
        link: function (scope, element, attr) {
            element.bind('submit',function (event) {
                var msg = attr.ngConfirmMessage || "Are you sure?";
                if (msg && confirm(msg)) {
                    scope.$apply(attr.ngConfirmSubmit);
                }
            });
        }
    };
}]);