package com.multi.semi03.drug.model.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Drug {
	private int itemNo;
	private int itemSeq;
	private String itemName;
	private String entpName;
	private String itemImage;
	private String efcyQesitm;
    private String[] efcyQesitmItems;
	private String useMethodQesitm;
	private String atpnWarnQesitm;
	private String atpnQesitm;
	private String intrcQesitm;
	private String seQesitm;
	private String depositMethodQesitm;
	private String itemCoverImg;
	private String drugFront;
	private String drugShape;
	private String drugColor;
	private String formCode;
	private String itemLine;
}
