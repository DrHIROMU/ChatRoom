package com.drhiromu.chatroom.redis.repository;

import com.drhiromu.chatroom.redis.model.Student;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends CrudRepository<Student, String> {

}

