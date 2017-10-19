var app = angular.module("AdminApp");

app.factory('InboxModel', function() {  
    function InboxModel(modelData) {
        if (modelData) {
            angular.extend(this, modelData);
            
            if (this.InfoResultPayload.UserData.adminInbox && this.InfoResultPayload.UserData.adminInbox.Value) {
                this.DeserializedData = JSON.parse(this.InfoResultPayload.UserData.adminInbox.Value);
            }
            else {
                this.DeserializedData = {};
                this.DeserializedData.inboxItems = [];
            }

            console.log("InboxModel " + this.getPlayFabId());
            console.log(this);
        }
    }

    InboxModel.prototype = {
        getPlayFabId: function() {
            return this.PlayFabId;
        },
        backupInbox: function() {
            this.BackupData = JSON.stringify(this.DeserializedData);
        },
        restoreInbox: function() {
            if (this.BackupData !== undefined) {
                this.DeserializedData = JSON.parse(this.BackupData);

                delete this.BackupData;
            }
        },
        serializeInbox: function() {
            return JSON.stringify(this.DeserializedData);
        },
        isInboxEmpty: function() {
            var result = true;
            if (this.DeserializedData.inboxItems) {
                result = (this.DeserializedData.inboxItems.length <= 0);
            }
            return result;
        },
        getInboxItems: function() {
            var result = [];
            if (this.DeserializedData.inboxItems) {
                result = this.DeserializedData.inboxItems;
            }
            return result;
        },
        deleteInboxItem: function(index) {
            if (this.DeserializedData.inboxItems !== undefined &&
                index < this.DeserializedData.inboxItems.length) {
                this.DeserializedData.inboxItems.splice(index, 1);
            }
        },
        addInboxItem: function(data) {
            if (this.DeserializedData.inboxItems === undefined) {
                this.DeserializedData.inboxItems = [];
            }

            data.awardTimestamp = Math.floor(Date.now() / 1000);
            this.DeserializedData.inboxItems.push(data);
        },
        isInboxItemClaimed: function(data) {
            return (data && data.claimTimestamp > 0);
        },
        addResourceInboxItem: function(resourceName, resourceAmount) {
            var reward = {
                "$type": "ResourceReward",
                "resourceName": resourceName,
                "amount": resourceAmount
            };

            var data = {
                reward: reward,
                tags: ["AdminGrant", "Resource"]
            };
            this.addInboxItem(data);
        },
        addEventResourceInboxItem: function(resourceName, resourceAmount) {
            var reward = {
                "$type": "ResourceReward",
                "gameMode": "UserEvent",
                "resourceName": resourceName,
                "amount": resourceAmount
            };

            var data = {
                reward: reward,
                tags: ["AdminGrant", "GrantToEvent", "Resource"]
            };
            this.addInboxItem(data);
        },
        addItemInboxItem: function(itemName, itemAmount) {
            var reward = {
                "$type": "ItemReward",
                "name": itemName,
                "count": itemAmount
            };

            var data = {
                reward: reward,
                tags: ["AdminGrant", "Item"]
            };
            this.addInboxItem(data);
        },
        addBankAccountDepositInboxItem: function(accountName, depositAmount) {
            var reward = {
                "$type": "BankAccountDepositReward",
                "accountName": accountName,
                "amount": depositAmount
            };

            var data = {
                reward: reward,
                tags: ["AdminGrant", "BankAccountDeposit"]
            };
            this.addInboxItem(data);
        },
        addWorkerXPInboxItem: function(workerName, xp) {
            var reward = {
                "$type": "WorkerXPReward",
                "workerName": workerName,
                "xp": xp
            };

            var data = {
                reward: reward,
                tags: ["AdminGrant", "Worker"]
            };
            this.addInboxItem(data);
        }
    };

    return InboxModel;
});