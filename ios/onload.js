'use strict';

function onDeviceReady () {
  navigator.splashscreen.hide();

  window.plugins.pushNotification.register(function (token) {
    console.log('registered for push notifications');
    console.log('token is', JSON.stringify(token));
    localStorage.setItem('deviceToken', JSON.stringify(token));
    var deviceToken = localStorage.getItem('deviceToken');
    console.log('hopefully got the device token from localstorage, it is: ');
    console.log(deviceToken);
    console.log("this is localStorage in onload.js");
    console.log(localStorage);
  }, function (error) {
    console.log('failed to register push notificaitons');
    console.log(error);
  }, {
      'badge': 'true'
    , 'sound': 'true'
    , 'alert': 'true'
    , 'ecb': 'onNotificationAPN'
    }
  );
}

function onResume() {
  console.log("this is what local storage looks like");
  console.log(localStorage);
}

document.addEventListener('deviceready', onDeviceReady, true);
document.addEventListener('resume', onResume, true);