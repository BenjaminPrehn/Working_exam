package com.example.bp.restControllers;

import com.example.bp.entities.Student;
import com.example.bp.services.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class StudentController {

    @Autowired
    StudentService studentService;

    // Get all students
    @GetMapping("/students")
    public List<Student> getAllStudents(){
        return studentService.findAll();
    }

    // Get student by ID
    @GetMapping("/students/{studentId}")
    public Student getStudentById(@PathVariable int studentId){
        Student student = studentService.findStudentById(studentId);
        return student;
    }

    // Create new Student
    @PostMapping("/students")
    public Student addNewStudent(@RequestBody Student student){
        return studentService.save(student);
    }

    // Update a student
    @PutMapping("/students")
    public Student updateStudent(@RequestBody Student student){
        return studentService.save(student);
    }

    // Delete Student
    @DeleteMapping("/students/{studentId}")
    void deleteStudent(@PathVariable Long studentId){
        studentService.delete(studentId);
    }

}
