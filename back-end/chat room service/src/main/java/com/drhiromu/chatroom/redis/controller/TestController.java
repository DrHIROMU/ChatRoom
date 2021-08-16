package com.drhiromu.chatroom.redis.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;
import java.util.Date;

@Controller
public class TestController {

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

}
