<?php
require_once '../bootstrap.php';
require_once 'requestInitializer.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

  error_log("The post request for pushes was made");

  // get the post data  
  $postdata = file_get_contents("php://input");
  $request = json_decode($postdata);

  error_log("The request is: ");
  error_log(print_r($request, true));
  error_log("The request token is: $request->token");
  error_log("The request email is: $request->email");

  if (!isset($request->token)) {
    echo json_encode(array(
      'status' => 'error',
      'error' => 'couldn\'t get the token from post request'
    ));
    exit();
  }

  if (!isset($request->email)) {
    echo json_encode(array(
      'status' => 'error',
      'error' => 'couldn\'t get the user\'s email from post request'
    ));
    exit();
  }

  // First, find the user_id of the person who just logged in
  $userEmail = $request->email;
  $loggedInUser = User::findByEmail($userEmail);
  error_log("The user found by the email is: ");
  error_log(print_r($loggedInUser, true));
  $curUserId = $loggedInUser->id;
  error_log("The user id is: $curUserId");
  $userDeviceToken = $request->token;
  error_log("The user's device token is $userDeviceToken");

  $success = User::updateUserDeviceToken($curUserId, $userDeviceToken);

  if ($success) {
    Log::user("Successfully updated user device token");
    echo json_encode(array(
      'status' => 'success',
      'userDeviceToken' => $userDeviceToken
    ));
  } else {
    Log::user("Error in updating user device token");
    echo json_encode(array(
      'status' => 'failure'
    ));
  }

} else if ($_SERVER['REQUEST_METHOD'] == 'GET') {

  error_log("The get request for pushes was made");

  // exit();

}
