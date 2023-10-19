package com.dajeongwon.model.objectVo;

import com.dajeongwon.model.vo.Garden;
import com.dajeongwon.model.vo.Member;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class GardenNMember {
    private Garden garden;
    private Member member;
}
