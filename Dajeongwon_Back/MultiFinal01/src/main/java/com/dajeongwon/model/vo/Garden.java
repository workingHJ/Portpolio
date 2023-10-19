package com.dajeongwon.model.vo;

import java.util.Date;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class Garden {
	private int gNo;
	private String accessType;
    private String title;
	private String description;
    private Date meetingDate;
	private String regularTime;
	private String flower;
	private int flowerStatus;
	private int headcount;
	private int capacity;
	private String imgPath;
    private List<String> categories;
    private List<String> tags;
    private Date  startDate;
    private Date  endDate;
	private Date  createDate;
	private Date  modifedDate;
	private int makerMNo;
	
	// 여기부터 DB엔 없음
	private String isAdmin;
	private String makerImg;
	private String makerNickName;
	private int completed;
	private int artTotal;
	
}
