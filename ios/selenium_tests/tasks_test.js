var test_speed = 800 //sets how many milliseconds each action takes
var timeout_speed = 8000 //sets how many milliseconds to wait for elements to load

module.exports = {
  setUp : function(browser) {
    console.log("Setting up...");
    // log in and test to make sure login was successful
    browser
      .url("http://127.0.0.1:9001/#/login")
      // checks to see if you"re on the main page by looking for the logo
      .waitForElementPresent("img.logo-login", timeout_speed)
      .setValue("input#login-email[type=email]", "demopatient@1eq.me")
      .pause(test_speed)
      .setValue("input#login-password[type=password]", "password")
      .pause(test_speed)
      .click("#login-button")
      .pause(test_speed)
      // make sure you don"t get an error popup box
      .waitForElementNotPresent("div.popup.popup-showing.active", timeout_speed)
      // checks for a successful login by looking at the campaign dividers
      .waitForElementPresent("div#babysteps-welcome", timeout_speed)
      .assert.containsText("div#babysteps-welcome", "BABYSTEPS WELCOME")
  },

  tearDown : function() {
    console.log("Closing down...");
    var sys = require("sys");
    var exec = require("child_process").exec;
    var child;

    // executes `cd db && ./reset_demo_users.sh` to refresh the database to remove new accounts, since delete doesn"t remove from rethink
    child = exec("cd ../1eq/db && ./reset_demo_users.sh 1>/dev/null 2>/dev/null", function (error, stdout, stderr) {
      sys.print("stdout: " + stdout);
      sys.print("stderr: " + stderr);
      sys.print("\n");
      if (error !== null) {
        console.log("exec error: " + error);
      }
    });
  },

  "Test moving all tasks from one active campaign to completed and vice versa" : function (browser) {
    browser
      // makes sure the campaign header is there
      .waitForElementPresent("div#babysteps-welcome", timeout_speed, function() {
        console.log("Starting assertion tests.");
      })
      // and then the associated tasks
      .waitForElementPresent("h3#congratulations-on-your-pregnancy", timeout_speed, function() {
        console.log("Checking to see if appropriate tasks are in active list");
      })
      .waitForElementPresent("h3#tap-on-me", timeout_speed)
      .waitForElementPresent("h3#because-we-work-with-attorneys", timeout_speed)
      .waitForElementPresent("h3#need-technical-help-we_re-here", timeout_speed)
      .pause(test_speed)
      .click("li#completed-button")
      .pause(test_speed)
      // check to make sure the completed task list is empty
      .waitForElementNotPresent("div#babysteps-welcome", timeout_speed, function() {
        console.log("Check completed task list--should be empty");
      })
      .waitForElementNotPresent("h3#congratulations-on-your-pregnancy", timeout_speed)
      .waitForElementNotPresent("h3#tap-on-me", timeout_speed)
      .waitForElementNotPresent("h3#because-we-work-with-attorneys", timeout_speed)
      .waitForElementNotPresent("h3#need-technical-help-we_re-here", timeout_speed)
      .waitForElementPresent("div.no-items", timeout_speed)
      .click("li#active-button", function() {
        console.log("Now go back to the active list");
      })
      .waitForElementPresent("div#babysteps-welcome", timeout_speed)
      .waitForElementPresent("h3#congratulations-on-your-pregnancy", timeout_speed)
      .waitForElementPresent("h3#tap-on-me", timeout_speed)
      .waitForElementPresent("h3#because-we-work-with-attorneys", timeout_speed)
      .waitForElementPresent("h3#need-technical-help-we_re-here", timeout_speed)
      .pause(test_speed)
      // then move the bad boys over to completed
      .click("h3#congratulations-on-your-pregnancy")
      .pause(test_speed)
      .waitForElementPresent("h2#congratulations-on-your-pregnancy", timeout_speed, function() {
        console.log("Successfully landed on the correct task details page");
      })
      .waitForElementPresent("h2#completed-button", timeout_speed)
      .getText("h2#get-started-button", function(result) {
        console.log(result);
      })
      .getText("h2#get-started-button", function(result) {
        console.log(result);
      })
      .assert.containsText("h2#completed-button", "GOT IT")
      .click("button#completed-button", function() {
        console.log("Moved over first task to completed list");
      })
      .pause(test_speed)
      // make sure you make it back to the active page and the campaign is still there
      .waitForElementPresent("div#babysteps-welcome", timeout_speed, function() {
        console.log("We made it back to the active page and the campaign is still here");
      })
      // make sure we don't see the task we just moved to completed
      .waitForElementNotPresent("h3#congratulations-on-your-pregnancy", timeout_speed, function() {
        console.log("Make sure that we don't see the task we just moved to completed");
      })
      // make sure the active tasks that are supposed to be there are there
      .waitForElementPresent("h3#tap-on-me", timeout_speed, function() {
        console.log("Make sure the active tasks that are supposed to be there are there");
      })
      .waitForElementPresent("h3#because-we-work-with-attorneys", timeout_speed)
      .waitForElementPresent("h3#need-technical-help-we_re-here", timeout_speed)
      .pause(test_speed)
      .click("h3#tap-on-me")
      .waitForElementPresent("h2#tap-on-me", timeout_speed)
      .waitForElementPresent("h2#completed-button", timeout_speed)
      .getText("h2#get-started-button", function(result) {
        console.log(result);
      })
      .assert.containsText("h2#completed-button", "GOT IT")
      .pause(test_speed)
      // don't ask me why I can't just say .click("button#completed-button"), it frustratingly doesn't work
      .moveToElement("button#completed-button", 500, 30, function() {
        console.log("Moved mouse to got it button");
      })
      .mouseButtonDown("left")
      .mouseButtonUp("left")
      .pause(test_speed)
      // make sure it takes us back to the active page... and so on
      .waitForElementPresent("div#babysteps-welcome", timeout_speed, function() {
        console.log("At this point, should have completed Tap On Me and Congratulations on your pregnancy");
      })
      // moved tasks
      .pause(test_speed)
      .waitForElementNotPresent("h3#congratulations-on-your-pregnancy", timeout_speed)
      .waitForElementNotPresent("h3#tap-on-me", timeout_speed)
      // still present tasks
      .waitForElementPresent("h3#because-we-work-with-attorneys", timeout_speed)
      .waitForElementPresent("h3#need-technical-help-we_re-here", timeout_speed)
      // testing the nav back button
      .click("h3#because-we-work-with-attorneys", function() {
        console.log("Testing the nav back button");
      })
      .pause(test_speed)
      .waitForElementPresent("h2#because-we-work-with-attorneys", timeout_speed)
      .waitForElementPresent("ion-nav-back-button#tasks-back-button", timeout_speed)
      .click("ion-nav-back-button#tasks-back-button")
      // make sure it takes us back to the active page
      .waitForElementPresent("div#babysteps-welcome", timeout_speed, function() {
        console.log("Continue moving along with completing all tasks in the Welcome to Babysteps campaign");
      })
      .pause(test_speed)
      // moved tasks
      .waitForElementNotPresent("h3#congratulations-on-your-pregnancy", timeout_speed)
      .waitForElementNotPresent("h3#tap-on-me", timeout_speed)
      // still present tasks
      .waitForElementPresent("h3#because-we-work-with-attorneys", timeout_speed)
      .waitForElementPresent("h3#need-technical-help-we_re-here", timeout_speed)
      // now get rid of the rest of the tasks
      .click("h3#because-we-work-with-attorneys")
      .waitForElementPresent("h2#because-we-work-with-attorneys", timeout_speed)
      .waitForElementPresent("h2#completed-button", timeout_speed)
      .getText("h2#get-started-button", function(result) {
        console.log(result);
      })
      .assert.containsText("h2#completed-button", "GOT IT")
      // don't ask me why I can't just say .click("button#completed-button"), it frustratingly doesn't work and
      // for some reason if you move the mouse to it and then try to click it, it magically works
      .waitForElementPresent("button#completed-button", timeout_speed)
      .moveToElement("h2#completed-button", 10, 10, function() {
        console.log("Moved mouse to got it button");
      })
      .click("button#completed-button")
      .pause(test_speed)
      // make sure it takes us back to the active page
      .waitForElementPresent("div#babysteps-welcome", timeout_speed, function() {
        console.log("Continue moving along with completing all tasks in the Welcome to Babysteps campaign");
      })
      // moved tasks
      .waitForElementNotPresent("h3#congratulations-on-your-pregnancy", timeout_speed)
      .waitForElementNotPresent("h3#tap-on-me", timeout_speed)
      .waitForElementNotPresent("h3#because-we-work-with-attorneys", timeout_speed)
      // still present tasks
      .waitForElementPresent("h3#need-technical-help-we_re-here", timeout_speed)
      .click("h3#need-technical-help-we_re-here")
      .pause(test_speed)
      .waitForElementPresent("h2#need-technical-help-we_re-here", timeout_speed)
      .waitForElementPresent("h2#completed-button", timeout_speed)
      .waitForElementPresent("button#completed-button", timeout_speed)
      .getText("h2#get-started-button", function(result) {
        console.log(result);
      })
      .assert.containsText("h2#completed-button", "GOT IT")
      .moveToElement("h2#completed-button", 10, 5, function() {
        console.log("Check out completed list to see if appropriate completed tasks are there");
      })
      .click("button#completed-button")
      .pause(test_speed)
      // make sure nothing shows up
      .waitForElementNotPresent("div#babysteps-welcome", timeout_speed, function() {
        console.log("Making sure the entire Babysteps Welcome campaign no longer shows up in the active list");
      })
      .waitForElementNotPresent("h3#congratulations-on-your-pregnancy", timeout_speed)
      .waitForElementNotPresent("h3#tap-on-me", timeout_speed)
      .waitForElementNotPresent("h3#because-we-work-with-attorneys", timeout_speed)
      .waitForElementNotPresent("h3#need-technical-help-we_re-here", timeout_speed)
      .click("li#completed-button", function() {
        console.log("Now check to make sure entire Babysteps Welcome campaign is in the completed list");
      })
      .pause(test_speed)
      .waitForElementPresent("div#babysteps-welcome", timeout_speed)
      .waitForElementPresent("h3#congratulations-on-your-pregnancy", timeout_speed)
      .waitForElementPresent("h3#tap-on-me", timeout_speed)
      .waitForElementPresent("h3#because-we-work-with-attorneys", timeout_speed)
      .waitForElementPresent("h3#need-technical-help-we_re-here", timeout_speed)
      .pause(test_speed)
      .click("h3#congratulations-on-your-pregnancy", function() {
        console.log("Start to reopen elements in completed list");
      })
      .pause(test_speed)
      .waitForElementPresent("h2#congratulations-on-your-pregnancy", timeout_speed, function() {
        console.log("Landed on appropriate tasks details page");
      })
      .waitForElementPresent("h2#reopen-button", timeout_speed)
      .waitForElementPresent("button#reopen-button", timeout_speed)
      .assert.containsText("h2#reopen-button", "REOPEN")
      .click("button#reopen-button")
      .pause(test_speed)
      .waitForElementPresent("div#babysteps-welcome", timeout_speed, function() {
        console.log("Should take us back to the active list and show the Babysteps Welcome campaign");
      })
      .waitForElementPresent("h3#congratulations-on-your-pregnancy", timeout_speed)
      .click("li#completed-button", function() {
        console.log("Checking the completed list")
      })
      .waitForElementPresent("div#babysteps-welcome", timeout_speed)
      .waitForElementPresent("h3#tap-on-me", timeout_speed, function() {
        console.log("Should show only the completed tasks");
      })
      .waitForElementPresent("h3#because-we-work-with-attorneys", timeout_speed)
      .waitForElementPresent("h3#need-technical-help-we_re-here", timeout_speed)
      .waitForElementNotPresent("h3#congratulations-on-your-pregnancy", timeout_speed, function() {
        console.log("Should not show the recently reopened tasks");
      })
      .click("h3#because-we-work-with-attorneys", function() {
        console.log("Continue moving the rest of the campaign back to active");
      })
      .pause(test_speed)
      .waitForElementPresent("h2#because-we-work-with-attorneys", timeout_speed)
      .waitForElementPresent("h2#reopen-button", timeout_speed)
      .assert.containsText("h2#reopen-button", "REOPEN")
      .waitForElementPresent("button#reopen-button", timeout_speed)
      .click("button#reopen-button", function() {
        console.log("Check the active list again");
      })
      .pause(test_speed)
      .waitForElementPresent("div#babysteps-welcome", timeout_speed, function() {
        console.log("Continue to check presence of Babysteps Welcome campaign while some tasks are still completed")
      })
      .waitForElementPresent("h3#congratulations-on-your-pregnancy", timeout_speed)
      .waitForElementPresent("h3#because-we-work-with-attorneys", timeout_speed)
      .click("li#completed-button")
      .pause(test_speed)
      .waitForElementPresent("div#babysteps-welcome", timeout_speed)
      .waitForElementPresent("h3#tap-on-me", timeout_speed)
      .waitForElementPresent("h3#need-technical-help-we_re-here", timeout_speed)
      .waitForElementNotPresent("h3#congratulations-on-your-pregnancy", timeout_speed, function() {
        console.log("Continue to make sure correct tasks no longer appear in completed list once reopened");
      })
      .waitForElementNotPresent("h3#because-we-work-with-attorneys", timeout_speed)
      .click("h3#tap-on-me")
      .pause(test_speed)
      .waitForElementPresent("h2#tap-on-me", timeout_speed)
      .waitForElementPresent("h2#reopen-button", timeout_speed)
      .assert.containsText("h2#reopen-button", "REOPEN")
      .waitForElementPresent("button#reopen-button", timeout_speed)
      .click("button#reopen-button")
      .pause(test_speed)
      .waitForElementPresent("div#babysteps-welcome", timeout_speed)
      .waitForElementPresent("h3#congratulations-on-your-pregnancy", timeout_speed)
      .waitForElementPresent("h3#because-we-work-with-attorneys", timeout_speed)
      .waitForElementPresent("h3#tap-on-me", timeout_speed)
      .click("li#completed-button")
      .pause(test_speed)
      .waitForElementPresent("div#babysteps-welcome", timeout_speed, function() {
        console.log("Continue to check presence of Babysteps Welcome campaign while some tasks are still completed")
      })
      .waitForElementPresent("h3#need-technical-help-we_re-here", timeout_speed)
      .waitForElementNotPresent("h3#congratulations-on-your-pregnancy", timeout_speed, function() {
        console.log("Continue to make sure correct tasks no longer appear in completed list once reopened");
      })
      .waitForElementNotPresent("h3#because-we-work-with-attorneys", timeout_speed)
      .waitForElementNotPresent("h3#tap-on-me", timeout_speed)
      .click("h3#need-technical-help-we_re-here")
      .pause(test_speed)
      .waitForElementPresent("h2#need-technical-help-we_re-here", timeout_speed)
      .waitForElementPresent("h2#reopen-button", timeout_speed)
      .assert.containsText("h2#reopen-button", "REOPEN")
      .waitForElementPresent("button#reopen-button", timeout_speed)
      .click("button#reopen-button")
      .pause(test_speed)
      .waitForElementPresent("div#babysteps-welcome", timeout_speed)
      .waitForElementPresent("h3#congratulations-on-your-pregnancy", timeout_speed)
      .waitForElementPresent("h3#because-we-work-with-attorneys", timeout_speed)
      .waitForElementPresent("h3#tap-on-me", timeout_speed)   
      .waitForElementPresent("h3#need-technical-help-we_re-here", timeout_speed)
      .click("li#completed-button")
      .pause(test_speed)
      .waitForElementNotPresent("div#babysteps-welcome", timeout_speed, function() {
        console.log("Check completed task list--should be empty");
      })      
      .waitForElementNotPresent("h3#congratulations-on-your-pregnancy", timeout_speed)
      .waitForElementNotPresent("h3#because-we-work-with-attorneys", timeout_speed)
      .waitForElementNotPresent("h3#tap-on-me", timeout_speed)   
      .waitForElementNotPresent("h3#need-technical-help-we_re-here", timeout_speed)
      .pause(test_speed)
      .end();
  },

  "Test moving all tasks from one active campaign to skipped and vice versa" : function (browser) {
    browser
      // makes sure the campaign header is there
      .waitForElementPresent("div#week-6", timeout_speed, function() {
        console.log("Starting assertion tests.");
      })
      // and then the associated tasks
      .waitForElementPresent("h3#prenatal-labs", timeout_speed, function() {
        console.log("Checking to see if appropriate tasks are in active list");
      })
      .waitForElementPresent("h3#don_t-forget-about-your-prenatal-vitamins", timeout_speed)
      .waitForElementPresent("h3#get-educated-on-eating-right", timeout_speed)
      .waitForElementPresent("h3#do-i-need-folic-acid-in-my-diet", timeout_speed)
      .waitForElementPresent("h3#let_s-talk-about-genetic-screening", timeout_speed)
      .click("li#skipped-button", function() {
        console.log("Checking skipped list to make sure it's empty to start");
      })
      .pause(test_speed)
      // check to make sure the skipped task list is empty
      .waitForElementNotPresent("div#week-6", timeout_speed)
      // and then the associated tasks
      .waitForElementNotPresent("h3#prenatal-labs", timeout_speed)
      .waitForElementNotPresent("h3#don_t-forget-about-your-prenatal-vitamins", timeout_speed)
      .waitForElementNotPresent("h3#get-educated-on-eating-right", timeout_speed)
      .waitForElementNotPresent("h3#do-i-need-folic-acid-in-my-diet", timeout_speed)
      .waitForElementNotPresent("h3#let_s-talk-about-genetic-screening", timeout_speed)
      .waitForElementPresent("div.no-items", timeout_speed)
      .click("li#active-button", function() {
        console.log("Head back to the active list to start moving tasks over");
      })
      .pause(test_speed)
      .waitForElementPresent("div#week-6", timeout_speed)
      .waitForElementPresent("h3#prenatal-labs", timeout_speed)
      .waitForElementPresent("h3#don_t-forget-about-your-prenatal-vitamins", timeout_speed)
      .waitForElementPresent("h3#get-educated-on-eating-right", timeout_speed)
      .waitForElementPresent("h3#do-i-need-folic-acid-in-my-diet", timeout_speed)
      .click("h3#prenatal-labs")
      .pause(test_speed)
      .waitForElementPresent("h2#prenatal-labs", timeout_speed)
      .waitForElementPresent("button#skip-button", timeout_speed)
      .waitForElementPresent("h2#skip-button", timeout_speed)
      .assert.containsText("h2#skip-button", "DO IT LATER")
      .waitForElementPresent("button#completed-button", timeout_speed)
      .waitForElementPresent("h2#completed-button", timeout_speed)
      .assert.containsText("h2#completed-button", "DID IT")
      .click("button#skip-button", function() {
        console.log("Clicked do it later");
      })
      .pause(test_speed)
      .waitForElementPresent("div#week-6", timeout_speed, function() {
        console.log("Make sure the appropriate tasks are present in the active list");
      })
      .waitForElementPresent("h3#don_t-forget-about-your-prenatal-vitamins", timeout_speed)
      .waitForElementPresent("h3#get-educated-on-eating-right", timeout_speed)
      .waitForElementPresent("h3#do-i-need-folic-acid-in-my-diet", timeout_speed)
      .waitForElementNotPresent("h3#prenatal-labs", timeout_speed, function() {
        console.log("Make sure the appropriate tasks are not present in the active list");
      })
      .click("li#skipped-button", function() {
        console.log("Check the skipped list and make sure appropriate tasks and campaigns are present");
      })
      .pause(test_speed)
      .waitForElementPresent("div#week-6", timeout_speed)
      .waitForElementPresent("h3#prenatal-labs", timeout_speed)
      .waitForElementNotPresent("h3#don_t-forget-about-your-prenatal-vitamins", timeout_speed)
      .waitForElementNotPresent("h3#get-educated-on-eating-right", timeout_speed)
      .waitForElementNotPresent("h3#do-i-need-folic-acid-in-my-diet", timeout_speed)
      .waitForElementNotPresent("h3#let_s-talk-about-genetic-screening", timeout_speed)
      .click("li#active-button", function() {
        console.log("Continue moving elements to the skipped list");
      })
      .pause(test_speed)
      .click("h3#do-i-need-folic-acid-in-my-diet")
      .pause(test_speed)
      .waitForElementPresent("h2#do-i-need-folic-acid-in-my-diet", timeout_speed)
      .waitForElementPresent("button#completed-button", timeout_speed)
      .waitForElementPresent("h2#completed-button", timeout_speed)
      .assert.containsText("h2#completed-button", "GOT IT")
      .waitForElementPresent("button#get-started-button", timeout_speed)
      .waitForElementPresent("h2#get-started-button", timeout_speed)
      .assert.containsText("h2#get-started-button", "GET STARTED")
      .click("button#get-started-button", function() {
        console.log("Check the associated resource page");
      })
      .pause(test_speed)
      .waitForElementPresent("h1.title.ng-binding", timeout_speed, function() {
        console.log("Check the nav bar to make sure it reached a resources page");
      })
      .assert.containsText("h1.title.ng-binding", "RESOURCES")
      .waitForElementPresent("h1#eating-right", timeout_speed, function() {
        console.log("Make sure the task linked to the correct resources page");
      })
      .assert.containsText("h1#eating-right", "EATING RIGHT")
      .click("ion-nav-back-button#tasks-back-button", function() {
        console.log("Make sure the back button leads back to task page, and not a task list")
      })
      .pause(test_speed)
      .waitForElementPresent("h2#do-i-need-folic-acid-in-my-diet", timeout_speed)
      .waitForElementPresent("button#completed-button", timeout_speed)
      .waitForElementPresent("h2#completed-button", timeout_speed)
      .assert.containsText("h2#completed-button", "GOT IT")
      .waitForElementPresent("button#get-started-button", timeout_speed)
      .waitForElementPresent("h2#get-started-button", timeout_speed)
      .assert.containsText("h2#get-started-button", "GET STARTED")
      .click("button#completed-button", function() {
        console.log("Moving task to the completed page");
      })
      .pause(test_speed)
      .waitForElementPresent("div#week-6", timeout_speed, function() {
        console.log("Check appropriate presence of active tasks");
      })
      .waitForElementPresent("h3#don_t-forget-about-your-prenatal-vitamins", timeout_speed)
      .waitForElementPresent("h3#get-educated-on-eating-right", timeout_speed)
      .waitForElementPresent("h3#let_s-talk-about-genetic-screening", timeout_speed)
      .waitForElementNotPresent("h3#prenatal-labs", timeout_speed, function() {
        console.log("Check appropriate absence of skipped tasks");
      })
      .waitForElementNotPresent("h3#do-i-need-folic-acid-in-my-diet", timeout_speed, function () {
        console.log("Check appropriate absence of completed tasks");
      })
      .click("li#completed-button", function() {
        console.log("Moving to completed list");
      })
      .pause(test_speed)
      .waitForElementPresent("div#week-6", timeout_speed, function() {
        console.log("Checking appropriate presence of completed tasks");
      })
      .waitForElementPresent("h3#do-i-need-folic-acid-in-my-diet", timeout_speed)
      .click("li#active-button", function() {
        console.log("Continue moving tasks from active");
      })
      .pause(test_speed)
      .click("h3#don_t-forget-about-your-prenatal-vitamins")
      .pause(test_speed)
      .waitForElementPresent("h2#don_t-forget-about-your-prenatal-vitamins", timeout_speed)
      // check presence of all appropriate buttons
      .waitForElementPresent("h2#skip-button", timeout_speed)
      .assert.containsText("h2#skip-button", "DO IT LATER")
      .waitForElementPresent("button#skip-button", timeout_speed)
      .waitForElementPresent("h2#completed-button", timeout_speed)
      .assert.containsText("h2#completed-button", "DID IT")
      .waitForElementPresent("button#completed-button", timeout_speed)
      .waitForElementPresent("h2#get-started-button", timeout_speed)
      .assert.containsText("h2#get-started-button", "GET STARTED")
      .waitForElementPresent("button#get-started-button", timeout_speed)
      // at this point, already checked the get started button, but one more time can't hurt
      .click("button#get-started-button", function() {
        console.log("Checking the get started button functionality a second time");
      })
      .pause(test_speed)
      .waitForElementPresent("h1.title.ng-binding", timeout_speed, function() {
        console.log("Check the nav bar to make sure it reached a resources page");
      })
      .assert.containsText("h1.title.ng-binding", "RESOURCES")
      .waitForElementPresent("h1#prenatal-vitamins", timeout_speed, function() {
        console.log("Make sure the task linked to the correct resources page");
      })
      .assert.containsText("h1#prenatal-vitamins", "PRENATAL VITAMINS")
      .click("ion-nav-back-button#tasks-back-button", function() {
        console.log("Make sure the back button leads back to task page, and not a tasks list")
      })
      .pause(test_speed)
      .waitForElementPresent("h2#don_t-forget-about-your-prenatal-vitamins", timeout_speed)
      // check presence of all appropriate buttons
      .waitForElementPresent("h2#skip-button", timeout_speed)
      .assert.containsText("h2#skip-button", "DO IT LATER")
      .waitForElementPresent("button#skip-button", timeout_speed)
      .waitForElementPresent("h2#completed-button", timeout_speed)
      .assert.containsText("h2#completed-button", "DID IT")
      .waitForElementPresent("button#completed-button", timeout_speed)
      .waitForElementPresent("h2#get-started-button", timeout_speed)
      .assert.containsText("h2#get-started-button", "GET STARTED")
      .waitForElementPresent("button#get-started-button", timeout_speed)
      .click("button#skip-button", function() {
        console.log("Moved another task to the skipped list");
      })
      .pause(test_speed)
      .waitForElementPresent("div#week-6", timeout_speed, function() {
        console.log("Check appropriate presence of active tasks in active list");
      })
      .waitForElementPresent("h3#get-educated-on-eating-right", timeout_speed)
      .waitForElementPresent("h3#let_s-talk-about-genetic-screening", timeout_speed)
      .waitForElementNotPresent("h3#prenatal-labs", timeout_speed, function() {
        console.log("Check appropriate absence of skipped tasks in active list");
      })
      .waitForElementNotPresent("h3#don_t-forget-about-your-prenatal-vitamins", timeout_speed)
      .waitForElementNotPresent("h3#do-i-need-folic-acid-in-my-diet", timeout_speed)
      .click("li#skipped-button", function() {
        console.log("Check appropriate presence of skipped tasks");
      })
      .waitForElementPresent("div#week-6", timeout_speed, function() {
        console.log("Check appropriate presence of tasks in skipped list");
      })
      .waitForElementPresent("h3#prenatal-labs", timeout_speed)
      .waitForElementPresent("h3#don_t-forget-about-your-prenatal-vitamins", timeout_speed)
      .waitForElementNotPresent("h3#get-educated-on-eating-right", timeout_speed, function() {
        console.log("Check appropriate absence of tasks in skipped list");
      })
      .waitForElementNotPresent("h3#do-i-need-folic-acid-in-my-diet", timeout_speed)
      .waitForElementNotPresent("h3#let_s-talk-about-genetic-screening", timeout_speed)
      .click("li#active-button", function() {
        console.log("Head back to active list and continue skipping tasks in the active list");
      })
      .pause(test_speed)
      .click("h3#get-educated-on-eating-right", function() {
        console.log("Clicked on get educated on eating right");
      })
      .waitForElementPresent("h2#get-educated-on-eating-right", timeout_speed)
      // check presence of all appropriate buttons
      .waitForElementPresent("h2#skip-button", timeout_speed)
      .getText("h2#get-started-button", function(result) {
        console.log(result);
      })
      .assert.containsText("h2#skip-button", "DO IT LATER")
      .waitForElementPresent("button#skip-button", timeout_speed)
      .waitForElementPresent("h2#completed-button", timeout_speed)
      .assert.containsText("h2#completed-button", "DID IT")
      .waitForElementPresent("button#completed-button", timeout_speed)
      .waitForElementPresent("h2#get-started-button", timeout_speed)
      .assert.containsText("h2#get-started-button", "GET STARTED")
      .waitForElementPresent("button#get-started-button", timeout_speed)
      // third check for get started
      .moveToElement("h2#get-started-button", 10, 10)
      .click("button#get-started-button", function() {
        console.log("Checking the get started button functionality a second time");
      })
      .pause(test_speed)
      .waitForElementPresent("h1.title.ng-binding", timeout_speed, function() {
        console.log("Check the nav bar to make sure it reached a resources page");
      })
      .assert.containsText("h1.title.ng-binding", "RESOURCES")
      .waitForElementPresent("h1#eating-right", timeout_speed, function() {
        console.log("Make sure the task linked to the correct resources page");
      })
      .assert.containsText("h1#eating-right", "EATING RIGHT")
      .click("ion-nav-back-button#tasks-back-button", function() {
        console.log("Make sure the back button leads back to task page, and not a tasks list")
      })
      .pause(test_speed)
      .waitForElementPresent("h2#get-educated-on-eating-right", timeout_speed)
      // check presence of all appropriate buttons
      .waitForElementPresent("h2#skip-button", timeout_speed)
      .assert.containsText("h2#skip-button", "DO IT LATER")
      .waitForElementPresent("button#skip-button", timeout_speed)
      .waitForElementPresent("h2#completed-button", timeout_speed)
      .assert.containsText("h2#completed-button", "DID IT")
      .waitForElementPresent("button#completed-button", timeout_speed)
      .waitForElementPresent("h2#get-started-button", timeout_speed)
      .assert.containsText("h2#get-started-button", "GET STARTED")
      .waitForElementPresent("button#get-started-button", timeout_speed)
      .click("button#skip-button", function() {
        console.log("Moved get educated on eating right to skipped list");
      })
      .waitForElementPresent("div#week-6", timeout_speed, function() {
        console.log("Check appropriate presence of active tasks in active list");
      })
      .waitForElementPresent("h3#let_s-talk-about-genetic-screening", timeout_speed)
      .waitForElementNotPresent("h3#prenatal-labs", timeout_speed, function() {
        console.log("Check appropriate absence of skipped tasks in active list");
      })
      .waitForElementNotPresent("h3#don_t-forget-about-your-prenatal-vitamins", timeout_speed)
      .waitForElementNotPresent("h3#get-educated-on-eating-right", timeout_speed)
      .waitForElementNotPresent("h3#do-i-need-folic-acid-in-my-diet", timeout_speed)
      .click("li#skipped-button", function() {
        console.log("Check appropriate presence of skipped task in skipped list")
      })
      .waitForElementPresent("div#week-6", timeout_speed)
      .waitForElementPresent("h3#prenatal-labs", timeout_speed)
      .waitForElementPresent("h3#don_t-forget-about-your-prenatal-vitamins", timeout_speed)
      .waitForElementPresent("h3#get-educated-on-eating-right", timeout_speed)
      .waitForElementNotPresent("h3#do-i-need-folic-acid-in-my-diet", timeout_speed, function() {
        console.log("Check appropriate absence of tasks that are in the completed list");
      })
      .waitForElementNotPresent("h3#let_s-talk-about-genetic-screening", timeout_speed, function() {
        console.log("Check appropriate absence of tasks that are in the active list");
      })
      .click("li#active-button", function() {
        console.log("Move the last task from active to skipped");
      })
      .pause(test_speed)
      .click("h3#let_s-talk-about-genetic-screening", function() {
        console.log("Clicked let's talk about genetic screening");
      })
      .pause(test_speed)
      .waitForElementPresent("h2#let_s-talk-about-genetic-screening", timeout_speed)
      // check presence of all appropriate buttons
      .waitForElementPresent("h2#skip-button", timeout_speed)
      .assert.containsText("h2#skip-button", "DO IT LATER")
      .waitForElementPresent("button#skip-button", timeout_speed)
      .waitForElementPresent("h2#completed-button", timeout_speed)
      .assert.containsText("h2#completed-button", "DID IT")
      .waitForElementPresent("button#completed-button", timeout_speed)
      .waitForElementPresent("h2#get-started-button", timeout_speed)
      .assert.containsText("h2#get-started-button", "GET STARTED")
      .waitForElementPresent("button#get-started-button", timeout_speed)
      .click("button#get-started-button", function() {
        console.log("Clicked the get started button");
      })
      .pause(test_speed)
      .waitForElementPresent("h1.title.ng-binding", timeout_speed, function() {
        console.log("Check the nav bar to make sure it reached a resources page");
      })
      .assert.containsText("h1.title.ng-binding", "RESOURCES")
      .waitForElementPresent("h1#genetic-options", timeout_speed, function() {
        console.log("Make sure the task linked to the correct resources page");
      })
      .assert.containsText("h1#genetic-options", "GENETIC OPTIONS")
      .click("ion-nav-back-button#tasks-back-button", function() {
        console.log("Make sure the back button leads back to task page, and not a tasks list")
      })
      .pause(test_speed)
      .waitForElementPresent("h2#let_s-talk-about-genetic-screening", timeout_speed)
      // check presence of all appropriate buttons
      .waitForElementPresent("h2#skip-button", timeout_speed)
      .assert.containsText("h2#skip-button", "DO IT LATER")
      .waitForElementPresent("button#skip-button", timeout_speed)
      .waitForElementPresent("h2#completed-button", timeout_speed)
      .assert.containsText("h2#completed-button", "DID IT")
      .waitForElementPresent("button#completed-button", timeout_speed)
      .waitForElementPresent("h2#get-started-button", timeout_speed)
      .assert.containsText("h2#get-started-button", "GET STARTED")
      .waitForElementPresent("button#get-started-button", timeout_speed)
      .click("button#skip-button", function() {
        console.log("Move the last active task to completed");
      })
      .pause(test_speed)
      .waitForElementNotPresent("div#week-6", timeout_speed, function() {
        console.log("Check appropriate absence of the entire week 6 campaign in the active list");
      })
      .waitForElementNotPresent("h3#prenatal-labs", timeout_speed, function() {
        console.log("Check appropriate absence of skipped tasks in active list");
      })
      .waitForElementNotPresent("h3#don_t-forget-about-your-prenatal-vitamins", timeout_speed)
      .waitForElementNotPresent("h3#get-educated-on-eating-right", timeout_speed)
      .waitForElementNotPresent("h3#do-i-need-folic-acid-in-my-diet", timeout_speed)
      .waitForElementNotPresent("h3#let_s-talk-about-genetic-screening", timeout_speed)
      .click("li#skipped-button", function() {
        console.log("Check appropriate presence of skipped tasks in skipped list")
      })
      .pause(test_speed)
      .waitForElementPresent("div#week-6", timeout_speed)
      .waitForElementPresent("h3#prenatal-labs", timeout_speed)
      .waitForElementPresent("h3#don_t-forget-about-your-prenatal-vitamins", timeout_speed)
      .waitForElementPresent("h3#get-educated-on-eating-right", timeout_speed)
      .waitForElementPresent("h3#let_s-talk-about-genetic-screening", timeout_speed)
      .waitForElementNotPresent("h3#do-i-need-folic-acid-in-my-diet", timeout_speed, function() {
        console.log("Check appropriate absence of tasks that are in the completed list");
      })
      .click("li#completed-button", function() {
        console.log("Move the tasks from completed back to the active list");
      })
      .pause(test_speed)
      .waitForElementPresent("div#week-6", timeout_speed)
      .waitForElementPresent("h3#do-i-need-folic-acid-in-my-diet", timeout_speed)
      .click("h3#do-i-need-folic-acid-in-my-diet", function() {
        console.log("Clicked on do I need folic acid in my diet");
      })
      .pause(test_speed)
      .waitForElementPresent("h2#do-i-need-folic-acid-in-my-diet", timeout_speed)
      .waitForElementPresent("h2#reopen-button", timeout_speed)
      .assert.containsText("h2#reopen-button", "REOPEN")
      .waitForElementPresent("button#reopen-button", timeout_speed)
      .click("button#reopen-button", function() {
        console.log("Clicked the reopen button");
      })
      .pause(test_speed)
      .waitForElementPresent("div#week-6", timeout_speed, function() {
        console.log("Check the active tasks list");
      })
      .waitForElementPresent("h3#do-i-need-folic-acid-in-my-diet", timeout_speed, function() {
        console.log("Check appropriate presence of active tasks");
      })
      .waitForElementNotPresent("h3#prenatal-labs", timeout_speed, function() {
        console.log("Check appropriate absence of skipped tasks");
      })
      .waitForElementNotPresent("h3#don_t-forget-about-your-prenatal-vitamins", timeout_speed)
      .waitForElementNotPresent("h3#get-educated-on-eating-right", timeout_speed)
      .waitForElementNotPresent("h3#let_s-talk-about-genetic-screening", timeout_speed)
      .click("li#completed-button", function() {
        console.log("Moved to completed list");
      })
      .pause(test_speed)
      .waitForElementPresent("div.no-items", timeout_speed, function() {
        console.log("Ensure the emptiness of the completed list");
      })
      .click("li#skipped-button", function() {
        console.log("Moved to the skipped list");
      })
      .pause(test_speed)
      .click("h3#prenatal-labs", function() {
        console.log("Clicked on prenatal labs");
      })
      .pause(test_speed)
      .waitForElementPresent("h2#prenatal-labs", timeout_speed)
      .waitForElementPresent("h2#reopen-button", timeout_speed)
      .assert.containsText("h2#reopen-button", "REOPEN")
      .waitForElementPresent("button#reopen-button", timeout_speed)
      .click("button#reopen-button", function () {
        console.log("Clicked on reopen to move the prenatal labs task back");
      })
      .pause(test_speed)
      .waitForElementPresent("div#week-6", timeout_speed, function() {
        console.log("Check the active tasks list");
      })
      .waitForElementPresent("h3#do-i-need-folic-acid-in-my-diet", timeout_speed, function() {
        console.log("Check appropriate presence of active tasks");
      })
      .waitForElementPresent("h3#prenatal-labs", timeout_speed)
      .waitForElementNotPresent("h3#don_t-forget-about-your-prenatal-vitamins", timeout_speed, function() {
        console.log("Check appropriate absence of skipped tasks");
      })
      .waitForElementNotPresent("h3#get-educated-on-eating-right", timeout_speed)
      .waitForElementNotPresent("h3#let_s-talk-about-genetic-screening", timeout_speed)
      .click("li#skipped-button", function() {
        console.log("Moved back to the skipped list");
      })
      .pause(test_speed)
      .waitForElementPresent("div#week-6", timeout_speed, function() {
        console.log("Check the appropriate presence of remaining skipped tasks");
      })
      .waitForElementPresent("h3#don_t-forget-about-your-prenatal-vitamins", timeout_speed)
      .waitForElementPresent("h3#get-educated-on-eating-right", timeout_speed)
      .waitForElementPresent("h3#let_s-talk-about-genetic-screening", timeout_speed)
      .waitForElementNotPresent("h3#prenatal-labs", timeout_speed, function() {
        console.log("Check the appropriate absence of reopened tasks");
      })
      .click("h3#don_t-forget-about-your-prenatal-vitamins", function() {
        console.log("Clicked on don't forget about your prenatal vitamins");
      })
      .pause(test_speed)
      .waitForElementPresent("h2#don_t-forget-about-your-prenatal-vitamins", timeout_speed)
      .waitForElementPresent("h2#reopen-button", timeout_speed)
      .assert.containsText("h2#reopen-button", "REOPEN")
      .waitForElementPresent("button#reopen-button", timeout_speed)
      .click("button#reopen-button", function () {
        console.log("Clicked on reopen to move don't forget about your prenatal vitamins task back");
      })
      .pause(test_speed)
      .waitForElementPresent("div#week-6", timeout_speed, function() {
        console.log("Check the active tasks list");
      })
      .waitForElementPresent("h3#do-i-need-folic-acid-in-my-diet", timeout_speed, function() {
        console.log("Check appropriate presence of active tasks");
      })
      .waitForElementPresent("h3#prenatal-labs", timeout_speed)
      .waitForElementPresent("h3#don_t-forget-about-your-prenatal-vitamins", timeout_speed)
      .waitForElementNotPresent("h3#get-educated-on-eating-right", timeout_speed, function() {
        console.log("Check appropriate absence of skipped tasks");
      })
      .waitForElementNotPresent("h3#let_s-talk-about-genetic-screening", timeout_speed)
      .click("li#skipped-button", function() {
        console.log("Moved back to the skipped list");
      })
      .pause(test_speed)
      .waitForElementPresent("div#week-6", timeout_speed, function() {
        console.log("Check the appropriate presence of remaining skipped tasks");
      })
      .waitForElementPresent("h3#get-educated-on-eating-right", timeout_speed)
      .waitForElementPresent("h3#let_s-talk-about-genetic-screening", timeout_speed)
      .waitForElementNotPresent("h3#prenatal-labs", timeout_speed, function() {
        console.log("Check the appropriate absence of reopened tasks");
      })
      .waitForElementNotPresent("h3#don_t-forget-about-your-prenatal-vitamins", timeout_speed)
      .click("h3#get-educated-on-eating-right", function() {
        console.log("Clicked on get educated on eating right");
      })
      .pause(test_speed)
      .waitForElementPresent("h2#get-educated-on-eating-right", timeout_speed)
      .waitForElementPresent("h2#reopen-button", timeout_speed)
      .assert.containsText("h2#reopen-button", "REOPEN")
      .waitForElementPresent("button#reopen-button", timeout_speed)
      .click("button#reopen-button", function () {
        console.log("Clicked on reopen to move get educated on eating right task back");
      })
      .pause(test_speed)
      .waitForElementPresent("div#week-6", timeout_speed, function() {
        console.log("Check the active tasks list");
      })
      .waitForElementPresent("h3#do-i-need-folic-acid-in-my-diet", timeout_speed, function() {
        console.log("Check appropriate presence of active tasks");
      })
      .waitForElementPresent("h3#prenatal-labs", timeout_speed)
      .waitForElementPresent("h3#don_t-forget-about-your-prenatal-vitamins", timeout_speed)
      .waitForElementPresent("h3#get-educated-on-eating-right", timeout_speed)
      .waitForElementNotPresent("h3#let_s-talk-about-genetic-screening", timeout_speed, function() {
        console.log("Check appropriate absence of skipped tasks");
      })
      .click("li#skipped-button", function() {
        console.log("Moved back to the skipped list");
      })
      .pause(test_speed)
      .waitForElementPresent("div#week-6", timeout_speed, function() {
        console.log("Check the appropriate presence of remaining skipped tasks");
      })
      .waitForElementPresent("h3#let_s-talk-about-genetic-screening", timeout_speed)
      .waitForElementNotPresent("h3#prenatal-labs", timeout_speed, function() {
        console.log("Check the appropriate absence of reopened tasks");
      })
      .waitForElementNotPresent("h3#don_t-forget-about-your-prenatal-vitamins", timeout_speed)
      .waitForElementNotPresent("h3#get-educated-on-eating-right", timeout_speed)
      .click("h3#let_s-talk-about-genetic-screening", function() {
        console.log("Clicked on let's talk about genetic screening");
      })
      .pause(test_speed)
      .waitForElementPresent("h2#let_s-talk-about-genetic-screening", timeout_speed)
      .waitForElementPresent("h2#reopen-button", timeout_speed)
      .assert.containsText("h2#reopen-button", "REOPEN")
      .waitForElementPresent("button#reopen-button", timeout_speed)
      .click("button#reopen-button", function () {
        console.log("Clicked on reopen to move let's talk about genetic screening task back");
      })
      .pause(test_speed)
      .waitForElementPresent("div#week-6", timeout_speed, function() {
        console.log("Check the active tasks list");
      })
      .waitForElementPresent("h3#do-i-need-folic-acid-in-my-diet", timeout_speed, function() {
        console.log("Check appropriate presence of active tasks");
      })
      .waitForElementPresent("h3#prenatal-labs", timeout_speed)
      .waitForElementPresent("h3#don_t-forget-about-your-prenatal-vitamins", timeout_speed)
      .waitForElementPresent("h3#get-educated-on-eating-right", timeout_speed)
      .waitForElementPresent("h3#let_s-talk-about-genetic-screening", timeout_speed)
      .click("li#skipped-button", function () {
        console.log("Ensure the skipped list is now empty");
      })
      .waitForElementNotPresent("div#week-6", timeout_speed, function() {
        console.log("Check the absence of all skipped tasks");
      })
      .waitForElementNotPresent("h3#let_s-talk-about-genetic-screening", timeout_speed)
      .waitForElementNotPresent("h3#prenatal-labs", timeout_speed)
      .waitForElementNotPresent("h3#don_t-forget-about-your-prenatal-vitamins", timeout_speed)
      .waitForElementNotPresent("h3#get-educated-on-eating-right", timeout_speed)
      .waitForElementPresent("div.no-items", timeout_speed)
      .end();
  }

};





