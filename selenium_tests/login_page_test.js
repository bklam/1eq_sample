var test_speed = 300 //sets how many milliseconds each action takes
var load_speed = 1000 //sets how many milliseconds to wait for elements to load
var local_host_name = "http://localhost/1eq/login.php"
var staging_host_name = "http://staging.1eq.me/platform/login.php"

module.exports = {
  //not really sure what needs to be set up right now...
  setUp : function(browser) {
    console.log("Setting up...");
  },

  //same here
  tearDown : function() {
    console.log("Closing down...");
  },

  "Testing failing nonexistent user login" : function (browser) {
    browser
      .url(staging_host_name)
      .waitForElementVisible('body', load_speed)
      .setValue('input#username[type=text]', 'nonexistent_user@1eq.me')
      .pause(test_speed)
      .setValue('input#password[type=password]', 'badpassword')
      .pause(test_speed)
      .click('#login-button')
      .pause(test_speed)
      .assert.containsText('div.alert.alert-danger', 'I\'m sorry but nonexistent_user@1eq.me was not found in the database!')
      .assert.elementNotPresent('div#provider-dashboard')
      .assert.elementNotPresent('div#admin-dashboard')
      .end();
  },

  "Testing failing wrong password provider user login" : function (browser) {
    browser
      .url(staging_host_name)
      .waitForElementVisible('body', load_speed)
      .setValue('input#username[type=text]', 'provider@1eq.me')
      .pause(test_speed)
      .setValue('input#password[type=password]', 'badpassword')
      .pause(test_speed)
      .click('#login-button')
      .pause(test_speed)
      .assert.containsText('div.alert.alert-error', 'Login was unsuccessful')
      .assert.elementNotPresent('div#provider-dashboard')
      .assert.elementNotPresent('div#admin-dashboard')
      .end();
  },

  "Testing failing wrong password admin user login" : function (browser) {
    browser
      .url(staging_host_name)
      .waitForElementVisible('body', load_speed)
      .setValue('input#username[type=text]', '1eqadmin@1eq.me')
      .pause(test_speed)
      .setValue('input#password[type=password]', 'badpassword')
      .pause(test_speed)
      .click('#login-button')
      .pause(test_speed)
      .assert.containsText('div.alert.alert-error', 'Login was unsuccessful')
      .assert.elementNotPresent('div#provider-dashboard')
      .assert.elementNotPresent('div#admin-dashboard')
      .end();
  },

  "Testing failing login with just an email" : function (browser) {
    browser
      .url(staging_host_name)
      .waitForElementVisible('body', load_speed)
      .setValue('input#username[type=text]', '1eqadmin@1eq.me')
      .pause(test_speed)
      .click('#login-button')
      .pause(test_speed)
      //should show an error message, but doesn't right now
      .verify.containsText('div.alert.alert-error', 'Login was unsuccessful')
      .assert.elementNotPresent('div#provider-dashboard')
      .assert.elementNotPresent('div#admin-dashboard')
      .end();
  },

  "Testing failing login with just a password" : function (browser) {
    browser
      .url(staging_host_name)
      .waitForElementVisible('body', load_speed)
      .setValue('input#password[type=password]', 'badpassword')
      .pause(test_speed)
      .click('#login-button')
      .pause(test_speed)
      //should show an error message, but doesn't right now
      .verify.containsText('div.alert.alert-error', 'Login was unsuccessful')
      .assert.elementNotPresent('div#provider-dashboard')
      .assert.elementNotPresent('div#admin-dashboard')
      .end();
  },  

  "Testing successful provider login" : function (browser) {
    browser
      .url(staging_host_name)
      .waitForElementVisible('body', load_speed)
      .setValue('input#username[type=text]', 'provider@1eq.me')
      .pause(test_speed)
      .setValue('input#password[type=password]', 'password')
      .pause(test_speed)
      .click('#login-button')
      .pause(test_speed)
      //need to check to make sure it lands on provider dashboard
      .assert.elementPresent('div#provider-dashboard')
      .assert.elementNotPresent('div#admin-dashboard')
      //shouldn't see an error message at the top
      .assert.elementNotPresent('div.alert.alert-danger')
      .assert.elementNotPresent('div.alert.alert-error')
      .end();
  },

  "Testing successful admin login" : function (browser) {
    browser
      .url(staging_host_name)
      .waitForElementVisible('body', load_speed)
      .setValue('input#username[type=text]', '1eqadmin@1eq.me')
      .pause(test_speed)
      .setValue('input#password[type=password]', 'password')
      .pause(test_speed)
      .click('#login-button')
      .pause(test_speed)
      //need to check to make sure it lands on admin dashboard
      .assert.elementPresent('div#admin-dashboard')
      .assert.elementNotPresent('div#provider-dashboard')
      //shouldn't see an error message at the top
      .assert.elementNotPresent('div.alert.alert-danger')
      .assert.elementNotPresent('div.alert.alert-error')
      .end();
  }

};