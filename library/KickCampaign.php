<?php

class KickCampaign extends OBCampaign {
  public static $_KICK_TRACKER_ACTION_ID = 106;

  public static function checkAndAssignKickCampaignToUser($userId) {
    Log::user("checkAndAssignKickCampaignToUser");
    $currentWeek = OBCampaign::getCurrentWeek($userId);
    Log::user("current week is $currentWeek");
    $lala = Campaign::doesUserHaveCampaign($userId, Campaign::$_KICK_TRACKER_CAMPAIGN);
    Log::user("does this person already have this campaign? $lala");
    $conditional = (OBCampaign::getCurrentWeek($userId) >= 28) && (!Campaign::doesUserHaveCampaign($userId, Campaign::$_KICK_TRACKER_CAMPAIGN));
    $currentUser = User::findById($userId);
    $hasLocation = $currentUser->location;
    boldError("the conditional is: $conditional");
    if (OBCampaign::getCurrentWeek($userId) >= 28 && $hasLocation) {

      Campaign::assignCampaignToUser(Campaign::$_KICK_TRACKER_CAMPAIGN, $userId);
      Action::assignActionItem($userId, KickCampaign::$_KICK_TRACKER_ACTION_ID);
      boldError("ASSIGNED KICK CAMPAIGN");

    }

  }

}