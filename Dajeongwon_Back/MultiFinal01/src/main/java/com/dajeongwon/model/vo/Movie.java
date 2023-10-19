package com.dajeongwon.model.vo;


import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Movie {
    private int mvno;
    private String movieId;
    private String title;
    private String titleEng;
    private Date releaseDate;
    private String directorNm;
    private String actorNm;
    private String company;
    private int prodYear;
    private String plotText;
    private String posters;
    private String genre;
    private String nation;
    private String Awards1;
    private String Awards2;
    private String rating;
    
}
