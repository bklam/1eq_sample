<?php
/**
 * Created by PhpStorm.
 * User: mike
 * Date: 1/31/14
 * Time: 3:41 PM
 */
class DataPoint {

  public static $SMOKING              = 1;
  public static $DRINKING             = 2;
  public static $BLOOD_PRESSURE       = 3;
  public static $WEIGHT               = 4;
  public static $GLUCOSE              = 5;
  public static $TOTAL_CHOLESTEROL    = 6;
  public static $FIRST_MENSTRUAL_DATE = 8;
  public static $EDD                  = 9;
  public static $HEIGHT               = 10;
  public static $GRAVIDA_PARA         = 11;
  public static $POSITIVE_REVIEW      = 12;
  public static $HEADACHE             = 22;
  public static $VISION               = 23;
  public static $SWELLING             = 24;
  public static $ABDOMINAL            = 26;
  public static $BABY_KICK            = 27;
  public static $BABY_KICK_RESET      = 31;


  public static function updateDataPointsFromWithings($userId, $measureGroups)
  {

    $group = $measureGroups[0];

    $timestamp  = $group->timestamp;

    Log::user("new group " . $timestamp);

    $measures = $group->measure;

    if (property_exists($measures, 'diastolic_blood_pressure')
        && property_exists($measures, 'systolic_blood_pressure'))
    {
      Log::user("diastolic_blood_pressure: " . $measures->diastolic_blood_pressure);
      $bp       = $measures->systolic_blood_pressure . '/' . $measures->diastolic_blood_pressure;
      $triggers = array(new BloodPressureTrigger($userId));

      DataPoint::updateUserDataPoint($userId, DataPoint::$BLOOD_PRESSURE, $bp, $timestamp, $triggers);
    }

    if(property_exists($measures, 'heart_pulse') ){
      Log::user("heart_pulse: " . $measures->heart_pulse);
    }
    if(property_exists($measures, 'weight') ){
      Log::user("weight: " . $measures->weight);
      $weightInLbs = $measures->weight * 2.2;
      DataPoint::updateUserDataPoint($userId, DataPoint::$WEIGHT, $weightInLbs, $timestamp);
    }
    if(property_exists($measures, 'fat_mass_weight') ){
      Log::user("fat_mass_weight: " . $measures->fat_mass_weight);

    }
    if(property_exists($measures, 'fat_free_mass') ){
      Log::user("fat_free_mass: " . $measures->fat_free_mass);
    }
    if(property_exists($measures, 'fat_ratio') ){
      Log::user("fat_ratio: " . $measures->fat_ratio);
    }

  }

  //all data point updates should happen here so that triggers can be called appropriately.
  public static function updateUserDataPoint($userId, $dataPointId, $value, $updateTimestamp = null, $triggers = array(), $silentlySkipTriggers = false)
  {
    // Does the user have a value for this data point already
    $exists = DB::table("users_data_points")
      ->where("user_id", '=', (int)$userId)
      ->where("data_point_id", '=', $dataPointId)
      ->grab(1)
      ->get();

    $oldvalue = "";

    // If they have an entry already, just update it
    if ($exists) {
      $userDataPointsId = $exists->id;
      $oldvalue        = $exists->value;

      // only if we're dealing with making new kicks, allow an old value and a new
      // value to be the same and so that a new record is created in user_data_point_history
      if ($oldvalue == $value && $dataPointId == DataPoint::$BABY_KICK) {
        $isUpdated = true;
      } else { //$isUpdated would be false otherwise if $oldvalue and $value were the same
      $isUpdated = DB::table('users_data_points')
        ->where('user_id', '=', (int)$userId)
        ->where('data_point_id','=',$dataPointId)
        ->update(array("value" => $value));
      }

    // Otherwise, create a new one
    } else {
      $array = array(
        'user_id'       => $userId,
        'data_point_id' => $dataPointId,
        'value'         => $value
      );

      $userDataPointsId = DB::table('users_data_points')->insert_get_id($array);
      $isUpdated       = true;
    }

    // If the update was successful, add in history records
    Log::user("isUpdated is: $isUpdated and user data points id is: $userDataPointsId");
    if ( $userDataPointsId > 0) { // $isUpdated &&
      $dt = new DateTime();

      if ($updateTimestamp)
        $dt->setTimestamp($updateTimestamp);

      $updateTime = $dt->format(DATABASE_DATETIME_FORMAT);

      $array = array(
        'current_user_id'      => $userId,
        'users_data_points_id' => $userDataPointsId,
        'updated_at'           => $updateTime,
        'old_value'            => $oldvalue,
        'new_value'            => $value
      );
      //Log::user((print_r($array)));
      DB::table('user_data_point_history')
          ->insert($array);
    }

    if ($silentlySkipTriggers) { return true; } // mostly for testing

    Log::user("Calling out triggers");

    // Are there any triggers to checked?
    $defaultTriggers = DataPoint::getApplicableTriggers($dataPointId, $userId);
    $triggers        = array_merge($triggers, $defaultTriggers);
    DataPoint::processTriggers($triggers);

    return true;
  }

  public static function processTriggers($triggers)
  {
    $triggerCount = count($triggers);
    Log::user("Working through $triggerCount triggers.");
    foreach ($triggers as $trigger) {
      $triggerClass = get_class($trigger);
      Log::user("Processing trigger $triggerClass");
      $trigger->check();
    }
  }

  public static function getApplicableTriggers($dataPointId, $userId)
  {
    $triggers = array();

    switch($dataPointId)
    {
      case DataPoint::$BLOOD_PRESSURE:
        // This is added already by the updateDataPoint from withings
        //array_push($triggers, new BloodPressureTrigger($userId) );
        break;

      case DataPoint::$EDD:
        $value = DataPoint::getValueForDataPoint($dataPointId, $userId);

        // 40 weeks in seconds = 24192000
        $backtrackedDate = strtotime($value) - 24192000;
        DB::table('users_campaigns')
          ->where('user_id','=',$userId)
          ->where('campaign_id','=',2)
          ->update(array(
            'start_date' => date(DATABASE_DATETIME_FORMAT, $backtrackedDate)
          ));
        break;

      case DataPoint::$WEIGHT:
        array_push($triggers, new WeightTrigger($userId));
        break;

      default:
        break;
    }

    return $triggers;

  }

  public static function getValueForDataPoint($dataPointId, $userId)
  {
    $result = DB::table('users_data_points')
                ->where('user_id', '=', $userId)
                ->where('data_point_id','=',$dataPointId)
                ->grab(1)
                ->get(array('value'));

    Log::user(print_r($result, true));
    if(isset($result) && isset($result->value)){
      return $result->value;
    }

    return false;
  }

  // not really needed anymore... a more general version is available with getNumDataPointsWithinXHalfHours
  public static function getNumDataPointsWithinTwoHours($dataPointId, $userId)
  {
    $twoHoursAgo = new DateTime();
    $twoHoursAgo->sub(new DateInterval('PT2H'));

    $result = DB::table('user_data_point_history udph')
                ->join('users_data_points udp', 'udph.users_data_points_id', '=', 'udp.id')
                ->join('data_points dp', 'udp.data_point_id', '=', 'dp.id')
                ->where('udph.current_user_id', '=', (int)$userId)
                ->where('dp.id', '=', (int)$dataPointId)
                ->where('udph.updated_at', '>=', $twoHoursAgo->format(DATABASE_DATETIME_FORMAT))
                ->count();

    if(isset($result) && isset($result->count)){
      // count returns a string for some reason..? so I'm casting it to an int
      return (int)$result->count;
    }

    return -1;
  }

  public static function getNumDataPointsInXHalfHours($dataPointId, $userId, $xHalfHours)
  {
    $numMinutes = 30 * $xHalfHours;

    $numMinutesAgo = new DateTime();
    // $numMinutesAgo->sub(new DateInterval('PT2H'));
    $numMinutesAgo->sub(new DateInterval("PT".(string)$numMinutes."M"));

    $result = DB::table('user_data_point_history udph')
                ->join('users_data_points udp', 'udph.users_data_points_id', '=', 'udp.id')
                ->join('data_points dp', 'udp.data_point_id', '=', 'dp.id')
                ->where('udph.current_user_id', '=', (int)$userId)
                ->where('dp.id', '=', (int)$dataPointId)
                ->where('udph.updated_at', '>=', $numMinutesAgo->format(DATABASE_DATETIME_FORMAT))
                ->count();

    Log::user(print_r($result, true));
    if(isset($result) && isset($result->count)){
      return $result->count;
    }

    return -1;
  }

  public static function getNumDataPointsWithinReset($dataPointId, $userId)
  {
    $lastResetTime = DataPoint::getValueForDataPoint(DataPoint::$BABY_KICK_RESET, $userId);

    // if there hasn't been a reset time yet, error out
    if (!$lastResetTime) {
      return -1;
    }

    $result = DB::table('user_data_point_history udph')
                ->join('users_data_points udp', 'udph.users_data_points_id', '=', 'udp.id')
                ->join('data_points dp', 'udp.data_point_id', '=', 'dp.id')
                ->where('udph.current_user_id', '=', (int)$userId)
                ->where('dp.id', '=', (int)$dataPointId)
                ->where('udph.updated_at', '>', $lastResetTime)
                ->count();

    if(isset($result) && isset($result->count)){
      // count returns a string for some reason..? so I'm casting it to an int
      return (int)$result->count;
    }

    return -1;
  }

  /*
+----------+---------------------+
| value    | updated_at          |
+----------+---------------------+
| N/A      | 2014-02-20 19:06:08 |
| 160/90   | 2014-02-28 22:50:32 |
| 124 / 75 | 2014-06-09 14:25:26 |

   */
  public static function getHistoryListForDataPointAsArray($dataPointId, $userId)
  {
    Log::user("getHistoryListForDataPointAsArray datapointid: " . $dataPointId . " user: " . $userId);
    $values = DB::raw("
      select new_value as value, updated_at from user_data_point_history uh
      inner join users_data_points ud ON uh.users_data_points_id = ud.id
      where ud.user_id = $userId and ud.data_point_id = $dataPointId
    ");

    return (isset($values) ? $values : false);
  }

  public static function getHistoryListForDataPoint($dataPointId, $userId)
  {
    Log::user("getHistoryListForDataPoint datapointid: " . $dataPointId . " user: " . $userId);
    $valueCSV = DB::raw("
select GROUP_CONCAT(a) as csv_value,  count(a) as total FROM (
select CONCAT(UNIX_TIMESTAMP(h.updated_at), CONCAT(':',new_value)) as a from user_data_point_history h inner join users_data_points u ON
u.id = h.users_data_points_id where u.data_point_id = $dataPointId AND u.user_id = $userId GROUP BY a) t");


  //  Log::user("get historyListForDataPoint: " . print_r($valueCSV, true));

    if(isset($valueCSV[0]) && $valueCSV[0]->total >= 3)
    {
      return $valueCSV[0]->csv_value;
    }
    return false;

  }

  public static function getMostRecentKickCount($userId, $dataPointId) {
    $result = DB::table('user_data_point_history udph')
                ->join('users_data_points udp', 'udph.users_data_points_id', '=', 'udp.id')
                ->where('udph.current_user_id', '=', (int)$userId)
                ->order_by('udph.updated_at', 'DESC')
                ->grab(1)
                ->get(array('udph.new_value'));

    Log::user(print_r($result, true));
    if(isset($result) && isset($result->new_value)){
      return $result->new_value;
    }

    return false;
  }

  //only use this for testing
  public static function deleteDataPointHistory($userId, $dataPointId){
    //select * from users_data_points where user_id = 2 and data_point_id = 3;
    $userDataPointId = DB::table("users_data_points")
                          ->where('user_id', '=', $userId)
                          ->where('data_point_id','=',$dataPointId)
                          ->grab(1)
                          ->get(array('id'))->id;

    $result = DB::table('user_data_point_history ')
        ->where('users_data_points_id', '=', $userDataPointId)
        ->delete();

    return $result;
  }

  public static function unitTest(){
    $response = '';
    $response .= "<br/>starting Data Point tests <br/>";

    $response .= 'Testing updateUserDataPoint: ';
    DataPoint::updateUserDataPoint(TEST_USER_ID,DataPoint::$BLOOD_PRESSURE,'121/50');
    $value = DataPoint::getValueForDataPoint(DataPoint::$BLOOD_PRESSURE, TEST_USER_ID);
    if($value == '121/50' ) $response .= 'Passed'; else $response.='Failed';
    $response .= '<br/>';

    $response .= 'Testing getHistoryListForDataPoint: ';
    $dataPointList = DataPoint::getHistoryListForDataPointAsArray(DataPoint::$BLOOD_PRESSURE, TEST_USER_ID);
    if(sizeof($dataPointList) > 0)  $response .= 'Passed'; else $response.='Failed';
    $response .= '<br/>';

    $response .= 'Testing deleteDataPointHistory: ';
    DataPoint::deleteDataPointHistory(TEST_USER_ID, DataPoint::$BLOOD_PRESSURE);
    $dataPointList = DataPoint::getHistoryListForDataPointAsArray(DataPoint::$BLOOD_PRESSURE, TEST_USER_ID);
    if(sizeof($dataPointList) == 0)  $response .= 'Passed'; else $response.='Failed';
    $response .= '<br/>';

    return $response;
  }


  // public static function getMostRecentRecordForDataPoint($userDataPointId, )
}