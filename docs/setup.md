# Project Setup
You can access Passage in one of two ways

 1. Go through [Heroku]( https://fathomless-sea-16239.herokuapp.com/)
 2. Build it from source

### Building From Source

Either clone or download the proejct repository at https://github.com/lakarora/cs326-final-tau
 
Once you have either cloned or unzipped the file then make the project your current directory.

```
% cd C:/..../cs326-final-tau
```
Then afterwards you must install all of the project dependencies

```
% npm init -y
% npm install -g mongodb
% npm install -g typescript
% npm install -g express
% npm install --save-dev @types/node
```
Once this is done you can then start up the server and access it through the browser
```
% PORT=8080 ts-node --prefer-ts-exts server-main.ts
```
Access Passage at http://localhost:8080/