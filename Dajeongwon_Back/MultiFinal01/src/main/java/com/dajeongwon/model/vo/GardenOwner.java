package com.dajeongwon.model.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GardenOwner {
	private int gNo;
	private int mNo;
	private String isAdmin;
}
