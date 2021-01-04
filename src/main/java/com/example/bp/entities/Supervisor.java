package com.example.bp.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.List;

@Entity
public class Supervisor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long supervisorId;

    private String firstname;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "supervisor")
    private List<Student> students;

    public Supervisor() {
    }

    public Supervisor(String firstname, List<Student> students) {
        this.firstname = firstname;
        this.students = students;
    }

    public long getSupervisorId() {
        return supervisorId;
    }

    public void setSupervisorId(long supervisorId) {
        this.supervisorId = supervisorId;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public List<Student> getStudents() {
        return students;
    }

    public void setStudents(List<Student> students) {

        for(Student supervisor : students){
        supervisor.setSupervisor(this);
    }

        this.students = students;
    }

    @Override
    public String toString() {
        return "Supervisor{" +
                "students=" + students +
                '}';
    }
}
