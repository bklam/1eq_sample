var test_speed = 300 //sets how many milliseconds each action takes
var load_speed = 1000 //sets how many milliseconds to wait for elements to load
var hover_speed = 2000 //sets how long to pause for to check for hover elements

module.exports = {
  //not really sure what needs to be set up right now...
  setUp : function(browser) {
    console.log("Setting up...");
    browser
      .url("http://localhost/1eq/login.php")
      .waitForElementVisible('body', load_speed)
      .setValue('input#username[type=text]', 'provider@1eq.me')
      .pause(test_speed)
      .setValue('input#password[type=password]', 'password')
      .pause(test_speed)
      .click('#login-button')

  },

  //same here
  tearDown : function() {
    console.log("Closing down...");
  },

  "Making sure provider login was successful" : function (browser) {
    browser
      //need to check to make sure it lands on provider dashboard
      .assert.elementPresent('div#provider-dashboard')
      .assert.elementNotPresent('div#admin-dashboard')
      //shouldn't see an error message at the top
      .assert.elementNotPresent('div.alert.alert-danger')
      .assert.elementNotPresent('div.alert.alert-error')
      .end();
  },

  "Make sure all elements in nav are visible" : function (browser) {
    browser
      //make sure navbar itself is visible, then check the elements
      .waitForElementVisible('header.navbar', load_speed)
      //check navigation on the top left
      .assert.elementPresent('header.navbar div.container a#main-menu-toggle')
      //check the logo
      .assert.elementPresent('header.navbar div.container a#logo')
      //check the expand hidden menu bars by logo
      .assert.elementPresent('i#fa-bars')
      //check the top right navigation options
      .assert.elementPresent('ul#top-right-nav')
      //checking the dashboard option
      .assert.elementPresent('a#my-dashboard')
      //check the hover display
      .moveToElement('a#my-dashboard', 15, 15)
      .pause(hover_speed) //to see if hover elements display correctly
      .assert.attributeEquals('a#my-dashboard', 'data-original-title', 'My Dashboard')
      .end();
      // these are incomplete because of jon... will finish later
  }

};