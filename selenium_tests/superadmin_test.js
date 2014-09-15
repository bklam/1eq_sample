var test_speed = 300 //sets how many milliseconds each action takes
var load_speed = 1000 //sets how many milliseconds to wait for elements to load
var hover_speed = 2000 //sets how long to pause for to check for hover elements

module.exports = {
  setUp : function(browser) {
    console.log("Setting up...");
    browser
      .url("http://localhost/1eq/login.php")
      .waitForElementVisible('body', load_speed)
      .setValue('input#username[type=text]', '1eqadmin@1eq.me')
      .pause(test_speed)
      .setValue('input#password[type=password]', 'password')
      .pause(test_speed)
      .click('#login-button')

  },

  //same here
  tearDown : function() {
    console.log("Closing down...");
  },

  "Making sure admin login was successful" : function (browser) {
    browser
      //need to check to make sure it lands on provider dashboard
      .assert.elementNotPresent('div#provider-dashboard')
      .assert.elementPresent('div#admin-dashboard')
      //shouldn't see an error message at the top
      .assert.elementNotPresent('div.alert.alert-danger')
      .assert.elementNotPresent('div.alert.alert-error')
      .end();
  },

  "Make sure users can be created, but not edited or deleted" : function (browser) {
    browser
      //creating a user
      .assert.elementPresent('a#new-user')
      .assert.elementNotPresent('a#edit-user')
      .click('a#new-user')
      .setValue('input#fullname[type=text]', 'Ben Lam')
      .pause(test_speed)
      .setValue('input#email[type=email]', 'ben+30@1eq.me')
      .pause(test_speed)
      .setValue('input#gravida[type=text]', 'G4, P1')
      .pause(test_speed)
      .setValue('input#edd[type=date]', '12/12/2014')
      .pause(test_speed)
      .setValue('input#height[type=text]', '65')
      .pause(test_speed)
      .setValue('input#weight[type=text]', '145')
      .pause(test_speed)
      .setValue('input#bloodpressure[type=text]', '110/60')
      .pause(test_speed)
      //since for some reason you can't pass in browser to teardown, do here
      .end();
  }

};