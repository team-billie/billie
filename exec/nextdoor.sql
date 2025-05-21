CREATE DATABASE  IF NOT EXISTS `nextdoor` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `nextdoor`;
-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: nextdoor
-- ------------------------------------------------------
-- Server version	8.0.42

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account` (
  `account_id` bigint NOT NULL AUTO_INCREMENT,
  `account_no` varchar(30) NOT NULL,
  `account_type` enum('BILI_PAY','EXTERNAL') NOT NULL,
  `alias` varchar(50) DEFAULT NULL,
  `balance` int NOT NULL,
  `bank_code` varchar(10) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `is_primary` bit(1) NOT NULL,
  `is_registered` bit(1) NOT NULL,
  `member_id` bigint NOT NULL,
  PRIMARY KEY (`account_id`),
  KEY `FKr5j0huynd7nsv1s7e9vb8qvwo` (`member_id`),
  CONSTRAINT `FKr5j0huynd7nsv1s7e9vb8qvwo` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` VALUES (1,'9996359506064107','BILI_PAY','빌리페이',924000,'999','2025-05-21 15:50:30.813346',_binary '\0',_binary '',1),(2,'9993961277116917','BILI_PAY','빌리페이',14000,'999','2025-05-21 15:51:26.865551',_binary '\0',_binary '',2),(3,'9992087247031348','BILI_PAY','빌리페이',0,'999','2025-05-21 15:51:34.336227',_binary '\0',_binary '',3),(4,'9994610601331772','BILI_PAY','빌리페이',0,'999','2025-05-21 15:52:33.840655',_binary '\0',_binary '',4),(5,'0046580815999857','EXTERNAL','앱 계좌 등록',200000,'004','2025-05-21 16:52:25.720024',_binary '',_binary '',1),(6,'9995304675892792','BILI_PAY','빌리페이',20000,'999','2025-05-21 16:59:44.143004',_binary '\0',_binary '',5),(7,'9999767575767522','BILI_PAY','빌리페이',1548000,'999','2025-05-21 18:59:09.050756',_binary '\0',_binary '',6),(8,'0041374161077800','EXTERNAL','앱 계좌 등록',44000,'004','2025-05-21 19:51:31.518595',_binary '',_binary '',6),(9,'9999282082550649','BILI_PAY','빌리페이',0,'999','2025-05-21 20:00:50.983825',_binary '\0',_binary '',7);
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ai_image`
--

DROP TABLE IF EXISTS `ai_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ai_image` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `image_url` varchar(255) NOT NULL,
  `mime_type` varchar(255) NOT NULL,
  `type` enum('AFTER','BEFORE') DEFAULT NULL,
  `rental_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKeif2rbrj2l2f2iphjdp38v314` (`rental_id`),
  CONSTRAINT `FKeif2rbrj2l2f2iphjdp38v314` FOREIGN KEY (`rental_id`) REFERENCES `rental` (`rental_id`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ai_image`
--

LOCK TABLES `ai_image` WRITE;
/*!40000 ALTER TABLE `ai_image` DISABLE KEYS */;
INSERT INTO `ai_image` VALUES (11,'https://oneders.s3.ap-northeast-2.amazonaws.com/rentals/7/before/db456ad4-574f-41f6-8a20-7b868b3838e0.jpg','image/jpeg','BEFORE',7),(12,'https://oneders.s3.ap-northeast-2.amazonaws.com/rentals/7/before/6eb0942f-0cf9-4603-ba9b-017a5d10e32f.jpg','image/jpeg','BEFORE',7),(13,'https://oneders.s3.ap-northeast-2.amazonaws.com/rentals/7/after/51c0d1f4-0228-42d1-a43c-3fa30a805d99.jpg','image/jpeg','AFTER',7),(14,'https://oneders.s3.ap-northeast-2.amazonaws.com/rentals/7/after/bdfae20a-002d-4c65-b775-37e2dcbe6939.jpg','image/jpeg','AFTER',7),(36,'https://oneders.s3.ap-northeast-2.amazonaws.com/rentals/14/before/a17fd4ed-4a26-4545-84ed-5f148147a91f.jpg','image/jpeg','BEFORE',14),(37,'https://oneders.s3.ap-northeast-2.amazonaws.com/rentals/14/before/f8bf9fb1-6683-432d-b4bc-882da477317e.jpg','image/jpeg','BEFORE',14),(38,'https://oneders.s3.ap-northeast-2.amazonaws.com/rentals/14/before/5b4b597b-d0ba-4299-8f08-04adb42f6b46.jpg','image/jpeg','BEFORE',14),(39,'https://oneders.s3.ap-northeast-2.amazonaws.com/rentals/14/before/7bb5bd16-78b1-43fb-8700-54d573f4a54f.jpg','image/jpeg','BEFORE',14),(40,'https://oneders.s3.ap-northeast-2.amazonaws.com/rentals/14/before/615c023b-c489-4e2a-a6db-6a88380056d7.jpg','image/jpeg','BEFORE',14),(41,'https://oneders.s3.ap-northeast-2.amazonaws.com/rentals/14/before/f262c6cf-f6b8-4d59-8ecb-bdfdb07745e9.jpg','image/jpeg','BEFORE',14),(42,'https://oneders.s3.ap-northeast-2.amazonaws.com/rentals/14/before/2a276182-6415-454f-ad25-258faa711c83.jpg','image/jpeg','BEFORE',14),(43,'https://oneders.s3.ap-northeast-2.amazonaws.com/rentals/14/before/cc33fe0c-9dac-4d77-8580-087fafaf1482.jpg','image/jpeg','BEFORE',14),(44,'https://oneders.s3.ap-northeast-2.amazonaws.com/rentals/14/before/9c00aaaf-6c6b-410f-ba9b-e85245240840.jpg','image/jpeg','BEFORE',14),(45,'https://oneders.s3.ap-northeast-2.amazonaws.com/rentals/14/before/33084407-5c78-4880-8d3f-2f34deedb053.jpg','image/jpeg','BEFORE',14),(46,'https://oneders.s3.ap-northeast-2.amazonaws.com/rentals/14/before/dbbc9a67-b31b-4ea1-8d1a-83fd95256b90.jpg','image/jpeg','BEFORE',14),(47,'https://oneders.s3.ap-northeast-2.amazonaws.com/rentals/14/before/d763e5a2-ab31-4f8c-b40e-fbe349f37a3c.jpg','image/jpeg','BEFORE',14),(48,'https://oneders.s3.ap-northeast-2.amazonaws.com/rentals/14/before/870b286b-ce46-4ca3-b180-72999bf60af1.jpg','image/jpeg','BEFORE',14),(49,'https://oneders.s3.ap-northeast-2.amazonaws.com/rentals/14/before/d7c24d0c-7f82-427a-8018-da38bbdab75b.jpg','image/jpeg','BEFORE',14),(50,'https://oneders.s3.ap-northeast-2.amazonaws.com/rentals/14/before/14c41dc3-02d3-4673-b541-4f1167c1ab29.jpg','image/jpeg','BEFORE',14),(51,'https://oneders.s3.ap-northeast-2.amazonaws.com/rentals/16/before/2f392634-af1d-4264-92d2-704ba7192ae3.webp','image/jpeg','BEFORE',16);
/*!40000 ALTER TABLE `ai_image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ai_image_comparison_pair`
--

DROP TABLE IF EXISTS `ai_image_comparison_pair`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ai_image_comparison_pair` (
  `ai_image_comparison_pair_id` bigint NOT NULL AUTO_INCREMENT,
  `after_image_id` bigint NOT NULL,
  `before_image_id` bigint NOT NULL,
  `pair_comparison_result` text NOT NULL,
  `rental_id` bigint NOT NULL,
  PRIMARY KEY (`ai_image_comparison_pair_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ai_image_comparison_pair`
--

LOCK TABLES `ai_image_comparison_pair` WRITE;
/*!40000 ALTER TABLE `ai_image_comparison_pair` DISABLE KEYS */;
INSERT INTO `ai_image_comparison_pair` VALUES (1,13,11,'{\"result\":\"DAMAGE_FOUND\",\"damages\":[{\"damageType\":\"CONTAMINATION\",\"location\":\"왼쪽 신발 밑창과 테두리\",\"details\":\"왼쪽 신발의 흰색 고무 밑창과 둘레에 흙과 때로 인한 광범위한 오염 및 변색이 발생했습니다.\",\"boundingBox\":{\"xMin\":0.0,\"yMin\":0.556,\"xMax\":0.463,\"yMax\":1.0},\"confidenceScore\":0.98},{\"damageType\":\"CONTAMINATION\",\"location\":\"왼쪽 신발 앞코\",\"details\":\"왼쪽 신발의 광택 있는 앞코 부분에 흙과 마모로 인한 오염과 미세 스크래치가 생겼습니다.\",\"boundingBox\":{\"xMin\":0.0,\"yMin\":0.486,\"xMax\":0.278,\"yMax\":0.625},\"confidenceScore\":0.95},{\"damageType\":\"SCRATCH\",\"location\":\"왼쪽 신발 바깥쪽 측면 하단\",\"details\":\"왼쪽 신발의 바깥쪽 캔버스 원단 하단에 마찰로 인한 흰색 마모 흔적과 오염이 있습니다.\",\"boundingBox\":{\"xMin\":0.0,\"yMin\":0.451,\"xMax\":0.185,\"yMax\":0.556},\"confidenceScore\":0.9},{\"damageType\":\"CONTAMINATION\",\"location\":\"오른쪽 신발 밑창과 테두리\",\"details\":\"오른쪽 신발의 흰색 고무 밑창과 둘레에 흙과 때로 인한 광범위한 오염 및 변색이 발생했습니다.\",\"boundingBox\":{\"xMin\":0.370,\"yMin\":0.417,\"xMax\":1.0,\"yMax\":1.0},\"confidenceScore\":0.98},{\"damageType\":\"CONTAMINATION\",\"location\":\"오른쪽 신발 앞코\",\"details\":\"오른쪽 신발의 광택 있는 앞코 부분에 흙과 마모로 인한 오염과 미세 스크래치가 생겼습니다.\",\"boundingBox\":{\"xMin\":0.463,\"yMin\":0.417,\"xMax\":0.741,\"yMax\":0.556},\"confidenceScore\":0.95},{\"damageType\":\"SCRATCH\",\"location\":\"오른쪽 신발 바깥쪽 측면 하단\",\"details\":\"오른쪽 신발의 바깥쪽 캔버스 원단 하단에 마찰로 인한 흰색 마모 흔적과 오염이 있습니다.\",\"boundingBox\":{\"xMin\":0.741,\"yMin\":0.417,\"xMax\":1.0,\"yMax\":0.521},\"confidenceScore\":0.9},{\"damageType\":\"CONTAMINATION\",\"location\":\"양쪽 신발끈 전체\",\"details\":\"원래 크림색이었던 신발끈이 사용으로 인해 전반적으로 회색빛으로 변색되었습니다.\",\"boundingBox\":{\"xMin\":0.139,\"yMin\":0.104,\"xMax\":0.880,\"yMax\":0.486},\"confidenceScore\":0.97}]}',7),(2,14,12,'{\"result\":\"DAMAGE_FOUND\",\"damages\":[{\"damageType\":\"CONTAMINATION\",\"location\":\"왼쪽 신발 앞코\",\"details\":\"왼쪽 신발 앞코 부분에 심한 오염과 변색이 새로 생겼습니다.\",\"boundingBox\":{\"xMin\":0.074,\"yMin\":0.510,\"xMax\":0.444,\"yMax\":0.625},\"confidenceScore\":0.98},{\"damageType\":\"CONTAMINATION\",\"location\":\"오른쪽 신발 앞코\",\"details\":\"오른쪽 신발 앞코 부분에 심한 오염과 변색이 새로 생겼습니다.\",\"boundingBox\":{\"xMin\":0.509,\"yMin\":0.510,\"xMax\":0.880,\"yMax\":0.625},\"confidenceScore\":0.98},{\"damageType\":\"CONTAMINATION\",\"location\":\"왼쪽 신발 밑창 옆면\",\"details\":\"왼쪽 신발 밑창 옆면(고무 부분)에 심한 오염과 긁힘, 변색이 새로 생겼습니다.\",\"boundingBox\":{\"xMin\":0.070,\"yMin\":0.570,\"xMax\":0.470,\"yMax\":0.710},\"confidenceScore\":0.97},{\"damageType\":\"CONTAMINATION\",\"location\":\"오른쪽 신발 밑창 옆면\",\"details\":\"오른쪽 신발 밑창 옆면(고무 부분)에 심한 오염과 긁힘, 변색이 새로 생겼습니다.\",\"boundingBox\":{\"xMin\":0.460,\"yMin\":0.570,\"xMax\":0.900,\"yMax\":0.710},\"confidenceScore\":0.97}]}',7),(3,28,27,'{\"result\":\"NO_DAMAGE_FOUND\",\"damages\":[]}',13);
/*!40000 ALTER TABLE `ai_image_comparison_pair` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chat_message`
--

DROP TABLE IF EXISTS `chat_message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chat_message` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `content` varchar(255) DEFAULT NULL,
  `deleted` bit(1) NOT NULL,
  `sender_id` bigint DEFAULT NULL,
  `sent_at` datetime(6) DEFAULT NULL,
  `chat_room_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKj52yap2xrm9u0721dct0tjor9` (`chat_room_id`),
  CONSTRAINT `FKj52yap2xrm9u0721dct0tjor9` FOREIGN KEY (`chat_room_id`) REFERENCES `chat_room` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=91 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat_message`
--

LOCK TABLES `chat_message` WRITE;
/*!40000 ALTER TABLE `chat_message` DISABLE KEYS */;
INSERT INTO `chat_message` VALUES (1,'안녕',_binary '\0',3,'2025-05-21 15:53:56.903442',1),(2,'하이',_binary '\0',3,'2025-05-21 15:54:03.553629',1),(3,'방가',_binary '\0',3,'2025-05-21 15:54:05.749270',1),(4,'아',_binary '\0',3,'2025-05-21 15:54:11.178972',1),(5,'야',_binary '\0',3,'2025-05-21 15:54:12.410968',1),(6,'왜',_binary '\0',100,'2025-05-21 15:54:21.190901',1),(7,'안돼',_binary '\0',100,'2025-05-21 15:54:22.420277',1),(8,'왜',_binary '\0',100,'2025-05-21 15:54:23.953277',1),(9,'왜',_binary '\0',100,'2025-05-21 15:54:25.262651',1),(10,'왜',_binary '\0',100,'2025-05-21 15:54:26.490926',1),(11,'왜',_binary '\0',100,'2025-05-21 15:54:28.654150',1),(12,'sdfsad',_binary '\0',3,'2025-05-21 17:13:59.443350',1),(13,'asdf',_binary '\0',3,'2025-05-21 17:14:01.264997',1),(14,'sdafsdf',_binary '\0',3,'2025-05-21 17:14:02.850811',1),(15,'asdfasdf',_binary '\0',3,'2025-05-21 17:14:04.480550',1),(16,'asdf',_binary '\0',3,'2025-05-21 17:14:15.663224',1),(17,'123123',_binary '\0',3,'2025-05-21 17:14:21.797933',1),(18,'ㅁㄴㅇ',_binary '\0',3,'2025-05-21 17:24:17.129459',1),(19,'ㄴㅇㄹ',_binary '\0',3,'2025-05-21 17:24:18.553576',1),(20,'야',_binary '\0',3,'2025-05-21 17:25:06.132642',1),(21,'야',_binary '\0',3,'2025-05-21 17:25:06.845806',1),(22,'야',_binary '\0',3,'2025-05-21 17:25:07.595821',1),(23,'야',_binary '\0',3,'2025-05-21 17:25:08.440913',1),(24,'야',_binary '\0',3,'2025-05-21 17:25:08.967826',1),(25,'양',_binary '\0',3,'2025-05-21 17:25:09.467580',1),(26,'양',_binary '\0',3,'2025-05-21 17:25:09.996405',1),(27,'양',_binary '\0',3,'2025-05-21 17:25:10.500190',1),(28,'양',_binary '\0',3,'2025-05-21 17:25:10.982126',1),(29,'야양',_binary '\0',3,'2025-05-21 17:25:12.279904',1),(30,'didi',_binary '\0',4,'2025-05-21 17:25:14.315124',1),(31,'didi',_binary '\0',4,'2025-05-21 17:25:14.950232',1),(32,'didi',_binary '\0',4,'2025-05-21 17:25:15.611057',1),(33,'didi',_binary '\0',4,'2025-05-21 17:25:16.269286',1),(34,'didi',_binary '\0',4,'2025-05-21 17:25:16.852185',1),(35,'didi',_binary '\0',4,'2025-05-21 17:25:17.511986',1),(36,'didi',_binary '\0',4,'2025-05-21 17:25:18.176888',1),(37,'didid',_binary '\0',4,'2025-05-21 17:25:18.807271',1),(38,'ㅇㅁㄹㄴㅇ',_binary '\0',3,'2025-05-21 17:27:06.807020',1),(39,'ㅇㅁㄹㄴㅇ',_binary '\0',3,'2025-05-21 17:27:07.513017',1),(40,'ㅇㅁㄹㄴㅇ',_binary '\0',3,'2025-05-21 17:27:08.679500',1),(41,'ㅇㅁㄹㄴㅇ',_binary '\0',3,'2025-05-21 17:27:08.679500',1),(42,'ㅇㅁㄹㄴㅇ',_binary '\0',3,'2025-05-21 17:27:08.679499',1),(43,'ㅇㅁㄹㄴㅇㄴㅇㄹㄴ',_binary '\0',3,'2025-05-21 17:27:09.457245',1),(44,'ㅇㅁㄹㄴㅇㄴㅇㄹㄴ',_binary '\0',3,'2025-05-21 17:27:09.765321',1),(45,'ㅇㅁㄹㄴㅇㄴㅇㄹㄴ',_binary '\0',3,'2025-05-21 17:27:09.765402',1),(46,'ㅇㅁㄹㄴㅇㄴㅇㄹㄴ',_binary '\0',3,'2025-05-21 17:27:09.986880',1),(47,'ㅇㅁㄹㄴㅇㄴㅇㄹㄴ',_binary '\0',3,'2025-05-21 17:27:09.995050',1),(48,'ㄴㅇㄹㄴㅇㄹ',_binary '\0',3,'2025-05-21 17:27:11.481786',1),(49,'ㄴㅇㄹㄴㅇㄹ',_binary '\0',3,'2025-05-21 17:27:11.748503',1),(50,'ㄴㅇㄹㄴㅇㄹ',_binary '\0',3,'2025-05-21 17:27:11.747681',1),(51,'ㄴㅇㄹㄴㅇㄹ',_binary '\0',3,'2025-05-21 17:27:11.958107',1),(52,'m',_binary '\0',3,'2025-05-21 17:37:38.687144',1),(53,'m',_binary '\0',3,'2025-05-21 17:37:39.417227',1),(54,'m',_binary '\0',3,'2025-05-21 17:37:41.394697',1),(55,'m',_binary '\0',3,'2025-05-21 17:37:43.348680',1),(56,'m',_binary '\0',3,'2025-05-21 17:37:44.971352',1),(57,'n',_binary '\0',3,'2025-05-21 17:37:49.824361',1),(58,'j',_binary '\0',3,'2025-05-21 17:37:51.667937',1),(59,'ssd',_binary '\0',3,'2025-05-21 17:38:40.518185',1),(60,'df',_binary '\0',4,'2025-05-21 17:39:05.357631',1),(61,'dsdf',_binary '\0',4,'2025-05-21 17:39:06.979655',1),(62,'sdfsdf',_binary '\0',4,'2025-05-21 17:39:08.344030',1),(63,'dasasdf',_binary '\0',3,'2025-05-21 17:39:13.343858',1),(64,'asddsf',_binary '\0',3,'2025-05-21 17:39:15.294212',1),(65,'dsf',_binary '\0',3,'2025-05-21 17:39:17.134921',1),(66,'1',_binary '\0',3,'2025-05-21 17:39:18.339398',1),(67,'df',_binary '\0',4,'2025-05-21 17:39:24.225031',1),(68,'1',_binary '\0',3,'2025-05-21 17:39:26.875528',1),(69,'dfff',_binary '\0',4,'2025-05-21 17:39:30.821148',1),(70,'ff',_binary '\0',4,'2025-05-21 17:39:32.231245',1),(71,'asas',_binary '\0',3,'2025-05-21 17:39:46.461003',1),(72,'asdf',_binary '\0',3,'2025-05-21 17:39:51.064810',1),(73,'어이 채팅에 스크롤 넣어라잉',_binary '\0',3,'2025-05-21 18:59:31.616710',1),(74,'ㅎㅇ',_binary '\0',3,'2025-05-21 20:48:34.851992',2),(75,'ㅎㅇ',_binary '\0',7,'2025-05-21 20:48:38.426954',2),(76,'ㅎㅇ',_binary '\0',3,'2025-05-21 20:48:47.160604',2),(77,'ㅎㅇ',_binary '\0',3,'2025-05-21 20:48:50.015621',2),(78,'ㅎㅇ',_binary '\0',7,'2025-05-21 20:48:53.021042',2),(79,'ㅎㅇ',_binary '\0',3,'2025-05-21 20:48:56.406892',2),(80,'ㅎㅇ',_binary '\0',7,'2025-05-21 20:48:58.983959',2),(81,'나는 허준수임',_binary '\0',3,'2025-05-21 21:08:33.200179',2),(82,'허준수임',_binary '\0',3,'2025-05-21 21:08:36.719918',2),(83,'ㅎㅇ',_binary '\0',3,'2025-05-21 21:10:55.753271',2),(84,'ㅎㅇ',_binary '\0',7,'2025-05-21 21:10:58.431538',2),(85,'ㅎㅇ',_binary '\0',3,'2025-05-21 21:11:28.996240',2),(86,'ㅎㅇ',_binary '\0',7,'2025-05-21 21:12:16.579842',2),(87,'ㅎㅇ',_binary '\0',3,'2025-05-21 21:12:22.040659',2),(88,'ㅎㅇ',_binary '\0',3,'2025-05-21 21:12:26.127020',2),(89,'ㅌㅅㅌ',_binary '\0',3,'2025-05-21 21:12:35.539155',2),(90,'ㅌㅅㅌ',_binary '\0',7,'2025-05-21 21:12:59.108169',2);
/*!40000 ALTER TABLE `chat_message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chat_room`
--

DROP TABLE IF EXISTS `chat_room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chat_room` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `owner_id` bigint NOT NULL,
  `post_id` bigint NOT NULL,
  `renter_id` bigint NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat_room`
--

LOCK TABLES `chat_room` WRITE;
/*!40000 ALTER TABLE `chat_room` DISABLE KEYS */;
INSERT INTO `chat_room` VALUES (1,'2025-05-21 15:53:47.282230',4,2,3),(2,'2025-05-21 20:48:21.245989',3,41,7);
/*!40000 ALTER TABLE `chat_room` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `deposit`
--

DROP TABLE IF EXISTS `deposit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `deposit` (
  `deposit_id` bigint NOT NULL AUTO_INCREMENT,
  `amount` int NOT NULL,
  `deducted_amount` int DEFAULT NULL,
  `held_at` datetime(6) NOT NULL,
  `rental_id` bigint NOT NULL,
  `returned_at` datetime(6) DEFAULT NULL,
  `status` enum('DEDUCTED','HELD','RETURNED') NOT NULL,
  `renter_account_id` bigint NOT NULL,
  PRIMARY KEY (`deposit_id`),
  KEY `FKercv5njjpi3an2hqkda87lenv` (`renter_account_id`),
  CONSTRAINT `FKercv5njjpi3an2hqkda87lenv` FOREIGN KEY (`renter_account_id`) REFERENCES `account` (`account_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `deposit`
--

LOCK TABLES `deposit` WRITE;
/*!40000 ALTER TABLE `deposit` DISABLE KEYS */;
INSERT INTO `deposit` VALUES (1,50000,NULL,'2025-05-21 16:52:46.689262',6,NULL,'HELD',1),(2,50000,0,'2025-05-21 17:32:26.049484',7,'2025-05-21 17:34:28.878423','RETURNED',1),(3,50000,NULL,'2025-05-21 17:58:25.694337',9,NULL,'HELD',1),(4,50000,NULL,'2025-05-21 19:51:40.970598',11,NULL,'HELD',7),(5,100000,NULL,'2025-05-21 20:30:38.475380',13,NULL,'HELD',1),(6,50000,NULL,'2025-05-21 20:34:25.632199',10,NULL,'HELD',7),(7,50000,NULL,'2025-05-21 20:36:38.298726',11,NULL,'HELD',7),(8,50000,NULL,'2025-05-21 21:01:06.289531',14,NULL,'HELD',7),(9,100000,NULL,'2025-05-21 21:16:05.378181',16,NULL,'HELD',1);
/*!40000 ALTER TABLE `deposit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `file_metadata`
--

DROP TABLE IF EXISTS `file_metadata`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `file_metadata` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `bucket_name` varchar(255) NOT NULL,
  `content_type` varchar(255) NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `file_name` varchar(255) NOT NULL,
  `file_size` bigint NOT NULL,
  `file_url` varchar(255) NOT NULL,
  `original_file_name` varchar(255) NOT NULL,
  `resource_id` varchar(255) NOT NULL,
  `resource_type` varchar(255) NOT NULL,
  `service_id` varchar(255) NOT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=314 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `file_metadata`
--

LOCK TABLES `file_metadata` WRITE;
/*!40000 ALTER TABLE `file_metadata` DISABLE KEYS */;
INSERT INTO `file_metadata` VALUES (1,'oneders','image/jpeg','2025-05-21 15:52:44.889525','posts/1/0b6b5344-5327-4f61-9c72-06b1c37698bc.jpg',3383555,'https://oneders.s3.ap-northeast-2.amazonaws.com/posts/1/0b6b5344-5327-4f61-9c72-06b1c37698bc.jpg','KakaoTalk_20250514_210603798.jpg','1','product_image','post','2025-05-21 15:52:44.889552'),(2,'oneders','image/png','2025-05-21 15:53:35.983259','posts/2/d1661798-dfcd-4615-8165-d1014d65bee2.png',299198,'https://oneders.s3.ap-northeast-2.amazonaws.com/posts/2/d1661798-dfcd-4615-8165-d1014d65bee2.png','스크린샷 2025-01-06 100318.png','2','product_image','post','2025-05-21 15:53:35.983281'),(3,'oneders','image/webp','2025-05-21 15:54:28.110444','posts/3/7c2ca53e-7301-4ac8-b85c-69b0d91eab4e.webp',162790,'https://oneders.s3.ap-northeast-2.amazonaws.com/posts/3/7c2ca53e-7301-4ac8-b85c-69b0d91eab4e.webp','프라다지갑.webp','3','product_image','post','2025-05-21 15:54:28.110495'),(4,'oneders','image/webp','2025-05-21 15:56:57.628894','posts/4/1ad675a9-4a75-401a-aa8b-a4379927482d.webp',162790,'https://oneders.s3.ap-northeast-2.amazonaws.com/posts/4/1ad675a9-4a75-401a-aa8b-a4379927482d.webp','프라다지갑.webp','4','product_image','post','2025-05-21 15:56:57.628910'),(5,'oneders','image/webp','2025-05-21 16:07:13.269341','posts/5/aa160592-de8f-4ad5-8fe5-060ed727e532.webp',101156,'https://oneders.s3.ap-northeast-2.amazonaws.com/posts/5/aa160592-de8f-4ad5-8fe5-060ed727e532.webp','나이키줌스피리돈.webp','5','product_image','post','2025-05-21 16:07:13.269365'),(6,'oneders','image/webp','2025-05-21 16:08:32.130209','posts/6/39855018-f95e-41cc-a61a-45b0ddc7f923.webp',92584,'https://oneders.s3.ap-northeast-2.amazonaws.com/posts/6/39855018-f95e-41cc-a61a-45b0ddc7f923.webp','레이지선데이모닝.webp','6','product_image','post','2025-05-21 16:08:32.130237'),(7,'oneders','image/webp','2025-05-21 16:09:08.116636','posts/7/bb69a794-8664-4dd1-968d-e7478f69525b.webp',59820,'https://oneders.s3.ap-northeast-2.amazonaws.com/posts/7/bb69a794-8664-4dd1-968d-e7478f69525b.webp','맥북프로16인치.webp','7','product_image','post','2025-05-21 16:09:08.116664'),(8,'oneders','image/webp','2025-05-21 16:10:24.038057','posts/8/bc5da9a8-522b-403a-b7ee-6ee3452c4faf.webp',42394,'https://oneders.s3.ap-northeast-2.amazonaws.com/posts/8/bc5da9a8-522b-403a-b7ee-6ee3452c4faf.webp','아이폰14.webp','8','product_image','post','2025-05-21 16:10:24.038074'),(9,'oneders','image/webp','2025-05-21 16:11:07.061050','posts/9/24751296-2967-46f5-a2fe-12432eb8cbe9.webp',69956,'https://oneders.s3.ap-northeast-2.amazonaws.com/posts/9/24751296-2967-46f5-a2fe-12432eb8cbe9.webp','아트박스무드등.webp','9','product_image','post','2025-05-21 16:11:07.061065'),(10,'oneders','image/webp','2025-05-21 16:13:59.139377','posts/10/f4f67583-188b-40d4-b665-6bc10e7e8fcb.webp',82498,'https://oneders.s3.ap-northeast-2.amazonaws.com/posts/10/f4f67583-188b-40d4-b665-6bc10e7e8fcb.webp','맥켈란글라스.webp','10','product_image','post','2025-05-21 16:13:59.139391'),(11,'oneders','image/webp','2025-05-21 16:14:57.762016','posts/11/ed00a236-f296-4edc-804c-03000eac089c.webp',94848,'https://oneders.s3.ap-northeast-2.amazonaws.com/posts/11/ed00a236-f296-4edc-804c-03000eac089c.webp','에르메스팔찌.webp','11','product_image','post','2025-05-21 16:14:57.762030'),(12,'oneders','image/webp','2025-05-21 16:18:07.096406','posts/12/6967080f-2222-4a28-8d52-eadedd60a14a.webp',214416,'https://oneders.s3.ap-northeast-2.amazonaws.com/posts/12/6967080f-2222-4a28-8d52-eadedd60a14a.webp','이솝핸드워시.webp','12','product_image','post','2025-05-21 16:18:07.096421'),(13,'oneders','image/webp','2025-05-21 16:32:17.686300','posts/13/068bb395-c5dd-4c18-90c6-8b0dfbc2c936.webp',57294,'https://oneders.s3.ap-northeast-2.amazonaws.com/posts/13/068bb395-c5dd-4c18-90c6-8b0dfbc2c936.webp','쿠쿠1인밥솥.webp','13','product_image','post','2025-05-21 16:32:17.686322'),(14,'oneders','image/jpeg','2025-05-21 16:32:52.882125','rentals/6/before/80a29e45-27b3-4276-b026-7f2818645690.jpg',65034,'https://oneders.s3.ap-northeast-2.amazonaws.com/rentals/6/before/80a29e45-27b3-4276-b026-7f2818645690.jpg','bebefore.jpg','image','rental-image','rental-service','2025-05-21 16:32:52.882138'),(15,'oneders','image/jpeg','2025-05-21 16:32:52.918368','rentals/6/before/1ca5059a-404d-4ba6-9f53-ff1831404b6b.jpg',65034,'https://oneders.s3.ap-northeast-2.amazonaws.com/rentals/6/before/1ca5059a-404d-4ba6-9f53-ff1831404b6b.jpg','bebefore.jpg','image','rental-image','rental-service','2025-05-21 16:32:52.918380'),(16,'oneders','image/jpeg','2025-05-21 16:32:52.970587','rentals/6/before/53912c24-ca33-4261-9789-5687008c3b4f.jpg',65034,'https://oneders.s3.ap-northeast-2.amazonaws.com/rentals/6/before/53912c24-ca33-4261-9789-5687008c3b4f.jpg','bebefore.jpg','image','rental-image','rental-service','2025-05-21 16:32:52.970599'),(17,'oneders','image/webp','2025-05-21 16:33:34.981430','posts/14/6353bd24-e17a-4c5b-adb0-021028affa5f.webp',493474,'https://oneders.s3.ap-northeast-2.amazonaws.com/posts/14/6353bd24-e17a-4c5b-adb0-021028affa5f.webp','캐논200d.webp','14','product_image','post','2025-05-21 16:33:34.981458'),(18,'oneders','image/webp','2025-05-21 16:35:07.069330','posts/15/cc23def7-b26d-4567-8ac5-5c2a6ced8007.webp',158560,'https://oneders.s3.ap-northeast-2.amazonaws.com/posts/15/cc23def7-b26d-4567-8ac5-5c2a6ced8007.webp','인형모음.webp','15','product_image','post','2025-05-21 16:35:07.069344'),(19,'oneders','image/webp','2025-05-21 16:36:48.998138','posts/16/ad2a13ac-3cb2-4e82-86b7-50b2f9028f8f.webp',105908,'https://oneders.s3.ap-northeast-2.amazonaws.com/posts/16/ad2a13ac-3cb2-4e82-86b7-50b2f9028f8f.webp','캔버스스니커즈.webp','16','product_image','post','2025-05-21 16:36:48.998150'),(20,'oneders','image/webp','2025-05-21 16:41:14.812766','posts/17/20924a67-16ce-4e66-a1b4-d216b86e6f92.webp',100026,'https://oneders.s3.ap-northeast-2.amazonaws.com/posts/17/20924a67-16ce-4e66-a1b4-d216b86e6f92.webp','매직스피드4.webp','17','product_image','post','2025-05-21 16:41:14.812779'),(21,'oneders','image/jpeg','2025-05-21 16:55:23.928575','rentals/6/after/5cf87b66-a517-417b-95d6-8274922b50fd.jpg',139926,'https://oneders.s3.ap-northeast-2.amazonaws.com/rentals/6/after/5cf87b66-a517-417b-95d6-8274922b50fd.jpg','KakaoTalk_20250514_210603798_01.jpg','image','rental-image','rental-service','2025-05-21 16:55:23.928598'),(22,'oneders','image/jpeg','2025-05-21 16:55:24.006912','rentals/6/after/c641a86b-4540-4dd9-881a-187289596ff6.jpg',139926,'https://oneders.s3.ap-northeast-2.amazonaws.com/rentals/6/after/c641a86b-4540-4dd9-881a-187289596ff6.jpg','KakaoTalk_20250514_210603798_01.jpg','image','rental-image','rental-service','2025-05-21 16:55:24.006927'),(23,'oneders','image/jpeg','2025-05-21 16:55:40.643826','rentals/6/after/ed4a4198-761e-40cd-9ea9-332320eeaeec.jpg',139926,'https://oneders.s3.ap-northeast-2.amazonaws.com/rentals/6/after/ed4a4198-761e-40cd-9ea9-332320eeaeec.jpg','KakaoTalk_20250514_210603798_01.jpg','image','rental-image','rental-service','2025-05-21 16:55:40.643841'),(24,'oneders','image/jpeg','2025-05-21 16:55:40.749547','rentals/6/after/cb628546-e679-4177-a80d-6d3ca0450b8c.jpg',139926,'https://oneders.s3.ap-northeast-2.amazonaws.com/rentals/6/after/cb628546-e679-4177-a80d-6d3ca0450b8c.jpg','KakaoTalk_20250514_210603798_01.jpg','image','rental-image','rental-service','2025-05-21 16:55:40.749561'),(25,'oneders','image/jpeg','2025-05-21 16:55:40.871103','rentals/6/after/ec6a62f3-00ea-4066-be3d-b0be657892a4.jpg',139926,'https://oneders.s3.ap-northeast-2.amazonaws.com/rentals/6/after/ec6a62f3-00ea-4066-be3d-b0be657892a4.jpg','KakaoTalk_20250514_210603798_01.jpg','image','rental-image','rental-service','2025-05-21 16:55:40.871116'),(26,'oneders','image/jpeg','2025-05-21 16:55:40.969846','rentals/6/after/0fa84d79-bc40-4604-a08e-13366e2b6722.jpg',139926,'https://oneders.s3.ap-northeast-2.amazonaws.com/rentals/6/after/0fa84d79-bc40-4604-a08e-13366e2b6722.jpg','KakaoTalk_20250514_210603798_01.jpg','image','rental-image','rental-service','2025-05-21 16:55:40.969881'),(31,'oneders','image/jpeg','2025-05-21 16:56:30.215097','rentals/6/after/3f262fdf-9286-4ad5-8d32-f4c0d1cb8693.jpg',139926,'https://oneders.s3.ap-northeast-2.amazonaws.com/rentals/6/after/3f262fdf-9286-4ad5-8d32-f4c0d1cb8693.jpg','KakaoTalk_20250514_210603798_01.jpg','image','rental-image','rental-service','2025-05-21 16:56:30.215111'),(34,'oneders','image/webp','2025-05-21 17:00:59.493531','posts/19/72ba414d-b59c-4c27-8161-09605f12da56.webp',190694,'https://oneders.s3.ap-northeast-2.amazonaws.com/posts/19/72ba414d-b59c-4c27-8161-09605f12da56.webp','16e35a85bd469fd9ecc0814fa8f9bb649c3dce18dfb733a6502a791b6044360c_0.webp','19','product_image','post','2025-05-21 17:00:59.493543'),(35,'oneders','image/webp','2025-05-21 17:00:59.496774','posts/20/45329c23-4afa-45db-85d6-09b995cbca20.webp',190694,'https://oneders.s3.ap-northeast-2.amazonaws.com/posts/20/45329c23-4afa-45db-85d6-09b995cbca20.webp','16e35a85bd469fd9ecc0814fa8f9bb649c3dce18dfb733a6502a791b6044360c_0.webp','20','product_image','post','2025-05-21 17:00:59.496784'),(36,'oneders','image/webp','2025-05-21 17:00:59.526976','posts/18/44c1f5d0-30bd-431b-ad94-4914b4d8cfa7.webp',190694,'https://oneders.s3.ap-northeast-2.amazonaws.com/posts/18/44c1f5d0-30bd-431b-ad94-4914b4d8cfa7.webp','16e35a85bd469fd9ecc0814fa8f9bb649c3dce18dfb733a6502a791b6044360c_0.webp','18','product_image','post','2025-05-21 17:00:59.526988'),(37,'oneders','image/webp','2025-05-21 17:00:59.801272','posts/21/0c1654f9-91a9-46c9-9c28-902bf2788d81.webp',109872,'https://oneders.s3.ap-northeast-2.amazonaws.com/posts/21/0c1654f9-91a9-46c9-9c28-902bf2788d81.webp','30d921a569bb895f7b4b5af06c42165b85f12e13a36f573469578817baafe74c_0.webp','21','product_image','post','2025-05-21 17:00:59.801284'),(39,'oneders','image/webp','2025-05-21 17:03:20.859469','posts/22/f5501363-3401-4256-9b6d-494851b1d443.webp',128582,'https://oneders.s3.ap-northeast-2.amazonaws.com/posts/22/f5501363-3401-4256-9b6d-494851b1d443.webp','17433055734690a140997d3af5f9e69c274b5efc14e379318336b561b8cc1fda083b4235a6b4c0.webp','22','product_image','post','2025-05-21 17:03:20.859482'),(40,'oneders','image/webp','2025-05-21 17:03:43.591991','posts/23/f079b42f-3810-4bef-9529-c3a08d5f8601.webp',69554,'https://oneders.s3.ap-northeast-2.amazonaws.com/posts/23/f079b42f-3810-4bef-9529-c3a08d5f8601.webp','1747798215591c20469d7dd429787583cf7a8bcdedf66c149055fc82776e2e12e7f221d5cf63e0.webp','23','product_image','post','2025-05-21 17:03:43.592002'),(41,'oneders','image/webp','2025-05-21 17:04:39.084676','posts/24/c97a6224-b858-43ba-975a-e39809fc40d6.webp',145514,'https://oneders.s3.ap-northeast-2.amazonaws.com/posts/24/c97a6224-b858-43ba-975a-e39809fc40d6.webp','17446959641227fc69bd2a7c44c66bff46c14c778ee57475d9a5653561e66e82ea7488bfa6f0e0.webp','24','product_image','post','2025-05-21 17:04:39.084695'),(42,'oneders','image/webp','2025-05-21 17:04:51.110533','posts/25/aa667f58-ca98-44ce-a17f-16f216fc1683.webp',167096,'https://oneders.s3.ap-northeast-2.amazonaws.com/posts/25/aa667f58-ca98-44ce-a17f-16f216fc1683.webp','17474505330746e564dfc4ebe1d8d2717aa95c8e8b0bad9d2ab7af394d00cd931620f827dfcf70.webp','25','product_image','post','2025-05-21 17:04:51.110550'),(43,'oneders','image/webp','2025-05-21 17:06:02.014724','posts/26/58f87843-472c-4e1d-b309-67fedb38933f.webp',126292,'https://oneders.s3.ap-northeast-2.amazonaws.com/posts/26/58f87843-472c-4e1d-b309-67fedb38933f.webp','174780881956194c563b24e2cf4e07df29acf44b29f7ad417bf11631c9936d077e52396ce76210.webp','26','product_image','post','2025-05-21 17:06:02.014735'),(44,'oneders','image/webp','2025-05-21 17:06:31.365428','posts/27/e8404e7d-184a-486e-a438-155cf6a599bb.webp',106038,'https://oneders.s3.ap-northeast-2.amazonaws.com/posts/27/e8404e7d-184a-486e-a438-155cf6a599bb.webp','174503879381159ea98d8a3747148fd137cd8bd5245db2c798d99d25a6342e4fd76c34eb2a2c50.webp','27','product_image','post','2025-05-21 17:06:31.365447'),(45,'oneders','image/webp','2025-05-21 17:07:25.583067','posts/28/d0932ac1-b87a-45b9-b170-c840114f0749.webp',162186,'https://oneders.s3.ap-northeast-2.amazonaws.com/posts/28/d0932ac1-b87a-45b9-b170-c840114f0749.webp','bandw.webp','28','product_image','post','2025-05-21 17:07:25.583079'),(46,'oneders','image/webp','2025-05-21 17:07:52.339807','posts/29/5cf73ae9-a798-45ad-bc65-dceaffc877e2.webp',126112,'https://oneders.s3.ap-northeast-2.amazonaws.com/posts/29/5cf73ae9-a798-45ad-bc65-dceaffc877e2.webp','c0f5ec9b7b40a0ceb88ebb687d2a6e7dee1ff77b15429a098a6a4561560fc556_0.webp','29','product_image','post','2025-05-21 17:07:52.339818'),(47,'oneders','image/webp','2025-05-21 17:08:57.119618','posts/30/b29dbc8b-8d14-4819-a21d-6a1dbfde2685.webp',110156,'https://oneders.s3.ap-northeast-2.amazonaws.com/posts/30/b29dbc8b-8d14-4819-a21d-6a1dbfde2685.webp','bf7bd4eae6e59a852fe6a279ea40a07aca0f75e0a24c2cd8e9752549917e2706_0.webp','30','product_image','post','2025-05-21 17:08:57.119633'),(48,'oneders','image/webp','2025-05-21 17:09:20.782446','posts/31/2a6781f3-451f-4767-b661-0d6500e85c62.webp',38636,'https://oneders.s3.ap-northeast-2.amazonaws.com/posts/31/2a6781f3-451f-4767-b661-0d6500e85c62.webp','174780894455294c563b24e2cf4e07df29acf44b29f7ad417bf11631c9936d077e52396ce76210.webp','31','product_image','post','2025-05-21 17:09:20.782456'),(49,'oneders','image/webp','2025-05-21 17:22:38.522466','posts/32/feb44fe9-cc8e-40cb-a581-54fe9a55bed7.webp',100534,'https://oneders.s3.ap-northeast-2.amazonaws.com/posts/32/feb44fe9-cc8e-40cb-a581-54fe9a55bed7.webp','65dea36bcd417f381463e5c931286598067864b47dca4bacd02ed9c306992013_0.webp','32','product_image','post','2025-05-21 17:22:38.522483'),(50,'oneders','image/webp','2025-05-21 17:23:26.828688','posts/33/299573ac-a402-4497-b15d-4363194635d7.webp',88640,'https://oneders.s3.ap-northeast-2.amazonaws.com/posts/33/299573ac-a402-4497-b15d-4363194635d7.webp','108b93e9b619cb20739205c096ccb516210b617f55972a4c5ca3e5c2da399018_0.webp','33','product_image','post','2025-05-21 17:23:26.828699'),(51,'oneders','image/webp','2025-05-21 17:24:04.655686','posts/34/8da865da-3dca-444d-b40e-4a7b137c6a25.webp',69324,'https://oneders.s3.ap-northeast-2.amazonaws.com/posts/34/8da865da-3dca-444d-b40e-4a7b137c6a25.webp','1747793280814ffb8f4f11a8fca39fd58242a1310772d4ca6282690301ccd79df84c11c43c4720.webp','34','product_image','post','2025-05-21 17:24:04.655696'),(52,'oneders','image/webp','2025-05-21 17:24:43.718178','posts/35/e9f7b434-55fc-446e-ad69-ac34fd98927d.webp',83352,'https://oneders.s3.ap-northeast-2.amazonaws.com/posts/35/e9f7b434-55fc-446e-ad69-ac34fd98927d.webp','1747802103026a40d3959e93e50a7393f1edf42c2c604f80470f3a4da1313a2e648af85c497200.webp','35','product_image','post','2025-05-21 17:24:43.718188'),(53,'oneders','image/webp','2025-05-21 17:25:30.014198','posts/36/0a6744da-29f9-4e5b-8fa9-c6d74b80b176.webp',156284,'https://oneders.s3.ap-northeast-2.amazonaws.com/posts/36/0a6744da-29f9-4e5b-8fa9-c6d74b80b176.webp','1747755811106d100d8b909709894542da5b9714624c7f764edc058e5c4f49fad52344e104da30.webp','36','product_image','post','2025-05-21 17:25:30.014214'),(54,'oneders','image/webp','2025-05-21 17:25:44.916142','posts/37/622851e3-d92a-43ab-a67f-6e43982b20eb.webp',90464,'https://oneders.s3.ap-northeast-2.amazonaws.com/posts/37/622851e3-d92a-43ab-a67f-6e43982b20eb.webp','d25bb159290c372b6c3b6f29f792bef4411703d61cb56a61177065be3f2a967b_0.webp','37','product_image','post','2025-05-21 17:25:44.916152'),(55,'oneders','image/jpeg','2025-05-21 17:32:10.211540','rentals/7/before/db456ad4-574f-41f6-8a20-7b868b3838e0.jpg',164921,'https://oneders.s3.ap-northeast-2.amazonaws.com/rentals/7/before/db456ad4-574f-41f6-8a20-7b868b3838e0.jpg','shoesbefore.jpg','image','rental-image','rental-service','2025-05-21 17:32:10.211562'),(56,'oneders','image/jpeg','2025-05-21 17:32:10.327938','rentals/7/before/6eb0942f-0cf9-4603-ba9b-017a5d10e32f.jpg',164921,'https://oneders.s3.ap-northeast-2.amazonaws.com/rentals/7/before/6eb0942f-0cf9-4603-ba9b-017a5d10e32f.jpg','shoesbefore.jpg','image','rental-image','rental-service','2025-05-21 17:32:10.327949'),(57,'oneders','image/jpeg','2025-05-21 17:33:09.152404','rentals/7/after/51c0d1f4-0228-42d1-a43c-3fa30a805d99.jpg',139926,'https://oneders.s3.ap-northeast-2.amazonaws.com/rentals/7/after/51c0d1f4-0228-42d1-a43c-3fa30a805d99.jpg','shoesafter.jpg','image','rental-image','rental-service','2025-05-21 17:33:09.152414'),(58,'oneders','image/jpeg','2025-05-21 17:33:09.190867','rentals/7/after/bdfae20a-002d-4c65-b775-37e2dcbe6939.jpg',139926,'https://oneders.s3.ap-northeast-2.amazonaws.com/rentals/7/after/bdfae20a-002d-4c65-b775-37e2dcbe6939.jpg','shoesafter.jpg','image','rental-image','rental-service','2025-05-21 17:33:09.190876'),(59,'oneders','image/webp','2025-05-21 17:36:11.589909','posts/38/732e8164-3f05-4594-9cc1-f8a088ec041b.webp',128582,'https://oneders.s3.ap-northeast-2.amazonaws.com/posts/38/732e8164-3f05-4594-9cc1-f8a088ec041b.webp','17433055734690a140997d3af5f9e69c274b5efc14e379318336b561b8cc1fda083b4235a6b4c0.webp','38','product_image','post','2025-05-21 17:36:11.589919'),(60,'oneders','image/jpeg','2025-05-21 17:40:46.530167','rentals/9/before/142a1ebc-3a3b-4497-bc13-f24440743e56.jpg',139926,'https://oneders.s3.ap-northeast-2.amazonaws.com/rentals/9/before/142a1ebc-3a3b-4497-bc13-f24440743e56.jpg','shoesafter.jpg','image','rental-image','rental-service','2025-05-21 17:40:46.530182'),(61,'oneders','image/jpeg','2025-05-21 18:00:11.590258','rentals/10/before/bf0674f3-eabb-485b-a6e5-1529c30ebaba.jpg',67283,'https://oneders.s3.ap-northeast-2.amazonaws.com/rentals/10/before/bf0674f3-eabb-485b-a6e5-1529c30ebaba.jpg','KakaoTalk_20250514_210918796_02.jpg','image','rental-image','rental-service','2025-05-21 18:00:11.590281'),(62,'oneders','image/jpeg','2025-05-21 19:48:43.321096','rentals/11/before/96d198a1-0777-483c-86b0-fc79929d45a7.jpg',164921,'https://oneders.s3.ap-northeast-2.amazonaws.com/rentals/11/before/96d198a1-0777-483c-86b0-fc79929d45a7.jpg','shoesbefore.jpg','image','rental-image','rental-service','2025-05-21 19:48:43.321118'),(63,'oneders','image/jpeg','2025-05-21 19:48:43.418698','rentals/11/before/b2fbba5a-fd34-43b9-b683-0e334b214b15.jpg',164921,'https://oneders.s3.ap-northeast-2.amazonaws.com/rentals/11/before/b2fbba5a-fd34-43b9-b683-0e334b214b15.jpg','shoesbefore.jpg','image','rental-image','rental-service','2025-05-21 19:48:43.418711'),(64,'oneders','image/jpeg','2025-05-21 19:48:43.512231','rentals/11/before/855612ad-6b27-4ab9-b18a-55614982b3cf.jpg',164921,'https://oneders.s3.ap-northeast-2.amazonaws.com/rentals/11/before/855612ad-6b27-4ab9-b18a-55614982b3cf.jpg','shoesbefore.jpg','image','rental-image','rental-service','2025-05-21 19:48:43.512244'),(65,'oneders','image/jpeg','2025-05-21 20:19:58.025452','posts/39/32822ee8-6119-4cbf-ab5c-87a2c64dab2f.jpeg',108700,'https://oneders.s3.ap-northeast-2.amazonaws.com/posts/39/32822ee8-6119-4cbf-ab5c-87a2c64dab2f.jpeg','IMG_4669.jpeg','39','product_image','post','2025-05-21 20:19:58.025468'),(66,'oneders','image/jpeg','2025-05-21 20:22:29.030183','rentals/12/before/954ed603-a1db-4430-87a3-cffe672bb3e0.jpg',164921,'https://oneders.s3.ap-northeast-2.amazonaws.com/rentals/12/before/954ed603-a1db-4430-87a3-cffe672bb3e0.jpg','shoesbefore.jpg','image','rental-image','rental-service','2025-05-21 20:22:29.030198'),(67,'oneders','image/jpeg','2025-05-21 20:22:29.127846','rentals/12/before/15be77c8-0814-4094-a305-8899b443f840.jpg',164921,'https://oneders.s3.ap-northeast-2.amazonaws.com/rentals/12/before/15be77c8-0814-4094-a305-8899b443f840.jpg','shoesbefore.jpg','image','rental-image','rental-service','2025-05-21 20:22:29.127892'),(68,'oneders','image/jpeg','2025-05-21 20:22:29.200894','rentals/12/before/2dce3759-6ff6-4e50-8507-2512e7f1df3c.jpg',164921,'https://oneders.s3.ap-northeast-2.amazonaws.com/rentals/12/before/2dce3759-6ff6-4e50-8507-2512e7f1df3c.jpg','shoesbefore.jpg','image','rental-image','rental-service','2025-05-21 20:22:29.200906'),(69,'oneders','image/jpeg','2025-05-21 20:22:29.272584','rentals/12/before/f1e44273-990c-43eb-8bdb-a5eb700b6d43.jpg',164921,'https://oneders.s3.ap-northeast-2.amazonaws.com/rentals/12/before/f1e44273-990c-43eb-8bdb-a5eb700b6d43.jpg','shoesbefore.jpg','image','rental-image','rental-service','2025-05-21 20:22:29.272595'),(70,'oneders','image/jpeg','2025-05-21 20:22:29.365473','rentals/12/before/8333b59a-5e49-4134-b4f7-15ebb41ed4b6.jpg',164921,'https://oneders.s3.ap-northeast-2.amazonaws.com/rentals/12/before/8333b59a-5e49-4134-b4f7-15ebb41ed4b6.jpg','shoesbefore.jpg','image','rental-image','rental-service','2025-05-21 20:22:29.365488'),(71,'oneders','image/jpeg','2025-05-21 20:22:29.404665','rentals/12/before/5d0289ad-c483-4226-bc7d-dbaaf1815a05.jpg',164921,'https://oneders.s3.ap-northeast-2.amazonaws.com/rentals/12/before/5d0289ad-c483-4226-bc7d-dbaaf1815a05.jpg','shoesbefore.jpg','image','rental-image','rental-service','2025-05-21 20:22:29.404680'),(72,'oneders','image/jpeg','2025-05-21 20:22:29.492951','rentals/12/before/a1758db9-c27e-4cf2-b941-694ccdaa35fc.jpg',164921,'https://oneders.s3.ap-northeast-2.amazonaws.com/rentals/12/before/a1758db9-c27e-4cf2-b941-694ccdaa35fc.jpg','shoesbefore.jpg','image','rental-image','rental-service','2025-05-21 20:22:29.492963'),(73,'oneders','image/jpeg','2025-05-21 20:24:38.788139','posts/40/b6398a10-636c-4159-b3e9-a1cbb22ce219.jpeg',108700,'https://oneders.s3.ap-northeast-2.amazonaws.com/posts/40/b6398a10-636c-4159-b3e9-a1cbb22ce219.jpeg','IMG_4669.jpeg','40','product_image','post','2025-05-21 20:24:38.788159'),(74,'oneders','image/jpeg','2025-05-21 20:28:28.323836','rentals/13/before/a5507675-14d0-4841-96ed-9b2af84c1cd6.jpg',229216,'https://oneders.s3.ap-northeast-2.amazonaws.com/rentals/13/before/a5507675-14d0-4841-96ed-9b2af84c1cd6.jpg','image.jpg','image','rental-image','rental-service','2025-05-21 20:28:28.323873'),(75,'oneders','image/jpeg','2025-05-21 20:35:44.992598','rentals/13/after/b94ac4be-cec3-4ce2-8f0c-908facadf0d4.jpg',226803,'https://oneders.s3.ap-northeast-2.amazonaws.com/rentals/13/after/b94ac4be-cec3-4ce2-8f0c-908facadf0d4.jpg','image.jpg','image','rental-image','rental-service','2025-05-21 20:35:44.992614'),(76,'oneders','image/jpeg','2025-05-21 20:39:55.940829','rentals/11/after/a1b063d3-a4d5-4ee7-b00f-b3270da6cd61.jpg',139926,'https://oneders.s3.ap-northeast-2.amazonaws.com/rentals/11/after/a1b063d3-a4d5-4ee7-b00f-b3270da6cd61.jpg','shoesafter.jpg','image','rental-image','rental-service','2025-05-21 20:39:55.940891'),(77,'oneders','image/jpeg','2025-05-21 20:39:56.020535','rentals/11/after/2fe175c3-9a5c-4a2a-9f4f-cdec560a3720.jpg',139926,'https://oneders.s3.ap-northeast-2.amazonaws.com/rentals/11/after/2fe175c3-9a5c-4a2a-9f4f-cdec560a3720.jpg','shoesafter.jpg','image','rental-image','rental-service','2025-05-21 20:39:56.020546'),(78,'oneders','image/jpeg','2025-05-21 20:39:56.125603','rentals/11/after/f75d1417-57ae-4de7-bc61-1128b59f5ed4.jpg',139926,'https://oneders.s3.ap-northeast-2.amazonaws.com/rentals/11/after/f75d1417-57ae-4de7-bc61-1128b59f5ed4.jpg','shoesafter.jpg','image','rental-image','rental-service','2025-05-21 20:39:56.125613'),(79,'oneders','image/jpeg','2025-05-21 20:40:32.570505','rentals/11/after/8fa6f30f-92e4-46b9-b6fd-c1b439fb7484.jpg',139926,'https://oneders.s3.ap-northeast-2.amazonaws.com/rentals/11/after/8fa6f30f-92e4-46b9-b6fd-c1b439fb7484.jpg','shoesafter.jpg','image','rental-image','rental-service','2025-05-21 20:40:32.570516'),(80,'oneders','image/jpeg','2025-05-21 20:40:32.660017','rentals/11/after/df65eaf1-0d95-4a75-abfe-383df10b784d.jpg',139926,'https://oneders.s3.ap-northeast-2.amazonaws.com/rentals/11/after/df65eaf1-0d95-4a75-abfe-383df10b784d.jpg','shoesafter.jpg','image','rental-image','rental-service','2025-05-21 20:40:32.660028'),(81,'oneders','image/jpeg','2025-05-21 20:40:32.706399','rentals/11/after/276a1eb8-942a-4a84-a2e8-158f813ebc6a.jpg',139926,'https://oneders.s3.ap-northeast-2.amazonaws.com/rentals/11/after/276a1eb8-942a-4a84-a2e8-158f813ebc6a.jpg','shoesafter.jpg','image','rental-image','rental-service','2025-05-21 20:40:32.706409'),(82,'oneders','image/jpeg','2025-05-21 20:40:32.777455','rentals/11/after/e4523220-966e-4c2e-b27d-26da5bc43fd7.jpg',139926,'https://oneders.s3.ap-northeast-2.amazonaws.com/rentals/11/after/e4523220-966e-4c2e-b27d-26da5bc43fd7.jpg','shoesafter.jpg','image','rental-image','rental-service','2025-05-21 20:40:32.777464'),(85,'oneders','image/jpeg','2025-05-21 20:47:33.007655','posts/41/9127a809-d672-4104-b91b-ed027c4dc67a.jpg',3192148,'https://oneders.s3.ap-northeast-2.amazonaws.com/posts/41/9127a809-d672-4104-b91b-ed027c4dc67a.jpg','20250521_204618.jpg','41','product_image','post','2025-05-21 20:47:33.007670'),(289,'oneders','image/jpeg','2025-05-21 20:55:04.702699','rentals/14/before/a17fd4ed-4a26-4545-84ed-5f148147a91f.jpg',164921,'https://oneders.s3.ap-northeast-2.amazonaws.com/rentals/14/before/a17fd4ed-4a26-4545-84ed-5f148147a91f.jpg','shoesbefore.jpg','image','rental-image','rental-service','2025-05-21 20:55:04.702716'),(290,'oneders','image/jpeg','2025-05-21 20:55:04.776677','rentals/14/before/f8bf9fb1-6683-432d-b4bc-882da477317e.jpg',164921,'https://oneders.s3.ap-northeast-2.amazonaws.com/rentals/14/before/f8bf9fb1-6683-432d-b4bc-882da477317e.jpg','shoesbefore.jpg','image','rental-image','rental-service','2025-05-21 20:55:04.776685'),(291,'oneders','image/jpeg','2025-05-21 20:55:04.874380','rentals/14/before/5b4b597b-d0ba-4299-8f08-04adb42f6b46.jpg',164921,'https://oneders.s3.ap-northeast-2.amazonaws.com/rentals/14/before/5b4b597b-d0ba-4299-8f08-04adb42f6b46.jpg','shoesbefore.jpg','image','rental-image','rental-service','2025-05-21 20:55:04.874388'),(292,'oneders','image/jpeg','2025-05-21 20:55:05.650660','rentals/14/before/2a276182-6415-454f-ad25-258faa711c83.jpg',164921,'https://oneders.s3.ap-northeast-2.amazonaws.com/rentals/14/before/2a276182-6415-454f-ad25-258faa711c83.jpg','shoesbefore.jpg','image','rental-image','rental-service','2025-05-21 20:55:05.650668'),(293,'oneders','image/jpeg','2025-05-21 20:55:05.727040','rentals/14/before/7bb5bd16-78b1-43fb-8700-54d573f4a54f.jpg',164921,'https://oneders.s3.ap-northeast-2.amazonaws.com/rentals/14/before/7bb5bd16-78b1-43fb-8700-54d573f4a54f.jpg','shoesbefore.jpg','image','rental-image','rental-service','2025-05-21 20:55:05.727048'),(294,'oneders','image/jpeg','2025-05-21 20:55:05.793572','rentals/14/before/cc33fe0c-9dac-4d77-8580-087fafaf1482.jpg',164921,'https://oneders.s3.ap-northeast-2.amazonaws.com/rentals/14/before/cc33fe0c-9dac-4d77-8580-087fafaf1482.jpg','shoesbefore.jpg','image','rental-image','rental-service','2025-05-21 20:55:05.793580'),(295,'oneders','image/jpeg','2025-05-21 20:55:05.804137','rentals/14/before/615c023b-c489-4e2a-a6db-6a88380056d7.jpg',164921,'https://oneders.s3.ap-northeast-2.amazonaws.com/rentals/14/before/615c023b-c489-4e2a-a6db-6a88380056d7.jpg','shoesbefore.jpg','image','rental-image','rental-service','2025-05-21 20:55:05.804145'),(296,'oneders','image/jpeg','2025-05-21 20:55:05.847988','rentals/14/before/f262c6cf-f6b8-4d59-8ecb-bdfdb07745e9.jpg',164921,'https://oneders.s3.ap-northeast-2.amazonaws.com/rentals/14/before/f262c6cf-f6b8-4d59-8ecb-bdfdb07745e9.jpg','shoesbefore.jpg','image','rental-image','rental-service','2025-05-21 20:55:05.847996'),(297,'oneders','image/jpeg','2025-05-21 20:55:05.878757','rentals/14/before/33084407-5c78-4880-8d3f-2f34deedb053.jpg',164921,'https://oneders.s3.ap-northeast-2.amazonaws.com/rentals/14/before/33084407-5c78-4880-8d3f-2f34deedb053.jpg','shoesbefore.jpg','image','rental-image','rental-service','2025-05-21 20:55:05.878765'),(298,'oneders','image/jpeg','2025-05-21 20:55:05.918768','rentals/14/before/9c00aaaf-6c6b-410f-ba9b-e85245240840.jpg',164921,'https://oneders.s3.ap-northeast-2.amazonaws.com/rentals/14/before/9c00aaaf-6c6b-410f-ba9b-e85245240840.jpg','shoesbefore.jpg','image','rental-image','rental-service','2025-05-21 20:55:05.918777'),(299,'oneders','image/jpeg','2025-05-21 20:55:05.959978','rentals/14/before/870b286b-ce46-4ca3-b180-72999bf60af1.jpg',164921,'https://oneders.s3.ap-northeast-2.amazonaws.com/rentals/14/before/870b286b-ce46-4ca3-b180-72999bf60af1.jpg','shoesbefore.jpg','image','rental-image','rental-service','2025-05-21 20:55:05.959987'),(300,'oneders','image/jpeg','2025-05-21 20:55:05.979488','rentals/14/before/dbbc9a67-b31b-4ea1-8d1a-83fd95256b90.jpg',164921,'https://oneders.s3.ap-northeast-2.amazonaws.com/rentals/14/before/dbbc9a67-b31b-4ea1-8d1a-83fd95256b90.jpg','shoesbefore.jpg','image','rental-image','rental-service','2025-05-21 20:55:05.979496'),(301,'oneders','image/jpeg','2025-05-21 20:55:06.069651','rentals/14/before/d763e5a2-ab31-4f8c-b40e-fbe349f37a3c.jpg',164921,'https://oneders.s3.ap-northeast-2.amazonaws.com/rentals/14/before/d763e5a2-ab31-4f8c-b40e-fbe349f37a3c.jpg','shoesbefore.jpg','image','rental-image','rental-service','2025-05-21 20:55:06.069659'),(302,'oneders','image/jpeg','2025-05-21 20:55:06.088091','rentals/14/before/d7c24d0c-7f82-427a-8018-da38bbdab75b.jpg',164921,'https://oneders.s3.ap-northeast-2.amazonaws.com/rentals/14/before/d7c24d0c-7f82-427a-8018-da38bbdab75b.jpg','shoesbefore.jpg','image','rental-image','rental-service','2025-05-21 20:55:06.088097'),(303,'oneders','image/jpeg','2025-05-21 20:55:06.211471','rentals/14/before/14c41dc3-02d3-4673-b541-4f1167c1ab29.jpg',164921,'https://oneders.s3.ap-northeast-2.amazonaws.com/rentals/14/before/14c41dc3-02d3-4673-b541-4f1167c1ab29.jpg','shoesbefore.jpg','image','rental-image','rental-service','2025-05-21 20:55:06.211480'),(310,'oneders','image/jpeg','2025-05-21 20:59:53.654719','posts/42/3ac5993e-e857-4e0d-a9b0-4f1c15526aeb.jpg',3106912,'https://oneders.s3.ap-northeast-2.amazonaws.com/posts/42/3ac5993e-e857-4e0d-a9b0-4f1c15526aeb.jpg','KakaoTalk_20250514_210918796 (1).jpg','42','product_image','post','2025-05-21 20:59:53.654736'),(311,'oneders','image/webp','2025-05-21 21:09:25.764897','posts/43/013543b5-5bb8-4ac9-949d-e2666ddaad5d.webp',14554,'https://oneders.s3.ap-northeast-2.amazonaws.com/posts/43/013543b5-5bb8-4ac9-949d-e2666ddaad5d.webp','300094668_1_1731479792_w360.jpg.webp','43','product_image','post','2025-05-21 21:09:25.764929'),(312,'oneders','image/webp','2025-05-21 21:10:37.478043','posts/44/eb47822f-dbde-4f76-b5ed-edc97360675c.webp',14554,'https://oneders.s3.ap-northeast-2.amazonaws.com/posts/44/eb47822f-dbde-4f76-b5ed-edc97360675c.webp','300094668_1_1731479792_w360.jpg.webp','44','product_image','post','2025-05-21 21:10:37.478050'),(313,'oneders','image/jpeg','2025-05-21 21:14:37.628205','rentals/16/before/2f392634-af1d-4264-92d2-704ba7192ae3.webp',33439,'https://oneders.s3.ap-northeast-2.amazonaws.com/rentals/16/before/2f392634-af1d-4264-92d2-704ba7192ae3.webp','300094668_1_1731479792_w360.jpg.webp','image','rental-image','rental-service','2025-05-21 21:14:37.628214');
/*!40000 ALTER TABLE `file_metadata` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `member`
--

DROP TABLE IF EXISTS `member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member` (
  `member_id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `auth_provider` varchar(255) DEFAULT NULL,
  `birth` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `gender` enum('FEMALE','MALE') DEFAULT NULL,
  `nickname` varchar(255) NOT NULL,
  `profile_image_url` varchar(255) DEFAULT NULL,
  `secure_password` varchar(6) DEFAULT NULL,
  `user_key` varchar(36) DEFAULT NULL,
  `uuid` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`member_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member`
--

LOCK TABLES `member` WRITE;
/*!40000 ALTER TABLE `member` DISABLE KEYS */;
INSERT INTO `member` VALUES (1,'2025-05-21 15:50:30.033664',NULL,'Kakao',NULL,'chlwodlrzzang@gmail.com',NULL,'최재익','http://img1.kakaocdn.net/thumb/R640x640.q70/?fname=http://t1.kakaocdn.net/account_images/default_profile.jpeg',NULL,'cc10275c-ade7-4d62-8de0-e7eb888c1083','cdc3b147-1dc5-418b-a6e1-3734aafa5e9c'),(2,'2025-05-21 15:51:26.306948',NULL,'Kakao',NULL,'dlaekgml222@naver.com',NULL,'임다희','http://k.kakaocdn.net/dn/P6Cv5/btsN1z7GZbW/UDjwA4vHibpVolkhPk5yTK/img_640x640.jpg',NULL,'f7911ea3-da09-4239-8eb5-429f6c53a8bf','0ff275d9-8dcf-43fb-9552-995176ead719'),(3,'2025-05-21 15:51:34.166567',NULL,'Kakao',NULL,'gjwnstn515@naver.com',NULL,'허준수','http://k.kakaocdn.net/dn/cYChml/btsJDnLjgwn/vgtqJxNZvcwoKzzBC9CfT0/img_640x640.jpg',NULL,'9c6d2877-4b92-47d2-a49a-1975d069d23f','7eee4f6c-9a50-481b-ba23-8ae6b27fe46f'),(4,'2025-05-21 15:52:33.677039',NULL,'Kakao',NULL,'minmin4729@gmail.com',NULL,':D','http://k.kakaocdn.net/dn/bDNpPH/btsMjI7hX6T/nZJQHvyeNalujOt2JvGC8k/img_640x640.jpg',NULL,'ba181d03-eb2d-481d-a38a-f1f048f4cd59','8678c24e-c1fc-42ee-8b7c-3bdac76d007b'),(5,'2025-05-21 16:59:43.219702',NULL,'Kakao',NULL,'shameless8@kakao.com',NULL,'재익','http://img1.kakaocdn.net/thumb/R640x640.q70/?fname=http://t1.kakaocdn.net/account_images/default_profile.jpeg',NULL,'a32ebbcf-b3d6-4b53-b2f2-b21353067989','4ece198a-18eb-4ec3-ab23-9428bdb55e9f'),(6,'2025-05-21 18:59:08.823141',NULL,'Kakao',NULL,'kimwc1123@naver.com',NULL,'김원찬','http://k.kakaocdn.net/dn/yZ2uk/btsuk0P5ENE/3mWD6KsX6hRllJsKKufH1k/img_640x640.jpg',NULL,'2e40100f-61ae-427b-9d7c-af2c5dd7e8ce','d72bb114-967d-43ac-b862-99c23ae1842b'),(7,'2025-05-21 20:00:50.822667',NULL,'Kakao',NULL,'dksekwjd123@naver.com',NULL,'안다정','http://k.kakaocdn.net/dn/AvYmJ/btsI2JmUTfl/kS35sa19OyauKHNHgxnaUK/img_640x640.jpg',NULL,'aebd2f7f-397b-4c6e-adf8-21fb800feda1','e48bb24d-ccb1-4031-a049-df1b91fff564');
/*!40000 ALTER TABLE `member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post` (
  `post_id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `author_id` bigint DEFAULT NULL,
  `category` enum('BABY_BOOK','BABY_CHILDREN','BEAUTY','BOOK','DIGITAL_DEVICE','ETC_USED_GOODS','FURNITURE_INTERIOR','HEALTH_SUPPLEMENT','HOBBY_GAMES_MUSIC','HOME_APPLIANCE','LIVING_KITCHEN','MEN_FASHION_ACCESSORIES','PET_SUPPLIES','PLANT','PROCESSED_FOOD','SPORTS_LEISURE','TICKET_VOUCHER','WOMEN_ACCESSORIES','WOMEN_CLOTHING') DEFAULT NULL,
  `content` varchar(1000) DEFAULT NULL,
  `deposit` bigint DEFAULT NULL,
  `latitude` double DEFAULT NULL,
  `longitude` double DEFAULT NULL,
  `rental_fee` bigint DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`post_id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (1,'2025-05-21 15:52:44.547131','',2,'MEN_FASHION_ACCESSORIES','거의 새 제품인 컨버스 척 70 하이 블랙입니다.\n실내에서 1-2회 시착 후 보관만 했습니다.\n신발끈, 아웃솔, 바디 모두 깨끗하고 오염, 닳음 없습니다.\n척 70 특유의 클래식한 디자인과 푹신한 착용감이 좋습니다.\n새 신발 구매하시려던 분께 좋은 기회입니다.',50000,37.517236,127.047325,2000,'컨버스 척 70 하이 블랙 (거의 새제품)'),(2,'2025-05-21 15:53:35.482462','',4,'DIGITAL_DEVICE','깔끔한 디자인의 삼성 노트북 또는 대형 태블릿입니다. 사진과 같이 전체적으로 사용감 적고 양호한 상태입니다. 상단 좌측에 재고 관리용 스티커(68)가 부착되어 있습니다. 사무, 학습, 영상 시청 등 다양하게 활용하기 좋습니다. 직거래 선호합니다. 궁금하신 점은 채팅으로 문의주세요.',5000,37.517236,127.047325,20000,'깨끗한 삼성 노트북/태블릿'),(3,'2025-05-21 15:54:27.936467','',NULL,'WOMEN_ACCESSORIES','프라다 정품 사피아노 카드지갑 판매합니다.\n깔끔한 블랙 컬러에 프라다의 시그니처인 골드 삼각 로고가 고급스러운 디자인입니다.\n카드 수납하기 매우 편리하며, 슬림한 두께로 휴대성이 좋습니다.\n구매 시 제공된 정품 박스와 보증서 카드까지 모두 함께 드립니다.\n사용감이 거의 없어 거의 새 제품에 가까운 좋은 컨디션입니다.\n중고 거래 특성상 교환 및 반품은 불가하오니 신중하게 구매 부탁드립니다.\n비대면 거래를 선호하며, 선입금 확인 후 상세 주소를 알려드립니다.',20000,37.517236,127.047325,10000,'프라다 사피아노 카드지갑 (정품 박스/보증서 포함)'),(4,'2025-05-21 15:56:57.514179','',1,'WOMEN_ACCESSORIES','프라다 사피아노 카드지갑 블랙 색상 판매합니다.\n실사용감 있지만 전체적으로 깨끗하게 사용했습니다.\n사진 보시고 모서리 등 생활기스, 사용감 확인 부탁드려요.\n프라다 박스와 정품 보증서 카드 모두 포함입니다.\n가볍고 편리해서 데일리 카드지갑으로 추천합니다.\n직거래 가능합니다.',20000,37.517236,127.047325,10000,'프라다 사피아노 카드지갑 블랙 (정품 보증서 포함)'),(5,'2025-05-21 16:07:13.012916','',1,'MEN_FASHION_ACCESSORIES','한 번도 착용하지 않은 나이키 새 운동화입니다. 신발 택 그대로 달려있고, 정품 박스도 함께 드립니다. 깔끔한 그레이 메쉬 소재에 강렬한 레드 스우시가 포인트되어 데일리룩에 매치하기 좋습니다. 실물이 훨씬 예쁩니다. 구매하실 분께 사이즈와 상세 사진 알려드립니다. 직거래 및 택배 거래 모두 가능합니다.',20000,37.517236,127.047325,10000,'나이키 줌 스피리돈 판매합니다'),(6,'2025-05-21 16:08:32.056215','',1,'BEAUTY','메종 마르지엘라 레플리카 \'레이지 선데이 모닝\' 향수 판매합니다.\n\'막 샤워하고 나온 깨끗한 살냄새와 침대 시트 향\'으로 유명한 인기 향수입니다.\n사진에서 보시다시피 잔량 넉넉히 남아있어 사용하시기 좋습니다. (정확한 잔량은 사진 확인해주세요.)\n사용감 적고 상태 양호합니다.\n향수 특성상 중고거래 교환/환불은 어렵습니다.',10000,37.517236,127.047325,10000,'메종 마르지엘라 레플리카 레이지 선데이 모닝 '),(7,'2025-05-21 16:09:08.000698','',1,'DIGITAL_DEVICE','상태 좋은 스페이스 그레이 맥북 판매합니다.\n깔끔하게 사용했고, 큰 찍힘이나 긁힘 없이 양호합니다.\n하단에 노트북 거치대/받침대가 부착되어 있습니다.\n정확한 모델명과 사양은 채팅으로 문의주세요.\n중고 특성상 반품 불가합니다.',200000,37.517236,127.047325,80000,'상태 좋은 스페이스 그레이 맥북 판매합니다'),(8,'2025-05-21 16:10:23.970154','',1,'DIGITAL_DEVICE','아이폰 13 스타라이트 색상 판매합니다.\n사진에서 보시다시피 깨끗하게 사용해서 거의 새 제품과 같아요.\n액정 및 후면, 카메라 모두 생활 기스 없이 깨끗합니다.\n기능상 아무 문제 없고 배터리 성능도 양호합니다.\n구성품은 단품이며, 새 폰 구매로 인해 판매하게 되었습니다.\n네고는 어렵고, 중고 거래 특성상 반품/환불은 불가합니다.\n직거래 선호합니다.',100000,37.517236,127.047325,70000,'아이폰 13 스타라이트 색상 거의 새 제품'),(9,'2025-05-21 16:11:06.955637','',1,'FURNITURE_INTERIOR','화이트 수국 조화가 들어있는 유리돔 무드등입니다. 따뜻한 LED 조명이 어우러져 침실이나 거실 등 인테리어 소품으로 활용하기 좋아요. 은은하고 예쁜 조명으로 어떤 공간에도 잘 어울립니다. 거의 새 제품으로 상태 매우 좋습니다. 작동 확인 완료되었습니다. 건전지로 작동되며, 선물용으로도 좋습니다.',10000,37.517236,127.047325,5000,'화이트 수국 조명 무드등'),(10,'2025-05-21 16:13:59.070534','',1,'LIVING_KITCHEN','거의 새 제품입니다. 맥캘란 정품 위스키 테이스팅 글라스입니다. 위스키의 풍부한 향과 맛을 최적으로 즐길 수 있도록 디자인된 글렌캐런 스타일 잔입니다. 깨지거나 금 간 곳 없이 매우 깨끗하며 사용감이 거의 없습니다. 위스키 애호가분들께 추천합니다.',5000,37.517236,127.047325,5000,'맥캘란 위스키 테이스팅 글라스'),(11,'2025-05-21 16:14:57.684277','',1,'WOMEN_ACCESSORIES','에르메스 핑크 가죽 팔찌 판매합니다.\n사진에서 보시다시피 컨디션 매우 좋습니다.\n콜리에 드 시앙 스타일의 고급스러운 디자인으로, 흔하지 않은 핑크 컬러입니다.\n가죽 까짐이나 금장 스터드 부분 기스, 변색 없이 깨끗하게 보관했습니다.\n선물 받은 후 실착용 횟수가 적어 거의 새 제품 상태입니다.\n정품 박스도 함께 드립니다.\n명품 특성상 교환 및 환불은 어려우니 신중한 구매 부탁드립니다.',300000,37.517236,127.047325,50000,'에르메스 핑크 가죽 팔찌'),(12,'2025-05-21 16:18:06.884444','',1,'BEAUTY','이솝 레저렉션 아로마틱 핸드워시 미개봉 새상품 판매합니다. 선물받았는데 기존에 사용하던 제품이 있어 내놓습니다. 만다린 껍질, 로즈마리 잎, 시더 아틀라스 향의 고급스러운 핸드워시로, 손을 부드럽고 깨끗하게 가꿔줍니다. 미개봉 상태로 포장 그대로 보내드리며, 선물용으로도 좋습니다. 직거래 선호하며, 택배 거래 시 배송비는 별도입니다.',50000,37.517236,127.047325,5000,'이솝 레저렉션 아로마틱 핸드워시 미개봉 새상품'),(13,'2025-05-21 16:32:17.465978','',1,'HOME_APPLIANCE','1-2인 가구에 적합한 쿠쿠 미니 밥솥입니다. 예약, 보온, 재가열 기능이 있어 편리합니다. 흰색 디자인으로 주방 어디에나 잘 어울립니다.\n\n전체적으로 깨끗하고 양호한 상태이며, 사용감 거의 없습니다.\n\n대여 기간은 최소 3일부터 최대 2주까지 가능합니다.\n대여료는 3일에 1만원, 일주일에 2만원입니다.\n보증금 3만원을 받고 있습니다.\n\n깨끗하게 사용 후 반납해주시면 보증금은 전액 환불해드립니다. 단기 거주나 손님 맞이용으로 좋습니다.\n비대면 거래 가능합니다.',10000,37.517236,127.047325,10000,'쿠쿠 미니 밥솥 단기 대여해드려요'),(14,'2025-05-21 16:33:34.841744','',1,'DIGITAL_DEVICE','캐논 EOS 200D DSLR 카메라 풀세트 대여합니다.\n초보자도 쉽게 사용할 수 있는 가볍고 컴팩트한 모델이며, Wi-Fi 기능이 있어 스마트폰으로 바로 사진 전송이 가능합니다.\n기본 렌즈, 카메라 가방, 충전기, 16GB SD카드 포함하여 바로 사용하실 수 있습니다.\n전체적으로 사용감이 적고 매우 깨끗한 상태이며, 렌즈와 본체 모두 양호합니다.\n일상 스냅, 여행, 유튜브 촬영 등 다양하게 활용하기 좋습니다.\n\n대여 기간은 최소 1일부터 최대 2주까지 가능합니다.\n일일 대여료는 2만원이며, 주말 (금-일) 3일 대여는 5만원입니다.\n보증금은 20만원입니다.\n대여 후 깨끗하게 사용하시고 반납해주시면 보증금 전액 환불해드립니다.\n\n신분증 확인이 필요하며, 예약은 최소 2일 전에 부탁드립니다.\n비대면 거래 가능하며, 선입금 확인 후 상세 주소 안내드립니다.',200000,37.517236,127.047325,20000,'캐논 EOS 200D DSLR 카메라 세트 대여해드려요'),(15,'2025-05-21 16:35:06.917827','',1,'BABY_CHILDREN','귀여운 헬로키티, 마이멜로디, 카카오프렌즈(라이언, 어피치) 등 인기 캐릭터 인형 세트입니다. 아이들 놀이용이나 방 꾸미기 인테리어 소품으로 활용하기 좋습니다. 모두 깨끗하게 관리되어 상태 양호하며 사용감 적습니다. 크기는 다양하며, 가장 큰 라이언 인형은 약 60cm 정도 됩니다.\n\n대여기간은 최소 3일부터 최대 2주까지 가능합니다. 3일 대여료는 1만원, 일주일은 2만원입니다. 보증금 3만원 받고 있습니다. 깨끗하게 사용하시고 반납해주시면 보증금 전액 환불해드립니다. 비대면 거래 가능합니다.',30000,37.517236,127.047325,10000,'인기 캐릭터 인형 세트 대여 가능합니다'),(16,'2025-05-21 16:36:48.894198','',1,'MEN_FASHION_ACCESSORIES','깨끗한 컨버스 척 70 로우 라이트 그레이 스니커즈 대여합니다.\n클래식한 디자인으로 어떤 룩에도 잘 어울리며 편하게 신기 좋습니다. 사이즈는 문의 시 알려드립니다.\n거의 새 제품이라 매우 깨끗하며 사용감 거의 없습니다. 자세한 상태는 사진으로 확인해주세요.\n\n대여기간은 최소 3일부터 최대 1주까지 가능합니다.\n대여료는 3일에 1만원, 일주일에 2만원입니다.\n보증금 3만원 받고 있어요. 깨끗하게 사용하시고 반납해주시면 보증금 전액 환불해드립니다.\n비대면 거래 가능하며 선입금 확인 후 상세 주소 안내해드립니다.',30000,37.517236,127.047325,10000,'컨버스 척 70 라이트 그레이 스니커즈 대여해드려요'),(17,'2025-05-21 16:41:14.739821','',1,'SPORTS_LEISURE','형광색 아식스 메타스피드 러닝화입니다.\n초경량 디자인과 FF Turbo 폼이 적용되어 마라톤이나 장거리 러닝에 최적화된 신발입니다.\n뛰어난 쿠셔닝과 반발력으로 기록 향상에 도움을 줍니다.\n거의 새 제품이며 사용감 없이 깨끗한 상태입니다.\n\n대여기간은 최소 3일부터 최대 1주일까지 가능합니다.\n대여료는 3일에 1만원, 1주일에 2만원입니다.\n보증금 3만원 받고 있어요.\n깨끗하게 사용 후 반납해주시면 보증금 전액 환불해드립니다.\n비대면 거래 가능하며, 선입금 확인 후 상세 주소 알려드립니다.',30000,37.517236,127.047325,10000,'아식스 메타스피드 러닝화 단기 대여해드려요'),(20,'2025-05-21 17:00:59.340160','',1,'LIVING_KITCHEN','예쁜 블루 플라워 패턴의 화이트 접시 2개 세트입니다. 식탁을 화사하게 만들어줄 거예요. 거의 새 제품이라 매우 깨끗하고 사용감 거의 없습니다. 일상 식사용은 물론 특별한 날 연출하기 좋습니다.\n\n대여 기간은 최소 3일부터 최대 일주일까지 가능합니다. 대여료는 3일에 7천원, 일주일에 1만원입니다. 보증금 2만원 받고 있습니다. 반납 시 파손이나 오염이 없으면 보증금 전액 환불해드립니다. 깨끗하게 사용해 주세요. 비대면 거래 가능합니다.',20000,37.517236,127.047325,7000,'블루 플라워 접시 2개 대여 가능합니다'),(21,'2025-05-21 17:00:59.761990','',5,'BABY_CHILDREN','깔끔한 유아용 소변기 대여합니다.\n아이들 배변 훈련에 도움을 주는 제품입니다.\n항균 기능이 있어 위생적으로 사용할 수 있습니다.\n거의 새 제품처럼 깨끗하게 관리되어 있습니다.\n대여 기간은 2주이며 대여료는 1만원입니다.\n보증금 2만원 받고 있어요.\n깨끗하게 사용하시고 반납해주시면 보증금 전액 환불해드립니다.\n비대면 거래 가능합니다.',20000,37.517236,127.047325,10000,'유아용 소변기 대여해드려요'),(22,'2025-05-21 17:03:20.787135','',1,'WOMEN_ACCESSORIES','특별한 날을 더욱 빛내줄 불가리 디바스 드림 귀걸이 대여해드립니다. 로즈 골드 소재에 은은한 빛깔의 자개(마더오브펄)와 작은 다이아몬드 장식이 어우러진 우아한 팬 모양 디자인입니다. 거의 새 제품이라 컨디션 최상입니다. 결혼식, 파티, 기념일 등 중요한 자리에 포인트 아이템으로 강력 추천합니다.\n\n대여기간은 최소 3일부터 최대 1주일까지 가능합니다.\n3일 대여료 5만원, 1주일 대여료 8만원입니다.\n보증금 20만원 있으며, 제품 반납 확인 후 전액 환불해드립니다.\n고가 제품인 만큼 신분증 확인이 필요하며, 깨끗하게 사용 후 반납 부탁드립니다.\n비대면 거래 가능하며, 선입금 후 상세 주소 안내드립니다.',200000,37.517236,127.047325,50000,'불가리 디바스 드림 귀걸이 특별한 날 대여해드려요'),(23,'2025-05-21 17:03:43.483203','',5,'SPORTS_LEISURE','이동식 REAL EMS 근육 자극기 한 쌍(좌/우) 대여해드립니다. 팔꿈치, 팔뚝, 손목, 손가락 등 다양한 부위에 사용할 수 있으며, 운동 후 근육 이완, 통증 완화, 근력 강화에 도움을 줍니다. 휴대하기 편리하고 사용법이 간단하여 언제 어디서든 활용하기 좋습니다. 거의 새 제품이라 매우 깨끗하며, 박스 및 구성품 모두 잘 보관되어 있습니다. 대여 기간은 최소 3일부터 최대 2주까지 가능합니다. 대여료는 3일에 1만원, 일주일에 2만원입니다. 보증금 3만원을 받고 있으며, 제품 반납 시 이상 없으면 전액 환불해드립니다. 비대면 거래 가능하며, 선입금 확인 후 상세 주소를 안내해드립니다. 사용 후 깨끗하게 반납 부탁드립니다.',30000,37.517236,127.047325,10000,'REAL EMS 근육 자극기 단기 대여해드려요'),(24,'2025-05-21 17:04:38.962607','',1,'MEN_FASHION_ACCESSORIES','나이키 에어맥스 95 네온 색상 신발 대여해드립니다. 에어맥스 라인업 중에서도 상징적인 디자인으로, 그레이와 블랙의 그라데이션 컬러에 강렬한 네온 옐로우 포인트가 매력적인 모델입니다.\n\n사진과 같이 박스에 보관되어 있으며, 거의 새 제품과 같은 최상급 상태를 유지하고 있습니다. 트렌디한 스트릿 패션에 포인트 주기 좋으며, 편안한 착용감으로 일상에서도 활용하기 좋습니다. 사이즈는 남성용 270mm입니다.\n\n대여기간은 최소 1일부터 최대 1주일까지 가능합니다. 일일 대여료는 1만원입니다. 보증금 5만원을 받고 있으며, 반납 시 오염이나 손상 없이 깨끗하게 사용해주시면 보증금 전액을 환불해드립니다.\n\n비대면 거래 가능하며, 선입금 확인 후 상세 주소를 알려드립니다.',50000,37.517236,127.047325,10000,'나이키 에어맥스 95 네온 컬러 단기 대여해드려요'),(25,'2025-05-21 17:04:50.944903','',5,'BABY_CHILDREN','잉글레시나 휴대용 유모차를 대여해드립니다.\n블랙 색상으로 깔끔하며, 아이와 외출 시 편리하게 사용하실 수 있습니다.\n여행이나 단기 사용, 혹은 구매 전 체험용으로 특히 추천드립니다.\n상태는 양호하며, 깨끗하게 관리되어 있습니다. 생활 사용감은 있을 수 있습니다.\n대여 기간은 최소 3일부터 최대 2주까지 가능합니다.\n대여료는 3일에 1만원, 일주일에 2만원입니다.\n보증금 5만원 받고 있으며, 반납 시 제품 상태 확인 후 전액 환불해드립니다.\n비대면 거래 가능합니다. 문의사항은 채팅으로 주세요.',50000,37.517236,127.047325,10000,'잉글레시나 휴대용 유모차 대여해드려요'),(26,'2025-05-21 17:06:01.943385','',5,'SPORTS_LEISURE','미즈노 골프 아이언 세트 대여해드립니다. 전체적으로 상태 양호하고 사용감 적은 편입니다. 새 클럽 구매 전 시타용이나 연습용, 라운딩용으로 좋습니다. 사진과 같이 사용에 따른 생활 스크래치 있으니 예민하신 분은 피해주세요. 구성은 이미지 확인 부탁드립니다.\n\n대여기간은 최소 3일부터 최대 2주까지 가능합니다.\n대여료는 3일에 3만원, 1주일에 5만원입니다.\n보증금은 10만원입니다. 깨끗하게 사용하시고 반납해주시면 보증금 전액 환불해드립니다.\n비대면 거래 가능합니다.',100000,37.517236,127.047325,30000,'미즈노 골프 아이언 세트 대여해드려요'),(27,'2025-05-21 17:06:31.298795','',1,'MEN_FASHION_ACCESSORIES','클래식하고 세련된 디자인의 롤렉스 데이토나 시계 대여해드립니다.\n블랙 다이얼과 스테인리스 스틸 브레이슬릿이 고급스러움을 더합니다.\n정품 박스와 보증서가 모두 포함되어 있으며, 거의 새것과 같은 최상급 상태를 유지하고 있습니다.\n각종 특별한 날이나 중요한 미팅에 멋스러움을 더해줄 아이템입니다.\n\n대여 기간 및 비용:\n*   1일 대여: 15만원\n*   3일 대여: 30만원\n*   1주일 대여: 50만원\n\n보증금은 200만원이며, 반납 시 제품 상태 확인 후 환불해드립니다.\n신분증 확인 및 대여 계약서 작성이 필요합니다.\n스크래치, 파손 등 제품 손상 발생 시 보증금에서 차감될 수 있습니다.\n고가의 제품이므로 직접 만나서 거래하는 것을 추천합니다.',2000000,37.517236,127.047325,150000,'롤렉스 데이토나 시계 대여해드려요'),(28,'2025-05-21 17:07:25.442154','',5,'DIGITAL_DEVICE','뱅앤올룹슨 BeoLab 4000 스피커 시스템 대여합니다.\n독특한 디자인과 뱅앤올룹슨 특유의 고품질 사운드를 경험해보세요. 스탠드 포함 구성이며, 고급스러운 알루미늄 마감으로 어떤 공간에도 잘 어울립니다.\n사진에서 보이는 것처럼 케이블이 다소 엉켜 있으나 스피커 본품은 상태 양호하며 작동에 이상 없습니다.\n음악 감상, 홈시어터 등 다양한 용도로 활용 가능합니다.\n\n대여기간은 최소 3일부터 최대 1주까지 가능합니다.\n대여료는 3일에 3만원, 1주에 5만원입니다.\n보증금은 20만원입니다.\n제품 파손이나 오염 시 보증금에서 차감될 수 있습니다. 깨끗하게 사용 후 반납해주시면 보증금 전액 환불해드립니다.\n비대면 거래 가능하며, 선입금 확인 후 상세 주소를 안내해드립니다.\n고가 제품이므로 신중하게 다뤄주세요.',200000,37.517236,127.047325,30000,'뱅앤올룹슨 스피커 시스템 대여해드려요'),(29,'2025-05-21 17:07:52.272135','',1,'SPORTS_LEISURE','고성능 전기 산악자전거(e-MTB) 대여해드립니다.\n험한 산악 지형이나 장거리 라이딩도 거뜬하게 즐길 수 있는 모델입니다.\n로발(Roval) 휠과 밤바(Bomber Z1) 포크 등 고급 부품이 장착되어 있습니다.\n프레임에 약간의 생활기스 외에는 전반적으로 상태가 매우 좋습니다.\n주말 레저 활동이나 산악 라이딩 경험에 완벽한 선택입니다.\n대여기간은 최소 1일(24시간)부터 가능하며, 주말 대여(금요일 저녁부터 일요일 저녁까지)도 가능합니다.\n일일 대여료는 5만원, 주말 대여료는 12만원입니다.\n보증금은 50만원이며, 제품 반납 시 확인 후 전액 환불해드립니다.\n신분증 확인이 필요하며, 사용 전 자전거 상태를 함께 확인합니다.\n안전 장비는 개인 지참하셔야 합니다.',500000,37.517236,127.047325,50000,'전기 산악자전거(e-MTB) 대여해드려요'),(30,'2025-05-21 17:08:56.995868','',1,'SPORTS_LEISURE','헬스장 필수템인 Concept2 로잉머신 대여합니다. 집에서 효율적으로 전신 유산소 운동을 하고 싶으신 분들께 추천합니다. 견고하고 안정적인 설계로 층간소음 걱정 없이 사용 가능합니다.\n\n제품 상태는 양호하며, 전체적으로 깨끗하게 관리되어 있습니다. 작동에 문제 전혀 없습니다.\n\n대여 기간은 최소 1주부터 최대 1개월까지 가능합니다.\n대여료는 1주 5만원, 1개월 15만원입니다.\n보증금은 30만원이며, 반납 시 제품 상태 확인 후 전액 환불해드립니다.\n신분증 확인 후 대여 가능하며, 파손 시 보증금에서 수리비가 차감될 수 있습니다.',300000,37.517236,127.047325,10000,'Concept2 로잉머신 대여해드려요'),(31,'2025-05-21 17:09:20.700846','',5,'SPORTS_LEISURE','테일러메이드 버너 슈퍼스틸 3번 우드입니다.\n비거리를 늘리거나 페어웨이 우드로 사용하기 좋은 제품입니다.\n사용감은 있지만 기능상 문제 없고 전체적으로 양호한 상태입니다.\n\n대여 기간은 최소 3일부터 최대 1주일까지 가능합니다.\n대여료는 3일에 1만원, 1주일은 2만원입니다.\n보증금은 30만원이며, 깨끗하게 사용 후 반납해주시면 보증금 전액 환불해드립니다.\n\n골프 입문자나 주말 라운딩에 필요한 분들께 추천합니다.',300000,37.517236,127.047325,10000,'테일러메이드 버너 슈퍼스틸 3번 우드 대여합니다'),(32,'2025-05-21 17:22:38.444205','',5,'HOME_APPLIANCE','귀뚜라미 이동형 에어컨 대여해드립니다. 별도의 설치 없이 전원만 연결하여 바로 사용 가능하며, 바퀴가 달려있어 이동이 편리합니다. 여름철 냉방 보조용이나 간이 공간 냉방에 유용합니다. 깔끔하게 사용되어 거의 새 제품과 같은 상태를 유지하고 있습니다. 대여 기간은 최소 3일부터 최대 2주까지 가능합니다. 대여료는 3일에 3만원, 1주일에 5만원이며 보증금은 10만원입니다. 사용 후 깨끗하게 반납해주시면 보증금 전액을 돌려드립니다. 비대면 거래 가능하며 선입금 확인 후 상세 주소 안내해드립니다.',100000,37.517236,127.047325,10000,'귀뚜라미 이동형 에어컨 대여해드립니다'),(33,'2025-05-21 17:23:26.733818','',1,'HOBBY_GAMES_MUSIC','초보자 및 연습용으로 좋은 어쿠스틱 기타 대여해드립니다.\n내추럴 우드 색상에 검은색 픽가드가 있어 디자인도 무난합니다.\n전체적으로 사용감은 있으나 기능상 문제없이 상태 양호합니다.\n소모품인 기타줄은 사용자에 따라 교체 필요할 수 있습니다.\n\n대여기간은 최소 3일부터 최대 2주까지 가능합니다.\n대여료는 3일에 15,000원, 일주일에 25,000원입니다.\n보증금 50,000원을 받고 있으며, 파손 없이 반납 시 전액 환불해드립니다.\n비대면 거래 가능하며, 선입금 확인 후 상세 주소 안내해드립니다.',50000,37.517236,127.047325,5000,'어쿠스틱 기타 대여해드려요'),(34,'2025-05-21 17:24:04.578142','',5,'LIVING_KITCHEN','VOTO 다기능 에어프라이어 오븐 대여해드립니다.\n에어프라이, 오븐, 토스터, 건조 등 다양한 요리가 가능한 제품입니다.\n디지털 패널로 온도와 시간 조절이 쉽고, 투명창으로 조리 과정을 확인할 수 있어 편리합니다.\n내부 청소 및 관리가 잘 되어 있어 깨끗하고 양호한 상태입니다.\n\n대여기간은 최소 3일부터 최대 1주까지 가능합니다.\n대여료는 3일에 15,000원, 1주에 25,000원입니다.\n보증금 50,000원 받고 있습니다.\n사용 후 깨끗하게 세척하여 반납해주시면 보증금 전액 환불해드립니다.\n직거래 또는 비대면 거래 가능하며, 선입금 후 상세 주소 안내해드립니다.',50000,37.517236,127.047325,5000,'VOTO 다기능 에어프라이어 오븐 대여 가능합니다'),(35,'2025-05-21 17:24:43.618838','',1,'DIGITAL_DEVICE','캐논 디지털 IXUS 400 카메라와 전용 충전기 세트 대여해드립니다.\n4.0 메가픽셀의 콤팩트한 디지털 카메라로, 빈티지한 사진 느낌을 좋아하시거나 가볍게 사용하실 분들께 추천합니다.\n카메라와 충전기 모두 양호한 상태이며, 사용감은 있지만 기능상 문제없이 작동합니다. 큰 찍힘이나 파손 없이 깨끗하게 관리되어 있습니다.\n\n대여 기간은 최소 3일부터 최대 1주일까지 가능합니다.\n대여료는 3일에 10,000원, 1주일에 20,000원입니다.\n보증금 50,000원 받고 있으며, 물품 반납 시 상태 확인 후 전액 환불해드립니다.\n파손이나 분실 시 보증금에서 차감되거나 추가 비용이 발생할 수 있습니다.\n비대면 거래 가능하며, 선입금 후 상세 주소 안내해드립니다.',50000,37.517236,127.047325,5000,'캐논 디지털 IXUS 400 카메라 대여해드려요'),(36,'2025-05-21 17:25:29.852366','',1,'HOBBY_GAMES_MUSIC','사믹 클래식 기타 대여합니다.\n초보자나 취미용으로 사용하기 좋은 기타입니다.\n부드러운 음색과 편안한 연주감을 제공합니다.\n기타 소프트 케이스(긱백) 포함해서 대여해드립니다.\n전반적으로 깨끗하고 양호한 상태이며, 사용감은 적습니다.\n대여기간은 최소 3일부터 최대 2주까지 가능합니다.\n대여료는 3일에 1만원, 일주일에 2만원입니다.\n보증금 5만원 받고 있으며, 반납 시 깨끗하게 사용 후 돌려주시면 보증금 전액 환불해드립니다.\n선입금 후 비대면 거래 가능합니다.',50000,37.517236,127.047325,20000,'사믹 클래식 기타 대여해드려요'),(37,'2025-05-21 17:25:44.819380','',5,'HOBBY_GAMES_MUSIC','커즈와일 SP6 88건반 디지털피아노 풀세트 대여합니다.\n피아노 본체, 전용 스탠드, 의자, 전용 가방, 전원 어댑터 모두 포함입니다.\n전체적으로 사용감이 거의 없고 매우 깨끗하며, 기능상 문제 전혀 없습니다.\n연습, 공연, 행사 등 다양한 용도로 활용 가능하며, 무게가 가벼워 이동이 편리합니다.\n\n대여기간은 최소 3일부터 최대 2주까지 가능합니다.\n대여료는 3일에 3만원, 일주일에 5만원입니다.\n보증금은 10만원입니다.\n깨끗하게 사용 후 반납해주시면 보증금 전액 환불해드립니다.\n직거래 가능하며, 선입금 확인 후 상세 주소 안내해드립니다.',100000,37.517236,127.047325,10000,'커즈와일 SP6 디지털피아노 풀세트 대여해드려요'),(38,'2025-05-21 17:36:11.378899','',1,'WOMEN_ACCESSORIES','고급스러운 불가리 디바스드림 로즈골드 마더 오브 펄 이어링을 특별한 날을 위해 대여해드립니다. 우아하고 독특한 디자인으로 어떤 의상에도 고급스러움을 더해줄 완벽한 아이템입니다. 정품 불가리 박스에 담아 드려요.\n\n거의 새 제품처럼 깨끗하게 관리되어 있으며, 육안으로 확인하기 어려운 미세한 생활기스 외에는 흠집이나 사용감이 거의 없습니다. 보관 상태 매우 양호합니다.\n\n대여기간은 최소 3일에서 최대 1주까지 가능합니다.\n대여료는 3일에 5만원, 1주에 10만원입니다.\n보증금 50만원 받고 있으며, 반납 시 제품 상태 확인 후 전액 환불해드립니다.\n\n대여 시 신분증 확인이 필수이며, 선입금 후 상세 주소를 안내드립니다. 비대면 거래 가능하며, 택배 거래 시 왕복 택배비는 대여자 부담입니다. 제품 파손 또는 분실 시 보증금 전액이 환수되니 소중하게 사용해 주세요.',500000,37.517236,127.047325,20000,'불가리 디바스드림 이어링 특별한 날 대여해드려요'),(39,'2025-05-21 20:19:57.945716','',NULL,'DIGITAL_DEVICE','맥북 프로 대여해드립니다.\n깔끔한 외관에 사용감 적은 제품입니다. 화면도 깨끗하고 키보드 및 트랙패드도 양호합니다.\n충전기 포함해서 대여해드립니다.\n사무 작업, 학업, 개인 프로젝트 등 다양한 용도로 사용하시기에 좋습니다.\n\n대여기간은 최소 1일부터 최대 2주까지 가능합니다.\n일일 대여료는 2만원이며, 보증금은 30만원입니다.\n신분증 확인이 필요하며, 비대면 거래도 가능합니다.\n깨끗하게 사용하시고 반납해주시면 보증금 전액 환불해드립니다.',50000,37.517236,127.047325,20000,'맥북 프로 단기 대여해드려요'),(40,'2025-05-21 20:24:38.720748','',1,'DIGITAL_DEVICE','최신 맥북 프로 14인치 (2023) 모델을 대여해드립니다. 애플 M3 Pro 칩과 18GB 메모리가 탑재되어 있어 고성능 작업도 문제없이 처리할 수 있습니다. 외관은 매우 깨끗하며, 모든 기능 정상 작동합니다. 충전기 포함하여 대여해드립니다. 단기 프로젝트, 출장, 혹은 급하게 맥북이 필요하신 분들께 최적의 선택입니다. 대여기간은 최소 1일부터 최대 2주까지 가능합니다. 일일 대여료는 2만원이며, 보증금은 50만원입니다. 대여 시 신분증 확인이 필요하며, 사용 후 깨끗하게 반납해주시면 보증금은 전액 환불됩니다. 비대면 거래도 가능합니다.',50000,37.517236,127.047325,50000,'맥북 프로 14인치 (2023) 단기 대여해드려요'),(41,'2025-05-21 20:47:32.854442','',3,'DIGITAL_DEVICE','로지텍 무선 마우스 대여합니다.\n작고 가벼워 노트북과 함께 사용하기 편리합니다.\n블랙 색상으로 심플하고 세련된 디자인입니다.\n사용감 적고 깨끗하게 관리되어 양호한 상태입니다.\n사무용이나 학습용으로 적합합니다.\n\n대여기간은 최소 1일부터 최대 2주까지 가능합니다.\n대여료는 1일에 3천원, 일주일에 1만원입니다.\n보증금 1만원 받고 있습니다.\n깨끗하게 사용하시고 반납해주시면 보증금 전액 환불해드립니다.\n비대면 거래 가능합니다.',30000,37.517236,127.047325,2000,'로지텍 무선 마우스 단기 대여해드려요'),(42,'2025-05-21 20:59:53.452531','',2,'PROCESSED_FOOD','포카리 스웨트 미개봉 캔입니다.\n사진이나 영상 촬영 소품, 또는 단기 이벤트용으로 잠시 필요하신 분께 대여해드립니다.\n캔 상태 매우 깨끗하며, 찌그러짐 없이 잘 보관되었습니다.\n대여 기간은 최소 1일이며, 협의를 통해 연장 가능합니다.\n1일 대여료는 1,000원이며, 보증금은 5,000원입니다.\n대여 후 미개봉 상태 그대로 반납해주시면 보증금 전액 환불해드립니다.\n음료 특성상 개봉 시 보증금은 환불되지 않습니다.\n거래는 직거래만 가능하며, 시간 및 장소는 협의 후 결정합니다.',50000,37.517236,127.047325,2000,'미개봉 포카리 스웨트 캔 대여해드려요'),(43,'2025-05-21 21:09:25.681344','',5,'DIGITAL_DEVICE','최신 고사양 맥북 프로를 단기로 대여해드립니다. 그래픽 작업, 영상 편집, 프로그래밍 등 고성능이 필요한 작업에 최적화된 기기입니다. 선명한 레티나 디스플레이와 함께 쾌적한 작업 환경을 제공합니다. 충전기 및 기본 소프트웨어(macOS, 오피스 프로그램)가 설치되어 있습니다.\n\n외관 및 기능 모두 거의 새 제품과 같은 최상의 상태를 유지하고 있습니다.\n\n대여기간은 최소 1일부터 최대 2주까지 가능합니다.\n일일 대여료는 2만원이며, 주말(금-일) 3일 대여는 5만원, 일주일 대여는 10만원입니다.\n보증금은 50만원입니다.\n대여 시 신분증 확인이 필요하며, 제품 반납 시 기기 상태 확인 후 보증금 전액 환불해드립니다.\n분실 및 파손 시에는 보증금에서 차감될 수 있습니다. 자세한 대여 조건은 문의주세요.',100000,37.517236,127.047325,50000,'고사양 맥북 프로 단기 대여해드려요'),(44,'2025-05-21 21:10:37.413321','',5,'DIGITAL_DEVICE','최신형 맥북 프로 고성능 노트북 대여해드립니다. 디자인 작업, 영상 편집, 프로그래밍 등 고사양 작업은 물론 일반적인 문서 작업이나 온라인 강의 수강 등 모든 용도에 최적화된 노트북입니다. 뛰어난 성능과 배터리 효율을 자랑합니다.\n\n사진에서 보시는 바와 같이 거의 새 제품과 다름없는 최상급 상태를 유지하고 있습니다. 외부 스크래치나 액정 손상 없이 깨끗하게 관리되었습니다.\n\n충전기 및 기본 케이블 포함하여 대여해드립니다.\n\n대여기간은 최소 3일부터 최대 2주까지 대여 가능합니다.\n대여료는 3일 9만원, 일주일 18만원입니다. 추가 기간은 협의 가능합니다.\n\n보증금은 50만원이며, 제품 반납 시 이상 없을 경우 전액 환불해드립니다.\n신분증 또는 학생증 확인이 필요합니다.\n\n고가의 장비이므로 깨끗하게 사용해주시고, 반납 전 개인 데이터는 반드시 삭제해주시기 바랍니다.\n자세한 대여 조건이나 예약 문의는 채팅으로 연락주세요.',50000,37.517236,127.047325,50000,'최신형 맥북 프로 고성능 노트북 대여해드려요');
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post_like_count`
--

DROP TABLE IF EXISTS `post_like_count`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post_like_count` (
  `post_id` bigint NOT NULL,
  `like_count` bigint DEFAULT NULL,
  PRIMARY KEY (`post_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post_like_count`
--

LOCK TABLES `post_like_count` WRITE;
/*!40000 ALTER TABLE `post_like_count` DISABLE KEYS */;
INSERT INTO `post_like_count` VALUES (7,1),(38,1);
/*!40000 ALTER TABLE `post_like_count` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post_likes`
--

DROP TABLE IF EXISTS `post_likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post_likes` (
  `post_like_id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `member_id` bigint DEFAULT NULL,
  `post_id` bigint DEFAULT NULL,
  PRIMARY KEY (`post_like_id`),
  UNIQUE KEY `uk_post_like_post_member` (`post_id`,`member_id`),
  CONSTRAINT `FKmxmoc9p5ndijnsqtvsjcuoxm3` FOREIGN KEY (`post_id`) REFERENCES `post` (`post_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post_likes`
--

LOCK TABLES `post_likes` WRITE;
/*!40000 ALTER TABLE `post_likes` DISABLE KEYS */;
INSERT INTO `post_likes` VALUES (1,'2025-05-21 16:09:23.609022',1,7),(2,'2025-05-21 18:52:13.596144',3,38);
/*!40000 ALTER TABLE `post_likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_image`
--

DROP TABLE IF EXISTS `product_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_image` (
  `image_id` bigint NOT NULL AUTO_INCREMENT,
  `file_path` varchar(255) NOT NULL,
  `post_id` bigint NOT NULL,
  PRIMARY KEY (`image_id`),
  KEY `FKs5hxjrppw14ec9ybnwy8i5htp` (`post_id`),
  CONSTRAINT `FKs5hxjrppw14ec9ybnwy8i5htp` FOREIGN KEY (`post_id`) REFERENCES `post` (`post_id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_image`
--

LOCK TABLES `product_image` WRITE;
/*!40000 ALTER TABLE `product_image` DISABLE KEYS */;
INSERT INTO `product_image` VALUES (1,'https://oneders.s3.ap-northeast-2.amazonaws.com/posts/1/0b6b5344-5327-4f61-9c72-06b1c37698bc.jpg',1),(2,'https://oneders.s3.ap-northeast-2.amazonaws.com/posts/2/d1661798-dfcd-4615-8165-d1014d65bee2.png',2),(3,'https://oneders.s3.ap-northeast-2.amazonaws.com/posts/3/7c2ca53e-7301-4ac8-b85c-69b0d91eab4e.webp',3),(4,'https://oneders.s3.ap-northeast-2.amazonaws.com/posts/4/1ad675a9-4a75-401a-aa8b-a4379927482d.webp',4),(5,'https://oneders.s3.ap-northeast-2.amazonaws.com/posts/5/aa160592-de8f-4ad5-8fe5-060ed727e532.webp',5),(6,'https://oneders.s3.ap-northeast-2.amazonaws.com/posts/6/39855018-f95e-41cc-a61a-45b0ddc7f923.webp',6),(7,'https://oneders.s3.ap-northeast-2.amazonaws.com/posts/7/bb69a794-8664-4dd1-968d-e7478f69525b.webp',7),(8,'https://oneders.s3.ap-northeast-2.amazonaws.com/posts/8/bc5da9a8-522b-403a-b7ee-6ee3452c4faf.webp',8),(9,'https://oneders.s3.ap-northeast-2.amazonaws.com/posts/9/24751296-2967-46f5-a2fe-12432eb8cbe9.webp',9),(10,'https://oneders.s3.ap-northeast-2.amazonaws.com/posts/10/f4f67583-188b-40d4-b665-6bc10e7e8fcb.webp',10),(11,'https://oneders.s3.ap-northeast-2.amazonaws.com/posts/11/ed00a236-f296-4edc-804c-03000eac089c.webp',11),(12,'https://oneders.s3.ap-northeast-2.amazonaws.com/posts/12/6967080f-2222-4a28-8d52-eadedd60a14a.webp',12),(13,'https://oneders.s3.ap-northeast-2.amazonaws.com/posts/13/068bb395-c5dd-4c18-90c6-8b0dfbc2c936.webp',13),(14,'https://oneders.s3.ap-northeast-2.amazonaws.com/posts/14/6353bd24-e17a-4c5b-adb0-021028affa5f.webp',14),(15,'https://oneders.s3.ap-northeast-2.amazonaws.com/posts/15/cc23def7-b26d-4567-8ac5-5c2a6ced8007.webp',15),(16,'https://oneders.s3.ap-northeast-2.amazonaws.com/posts/16/ad2a13ac-3cb2-4e82-86b7-50b2f9028f8f.webp',16),(17,'https://oneders.s3.ap-northeast-2.amazonaws.com/posts/17/20924a67-16ce-4e66-a1b4-d216b86e6f92.webp',17),(19,'https://oneders.s3.ap-northeast-2.amazonaws.com/posts/20/45329c23-4afa-45db-85d6-09b995cbca20.webp',20),(21,'https://oneders.s3.ap-northeast-2.amazonaws.com/posts/21/0c1654f9-91a9-46c9-9c28-902bf2788d81.webp',21),(22,'https://oneders.s3.ap-northeast-2.amazonaws.com/posts/22/f5501363-3401-4256-9b6d-494851b1d443.webp',22),(23,'https://oneders.s3.ap-northeast-2.amazonaws.com/posts/23/f079b42f-3810-4bef-9529-c3a08d5f8601.webp',23),(24,'https://oneders.s3.ap-northeast-2.amazonaws.com/posts/24/c97a6224-b858-43ba-975a-e39809fc40d6.webp',24),(25,'https://oneders.s3.ap-northeast-2.amazonaws.com/posts/25/aa667f58-ca98-44ce-a17f-16f216fc1683.webp',25),(26,'https://oneders.s3.ap-northeast-2.amazonaws.com/posts/26/58f87843-472c-4e1d-b309-67fedb38933f.webp',26),(27,'https://oneders.s3.ap-northeast-2.amazonaws.com/posts/27/e8404e7d-184a-486e-a438-155cf6a599bb.webp',27),(28,'https://oneders.s3.ap-northeast-2.amazonaws.com/posts/28/d0932ac1-b87a-45b9-b170-c840114f0749.webp',28),(29,'https://oneders.s3.ap-northeast-2.amazonaws.com/posts/29/5cf73ae9-a798-45ad-bc65-dceaffc877e2.webp',29),(30,'https://oneders.s3.ap-northeast-2.amazonaws.com/posts/30/b29dbc8b-8d14-4819-a21d-6a1dbfde2685.webp',30),(31,'https://oneders.s3.ap-northeast-2.amazonaws.com/posts/31/2a6781f3-451f-4767-b661-0d6500e85c62.webp',31),(32,'https://oneders.s3.ap-northeast-2.amazonaws.com/posts/32/feb44fe9-cc8e-40cb-a581-54fe9a55bed7.webp',32),(33,'https://oneders.s3.ap-northeast-2.amazonaws.com/posts/33/299573ac-a402-4497-b15d-4363194635d7.webp',33),(34,'https://oneders.s3.ap-northeast-2.amazonaws.com/posts/34/8da865da-3dca-444d-b40e-4a7b137c6a25.webp',34),(35,'https://oneders.s3.ap-northeast-2.amazonaws.com/posts/35/e9f7b434-55fc-446e-ad69-ac34fd98927d.webp',35),(36,'https://oneders.s3.ap-northeast-2.amazonaws.com/posts/36/0a6744da-29f9-4e5b-8fa9-c6d74b80b176.webp',36),(37,'https://oneders.s3.ap-northeast-2.amazonaws.com/posts/37/622851e3-d92a-43ab-a67f-6e43982b20eb.webp',37),(38,'https://oneders.s3.ap-northeast-2.amazonaws.com/posts/38/732e8164-3f05-4594-9cc1-f8a088ec041b.webp',38),(39,'https://oneders.s3.ap-northeast-2.amazonaws.com/posts/39/32822ee8-6119-4cbf-ab5c-87a2c64dab2f.jpeg',39),(40,'https://oneders.s3.ap-northeast-2.amazonaws.com/posts/40/b6398a10-636c-4159-b3e9-a1cbb22ce219.jpeg',40),(41,'https://oneders.s3.ap-northeast-2.amazonaws.com/posts/41/9127a809-d672-4104-b91b-ed027c4dc67a.jpg',41),(42,'https://oneders.s3.ap-northeast-2.amazonaws.com/posts/42/3ac5993e-e857-4e0d-a9b0-4f1c15526aeb.jpg',42),(43,'https://oneders.s3.ap-northeast-2.amazonaws.com/posts/43/013543b5-5bb8-4ac9-949d-e2666ddaad5d.webp',43),(44,'https://oneders.s3.ap-northeast-2.amazonaws.com/posts/44/eb47822f-dbde-4f76-b5ed-edc97360675c.webp',44);
/*!40000 ALTER TABLE `product_image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rental`
--

DROP TABLE IF EXISTS `rental`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rental` (
  `rental_id` bigint NOT NULL AUTO_INCREMENT,
  `account_no` varchar(30) NOT NULL,
  `bank_code` varchar(10) NOT NULL,
  `compared_analysis` text,
  `created_at` datetime(6) DEFAULT NULL,
  `damage_analysis` text,
  `deal_count` int DEFAULT NULL,
  `deposit_id` bigint DEFAULT NULL,
  `final_amount` decimal(38,2) DEFAULT NULL,
  `rental_process` enum('BEFORE_RENTAL','RENTAL_COMPLETED','RENTAL_IN_ACTIVE','RETURNED') NOT NULL,
  `rental_status` enum('BEFORE_AND_AFTER_COMPARED','BEFORE_PHOTO_ANALYZED','CANCELLED','CREATED','DEPOSIT_REQUESTED','REMITTANCE_COMPLETED','REMITTANCE_REQUESTED','RENTAL_COMPLETED','RENTAL_PERIOD_ENDED') NOT NULL,
  `reservation_id` bigint NOT NULL,
  PRIMARY KEY (`rental_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rental`
--

LOCK TABLES `rental` WRITE;
/*!40000 ALTER TABLE `rental` DISABLE KEYS */;
INSERT INTO `rental` VALUES (7,'9993961277116917','999','신발 전체적으로 사용으로 인한 오염과 손상이 광범위하게 발생했습니다.\n\n구체적으로는 양쪽 신발의 흰색 고무 밑창과 둘레, 그리고 밑창 옆면에 흙과 때로 인한 광범위한 오염, 심한 변색 및 긁힘이 나타납니다. 광택 있는 앞코 부분에도 흙 오염, 미세 스크래치, 심한 오염과 변색이 확인됩니다.\n\n또한, 바깥쪽 캔버스 원단 하단에는 마찰로 인한 흰색 마모 흔적과 오염이 있으며, 원래 크림색이었던 신발끈은 사용으로 인해 전반적으로 회색빛으로 변색되었습니다.','2025-05-21 17:30:31.437791','[{\"imageIndex\":0,\"result\":\"NO_DAMAGE_FOUND\",\"damages\":[]}]',1,2,2000.00,'RENTAL_COMPLETED','RENTAL_COMPLETED',9),(14,'9993961277116917','999',NULL,'2025-05-21 20:54:42.241650','[{\"imageIndex\":0,\"result\":\"NO_DAMAGE_FOUND\",\"damages\":[]}]',0,8,2000.00,'RETURNED','RENTAL_PERIOD_ENDED',15),(15,'9993961277116917','999',NULL,'2025-05-21 21:00:11.097345',NULL,0,NULL,4000.00,'BEFORE_RENTAL','REMITTANCE_REQUESTED',16),(16,'9995304675892792','999',NULL,'2025-05-21 21:14:01.950168','[{\"imageIndex\":0,\"result\":\"NO_DAMAGE_FOUND\",\"damages\":[]}]',0,9,10000.00,'RETURNED','RENTAL_PERIOD_ENDED',18);
/*!40000 ALTER TABLE `rental` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservation`
--

DROP TABLE IF EXISTS `reservation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservation` (
  `reservation_id` bigint NOT NULL AUTO_INCREMENT,
  `deposit` decimal(38,2) NOT NULL,
  `end_date` date NOT NULL,
  `owner_id` bigint NOT NULL,
  `post_id` bigint NOT NULL,
  `rental_fee` decimal(38,2) NOT NULL,
  `rental_id` bigint DEFAULT NULL,
  `renter_id` bigint NOT NULL,
  `start_date` date NOT NULL,
  `status` enum('CONFIRMED','PENDING','REFUSED') NOT NULL,
  PRIMARY KEY (`reservation_id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservation`
--

LOCK TABLES `reservation` WRITE;
/*!40000 ALTER TABLE `reservation` DISABLE KEYS */;
INSERT INTO `reservation` VALUES (1,50000.00,'2025-05-21',2,1,2000.00,1,1,'2025-05-21','CONFIRMED'),(2,50000.00,'2025-05-23',2,1,2000.00,2,1,'2025-05-21','CONFIRMED'),(3,50000.00,'2025-05-24',2,1,2000.00,3,1,'2025-05-22','CONFIRMED'),(4,50000.00,'2025-05-22',2,1,2000.00,4,1,'2025-05-21','CONFIRMED'),(5,50000.00,'2025-05-23',2,1,2000.00,5,1,'2025-05-21','CONFIRMED'),(7,50000.00,'2025-05-22',2,1,2000.00,8,1,'2025-05-21','CONFIRMED'),(8,50000.00,'2025-05-23',2,1,2000.00,6,1,'2025-05-21','CONFIRMED'),(9,50000.00,'2025-05-24',2,1,2000.00,7,1,'2025-05-21','CONFIRMED'),(10,50000.00,'2025-05-23',2,1,2000.00,9,1,'2025-05-21','CONFIRMED'),(11,50000.00,'2025-05-24',2,1,2000.00,10,1,'2025-05-21','CONFIRMED'),(12,50000.00,'2025-05-23',2,1,2000.00,11,6,'2025-05-21','CONFIRMED'),(13,50000.00,'2025-05-24',2,1,2000.00,12,6,'2025-05-21','CONFIRMED'),(14,100000.00,'2025-05-22',5,37,10000.00,13,1,'2025-05-22','CONFIRMED'),(15,50000.00,'2025-05-23',2,1,2000.00,14,6,'2025-05-21','CONFIRMED'),(16,50000.00,'2025-05-22',2,42,2000.00,15,6,'2025-05-21','CONFIRMED'),(18,100000.00,'2025-05-22',5,32,10000.00,16,1,'2025-05-21','CONFIRMED');
/*!40000 ALTER TABLE `reservation` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-21 21:16:36
