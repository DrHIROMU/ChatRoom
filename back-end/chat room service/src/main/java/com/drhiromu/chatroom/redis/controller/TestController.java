package com.drhiromu.chatroom.redis.controller;

import com.drhiromu.chatroom.redis.service.ConnectService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
import java.util.Date;

@Slf4j
@RestController
public class TestController {
    @Autowired
    ConnectService connectService;

    public TestController() {
        // TODO Auto-generated constructor stub
    }

    @RequestMapping("/session/set")
    @ResponseBody
    public String set(HttpSession session) {
        String key = "test2";
        session.setAttribute(key, new Date());
        return key;
    }

    @RequestMapping("/session/get")
    @ResponseBody
    public String get(HttpSession session) {
        String value = (String) session.getAttribute("test").toString();
        return value;
    }

    @PostMapping("connect-to-user")
    public String connectToUser(){
        try{
            connectService.connectToUser();
        }catch (Exception ex){
            log.error("Connect Failed!\n", ex);
        }
        return "SUCCESS";
    }

}
