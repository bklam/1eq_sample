'use strict';

oneApp.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
  $stateProvider
    .state('app', {
      url: '/',
      abstract: true,
      templateUrl: 'templates/app.html',
      controller: 'MainCtrl'
    })
    .state('ftueWelcome', {
      parent: 'app',
      url: '/ftue',
      templateUrl: 'templates/welcome.html',
      controller: 'FTUECtrl'
    })
    .state('tasks', {
      parent: 'app',
      url: 'tasks/:status',
      abstract: true,
      template: '<ion-nav-view></ion-nav-view>',
      controller: 'TasksCtrl'
    })
    .state('taskList', {
      parent: 'tasks',
      url: '/',
      templateUrl: 'templates/tasks.html',
      controller: 'TaskListCtrl',
      resolve: {
        campaigns: function ($q, $stateParams, storage, TasksService) {
          var deferred    = $q.defer()
            , lastUpdated = storage.get('lastCheckedAt');
          // If we haven't updated, or it's been more than an hour
          if (lastUpdated !== null && (lastUpdated + 1000 * 60 * 60) > Date.now()) {
            deferred.resolve(storage.get($stateParams.status + 'Tasks'));
          } else {
            TasksService.getTasks()
            .then(function (status) {
              if (status === 'success') {
                deferred.resolve(storage.get($stateParams.status + 'Tasks'));
              } else {
                console.log(status);
                deferred.reject(status);
              }
            });
          }
          return deferred.promise;
        }
      }
    })
    .state('task', {
      parent: 'tasks',
      url: '/:taskId',
      templateUrl: 'templates/task.html',
      controller: 'TaskDetailCtrl',
      resolve: {
        task: function ($stateParams, storage) {
          var allTasks  = []
            , campaigns = storage.get($stateParams.status + 'Tasks') || {};

          _.each(campaigns, function (campaign) {
            //console.log(campaign);
            if (campaign && campaign.tasks) {
              allTasks = allTasks.concat(campaign.tasks);
            }
          });

          // Loop through groups searching for this task
          return _.findWhere(allTasks, {id: $stateParams.taskId}) || {};
        }
      }
    })
    .state('resources', {
      parent: 'app',
      url: 'resources',
      templateUrl: 'templates/resources.html',
      controller: 'ResourcesCtrl',
      resolve: {
        resources: function (ResourcesService) {
          return ResourcesService.all().resources;
        }
      }
    })
    .state('resource', {
      parent: 'app',
      url: 'resources/:file',
      templateUrl: 'templates/resource.html',
      controller: 'ResourceCtrl',
      resolve: {
        resource: function ($stateParams, ResourcesService) {
          return ResourcesService.detail($stateParams.file).resource;
        }
      }
    })
    .state('settings', {
      parent: 'app',
      url: 'settings',
      templateUrl: 'templates/settings.html',
      controller: 'SettingsCtrl',
      resolve: {
        user: function (SessionsService) {
          return SessionsService.whoami()
          .then(function (res) {
            return res.data.authenticated;
          });
        },
        integrations: function (SessionsService) {
          return SessionsService.getintegrations()
          .then(function (res) { return res.data; });
        }
      }
    })
    .state('conversations', {
      parent: 'app',
      url: 'conversations',
      controller: 'ConversationsCtrl',
      templateUrl: 'templates/conversations.html',
      resolve: {
        conversations: function (MessagesService) {
          return MessagesService.conversations()
          .then(function (res) {
            return res.data;
          });
        },
        providers: function (SessionsService) {
          return SessionsService.whoami()
          .then(function (res) {
            return res.data.authenticated.providers;
          });
        }
      }
    })
    .state('conversation', {
      parent: 'app',
      url: 'conversations/:userId',
      controller: 'ConversationCtrl',
      templateUrl: 'templates/conversation.html',
      resolve: {
        conversation: function ($stateParams, MessagesService) {
          return MessagesService.conversation($stateParams.userId)
          .then(function (res) { return res.data; });
        }
      },
      onEnter: function () {
        window.cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      },
      onExit: function () {
        window.cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
      }
    })
    .state('support', {
      parent: 'app',
      url: 'support',
      templateUrl: 'templates/support.html',
      controller: 'SupportCtrl'
    })
    .state('supportDetail', {
      parent: 'app',
      url: 'support/:file',
      templateUrl: function ($stateParams) {
        return 'templates/support/' + $stateParams.file + '.html';
      }
    })
    .state('kick-tracker', {
      parent: 'app',
      url: 'tools/kick-tracker',
      templateUrl: 'templates/tools/kick-tracker.html',
      controller: 'KickTrackerCtrl',
      resolve: {
        kickCount: function (KickTrackerService) {
          return KickTrackerService.getNumKicks()
          .then(function (res) {
            return res.data;
          });
        }
      }
    })
    .state('faq', {
      parent: 'app',
      url: 'faq',
      templateUrl: 'templates/faq.html',
      controller: 'FaqCtrl'
    })
    .state('contact-support', {
      parent: 'app',
      url: 'contact-support',
      templateUrl: 'templates/contact-support.html',
      controller: 'ContactSupportCtrl'
    })
    .state('support-msg', {
      parent: 'app',
      url: 'support-msg',
      templateUrl: 'templates/supportMessage.html',
      controller: 'SupportMsgCtrl'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl'
    })
    .state('resetpassword', {
      url: '/resetPassword',
      templateUrl: 'templates/resetPassword.html',
      controller: 'ResetPasswordCtrl'
    });


  $urlRouterProvider.otherwise('/login');

  // Catch 401 responses
  $httpProvider.interceptors.push('authInterceptor');
});
