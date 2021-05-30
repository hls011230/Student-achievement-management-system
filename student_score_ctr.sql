/*
 Navicat Premium Data Transfer

 Source Server         : test
 Source Server Type    : MySQL
 Source Server Version : 80022
 Source Host           : localhost:3306
 Source Schema         : student_score_ctr

 Target Server Type    : MySQL
 Target Server Version : 80022
 File Encoding         : 65001

 Date: 30/05/2021 15:31:37
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for appeal
-- ----------------------------
DROP TABLE IF EXISTS `appeal`;
CREATE TABLE `appeal`  (
  `ap_sno` varchar(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `ap_course` varchar(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `done_teacher` varchar(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `a_cur_time` date NULL DEFAULT NULL,
  `ap_reason` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  `done` int(0) NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of appeal
-- ----------------------------
INSERT INTO `appeal` VALUES ('202002105', '计算机基础', '林悠悠', '2021-05-29', '成绩计算错误', 1);
INSERT INTO `appeal` VALUES ('202002105', 'Web', '小黄', '2021-05-29', '成绩计算错误', 1);
INSERT INTO `appeal` VALUES ('202002105', 'Java', '林悠悠', '2021-05-30', '成绩计算出错', 0);

-- ----------------------------
-- Table structure for class
-- ----------------------------
DROP TABLE IF EXISTS `class`;
CREATE TABLE `class`  (
  `classNo` varchar(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `className` varchar(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `college` varchar(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `grade` varchar(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of class
-- ----------------------------
INSERT INTO `class` VALUES ('B200602', '区块链本科二班', '区块链学院', '大一');

-- ----------------------------
-- Table structure for course
-- ----------------------------
DROP TABLE IF EXISTS `course`;
CREATE TABLE `course`  (
  `courseNo` int(0) NULL DEFAULT NULL,
  `courseName` varchar(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  INDEX `fk_course`(`courseNo`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of course
-- ----------------------------
INSERT INTO `course` VALUES (1, 'Java');
INSERT INTO `course` VALUES (2, 'Web');
INSERT INTO `course` VALUES (3, '数学');
INSERT INTO `course` VALUES (4, '体育');
INSERT INTO `course` VALUES (5, '英语');
INSERT INTO `course` VALUES (6, '计算机基础');

-- ----------------------------
-- Table structure for score
-- ----------------------------
DROP TABLE IF EXISTS `score`;
CREATE TABLE `score`  (
  `sno` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `courseNo` int(0) NULL DEFAULT NULL,
  `cur_time` date NULL DEFAULT NULL,
  `score` double NULL DEFAULT NULL,
  `cur_teacher` varchar(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  INDEX `fk_sno`(`sno`) USING BTREE,
  INDEX `fk_course`(`courseNo`) USING BTREE,
  CONSTRAINT `fk_course` FOREIGN KEY (`courseNo`) REFERENCES `course` (`courseNo`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_sno` FOREIGN KEY (`sno`) REFERENCES `student` (`sno`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of score
-- ----------------------------
INSERT INTO `score` VALUES ('202000743', 1, '2021-05-24', 90, '2021002');
INSERT INTO `score` VALUES ('202001016', 1, '2021-05-24', 90, '2021002');
INSERT INTO `score` VALUES ('202001877', 1, '2021-05-24', 80, '2021002');
INSERT INTO `score` VALUES ('202000743', 6, '2021-05-24', 85, '2021002');
INSERT INTO `score` VALUES ('202001016', 6, '2021-05-24', 86, '2021002');
INSERT INTO `score` VALUES ('202001877', 6, '2021-05-24', 79, '2021002');
INSERT INTO `score` VALUES ('202002103', 6, '2021-05-24', 80, '2021002');
INSERT INTO `score` VALUES ('202002105', 6, '2021-05-28', 97, '2021002');
INSERT INTO `score` VALUES ('202000310', 1, '2021-05-28', 99, '2021002');
INSERT INTO `score` VALUES ('202002105', 1, '2021-05-29', 99, '2021002');
INSERT INTO `score` VALUES ('202002105', 2, '2021-05-29', 90, '2021001');
INSERT INTO `score` VALUES ('202002103', 2, '2021-05-29', 99, '2021001');

-- ----------------------------
-- Table structure for student
-- ----------------------------
DROP TABLE IF EXISTS `student`;
CREATE TABLE `student`  (
  `email` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `username1` varchar(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `realname1` varchar(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `sno` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `phone` varchar(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `sex` char(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `password` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `class` varchar(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`sno`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of student
-- ----------------------------
INSERT INTO `student` VALUES ('835831730@qq.com', 'djb', '丁俊博', '202000310', '18720702386', '男', '622500fc61ddc7be292de3b37aa1951b', 'B200602');
INSERT INTO `student` VALUES ('1160402406@qq.com', 'cxx', '蔡肖筱', '202000743', '18170905606', '女', '102f69b90c427e28d161b5131dc28465', 'B200602');
INSERT INTO `student` VALUES ('1761092636@qq.com', 'dz', '董智', '202000980', '18279852132', '男', 'a82e8333bb54db03fd088edc114121d9', 'B200602');
INSERT INTO `student` VALUES ('3207830168@qq.com', 'wuchen', '吴泽诚', '202001016', '17770050556', '男', 'd89d3fb8ae24c30e07110c5c7c7e4ca9', 'B200602');
INSERT INTO `student` VALUES ('2807500801@qq.com', 'lwj', '李文建', '202001603', '13317087832', '男', '1a3d3ab30d78c8c0fa2aa3e2cca86996', 'B200602');
INSERT INTO `student` VALUES ('1784420499@qq.com', 'lx', '李熙', '202001877', '15979211139', '男', '1a3d3ab30d78c8c0fa2aa3e2cca86996', 'B200602');
INSERT INTO `student` VALUES ('1621967005@qq.com', 'lj', '林菁', '202002103', '17350149891', '女', 'f9424acaa6a65b642978662bb82dcb6d', 'B200602');
INSERT INTO `student` VALUES ('1195549750@qq.com', 'hls', '黄垄生', '202002105', '13285986017', '男', 'f7f64a8bed2d02cb77b87529b45a01b5', 'B200603');

-- ----------------------------
-- Table structure for t_schedule
-- ----------------------------
DROP TABLE IF EXISTS `t_schedule`;
CREATE TABLE `t_schedule`  (
  `t_scNo` int(0) NOT NULL AUTO_INCREMENT,
  `courseNo` int(0) NULL DEFAULT NULL,
  `jobno` varchar(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `classNo` varchar(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`t_scNo`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_schedule
-- ----------------------------
INSERT INTO `t_schedule` VALUES (1, 1, '2021002', 'B200602');
INSERT INTO `t_schedule` VALUES (2, 2, '2021001', 'B200602');
INSERT INTO `t_schedule` VALUES (3, 6, '2021002', 'B200602');
INSERT INTO `t_schedule` VALUES (4, 1, '2021002', 'B200603');
INSERT INTO `t_schedule` VALUES (5, 6, '2021002', 'B200603');
INSERT INTO `t_schedule` VALUES (6, 2, '2021001', 'B200603');

-- ----------------------------
-- Table structure for teacher
-- ----------------------------
DROP TABLE IF EXISTS `teacher`;
CREATE TABLE `teacher`  (
  `email` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `username1` varchar(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `realname1` varchar(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `jobno` varchar(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `phone` varchar(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `sex` char(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `password` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  INDEX `fk_tid`(`jobno`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of teacher
-- ----------------------------
INSERT INTO `teacher` VALUES ('3026683545@qq.com', 'yyds', '小黄', '2021001', '18379196920', '男', 'hls011230.');
INSERT INTO `teacher` VALUES ('3556127300@qq.com', 'lyy', '林悠悠', '2021002', '18379196920', '女', 'hls011230.');

-- ----------------------------
-- Procedure structure for mypro01
-- ----------------------------
DROP PROCEDURE IF EXISTS `mypro01`;
delimiter ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `mypro01`(name varchar(10))
begin
        if name is null or name = "" then
                select  st.sno , st.realname1 , co.courseName, sc.score from score sc inner join student st on sc.sno = st.sno inner join course co on sc.courseNo = co.courseNo ;
        else
select  st.sno , st.realname1 , co.courseName, sc.score from score sc inner join student st on sc.sno = st.sno inner join course co on sc.courseNo = co.courseNo where realname1 like concat('%',name,'%');
        end if;	
end
;;
delimiter ;

SET FOREIGN_KEY_CHECKS = 1;
