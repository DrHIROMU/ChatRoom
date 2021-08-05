package com.drhiromu.chatroom.redis.model;

import lombok.Data;
import org.springframework.data.redis.core.RedisHash;

import java.io.Serializable;

@Data
@RedisHash("Student")
public class Student implements Serializable {
    public Student(){}

    public enum Gender {
        MALE, FEMALE
    }

    private String id;
    private String name;
    private Gender gender;
    private int grade;

}
