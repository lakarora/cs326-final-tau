const myURL = "http://localhost:8080/";
window.onload = function () {
    document.getElementById("loginButton").addEventListener("click", verifyLogin);
}

async function getHash(OTP) : Promise<string> {
    const msg = new TextEncoder().encode(OTP);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msg);
    const hashArray = Array.from(new Uint8Array(hashBuffer));                     // convert buffer to byte array
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join(''); // convert bytes to hex string
    return hashHex;
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


async function verifyLogin() : Promise<void> {
    (async () => {

        // Match entire word. Usernames can only be alphanumeric
        let rexp = new RegExp('^[A-Za-z0-9]+$');

        // Cast because TypeScript takes it as HTMLElement which does not have value field
        var userName = (<HTMLInputElement>document.getElementById("loginUsername")).value

        if(userName.match(rexp) == null) {
            alert("Invalid username");
            return;
        }
        var password = (<HTMLInputElement>document.getElementById("loginPassword")).value;
        if(password.length < 6) {
            alert("Invalid password");
            return ;
        }
        const hashPwd = await getHash(password);
        const newURL = myURL + "login/";
        const responseJson = await postData(newURL, {
            "username": userName,
            "password": hashPwd
        }).then(
            val => {
                return val.json();
            },
            reason => {
                console.log(reason);
                return JSON.stringify({'result': 'failure'});
            }
        );
        if(responseJson['result'] != "success") {
            alert("Error while logging in");
            return;
        }
        else 
        {
            alert("Login successful");
            // Set username in session storage for verification on future pages
            sessionStorage.setItem('currentUser', userName);
            // Now load the next page --> Options to buy, sell, rate users, and view user profile
            const newURL = myURL + "options/";
            window.open(newURL, "_self");
        }
    })();
}