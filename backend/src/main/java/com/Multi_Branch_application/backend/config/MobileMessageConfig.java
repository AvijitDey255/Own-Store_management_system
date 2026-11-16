package com.Multi_Branch_application.backend.config;

//import lombok.Value;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestClient;

@Configuration
public class MobileMessageConfig {

    @Value("${API_MOBILE_MESSAGE_URL}")
    private String API_MOBILE_MESSAGE_URL;

    @Bean
    public RestClient restClient() {

        return RestClient.builder()
                .baseUrl(API_MOBILE_MESSAGE_URL)
                .build();
    }
}
