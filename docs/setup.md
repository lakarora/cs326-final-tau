# Project Setup
You can access Passage in one of two ways

 1. **Go through [Heroku]( https://fathomless-sea-16239.herokuapp.com/)**
 This is the recommended way as you do not need to set up authentication keys and configure a secrets file with your own credentials.
 2. **Build it from source**

## Building From Source

Either clone or download the proejct repository at https://github.com/lakarora/cs326-final-tau
 
Once you have either cloned or unzipped the file then make the project your current directory.

```
% cd C:/..../cs326-final-tau
```
### Install Dependencies
Prerequisites: Node.js must be installed on your system.

```
% npm init -y
% npm install -g mongodb
% npm install -g typescript
% npm install -g express
% npm install nodemailer
% npm install xoauth2
% npm install jquery 
% npm install googleapis
% npm install --save-dev @types/node
```
### Configure secrets.ts file
You also need a secrets.json file in the root directory of the project which will have the credentials for sending emails, and Twilio chat API keys for messaging, and the connection uri to your MongoDB database. To be able to send emails for OTP verification, you need to use Google API console to configure a refresh token, clientId, clientSecret for your gmail account and include these along with your password. To generate the Twilio chat API keys, you need to create an account on Twilio and create a new chat API project and include the keys in the secrets.ts file. The structure of the secrets. ts file is as follows: -
export const secrets = {
    emailPassword: 'Your email',
    clientId: xxx,
    clientSecret: xxx,
    refreshToken: xxx,
    MongoURI: xxx,
    TWILIO_ACCOUNT_SID: xxx,
    TWILIO_API_KEY: xxx,
    TWILIO_API_SECRET: xxx,
    TWILIO_CHAT_SERVICE_SID: xxx
}

### Modify localhost and run
Uncomment the myURL line that sets the host to 'localhost:8080' at the top of each .ts file in static/Client-scripts directory and comment out the heroku URL. Run this command (for MAC OS or Linux users) in the Client-scripts directory for compiling all the .ts files: 'for i in *.ts; do tsc $i; done'. Once this is done you can then start up the server and access it through the browser as follows: -
```
% PORT=8080 ts-node --prefer-ts-exts server-main.ts
```
Access Passage at http://localhost:8080/