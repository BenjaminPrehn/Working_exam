package com.example.bp.dao;

import com.example.bp.entities.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student, Long> {

    public Student findByStudentId (long theId);


}
