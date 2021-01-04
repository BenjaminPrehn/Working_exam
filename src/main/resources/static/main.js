    // Update Student
    function updateStudent(id) {
        $.ajax({
            url: 'http://localhost:8080/api/students/' + id,
            method: 'GET',
            dataType: 'json',
            success: function(student) {
                $('#numberStudentId').val(student.studentId);
                $('#txtfirstname').val(student.firstname);
                $('#txtlastname').val(student.lastname);
                $('#txtemail').val(student.email);
                $('#numberSupervisorId').val(student.supervisor.supervisorId);
                getAllStudents();
            },
            error: function(error) {
                alert(error)
            }

        })
    }

    // Delete a student
    function deleteStudent(id) {
        $.ajax({
            url: 'http://localhost:8080/api/students/' + id,
            method: 'DELETE',
            success: function() {

                getAllStudents();
            },
            error: function(error) {
                alert(error);
            }
        })
    }

    // Get all Students
    function getAllStudents() {
        $.ajax({
            method: "GET",
            url: 'http://localhost:8080/api/students'
        }).done(function(data) {

            $('#tdata').empty();

            $.each(data, function(i, students) {
                // Loading data into table
                $('#tdata')
                    .append($("<tr>"))
                    .append($("<td>"))
                    .append($("<input type=\"text\" class=\"form-control\">").val(students.firstname))
                    .append($("</td>"))
                    .append($("<td>"))
                    .append($("<input type=\"text\" class=\"form-control\">").val(students.lastname))
                    .append($("</td>"))
                    .append($("<td>"))
                    .append($("<input type=\"text\" class=\"form-control\">").val(students.email))
                    .append($("</td>"))
                    .append($("<td>"))
                    .append($("<input type=\"text\" class=\"form-control\">").val(students.supervisor.firstname))
                    .append($("</td>"))
                    .append($("<td>"))
                    .append($("<button type='button' class='btn btn-primary' onclick=\"updateStudent(" + students.studentId + ")\">Update</button>"))
                    .append($("</td>"))
                    .append($("<td>"))
                    .append($("<button type='button' class='btn btn-danger' onclick=\"deleteStudent(" + students.studentId + ")\">Delete</button>"))
                    .append($("</td>"));
            });
        })
    }

    // Create a new studentw
    function createStudent() {

        var student = {};
        var supervisor = {};
        var dynamicURL = "";
        var methodName = "";

        $('#btnAddStudent').click(function() {

            student.firstname = $('#txtfirstname').val();
            student.lastname = $('#txtlastname').val();
            student.email = $('#txtemail').val();
            supervisor.supervisorId = $('#numberSupervisorId').val();
            student.supervisor = supervisor;
            var studentId = $('#numberStudentId').val();
            if (studentId) {
                student.studentId = $('#numberStudentId').val();
                dynamicURL = "http://localhost:8080/api/students/";
                methodName = "PUT";
            } else {
                dynamicURL = "http://localhost:8080/api/students/";
                methodName = "POST";
            }
            var studentObj = JSON.stringify(student);
            console.log(studentObj);
            $.ajax({
                url: dynamicURL,
                method: methodName,
                data: studentObj,
                contentType: 'application/json; charset=utf-8',
                success: function() {
                    console.log(methodName);
                    resetForm();
                    getAllStudents();
                },
                error: function(error) {
                    alert("A error have occured - Please do something else. Error Message: " + error);
                }
            })

        })

    }

    // Reset Create Student Form
    function resetForm() {
        $('#numberStudentId').val('');
        $('#txtfirstname').val('');
        $('#txtlastname').val('');
        $('#txtemail').val('');
        $('#numberSupervisorId').val('');
    }



    $(document).ready(function() {
        createStudent();
        getAllStudents();
    });