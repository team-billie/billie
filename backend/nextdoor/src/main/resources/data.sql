

-- 외래키 제약조건 일시 비활성화
SET FOREIGN_KEY_CHECKS = 0;

-- 1. Member 더미 데이터 (40명의 사용자 생성)
INSERT INTO member (member_id, name, email, birth, gender, address, profile_image_url, account, nickname, created_at) VALUES
                                                                                                                          (1, '홍길동', 'hong@example.com', '1990-01-01', 'MALE', '서울시 강남구', 'profile1.jpg', 1, '홍길동', '2024-01-01T10:00:00'),
                                                                                                                          (2, '김영희', 'kim@example.com', '1991-02-15', 'FEMALE', '서울시 서초구', 'profile2.jpg', 2, '김영희', '2024-01-02T10:00:00'),
                                                                                                                          (3, '박철수', 'park@example.com', '1992-03-20', 'MALE', '서울시 송파구', 'profile3.jpg', 3, '박철수', '2024-01-03T10:00:00'),
                                                                                                                          (4, '이민지', 'lee@example.com', '1993-04-25', 'FEMALE', '경기도 성남시', 'profile4.jpg', 4, '이민지', '2024-01-04T10:00:00'),
                                                                                                                          (5, '최성훈', 'choi@example.com', '1994-05-30', 'MALE', '경기도 수원시', 'profile5.jpg', 5, '최성훈', '2024-01-05T10:00:00'),
                                                                                                                          (6, '정유리', 'jung@example.com', '1995-06-15', 'FEMALE', '인천시 부평구', 'profile6.jpg', 6, '정유리', '2024-01-06T10:00:00'),
                                                                                                                          (7, '강준혁', 'kang@example.com', '1996-07-10', 'MALE', '부산시 해운대구', 'profile7.jpg', 7, '강준혁', '2024-01-07T10:00:00'),
                                                                                                                          (8, '서상은', 'seo@example.com', '1997-08-05', 'FEMALE', '대구시 수성구', 'profile8.jpg', 8, '서상은', '2024-01-08T10:00:00'),
                                                                                                                          (9, '임재형', 'lim@example.com', '1998-09-20', 'MALE', '광주시 남구', 'profile9.jpg', 9, '임재형', '2024-01-09T10:00:00'),
                                                                                                                          (10, '윤소연', 'yoon@example.com', '1999-10-15', 'FEMALE', '대전시 유성구', 'profile10.jpg', 10, '윤소연', '2024-01-10T10:00:00'),
                                                                                                                          (11, '김민수', 'kim2@example.com', '1989-11-30', 'MALE', '서울시 종로구', 'profile11.jpg', 11, '김민수', '2024-01-11T10:00:00'),
                                                                                                                          (12, '이수진', 'lee2@example.com', '1988-12-25', 'FEMALE', '서울시 중구', 'profile12.jpg', 12, '이수진', '2024-01-12T10:00:00'),
                                                                                                                          (13, '박지훈', 'park2@example.com', '1987-01-10', 'MALE', '경기도 고양시', 'profile13.jpg', 13, '박지훈', '2024-01-13T10:00:00'),
                                                                                                                          (14, '조현아', 'cho@example.com', '1986-02-28', 'FEMALE', '경기도 안산시', 'profile14.jpg', 14, '조현아', '2024-01-14T10:00:00'),
                                                                                                                          (15, '송태호', 'song@example.com', '1985-03-15', 'MALE', '인천시 계양구', 'profile15.jpg', 15, '송태호', '2024-01-15T10:00:00'),
                                                                                                                          (16, '오예원', 'oh@example.com', '1984-04-20', 'FEMALE', '부산시 금정구', 'profile16.jpg', 16, '오예원', '2024-01-16T10:00:00'),
                                                                                                                          (17, '하동민', 'ha@example.com', '1983-05-25', 'MALE', '대구시 동구', 'profile17.jpg', 17, '하동민', '2024-01-17T10:00:00'),
                                                                                                                          (18, '신혜진', 'shin@example.com', '1982-06-30', 'FEMALE', '광주시 서구', 'profile18.jpg', 18, '신혜진', '2024-01-18T10:00:00'),
                                                                                                                          (19, '안준서', 'ahn@example.com', '1981-07-05', 'MALE', '대전시 서구', 'profile19.jpg', 19, '안준서', '2024-01-19T10:00:00'),
                                                                                                                          (20, '양서현', 'yang@example.com', '1980-08-10', 'FEMALE', '울산시 남구', 'profile20.jpg', 20, '양서현', '2024-01-20T10:00:00'),
                                                                                                                          (21, '권민준', 'kwon@example.com', '1992-09-15', 'MALE', '서울시 마포구', 'profile21.jpg', 21, '권민준', '2024-01-21T10:00:00'),
                                                                                                                          (22, '장서우', 'jang@example.com', '1993-10-20', 'FEMALE', '서울시 용산구', 'profile22.jpg', 22, '장서우', '2024-01-22T10:00:00'),
                                                                                                                          (23, '전하늘', 'jeon@example.com', '1994-11-25', 'MALE', '경기도 의정부시', 'profile23.jpg', 23, '전하늘', '2024-01-23T10:00:00'),
                                                                                                                          (24, '배수민', 'bae@example.com', '1995-12-30', 'FEMALE', '경기도 부천시', 'profile24.jpg', 24, '배수민', '2024-01-24T10:00:00'),
                                                                                                                          (25, '황성우', 'hwang@example.com', '1996-01-05', 'MALE', '인천시 서구', 'profile25.jpg', 25, '황성우', '2024-01-25T10:00:00'),
                                                                                                                          (26, '노유진', 'no@example.com', '1997-02-10', 'FEMALE', '부산시 동래구', 'profile26.jpg', 26, '노유진', '2024-01-26T10:00:00'),
                                                                                                                          (27, '도현수', 'do@example.com', '1998-03-15', 'MALE', '대구시 북구', 'profile27.jpg', 27, '도현수', '2024-01-27T10:00:00'),
                                                                                                                          (28, '로서연', 'ro@example.com', '1999-04-20', 'FEMALE', '광주시 동구', 'profile28.jpg', 28, '로서연', '2024-01-28T10:00:00'),
                                                                                                                          (29, '모재윤', 'mo@example.com', '1992-05-25', 'MALE', '대전시 대덕구', 'profile29.jpg', 29, '모재윤', '2024-01-29T10:00:00'),
                                                                                                                          (30, '소현준', 'so@example.com', '1993-06-30', 'FEMALE', '울산시 동구', 'profile30.jpg', 30, '소현준', '2024-01-30T10:00:00'),
                                                                                                                          (31, '고수현', 'go@example.com', '1994-07-05', 'MALE', '서울시 강동구', 'profile31.jpg', 31, '고수현', '2024-01-31T10:00:00'),
                                                                                                                          (32, '토하준', 'to@example.com', '1995-08-10', 'FEMALE', '서울시 관악구', 'profile32.jpg', 32, '토하준', '2024-02-01T10:00:00'),
                                                                                                                          (33, '보예린', 'bo@example.com', '1996-09-15', 'MALE', '경기도 화성시', 'profile33.jpg', 33, '보예린', '2024-02-02T10:00:00'),
                                                                                                                          (34, '조새별', 'jo@example.com', '1997-10-20', 'FEMALE', '경기도 용인시', 'profile34.jpg', 34, '조새별', '2024-02-03T10:00:00'),
                                                                                                                          (35, '포천수', 'po@example.com', '1998-11-25', 'MALE', '인천시 동구', 'profile35.jpg', 35, '포천수', '2024-02-04T10:00:00'),
                                                                                                                          (36, '뽀얌', 'ppo@example.com', '1999-12-30', 'FEMALE', '부산시 북구', 'profile36.jpg', 36, '뽀얌', '2024-02-05T10:00:00'),
                                                                                                                          (37, '쪼그만수', 'jjo@example.com', '1990-01-05', 'MALE', '대구시 달서구', 'profile37.jpg', 37, '쪼그만수', '2024-02-06T10:00:00'),
                                                                                                                          (38, '꼬마돌', 'kko@example.com', '1991-02-10', 'FEMALE', '광주시 북구', 'profile38.jpg', 38, '꼬마돌', '2024-02-07T10:00:00'),
                                                                                                                          (39, '뽁뽁이', 'ppo2@example.com', '1992-03-15', 'MALE', '대전시 중구', 'profile39.jpg', 39, '뽁뽁이', '2024-02-08T10:00:00'),
                                                                                                                          (40, '퐁풍이', 'pong@example.com', '1993-04-20', 'FEMALE', '울산시 중구', 'profile40.jpg', 40, '퐁풍이', '2024-02-09T10:00:00');

-- AUTO_INCREMENT 값 설정
ALTER TABLE member AUTO_INCREMENT = 41;

-- 2. Post 더미 데이터 (20개의 게시글)
INSERT INTO post (post_id, title, content, rental_fee, deposit, address, location, category, author_id, created_at) VALUES
                                                                                                                        (1, 'iPhone 15 Pro 대여', '완전 새 제품! 액정 보호필름 포함', 30000, 300000, '서울시 강남구 대치동', ST_GeomFromText('POINT(37.49794 127.05902)', 4326), 'DIGITAL_DEVICE', 1, '2024-02-01T10:00:00'),
                                                                                                                        (2, '에어컨 대여해요', '삼성 무풍 에어컨 18평형', 50000, 500000, '서울시 송파구 잠실동', ST_GeomFromText('POINT(37.51133 127.08298)', 4326), 'HOME_APPLIANCE', 2, '2024-02-02T10:00:00'),
                                                                                                                        (3, '이사용 트럭 대여', '1톤 트럭, 운전기사 포함', 80000, 800000, '경기도 성남시 분당구', ST_GeomFromText('POINT(37.35944 127.11794)', 4326), 'SPORTS_LEISURE', 3, '2024-02-03T10:00:00'),
                                                                                                                        (4, '닌텐도 스위치 대여', '모든 액세서리 포함, 게임 10개', 20000, 200000, '인천시 부평구 청천동', ST_GeomFromText('POINT(37.49444 126.71667)', 4326), 'HOBBY_GAMES_MUSIC', 4, '2024-02-04T10:00:00'),
                                                                                                                        (5, '카메라 대여합니다', '캐논 5D Mark IV + 렌즈 3개', 40000, 400000, '부산시 해운대구 좌동', ST_GeomFromText('POINT(35.16361 129.17944)', 4326), 'DIGITAL_DEVICE', 5, '2024-02-05T10:00:00'),
                                                                                                                        (6, '아기 유모차 대여', '조이 파렌트 시리즈', 10000, 100000, '대구시 수성구 범어동', ST_GeomFromText('POINT(35.84667 128.62639)', 4326), 'BABY_CHILDREN', 6, '2024-02-06T10:00:00'),
                                                                                                                        (7, '캠핑 텐트 세트', '4인용 원터치 텐트 + 체어 + 테이블', 25000, 250000, '광주시 남구 봉선동', ST_GeomFromText('POINT(35.14222 126.89722)', 4326), 'SPORTS_LEISURE', 7, '2024-02-07T10:00:00'),
                                                                                                                        (8, '전자 피아노 대여', 'Yamaha 디지털 피아노', 35000, 350000, '대전시 유성구 봉명동', ST_GeomFromText('POINT(36.35167 127.33611)', 4326), 'HOBBY_GAMES_MUSIC', 8, '2024-02-08T10:00:00'),
                                                                                                                        (9, '업무용 모니터 대여', 'LG 울트라와이드 34인치', 15000, 150000, '서울시 종로구 신문로', ST_GeomFromText('POINT(37.57028 126.96806)', 4326), 'DIGITAL_DEVICE', 9, '2024-02-09T10:00:00'),
                                                                                                                        (10, '파티용 프로젝터', '엡손 풀HD 프로젝터 + 스크린', 30000, 300000, '서울시 마포구 홍대', ST_GeomFromText('POINT(37.55694 126.92639)', 4326), 'DIGITAL_DEVICE', 10, '2024-02-10T10:00:00'),
                                                                                                                        (11, '청소기 대여', '다이슨 V11 무선 청소기', 20000, 200000, '경기도 수원시 영통구', ST_GeomFromText('POINT(37.24528 127.05833)', 4326), 'HOME_APPLIANCE', 11, '2024-02-11T10:00:00'),
                                                                                                                        (12, '드레스 대여', '웨딩 게스트 원피스, 55사이즈', 15000, 150000, '서울시 강서구 화곡동', ST_GeomFromText('POINT(37.54167 126.84444)', 4326), 'WOMEN_CLOTHING', 12, '2024-02-12T10:00:00'),
                                                                                                                        (13, '골프채 세트 대여', '타이틀리스트 풀세트', 40000, 400000, '경기도 고양시 일산동구', ST_GeomFromText('POINT(37.69444 126.77361)', 4326), 'SPORTS_LEISURE', 13, '2024-02-13T10:00:00'),
                                                                                                                        (14, '책상 대여', '높이 조절 가능한 스탠딩 데스크', 25000, 250000, '인천시 계양구 작전동', ST_GeomFromText('POINT(37.53889 126.74028)', 4326), 'FURNITURE_INTERIOR', 14, '2024-02-14T10:00:00'),
                                                                                                                        (15, 'DIY 공구 세트', '보쉬 전동 드릴 + 공구함', 20000, 200000, '부산시 사하구 하단동', ST_GeomFromText('POINT(35.09361 128.96750)', 4326), 'LIVING_KITCHEN', 15, '2024-02-15T10:00:00'),
                                                                                                                        (16, '스피커 대여', 'JBL 파티박스 300', 30000, 300000, '대구시 달서구 월성동', ST_GeomFromText('POINT(35.83972 128.53389)', 4326), 'HOBBY_GAMES_MUSIC', 16, '2024-02-16T10:00:00'),
                                                                                                                        (17, '빔프로젝터 대여', 'LG 시네빔 휴대용', 25000, 250000, '광주시 서구 화정동', ST_GeomFromText('POINT(35.15222 126.88111)', 4326), 'DIGITAL_DEVICE', 17, '2024-02-17T10:00:00'),
                                                                                                                        (18, '자전거 대여', '로드바이크 탄소섬유', 40000, 400000, '대전시 서구 둔산동', ST_GeomFromText('POINT(36.35167 127.38056)', 4326), 'SPORTS_LEISURE', 18, '2024-02-18T10:00:00'),
                                                                                                                        (19, '가습기 대여', '다이슨 초음파 가습기', 15000, 150000, '울산시 남구 삼산동', ST_GeomFromText('POINT(35.53611 129.32639)', 4326), 'HOME_APPLIANCE', 19, '2024-02-19T10:00:00'),
                                                                                                                        (20, '플레이스테이션 5', 'PS5 + 듀얼센스 2개 + 게임 5개', 35000, 350000, '서울시 서초구 방배동', ST_GeomFromText('POINT(37.48139 126.99472)', 4326), 'HOBBY_GAMES_MUSIC', 20, '2024-02-20T10:00:00');

-- AUTO_INCREMENT 값 설정
ALTER TABLE post AUTO_INCREMENT = 21;

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
('https://example.com/images/projector_3.jpg', 10),
-- Post 11의 이미지들
('https://example.com/images/vacuum_1.jpg', 11),
('https://example.com/images/vacuum_2.jpg', 11),
-- Post 12의 이미지들
('https://example.com/images/dress_1.jpg', 12),
('https://example.com/images/dress_2.jpg', 12),
-- Post 13의 이미지들
('https://example.com/images/golf_1.jpg', 13),
('https://example.com/images/golf_2.jpg', 13),
('https://example.com/images/golf_3.jpg', 13),
-- Post 14의 이미지들
('https://example.com/images/desk_1.jpg', 14),
('https://example.com/images/desk_2.jpg', 14),
-- Post 15의 이미지들
('https://example.com/images/drill_1.jpg', 15),
('https://example.com/images/drill_2.jpg', 15),
-- Post 16의 이미지들
('https://example.com/images/speaker_1.jpg', 16),
('https://example.com/images/speaker_2.jpg', 16),
('https://example.com/images/speaker_3.jpg', 16),
-- Post 17의 이미지들
('https://example.com/images/projector2_1.jpg', 17),
('https://example.com/images/projector2_2.jpg', 17),
-- Post 18의 이미지들
('https://example.com/images/bike_1.jpg', 18),
('https://example.com/images/bike_2.jpg', 18),
-- Post 19의 이미지들
('https://example.com/images/humidifier_1.jpg', 19),
('https://example.com/images/humidifier_2.jpg', 19),
('https://example.com/images/humidifier_3.jpg', 19),
-- Post 20의 이미지들
('https://example.com/images/ps5_1.jpg', 20),
('https://example.com/images/ps5_2.jpg', 20);

-- 4. PostLike 더미 데이터
INSERT INTO post_likes (post_id, member_id, created_at) VALUES
                                                            (1, 21, '2024-02-22T10:00:00'),
                                                            (1, 22, '2024-02-22T11:00:00'),
                                                            (1, 23, '2024-02-22T12:00:00'),
                                                            (2, 24, '2024-02-23T10:00:00'),
                                                            (2, 25, '2024-02-23T11:00:00'),
                                                            (3, 26, '2024-02-24T10:00:00'),
                                                            (3, 27, '2024-02-24T11:00:00'),
                                                            (3, 28, '2024-02-24T12:00:00'),
                                                            (4, 29, '2024-02-25T10:00:00'),
                                                            (4, 30, '2024-02-25T11:00:00'),
                                                            (5, 31, '2024-02-26T10:00:00'),
                                                            (5, 32, '2024-02-26T11:00:00'),
                                                            (5, 33, '2024-02-26T12:00:00'),
                                                            (6, 34, '2024-02-27T10:00:00'),
                                                            (7, 35, '2024-02-28T10:00:00'),
                                                            (7, 36, '2024-02-28T11:00:00'),
                                                            (8, 37, '2024-02-29T10:00:00'),
                                                            (9, 38, '2024-03-01T10:00:00'),
                                                            (9, 39, '2024-03-01T11:00:00'),
                                                            (10, 40, '2024-03-02T10:00:00'),
                                                            (11, 21, '2024-03-03T10:00:00'),
                                                            (12, 22, '2024-03-04T10:00:00'),
                                                            (13, 23, '2024-03-05T10:00:00'),
                                                            (14, 24, '2024-03-06T10:00:00'),
                                                            (15, 25, '2024-03-07T10:00:00'),
                                                            (16, 26, '2024-03-08T10:00:00'),
                                                            (17, 27, '2024-03-09T10:00:00'),
                                                            (18, 28, '2024-03-10T10:00:00'),
                                                            (19, 29, '2024-03-11T10:00:00'),
                                                            (20, 30, '2024-03-12T10:00:00');

-- 5. Reservation 더미 데이터 (20개) - ReservationStatus enum 가능한 값들로 수정
-- PENDING, CONFIRMED, REFUSED 중에서 선택
INSERT INTO reservation (reservation_id, start_date, end_date, rental_fee, deposit, status, rental_id, owner_id, renter_id, post_id) VALUES
                                                                                                                                         (1, '2024-03-15', '2024-03-20', 150000, 300000, 'CONFIRMED', 1, 1, 21, 1),
                                                                                                                                         (2, '2024-03-17', '2024-03-24', 350000, 500000, 'CONFIRMED', 2, 2, 22, 2),
                                                                                                                                         (3, '2024-03-18', '2024-03-19', 80000, 800000, 'CONFIRMED', 3, 3, 23, 3),
                                                                                                                                         (4, '2024-03-20', '2024-03-27', 140000, 200000, 'CONFIRMED', 4, 4, 24, 4),
                                                                                                                                         (5, '2024-03-22', '2024-03-29', 280000, 400000, 'CONFIRMED', 5, 5, 25, 5),
                                                                                                                                         (6, '2024-03-25', '2024-04-01', 70000, 100000, 'CONFIRMED', 6, 6, 26, 6),
                                                                                                                                         (7, '2024-03-27', '2024-04-03', 175000, 250000, 'CONFIRMED', 7, 7, 27, 7),
                                                                                                                                         (8, '2024-03-30', '2024-04-06', 245000, 350000, 'CONFIRMED', 8, 8, 28, 8),
                                                                                                                                         (9, '2024-04-01', '2024-04-08', 105000, 150000, 'CONFIRMED', 9, 9, 29, 9),
                                                                                                                                         (10, '2024-04-03', '2024-04-10', 210000, 300000, 'CONFIRMED', 10, 10, 30, 10),
                                                                                                                                         (11, '2024-04-05', '2024-04-12', 140000, 200000, 'CONFIRMED', 11, 11, 31, 11),
                                                                                                                                         (12, '2024-04-07', '2024-04-14', 105000, 150000, 'CONFIRMED', 12, 12, 32, 12),
                                                                                                                                         (13, '2024-04-09', '2024-04-16', 280000, 400000, 'CONFIRMED', 13, 13, 33, 13),
                                                                                                                                         (14, '2024-04-11', '2024-04-18', 175000, 250000, 'CONFIRMED', 14, 14, 34, 14),
                                                                                                                                         (15, '2024-04-13', '2024-04-20', 140000, 200000, 'CONFIRMED', 15, 15, 35, 15),
                                                                                                                                         (16, '2024-04-15', '2024-04-22', 210000, 300000, 'CONFIRMED', 16, 16, 36, 16),
                                                                                                                                         (17, '2024-04-17', '2024-04-24', 175000, 250000, 'CONFIRMED', 17, 17, 37, 17),
                                                                                                                                         (18, '2024-04-19', '2024-04-26', 280000, 400000, 'CONFIRMED', 18, 18, 38, 18),
                                                                                                                                         (19, '2024-04-21', '2024-04-28', 105000, 150000, 'CONFIRMED', 19, 19, 39, 19),
                                                                                                                                         (20, '2024-04-23', '2024-04-30', 245000, 350000, 'CONFIRMED', 20, 20, 40, 20);

-- AUTO_INCREMENT 값 설정
ALTER TABLE reservation AUTO_INCREMENT = 21;

-- 6. Rental 더미 데이터 (20개) - 다양한 상태로 설정
INSERT INTO rental (rental_id, reservation_id, rental_status, rental_process, damage_analysis, deal_count, created_at) VALUES
                                                                                                                           (1, 1, 'RENTAL_COMPLETED', 'RENTAL_COMPLETED', '손상 없음', 1, '2024-03-15T10:00:00'),
                                                                                                                           (2, 2, 'RENTAL_COMPLETED', 'RENTAL_COMPLETED', '경미한 스크래치 발견', 1, '2024-03-17T10:00:00'),
                                                                                                                           (3, 3, 'RENTAL_COMPLETED', 'RENTAL_COMPLETED', '손상 없음', 1, '2024-03-18T10:00:00'),
                                                                                                                           (4, 4, 'RENTAL_COMPLETED', 'RENTAL_COMPLETED', '컨트롤러 버튼 불량', 1, '2024-03-20T10:00:00'),
                                                                                                                           (5, 5, 'RENTAL_COMPLETED', 'RENTAL_COMPLETED', '손상 없음', 1, '2024-03-22T10:00:00'),
                                                                                                                           (6, 6, 'DEPOSIT_REQUESTED', 'RETURNED', '안전벨트 오염', 0, '2024-03-25T10:00:00'),
                                                                                                                           (7, 7, 'DEPOSIT_REQUESTED', 'RETURNED', '손상 없음', 0, '2024-03-27T10:00:00'),
                                                                                                                           (8, 8, 'AFTER_PHOTO_REGISTERED', 'RETURNED', '건반 1개 미작동', 0, '2024-03-30T10:00:00'),
                                                                                                                           (9, 9, 'RENTAL_PERIOD_ENDED', 'RETURNED', NULL, 0, '2024-04-01T10:00:00'),
                                                                                                                           (10, 10, 'REMITTANCE_CONFIRMED', 'RENTAL_IN_ACTIVE', NULL, 0, '2024-04-03T10:00:00'),
                                                                                                                           (11, 11, 'REMITTANCE_REQUESTED', 'BEFORE_RENTAL', NULL, 0, '2024-04-05T10:00:00'),
                                                                                                                           (12, 12, 'BEFORE_PHOTO_REGISTERED', 'BEFORE_RENTAL', NULL, 0, '2024-04-07T10:00:00'),
                                                                                                                           (13, 13, 'CREATED', 'BEFORE_RENTAL', NULL, 0, '2024-04-09T10:00:00'),
                                                                                                                           (14, 14, 'RENTAL_COMPLETED', 'RENTAL_COMPLETED', '손상 없음', 1, '2024-04-11T10:00:00'),
                                                                                                                           (15, 15, 'RENTAL_COMPLETED', 'RENTAL_COMPLETED', '드릴 케이스 파손', 1, '2024-04-13T10:00:00'),
                                                                                                                           (16, 16, 'RENTAL_COMPLETED', 'RENTAL_COMPLETED', '손상 없음', 1, '2024-04-15T10:00:00'),
                                                                                                                           (17, 17, 'RENTAL_COMPLETED', 'RENTAL_COMPLETED', '렌즈 오염', 1, '2024-04-17T10:00:00'),
                                                                                                                           (18, 18, 'RENTAL_COMPLETED', 'RENTAL_COMPLETED', '체인 조정 필요', 1, '2024-04-19T10:00:00'),
                                                                                                                           (19, 19, 'RENTAL_COMPLETED', 'RENTAL_COMPLETED', '손상 없음', 1, '2024-04-21T10:00:00'),
                                                                                                                           (20, 20, 'RENTAL_COMPLETED', 'RENTAL_COMPLETED', '듀얼센스 충전불가', 1, '2024-04-23T10:00:00');

-- AUTO_INCREMENT 값 설정
ALTER TABLE rental AUTO_INCREMENT = 21;

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
(10, 'BEFORE', 'https://example.com/ai/rental10_before1.jpg', 'image/jpeg'),
-- Rental 11 (REMITTANCE_REQUESTED)
(11, 'BEFORE', 'https://example.com/ai/rental11_before1.jpg', 'image/jpeg'),
-- Rental 12 (BEFORE_PHOTO_REGISTERED)
(12, 'BEFORE', 'https://example.com/ai/rental12_before1.jpg', 'image/jpeg'),
(12, 'BEFORE', 'https://example.com/ai/rental12_before2.jpg', 'image/jpeg'),
-- Rental 14-20 (RENTAL_COMPLETED)
(14, 'BEFORE', 'https://example.com/ai/rental14_before1.jpg', 'image/jpeg'),
(14, 'AFTER', 'https://example.com/ai/rental14_after1.jpg', 'image/jpeg'),
(15, 'BEFORE', 'https://example.com/ai/rental15_before1.jpg', 'image/jpeg'),
(15, 'AFTER', 'https://example.com/ai/rental15_after1.jpg', 'image/jpeg'),
(15, 'AFTER', 'https://example.com/ai/rental15_after2.jpg', 'image/jpeg'),
(16, 'BEFORE', 'https://example.com/ai/rental16_before1.jpg', 'image/jpeg'),
(16, 'AFTER', 'https://example.com/ai/rental16_after1.jpg', 'image/jpeg'),
(17, 'BEFORE', 'https://example.com/ai/rental17_before1.jpg', 'image/jpeg'),
(17, 'BEFORE', 'https://example.com/ai/rental17_before2.jpg', 'image/jpeg'),
(17, 'AFTER', 'https://example.com/ai/rental17_after1.jpg', 'image/jpeg'),
(18, 'BEFORE', 'https://example.com/ai/rental18_before1.jpg', 'image/jpeg'),
(18, 'AFTER', 'https://example.com/ai/rental18_after1.jpg', 'image/jpeg'),
(19, 'BEFORE', 'https://example.com/ai/rental19_before1.jpg', 'image/jpeg'),
(19, 'AFTER', 'https://example.com/ai/rental19_after1.jpg', 'image/jpeg'),
(20, 'BEFORE', 'https://example.com/ai/rental20_before1.jpg', 'image/jpeg'),
(20, 'BEFORE', 'https://example.com/ai/rental20_before2.jpg', 'image/jpeg'),
(20, 'AFTER', 'https://example.com/ai/rental20_after1.jpg', 'image/jpeg');

-- 외래키 제약조건 다시 활성화
SET FOREIGN_KEY_CHECKS = 1;