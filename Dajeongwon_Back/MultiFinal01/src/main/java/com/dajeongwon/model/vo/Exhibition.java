package com.dajeongwon.model.vo;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Exhibition {
	private int	   seq;
	private String title;
	private Date 	startDate;
	private Date 	endDate;
	private String place;
	private String realmName;
	private String area;
	private String subTitle;
	private String price;
	private String contents1;
	private String contents2;
	private String url;
	private String phone;
	private String gpsX;
	private String gpsY;
	private String imgUrl;
	private String placeUrl;
	private String placeAddr;
	private int 	placeSeq;
	
}
