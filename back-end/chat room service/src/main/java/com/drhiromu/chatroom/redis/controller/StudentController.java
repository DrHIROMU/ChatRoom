package com.drhiromu.chatroom.redis.controller;

import com.drhiromu.chatroom.redis.model.Student;
import com.drhiromu.chatroom.redis.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/student")
public class StudentController {
//    @Autowired
//    StudentRepository studentRepository;
//
//    @PostMapping("add")
//    public void addStudent(@RequestBody Student student){
//        studentRepository.save(student);
//    }
//
//    @GetMapping("get")
//    public Student getStudent(@RequestParam String studentId){
//        Student student = studentRepository.findById(studentId).get();
//        return student;
//    }
//
//    @DeleteMapping("delete")
//    public void deleteStudent(@RequestParam String studentId){
//        studentRepository.deleteById(studentId);
//    }
}
