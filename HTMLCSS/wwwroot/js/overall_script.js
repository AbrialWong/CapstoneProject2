
    /* OnLoad, Success, Ready Function*/
        $(document).ready(function () { // using jquery method to get onload
        //this fires
        //when the browser starts
        GetData();
        });
        function Success(res) {

        $("#studName").val("");// clear textbox after record is added successfully
            $("#studDate").val("");// clear textbox after record is added successfully

            alert("Added Successfully");

            GetData(); // call this function to see whether data has been added or not
        }
        function Error(res) {
        alert("Error");
            console.log(res);
        }

        /*GetData Function, SuccessGet Function */
        function GetData() {

        $.get("http://localhost:3000/university/")
            .done(res => SuccessGet(res)) // wanna loop through some collection and get it
            .fail(res => Error(res));
        }
        function SuccessGet(res) {
        $('.table tr:not(:first)').remove(); // clear display but preserve 1st row
            for (temp of res) { // loop through result
        //alert(temp.name);

        $('.table').append('<tr id="' + temp.id + '"><td>'
            + temp.id + '</td><td>'
            + temp.name + '</td><td>'
            + temp.date + '</td><td>'
            + '<td><button type="button" class="glyphicon glyphicon-pencil" data-toggle="modal" data-target="#edit_Modal" onclick="EditStudent('+temp.id+')"></button></td><td>'
            + '<button type="button" class="glyphicon glyphicon-remove-circle" data-toggle="modal" onclick="DeleteStudent(' + temp.id +')"></button>'
            + '</td ></tr>'
        );
                // update, edit, delete
            }
        }

        /* Create Student */
        function CreateStudent() {
            var university = { };
            university.name = $("#txtName").val();
            university.date = $("#txtAdmissionDate").val();

            //alert(university.name); // popup window
            //alert(university.date); // popup window

            $.post("http://localhost:3000/university/"
                , university)
                .done(res => Success(res)) //can replace res with any name
                .fail(res => Error(res));
        }

        /* Edit Student */
        function EditStudent(id) {

    //extracting the value from the TR
    var tdid = $(".table").find('tr:eq(' + id + ')').find('td:eq(0)');  
    var sid = tdid.html(); //value    
     var tdname = $(".table").find('tr:eq(' + id + ')').find('td:eq(1)');
     var sname = tdname.html(); //value
     var tddate = $(".table").find('tr:eq(' + id + ')').find('td:eq(2)');
    var sdate = tddate.html(); //value

    
     //set the values
     $('#studId').val(sid);
     $('#studName').val(sname);
     $('#studAdmissionDate').val(sdate);

    //current_edit_row_details.name = name;
    //current_edit_row_details.email = email;
    //current_edit_row_details.password = password;
    //current_edit_row_details.current_row = $(this).closest('tr');

    //edit_dialogs.dialog("open");
}
        function UpdateStudent() {
    var university = {};
    university.id = $("#studId").val();
   university.name = $("#studName").val();
    university.date = $("#studAdmissionDate").val();

    $.ajax({
        url: "http://localhost:3000/university/" + university.id,
        type: 'PUT',
        data: university,
        success: Success
    });
    GetData();
}
        /* Delete Student */
function DeleteStudent(id) {
    EditStudent(id);
    var university = {};
    university.id = $("#studId").val();
    university.name = $("#studName").val();
    university.date = $("#studAdmissionDate").val();
    $.ajax({
        url: "http://localhost:3000/university/" + university.id,
        type: 'DELETE',
        data: university,
        success: Success
    });
    GetData();
}

