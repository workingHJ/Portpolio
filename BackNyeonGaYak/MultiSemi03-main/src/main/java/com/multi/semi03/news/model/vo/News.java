package com.multi.semi03.news.model.vo;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class News {
	private int nw_no; 
    private String nw_title;
    private String nw_date;
    private int nw_rply;
    private int nw_share;
    private String nw_content;  
    private String nw_writer;
    private String nw_thumbnail; 
    private String nw_cate;
    private String nw_stata;

}
