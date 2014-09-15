'use strict';

oneApp.controller('KickTrackerCtrl',
  function ($scope, $state, kickCount, KickTrackerService, TasksService,
            storage, $ionicPopup)
  {
    var kickTrackerId = 106;

    console.log('KickTrackerCtrl');

    $scope.numKicks = kickCount;

    $scope.alertKicks = function () {
      $ionicPopup.alert({
        title: 'Kick Tracker',
        template: 'Excellent! You had at least 10 kicks in less than 2 hours. ' +
                  'Things are looking great for you and your baby! Go ahead and ' +
                  'hit OK to mark this task as complete. Please wait at least ' +
                  'two hours before tracking your baby\'s kicks again.'

      }).then(function (response) {
        console.log('closed with response ' + response);
        TasksService.didIt(kickTrackerId)
        .then(function (response) {
          console.log('task closed with response ' + response);
          console.log('The task should have been moved');
          // to force the list to refresh
          storage.set('lastCheckedAt', null);
          // then go back to the active list like when any other task finishes
          $state.go('taskList', {
            status:  'active',
            reload:  true,
            inherit: false,
            notify:  true
          });
        });
      });
    };

    $scope.createKick = function () {
      KickTrackerService.createKick()
      .then(function (response) {
        console.log('response.data is: ', response.data);
        console.log('response.data.numKicks is: ', response.data.numKicks);
        // if the action was a success
        if (response.data.status === 'success') {
          console.log('yay you had a kick');
          // send back the number of kicks to redisplay on the kick tracker
          $scope.numKicks = response.data.numKicks;
          // if we've reached the minimum of 10 kicks, alert the user of baby healthiness
          if ($scope.numKicks >= 10) {
            console.log('There have been more then 10 kicks!');
            $scope.alertKicks();
          }
        // otherwise, the request didn't work and something went wrong
        } else {
          // eventually show an error message, but for now, just log an error
          console.log('boo, something went wrong');
        }
      });
    };

    $scope.resetKicks = function () {
      var resetPopup = $ionicPopup.confirm({
        title: 'Reset Kicks?',
        template: 'Are you sure you want to reset your kicks?'
      });
      resetPopup.then(function (response) {
        if (response) {
          KickTrackerService.resetKicks()
          .then(function (response) {
            console.log('response.data is: ', response.data);
            if (response.data.status === 'success') {
              console.log('yay the reset worked');
              $scope.numKicks = response.data.numKicks;
            } else {
              console.log('boo, something went wrong with resetting kicks');
            }
          });
        }
      });
    };

    $scope.hasReset = function () {
      return (0 < $scope.numKicks) && ($scope.numKicks < 10);
    };

    $scope.hasKickButton = function () {
      return (0 <= $scope.numKicks) && ($scope.numKicks < 10);
    };

    $scope.hasMoveButton = function () {
      return ($scope.numKicks >= 10);
    };

    $scope.completeAction = function () {
      TasksService.didIt(kickTrackerId)
      .then(function (response) {
        console.log('task closed with response ' + response);
        console.log('The task should have been moved');
      });
      // to force the list to refresh
      storage.set('lastCheckedAt', null);
      // then go back to the active list like when any other task finishes
      $state.go('taskList', {
        status:  'active',
        reload:  true,
        inherit: false,
        notify:  true
      });
    };
  }
);
