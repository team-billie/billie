-- 외래키 제약조건 일시 비활성화
SET FOREIGN_KEY_CHECKS = 0;

-- 1. Member 더미 데이터 (40명의 사용자 생성)
INSERT INTO member (
    member_id, email, birth, gender, address, profile_image_url, account, nickname, created_at
) VALUES
      (1, 'hong@example.com', '1990-01-01', 'MALE', '서울시 강남구', 'profile1.jpg', 1, '홍길동', '2024-01-01T10:00:00'),
      (2, 'kim@example.com', '1991-02-15', 'FEMALE', '서울시 서초구', 'profile2.jpg', 2, '김영희', '2024-01-02T10:00:00'),
      (3, 'park@example.com', '1992-03-20', 'MALE', '서울시 송파구', 'profile3.jpg', 3, '박철수', '2024-01-03T10:00:00'),
      (4, 'lee@example.com', '1993-04-25', 'FEMALE', '경기도 성남시', 'profile4.jpg', 4, '이민지', '2024-01-04T10:00:00'),
      (5, 'choi@example.com', '1994-05-30', 'MALE', '경기도 수원시', 'profile5.jpg', 5, '최성훈', '2024-01-05T10:00:00'),
      (6, 'jung@example.com', '1995-06-15', 'FEMALE', '인천시 부평구', 'profile6.jpg', 6, '정유리', '2024-01-06T10:00:00'),
      (7, 'kang@example.com', '1996-07-10', 'MALE', '부산시 해운대구', 'profile7.jpg', 7, '강준혁', '2024-01-07T10:00:00'),
      (8, 'seo@example.com', '1997-08-05', 'FEMALE', '대구시 수성구', 'profile8.jpg', 8, '서상은', '2024-01-08T10:00:00'),
      (9, 'lim@example.com', '1998-09-20', 'MALE', '광주시 남구', 'profile9.jpg', 9, '임재형', '2024-01-09T10:00:00'),
      (10, 'yoon@example.com', '1999-10-15', 'FEMALE', '대전시 유성구', 'profile10.jpg', 10, '윤소연', '2024-01-10T10:00:00'),
      (11, 'kim2@example.com', '1989-11-30', 'MALE', '서울시 종로구', 'profile11.jpg', 11, '김민수', '2024-01-11T10:00:00'),
      (12, 'lee2@example.com', '1988-12-25', 'FEMALE', '서울시 중구', 'profile12.jpg', 12, '이수진', '2024-01-12T10:00:00'),
      (13, 'park2@example.com', '1987-01-10', 'MALE', '경기도 고양시', 'profile13.jpg', 13, '박지훈', '2024-01-13T10:00:00'),
      (14, 'cho@example.com', '1986-02-28', 'FEMALE', '경기도 안산시', 'profile14.jpg', 14, '조현아', '2024-01-14T10:00:00'),
      (15, 'song@example.com', '1985-03-15', 'MALE', '인천시 계양구', 'profile15.jpg', 15, '송태호', '2024-01-15T10:00:00'),
      (16, 'oh@example.com', '1984-04-20', 'FEMALE', '부산시 금정구', 'profile16.jpg', 16, '오예원', '2024-01-16T10:00:00'),
      (17, 'ha@example.com', '1983-05-25', 'MALE', '대구시 동구', 'profile17.jpg', 17, '하동민', '2024-01-17T10:00:00'),
      (18, 'shin@example.com', '1982-06-30', 'FEMALE', '광주시 서구', 'profile18.jpg', 18, '신혜진', '2024-01-18T10:00:00'),
      (19, 'ahn@example.com', '1981-07-05', 'MALE', '대전시 서구', 'profile19.jpg', 19, '안준서', '2024-01-19T10:00:00'),
      (20, 'yang@example.com', '1980-08-10', 'FEMALE', '울산시 남구', 'profile20.jpg', 20, '양서현', '2024-01-20T10:00:00');

-- AUTO_INCREMENT 값 설정
ALTER TABLE member AUTO_INCREMENT = 21;

-- 2. Post 더미 데이터 (10개의 게시글)
INSERT INTO post (post_id, title, content, rental_fee, deposit, address, latitude, longitude, category, author_id, created_at) VALUES
                                                                                                                                   (1, 'iPhone 15 Pro 대여', '완전 새 제품! 액정 보호필름 포함', 30000, 300000, '서울시 강남구', 37.49794, 127.05902, 'DIGITAL_DEVICE', 1, '2024-02-01T10:00:00'),
                                                                                                                                   (2, '에어컨 대여해요', '삼성 무풍 에어컨 18평형', 50000, 500000, '서울시 강남구', 37.51133, 127.08298, 'HOME_APPLIANCE', 2, '2024-02-02T10:00:00'),
                                                                                                                                   (3, '이사용 트럭 대여', '1톤 트럭, 운전기사 포함', 80000, 800000, '경기도 성남시 분당구', 37.35944, 127.11794, 'SPORTS_LEISURE', 3, '2024-02-03T10:00:00'),
                                                                                                                                   (4, '닌텐도 스위치 대여', '모든 액세서리 포함, 게임 10개', 20000, 200000, '인천시 부평구 청천동', 37.49444, 126.71667, 'HOBBY_GAMES_MUSIC', 4, '2024-02-04T10:00:00'),
                                                                                                                                   (5, '카메라 대여합니다', '캐논 5D Mark IV + 렌즈 3개', 40000, 400000, '부산시 해운대구 좌동', 35.16361, 129.17944, 'DIGITAL_DEVICE', 5, '2024-02-05T10:00:00'),
                                                                                                                                   (6, '아기 유모차 대여', '조이 파렌트 시리즈', 10000, 100000, '대구시 수성구 범어동', 35.84667, 128.62639, 'BABY_CHILDREN', 6, '2024-02-06T10:00:00'),
                                                                                                                                   (7, '캠핑 텐트 세트', '4인용 원터치 텐트 + 체어 + 테이블', 25000, 250000, '광주시 남구 봉선동', 35.14222, 126.89722, 'SPORTS_LEISURE', 7, '2024-02-07T10:00:00'),
                                                                                                                                   (8, '전자 피아노 대여', 'Yamaha 디지털 피아노', 35000, 350000, '대전시 유성구 봉명동', 36.35167, 127.33611, 'HOBBY_GAMES_MUSIC', 8, '2024-02-08T10:00:00'),
                                                                                                                                   (9, '업무용 모니터 대여', 'LG 울트라와이드 34인치', 15000, 150000, '서울시 종로구 신문로', 37.57028, 126.96806, 'DIGITAL_DEVICE', 9, '2024-02-09T10:00:00'),
                                                                                                                                   (10, '파티용 프로젝터', '엡손 풀HD 프로젝터 + 스크린', 30000, 300000, '서울시 마포구 홍대', 37.55694, 126.92639, 'DIGITAL_DEVICE', 10, '2024-02-10T10:00:00');

-- AUTO_INCREMENT 값 설정
ALTER TABLE post AUTO_INCREMENT = 11;

-- 3. ProductImage 더미 데이터 (각 Post당 2-3개의 이미지)
INSERT INTO product_image (file_path, post_id) VALUES
-- Post 1의 이미지들
('https://example.com/images/iphone15_1.jpg', 1),
('https://example.com/images/iphone15_2.jpg', 1),
('https://example.com/images/iphone15_3.jpg', 1),
-- Post 2의 이미지들
('https://example.com/images/aircon_1.jpg', 2),
('https://example.com/images/aircon_2.jpg', 2),
-- Post 3의 이미지들
('https://example.com/images/truck_1.jpg', 3),
('https://example.com/images/truck_2.jpg', 3),
('https://example.com/images/truck_3.jpg', 3),
-- Post 4의 이미지들
('https://example.com/images/switch_1.jpg', 4),
('https://example.com/images/switch_2.jpg', 4),
-- Post 5의 이미지들
('https://example.com/images/camera_1.jpg', 5),
('https://example.com/images/camera_2.jpg', 5),
('https://example.com/images/camera_3.jpg', 5),
-- Post 6의 이미지들
('https://example.com/images/stroller_1.jpg', 6),
('https://example.com/images/stroller_2.jpg', 6),
-- Post 7의 이미지들
('https://example.com/images/camping_1.jpg', 7),
('https://example.com/images/camping_2.jpg', 7),
('https://example.com/images/camping_3.jpg', 7),
-- Post 8의 이미지들
('https://example.com/images/piano_1.jpg', 8),
('https://example.com/images/piano_2.jpg', 8),
-- Post 9의 이미지들
('https://example.com/images/monitor_1.jpg', 9),
('https://example.com/images/monitor_2.jpg', 9),
-- Post 10의 이미지들
('https://example.com/images/projector_1.jpg', 10),
('https://example.com/images/projector_2.jpg', 10),
('https://example.com/images/projector_3.jpg', 10);

-- 4. PostLike 더미 데이터
INSERT INTO post_likes (post_id, member_id, created_at) VALUES
                                                            (1, 11, '2024-02-22T10:00:00'),
                                                            (1, 12, '2024-02-22T11:00:00'),
                                                            (1, 13, '2024-02-22T12:00:00'),
                                                            (2, 14, '2024-02-23T10:00:00'),
                                                            (2, 15, '2024-02-23T11:00:00'),
                                                            (3, 16, '2024-02-24T10:00:00'),
                                                            (3, 17, '2024-02-24T11:00:00'),
                                                            (3, 18, '2024-02-24T12:00:00'),
                                                            (4, 19, '2024-02-25T10:00:00'),
                                                            (4, 20, '2024-02-25T11:00:00'),
                                                            (5, 11, '2024-02-26T10:00:00'),
                                                            (5, 12, '2024-02-26T11:00:00'),
                                                            (5, 13, '2024-02-26T12:00:00'),
                                                            (6, 14, '2024-02-27T10:00:00'),
                                                            (7, 15, '2024-02-28T10:00:00'),
                                                            (7, 16, '2024-02-28T11:00:00'),
                                                            (8, 17, '2024-02-29T10:00:00'),
                                                            (9, 18, '2024-03-01T10:00:00'),
                                                            (9, 19, '2024-03-01T11:00:00'),
                                                            (10, 20, '2024-03-02T10:00:00');

-- 5. Reservation 더미 데이터 (10개)
INSERT INTO reservation (reservation_id, start_date, end_date, rental_fee, deposit, status, rental_id, owner_id, renter_id, post_id) VALUES
                                                                                                                                         (1, '2024-03-15', '2024-03-20', 150000, 300000, 'CONFIRMED', 1, 1, 11, 1),
                                                                                                                                         (2, '2024-03-17', '2024-03-24', 350000, 500000, 'CONFIRMED', 2, 2, 12, 2),
                                                                                                                                         (3, '2024-03-18', '2024-03-19', 80000, 800000, 'CONFIRMED', 3, 3, 13, 3),
                                                                                                                                         (4, '2024-03-20', '2024-03-27', 140000, 200000, 'CONFIRMED', 4, 4, 14, 4),
                                                                                                                                         (5, '2024-03-22', '2024-03-29', 280000, 400000, 'CONFIRMED', 5, 5, 15, 5),
                                                                                                                                         (6, '2024-03-25', '2024-04-01', 70000, 100000, 'CONFIRMED', 6, 6, 16, 6),
                                                                                                                                         (7, '2024-03-27', '2024-04-03', 175000, 250000, 'CONFIRMED', 7, 7, 17, 7),
                                                                                                                                         (8, '2024-03-30', '2024-04-06', 245000, 350000, 'CONFIRMED', 8, 8, 18, 8),
                                                                                                                                         (9, '2024-04-01', '2024-04-08', 105000, 150000, 'CONFIRMED', 9, 9, 19, 9),
                                                                                                                                         (10, '2024-04-03', '2024-04-10', 210000, 300000, 'CONFIRMED', 10, 10, 20, 10);

-- AUTO_INCREMENT 값 설정
ALTER TABLE reservation AUTO_INCREMENT = 11;

INSERT INTO rental (rental_id, reservation_id, rental_status, rental_process, damage_analysis, compared_analysis, deal_count, account_no, bank_code, created_at) VALUES
                                                                                                                                                                     (1, 1, 'DEPOSIT_REQUESTED', 'RETURNED', '손상 없음', '이전 사진과 일치합니다. 손상 없음', 1, '123-456-789012', '011', '2024-03-15T10:00:00'),
                                                                                                                                                                     (2, 2, 'RENTAL_COMPLETED', 'RENTAL_COMPLETED', '경미한 스크래치 발견', '이전 상태 대비 스크래치가 추가됨', 1, '234-567-890123', '020', '2024-03-17T10:00:00'),
                                                                                                                                                                     (3, 3, 'RENTAL_COMPLETED', 'RENTAL_COMPLETED', '손상 없음', '이전 사진과 일치합니다. 변화 없음', 1, '345-678-901234', '032', '2024-03-18T10:00:00'),
                                                                                                                                                                     (4, 4, 'RENTAL_COMPLETED', 'RENTAL_COMPLETED', '컨트롤러 버튼 불량', '이전 상태 정상에서 컨트롤러 버튼 불량 발생', 1, '456-789-012345', '034', '2024-03-20T10:00:00'),
                                                                                                                                                                     (5, 5, 'RENTAL_COMPLETED', 'RENTAL_COMPLETED', '손상 없음', '이전과 비교 결과 동일한 상태', 1, '567-890-123456', '090', '2024-03-22T10:00:00'),
                                                                                                                                                                     (6, 6, 'DEPOSIT_REQUESTED', 'RETURNED', '안전벨트 오염', '반납 시 안전벨트에 오염 발생 확인', 0, '678-901-234567', '002', '2024-03-25T10:00:00'),
                                                                                                                                                                     (7, 7, 'DEPOSIT_REQUESTED', 'RETURNED', '손상 없음', '대여 전후 사진 비교 시 차이 없음', 0, '789-012-345678', '023', '2024-03-27T10:00:00'),
                                                                                                                                                                     (8, 8, 'BEFORE_AND_AFTER_COMPARED', 'RETURNED', '건반 1개 미작동', '대여 시 정상이었으나 반납 시 건반 1개 작동 안함', 0, '890-123-456789', '088', '2024-03-30T10:00:00'),
                                                                                                                                                                     (9, 9, 'RENTAL_PERIOD_ENDED', 'RETURNED', NULL, NULL, 0, '901-234-567890', '081', '2024-04-01T10:00:00'),
                                                                                                                                                                     (10, 10, 'REMITTANCE_CONFIRMED', 'RENTAL_IN_ACTIVE', NULL, NULL, 0, '012-345-678901', '003', '2024-04-03T10:00:00');
-- AUTO_INCREMENT 값 설정
ALTER TABLE rental AUTO_INCREMENT = 11;

-- 7. AiImage 더미 데이터 (Rental에 따른 이미지 생성)
INSERT INTO ai_image (rental_id, type, image_url, mime_type) VALUES
-- Rental 1 (RENTAL_COMPLETED)
(1, 'BEFORE', 'https://example.com/ai/rental1_before1.jpg', 'image/jpeg'),
(1, 'BEFORE', 'https://example.com/ai/rental1_before2.jpg', 'image/jpeg'),
(1, 'AFTER', 'https://example.com/ai/rental1_after1.jpg', 'image/jpeg'),
(1, 'AFTER', 'https://example.com/ai/rental1_after2.jpg', 'image/jpeg'),
-- Rental 2 (RENTAL_COMPLETED)
(2, 'BEFORE', 'https://example.com/ai/rental2_before1.jpg', 'image/jpeg'),
(2, 'AFTER', 'https://example.com/ai/rental2_after1.jpg', 'image/jpeg'),
(2, 'AFTER', 'https://example.com/ai/rental2_after2.jpg', 'image/jpeg'),
-- Rental 3 (RENTAL_COMPLETED)
(3, 'BEFORE', 'https://example.com/ai/rental3_before1.jpg', 'image/jpeg'),
(3, 'BEFORE', 'https://example.com/ai/rental3_before2.jpg', 'image/jpeg'),
(3, 'AFTER', 'https://example.com/ai/rental3_after1.jpg', 'image/jpeg'),
-- Rental 4 (RENTAL_COMPLETED)
(4, 'BEFORE', 'https://example.com/ai/rental4_before1.jpg', 'image/jpeg'),
(4, 'AFTER', 'https://example.com/ai/rental4_after1.jpg', 'image/jpeg'),
(4, 'AFTER', 'https://example.com/ai/rental4_after2.jpg', 'image/jpeg'),
-- Rental 5 (RENTAL_COMPLETED)
(5, 'BEFORE', 'https://example.com/ai/rental5_before1.jpg', 'image/jpeg'),
(5, 'BEFORE', 'https://example.com/ai/rental5_before2.jpg', 'image/jpeg'),
(5, 'AFTER', 'https://example.com/ai/rental5_after1.jpg', 'image/jpeg'),
(5, 'AFTER', 'https://example.com/ai/rental5_after2.jpg', 'image/jpeg'),
-- Rental 6 (DEPOSIT_REQUESTED)
(6, 'BEFORE', 'https://example.com/ai/rental6_before1.jpg', 'image/jpeg'),
(6, 'AFTER', 'https://example.com/ai/rental6_after1.jpg', 'image/jpeg'),
-- Rental 7 (DEPOSIT_REQUESTED)
(7, 'BEFORE', 'https://example.com/ai/rental7_before1.jpg', 'image/jpeg'),
(7, 'AFTER', 'https://example.com/ai/rental7_after1.jpg', 'image/jpeg'),
(7, 'AFTER', 'https://example.com/ai/rental7_after2.jpg', 'image/jpeg'),
-- Rental 8 (AFTER_PHOTO_REGISTERED)
(8, 'BEFORE', 'https://example.com/ai/rental8_before1.jpg', 'image/jpeg'),
(8, 'AFTER', 'https://example.com/ai/rental8_after1.jpg', 'image/jpeg'),
-- Rental 9 (RENTAL_PERIOD_ENDED)
(9, 'BEFORE', 'https://example.com/ai/rental9_before1.jpg', 'image/jpeg'),
(9, 'BEFORE', 'https://example.com/ai/rental9_before2.jpg', 'image/jpeg'),
-- Rental 10 (REMITTANCE_CONFIRMED)
(10, 'BEFORE', 'https://example.com/ai/rental10_before1.jpg', 'image/jpeg');


INSERT INTO fintech_user (created_at, user_id, user_key) VALUES
                                                             ('2025-05-12 10:33:18.369177', 1, '5b4e4cb4-c670-4ba9-96c9-ec191910005b'),
                                                             ('2025-05-12 10:33:26.789068', 2, '092ef68d-5a10-4b92-b323-b6db7c009e76');

INSERT INTO account (balance, account_id, created_at, bank_code, account_no, user_key) VALUES
                                                                                           (0, 1, '2025-05-12 10:33:18.577802', '999', '9990439282572673', '5b4e4cb4-c670-4ba9-96c9-ec191910005b'),
                                                                                           (0, 2, '2025-05-12 10:33:26.905820', '999', '9991329456396744', '092ef68d-5a10-4b92-b323-b6db7c009e76');

INSERT INTO regist_account
(balance, is_primary, account_id, regist_account_id, registered_at, user_key, alias, account_type)
VALUES
    (0, 0, 1, 1, '2025-05-12 10:33:18.596775', '5b4e4cb4-c670-4ba9-96c9-ec191910005b', '빌리페이', 'BILI_PAY'),
    (0, 0, 2, 2, '2025-05-12 10:33:26.909828', '092ef68d-5a10-4b92-b323-b6db7c009e76', '빌리페이', 'BILI_PAY');

-- 외래키 제약조건 다시 활성화
SET FOREIGN_KEY_CHECKS = 1;