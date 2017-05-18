$(document).ready(function () {
    $.ajax({
        url: "http://localhost:3000/view",
        type: "GET",
        dataType: "json",
        success: function (data) {
           $('#datatable').dataTable({
               data:data,
               //
               columns:[
                   {'data':'name'},
                   {'data':'email'},
                   {'data':'DOB'},
                   {'data':'height'},
                   {'data':'width'},
                   {'data':'state'},
                   {'data':'city'},
                   {'data':'zipcode'},
                   {'data':'mobile'}

               ]
               //"aoColumns": [
               //    { "sTitle": "Engine" },
               //    { "sTitle": "Browser" },
               //    { "sTitle": "Platform" },
               //    { "sTitle": "Version"}
               //]
           });
            $( "#datatable" ).DataTable();
        },
        error: function (err) {
            alert(JSON.stringify(err));
        }
    });

});