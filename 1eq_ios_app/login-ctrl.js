'use strict';

oneApp.controller('LoginCtrl',
  function ($scope, $http, $window, $rootScope, $state, $ionicPopup, $ionicViewService,
            SessionsService, storage, UsersService, PushService)
  {
    // console.log("LoginCtrl");

    // If they're logged in they shouldn't be here
    if (storage.get('auth_token')) { $state.go('taskList', {status: 'active', showOptionButtons: 'false'}); }

    $scope.connectionInProgress = '';

    $scope.login = function (user) {
      if (!(user.email && user.password)) { return false; }

      // Get the push token from when the app registered for
      // notifications upon opening. Do this before you clear
      // the storage from anything that might have carried over
      $scope.deviceToken = storage.get('deviceToken');
      console.log("in the login, the device token is: ", $scope.deviceToken);
      
      // Reset anything that might have carried over
      storage.clearAll();
      // Make the 'Log In' button disabled
      $scope.connectionInProgress = 'disabled';
      // Hide keyboard
      if (window.cordova) {
        window.cordova.plugins.Keyboard.close();
      }
    
      var parsedUser = {
        email: user.email
      , password: user.password
      };

      if (user.remember) {
        parsedUser.clientToken = '40VJrTt2g60M4u9L6aocCe5owdIhzInd0K5OUy9emewCn0dPC0CClxnolWtE7kHc';
        storage.set('rememberLogin', true);
      }

      SessionsService.login(parsedUser)
      .success(function (data) {
        if (data.authenticated) {
          var da = data.authenticated;

          /* jshint ignore:start */
          storage.set('auth_token', da.token.key);
          storage.set('token_exp', da.token.expires_at);
          storage.set('user_created_at', da.user_created_at);
          storage.set('user_first_name', da.first_name);
          storage.set('user_last_name', da.last_name);
          storage.set('user_email', da.email);
          storage.set('user_id', da.id);
          storage.set('user_ftue', da.ftue);
          /* jshint ignore:end */

          console.log("this is the device token", $scope.deviceToken);
          if ($scope.deviceToken) {
            console.log("trying to call the web service");
            PushService.saveDeviceToken({
              token: $scope.deviceToken,
              email: da.email
            })
            .success(function (data) {
              console.log("saved the device token on login");
              console.log(data);
            })
            .error(function() {
              console.log("the device token was not saved");
            });
          }
            
          console.log(da);
          if (da.ftue && da.ftue === 1) {
            console.log('user is a first time user, sending them to the welcome page');
            $state.go('ftueWelcome', {
              status: 'active',
              reload: true,
              inherit: false,
              notify: true
            });
          } else {
            $state.go('taskList', {
              status: 'active',
              reload: true,
              inherit: false,
              notify: true
            });
          }
        } else {
          // in case of failed login, still retain the device token
          storage.set('deviceToken', $scope.deviceToken);
          console.log(data.errors);
          loginAlert();
        }
      })
      .error(function () { loginAlert(); });
    };

    var loginAlert = function () {
      $scope.connectionInProgress = false;
      $ionicPopup.alert({
        title: 'Login Error',
        content: 'Please try again'
      }).then(function (res) {
        console.log('Trying to sign in again');
        console.log(res);
      });
    };
  }
);
