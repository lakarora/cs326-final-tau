import { throws } from "assert";
import {secrets} from './../cs326-final-tau/secrets';
let http = require('http');
let url = require('url');
let express = require('express');
let path = require('path');
let nodemailer = require('nodemailer');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

export class Server {
    private db;
    private server = express();
    private port = process.env.PORT;
    private router = express.Router();

    // Leave out database part for now
    constructor(db) {
        this.db = db;
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
        this.router.post('/registerUser/', this.registerUser.bind(this));
        this.server.use('/', this.router);
        this.server.get('/options/', function(req, res) {
            res.type('.html');
            res.sendFile('selectActionAfterLogin.html', { root: "./static" });
        });
        this.server.get('/createAccount/', function(req, res) {
            res.type('.html');
            res.sendFile('createAccount.html', { root: "./static" });
        });
        this.server.post('/messages/', this.messagesHandler.bind(this));
        this.server.get('/messages', function(req, res) {
            res.type('.html');
            res.sendFile('messages.html', { root: "./static" });
        });
        this.server.post('/search/', this.searchBookHandler.bind(this));
        this.server.get('/search/', function(req, res) {
            res.type('.html');
            res.sendFile('searchBook.html', { root: "./static" });
        });
        this.server.get('/sell/', function(req, res) {
            res.type('.html');
            res.sendFile('sellBook.html', { root: "./static" });
        });

        this.router.post('/findUser/', this.findUserHandler.bind(this));

        this.server.get('/rate/', function(req, res) {
            res.type('.html');
            res.sendFile('findUserToRate.html', { root: "./static" });
        });
        
        this.router.post('/userRating/', this.rateUserHandler.bind(this));
        
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

        this.router.post('/setPrice/', this.amazonPriceHandler.bind(this));
        this.router.get('/setPrice/', function(req, res){
            res.type('html');
            res.sendFile('setPrice.html', {root: "./static"});
        });
        this.router.post('/postBook/', this.addBookHandler.bind(this));
        this.server.get('/rateUser/', function(req, res){
            res.type('.html');
            res.sendFile('userRating.html', {root: "./static"});
        });
        
    }   

    private getServer() {
        return this.server;
    }

    private async messagesHandler(request, response) : Promise<void> {
        let user = request.body.user;

        response.write(JSON.stringify({
            'result': 'success',
            'conversations': [
                    {
                        'username': 'Nathan',
                        'date': 'April 26',
                        'messages': [
                            {
                                'type': 'received',
                                'content': 'Hello can i buy the bio book?'
                            },
                            {
                                'type': 'sent',
                                'content': 'Ya totally are you good with the price?'
                            }
                        ]
                    }, 
                    {
                        'username': 'Nishad',
                        'date': 'April 24',
                        'messages': [
                            {
                                'type': 'sent',
                                'content': 'I saw the posting for the cs book would you be willing to negotiate?'
                            }
                        ]
                    }
                ]
        }));
    }

    private async registerUser(request, response) : Promise<void> {
        // Return dummy value for now
        response.write(JSON.stringify({
            'result': 'success'
        }));
        response.end();
    }
    private async userRatingHandler(request, response) : Promise<void> {
        let userRating = request.body.rating;
        let type = request.body.rating;
        let user = request.body.username;

        response.write(JSON.stringify({
            'result': 'success'
        }));
        response.end();
    }

    private async searchBookHandler(request,response) : Promise<void> {
        let searchType = request.body.type;

        if (searchType == 'byBook') {
            response.write(JSON.stringify({
                'result': "success",
                'searchResults': [{
                    'picture':'resources/no-image-listing.png',
                    'title': 'Book1',
                    'description':'Used this book last semester for BIO 289. Some highlighting on the inside. Other than that the books integrity is great. Message me if youd like to meet up and trade!',
                    'condition': 'New',
                    'account-link': '#',
                    'account-name': 'Minutemen2021',
                    'seller-rating': '4.6',
                    'price': '100',
                    'amazonPrice': '140'
                }]
            }));
            response.end();
        } else {
            response.write(JSON.stringify({
                'result': "success",
                'searchResults': [{
                    'picture':'resources/no-image-listing.png',
                    'title': 'Book1',
                    'description':'Used this book last semester for BIO 289. Some highlighting on the inside. Other than that the books integrity is great. Message me if youd like to meet up and trade!',
                    'condition': 'New',
                    'account-link': '#',
                    'account-name': 'Minutemen2021',
                    'seller-rating': '4.6',
                    'price': '100',
                    'amazonPrice': '140'
                }]
            }));
            response.end();
        }
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

    // dummy handler for checking if account exists
    private async checkNewAccount(request, response) : Promise<void> {
        var email = request.body.email;
        var fullName = request.body.fullname;

        // Check if email exists in db. If it does, return failure. 
        if(this.db.get({'email': email}, 'userInfo') != null) {
            response.write(JSON.stringify({
                'result': 'failure'
            }));
            response.end();
            return;
        }

        //If it does not, send a 6-digit OTP to this email and return the OTP and success to the client
        var OTP = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;

        // Send this OTP to the user for verification via email. 
        const oauth2Client = new OAuth2(
            secrets.clientId,
            secrets.clientSecret,
            "https://developers.google.com/oauthplayground"
       );
       oauth2Client.setCredentials({
           refresh_token: secrets.refreshToken
       });
       const accessToken = oauth2Client.getAccessToken();
       var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                    type: "OAuth2",
                    user:'lakshayarora3107@gmail.com',
                    clientId: secrets.clientId,
                    clientSecret: secrets.clientSecret,
                    refreshToken: secrets.refreshToken,
                    accessToken: accessToken
                }
        });

        var mailOptions = {
            from: 'lakshayarora3107@gmail.com',
            to: email,
            subject: 'Passage OTP Verification',
            text: 'Hi ' + fullName + '. Welcome to Passage! Enter this OTP for account verification: ' + OTP
        };
        transporter.sendMail(mailOptions, function(error, info) {
            if(error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        // Hard coded value returned for now
        response.write(JSON.stringify({
            'result': 'success',
            'OTP': OTP
        }));
        response.end();
    }

    // dummy handler that gets Amazon price using the scraper
    private async amazonPriceHandler(request, response) : Promise<void> {
        let isbn = request.body.isbn;
        // $.getJSON('https://fathomless-sea-16239.herokuapp.com/price?query=?', 
        // function(isbn, textStatus, jqXHR) {
        //     let r = JSON.parse(jqXHR.responseText);
        //     response.write(JSON.stringify({'amazon-price': r['amazon_price']}));
        //     response.end();
        // }
// )
        // send isbn and/or other data to the amazon scraper, get price
        var bookPrice = {'price': 27};
        response.write(JSON.stringify(bookPrice));
        response.end();
    }

    // dummy handler that posts book and sends response
    private async addBookHandler(request, response) : Promise<void> {
        var bookData = request.body;
        // send bookDat to the set of books, update user blah blah
        response.write(JSON.stringify({status: "success"}));
        response.end();
    }

    //dummy handler for findUser request 
    private async findUserHandler(request, response) : Promise<void> {
        var user = request.body.user;
        // query database to extract the ratings and info for "user"
        response.write(JSON.stringify({
            "status": 200,
            "username": user,
            "institute": "UMass Amherst",
            "sRating": 4.5,
            "bRating": 5 }));
        response.end();
    }

    //dummy handler for adding a rating
    private async rateUserHandler(request, response) : Promise<void> {
        var rating = request.body.rating;
        var rType = request.body.rType;
        var ratedUser = request.body.ratedUser;
        response.write(JSON.stringify({
            status: 200,
            result: "success"
        }));
        response.end();
    }

    public listen(port) : void {
        return this.server.listen(port);
    }

}