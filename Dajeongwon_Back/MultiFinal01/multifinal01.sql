DROP SCHEMA MULTIFINAL01;
CREATE SCHEMA MULTIFINAL01;
USE MULTIFINAL01;

-- DROP TABLE MEMBER;
CREATE TABLE MEMBER(
	mNo INT PRIMARY KEY AUTO_INCREMENT, 
    email VARCHAR(30) NOT NULL unique,
    password VARCHAR(100) NOT NULL,
    NICKNAME varchar(30) NOT NULL,
    mImg varchar(500),
    enrollDate DATE DEFAULT (CURRENT_DATE), 
    modifiedDate DATE DEFAULT (CURRENT_DATE), 
    role VARCHAR(20) DEFAULT 'ROLE_USER',
    STATUS VARCHAR(10) default 'ACTIVE',
    SNSTYPE VARCHAR(20) DEFAULT 'none',
    snsID VARCHAR(200) DEFAULT 'none'
);

-- ALTER TABLE member modify COLUMN mImg VARCHAR(300);
-- UPDATE member
-- SET role = 'ROLE_ADMIN'
-- where mNo=4;
select * from member;
-- UPDATE GardenOwner GO
-- 	    INNER JOIN Member m ON m.mNo = GO.mNo
-- 	    SET GO.is_Admin ='N'
-- 	    WHERE GO.mNo = 5;

-- INSERT INTO MEMBER (email, password, NICKNAME, mImg, enrollDate, modifiedDate, userInterest, isAdmin, STATUS, SNSTYPE, snsID)
-- VALUES
-- ('admin@dajeongwon.com', '1234', '어드민', NULL, NULL, NULL, '도서', 'Y', 'ACTIVE', NULL, NULL);

-- drop TABLE GARDEN;
CREATE TABLE IF not EXISTS GARDEN (
    g_no INT AUTO_INCREMENT PRIMARY KEY,
    accessType VARCHAR(10),
    title VARCHAR(40) NOT NULL,
    gDesc VARCHAR(500) NOT NULL,
    meetingDate DATE,
    regularTime VARCHAR(30),
    flower VARCHAR(30),
    flowerStatus int DEFAULT 1,
    headcount INT DEFAULT 1,
    capacity INT,
    imgPath VARCHAR(255),
	categories VARCHAR(300),
    tags VARCHAR(300),
    startDate DATE,
    endDate DATE,
	createDate DATE DEFAULT (CURRENT_DATE),
    modifedDate DATE DEFAULT (CURRENT_DATE),
    maker_mNo int not null
);

-- DROP TABLE GardenOwner;
CREATE TABLE GardenOwner(
    g_No INT,
    mNo INT, 
    is_Admin VARCHAR(20) DEFAULT 'N',
    FOREIGN KEY (g_No) REFERENCES GARDEN(g_No),
    FOREIGN KEY (mNo) REFERENCES member(mNo)
);


SELECT * FROM KickOutReason;
-- 관리자로 변경
-- update gardenowner
-- set is_Admin = 'N'
-- where g_no = 5 and mNo=5;
              
-- DROP TABLE Movies;
CREATE TABLE `movies` (
	 MVNO INT AUTO_INCREMENT PRIMARY KEY,
	`MOVIEID`	VARCHAR(100)NOT NULL,
	`TITLE`	VARCHAR(100)	NULL,
	`TITLEENG`	VARCHAR(3000)	NULL,
	`RELEASEDATE`	DATE	NULL,
	`DIRECTORNM`	VARCHAR(100)	 NULL,
	`ACTORNM`	VARCHAR(100)	NULL,
	`COMPANY`	VARCHAR(100)	NULL,
	`PRODYEAR`	INT,
	`PLOTTEXT`	VARCHAR(3000),
	`POSTERS`	VARCHAR(3000)	NULL,
	`GENRE`	VARCHAR(100)	NULL,
	`NATION`	VARCHAR(100)	NULL,
    Awards1 VARCHAR(3000) NULL,
    Awards2 VARCHAR(3000) NULL, 
    RATING  VARCHAR(500) NULL 
);
-- delete from movies;
-- alter table movies modify column actornm VARCHAR(3000)	NULL;

drop table Performance;
select * from Performance;
CREATE TABLE `Performance` (
	`mt20id`	VARCHAR(20)	primary KEY,
	`mt10id`	VARCHAR(40)	NULL,
	`prfnm`	VARCHAR(30)	NULL,
	`prfpdfrom`	DATE	NULL,
	`prfpdto`	DATE	NULL,
	`fcltynm`	VARCHAR(1000)	NULL,
	`poster`	VARCHAR(1000)	NULL,
	`genrenm`	VARCHAR(1000)	NULL,
	`prfstate`	VARCHAR(1000)	NULL,
	`openrun`	VARCHAR(1000)	NULL,
	`prfcast`	VARCHAR(1000)	NULL,
	`prfcrew`	VARCHAR(1000)	NULL,
	`prfage`	VARCHAR(1000)	NULL,
	`pcseguidance`	VARCHAR(1000)	NULL,
	`prfruntime`	VARCHAR(1000)	NULL,
	`awards`	VARCHAR(1000)	NULL,
    adres VARCHAR(1000),
    la VARCHAR(1000) comment '위도',
    lo VARCHAR(1000) comment '경도'
);

show columns from performance;

select * from performance where genrenm like '%뮤지컬%';
		SELECT mt20id, mt10id, prfnm, prfpdfrom, prfpdto, fcltynm, poster,
		genrenm, prfstate, openrun, prfcast, prfcrew, prfage, pcseguidance,
		prfruntime, awards from Performance WHERE 1=1 and genrenm like '%뮤지컬%';

update performance
set awards = "2008 SFCC Awards(외신기자단) 외신 기자상<br>제6회 2007 예그린뮤지컬어워드 대상<br>제11회 2005 한국뮤지컬대상 극본상<br>제11회 2005 한국뮤지컬대상 작사상<br>제4회 2000 더 뮤지컬 어워즈 작사작곡상<br>제4회 2000 더 뮤지컬 어워즈 극본상"
where mt20id = 'PF180108';

select * from member;
delete from member where mNo = 40;


CREATE TABLE `Exhibitions` (
	`seq`	INT primary KEY,
	`title`	VARCHAR(1000),
	`startDate`	DATE	,
	`endDate`	DATE	,
	`place`	VARCHAR(1000),
	`realmName`	VARCHAR(1000),
	`area`	VARCHAR(1000),
    `subTitle`	VARCHAR(1000),
     `price`	VARCHAR(1000),
     `contents1`	VARCHAR(1000),
     `contents2`	VARCHAR(1000),
     `url`	VARCHAR(1000),
	`phone`	VARCHAR(1000),
    `gpsX`	VARCHAR(1000),
	`gpsY`	VARCHAR(1000),
    `imgUrl`	VARCHAR(1000),
	`placeUrl`	VARCHAR(1000),
	`placeAddr`	VARCHAR(1000),
	`placeSeq`	INT
);

SELECT * FROM Exhibitions;
show columns from Exhibitions;
-- ALTER TABLE Exhibitions ADD COLUMN gpsY varchar(300) NULL;-- 
-- ALTER TABLE Exhibitions MODIFY title varchar(300) not null;

DROP TABLE BOOKS;
CREATE TABLE `Books` (
	`bNo`	INT	AUTO_INCREMENT primary KEY,
	`title`	VARCHAR(300)	NOT NULL,
	`author`	VARCHAR(300)	NOT NULL,
    link VARCHAR(500) NULL, 
	cover VARCHAR(100)	not NULL,
	`publisher`	VARCHAR(100)	NOT NULL,
    priceStandard INT,
	priceSales	INT	NOT NULL,
	pubDate	DATE	NOT NULL,
	isbn13	VARCHAR(100)	NOT NULL,
	categoryName	VARCHAR(100)	NOT NULL,
	description	VARCHAR(1000)	NULL,
    customerReviewRank INT NULL, 
    bestDuration VARCHAR(30) NULL, 
    bestRank INT NULL, 
    selectCount INT NULL
);



DROP TABLE artWork;
CREATE TABLE artWork (
    aNo INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(30),
    creator VARCHAR(50),
    category VARCHAR(50),
    status VARCHAR(30) DEFAULT 'INCOMPLETE',
    aImg VARCHAR(500),
    g_no INT NOT NULL,
    MVNO INT,
    exNo INT,
    mt20id VARCHAR(30),
    bNo INT, 
    rating FLOAT,             
    reviewCount INT,
    isActive VARCHAR(3) DEFAULT 'Y',
    FOREIGN KEY (g_no) REFERENCES garden(g_no),
    FOREIGN KEY (MVNO) REFERENCES Movies(MVNO),
    FOREIGN KEY (seq) REFERENCES exhibition(seq),
    FOREIGN KEY (mt20id) REFERENCES Performance(mt20id),
    FOREIGN KEY (bNo) REFERENCES BOOKs(bNO)
);

-- ALTER TABLE ARTWORK
-- ADD CONSTRAINT `mt20id` 
-- FOREIGN KEY (`mt20id`) 
-- REFERENCES Performance(mt20id);

DROP TABLE ARTWORK_REVIEW;
CREATE TABLE artWork_Review (
	rNo INT PRIMARY KEY auto_increment, 
    title VARCHAR(100) not null,
    content VARCHAR(10000) not null,
    createDate DATE DEFAULT (CURRENT_DATE),
    modifiedDate DATE DEFAULT (CURRENT_DATE),
    rate INT,
    mNo int not null,
    aNo int not null, 
    g_no int not null,
    STATUS varchar(5) DEFAULT 'Y',
    foreign key (g_no) REFERENCES GARDEN(g_no),
    foreign key (mNo) REFERENCES member(mNo),
    foreign key (aNo) REFERENCES Artwork(aNo)
);

-- DROP TABLE KickOutReason;
CREATE TABLE IF NOT EXISTS KickOutReason(
	reason_id INT PRIMARY KEY AUTO_INCREMENT, 
	g_no int not null,
    deported_mNo int not null,
    executed_mNo int not null,
    executeddate DATE DEFAULT (CURRENT_DATE),
    reason VARCHAR(500) NOT NULL, 
    foreign key (g_no) REFERENCES GARDEN(g_no),
    foreign key (deported_mNo) REFERENCES member(mNo)
);

SELECT * FROM KickOutReason;

select * from movies where POSTERS like '  ';

UPDATE MOVIES 
SET awards = "http://file.koreafilm.or.kr/thm/02/99/18/06/tn_DPF027398.jpg"
WHERE MVNO = 58480;

show columns from movies;


