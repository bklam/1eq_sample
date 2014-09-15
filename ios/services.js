'use strict';

oneApp.service('SessionsService', function ($http, $q, $window, APIURL, PLATFORMURL) {
  // console.log('SessionsService');
  var url         = APIURL + 'sessions'
    , platformUrl = PLATFORMURL + 'api';

  return {
    login:           function (user) { return $http.post(url + '/create', user); },
    logout:          function ()     { return $http.delete(url + '/destroy'); },
    whoami:          function ()     { return $http.get(url + '/whoami'); },
    getintegrations: function ()     { return $http.get(platformUrl + '/integrations.php'); }
  };
});


oneApp.service('VersionService', function ($http, $q, $window, PLATFORMURL) {
  // console.log('UsersService');
  var url = PLATFORMURL + 'api/';

  return {
    isVersionLive: function () {
      console.log('isVersionLive');
      try {
        console.log(cordova.getAppVersion);
        cordova.getAppVersion(function (version) {
          console.log('version:');
          console.log(version);

          return $http.post(url + '/version.php', version);
        });
      } catch (e) {
        console.log(e);
        return false;
      }
    }
  };
});


oneApp.service('UsersService', function ($http, $q, $window, APIURL, PLATFORMURL) {
  // console.log('UsersService');
  var url = APIURL + 'users';
  var platformUrl = PLATFORMURL + 'api';

  return {
    update:           function (user)  { return $http.post(url + '/update', user); },
    resetpassword:    function (email) { return $http.get(url + '/reset-password?email=' + email); },
    getEDD:           function ()      { return $http.post(platformUrl + '/users.php', {task: 'edd'}); },
    getMsgStatus:     function ()      { return $http.post(platformUrl + '/users.php', {task: 'msg-status'}); },
    completeFTUE:     function ()      { return $http.post(url + '/completeFTUE'); }
  };
});

// Shared data from settings needed by different controllers
oneApp.service('TasksService', function ($http, $q, $window, PLATFORMURL, storage) {
  // console.log('TasksService');
  var url = PLATFORMURL + 'api/';

  return {
    getTasks: function () {
      var deferred = $q.defer();

      var groupTasksByCampaign = function (statusGroup) {
        var grouped = []
          , campaign = {}
          , previous;
        _.each(statusGroup, function (obj) {
          //If this is a new campaign we don't have stored already
          if (obj.campaign_id !== campaign.id) { // jshint ignore:line

            //campaign is initially empty
            if (!_.isEmpty(campaign)) { grouped.push(campaign); }

            /* jshint ignore:start */
            campaign = {
              id : obj.campaign_id
            , name : obj.campaign_name
            , tasks : [obj]
            };
            /* jshint ignore:end */
          } else {
            if (!_.isEmpty(campaign)) {
              campaign.tasks.push(obj);
            }
          }
        });
        grouped.push(campaign);
        return grouped;
      };

      $http.get(url + 'tasks.php')
      .success(function (response) {
        storage.set(
          'completedTasks',
          groupTasksByCampaign(response.completed)
        );
        storage.set(
          'activeTasks',
          groupTasksByCampaign(response.assigned)
        );
        storage.set(
          'skippedTasks',
          groupTasksByCampaign(response.skipped)
        );
        storage.set('lastCheckedAt', Date.now());
        deferred.resolve('success');
      })
      .error(function (error) {
        deferred.reject('error');
      });

      return deferred.promise;
    },
    didIt: function (taskId) {
      return $http.post(url + 'actions.php', { task: 'finishedActionItem', actionId: taskId });
    },
    skipIt: function (taskId) {
      return $http.post(url + 'actions.php', { task: 'skippedActionItem', actionId: taskId });
    },
    reopen: function (taskId) {
      return $http.post(url + 'actions.php', { task: 'reopenedActionItem', actionId: taskId });
    }

  };
});

oneApp.service('MessagesService', function ($http, PLATFORMURL) {
  var url = PLATFORMURL + 'api/messages.php';

  return {
    conversations: function ()        { return $http.get(url + '?folder=inbox'); },
    conversation:  function (uuid)    { return $http.get(url + '?userId=' + uuid); },
    send:          function (message) { return $http.post(url, message); }
  };
});

oneApp.service('ResourcesService', function ($http, $q, $window, PLATFORMURL) {
  var url = PLATFORMURL
    , resources = {
      backPain:      { file: 'back-pain', title: 'Back Pain'}
    , breastfeeding: { file: 'breastfeeding', title: 'Breastfeeding'}
    , constipation:  { file: 'constipation', title: 'Constipation'}
    , cordBlood:     { file: 'cord-blood', title: 'Cord Blood'}
    , deliveryBag:   { file: 'delivery-bag', title: 'Delivery Bag'}
    , eatingRight:   { file: 'eating-right', title: 'Eating Right'}
    , exercise:      { file: 'exercise', title: 'Exercise After Pregnancy'}
    , flu:           { file: 'flu', title: 'Flu and Pregnancy'}
    , genetics:      { file: 'genetics', title: 'Genetic Options'}
    , strep:         { file: 'group-b-strep', title: 'Group B Strep'}
    , hemorrhoids:   { file: 'hemorrhoids', title: 'Hemorrhoid Relief'}
    , induction:     { file: 'induction', title: 'Labor Induction'}
    , listeria:      { file: 'listeria', title: 'Listeria'}
    , nausea:        { file: 'nausea', title: 'Nausea'}
    , vitamins:      { file: 'prenatal-vitamins', title: 'Prenatal Vitamins'}
    , tdap:          { file: 'tdap', title: 'TDaP'}
    , travel:        { file: 'travel', title: 'Travel'}
    , kickTracker:   { file: 'kick-tracker', title: 'Kick Tracking'}
    };

  return {
    all:    function ()     { return {resources: resources}; },
    detail: function (name) { return {resource: resources[name]}; }
  };
});

oneApp.service('KickTrackerService', function ($http, PLATFORMURL) {
  var url = PLATFORMURL + 'api/kick-tracker.php';

  return {
    createKick:  function () { return $http.post(url, { reset : false }); },
    getNumKicks: function () { return $http.get(url); },
    resetKicks:  function () { return $http.post(url, { reset : true }); },
  };
});

oneApp.service('PushService', function ($http, PLATFORMURL){
  var url = PLATFORMURL + 'api/pushNotifications.php';

  return {
    saveDeviceToken:  function (token) { return $http.post(url, token); },
    getDeviceToken:   function ()      { return $http.get(url); }
  };
});
