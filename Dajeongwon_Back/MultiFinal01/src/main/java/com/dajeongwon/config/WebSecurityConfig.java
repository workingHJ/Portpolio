package com.dajeongwon.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.stereotype.Component;

import com.dajeongwon.jwt.JwtAccessDeniedHandler;
import com.dajeongwon.jwt.JwtAuthenticationEntryPoint;
import com.dajeongwon.jwt.TokenProvider;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Configuration
@EnableWebSecurity
@Component
public class WebSecurityConfig {

    private final TokenProvider tokenProvider;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final JwtAccessDeniedHandler jwtAccessDeniedHandler;
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }


    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
//            .httpBasic().disable() 	// 만약 http방지하고 싶으면 이거 설정
            .csrf().disable()			// CSRF(Cross-Site Request Forgery)방지용. 일단 남겨놓음.
            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)	// 세션 생성 안함. 
            
            .and()
            .exceptionHandling()
            .authenticationEntryPoint(jwtAuthenticationEntryPoint)	// 인증되지 않은 사용자가 보호된 리소스에 접근하면 예외 처리함
            .accessDeniedHandler(jwtAccessDeniedHandler)			// 인증은 했지만 권한이 없으면 리소스에 접근했을 때 예외 처리(ADMIN, USER 구분) 
            
            .and()
            .authorizeRequests()	// 아래의 페이지에는 인증을 했을 때만 로그인 가능
            .requestMatchers("/garden/private/**", "/member/**").authenticated() // 경로 설정
            .anyRequest().permitAll() // 그 외의 모든 경로에 대해 인증 없이 접근 허용
            
            .and()
	        .apply(new JwtSecurityConfig(tokenProvider));
            
        // JwtSecurityConfig 등의 추가 설정
        // ...
        
        return http.build();
    }

}