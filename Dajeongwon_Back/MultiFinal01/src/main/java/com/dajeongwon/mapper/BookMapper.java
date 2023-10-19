package com.dajeongwon.mapper;

import org.apache.ibatis.annotations.Mapper;

import org.apache.ibatis.annotations.Param;

import com.dajeongwon.model.vo.Book;


@Mapper
public interface BookMapper {

    int countBookByIsbn(@Param("isbn13") String isbn13);

    int insertBook(Book book);

	Book getBookByIsbn(@Param("isbn13") String isbn13);

	int getBNoByIsbn13(String isbn);
}