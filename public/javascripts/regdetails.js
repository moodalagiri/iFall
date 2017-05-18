$(document).ready(function () {
    $("#register").on("submit", function (e) {
        alert("clicked");


        e.preventDefault();

        var name = $('#name').val();
        var email = $('#email').val();
        var pwd = $('#pwd').val();
        var gender = $('#gender').val();
        var dob= $('#dob').val();
        var age= $('#age').val();
        var height = $('#height').val();
        var width = $('#width').val();
        var addr1 = $('#addr1').val();
        var addr2 = $('#addr2').val();
        var state = $('#state').val();
        var city = $('#city').val();
        var zip = $('#zip').val();
        var mob = $('#mob').val();
        var ename1 = $('#ename1').val();
        var eemail1 = $('#eemail1').val();
        var emobile1 = $('#emobile1').val();
        var ename2 = $('#ename2').val();
        var eemail2 = $('#eemail2').val();
        var emobile2 = $('#emobile2').val();

        $.ajax({
            url: "http://localhost:3000/register",
            type: "POST",
            dataType: "json",

            data: { name: name,email : email  ,password : pwd , gender:gender, DOB :dob,age:age, height:height, width:width,address:addr1,address2:addr2,state: state, city: city,
                zipcode :zip,mobile: mob,	emergency1_name:ename1,emergency1_email:eemail1,emergency1_phone:emobile1,emergency2_name:ename2,
                emergency2_email:eemail2,emergency2_phone:emobile2},

            //ContentType: "application/json",
            success: function (response) {
                alert(JSON.stringify(response));
                window.location.href = "redirect.html";
            },
            error: function (err) {
                alert(JSON.stringify(err));
            }
        })
    });
});

