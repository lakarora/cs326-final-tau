let http = require('http');
let url = require('url');
let express = require('express');
let path = require('path');
export class Server {
    private server = express();
    private port = 8080;
    private router = express.Router();

    // Leave out database part for now
    constructor() {
        this.router.use((request, response, next) => {
            response.header('Content-Type','application/json');
            response.header('Access-Control-Allow-Origin', '*');
            response.header('Access-Control-Allow-Headers', '*');
        next();
        });

        // Serve static pages from a particular path.
        this.server.use('/', express.static('./static'));
        // Handle POST data as JSON
        this.server.use(express.json());
        this.router.post('/login/', this.loginHandler.bind(this));
        this.server.use('/', this.router);
        this.server.get('/options/', function(req, res) {
            res.type('.html');
            res.sendFile('selectActionAfterLogin.html', { root: "./static" });
        });
        this.server.get('/createAccount/', function(req, res) {
            res.type('.html');
            res.sendFile('createAccount.html', { root: "./static" });
        });
        this.server.get('/search/', function(req, res) {
            res.type('.html');
            res.sendFile('searchBook.html', { root: "./static" });
        });
        this.server.get('/sell/', function(req, res) {
            res.type('.html');
            res.sendFile('sellBook.html', { root: "./static" });
        });
        this.server.get('/rate/', function(req, res) {
            res.type('.html');
            res.sendFile('findUserToRate.html', { root: "./static" });
        });
        this.router.post('/accountInfo/', this.accountInfoHandler.bind(this));
        this.server.get('/accountInfo/', function(req, res){
            res.type('.html');
            res.sendFile('accountInfo.html', { root: "./static"});
        });
        this.router.post('/checkNewAccount/', this.checkNewAccount.bind(this));
        this.router.get('/verifyAccount/', function(req, res) {
            res.type('html');
            res.sendFile('verifyOTP.html', {root: "./static"});
        });
    }   
    
    private getServer() {
        return this.server;
    }
    private async loginHandler(request, response) : Promise<void> {

        // Leaving dummy code for now
        response.write(JSON.stringify(
            {
                'result': 'success'
            }
        ));
        response.end();
    }

    // dummy handler for the Account Info page
    private async accountInfoHandler(request, response) : Promise<void> {
        var username = request.body.username;
        response.write(JSON.stringify({
            "result": "success",
            "username": username,
            "fullName": "user 1",
            "institution": "UMass Amherst",
            "sRating": 4.5,
            "bRating": 3.5 }));
        response.end();
    }
    private async checkNewAccount(request, response) : Promise<void> {
        var email = request.body.email;
        // Check if email exists in db. If it does, return failure. 
        //If it does not, send a 6-digit OTP to this email and return the OTP and success to the client
        var OTP = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
        response.write(JSON.stringify({
            'result': 'success',
            'OTP': OTP
        }));
        response.end();
    }
    public listen(port) : void {
        return this.server.listen(port);
    }
}