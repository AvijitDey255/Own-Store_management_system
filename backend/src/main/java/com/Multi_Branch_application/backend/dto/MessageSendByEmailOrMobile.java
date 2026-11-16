package com.Multi_Branch_application.backend.dto;

import lombok.Data;

@Data
public class MessageSendByEmailOrMobile {
    private String email;
    private String mobile;
    private String message;
}
