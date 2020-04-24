window.onload = function () {
    document.getElementById("createAccountForm").addEventListener("submit", createAccount, false);
}

async function createAccount(event) : Promise<void> {
    (async () => {
        console.log("INSIDE ACCOUNT");
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
        var error = "";
        var valid = true;

        // Check if institution matches email
        var domain_name = email.substring(email.lastIndexOf('@') + 1);
        if(uni_to_email[institution] != domain_name) {
            alert("email address does not match institution");
        } else {
            // All input fiels are valid. Now we send a request to the server to see if this user already exists in the database.
            
        }
    })();
}