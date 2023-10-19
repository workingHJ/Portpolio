package com.dajeongwon.model.objectVo;

import java.util.Date;


import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MemberfromGNo {
    private int mNo;
    private String email;
    private String nickName;
    private String mImg;
    private String role;
    private String status;
    private String snsType;
    private String snsID;
    
    private String gardenAdmin;
    
}