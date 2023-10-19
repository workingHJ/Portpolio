package com.dajeongwon.model.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ArtReview {
	private int rNo;
	private String title;
	private String content;
	private String createDate;
	private String modifiedDate;
	private float rate;
	private int mNo;
	private int aNo;
	private int gNo;
	
	// DB에 없는 거
	private String writerNickName;
	private String writerImg;
	private String writerSNStype;
	
	private String aTitle;
	private String aImg;
	private String gTitle;
	private String accessType;
}
