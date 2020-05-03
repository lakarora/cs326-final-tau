import { userInfo } from "os";
// const myURL = "https://fathomless-sea-16239.herokuapp.com/";
const myURL = "http://localhost:8080/"

window.onload = function () {
    document.getElementById("createAccountForm").addEventListener("submit", createAccount, false);
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
 
}
async function getHash(OTP) : Promise<string> {
    const msg = new TextEncoder().encode(OTP);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msg);
    const hashArray = Array.from(new Uint8Array(hashBuffer));                     // convert buffer to byte array
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join(''); // convert bytes to hex string
    return hashHex;
}

async function createAccount(event) : Promise<void> {
    (async () => {
        event.preventDefault();
        var uni_to_email = {
            'umass': 'umass.edu',
            'smith': 'smith.edu',
            'mtholyoke': 'mtholyoke.edu',
            'amherstcol': 'amherst.edu',
            'hampshire': 'hampshire.edu'
        };
        // Validate the form fields
        var inputs = (<HTMLFormElement>document.getElementById("createAccountForm")).elements;
        var fullName = inputs["fullName"].value;
        var email = inputs["inputEmail"].value;
        var pwd = inputs["userPassword"].value;
        var institution = inputs["Institution"].value;
        var username = inputs['inputUsername'].value;

        // Check if institution matches email
        var domain_name = email.substring(email.lastIndexOf('@') + 1);
        if(uni_to_email[institution] != domain_name) {
            alert("Email address does not match institution");
            return;
        } else {
            // All input fiels are valid. Now we send a request to the server to see if this user already exists in the database.
            const newURL = myURL + "checkNewAccount/";
            const resp = await postData(newURL, {
                'email': email,
                'fullname': fullName
            });
            const responseJSON = await resp.json();
            if(responseJSON['result'] != 'success') {
                alert("There is already an account associated with this email");
                return;
            } 
            else {
                // There is no account associated with this email. Server sends success and a 6-digit OTP for verification
                var OTP = responseJSON['OTP'];

                // Save the form fields in sessionStorage for using in the next page
                sessionStorage.setItem("fullname", fullName);
                sessionStorage.setItem("email", email);
                sessionStorage.setItem("password", pwd);
                sessionStorage.setItem("institution", institution);
                var digest = await getHash(OTP);
                sessionStorage.setItem("OTP", digest);
                sessionStorage.setItem("username", username);

                // Now we load the new page for OTP verification
                const newURL = myURL + "verifyAccount/";
                window.open(newURL, "_self");
            }
        }
    })();
}