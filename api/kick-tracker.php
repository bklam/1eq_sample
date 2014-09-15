<?php
require_once '../bootstrap.php';
require_once 'requestInitializer.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST'):
  // get the post data
  $postdata = file_get_contents("php://input");
  $request = json_decode($postdata);

  if (!isset($request->reset)) {
    echo json_encode(array(
      'status' => 'error',
      'error' => 'couldn\'t get data from post request'
    ));
    exit();
  }

  boldError("request reset is: ".(string)$request->reset);

  // if the request is sent with a json object saying kicks should be deleted
  if ($request->reset) {
    $curTime = new DateTime();
    // update the reset time
    $updated = DataPoint::updateUserDataPoint($userId, DataPoint::$BABY_KICK_RESET, $curTime->format(DATABASE_DATETIME_FORMAT));

    if (!$updated) {
      echo json_encode(array(
        'status' => 'error',
        'error'  => 'couldn\'t update reset time'
      ));
      exit();
    }
    boldError("reset time updated");

    // zero out the new value so the email checks still work
    $zeroed = DataPoint::updateUserDataPoint($userId, DataPoint::$BABY_KICK, 0);
    if (!$zeroed) {
      echo json_encode(array(
        'status' => 'error',
        'error'  => 'couldn\'t zero out user data point'
      ));
      exit();
    }

    // get the new number of kicks to make sure it worked and display again on the page
    $curNumKicks = DataPoint::getNumDataPointsWithinReset(DataPoint::$BABY_KICK, $userId);

    boldError("Success");
    echo json_encode(array(
      'status'   => 'success',
      'numKicks' => (int)$curNumKicks,
    ));

  } else {

    $patient          = User::findById($userId)->getAdditionalInfo();

    $patientFirstName = $patient->first_name;
    $patientLastName  = $patient->last_name;
    $patientEmail     = $patient->email;
    $patientPhone     = $patient->phone;

    $provider         = User::usersProviders($userId)[0];
    $providerName     = $provider["first_name"];

    $timesBeenEmailed = User::numKickEmailsInPastTwoHours($userId);
    boldError('timesBeenEmailed is: ' . (string)$timesBeenEmailed);

    // $timesBeenEmailed is -1 if the method errored out
    if ($timesBeenEmailed < 0) {
      echo json_encode(array(
        'status' => 'error',
        'error'  => 'couldn\'t get number of sent emails'
      ));
      exit();
    }
    // get a date time for two hours ago
    $twoHoursAgo   = new DateTime();
    $twoHoursAgo->sub(new DateInterval("PT2H"));
    // get the most recent reset time, though it's stored as a string
    $lastResetTime = DataPoint::getValueForDataPoint(DataPoint::$BABY_KICK_RESET, $userId);
    // so convert it back to a DateTime so you can compare it
    $lastResetTime = DateTime::createFromFormat(DATABASE_DATETIME_FORMAT, $lastResetTime);
    // if the reset time is less than two hours ago, compare kicks to reset time
    if($lastResetTime > $twoHoursAgo) {

      $curNumKicks = DataPoint::getNumDataPointsWithinReset(DataPoint::$BABY_KICK, $userId);

    } else {

      $curNumKicks = DataPoint::getNumDataPointsWithinTwoHours(DataPoint::$BABY_KICK, $userId);

    }

    boldError('curNumKicks is: ' . (string)$curNumKicks);
    $curNumKicksBeforeIncrement = $curNumKicks;

    // $curNumKicks is -1 if the method errored out
    if ($curNumKicks < 0) {
      echo json_encode(array(
        'status' => 'error',
        'error'  => 'couldn\'t get current number of kicks'
      ));
      exit();
    }

    $oldNumKicks = DataPoint::getMostRecentKickCount($userId, DataPoint::$BABY_KICK);

    // if the current number of records is successfully gotten from the database
    // increment the number of kicks then update the value in the database
    $completed = DataPoint::updateUserDataPoint($userId, DataPoint::$BABY_KICK, ++$curNumKicks);
    if (!$completed) {
      echo json_encode(array(
        'status' => 'error',
        'error'  => 'failed insert'
      ));
      exit();
    }

    // if the number of kicks before the update is greater than the amount after the update
    // then that means the patient never reached 10 kicks in an hour, so send an alert email
    // but disregard the case where people start from 0 and go to 1 kick

    if (($oldNumKicks >= $curNumKicks)
        && ($curNumKicksBeforeIncrement != 0)
        && ($timesBeenEmailed < 1))
    {

      $data = array(
        'email'    => $patientEmail,
        'subject'  => 'Irregular Kick Count',
        'textArgs' => json_encode(array('name' => $patientFirstName))
      );

      $user_group_admin_id = Group::getGroupAdminByUser($userId);
      $user_group_admin    = User::findById($user_group_admin_id)->getAdditionalInfo();
      $userGroupAdminEmail = $user_group_admin->email;
      $userGroupAdminName  = $user_group_admin->first_name;

      $provider_data = array(
        'email'    => $userGroupAdminEmail,
        'subject'  => 'Patient With Irregular Kick Count',
        'textArgs' => json_encode(array(
          'patient_first_name'    => $patientFirstName,
          'patient_last_name'     => $patientLastName,
          'patient_phone_number'  => $patientPhone,
          'patient_email'         => $patientEmail,
          'patient_provider_name' => $providerName,
          'admin_first_name'      => $userGroupAdminName
        ))
      );

      // send an email to the user
      $response          = postRequest(AUTH_SERVER . '/emails/send-email/kick_tracker-inactive', $data);
      // send an email to the user's group's admin
      $provider_response = postRequest(AUTH_SERVER . '/emails/send-email/kick_tracker-admin_alert', $provider_data);

      if ((!isset($response->status) || $response->status != 'success')
          || (!isset($provider_response->status) || $provider_response->status != 'success'))
      {
        Log::user("Error sending irregular kick count email");
        exit();
      }
      // once email is sent, update the last time a kick email was sent
      User::updateKickEmailTime($userId);

    }

    if ($curNumKicks >= 10) {
      Log::user("Silently updating last sent email time so avoid getting a forgotten kick tracker email");
      User::updateKickEmailTime($userId);
    }

    boldError("Success");
    echo json_encode(array(
      'status'           => 'success',
      'numKicks'         => $curNumKicks,
      'timesBeenEmailed' => $timesBeenEmailed
    ));
  }

elseif ($_SERVER['REQUEST_METHOD'] == 'GET'):
  // get a date time for two hours ago
    $twoHoursAgo   = new DateTime();
    $twoHoursAgo->sub(new DateInterval("PT2H"));
    // get the most recent reset time, though it's stored as a string
    $lastResetTime = DataPoint::getValueForDataPoint(DataPoint::$BABY_KICK_RESET, $userId);
    // so convert it back to a DateTime so you can compare it
    $lastResetTime = DateTime::createFromFormat(DATABASE_DATETIME_FORMAT, $lastResetTime);
    // if the reset time is less than two hours ago, compare kicks to reset time
    if($lastResetTime > $twoHoursAgo) {

      $numKicks = DataPoint::getNumDataPointsWithinReset(DataPoint::$BABY_KICK, $userId);

    } else {

      $numKicks = DataPoint::getNumDataPointsWithinTwoHours(DataPoint::$BABY_KICK, $userId);

    }
  echo (string)$numKicks;

endif;
