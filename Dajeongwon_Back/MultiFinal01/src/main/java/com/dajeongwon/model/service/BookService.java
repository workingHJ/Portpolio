package com.dajeongwon.model.service;

import com.dajeongwon.mapper.ArtMapper;
import com.dajeongwon.mapper.BookMapper;
import com.dajeongwon.model.vo.Book;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import com.google.gson.Gson;
import com.google.gson.annotations.SerializedName;

import java.util.List;

@Service
public class BookService {
    private final RestTemplate restTemplate;
    private final Gson gson;
    private BookMapper mapper;
    
    private ArtMapper artMapper;
    
    @Autowired
    public BookService(RestTemplate restTemplate, Gson gson, BookMapper mapper, ArtMapper artMapper) {
        this.restTemplate = restTemplate;
        this.gson = gson;
        this.mapper = mapper;
        this.artMapper = artMapper;
    }
    
    
    // ======================================= 검색해서 가져오는 거 ============================================== 
    @Transactional
    public List<Book> getBookList(String searchType, String searchTerm, String sort, int maxResult) {
        StringBuilder urlBuilder = new StringBuilder("http://www.aladin.co.kr/ttb/api/ItemSearch.aspx?"); // 기본 URL

        urlBuilder.append("ttbkey=ttbpam13032202001");
        urlBuilder.append("&Query=" + searchTerm);    // 검색어
        urlBuilder.append("&QueryType=" + searchType);    // 제목 / 작가 / 출판사 검색
        urlBuilder.append("&Sort="+sort);    // 정렬
        urlBuilder.append("&MaxResults=" + maxResult);
        urlBuilder.append("&start=" + "1");
        urlBuilder.append("&SearchTarget=Book&output=js&Version=20131101");
        urlBuilder.append("&Cover=" + "Big");

        String apiUrl = urlBuilder.toString();

        String jsonData = restTemplate.getForObject(apiUrl, String.class);

        List<Book> books = gson.fromJson(jsonData, BookList.class).getItems();
        
        insertBooks(books);

        return books;
    }
    
    // =========================================  목록 리스팅 =====================================================

    // 카테고리 클릭 시 추천목록 
    @Transactional
    public List<Book> getRecommendList(String CategoryId) {
    	return getBooksByQueryTypeAndCategory("ItemEditorChoice", CategoryId, 30);
    }
    
    // 주목할 만한 신간(프론트에서 SSR로딩)
    @Transactional
    public List<Book> getNewList(int count) {
    	return getBooksByQueryTypeAndCategory("ItemNewSpecial", null, count);
    }
    
    
    //  주간 베스트셀러
    @Transactional
    public List<Book> getBestSellsList(int count) {
    	return getBooksByQueryTypeAndCategory("Bestseller", null, count);
    }
    
    
    
    // ====================================== 상세 페이지  =======================================

	public Book getBookDetail(String isbn13) {
		int count = mapper.countBookByIsbn(isbn13);
		if(count == 0) {
			System.out.println("DB에 없음!!!!!!!!!!!");
			return null;
		}
		Book result =  mapper.getBookByIsbn(isbn13);
		if(result == null) {
			System.out.println("데이터 조회 오류 발생!!!!!!!!! ");
			return null;
		}
		return result;
	}
	
    
    
    // ======================================= 공용 Method ============================================== 
    
    
    // JSON으로 보내주는 거
    private static class BookList {
        @SerializedName("item")
        private List<Book> items;

        public List<Book> getItems() {
            return items;
        }
    }
    
    // DB에 넣는 거 
	private void insertBooks(List<Book> books) {
		for(Book book : books) {
        	String isbn13 = book.getIsbn13();
        	int count = mapper.countBookByIsbn(isbn13);	// ISBN으로 이미 DB에 있는지 체크
        	if(count == 0) {
        		if(mapper.insertBook(book) != 1) { 	//없으면 추가
        			throw new RuntimeException("mapper에서 오류남!!!!!!!");
        		}
        	}
        }
	}
	
	/**
	 * 리스트로 조회하는 거 
	 *
	 * @param queryType ItemNewSpecial, ItemEditorChoice, Bestseller 중 하나를 선택하여 사용합니다.
	 * @param categoryId 장르별로 선택할 수 있습니다. 만약 장르를 선택하지 않으려면 null을 전달하세요.
	 * @param count 전체 도서 개수
	 * @return 도서 목록
	 */
    private List<Book> getBooksByQueryTypeAndCategory(String queryType, String categoryId, int count) {
        StringBuilder urlBuilder = new StringBuilder("http://www.aladin.co.kr/ttb/api/ItemList.aspx");

        urlBuilder.append("?ttbkey=ttbpam13032202001");
        urlBuilder.append("&QueryType=").append(queryType);
        if (categoryId != null) {
            urlBuilder.append("&CategoryId=").append(categoryId);
        }
        urlBuilder.append("&MaxResults=").append(count);
        urlBuilder.append("&start=1");
        urlBuilder.append("&SearchTarget=Book&output=js&Version=20131101");
        urlBuilder.append("&Cover=Big");

    	String apiUrl = urlBuilder.toString();
    	
    	String jsonData = restTemplate.getForObject(apiUrl, String.class);
    	
    	List<Book> books = gson.fromJson(jsonData, BookList.class).getItems();
    	
    	insertBooks(books);
    	return books;
    }


	public int getBNoByIsbn13(String isbn) {
		return mapper.getBNoByIsbn13(isbn);
	}

}
