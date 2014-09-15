var test_speed = 300 //sets how many milliseconds each action takes
var load_speed = 8000 //sets how many milliseconds to wait for elements to load

module.exports = {
  setUp : function(browser) {
    console.log("Setting up...");
  },

  tearDown : function() {
    console.log("Closing down...");
  },

  "Testing failing nonexistent user login" : function (browser) {
    browser
      .url("http://127.0.0.1:9001/#/login")
      // checks to see if you're on the main page by looking for the logo
      .assert.elementPresent('img.logo-login')
      .setValue('input#login-email[type=email]', 'nonexistent_user@1eq.me')
      .pause(test_speed)
      .setValue('input#login-password[type=password]', 'badpassword')
      .pause(test_speed)
      .click('#login-button')
      .pause(test_speed)
      // checks for a popup error message
      .waitForElementPresent('div.popup.popup-showing.active', load_speed)
      // makes sure the the error message is right
      .assert.containsText('div.popup-head h3', 'LOGIN ERROR')
      .pause(test_speed)
      // click the ok button to go back to the page
      .click('div.popup-buttons.row button')
      // need to test that successful login elements are not present
      // .assert.containsText('div.alert.alert-danger', 'I\'m sorry but nonexistent_user@1eq.me was not found in the database!')
      // .assert.elementNotPresent('div#provider-dashboard')
      // .assert.elementNotPresent('div#admin-dashboard')
      .end();
  },

  "Testing failing wrong password login" : function (browser) {
    browser
      .url("http://127.0.0.1:9001/#/login")
      // checks to see if you're on the main page by looking for the logo
      .assert.elementPresent('img.logo-login')
      .setValue('input#login-email[type=email]', 'demopatient@1eq.me')
      .pause(test_speed)
      .setValue('input#login-password[type=password]', 'badpassword')
      .pause(test_speed)
      .click('#login-button')
      .pause(test_speed)
      // checks for a popup error message
      .waitForElementPresent('div.popup.popup-showing.active', load_speed)
      // makes sure the the error message is right
      .assert.containsText('div.popup-head h3', 'LOGIN ERROR')
      .pause(test_speed)
      // click the ok button to go back to the page
      .click('div.popup-buttons.row button')
      // need to test that successful login elements are not present
      .waitForElementNotPresent('div#babysteps-welcome', load_speed)
      .end();
  },

  "Testing that an admin can't successfully login" : function (browser) {
    browser
      .url("http://127.0.0.1:9001/#/login")
      // checks to see if you're on the main page by looking for the logo
      .assert.elementPresent('img.logo-login')
      .setValue('input#login-email[type=email]', '1eqadmin@1eq.me')
      .pause(test_speed)
      .setValue('input#login-password[type=password]', 'password')
      .pause(test_speed)
      .click('#login-button')
      .pause(test_speed)
      // checks for a popup error message
      .waitForElementPresent('div.popup.popup-showing.active', load_speed)
      // makes sure the the error message is right
      .assert.containsText('div.popup-head h3', 'LOGIN ERROR')
      .pause(test_speed)
      // click the ok button to go back to the page
      .click('div.popup-buttons.row button')
      // need to test that successful login elements are not present
      .waitForElementNotPresent('div#babysteps-welcome', load_speed)
      .end();
  },

  "Testing successful patient user login" : function (browser) {
    browser
      .url("http://127.0.0.1:9001/#/login")
      // checks to see if you're on the main page by looking for the logo
      .assert.elementPresent('img.logo-login')
      .setValue('input#login-email[type=email]', 'demopatient@1eq.me')
      .pause(test_speed)
      .setValue('input#login-password[type=password]', 'password')
      .pause(test_speed)
      .click('#login-button')
      .pause(test_speed)
      // make sure you don't get an error popup box
      .waitForElementNotPresent('div.popup.popup-showing.active', load_speed)
      // checks for a successful login by looking at the campaign dividers
      .waitForElementPresent('div#babysteps-welcome', load_speed)
      .assert.containsText('div#babysteps-welcome', 'BABYSTEPS WELCOME')
      .end();
  },

  "Testing failing login with just an email" : function (browser) {
    browser
      .url("http://127.0.0.1:9001/#/login")
      // checks to see if you're on the main page by looking for the logo
      .assert.elementPresent('img.logo-login')
      .setValue('input#login-email[type=email]', 'demopatient@1eq.me')
      .pause(test_speed)
      .click('#login-button')
      .pause(load_speed) //login takes really long
      // NOTE: no error message is given, should be added
      // checks for a popup error message
      .verify.elementNotPresent('div.popup.popup-showing.active')
      .pause(test_speed)
      // need to test that successful login elements are not present
      .waitForElementNotPresent('div#babysteps-welcome', load_speed)
      // make sure we stay on the same page
      .assert.elementPresent('img.logo-login')
      .end();
  },

  "Testing failing login with just a password" : function (browser) {
    browser
      .url("http://127.0.0.1:9001/#/login")
      // checks to see if you're on the main page by looking for the logo
      .assert.elementPresent('img.logo-login')
      .setValue('input#login-password[type=password]', 'password')
      .pause(test_speed)
      .click('#login-button')
      .pause(load_speed) //login takes really long
      // NOTE: no error message is given, should be added
      // checks for a popup error message
      .verify.elementNotPresent('div.popup.popup-showing.active')
      .pause(test_speed)
      // need to test that successful login elements are not present
      .waitForElementNotPresent('div#babysteps-welcome', load_speed)
      // make sure we stay on the same page
      .assert.elementPresent('img.logo-login')
      .end();
  }

};