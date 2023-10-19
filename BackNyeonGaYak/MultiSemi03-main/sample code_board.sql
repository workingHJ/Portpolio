DROP SCHEMA mcsemi03;
CREATE SCHEMA mcsemi03;
USE mcsemi03;

------------------------------------------------
--------------- MEMBER 관련 테이블 ------------------
------------------------------------------------

CREATE TABLE MEMBER (
	mNO   INT PRIMARY KEY AUTO_INCREMENT,
	NAME  VARCHAR(30) NOT NULL,
	ID     VARCHAR(30) NOT NULL UNIQUE,
	PASSWORD VARCHAR(100) NOT NULL,
	EMAIL  VARCHAR(30),
	PHONE VARCHAR(30),
	ADDRESS VARCHAR(50),
	STATUS VARCHAR(1) DEFAULT 'Y' CHECK(STATUS IN ('Y', 'N')),
	ENROLL_DATE DATETIME DEFAULT CURRENT_TIMESTAMP,
	MODIFY_DATE DATETIME DEFAULT CURRENT_TIMESTAMP
	
);
INSERT INTO MEMBER (
    mNO, 
    NAME, 
    ID,
    PASSWORD,
    EMAIL,
    PHONE,  
    ADDRESS,
    STATUS, 
    ENROLL_DATE, 
    MODIFY_DATE
) VALUES(
    0, 
    'admin', 
    'admin', 
    '1234',
    'test@test.com', 
    '010-1234-5678',  
    '서울시 강남구 역삼동',
    DEFAULT,
    DEFAULT,
    DEFAULT
    
);

COMMIT;
SELECT * FROM MEMBER;

SELECT  
	mNO, NAME, ID, PASSWORD, 
	EMAIL, PHONE, ADDRESS, STATUS,
	ENROLL_DATE, MODIFY_DATE
FROM MEMBER;


-------------------------------------------------
--------------- Board 관련 테이블 ------------------
-------------------------------------------------
CREATE TABLE BOARD (	
    bNO INT AUTO_INCREMENT,
    mNO INT, 
	TITLE VARCHAR(1000), 
	CONTENT VARCHAR(2000), 
	TYPE VARCHAR(100), 
	ORIGINAL_FILENAME VARCHAR(100), 
	RENAMED_FILENAME VARCHAR(100), 
	READCOUNT INT DEFAULT 0, 
    STATUS VARCHAR(1) DEFAULT 'Y' CHECK (STATUS IN('Y', 'N')),
    CREATE_DATE DATETIME  DEFAULT CURRENT_TIMESTAMP, 
    MODIFY_DATE DATETIME  DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT PK_BOARD_NO PRIMARY KEY(bNO),
    CONSTRAINT FK_BOARD_WRITER FOREIGN KEY(mNO) REFERENCES MEMBER(mNO) ON DELETE SET NULL
);


INSERT INTO BOARD VALUES(0, 1, '[중요 알림] 서비스 안정화 작업으로 인한 다운타임 공지',  '안녕하세요, 백년가약팀입니다.

서비스 안정화를 위한 시스템 작업으로 최대 30분 다운타임이 있을 예정입니다.

서비스가 중단될 예정이니 양해 부탁드립니다. 

일시 : 6월 27일(토) 00:00 ~ 00:30, 총 30분 다운타임 발생

내용 : DB 점검 및 NHN 클라우드 하이퍼바이저 서버 업그레이드

상기 일정은 작업 상황에 따라 변동될 수 있으며, 빠른 서비스 안정을 위해 최선을 다하겠습니다.

감사합니다.', 'B1', '원본파일명.txt', '변경된파일명.txt', DEFAULT, 'Y', DEFAULT, DEFAULT);
INSERT INTO BOARD VALUES(0, 1, '하루에 타이레놀은 최대 몇알까지 먹을 수 있나요?',  '한번 먹을 때 몇개 씩, 하루에 몇개까지 먹어도 되나요?

생리통 때문에 한달에 3-4일 정도는 꼭 먹어야하는데

얼마나 먹어야 할지 모르겠어요 ㅠㅠㅠ 제발 아시는분 알려주시기 바랍니다 ㅠㅠ...', 'B1', '원본파일명.txt', '변경된파일명.txt', DEFAULT, 'Y', DEFAULT, DEFAULT);
INSERT INTO BOARD VALUES(0, 1, '혈압 높다면 채식 하세요',  '채식을 주로 하는 사람들이 혈압이 낮은 경향이 있는 것으로 나타났다.

25일 일본 국립 뇌심혈관센터 연구팀이 내과학회지에 밝힌 연구결과에 의하면 일부 사람에서는 채식을 하는 것이 약물을 사용하지 않고도 고혈압을 치료할 수 있는 좋은 방법이 될 수 있는 것으로 나타났다.

채식은 육류를 섭취하지 않는 대신 채소와 곡물, 과일등을 주로 섭취하며 일부는 유제품과 계란, 생선은 섭취하는 식사이다.', 'B1', '원본파일명.txt', '변경된파일명.txt', DEFAULT, 'Y', DEFAULT, DEFAULT);
INSERT INTO BOARD VALUES(0, 1, '[good 탐구생활] 다이어트? 건강하게 먹으면서 하자!',  '여성들에게 다이어트란 나이불문, 계절을 불문하고 항상 고민거리로 자리하고 있다. 요즘은 체중의 감소 또는 증가가 필요한 사람을 위해 식사의 일부 또는 전부를 대신할 수 있도록 필요한 영양소를 가감해 조재된 식품들이 인기인데 이에 시중에 출시된 여러 제품들을 비교해 봤다.

◇ 영양소는 UP! 칼로리는 DOWN!

이번에 비교할 제품은 ▲풀무원의 뮤즐리 슬리밍 블랜드 푸룬 ▲농심켈로그의 스페셜K 레드크런치 ▲동서식품의 라이트업 프로틴 등 총 3가지이다.', 'B1', '원본파일명.txt', '변경된파일명.txt', DEFAULT, 'Y', DEFAULT, DEFAULT);
INSERT INTO BOARD VALUES(0, 1, '아이에게 여름철 추천음식이 무엇이 있을까요?',  '날이 더워지기 시작하는 계절이라 아이에게 든든히 먹이고싶은데..

아이에게 좋은 여름철 음식이 어떤 종류가 있을지 추천받고 싶습니다.', 'B1', '원본파일명.txt', '변경된파일명.txt', DEFAULT, 'Y', DEFAULT, DEFAULT);
INSERT INTO BOARD VALUES(0, 1, '혈당이 높을때 피해야할 음식이 뭐가있나요?',  '식전혈당이 높거나 할때

꼭 피해야하는 음식들과 영양소는 어떤것들이 있는지 궁금합니다.

그리고 혈당을 낮추는 음식도궁금합니다', 'B1', '원본파일명.txt', '변경된파일명.txt', DEFAULT, 'Y', DEFAULT, DEFAULT);
INSERT INTO BOARD VALUES(0, 1, '혈당관리, 젊을 때부터 시작하세요',  '흔히 당뇨병하면 중년 또는 노인에서 비만인 사람들에게 생기는 병이라는 인식이 있어 20대, 30대가 당뇨병이라면 고개가 먼저 갸우뚱해진다.

하지만 2009년 대한당뇨병학회에서 발표한 자료에 의하면 국내 전체 당뇨병 환자 중 40세 이하가 41%를 차지하며 특히 남자의 경우 40세 이하 환자는 49%였다. 

만성 합병증이 대부분 당뇨병 발병 10년 후부터 생기는 것으로 볼 때 결국 한창 일할 나이인 40, 50대에 당뇨병 합병증으로 경제활동을 그만둘 수 있는 사람이 많아진다는 이야기이다. 

중앙대병원 내분비내과 김재택 교수에 따르면 젊은 당뇨병 환자의 경우 합병증이 생길 가능성이 높은 반면 치료를 위해 보다 다양한 치료법 적용이 가능해 중년 이상의 당뇨병 환자에 비해 긍정적인 치료 효과를 기대할 수 있다.', 'B1', '원본파일명.txt', '변경된파일명.txt', DEFAULT, 'Y', DEFAULT, DEFAULT);
INSERT INTO BOARD VALUES(0, 1, '밀가루를 끊고 밥을 먹으면 살이 빠질까요?',  '밀가루가 밥보다 확실하게 살이 많이 찌나요?

면을 좋아해서 밥보다 많이 먹었는데 면을 끊고 적정량의 밥을 먹으면 좀 빠질까요???', 'B1', '원본파일명.txt', '변경된파일명.txt', DEFAULT, 'Y', DEFAULT, DEFAULT);
INSERT INTO BOARD VALUES(0, 1, '건강한 다이어트를 위해 운동하자!',  '다이어트에 있어서 가장 중요한 것은 식이조절과 운동이다. 운동은 체중을 감소시키는 데에는 효과가 적고 목표에 도달하는 데에도 시간이 걸리지만 일단 자신이 원하는 체중에 도달한 후에 체중을 유지하는 데 매우 좋은 방법이라 할 것이다.

최근 비만, 살빼기 등에 대한 관심이 증가되고 있고 이제 비만은 개인의 문제만이 아닌 하나의 큰 사회적 이슈이기도 하다. 

비만은 다양한 종류의 질환이 동반되는 하나의 만성적 질병으로 간주되며 인체를 구성하는 성분 가운데 지방조직이 점유하는 비율이 특별하게 높아진 상태를 말한다. 지방 그 자체는 병과 직접적인 관계는 없지만 비만을 제대로 관리하지 않을 경우 고혈압, 당뇨병 등 성인병에 걸릴 위험이 높다.

정상인들에 비해 비만한 사람은 당뇨병은 3.8배, 간경변은 2배, 관상동맥질환은 1.8배, 뇌졸증은 1.6배 높다. 또한 ▲만성요통 ▲협심증 ▲심장마비 ▲지방간 ▲담석증 ▲유방암 ▲자궁체부암 ▲무월경 ▲과다월경 ▲불임 등의 원인이 되기도 한다. ', 'B1', '원본파일명.txt', '변경된파일명.txt', DEFAULT, 'Y', DEFAULT, DEFAULT);
INSERT INTO BOARD VALUES(0, 1, '아침 공복에 토마토를 먹으면 몸에 해로운 과일인가요? 몸에 좋은과일인가요?',  '직장인이라 아침을 대충때우기 위해 요즘 시장에 많이 나오는 토마토를 먹으면 몸에 해로운가요? 아니면 몸에 도움이 되는 좋은 과일인가요?', 'B1', '원본파일명.txt', '변경된파일명.txt', DEFAULT, 'Y', DEFAULT, DEFAULT);
INSERT INTO BOARD VALUES(0, 1, '14세 칼슘제 얼마큼 먹여야할까요?',  '14세 아이 아이용이 아닌 일반인용 칼슘 마그네슘제 하루 정량이 2알 기준 2400mg이던데 두 알 섭취해도 되나요?

아니면 한 알만인 1200mg 섭취 하는 게 좋을까요?

두 달 전 팔 골절 수술 후 회복 중이긴 합니다', 'B1', '원본파일명.txt', '변경된파일명.txt', DEFAULT, 'Y', DEFAULT, DEFAULT);
INSERT INTO BOARD VALUES(0, 1, '건강검진 받는데 심전도관련 질문드립니다.',  '안녕하세요

혹시 Lead 1에서 rsr pattern은 어떤의미인가요?
V1 말고 Lead 1에서요

건강검진 받는데 의미를 알 수가 없네요', 'B1', '원본파일명.txt', '변경된파일명.txt', DEFAULT, 'Y', DEFAULT, DEFAULT);
INSERT INTO BOARD VALUES(0, 1, '코로나진단키드 한달이상 지난것도 상관없을까요?',  '이번주 월요일저녁~화요일저녁까지 3명에서 같이 술마시고 자고 밥먹고 했는데 저빼고 2명이 코로나키트 두줄이 떠서 저도 키트를 하였는데 한줄만 나왔습니다.

그런데 키트가 2개입이라 한달이상 전에 1개입을 쓰고 남은 1개입을 이번에 사용한거라 이걸 믿어야하는지 아니면 새로 키트를 사서 검사해야하는지 궁금합니다', 'B1', '원본파일명.txt', '변경된파일명.txt', DEFAULT, 'Y', DEFAULT, DEFAULT);
INSERT INTO BOARD VALUES(0, 1, '날이 더워지면서 차가운 물이나 음료수를 먹는데 치아가 너무 시립니다',  '날이 더워지면서 차가운 음료나 얼음물을 찾게대는데

치아가 너무 시린현상이 있습니다.이러한때는 어떤 치료를 받아야돼는지 궁금합니다.', 'B1', '원본파일명.txt', '변경된파일명.txt', DEFAULT, 'Y', DEFAULT, DEFAULT);




COMMIT;
SELECT * FROM BOARD;



------------------------------------------------------------------
------------------------- REPLY 관련 테이블 -------------------------
------------------------------------------------------------------


CREATE TABLE REPLY(
  rNO INT PRIMARY KEY AUTO_INCREMENT,
  bNO INT,
  mNO INT,
  CONTENT VARCHAR(1000),
  READCOUNT INT DEFAULT 0, 
  STATUS VARCHAR(1) DEFAULT 'Y' CHECK (STATUS IN ('Y', 'N')),
  CREATE_DATE DATETIME DEFAULT CURRENT_TIMESTAMP,
  MODIFY_DATE DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (bNO) REFERENCES BOARD(bNO),
  FOREIGN KEY (mNO) REFERENCES MEMBER(mNO)
);

select * from member;


INSERT INTO REPLY VALUES(0, 1, 1, '공지 감사합니다^^', DEFAULT, 'Y', DEFAULT, DEFAULT);
INSERT INTO REPLY VALUES(0, 1, 1, '항상 서비스에 신경써주셔서 감사해요~', DEFAULT, 'Y', DEFAULT, DEFAULT);
INSERT INTO REPLY VALUES(0, 2, 1, '약 상자안에 설명서 참고해보세요!.', DEFAULT, 'Y', DEFAULT, DEFAULT);
INSERT INTO REPLY VALUES(0, 2, 1, '성인의 경우 한번 복용시 1-2정 복용가능하고 하루 최대 6정을 넘으시면 안됩니다.', DEFAULT, 'Y', DEFAULT, DEFAULT);



COMMIT;

SELECT * FROM REPLY;

SELECT  
	mNO, ID, PASSWORD, ROLE, NAME,  
	PHONE, EMAIL, ADDRESS, HOBBY, STATUS, 
	ENROLL_DATE, MODIFY_DATE
FROM MEMBER;


-- 검색용 쿼리 3 종 세트
-- 리스트용 쿼리 완성
SELECT  B.bNO, B.TITLE, M.ID, B.CREATE_DATE, B.ORIGINAL_FILENAME, B.READCOUNT, B.STATUS
FROM BOARD B JOIN MEMBER M ON(B.mNO = M.mNO)
WHERE 1 = 1 
AND B.STATUS = 'Y'
-- AND M.ID LIKE '%admin%' 
-- AND B.TITLE LIKE '%구매%' 
 AND B.CONTENT LIKE '%공지%' 
ORDER BY B.bNO DESC LIMIT 10 OFFSET 0;


SELECT COUNT(*)
FROM BOARD B JOIN MEMBER M ON(B.mNO = M.mNO)
WHERE 1 = 1 
AND B.STATUS = 'Y'
-- AND M.ID LIKE '%admin%' 
-- AND B.TITLE LIKE '%구매%' 
 AND B.CONTENT LIKE '%음식%';
    
    

-- SELECT  B.bNO, B.TITLE, M.ID, B.READCOUNT, B.ORIGINAL_FILENAME, B.RENAMED_FILENAME, B.CONTENT, B.CREATE_DATE, B.MODIFY_DATE
-- SELECT B.*, M.*, R.*, M2.*
-- SELECT *

SELECT  B.bNO, B.TITLE, M.ID, B.READCOUNT, B.ORIGINAL_FILENAME, B.RENAMED_FILENAME, B.CONTENT, B.CREATE_DATE, B.MODIFY_DATE,
		R.rNO as R_RNO, 
        R.bNO as R_BNO, 
        R.CONTENT as R_CONTENT, 
        M2.ID as R_ID, 
        R.CREATE_DATE as R_CREATE_DATE, 
        R.MODIFY_DATE as R_MODIFY_DATE
FROM BOARD B
JOIN MEMBER M ON(B.mNO = M.mNO)
LEFT OUTER JOIN REPLY R ON(R.bNO = B.bNO)
LEFT OUTER JOIN MEMBER M2 ON(R.mNO = M2.mNO)
WHERE B.STATUS = 'Y' AND  B.bNO=1;
    