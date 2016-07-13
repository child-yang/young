SET NAMES UTF8;

DROP DATABASE IF EXISTS app_wanghp;
CREATE DATABASE app_wanghp CHARSET=UTF8;

USE app_wanghp;

CREATE TABLE IF NOT EXISTS `hw_users` (
  `user_id` int(11) PRIMARY KEY  AUTO_INCREMENT,
  `user_name` varchar(100),
  `user_pwd` varchar(100),
  `last_time` bigint
);
INSERT INTO `hw_users`(`user_id`,`user_name`,`user_pwd`,`last_time`) VALUES(NULL, 'wanghaipeng', '12345678', '1466918345068');