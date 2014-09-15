<?php

class PushNotification extends SingletonAbstract
{
  public static function sendToAllDevices($userId, $message, $prod) {

    $deviceTokens = User::getUsersDeviceTokensAsArray($userId);
    $allDelivered = array();

    if (isset($deviceTokens) && is_array($deviceTokens) && count($deviceTokens > 0)) {

      foreach($deviceTokens as $deviceToken) {
        // save all the results of whether a message was delivered
        $delivered = PushNotification::send($deviceToken, $message, $prod);
        array_push($allDelivered, $delivered);
      }

      // return whether or not pushes to all devices are successful
      return count(array_keys($allDelivered, true)) === count($allDelivered);

    }
    //otherwise, there are no records for that user so return false
    //because no messages were sent
    return false;
  }

  public static function send($deviceToken, $message, $prod) {

    // In order to send a push, we need a device token so
    // APNS knows who to send the push to

    // $deviceToken = '35a3c8ca6179a071641620474d1a3373ac2ee1edd113fd07f687d457308f78c0';

    // The private key's passphrase for the certificate 
    // signing request file you made. The CSR and the p12 private key
    // files were then converted to a pem file, then concatenated
    // into ck.pem, which is needed to send a push from the com.babysteps.test app

    // NOTE: I'm pretty sure this file looks for ck.pem in the current directory,
    //       so make sure that ck.pem and this file are in the same directory
    $passphrase = '1799C5DEA8';

    // Put your alert message here:
    // $message = 'My first push notification!';

    ////////////////////////////////////////////////////////////////////////////////

    $ctx = stream_context_create();
    stream_context_set_option($ctx, 'ssl', 'local_cert', 'ck.pem');
    stream_context_set_option($ctx, 'ssl', 'passphrase', $passphrase);


    if ($prod) {
      // Open a connection to the APNS server
      // Use this code to connect to the actual production push server
      // when testing push notifications on test flight or for app
      // from actual app store
      $fp = stream_socket_client(
        'ssl://gateway.push.apple.com:2195', $err,
        $errstr, 60, STREAM_CLIENT_CONNECT|STREAM_CLIENT_PERSISTENT, $ctx);

    } else {
      // Open a connection to the APNS server
      // gateway.sandbox.push.apple.com is what you should connect to when
      // testing in development environment with development keys and certificates
      // for a local build of the app
      $fp = stream_socket_client(
      'ssl://gateway.sandbox.push.apple.com:2195', $err,
      $errstr, 60, STREAM_CLIENT_CONNECT|STREAM_CLIENT_PERSISTENT, $ctx);
    }


    if (!$fp)
      exit("Failed to connect: $err $errstr" . PHP_EOL);

    echo 'Connected to APNS' . PHP_EOL;

    // Create the payload body
    // Still need to figure out how to manage badge number
    $body['aps'] = array(
      'alert' => $message,
      'badge' => 1,
      'sound' => 'default'
      );

    // Encode the payload as JSON
    $payload = json_encode($body);

    // Build the binary notification
    $msg = chr(0) . pack('n', 32) . pack('H*', $deviceToken) . pack('n', strlen($payload)) . $payload;

    // Send it to the server
    $result = fwrite($fp, $msg, strlen($msg));

    if (!$result) {
      echo 'Message not delivered' . PHP_EOL;
      $delivered = false;

    } else {
      echo 'Message successfully delivered' . PHP_EOL;
      $delivered = true;
    }

    // Close the connection to the server
    fclose($fp);

    return $delivered;

  }

}