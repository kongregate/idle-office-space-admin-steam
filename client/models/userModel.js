var app = angular.module("AdminApp");

app.factory('UserModel', function() {  
    function UserModel(modelData, key) {
        if (modelData) {
            angular.extend(this, modelData);

            if (this.InfoResultPayload) {
                // deserialise user data
                if (this.InfoResultPayload.UserData[key] && this.InfoResultPayload.UserData[key].Value) {
                    this.DeserializedData = JSON.parse(this.InfoResultPayload.UserData[key].Value);
                    this.isOnDeprecatedVersion = false;
                } else {
                    this.DeserializedData = {};
                    this.isOnDeprecatedVersion = true;
                }

                this.KongregateId = "N/A";
                this.KongregateName = "N/A";
                if (this.InfoResultPayload.AccountInfo && this.InfoResultPayload.AccountInfo.KongregateInfo) {
                    var kongInfo = this.InfoResultPayload.AccountInfo.KongregateInfo;
                    if (kongInfo.KongregateId) {
                        this.KongregateId = kongInfo.KongregateId;
                    }
                    if (kongInfo.KongregateName) {
                        this.KongregateName = kongInfo.KongregateName;
                    }
                }

                this.isCheater = false;
                if (this.InfoResultPayload.UserReadOnlyData) {
                    var readOnlyData = this.InfoResultPayload.UserReadOnlyData;
                    if (readOnlyData.isCheater) {
                        this.isCheater = true;
                    }
                }
            }

            console.log("UserModel " + this.getPlayFabId() + ", key = " + key);
            console.log(this);
        }
    }

    UserModel.prototype = {
        getPlayFabId: function() {
            return this.PlayFabId;
        },
        getUserDataVersion: function() {
            return this.InfoResultPayload.UserDataVersion;
        },
        updateUserDataVersion: function(data) {
            if (data.DataVersion) {
                this.InfoResultPayload.UserDataVersion = data.DataVersion;
            }
        },
        getKongregateId: function() {
            return this.KongregateId;
        },
        getKongregateName: function() {
            return this.KongregateName;
        },
        backupUser: function() {
            this.BackupData = JSON.stringify(this.DeserializedData);
        },
        restoreUser: function() {
            if (this.BackupData !== undefined) {
                this.DeserializedData = JSON.parse(this.BackupData);

                delete this.BackupData;
            }
        },
        serializeUser: function() {
            return JSON.stringify(this.DeserializedData);
        },
        getResource: function(resourceType) {
            var result = "0";
            if (this.DeserializedData.resources && this.DeserializedData.resources[resourceType]) {
                result = this.DeserializedData.resources[resourceType];
            }
            return result;
        },
        getBankAccountAmount: function(accountName) {
            var result = "0";
            if (this.DeserializedData.bankAccounts && this.DeserializedData.bankAccounts[accountName]) {
                result = this.DeserializedData.bankAccounts[accountName];
            }
            return result;
        },
        getItems: function() {
            var result = {};
            if (this.DeserializedData.items) {
                result = this.DeserializedData.items;
            }
            return result;
        },
        getItem: function(itemName) {
            var result = 0;
            if (this.DeserializedData.items && this.DeserializedData.items[itemName]) {
                result = this.DeserializedData.items[itemName];
            }
            return result;
        },
        getFlags: function() {
            var result = {};
            if (this.DeserializedData.flags) {
                result = this.DeserializedData.flags;
            }
            return result;
        },
        getCounters: function() {
            var result = {};
            if (this.DeserializedData.counters) {
                result = this.DeserializedData.counters;
            }
            return result;
        },
        getTimers: function() {
            var result = {};
            if (this.DeserializedData.timers) {
                result = this.DeserializedData.timers;
            }
            return result;
        },
        getTimer: function(key) {
            var result = 0;
            if (this.DeserializedData.timers !== undefined && 
                this.DeserializedData.timers[key] !== undefined) {
                result = this.DeserializedData.timers[key];
            }
            return result;
        },
        setTimer: function(key, value) {
            if (this.DeserializedData.timers === undefined) {
                this.DeserializedData.timers = {};
            }

            this.DeserializedData.timers[key] = value;
        },
        getTags: function() {
            var result = {};
            if (this.DeserializedData.tags) {
                result = this.DeserializedData.tags;
            }
            return result;
        },
        getGameLogs: function() {
            var result = {};
            if (this.DeserializedData.gameLogs) {
                result = this.DeserializedData.gameLogs;
            }
            return result;
        },
        getSavedStat: function(statName) {
            var result = null;
            if (this.DeserializedData.savedStats && this.DeserializedData.savedStats[statName]) {
                result = this.DeserializedData.savedStats[statName];
            }
            return result;
        },
        getWorkers: function() {
			var result = [];
			if (this.DeserializedData.workers) {
				result = this.DeserializedData.workers;
			}
			return result;
		},
		getWorker: function(workerName) {
			var result = null;
			var workers = this.getWorkers();
			if (workers) {
				for (var i=0; i<workers.length; i++) {
					var worker = workers[i];
					if (worker && worker.name == workerName) {
						result = worker;
						break;
					}
				}
			}
			return result;
		}
    };
    return UserModel;
});