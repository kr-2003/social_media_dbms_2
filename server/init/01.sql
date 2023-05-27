
DROP TABLE IF EXISTS `bookmarks`;
CREATE TABLE `bookmarks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` varchar(50) DEFAULT NULL,
  `post_id` int DEFAULT NULL,
  `time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `post_id` (`post_id`),
  CONSTRAINT `bookmarks_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `bookmarks_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
LOCK TABLES `bookmarks` WRITE;
UNLOCK TABLES;
DROP TABLE IF EXISTS `chat_msgs`;
CREATE TABLE `chat_msgs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sender_id` varchar(50) NOT NULL,
  `receiver_id` varchar(50) NOT NULL,
  `message` text,
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `sender_id` (`sender_id`),
  KEY `receiver_id` (`receiver_id`),
  CONSTRAINT `chat_msgs_ibfk_1` FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`),
  CONSTRAINT `chat_msgs_ibfk_2` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
LOCK TABLES `chat_msgs` WRITE;
UNLOCK TABLES;
DROP TABLE IF EXISTS `comment_likes`;
CREATE TABLE `comment_likes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `comment_id` int DEFAULT NULL,
  `liked_by` varchar(50) DEFAULT NULL,
  `time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `comment_id` (`comment_id`),
  KEY `liked_by` (`liked_by`),
  CONSTRAINT `comment_likes_ibfk_1` FOREIGN KEY (`comment_id`) REFERENCES `comments` (`id`),
  CONSTRAINT `comment_likes_ibfk_2` FOREIGN KEY (`liked_by`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
LOCK TABLES `comment_likes` WRITE;
UNLOCK TABLES;
DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `commented_by` varchar(50) DEFAULT NULL,
  `comment_body` text,
  `post_id` int DEFAULT NULL,
  `commented_by_name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `post_id` (`post_id`),
  KEY `commented_by` (`commented_by`),
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`commented_by`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
LOCK TABLES `comments` WRITE;
INSERT INTO `comments` VALUES (9,'13od2ovj4l8wpaofl','abhinav',165,'abhinavkumar'),(10,'13od2ovj4l8wpaofl','aur bsdk kya haal h????lauda de lassan.....eheheheehehheeh  , ,amdkkyad kda dkcdsc',165,'abhinavkumar'),(11,'13od2ovj4l8wpaofl','cscds',165,'abhinavkumar'),(12,'13od2ovj4l8wpaofl','sdvcsd',165,'abhinavkumar'),(13,'13od2ovj4l8wpaofl','Use overflow-scroll to add scrollbars to an element. Unlike overflow-auto, which only shows scrollbars if they are necessary, this utility always shows them. Note that some operating systems (like macOS) hide unnecessary scrollbars regardless of this setting.',165,'abhinavkumar'),(14,'13od2o3pol9er2vyk','vgh',101,'nisha'),(15,'13od2ovj4l8wpaofl','cds cmds c,',165,'abhinavkumar'),(16,'13od2ovj4l8wpaofl','lauda de lassan',167,'abhinavkumar'),(17,'13od2ovj4l8wpaofl','pilla do pyaza',167,'abhinavkumar'),(18,'13od2ovj4l8wpaofl',' adsd sdas',167,'abhinavkumar'),(19,'13od2ovj4l8wpaofl','fewfew',168,'abhinavkumar'),(20,'13od2ovj4l8wpaofl','vrqwerwq',166,'abhinavkumar'),(21,'13od2ovj4l8wpaofl',' evqwedwa',166,'abhinavkumar'),(22,'13od2ovj4l8wpaofl','fsd',166,'abhinavkumar'),(23,'13od2ovj4l8wpaofl',' cascsa',183,'abhinavkumar'),(24,'13od2ovj4l8wpaofl','c ascxsa',183,'abhinavkumar'),(25,'13od2ovj4l8wpaofl','cascas',184,'abhinavkumar'),(26,'13od2ovj4l8wpaofl','d sdcdswc',188,'abhinavkumar'),(27,'13od2ovj4l8wpaofl',' dcscscds',188,'abhinavkumar'),(28,'13od2ovj4l8wpaofl','d asdasdsa ds',192,'abhinavkumar'),(29,'13od2ovj4l8wpaofl','dcjsokcn',194,'abhinavkumar'),(30,'13od2ovj4l8wpaofl','csaxcxs',194,'abhinavkumar'),(31,'13od2ovj4l8wpaofl','d ac',201,'abhinavkumar'),(32,'13od2ovj4l8wpaofl','nice anime ',204,'abhinavkumar'),(33,'13od2ovj4l8wpaofl','csdcsd ',205,'abhinavkumar');
UNLOCK TABLES;
DROP TABLE IF EXISTS `employee`;
CREATE TABLE `employee` (
  `name` varchar(50) DEFAULT NULL,
  `age` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
LOCK TABLES `employee` WRITE;
UNLOCK TABLES;
DROP TABLE IF EXISTS `follow_request`;
CREATE TABLE `follow_request` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fol_req_by` varchar(50) DEFAULT NULL,
  `fol_req_to` varchar(50) DEFAULT NULL,
  `status` enum('pending','accepted','rejected') DEFAULT 'pending',
  PRIMARY KEY (`id`),
  KEY `fol_req_by` (`fol_req_by`),
  KEY `fol_req_to` (`fol_req_to`),
  CONSTRAINT `follow_request_ibfk_1` FOREIGN KEY (`fol_req_by`) REFERENCES `users` (`id`),
  CONSTRAINT `follow_request_ibfk_2` FOREIGN KEY (`fol_req_to`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
LOCK TABLES `follow_request` WRITE;
UNLOCK TABLES;
DROP TABLE IF EXISTS `followers`;
CREATE TABLE `followers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `follower_id` varchar(50) DEFAULT NULL,
  `followee_id` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `follower_id` (`follower_id`),
  KEY `followee_id` (`followee_id`),
  CONSTRAINT `followers_ibfk_1` FOREIGN KEY (`follower_id`) REFERENCES `users` (`id`),
  CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`followee_id`) REFERENCES `users` (`id`),
  CONSTRAINT `followers_chk_1` CHECK ((`follower_id` <> `followee_id`))
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
LOCK TABLES `followers` WRITE;
INSERT INTO `followers` VALUES (60,'13od2ovj4l8wpaofl','13od2o1e91l8r6avzz'),(61,'13od2o1i6l9qlvte4','13od2o1e91l8r6avzz'),(66,'13od2ovj4l8wpaofl','13od2o3pol9er2vyk'),(67,'13od2ovj4l8wpaofl','13od2o1i6l9qlvte4');
UNLOCK TABLES;
DROP TABLE IF EXISTS `group_members`;
CREATE TABLE `group_members` (
  `id` int NOT NULL AUTO_INCREMENT,
  `group_id` varchar(50) DEFAULT NULL,
  `user_id` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `group_id` (`group_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `group_members_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `groups` (`grp_id`),
  CONSTRAINT `group_members_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
LOCK TABLES `group_members` WRITE;
UNLOCK TABLES;
DROP TABLE IF EXISTS `group_messages`;
CREATE TABLE `group_messages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `message` text,
  `grp_id` varchar(50) DEFAULT NULL,
  `sender_id` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `grp_id` (`grp_id`),
  KEY `sender_id` (`sender_id`),
  CONSTRAINT `group_messages_ibfk_1` FOREIGN KEY (`grp_id`) REFERENCES `groups` (`grp_id`),
  CONSTRAINT `group_messages_ibfk_2` FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
LOCK TABLES `group_messages` WRITE;
UNLOCK TABLES;
DROP TABLE IF EXISTS `groups`;
CREATE TABLE `groups` (
  `grp_id` varchar(50) NOT NULL,
  `grp_name` varchar(50) NOT NULL,
  `grp_desc` text,
  `grp_pic` varchar(50) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `grp_admin` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`grp_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
LOCK TABLES `groups` WRITE;
UNLOCK TABLES;
DROP TABLE IF EXISTS `images`;
CREATE TABLE `images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `link` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
LOCK TABLES `images` WRITE;
UNLOCK TABLES;
DROP TABLE IF EXISTS `invitation`;
CREATE TABLE `invitation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `grp_id` varchar(50) DEFAULT NULL,
  `invite_to` varchar(50) DEFAULT NULL,
  `status` enum('pending','accepted','rejected') DEFAULT 'pending',
  PRIMARY KEY (`id`),
  KEY `grp_id` (`grp_id`),
  KEY `invite_to` (`invite_to`),
  CONSTRAINT `invitation_ibfk_1` FOREIGN KEY (`grp_id`) REFERENCES `groups` (`grp_id`),
  CONSTRAINT `invitation_ibfk_2` FOREIGN KEY (`invite_to`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
LOCK TABLES `invitation` WRITE;
UNLOCK TABLES;
DROP TABLE IF EXISTS `likes`;
CREATE TABLE `likes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `post_id` int DEFAULT NULL,
  `user_id` varchar(50) DEFAULT NULL,
  `liked_at` datetime DEFAULT NULL,
  `username` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `post_id` (`post_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
LOCK TABLES `likes` WRITE;
INSERT INTO `likes` VALUES (5,186,'13od2ovj4l8wpaofl',NULL,'abhinavkumar'),(6,187,'13od2ovj4l8wpaofl',NULL,'abhinavkumar'),(13,186,'13od2ovj4l8wpaofl',NULL,'abhinavkumar'),(14,187,'13od2ovj4l8wpaofl',NULL,'abhinavkumar'),(15,187,'13od2ovj4l8wpaofl',NULL,'abhinavkumar'),(17,191,'13od2oa43l9s4scd6',NULL,'jynt'),(18,191,'13od2oa43l9s4scd6',NULL,'jynt'),(38,193,'13od2ovj4l8wpaofl',NULL,'abhinavkumar'),(44,204,'13od2ovj4l8wpaofl',NULL,'abhinavkumar');
UNLOCK TABLES;
DROP TABLE IF EXISTS `notifications`;
CREATE TABLE `notifications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `notify_to` varchar(50) DEFAULT NULL,
  `notify_by` varchar(50) DEFAULT NULL,
  `type` enum('commented','fol_req','invitation') DEFAULT NULL,
  `post_id` int DEFAULT NULL,
  `grp_id` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `notify_to` (`notify_to`),
  KEY `notify_by` (`notify_by`),
  KEY `post_id` (`post_id`),
  KEY `grp_id` (`grp_id`),
  CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`notify_to`) REFERENCES `users` (`id`),
  CONSTRAINT `notifications_ibfk_2` FOREIGN KEY (`notify_by`) REFERENCES `users` (`id`),
  CONSTRAINT `notifications_ibfk_3` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`),
  CONSTRAINT `notifications_ibfk_4` FOREIGN KEY (`grp_id`) REFERENCES `groups` (`grp_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
LOCK TABLES `notifications` WRITE;
UNLOCK TABLES;
DROP TABLE IF EXISTS `posts`;
CREATE TABLE `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` varchar(50) NOT NULL,
  `post_content` text,
  `post_img` varchar(500) DEFAULT NULL,
  `created_at` varchar(100) DEFAULT NULL,
  `username` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=207 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
LOCK TABLES `posts` WRITE;
INSERT INTO `posts` VALUES (196,'13od2ovj4l8wpaofl','heyy babygirl','','Sat Oct 29 2022 10:51:03 GMT+0530 (India Standard Time)','abhinavkumar'),(197,'13od2ovj4l8wpaofl','lauda de lsassan','','Sat Oct 29 2022 11:10:54 GMT+0530 (India Standard Time)','abhinavkumar'),(201,'13od2o1i6l9qlvte4','heyyy','','Sat Oct 29 2022 11:29:32 GMT+0530 (India Standard Time)','khushi_agarwal'),(202,'13od2ovj4l8wpaofl','jgfgjfjgh','','Sat Oct 29 2022 11:58:37 GMT+0530 (India Standard Time)','abhinavkumar'),(203,'13od2o1i6l9qlvte4','heyyy nvcnccccfchgcgjv','','Sat Oct 29 2022 11:58:48 GMT+0530 (India Standard Time)','khushi_agarwal'),(204,'13od2ovj4l8wpaofl','Demon Slayer: Kimetsu no Yaiba is a Japanese manga series written and illustrated by Koyoharu Gotouge. It follows teenage Tanjiro Kamado, who strives to become a demon slayer after his family was slaughtered and his younger sister, Nezuko, turned into a demon.','https://res.cloudinary.com/abhi9av/image/upload/v1667152410/dtny0yos25hsmzdihwrm.png','Sun Oct 30 2022 23:23:30 GMT+0530 (India Standard Time)','abhinavkumar'),(205,'13od2ovj4l8wpaofl','d sdwdw qdcascas','','Tue Nov 01 2022 18:29:15 GMT+0530 (India Standard Time)','abhinavkumar'),(206,'13od2o1i6l9qlvte4','hgegei dgeifheifhei','','Wed Nov 02 2022 08:32:06 GMT+0530 (India Standard Time)','khushi_agarwal');
UNLOCK TABLES;
DROP TABLE IF EXISTS `shares`;
CREATE TABLE `shares` (
  `id` int NOT NULL AUTO_INCREMENT,
  `share_by` varchar(50) DEFAULT NULL,
  `share_to` varchar(50) DEFAULT NULL,
  `post_id` int DEFAULT NULL,
  `time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `share_by` (`share_by`),
  KEY `share_to` (`share_to`),
  KEY `post_id` (`post_id`),
  CONSTRAINT `shares_ibfk_1` FOREIGN KEY (`share_by`) REFERENCES `users` (`id`),
  CONSTRAINT `shares_ibfk_2` FOREIGN KEY (`share_to`) REFERENCES `users` (`id`),
  CONSTRAINT `shares_ibfk_3` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
LOCK TABLES `shares` WRITE;
UNLOCK TABLES;
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `password` varchar(500) NOT NULL,
  `date_of_birth` varchar(100) NOT NULL,
  `created_at` varchar(100) NOT NULL,
  `email_id` varchar(50) NOT NULL,
  `about` text,
  `profile_pic` varchar(500) DEFAULT NULL,
  `public_status` enum('public','private') DEFAULT 'public',
  `profile_pic_url` varchar(400) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email_id` (`email_id`),
  KEY `profile_pic` (`profile_pic`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
LOCK TABLES `users` WRITE;
INSERT INTO `users` VALUES ('13od2o1e91l8r6avzz','abhinav99','abhinav','kumar','$2b$10$fCKo6U1uXMz4J5J4PhrEhOMlREDGo.0CAfzHDTKo7RoBBedPqU0fm','2014-08-18T15:41:54.000Z','2022-10-02 15:31:17.182','abhinav@gmail.com',NULL,NULL,'public','https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png'),('13od2o1eg9l8r6lo1u','ranu2003','khushi','agarwal','$2b$10$PgT9k1LyiI4MZJa.WtVrNOOQ8FtfqBDRmHu6uCnB8AraA7n4wRpiC','2014-08-18T15:41:54.000Z','2022-10-02 15:39:40.098','ranu@gmail.com',NULL,NULL,'public','https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png'),('13od2o1eg9l8r6paya','shashi77','shashi','singh','$2b$10$wGhLFXwz.JtTqjo9v17I5.ieXm69SF9xF1hVDu8c8776U0fxYlhri','2014-08-18T15:41:54.000Z','2022-10-02 15:42:29.746','shashi@gmail.com',NULL,NULL,'public','https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png'),('13od2o1eg9l8r6wig0','abhi','abhi','ku','$2b$10$XER14NAshaXNtxexU.dtbenG8DR7QaL2ZfzP1GuNSa6w4OjRcyU56','2014-08-18T15:41:54.000Z','2022-10-02 15:48:06.048','abhi@gmail.com',NULL,NULL,'public','https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png'),('13od2o1i6l9qlvte4','khushi_agarwal','khushi','agarwal','$2b$10$D.e9a63A8F//Gsrone0xHe1LDC4cIH.Jf8R2IeVxieDY1zOOA4fHy','2014-08-18T15:41:54.000Z','2022-10-27 10:39:23.979','k@gmail.com',NULL,NULL,'public','https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png'),('13od2o1thla1eub0r','mihir','mihir','patel','$2b$10$avQDE4w53YZImDARmoTQnOpD26nV0uEPrGPxqhqAW2rzQ1IMU462a','2014-08-18T15:41:54.000Z','2022-11-04 00:07:44.138','mihir@gmail.com',NULL,NULL,'public',NULL),('13od2o20hl9sb6fw0','user1','user1','use','$2b$10$99qxINbKMhW4uFxCTVAnseza3eSrwaySI2YrWnsycScVdm2Kwgsyi','2014-08-18T15:41:54.000Z','2022-10-28 15:15:16.271','user@gmail.com',NULL,NULL,'public','https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png'),('13od2o3pol9er2vyk','nisha','nisha','nisha','$2b$10$16DG4FwB7wZ.V4r9Njrse.rgvY54yIKoQmZYjLsDYWujB3LTOAVsm','2014-08-18T15:41:54.000Z','2022-10-19 03:31:37.867','nisha@gmail.com',NULL,NULL,'public','https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png'),('13od2oa43l9s4scd6','jynt','jayant','belwanshi','$2b$10$zb75P/FziIglveQm1m6rfOVl133nLUUIKE.oWDGdWcOFXcmgUeBMS','2014-08-18T15:41:54.000Z','2022-10-28 12:16:20.825','123456789',NULL,NULL,'public','https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png'),('13od2ovj4l8wpaofl','abhinavkumar','Abhinav','Kumar','$2b$10$4i4aSRHq1Q5xKy9dyE5e5umm8fWZ/DsY28xPCRTR708pY.aFKlV3C','2014-08-18T15:41:54.000Z','2022-10-06 12:21:50.961','cse210001002@iiti.ac.in',NULL,NULL,'public','https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png');
UNLOCK TABLES;
