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
      .url(staging_host_name)
      .waitForElementVisible('body', load_speed)
      .setValue('input#username[type=text]', 'anish@1eq.me')
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

  "From the side-nav list of group users, make sure users can be created, edited, and deleted" : function (browser) {
    browser
      .click("a#manage-users-side")
      .click("a#view-users-side")
      //creating a user
      .assert.elementPresent('a#new-user')
      .click('a#new-user')
      .setValue('input#fullname[type=text]', 'Ben Lam')
      .pause(test_speed)
      .setValue('input#email[type=email]', 'ben+32@1eq.me')
      .pause(test_speed)
      .setValue('input#gravida[type=text]', 'G4, P1')
      .pause(test_speed)
      .setValue('input#edd[type=date]', '12/12/2014')
      .pause(test_speed)
      .setValue('input#dob[type=date]', '12/14/1974')
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
      .click('a#manage-users-side')
      .click('a#view-users-side')
      //search for the newest user that was just created to make sure it exists
      .setValue('div#DataTables_Table_0_filter.dataTables_filter label input[type=text]', 'Ben')
      .pause(test_speed)
      //assumes that there is only one record, this checks the first search result
      .assert.containsText('tbody tr.odd td a', 'Ben')
      .assert.elementPresent('a#view-user')
      .assert.visible('a#view-user')
      .pause(test_speed)
      //makes sure users can be edited and deleted
      //click on the record to edit it
      .click('tbody tr.odd td a')
      .pause(test_speed)
      .assert.elementPresent('a#edit-account-tab')
      .assert.visible('div#edit-account')
      .clearValue('input#fullname[type=text]')
      .setValue('input#fullname[type=text]', 'Ben Lam')
      .pause(test_speed)
      .click('button#save-user') //check this
      .pause(test_speed)
      .assert.elementPresent('div.alert.alert-success')
      .assert.containsText('div.alert.alert-success p', 'Success, ben+31@1eq.me\'s account has been updated')
      .assert.hidden('div#action-list')
      .assert.hidden('div#access-areas')
      .assert.elementPresent('a#delete-account-tab')
      .click('a#delete-account-tab')
      .pause(test_speed)
      .assert.visible('div#delete-account')
      //checks make sure see the delete button exists and is visible
      .assert.elementPresent('input.btn.btn-danger')
      //clicks to try and delete the record
      .click('input.btn.btn-danger')
      .pause(test_speed)
      .acceptAlert()
      .pause(test_speed)
      .assert.elementPresent('div.alert.alert-success')
      .assert.containsText('div.alert.alert-success p', 'The user has been successfully removed from the database')
      //now that the record is deleted, refresh the page
      .click('a#view-users-side')
      .pause(test_speed)
      //search for the newest user that was just created to make sure it exists
      .setValue('div#DataTables_Table_0_filter.dataTables_filter label input[type=text]', 'Ben')
      .pause(test_speed)
      //assumes that there are no records, makes sure there are no search results
      .assert.elementNotPresent('tbody tr.odd td a')
      .assert.elementNotPresent('a#view-user')
      .pause(test_speed)
      .end();
  },

  "From the dashboard, make sure users can be created, but not edited or deleted" : function (browser) {
    browser
      //creating a user
      .assert.elementPresent('a#new-user')
      .click('a#new-user')
      .setValue('input#fullname[type=text]', 'Ben Lam')
      .pause(test_speed)
      .setValue('input#email[type=email]', 'ben+31@1eq.me')
      .pause(test_speed)
      .setValue('input#gravida[type=text]', 'G4, P1')
      .pause(test_speed)
      .setValue('input#edd[type=date]', '12/12/2014')
      .pause(test_speed)
      .setValue('input#dob[type=date]', '12/14/1974')
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
      .click('a#my-dashboard')
      .pause(test_speed)
      //search for the newest user that was just created to make sure it exists
      .setValue('div#DataTables_Table_0_filter.dataTables_filter label input[type=text]', 'Ben')
      .pause(test_speed)
      //assumes that there is only one record, this checks the first search result
      .assert.containsText('tbody tr.odd td a', 'Ben')
      //makes sure users can be edited and deleted
      .pause(test_speed)
      .assert.elementPresent('a#view-users-dash.btn.btn-sm')
      .assert.visible('a#view-users-dash.btn.btn-sm')
      .pause(test_speed)
      //click on the record to edit it
      .click('tbody tr.odd td a')
      .pause(test_speed)
      .assert.elementPresent('a#edit-account-tab')
      .assert.visible('div#edit-account')
      .clearValue('input#fullname[type=text]')
      .setValue('input#fullname[type=text]', 'Ben Lam')
      .pause(test_speed)
      .click('button#save-user')
      .pause(test_speed)
      .assert.elementPresent('div.alert.alert-success')
      .assert.containsText('div.alert.alert-success p', 'Success, ben+31@1eq.me\'s account has been updated')
      .assert.hidden('div#action-list')
      .assert.hidden('div#access-areas')
      .assert.elementPresent('a#delete-account-tab')
      .click('a#delete-account-tab')
      .pause(test_speed)
      .assert.visible('div#delete-account')
      //checks make sure see the delete button exists and is visible
      .assert.elementPresent('input.btn.btn-danger')
      //clicks to try and delete the record
      .click('input.btn.btn-danger')
      .pause(test_speed)
      .acceptAlert()
      .pause(test_speed)
      .assert.elementPresent('div.alert.alert-success')
      .assert.containsText('div.alert.alert-success p', 'The user has been successfully removed from the database')
      //now that the record is deleted, refresh the page
      .click('a#my-dashboard')
      //search for the recently deleted user to make sure it doens't exist
      .setValue('div#DataTables_Table_0_filter.dataTables_filter label input[type=text]', 'Ben')
      .pause(test_speed)
      //assumes that there are no records, makes sure there are no search results
      .assert.elementNotPresent('tbody tr.odd td a')
      .assert.elementNotPresent('a#view-users-dash.btn.btn-sm')
      .pause(test_speed)
      .end();
  }

};