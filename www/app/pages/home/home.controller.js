// Controls home page, that contains profile and message buttons
angular.module('yp.controllers').controller('HomeController', ['$state', '$localStorage', '$cordovaCamera', '$ionicActionSheet', 'Api', 'env',
    function ($state, $localStorage, $cordovaCamera, $ionicActionSheet, Api, env) {

        var vm = this;
        vm.$storage = $localStorage;

        Api.getAllMessages();

        // go to Messages screen
        vm.goToMessages = function () {
            $state.go('app.messages');
        }

        // opens Device's gallery to select a picture, using Cordova Camera plugin
        vm.selectPictureFromGallery = function () {
            document.addEventListener("deviceready", function () {
                var options = {
                    quality: 50,
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                    allowEdit: true,
                    encodingType: Camera.EncodingType.JPEG,
                    targetWidth: 100,
                    targetHeight: 100,
                    popoverOptions: CameraPopoverOptions,
                    saveToPhotoAlbum: false,
                    correctOrientation: true
                };

                $cordovaCamera.getPicture(options).then(function (imageData) {
                    // temporary adding the image as a base64 value to localStorage
                    $localStorage.profilePictureUrl = "data:image/jpeg;base64," + imageData;
                    var image = document.getElementById('profile-picture');
                    image.src = $localStorage.profilePictureUrl;

                    uploadPicture();
                }, function (err) {
                    console.error(err);
                });
            }, false);
        }

        // when there is a picture, presents actions to change picture or remove it
        vm.showProfilePictureAction = function () {
            var hideSheet = $ionicActionSheet.show({
                buttons: [
                    { text: 'Change picture' },
                ],
                destructiveText: 'Delete picture',
                // titleText: 'Modify your picture',
                cancelText: 'Cancel',
                buttonClicked: function (index) {
                    vm.selectPictureFromGallery();
                    hideSheet();
                },
                destructiveButtonClicked: function (index) {
                    removePicture();
                    hideSheet();
                }
            });
        }

        // Opens a web socket with the server, and listens to new messages
        var watchForMessages = function() {
            var ws = new WebSocket(env.wsServer);
            ws.onmessage = function (event) {
                if (event.data && event.data === 'message') {
                    Api.getAllMessages().then(function() {
                        vm.$storage = $localStorage;
                    });
                }
            };
        }

        watchForMessages();

        // uploads picture to remote server and save the url in local storage
        var uploadPicture = function () {
            Api.uploadPicture($localStorage.profilePictureUrl).then(function(response) {
                console.log('picture uploaded. got url: ' + response.url);
                // updating localStorage with the full picture URL
                $localStorage.profilePictureUrl = response.url;
            });
        }

        // delete pictureUrl from local
        var removePicture = function () {
            console.log('removing picture...');

            vm.hasProfilePicture = false;
            $localStorage.profilePictureUrl = null;
        }

    }]);