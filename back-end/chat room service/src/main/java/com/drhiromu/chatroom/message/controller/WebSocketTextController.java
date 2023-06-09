package com.drhiromu.chatroom.message.controller;

import com.drhiromu.chatroom.message.dto.TextMessageDTO;
import com.drhiromu.chatroom.message.model.Message;
import com.drhiromu.chatroom.message.repository.MessageRepository;
import com.drhiromu.chatroom.message.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class WebSocketTextController {
    @Autowired
    SimpMessagingTemplate template;

    @PostMapping("/send")
    public ResponseEntity<Void> sendMessage(@RequestBody TextMessageDTO textMessageDTO) {
        template.convertAndSend("/topic/message", textMessageDTO);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @MessageMapping("/sendMessage")
    public void receiveMessage(@Payload TextMessageDTO textMessageDTO) {
        // receive message from client
    }


    @SendTo("/topic/message")
    public TextMessageDTO broadcastMessage(@Payload TextMessageDTO textMessageDTO) {
        return textMessageDTO;
    }

//    @Autowired
//    MessageService messageService;
//
//    @PostMapping("/announcement")
//    public ResponseEntity<Void> sendMessage(@RequestBody TextMessageDTO textMessageDTO) {
//        template.convertAndSend("/topic/message", textMessageDTO);
//        return new ResponseEntity<>(HttpStatus.OK);
//    }
//
//    @MessageMapping("/sendMessage")
//    @SendTo("/topic/message")
//    public TextMessageDTO receiveMessage(@Payload TextMessageDTO textMessageDTO) {
//         return textMessageDTO;
//    }
//
//    @PostMapping("text")
//    public void text(@RequestBody Message message){
//        messageService.putContent(message);
//    }
//
//    @PostMapping("printContents")
//    public void printContents(){
//        messageService.printContents();
//    }
}
