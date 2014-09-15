'use strict';

oneApp.controller('ResourcesCtrl',
  function ($http, $scope, $window, resources) {
    var resourceOrder = [
        'backPain'
      , 'breastfeeding'
      , 'constipation'
      , 'cordBlood'
      , 'deliveryBag'
      , 'eatingRight'
      , 'exercise'
      , 'flu'
      , 'genetics'
      , 'strep'
      , 'hemorrhoids'
      , 'induction'
      , 'kickTracker'
      , 'listeria'
      , 'nausea'
      , 'vitamins'
      , 'tdap'
      , 'travel'
      ];

    $scope.odd_resources  = [];
    $scope.even_resources = [];

    var colorCount = 1;
    var nextColor  = 'blue';
    _.each(resourceOrder, function (key, index) {
      var obj = resources[key];
      obj.key = key;

      // Set the color of the next guy
      (nextColor === 'blue') ? obj.color = 'blue' : obj.color = 'red';

      // How many have gotten that color so far?
      if (colorCount === 0) {
        colorCount++;
      } else {
        (nextColor === 'blue') ? nextColor = 'red' : nextColor = 'blue';
        colorCount = 0;
      }

      // Push it onto one of the arrays
      (index % 2 === 0) ? $scope.even_resources.push(obj) : $scope.odd_resources.push(obj);
    });
  }
);
