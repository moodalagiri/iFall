$(document).ready(function () {

    if(!sessionStorage.getItem("id")){
        window.location.href="index.html";
    }
    var id = sessionStorage.getItem("id");
    getProfileData(id);
    $("#update").on("submit", function (e) {

        e.preventDefault();
        updateData();




    });
});


function getProfileData(uid){
    $.ajax({
        url: "http://localhost:3000/update?id="+uid,
        type: "GET",
        dataType: "json",
        success: function (response) {


            $('#name').val(response.name)  ;
            $('#email').val(response.email);
            $('#pwd').val(response.password);
            $('#gender').val(response.gender);
            $('#dob').val(response.DOB);
            $('#age').val(response.age);
            $ ('#height').val(response.height);
            $('#width').val(response.width);
            $('#addr1').val(response.address);
            $('#addr2').val(response.address2);
            $('#state').val(response.state);
            $('#city').val(response.city);
            $('#zip').val(response.zipcode);
            $('#mob').val(response.mobile);
            $('#ename1').val(response.emergency1_name);
            $('#eemail1').val(response.emergency1_email);
            $('#emobile1').val(response.emergency1_phone);
            $('#ename2').val(response.emergency2_name);
            $('#eemail2').val(response.emergency2_email);
            $('#emobile2').val(response.emergency1_phone);


        },
        error: function (err) {
            alert(JSON.stringify(err));
        }
    });
}

function updateData(){

    var id=sessionStorage.getItem("id");
    var name = $('#name').val();
    var email = $('#email').val();
    var pwd = $('#pwd').val();
    var gender = $('#gender').val();
    var dob= $('#dob').val();
    var age=$('#age').val();
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
        url: "http://localhost:3000/update/updateData",
        type: "POST",
        dataType: "json",

        data: { name: name,email : email  ,password : pwd , gender:gender, DOB :dob, age:age,height:height, width:width,address:addr1,address2:addr2,state: state, city: city,
            zipcode :zip,mobile: mob,	emergency1_name:ename1,emergency1_email:eemail1,emergency1_phone:emobile1,emergency2_name:ename2,
            emergency2_email:eemail2,emergency2_phone:emobile2,id:id},

        //ContentType: "application/json",
        success: function (response) {

            var msg="Details Updated!";
            $("#success").modal("toggle");
            $("#getCode").html(msg);
        },
        error: function (err) {
            alert(JSON.stringify(err));
        }
    })

}
