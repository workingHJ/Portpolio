package com.dajeongwon.model.vo;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Book {
    private int bNo;
    private String title;
    private String author;
    private String link;
    private String cover;
    private String publisher;
    private int priceStandard;
    private int priceSales;
    private Date pubDate;
    private String isbn13;
    private String categoryName;
    private String description;
    private Integer customerReviewRank;
    private String bestDuration;
    private Integer bestRank;
    private int selectCount; 
}
