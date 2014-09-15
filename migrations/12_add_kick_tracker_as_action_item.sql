# add in kick tracker as a weekly action into campaigns
INSERT INTO actions VALUES (106, "Do a Kick Count", "If your baby is moving regularly, this is a clear sign things are going great. If this is the case, then you're done here - go ahead and click 'Did It'. If not, kick counting is another effective and fun way to screen for your baby's health", "1 week", 1, 1, 'kickTracker', 'Task');

INSERT INTO campaigns VALUES (48, 2, 'Kick Tracker', 16934400, NULL);

INSERT INTO campaigns_actions VALUES (105, 48, 106);

#assign it to jayda hunter
INSERT INTO user_action_history (action_id, user_id, type, response, updated_at) VALUES (106, 40, "Assigned", NULL, "2014-06-23 03:30:10");
