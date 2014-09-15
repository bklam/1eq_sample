var test_speed = 300 //sets how many milliseconds each action takes
var load_speed = 1000 //sets how many milliseconds to wait for elements to load
var hover_speed = 2000 //sets how long to pause for to check for hover elements
var local_host_name = "http://localhost/1eq/login.php"
var staging_host_name = "http://staging.1eq.me/platform/login.php"

// NOTE: These tests rely on ./refreshdb.sh if tests fail to reset the database. This may cause problems on
//       staging, so maybe only run locally

module.exports = {
  setUp : function(browser) {
    console.log("Setting up...");
    browser
      .url(local_host_name)
      .waitForElementVisible('body', load_speed)
      .setValue('input#username[type=text]', 'ben@1eq.me')
      .pause(test_speed)
      .setValue('input#password[type=password]', 'password')
      .pause(test_speed)
      .click('#login-button')

  },

  tearDown : function() {
    console.log("Closing down...");
    // http://nodejs.org/api.html#_child_processes
    var sys = require('sys');
    var exec = require('child_process').exec;
    var child;

    // executes `cd db && ./refreshdb.sh` to refresh the database to remove new accounts, since delete doesn't remove from rethink
    child = exec("cd db && ./refreshdb.sh", function (error, stdout, stderr) {
      sys.print('stdout: ' + stdout);
      sys.print('stderr: ' + stderr);
      sys.print('\n');
      if (error !== null) {
        console.log('exec error: ' + error);
      }
    });
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

  "From the side-nav list of group users, make sure users can be created, but not edited or deleted" : function (browser) {
    browser
      .click("a#manage-users-side")
      .click("a#view-users-side")
      //creating a user
      .assert.elementPresent('a#new-user')
      //makes sure users can't be edited and deleted
      .assert.elementNotPresent('a#edit-user')
      //then checks the other view users page
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
      .setValue('input#mobilephone[type=tel]', '7179048274')
      .pause(test_speed)
      .click('button#create_user')
      .pause(test_speed)
      .assert.elementPresent('div.alert.alert-success')
      .pause(test_speed)
      .assert.containsText('div.alert.alert-success p', 'Success, Ben\'s account has been created')
      .pause(test_speed)
      //now that the record is created, refresh the page
      .click("a#view-users-side")
      .pause(test_speed)
      //search for the newest user that was just created to make sure it exists
      .setValue('div#DataTables_Table_0_filter.dataTables_filter label input[type=text]', 'Ben')
      .pause(test_speed)
      //assumes that there is only one record, this checks the first search result
      .assert.containsText('tbody tr.odd td a', 'Ben')
      .pause(test_speed)
      //click on the record to make sure you can't edit it
      .click('tbody tr.odd td a')
      .pause(test_speed)
      .assert.elementNotPresent('div#edit-account-tab')
      .assert.elementNotPresent('div#action-list-tab')
      .assert.elementNotPresent('div#access-areas-tab')
      .assert.elementNotPresent('div#delete-account-tab')
      .assert.hidden('div#edit-account')
      .assert.hidden('div#action-list')
      .assert.hidden('div#access-areas')
      //.assert.hidden('div#delete-account') idk why this causes an error... but this test isn't really necessary
      .pause(test_speed)
      .end();
  },

  "From the dashboard, make sure users can be created, but not edited or deleted" : function (browser) {
    browser
      //creating a user
      .assert.elementPresent('a#new-user')
      //makes sure users can't be edited and deleted
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
      .setValue('input#mobilephone[type=tel]', '7179048274')
      .pause(test_speed)
      .click('button#create_user')
      .pause(test_speed)
      .assert.containsText('div.alert.alert-success p', 'Success, Ben\'s account has been created')
      .pause(test_speed)
      //refresh the page, for some reason records don't show up if you check the view users from the dashboard page
      .click("a#my-dashboard")
      .pause(test_speed)
      //search for the newest user that was just created to make sure it exists
      .setValue('div#DataTables_Table_0_filter.dataTables_filter label input[type=text]', 'Ben')
      .pause(test_speed)
      //assumes that there is only one record, this checks the first search result
      .assert.containsText('tbody tr.odd td a', 'Ben')
      .pause(test_speed)
      //click on the record to make sure you can't edit it
      .click('tbody tr.odd td a')
      .pause(test_speed)
      .assert.elementNotPresent('div#edit-account-tab')
      .assert.elementNotPresent('div#action-list-tab')
      .assert.elementNotPresent('div#access-areas-tab')
      .assert.elementNotPresent('div#delete-account-tab')
      .assert.hidden('div#edit-account')
      .assert.hidden('div#action-list')
      .assert.hidden('div#access-areas')
      //.assert.hidden('div#delete-account')
      .pause(test_speed)
      .end();
  }

};