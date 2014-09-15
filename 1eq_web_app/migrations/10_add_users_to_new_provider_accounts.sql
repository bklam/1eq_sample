INSERT INTO users_groups (user_id, group_id, provider_id, role_id) VALUES ((SELECT id FROM users WHERE firstname = 'Curtisha' AND lastname = 'Mozie'), (SELECT group_id FROM groups WHERE group_name = 'GW Obstetrics'), (SELECT id FROM users WHERE email = 'provider+1@1eq.me'), (SELECT id FROM roles WHERE name = 'Patient'));

INSERT INTO users_groups (user_id, group_id, provider_id, role_id) VALUES
((SELECT id FROM users WHERE firstname = 'Amy' AND lastname = 'Mullen'),
 (SELECT group_id FROM groups WHERE group_name = 'GW Obstetrics'),
 (SELECT id FROM users WHERE email = 'provider+1@1eq.me'),
 (SELECT id FROM roles WHERE name = 'Patient'));

-- Typo for Cristina's name, but not sure which is in database
-- INSERT INTO users_groups (user_id, group_id, provider_id, role_id) VALUES
-- ((SELECT id FROM users WHERE firstname = 'Cristina' AND lastname = 'Cuervo'),
--  (SELECT group_id FROM groups WHERE group_name = 'GW Obstetrics'),
--  (SELECT id FROM users WHERE email = 'provider+1@1eq.me'),
--  (SELECT id FROM roles WHERE name = 'Patient'));

INSERT INTO users_groups (user_id, group_id, provider_id, role_id) VALUES
((SELECT id FROM users WHERE firstname = 'Christina' AND lastname = 'Cuervo'),
 (SELECT group_id FROM groups WHERE group_name = 'GW Obstetrics'),
 (SELECT id FROM users WHERE email = 'provider+1@1eq.me'),
 (SELECT id FROM roles WHERE name = 'Patient'));

INSERT INTO users_groups (user_id, group_id, provider_id, role_id) VALUES
((SELECT id FROM users WHERE firstname = 'Mariam' AND lastname = 'Nissly'),
 (SELECT group_id FROM groups WHERE group_name = 'GW Obstetrics'),
 (SELECT id FROM users WHERE email = 'provider+1@1eq.me'),
 (SELECT id FROM roles WHERE name = 'Patient'));

INSERT INTO users_groups (user_id, group_id, provider_id, role_id) VALUES
((SELECT id FROM users WHERE firstname = 'Sojourner' AND lastname = 'Mobley'),
 (SELECT group_id FROM groups WHERE group_name = 'GW Obstetrics'),
 (SELECT id FROM users WHERE email = 'provider+1@1eq.me'),
 (SELECT id FROM roles WHERE name = 'Patient'));

INSERT INTO users_groups (user_id, group_id, provider_id, role_id) VALUES
((SELECT id FROM users WHERE firstname = 'Tykaria' AND lastname = 'Watts'),
 (SELECT group_id FROM groups WHERE group_name = 'GW Obstetrics'),
 (SELECT id FROM users WHERE email = 'provider+1@1eq.me'),
 (SELECT id FROM roles WHERE name = 'Patient'));

INSERT INTO users_groups (user_id, group_id, provider_id, role_id) VALUES
((SELECT id FROM users WHERE firstname = 'Starra' AND lastname = 'Jenkins'),
 (SELECT group_id FROM groups WHERE group_name = 'GW Obstetrics'),
 (SELECT id FROM users WHERE email = 'provider+1@1eq.me'),
 (SELECT id FROM roles WHERE name = 'Patient'));

INSERT INTO users_groups (user_id, group_id, provider_id, role_id) VALUES
((SELECT id FROM users WHERE firstname = 'Jessica' AND lastname = 'Richardson'),
 (SELECT group_id FROM groups WHERE group_name = 'GW Obstetrics'),
 (SELECT id FROM users WHERE email = 'provider+1@1eq.me'),
 (SELECT id FROM roles WHERE name = 'Patient'));

INSERT INTO users_groups (user_id, group_id, provider_id, role_id) VALUES
((SELECT id FROM users WHERE firstname = 'Nicole' AND lastname = 'Halavik'),
 (SELECT group_id FROM groups WHERE group_name = 'GW Obstetrics'),
 (SELECT id FROM users WHERE email = 'provider+1@1eq.me'),
 (SELECT id FROM roles WHERE name = 'Patient'));

INSERT INTO users_groups (user_id, group_id, provider_id, role_id) VALUES
((SELECT id FROM users WHERE firstname = 'Elsa' AND lastname = 'Falkenburger'),
 (SELECT group_id FROM groups WHERE group_name = 'GW Obstetrics'),
 (SELECT id FROM users WHERE email = 'provider+1@1eq.me'),
 (SELECT id FROM roles WHERE name = 'Patient'));

INSERT INTO users_groups (user_id, group_id, provider_id, role_id) VALUES
((SELECT id FROM users WHERE firstname = 'Constance' AND lastname = 'Beninghove'),
 (SELECT group_id FROM groups WHERE group_name = 'GW Obstetrics'),
 (SELECT id FROM users WHERE email = 'provider+1@1eq.me'),
 (SELECT id FROM roles WHERE name = 'Patient'));

-- INSERT INTO users_groups (user_id, group_id, provider_id, role_id) VALUES
-- ((SELECT id FROM users WHERE firstname = 'Jakelin' AND lastname = 'Mendoza'),
--  (SELECT group_id FROM groups WHERE group_name = 'GW Obstetrics'),
--  (SELECT id FROM users WHERE email = 'provider+1@1eq.me'),
--  (SELECT id FROM roles WHERE name = 'Patient'));

INSERT INTO users_groups (user_id, group_id, provider_id, role_id) VALUES
((SELECT id FROM users WHERE firstname = 'Rachel' AND lastname = 'Ho'),
 (SELECT group_id FROM groups WHERE group_name = 'GW Obstetrics'),
 (SELECT id FROM users WHERE email = 'provider+1@1eq.me'),
 (SELECT id FROM roles WHERE name = 'Patient'));

INSERT INTO users_groups (user_id, group_id, provider_id, role_id) VALUES
((SELECT id FROM users WHERE firstname = 'Jocelyn' AND lastname = 'McNamara'),
 (SELECT group_id FROM groups WHERE group_name = 'GW Obstetrics'),
 (SELECT id FROM users WHERE email = 'provider+11@1eq.me'),
 (SELECT id FROM roles WHERE name = 'Patient'));

INSERT INTO users_groups (user_id, group_id, provider_id, role_id) VALUES
((SELECT id FROM users WHERE firstname = 'Jennifer' AND lastname = 'Dusenberry'),
 (SELECT group_id FROM groups WHERE group_name = 'GW Obstetrics'),
 (SELECT id FROM users WHERE email = 'provider+11@1eq.me'),
 (SELECT id FROM roles WHERE name = 'Patient'));

INSERT INTO users_groups (user_id, group_id, provider_id, role_id) VALUES
((SELECT id FROM users WHERE firstname = 'Neesa' AND lastname = 'Sood'),
 (SELECT group_id FROM groups WHERE group_name = 'GW Obstetrics'),
 (SELECT id FROM users WHERE email = 'provider+11@1eq.me'),
 (SELECT id FROM roles WHERE name = 'Patient'));

INSERT INTO users_groups (user_id, group_id, provider_id, role_id) VALUES
((SELECT id FROM users WHERE firstname = 'Jenny' AND lastname = 'Zavala'),
 (SELECT group_id FROM groups WHERE group_name = 'GW Obstetrics'),
 (SELECT id FROM users WHERE email = 'provider+11@1eq.me'),
 (SELECT id FROM roles WHERE name = 'Patient'));

INSERT INTO users_groups (user_id, group_id, provider_id, role_id) VALUES
((SELECT id FROM users WHERE firstname = 'Amanda' AND lastname = 'Wade'),
 (SELECT group_id FROM groups WHERE group_name = 'GW Obstetrics'),
 (SELECT id FROM users WHERE email = 'provider+11@1eq.me'),
 (SELECT id FROM roles WHERE name = 'Patient'));

INSERT INTO users_groups (user_id, group_id, provider_id, role_id) VALUES
((SELECT id FROM users WHERE firstname = 'Rebecca' AND lastname = 'Terrell'),
 (SELECT group_id FROM groups WHERE group_name = 'GW Obstetrics'),
 (SELECT id FROM users WHERE email = 'provider+11@1eq.me'),
 (SELECT id FROM roles WHERE name = 'Patient'));

INSERT INTO users_groups (user_id, group_id, provider_id, role_id) VALUES
((SELECT id FROM users WHERE firstname = 'Ruth' AND lastname = 'Osorio'),
 (SELECT group_id FROM groups WHERE group_name = 'GW Obstetrics'),
 (SELECT id FROM users WHERE email = 'provider+11@1eq.me'),
 (SELECT id FROM roles WHERE name = 'Patient'));

INSERT INTO users_groups (user_id, group_id, provider_id, role_id) VALUES
((SELECT id FROM users WHERE firstname = 'Yang' AND lastname = 'Baturenko'),
 (SELECT group_id FROM groups WHERE group_name = 'GW Obstetrics'),
 (SELECT id FROM users WHERE email = 'provider+11@1eq.me'),
 (SELECT id FROM roles WHERE name = 'Patient'));

INSERT INTO users_groups (user_id, group_id, provider_id, role_id) VALUES
((SELECT id FROM users WHERE firstname = 'Mahlet' AND lastname = 'Romans'),
 (SELECT group_id FROM groups WHERE group_name = 'GW Obstetrics'),
 (SELECT id FROM users WHERE email = 'provider+11@1eq.me'),
 (SELECT id FROM roles WHERE name = 'Patient'));

INSERT INTO users_groups (user_id, group_id, provider_id, role_id) VALUES
((SELECT id FROM users WHERE firstname = 'Emily' AND lastname = 'Booth'),
 (SELECT group_id FROM groups WHERE group_name = 'GW Obstetrics'),
 (SELECT id FROM users WHERE email = 'provider+11@1eq.me'),
 (SELECT id FROM roles WHERE name = 'Patient'));

INSERT INTO users_groups (user_id, group_id, provider_id, role_id) VALUES
((SELECT id FROM users WHERE firstname = 'Ashley' AND lastname = 'Holley'),
 (SELECT group_id FROM groups WHERE group_name = 'GW Obstetrics'),
 (SELECT id FROM users WHERE email = 'provider+11@1eq.me'),
 (SELECT id FROM roles WHERE name = 'Patient'));

INSERT INTO users_groups (user_id, group_id, provider_id, role_id) VALUES
((SELECT id FROM users WHERE firstname = 'Sandy' AND lastname = 'Choi'),
 (SELECT group_id FROM groups WHERE group_name = 'GW Obstetrics'),
 (SELECT id FROM users WHERE email = 'provider+11@1eq.me'),
 (SELECT id FROM roles WHERE name = 'Patient'));

INSERT INTO users_groups (user_id, group_id, provider_id, role_id) VALUES
((SELECT id FROM users WHERE firstname = 'Sheila' AND lastname = 'Mulhovo'),
 (SELECT group_id FROM groups WHERE group_name = 'GW Obstetrics'),
 (SELECT id FROM users WHERE email = 'provider+11@1eq.me'),
 (SELECT id FROM roles WHERE name = 'Patient'));

INSERT INTO users_groups (user_id, group_id, provider_id, role_id) VALUES
((SELECT id FROM users WHERE firstname = 'Brenda' AND lastname = 'Norris'),
 (SELECT group_id FROM groups WHERE group_name = 'GW Obstetrics'),
 (SELECT id FROM users WHERE email = 'provider+11@1eq.me'),
 (SELECT id FROM roles WHERE name = 'Patient'));

INSERT INTO users_groups (user_id, group_id, provider_id, role_id) VALUES
((SELECT id FROM users WHERE firstname = 'Lady' AND lastname = 'Balisi'),
 (SELECT group_id FROM groups WHERE group_name = 'GW Obstetrics'),
 (SELECT id FROM users WHERE email = 'provider+11@1eq.me'),
 (SELECT id FROM roles WHERE name = 'Patient'));

INSERT INTO users_groups (user_id, group_id, provider_id, role_id) VALUES
((SELECT id FROM users WHERE firstname = 'Charnise' AND lastname = 'Littles'),
 (SELECT group_id FROM groups WHERE group_name = 'GW Obstetrics'),
 (SELECT id FROM users WHERE email = 'provider+11@1eq.me'),
 (SELECT id FROM roles WHERE name = 'Patient'));

INSERT INTO users_groups (user_id, group_id, provider_id, role_id) VALUES
((SELECT id FROM users WHERE firstname = 'Robin' AND lastname = 'Mangan'),
 (SELECT group_id FROM groups WHERE group_name = 'GW Obstetrics'),
 (SELECT id FROM users WHERE email = 'provider+11@1eq.me'),
 (SELECT id FROM roles WHERE name = 'Patient'));

INSERT INTO users_groups (user_id, group_id, provider_id, role_id) VALUES
((SELECT id FROM users WHERE firstname = 'Carolina' AND lastname = 'Tristan'),
 (SELECT group_id FROM groups WHERE group_name = 'GW Obstetrics'),
 (SELECT id FROM users WHERE email = 'provider+11@1eq.me'),
 (SELECT id FROM roles WHERE name = 'Patient'));

INSERT INTO users_groups (user_id, group_id, provider_id, role_id) VALUES
((SELECT id FROM users WHERE firstname = 'Samantha' AND lastname = 'Krause'),
 (SELECT group_id FROM groups WHERE group_name = 'GW Obstetrics'),
 (SELECT id FROM users WHERE email = 'provider+11@1eq.me'),
 (SELECT id FROM roles WHERE name = 'Patient'));

INSERT INTO users_groups (user_id, group_id, provider_id, role_id) VALUES
((SELECT id FROM users WHERE firstname = 'Seema' AND lastname = 'Melghan'),
 (SELECT group_id FROM groups WHERE group_name = 'GW Obstetrics'),
 (SELECT id FROM users WHERE email = 'provider+11@1eq.me'),
 (SELECT id FROM roles WHERE name = 'Patient'));

-- This query is different because there are apparently two Debrah Dunner's, but I'm assuming
-- the correct one is the one with the matching email
INSERT INTO users_groups (user_id, group_id, provider_id, role_id) VALUES
((SELECT id FROM users WHERE firstname = 'Debrah' AND lastname = 'Dunner' AND email = 'debrahdunner@gmail.com'),
 (SELECT group_id FROM groups WHERE group_name = 'GW Obstetrics'),
 (SELECT id FROM users WHERE email = 'provider+11@1eq.me'),
 (SELECT id FROM roles WHERE name = 'Patient'));

INSERT INTO users_groups (user_id, group_id, provider_id, role_id) VALUES
((SELECT id FROM users WHERE firstname = 'Juliet' AND lastname = 'Cochet'),
 (SELECT group_id FROM groups WHERE group_name = 'GW Obstetrics'),
 (SELECT id FROM users WHERE email = 'provider+12@1eq.me'),
 (SELECT id FROM roles WHERE name = 'Patient'));

INSERT INTO users_groups (user_id, group_id, provider_id, role_id) VALUES
((SELECT id FROM users WHERE firstname = 'Anna' AND lastname = 'Ansaldo'),
 (SELECT group_id FROM groups WHERE group_name = 'GW Obstetrics'),
 (SELECT id FROM users WHERE email = 'provider+12@1eq.me'),
 (SELECT id FROM roles WHERE name = 'Patient'));

INSERT INTO users_groups (user_id, group_id, provider_id, role_id) VALUES
((SELECT id FROM users WHERE firstname = 'Rebecca' AND lastname = 'Rosen'),
 (SELECT group_id FROM groups WHERE group_name = 'GW Obstetrics'),
 (SELECT id FROM users WHERE email = 'provider+12@1eq.me'),
 (SELECT id FROM roles WHERE name = 'Patient'));

INSERT INTO users_groups (user_id, group_id, provider_id, role_id) VALUES
((SELECT id FROM users WHERE firstname = 'Jessica' AND lastname = 'Reimelt'),
 (SELECT group_id FROM groups WHERE group_name = 'GW Obstetrics'),
 (SELECT id FROM users WHERE email = 'provider+12@1eq.me'),
 (SELECT id FROM roles WHERE name = 'Patient'));

INSERT INTO users_groups (user_id, group_id, provider_id, role_id) VALUES
((SELECT id FROM users WHERE firstname = 'Kate' AND lastname = 'Beale'),
 (SELECT group_id FROM groups WHERE group_name = 'GW Obstetrics'),
 (SELECT id FROM users WHERE email = 'provider+12@1eq.me'),
 (SELECT id FROM roles WHERE name = 'Patient'));

INSERT INTO users_groups (user_id, group_id, provider_id, role_id) VALUES
((SELECT id FROM users WHERE firstname = 'Marianne' AND lastname = 'Terrot'),
 (SELECT group_id FROM groups WHERE group_name = 'GW Obstetrics'),
 (SELECT id FROM users WHERE email = 'provider+12@1eq.me'),
 (SELECT id FROM roles WHERE name = 'Patient'));

INSERT INTO users_groups (user_id, group_id, provider_id, role_id) VALUES
((SELECT id FROM users WHERE firstname = 'Jennifer' AND lastname = 'Snowden'),
 (SELECT group_id FROM groups WHERE group_name = 'GW Obstetrics'),
 (SELECT id FROM users WHERE email = 'provider+12@1eq.me'),
 (SELECT id FROM roles WHERE name = 'Patient'));

INSERT INTO users_groups (user_id, group_id, provider_id, role_id) VALUES
((SELECT id FROM users WHERE firstname = 'Patrice' AND lastname = 'Arrington'),
 (SELECT group_id FROM groups WHERE group_name = 'GW Obstetrics'),
 (SELECT id FROM users WHERE email = 'provider+12@1eq.me'),
 (SELECT id FROM roles WHERE name = 'Patient'));

INSERT INTO users_groups (user_id, group_id, provider_id, role_id) VALUES
((SELECT id FROM users WHERE firstname = 'Lynn' AND lastname = 'Torres'),
 (SELECT group_id FROM groups WHERE group_name = 'GW Obstetrics'),
 (SELECT id FROM users WHERE email = 'provider+12@1eq.me'),
 (SELECT id FROM roles WHERE name = 'Patient'));

INSERT INTO users_groups (user_id, group_id, provider_id, role_id) VALUES
((SELECT id FROM users WHERE firstname = 'Kerry' AND lastname = 'Nicolardi'),
 (SELECT group_id FROM groups WHERE group_name = 'GW Obstetrics'),
 (SELECT id FROM users WHERE email = 'provider+12@1eq.me'),
 (SELECT id FROM roles WHERE name = 'Patient'));

INSERT INTO users_groups (user_id, group_id, provider_id, role_id) VALUES
((SELECT id FROM users WHERE firstname = 'Maryann' AND lastname = 'Mazer-Amirshahi'),
 (SELECT group_id FROM groups WHERE group_name = 'GW Obstetrics'),
 (SELECT id FROM users WHERE email = 'provider+12@1eq.me'),
 (SELECT id FROM roles WHERE name = 'Patient'));

INSERT INTO users_groups (user_id, group_id, provider_id, role_id) VALUES
((SELECT id FROM users WHERE firstname = 'Brittney' AND lastname = 'Powell'),
 (SELECT group_id FROM groups WHERE group_name = 'GW Obstetrics'),
 (SELECT id FROM users WHERE email = 'provider+12@1eq.me'),
 (SELECT id FROM roles WHERE name = 'Patient'));

INSERT INTO users_groups (user_id, group_id, provider_id, role_id) VALUES
((SELECT id FROM users WHERE firstname = 'Rachel' AND lastname = 'Mennen'),
 (SELECT group_id FROM groups WHERE group_name = 'GW Obstetrics'),
 (SELECT id FROM users WHERE email = 'provider+12@1eq.me'),
 (SELECT id FROM roles WHERE name = 'Patient'));

INSERT INTO users_groups (user_id, group_id, provider_id, role_id) VALUES
((SELECT id FROM users WHERE firstname = 'Kelly' AND lastname = 'Matoney'),
 (SELECT group_id FROM groups WHERE group_name = 'GW Obstetrics'),
 (SELECT id FROM users WHERE email = 'provider+12@1eq.me'),
 (SELECT id FROM roles WHERE name = 'Patient'));

INSERT INTO users_groups (user_id, group_id, provider_id, role_id) VALUES
((SELECT id FROM users WHERE firstname = 'Latoya' AND lastname = 'Artis'),
 (SELECT group_id FROM groups WHERE group_name = 'GW Obstetrics'),
 (SELECT id FROM users WHERE email = 'provider+12@1eq.me'),
 (SELECT id FROM roles WHERE name = 'Patient'));

-- This person is a duplicate of patrice arrington... with a typo
-- INSERT INTO users_groups (user_id, group_id, provider_id, role_id) VALUES
-- ((SELECT id FROM users WHERE firstname = 'Latrice' AND lastname = 'Arrington'),
--  (SELECT group_id FROM groups WHERE group_name = 'GW Obstetrics'),
--  (SELECT id FROM users WHERE email = 'provider+number@1eq.me'),
--  (SELECT id FROM roles WHERE name = 'Patient'));

INSERT INTO users_groups (user_id, group_id, provider_id, role_id) VALUES
((SELECT id FROM users WHERE firstname = 'Laura' AND lastname = 'Ferguson'),
 (SELECT group_id FROM groups WHERE group_name = 'GW Obstetrics'),
 (SELECT id FROM users WHERE email = 'provider+12@1eq.me'),
 (SELECT id FROM roles WHERE name = 'Patient'));

INSERT INTO users_groups (user_id, group_id, provider_id, role_id) VALUES
((SELECT id FROM users WHERE firstname = 'Miranda' AND lastname = 'Oakley'),
 (SELECT group_id FROM groups WHERE group_name = 'GW Obstetrics'),
 (SELECT id FROM users WHERE email = 'provider+12@1eq.me'),
 (SELECT id FROM roles WHERE name = 'Patient'));

INSERT INTO users_groups (user_id, group_id, provider_id, role_id) VALUES
((SELECT id FROM users WHERE firstname = 'Erica' AND lastname = 'Jones'),
 (SELECT group_id FROM groups WHERE group_name = 'GW Obstetrics'),
 (SELECT id FROM users WHERE email = 'provider+12@1eq.me'),
 (SELECT id FROM roles WHERE name = 'Patient'));

INSERT INTO users_groups (user_id, group_id, provider_id, role_id) VALUES
((SELECT id FROM users WHERE firstname = 'Isabel' AND lastname = 'Triana'),
 (SELECT group_id FROM groups WHERE group_name = 'GW Obstetrics'),
 (SELECT id FROM users WHERE email = 'provider+12@1eq.me'),
 (SELECT id FROM roles WHERE name = 'Patient'));

INSERT INTO users_groups (user_id, group_id, provider_id, role_id) VALUES
((SELECT id FROM users WHERE firstname = 'Angela' AND lastname = 'Dow'),
 (SELECT group_id FROM groups WHERE group_name = 'GW Obstetrics'),
 (SELECT id FROM users WHERE email = 'provider+13@1eq.me'),
 (SELECT id FROM roles WHERE name = 'Patient'));

INSERT INTO users_groups (user_id, group_id, provider_id, role_id) VALUES
((SELECT id FROM users WHERE firstname = 'Melissa' AND lastname = 'Rogers-Galdenzi'),
 (SELECT group_id FROM groups WHERE group_name = 'GW Obstetrics'),
 (SELECT id FROM users WHERE email = 'provider+13@1eq.me'),
 (SELECT id FROM roles WHERE name = 'Patient'));

INSERT INTO users_groups (user_id, group_id, provider_id, role_id) VALUES
((SELECT id FROM users WHERE firstname = 'India' AND lastname = 'Harrison'),
 (SELECT group_id FROM groups WHERE group_name = 'GW Obstetrics'),
 (SELECT id FROM users WHERE email = 'provider+2@1eq.me'),
 (SELECT id FROM roles WHERE name = 'Patient'));

INSERT INTO users_groups (user_id, group_id, provider_id, role_id) VALUES
((SELECT id FROM users WHERE firstname = 'Miyonna' AND lastname = 'Bennett'),
 (SELECT group_id FROM groups WHERE group_name = 'GW Obstetrics'),
 (SELECT id FROM users WHERE email = 'provider+3@1eq.me'),
 (SELECT id FROM roles WHERE name = 'Patient'));

INSERT INTO users_groups (user_id, group_id, provider_id, role_id) VALUES
((SELECT id FROM users WHERE firstname = 'Nkeiru' AND lastname = 'Nwadioha'),
 (SELECT group_id FROM groups WHERE group_name = 'GW Obstetrics'),
 (SELECT id FROM users WHERE email = 'provider+3@1eq.me'),
 (SELECT id FROM roles WHERE name = 'Patient'));

INSERT INTO users_groups (user_id, group_id, provider_id, role_id) VALUES
((SELECT id FROM users WHERE firstname = 'Jennifer' AND lastname = 'Jenkins'),
 (SELECT group_id FROM groups WHERE group_name = 'GW Obstetrics'),
 (SELECT id FROM users WHERE email = 'provider+3@1eq.me'),
 (SELECT id FROM roles WHERE name = 'Patient'));

INSERT INTO users_groups (user_id, group_id, provider_id, role_id) VALUES
((SELECT id FROM users WHERE firstname = 'Allyson' AND lastname = 'Mincberg'),
 (SELECT group_id FROM groups WHERE group_name = 'GW Obstetrics'),
 (SELECT id FROM users WHERE email = 'provider+4@1eq.me'),
 (SELECT id FROM roles WHERE name = 'Patient'));

INSERT INTO users_groups (user_id, group_id, provider_id, role_id) VALUES
((SELECT id FROM users WHERE firstname = 'Tracae' AND lastname = 'McClure'),
 (SELECT group_id FROM groups WHERE group_name = 'GW Obstetrics'),
 (SELECT id FROM users WHERE email = 'provider+4@1eq.me'),
 (SELECT id FROM roles WHERE name = 'Patient'));

INSERT INTO users_groups (user_id, group_id, provider_id, role_id) VALUES
((SELECT id FROM users WHERE firstname = 'Martha' AND lastname = 'Fulford'),
 (SELECT group_id FROM groups WHERE group_name = 'GW Obstetrics'),
 (SELECT id FROM users WHERE email = 'provider+4@1eq.me'),
 (SELECT id FROM roles WHERE name = 'Patient'));

INSERT INTO users_groups (user_id, group_id, provider_id, role_id) VALUES
((SELECT id FROM users WHERE firstname = 'Jasmine' AND lastname = 'Temoney'),
 (SELECT group_id FROM groups WHERE group_name = 'GW Obstetrics'),
 (SELECT id FROM users WHERE email = 'provider+4@1eq.me'),
 (SELECT id FROM roles WHERE name = 'Patient'));

INSERT INTO users_groups (user_id, group_id, provider_id, role_id) VALUES
((SELECT id FROM users WHERE firstname = 'Tristia' AND lastname = 'Bauman'),
 (SELECT group_id FROM groups WHERE group_name = 'GW Obstetrics'),
 (SELECT id FROM users WHERE email = 'provider+4@1eq.me'),
 (SELECT id FROM roles WHERE name = 'Patient'));

INSERT INTO users_groups (user_id, group_id, provider_id, role_id) VALUES
((SELECT id FROM users WHERE firstname = 'Parvathy' AND lastname = 'Sankar-Chupakhin'),
 (SELECT group_id FROM groups WHERE group_name = 'GW Obstetrics'),
 (SELECT id FROM users WHERE email = 'provider+4@1eq.me'),
 (SELECT id FROM roles WHERE name = 'Patient'));

INSERT INTO users_groups (user_id, group_id, provider_id, role_id) VALUES
((SELECT id FROM users WHERE firstname = 'Aaminah' AND lastname = 'Ellis'),
 (SELECT group_id FROM groups WHERE group_name = 'GW Obstetrics'),
 (SELECT id FROM users WHERE email = 'provider+5@1eq.me'),
 (SELECT id FROM roles WHERE name = 'Patient'));

INSERT INTO users_groups (user_id, group_id, provider_id, role_id) VALUES
((SELECT id FROM users WHERE firstname = 'Erin' AND lastname = 'Syron'),
 (SELECT group_id FROM groups WHERE group_name = 'GW Obstetrics'),
 (SELECT id FROM users WHERE email = 'provider+5@1eq.me'),
 (SELECT id FROM roles WHERE name = 'Patient'));

INSERT INTO users_groups (user_id, group_id, provider_id, role_id) VALUES
((SELECT id FROM users WHERE firstname = 'Ines' AND lastname = 'Etourmbi'),
 (SELECT group_id FROM groups WHERE group_name = 'GW Obstetrics'),
 (SELECT id FROM users WHERE email = 'provider+6@1eq.me'),
 (SELECT id FROM roles WHERE name = 'Patient'));

INSERT INTO users_groups (user_id, group_id, provider_id, role_id) VALUES
((SELECT id FROM users WHERE firstname = 'Katie' AND lastname = 'Hollings'),
 (SELECT group_id FROM groups WHERE group_name = 'GW Obstetrics'),
 (SELECT id FROM users WHERE email = 'provider+9@1eq.me'),
 (SELECT id FROM roles WHERE name = 'Patient'));

INSERT INTO users_groups (user_id, group_id, provider_id, role_id) VALUES
((SELECT id FROM users WHERE firstname = 'Lauren' AND lastname = 'Sullivan'),
 (SELECT group_id FROM groups WHERE group_name = 'GW Obstetrics'),
 (SELECT id FROM users WHERE email = 'provider+9@1eq.me'),
 (SELECT id FROM roles WHERE name = 'Patient'));

INSERT INTO users_groups (user_id, group_id, provider_id, role_id) VALUES
((SELECT id FROM users WHERE firstname = 'Amy' AND lastname = 'Cannon'),
 (SELECT group_id FROM groups WHERE group_name = 'GW Obstetrics'),
 (SELECT id FROM users WHERE email = 'provider+9@1eq.me'),
 (SELECT id FROM roles WHERE name = 'Patient'));

INSERT INTO users_groups (user_id, group_id, provider_id, role_id) VALUES
((SELECT id FROM users WHERE firstname = 'Mahwash' AND lastname = 'Jaleel'),
 (SELECT group_id FROM groups WHERE group_name = 'GW Obstetrics'),
 (SELECT id FROM users WHERE email = 'provider+9@1eq.me'),
 (SELECT id FROM roles WHERE name = 'Patient'));

INSERT INTO users_groups (user_id, group_id, provider_id, role_id) VALUES
((SELECT id FROM users WHERE firstname = 'RefRef' AND lastname = 'Jifar'),
 (SELECT group_id FROM groups WHERE group_name = 'GW Obstetrics'),
 (SELECT id FROM users WHERE email = 'provider+9@1eq.me'),
 (SELECT id FROM roles WHERE name = 'Patient'));

INSERT INTO users_groups (user_id, group_id, provider_id, role_id) VALUES
((SELECT id FROM users WHERE firstname = 'Nicole' AND lastname = 'Dow'),
 (SELECT group_id FROM groups WHERE group_name = 'GW Obstetrics'),
 (SELECT id FROM users WHERE email = 'provider+9@1eq.me'),
 (SELECT id FROM roles WHERE name = 'Patient'));

INSERT INTO users_groups (user_id, group_id, provider_id, role_id) VALUES
((SELECT id FROM users WHERE firstname = 'Megan' AND lastname = 'Hasenzahl'),
 (SELECT group_id FROM groups WHERE group_name = 'GW Obstetrics'),
 (SELECT id FROM users WHERE email = 'provider+9@1eq.me'),
 (SELECT id FROM roles WHERE name = 'Patient'));

INSERT INTO users_groups (user_id, group_id, provider_id, role_id) VALUES
((SELECT id FROM users WHERE firstname = 'Traci' AND lastname = 'Kraus'),
 (SELECT group_id FROM groups WHERE group_name = 'GW Obstetrics'),
 (SELECT id FROM users WHERE email = 'provider+9@1eq.me'),
 (SELECT id FROM roles WHERE name = 'Patient'));

INSERT INTO users_groups (user_id, group_id, provider_id, role_id) VALUES
((SELECT id FROM users WHERE firstname = 'Kelsey' AND lastname = 'Thompson'),
 (SELECT group_id FROM groups WHERE group_name = 'GW Obstetrics'),
 (SELECT id FROM users WHERE email = 'provider+9@1eq.me'),
 (SELECT id FROM roles WHERE name = 'Patient'));

INSERT INTO users_groups (user_id, group_id, provider_id, role_id) VALUES
((SELECT id FROM users WHERE firstname = 'Whitney' AND lastname = 'Coleman'),
 (SELECT group_id FROM groups WHERE group_name = 'GW Obstetrics'),
 (SELECT id FROM users WHERE email = 'provider+9@1eq.me'),
 (SELECT id FROM roles WHERE name = 'Patient'));

INSERT INTO users_groups (user_id, group_id, provider_id, role_id) VALUES
((SELECT id FROM users WHERE firstname = 'Miasia' AND lastname = 'Ferguson'),
 (SELECT group_id FROM groups WHERE group_name = 'GW Obstetrics'),
 (SELECT id FROM users WHERE email = 'provider+9@1eq.me'),
 (SELECT id FROM roles WHERE name = 'Patient'));

INSERT INTO users_groups (user_id, group_id, provider_id, role_id) VALUES
((SELECT id FROM users WHERE firstname = 'Antonae' AND lastname = 'Rosemond'),
 (SELECT group_id FROM groups WHERE group_name = 'GW Obstetrics'),
 (SELECT id FROM users WHERE email = 'provider+9@1eq.me'),
 (SELECT id FROM roles WHERE name = 'Patient'));

INSERT INTO users_groups (user_id, group_id, provider_id, role_id) VALUES
((SELECT id FROM users WHERE firstname = 'Sarah' AND lastname = 'Bayne'),
 (SELECT group_id FROM groups WHERE group_name = 'GW Obstetrics'),
 (SELECT id FROM users WHERE email = 'provider+9@1eq.me'),
 (SELECT id FROM roles WHERE name = 'Patient'));

INSERT INTO users_groups (user_id, group_id, provider_id, role_id) VALUES
((SELECT id FROM users WHERE firstname = 'Clare' AND lastname = 'Stevens'),
 (SELECT group_id FROM groups WHERE group_name = 'GW Obstetrics'),
 (SELECT id FROM users WHERE email = 'provider+9@1eq.me'),
 (SELECT id FROM roles WHERE name = 'Patient'));

INSERT INTO users_groups (user_id, group_id, provider_id, role_id) VALUES
((SELECT id FROM users WHERE firstname = 'Melinda' AND lastname = 'Hernandez'),
 (SELECT group_id FROM groups WHERE group_name = 'GW Obstetrics'),
 (SELECT id FROM users WHERE email = 'provider+9@1eq.me'),
 (SELECT id FROM roles WHERE name = 'Patient'));

INSERT INTO users_groups (user_id, group_id, provider_id, role_id) VALUES
((SELECT id FROM users WHERE firstname = 'Allison' AND lastname = 'Harvey'),
 (SELECT group_id FROM groups WHERE group_name = 'GW Obstetrics'),
 (SELECT id FROM users WHERE email = 'provider+9@1eq.me'),
 (SELECT id FROM roles WHERE name = 'Patient'));

INSERT INTO users_groups (user_id, group_id, provider_id, role_id) VALUES
((SELECT id FROM users WHERE firstname = 'Sarah' AND lastname = 'Born'),
 (SELECT group_id FROM groups WHERE group_name = 'GW Obstetrics'),
 (SELECT id FROM users WHERE email = 'provider+9@1eq.me'),
 (SELECT id FROM roles WHERE name = 'Patient'));

INSERT INTO users_groups (user_id, group_id, provider_id, role_id) VALUES
((SELECT id FROM users WHERE firstname = 'Anne' AND lastname = 'Nzioki'),
 (SELECT group_id FROM groups WHERE group_name = 'GW Obstetrics'),
 (SELECT id FROM users WHERE email = 'provider+9@1eq.me'),
 (SELECT id FROM roles WHERE name = 'Patient'));

INSERT INTO users_groups (user_id, group_id, provider_id, role_id) VALUES
((SELECT id FROM users WHERE firstname = 'Ceyda' AND lastname = 'Maisami'),
 (SELECT group_id FROM groups WHERE group_name = 'GW Obstetrics'),
 (SELECT id FROM users WHERE email = 'provider+9@1eq.me'),
 (SELECT id FROM roles WHERE name = 'Patient'));

INSERT INTO users_groups (user_id, group_id, provider_id, role_id) VALUES
((SELECT id FROM users WHERE firstname = 'Diane' AND lastname = 'Folckemmer'),
 (SELECT group_id FROM groups WHERE group_name = 'GW Obstetrics'),
 (SELECT id FROM users WHERE email = 'provider+9@1eq.me'),
 (SELECT id FROM roles WHERE name = 'Patient'));
