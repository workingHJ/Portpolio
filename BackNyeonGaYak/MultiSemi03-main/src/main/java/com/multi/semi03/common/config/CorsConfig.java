package com.multi.semi03.common.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/*
 * @Configuration public class CorsConfig implements WebMvcConfigurer {
 * 
 * 
 * @Override public void addCorsMappings(CorsRegistry registry) {
 * registry.addMapping("/**") // 모든 경로에 대해 CORS 허용
 * .allowedOrigins("http://localhost:8080", "*.mfds.go.kr") // 허용할 출처 설정
 * .allowedMethods("GET", "POST", "PUT", "DELETE") // 허용할 HTTP 메서드 설정
 * .allowedHeaders("Content-Type") // 허용할 요청 헤더 설정 .allowCredentials(true); //
 * 인증 정보 허용 여부 설정 }
 * 
 * }
 */