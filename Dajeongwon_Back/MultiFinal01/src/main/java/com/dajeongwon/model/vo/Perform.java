package com.dajeongwon.model.vo;

import java.time.LocalDate;
import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Perform {
	private String mt20id;
	private String mt10id;
	private String prfnm;
	private Date prfpdfrom;
	private Date prfpdto;
	private String fcltynm; // 공연장이름
	private String poster;
	private String genrenm;
	private String prfstate;
	private String openrun;
	private String prfcast; // 출연진
	private String prfcrew; // 제작진
	private String prfage; // 관람연령
	private String pcseguidance; // 공연 가격등 세부사항
	private String prfruntime; // 공연 시간
	private String awards;
	private String adres;
	private String la;
	private String lo;

}
