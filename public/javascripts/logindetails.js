$(document).ready(function () {
    $("#login").on("submit", function (e) {



        e.preventDefault();

        var email = $('#inputEmail3').val();
        var password = $('#inputPassword3').val();

        $.ajax({
            url: "http://localhost:3000/login",
            type: "GET",
            dataType: "json",

            data: { email : email  ,password : password },

            //ContentType: "application/json",
            success: function (response) {

                if(response.length > 0){

                    if(email=="admin@iFall.com" && password=="admin")
                    {
                        window.location.href="adminDashboard.html";
                    }
                    else{

                        sessionStorage.setItem("id",response[0].id);
                        sessionStorage.setItem("name",response[0].name);
                        window.location.href = "afterlogin.html";
                    }


                }else{
                    alert("Invalid Username / Password");
                }


            },
            error: function (err) {
                alert("entering error");
                alert(JSON.stringify(err));
            }
        })
    });
});