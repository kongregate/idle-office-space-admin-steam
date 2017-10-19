var getPlayerCombinedInfo = function(request, response) {
	var playFabAPI = request.app.locals.playFabAPI;
	var playFabId = request.params.id;

	var payload = {
		PlayFabId: playFabId,
		InfoRequestParameters: {
			GetUserAccountInfo: true,
			GetUserData: true,
			GetUserReadOnlyData: true
		}
	};

	console.log("getPlayerCombinedInfo: " + playFabId);
	playFabAPI.GetPlayerCombinedInfo(payload, function(error, result) {
		if (result) {
			console.log("getPlayerCombinedInfo success!");
			response.status(result.code).json(result.data);
		}
		else if (error) {
			console.log("getPlayerCombinedInfo error! " + JSON.stringify(error));
			response.status(error.code).json(error);
		}
	});
};
exports.getPlayerCombinedInfo = getPlayerCombinedInfo;

var updateUserData = function(request, response) {
	var playFabAPI = request.app.locals.playFabAPI;
	var playFabId = request.params.id;
	var data = {};
	data[request.params.key] = JSON.stringify(request.body);
	
	var payload = {
		PlayFabId: playFabId,
		Data: data
	};

	console.log("updateUserData: " + JSON.stringify(payload));
	playFabAPI.UpdateUserData(payload, function(error, result) {
		if (result) {
			console.log("updateUserData success! ");
			response.status(result.code).json(result.data);
		}
		else if (error) {
			console.log("updateUserData error! " + JSON.stringify(error));
			response.status(error.code).json(error);
		}
	});
};
exports.updateUserData = updateUserData;

