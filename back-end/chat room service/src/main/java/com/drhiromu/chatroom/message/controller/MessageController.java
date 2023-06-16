package com.drhiromu.chatroom.message.controller;

import com.drhiromu.chatroom.message.vo.MessageVo;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class MessageController {
    @MessageMapping("/user-all")
    @SendTo("/topic/user")
    public MessageVo sendToAllUsers(@Payload MessageVo messageVo) {
        return messageVo;
    }

    @MessageMapping("/user/{userId}")
    @SendTo("/topic/user/{userId}")
    public MessageVo send(@DestinationVariable String userId, @Payload MessageVo messageVo) {
        return messageVo;
    }
}
