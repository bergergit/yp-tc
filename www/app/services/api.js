// This is the main Api service, used to communicate with backend endpoints
angular.module('yp.services', []).service('Api', ['$resource', 'env', '$localStorage', '$q', 'moment',
    function ($resource, env, $localStorage, $q, moment) {

        // finds a message by ID, in local storage messages
        var _findLocalMessageById = function(id) {
            for (var i = 0; i < $localStorage.messages.length; i++) {
                if ($localStorage.messages[i]._id === id) return $localStorage.messages[i];
            }
            return { new: true };
        }

        // removes from local storage, all messages that don't exist in remote server anymore
        var _removeOrphanMessages = function(messages) {
            if (messages && $localStorage.messages) {
                var serverIds = [];
                for (var i = 0; i < messages.length; i++) {
                    serverIds.push(messages[i]._id);
                }
                for (var i = 0; i < $localStorage.messages.length; i++) {
                    if (serverIds.indexOf($localStorage.messages[i]._id) === -1) {
                        $localStorage.messages.splice(i, 1);
                        i--;
                    }
                }
            }
        }

        // merges the messages from the server, with the ones from local storage
        var _mergeMessages = function (messages) {
            // if (!$localStorage.messages) $localStorage.messages = messages || [];
            if (!$localStorage.messages) $localStorage.messages = [];
            if (messages) {
                for (var i = 0; i < messages.length; i++) {
                    var localMessage = _findLocalMessageById(messages[i]._id);

                    // message data is also merged with local message, giving a chance for the message to be updated by the server
                    localMessage.read = localMessage.read || false;
                    localMessage.timeReceived = localMessage.timeReceived || moment();
                    localMessage = Object.assign(localMessage, messages[i]);
                    
                    // message not found in local storage. increase newMessages count in local storage, and add it to local storage array
                    if (localMessage.new) {
                        $localStorage.newMessages = $localStorage.newMessages + 1;
                        localMessage.new = false;
                        $localStorage.messages.unshift(localMessage);
                    }
                }
            } 

            return $localStorage.messages;
        }

        var service = {
            // this method retrives all messaged from the server, and compares with a local copy, to find out if there is a new message
            getAllMessages: function () {
                var defer = $q.defer();
                if ($localStorage.newMessages === undefined) {
                    $localStorage.newMessages = 0;
                }
                // $localStorage = $localStorage.$default({ newMessages: 0 });

                // retrieves messages from the server
                $resource(env.apiURL + '/messages/:id', { id: '@_id' }).query().$promise
                .then(function (messages) {
                    console.log('got messages', messages);
                    _removeOrphanMessages(messages);
                    defer.resolve(service._mergeMessages(messages));
                })
                .catch(function(error) {
                    // a server error will still return local messages
                    defer.resolve($localStorage.messages || []);
                });

                return defer.promise;
            },

            _mergeMessages: _mergeMessages
        }

        return service;

    }]);