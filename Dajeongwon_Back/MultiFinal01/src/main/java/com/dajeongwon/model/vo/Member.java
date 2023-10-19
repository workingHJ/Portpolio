package com.dajeongwon.model.vo;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Member {
    private int mNo;
    private String email;
    private String password;
    private String nickName;
    private String mImg;
    private Date enrollDate;
    private Date modifiedDate;
    private String role;
    private String status;
    private String snsType;
    private String snsID;
    public int getId() {
        return mNo;
    }
    
}