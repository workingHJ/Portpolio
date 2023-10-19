package com.dajeongwon.model.vo;

import lombok.AllArgsConstructor;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Art {
    private int aNo;
    private String title;
    private String category;
    private String creator;	// 작가, 감독, 제작사, 전시회장
    private String status;
    private String aImg;
    private int gNo;
    private int mvNo;
    private int seq;
    private String mt20id;
    private int bNo;
    private float rating;
    private int reviewCount;
    private String isActive;
    
    private String isbn;
}