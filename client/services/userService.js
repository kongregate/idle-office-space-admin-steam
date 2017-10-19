var app = angular.module("AdminApp");

app.service("UserService", function($http) {
    return ({
        getAllData: getAllData,
        updateUserData: updateUserData,
        updateInboxData: updateInboxData
    });

    function getAllData(playFabId) {
        return $http.get('/getPlayerCombinedInfo/' + playFabId);
    }

    function updateUserData(playFabId, value) {
        return $http.put('/updateUserData/' + playFabId + '/user', value);
    }

    function updateInboxData(playFabId, value) {
        return $http.put('/updateUserData/' + playFabId + '/adminInbox/', value);
    }
});
