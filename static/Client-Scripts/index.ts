const myURL = "http://localhost:8080/";
window.onload = function () {
    document.getElementById("signInButton").addEventListener("click", verifyLogin, false);
    document.getElementById("createAccount").addEventListener("click", loadCreateAccount, false);
}

async function getHash(OTP) : Promise<string> {
    const msg = new TextEncoder().encode(OTP);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msg);
    const hashArray = Array.from(new Uint8Array(hashBuffer));                     // convert buffer to byte array
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join(''); // convert bytes to hex string
    return hashHex;
}

async function verifyLogin() : Promise<void> {
    (async () => {

        // Match entire word. Usernames can only be alphanumeric
        let rexp = new RegExp('^[A-Za-z0-9]+$');

        // Cast because TypeScript takes it as HTMLElement which does not have value field
        var username = (<HTMLInputElement>document.getElementById("loginUsername")).value

        if(username.match(rexp) == null) {
            alert("Invalid username");
            return;
        }
        var password = (<HTMLInputElement>document.getElementById("loginPassword")).value;
        if(password.length < 6) {
            alert("Invalid password");
            return ;
        }
        const newURL = myURL + "login/";
        const resp = await fetch(newURL, 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        'email': username,
                        'password': await getHash(password)
                    }
                )
            });
        const responseJson = await resp.json();
        if(responseJson['result'] != 'success') {
            alert("Error while logging in");
            location.reload();
        }
        else {
            alert("Login successful");
            // Set cookie in browser for the logged in use and load the next page
            document.cookie = "username=" + username;

            // Now load the next page --> Options to buy, sell, rate users, and view user profile
            const newURL = myURL + "options/";
            window.open(newURL, "_self");
        }
    })();
}
async function loadCreateAccount() : Promise<void> {
    (async () => {
        const newURL = myURL + "createAccount/";
        window.open(newURL, "_self");
    })();
}

