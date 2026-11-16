package com.Multi_Branch_application.backend.service;

import com.Multi_Branch_application.backend.dto.MessageResponse;
import com.Multi_Branch_application.backend.dto.MessageSendByEmailOrMobile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
public class MobileService {

    private final RestClient restClient;
    public MobileService(RestClient restClient) {
        this.restClient = restClient;
    }

    public String sendMessage(String mobile, String message) {

        MessageSendByEmailOrMobile request = new MessageSendByEmailOrMobile();
        request.setMobile(mobile);
        request.setMessage(message);


        String response = restClient.post()
                .uri("/api/send-message")
                .body(request)
                .retrieve()
                .body(String.class);

        return response;
    }
}
