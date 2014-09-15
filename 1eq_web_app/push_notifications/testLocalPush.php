<?php

define('ACCESS', true);


require_once __DIR__. '/../../vendor/autoload.php'; // If you get an error on this line, you need to run `composer update`

require_once __DIR__.'/../../app/library/SingletonAbstract.php';
// require_once __DIR__.'/../app/helpers/Log.php';
require_once __DIR__.'/../../app/library/DB.php';
require_once __DIR__.'/../../app/config/config.php';
require_once __DIR__.'/../../app/library/User.php';
require_once __DIR__.'/../../app/library/Campaign.php';
require_once __DIR__.'/../../app/library/Settings.php';
require_once __DIR__.'/../../app/helpers/functions.php';
require_once __DIR__.'/../../app/helpers/_settings.php';
require_once __DIR__.'/../../app/library/Action.php';
require_once __DIR__.'/../../app/library/Message.php';
require_once __DIR__.'/../../app/library/OBCampaign.php';
require_once __DIR__.'/../../app/library/KickCampaign.php';
require_once __DIR__.'/../../app/library/Analytics.php';
require_once __DIR__.'/../../app/library/PushNotification.php';

$userId = 40;

// change whether to send through development or production APNS server
// depends on how you built/installed the app
// make sure you have the appropriate ck.pem file with the
// correct certificates/private keys for production or development
$sendThroughProd = false;

$result = PushNotification::sendToAllDevices($userId, "Hullo", $sendThroughProd);

error_log(print_r($result, true));
error_log(gettype($result));
