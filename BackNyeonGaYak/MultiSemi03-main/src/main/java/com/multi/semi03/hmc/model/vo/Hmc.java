package com.multi.semi03.hmc.model.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Hmc {
	private int hmcno;
	private String hmcNm;
	private String locAddr;
	private String hmcTelNo;
	private String siDoCd;
	private String siGunGuCd;
	private String grenChrgTypeCd;
	private String ichkChrgTypeCd;
	private String mchkChrgTypeCd;
	private String bcExmdChrgTypeCd;
	private String ccExmdChrgTypeCd;
	private String cvxcaExmdChrgTypeCd;
	private String lvcaExmdChrgTypeCd;
	private String stmcaExmdChrgTypeCd;
	private String cxVl;
	private String cyVl;
	private String hmcImg;
}
