const myURL = "http://localhost:8080/";

window.onload = function() {
    document.getElementById("verifyOTPButton").addEventListener("click", verifyOTP, false);
}

async function postData(url : string, data: any) {
    const resp = await fetch(url,
                             {
                                 method: 'POST',
                                 mode: 'cors',
                                 cache: 'no-cache',
                                 credentials: 'same-origin',
                                 headers: {
                                     'Content-Type': 'application/json'
                                 },
                                 redirect: 'follow',
                                 body: JSON.stringify(data)
                             });
    return resp;
 
}''
async function verifyOTP() : Promise<void> {
    (async () => {
        if(sessionStorage.length == 0)
        {
            alert("Visit Account Creation page before landing here!");
            location.replace(myURL + "createAccount/");
        }
        var pwd = sessionStorage.getItem("password");
        var fname = sessionStorage.getItem("fullname");
        var email = sessionStorage.getItem("email");
        var uni = sessionStorage.getItem("institution");
        var OTP = sessionStorage.getItem("OTP");
        var userOTP = (<HTMLInputElement>document.getElementById("otp")).value;
        var username = sessionStorage.getItem("username");
        console.log(userOTP);
        console.log(typeof(userOTP));
        // Use hardcoded value for now, email is not set up
        if(userOTP != '123456') {
            alert("Invalid OTP. Please try again!");
            location.reload();            
        }

        // OTP is valid. Register the user
        const newURL = myURL + "registerUser/";
        console.log(newURL);
        const resp = await postData(newURL, {
            // 'fullname': fname,
            'email': email
            // 'password': pwd,
            // 'institution': uni,
            // 'username': username
        });
        const respJSON = await resp.json();
        if(respJSON['result'] != 'success') {
            alert("An error occured. Please try again");
            sessionStorage.clear();
            window.open(myURL + 'createAccount/', "self");
        } 
        else {
            alert("User registration successful. Please login with your new credentials!");
            sessionStorage.clear();
            window.open(myURL, "_self");
        }
    })();
}