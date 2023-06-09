package com.drhiromu.chatroom.message.service;

import com.drhiromu.chatroom.message.model.Message;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MessageService {
    private List<String> contents = new ArrayList<>();

    public void putContent(Message message){
        contents.add(message.getTextContent());
    }

    public void printContents(){
        for(String content:contents){
            System.out.println(content);
        }
    }
}
