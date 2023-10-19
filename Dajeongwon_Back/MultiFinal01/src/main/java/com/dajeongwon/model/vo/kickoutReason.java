package com.dajeongwon.model.vo;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class kickoutReason {
	private int id;
	private int gNo;
	private int deportedMNo;
	private int executedMNo;
	private Date executedDate;
	private String reason;
	
	
}
