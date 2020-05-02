"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var secrets_1 = require("./../cs326-final-tau/secrets");
var http = require('http');
var url = require('url');
var express = require('express');
var path = require('path');
var nodemailer = require('nodemailer');
var google = require("googleapis").google;
var OAuth2 = google.auth.OAuth2;
var Server = /** @class */ (function () {
    // Leave out database part for now
    function Server() {
        this.server = express();
        this.port = process.env.PORT;
        this.router = express.Router();
        this.router.use(function (request, response, next) {
            response.header('Content-Type', 'application/json');
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
        this.server.get('/options/', function (req, res) {
            res.type('.html');
            res.sendFile('selectActionAfterLogin.html', { root: "./static" });
        });
        this.server.get('/createAccount/', function (req, res) {
            res.type('.html');
            res.sendFile('createAccount.html', { root: "./static" });
        });
        this.server.post('/messages/', this.messagesHandler.bind(this));
        this.server.get('/messages', function (req, res) {
            res.type('.html');
            res.sendFile('messages.html', { root: "./static" });
        });
        this.server.post('/search/', this.searchBookHandler.bind(this));
        this.server.get('/search/', function (req, res) {
            res.type('.html');
            res.sendFile('searchBook.html', { root: "./static" });
        });
        this.server.get('/sell/', function (req, res) {
            res.type('.html');
            res.sendFile('sellBook.html', { root: "./static" });
        });
        this.router.post('/findUser/', this.findUserHandler.bind(this));
        this.server.get('/rate/', function (req, res) {
            res.type('.html');
            res.sendFile('findUserToRate.html', { root: "./static" });
        });
        this.router.post('/accountInfo/', this.accountInfoHandler.bind(this));
        this.server.get('/accountInfo/', function (req, res) {
            res.type('.html');
            res.sendFile('accountInfo.html', { root: "./static" });
        });
        this.router.post('/checkNewAccount/', this.checkNewAccount.bind(this));
        this.router.get('/verifyAccount/', function (req, res) {
            res.type('html');
            res.sendFile('verifyOTP.html', { root: "./static" });
        });
        this.router.post('/setPrice/', this.amazonPriceHandler.bind(this));
        this.router.get('/setPrice/', function (req, res) {
            res.type('html');
            res.sendFile('setPrice.html', { root: "./static" });
        });
        this.router.post('/postBook/', this.addBookHandler.bind(this));
        this.server.get('/rateUser/', function (req, res) {
            res.type('.html');
            res.sendFile('userRating.html', { root: "./static" });
        });
<<<<<<< HEAD
=======
        this.router.post('/findUser/', this.findUserHandler.bind(this));
>>>>>>> 2837e33d3666a0164b3a980aa1d20344fbe3f71f
    }
    Server.prototype.getServer = function () {
        return this.server;
    };
    Server.prototype.messagesHandler = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                user = request.body.user;
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
                return [2 /*return*/];
            });
        });
    };
    Server.prototype.registerUser = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // Return dummy value for now
                response.write(JSON.stringify({
                    'result': 'success'
                }));
                response.end();
                return [2 /*return*/];
            });
        });
    };
    Server.prototype.userRatingHandler = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var userRating, type, user;
            return __generator(this, function (_a) {
                userRating = request.body.rating;
                type = request.body.rating;
                user = request.body.username;
                response.write(JSON.stringify({
                    'result': 'success'
                }));
                response.end();
                return [2 /*return*/];
            });
        });
    };
    Server.prototype.searchBookHandler = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var searchType;
            return __generator(this, function (_a) {
                searchType = request.body.type;
                if (searchType == 'byBook') {
                    response.write(JSON.stringify({
                        'result': "success",
                        'searchResults': [{
                                'picture': 'resources/no-image-listing.png',
                                'title': 'Book1',
                                'description': 'Used this book last semester for BIO 289. Some highlighting on the inside. Other than that the books integrity is great. Message me if youd like to meet up and trade!',
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
                else {
                    response.write(JSON.stringify({
                        'result': "success",
                        'searchResults': [{
                                'picture': 'resources/no-image-listing.png',
                                'title': 'Book1',
                                'description': 'Used this book last semester for BIO 289. Some highlighting on the inside. Other than that the books integrity is great. Message me if youd like to meet up and trade!',
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
                return [2 /*return*/];
            });
        });
    };
    Server.prototype.loginHandler = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // Leaving dummy code for now
                response.write(JSON.stringify({
                    'result': 'success'
                }));
                response.end();
                return [2 /*return*/];
            });
        });
    };
    // dummy handler for the Account Info page
    Server.prototype.accountInfoHandler = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var username;
            return __generator(this, function (_a) {
                username = request.body.username;
                response.write(JSON.stringify({
                    "result": "success",
                    "username": username,
                    "fullName": "user 1",
                    "institution": "UMass Amherst",
                    "sRating": 4.5,
                    "bRating": 3.5
                }));
                response.end();
                return [2 /*return*/];
            });
        });
    };
    // dummy handler for checking if account exists
    Server.prototype.checkNewAccount = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var email, fullName, OTP, oauth2Client, accessToken, transporter, mailOptions;
            return __generator(this, function (_a) {
                email = request.body.email;
                fullName = request.body.fullname;
                OTP = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
                oauth2Client = new OAuth2(secrets_1.secrets.clientId, secrets_1.secrets.clientSecret, "https://developers.google.com/oauthplayground");
                oauth2Client.setCredentials({
                    refresh_token: secrets_1.secrets.refreshToken
                });
                accessToken = oauth2Client.getAccessToken();
                transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        type: "OAuth2",
                        user: 'lakshayarora3107@gmail.com',
                        clientId: secrets_1.secrets.clientId,
                        clientSecret: secrets_1.secrets.clientSecret,
                        refreshToken: secrets_1.secrets.refreshToken,
                        accessToken: accessToken
                    }
                });
                mailOptions = {
                    from: 'lakshayarora3107@gmail.com',
                    to: email,
                    subject: 'Passage OTP Verification',
                    text: 'Hi ' + fullName + '. Welcome to Passage! Enter this OTP for account verification: ' + OTP
                };
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    }
                    else {
                        console.log('Email sent: ' + info.response);
                    }
                });
                // Hard coded value returned for now
                response.write(JSON.stringify({
                    'result': 'success',
                    'OTP': OTP
                }));
                response.end();
                return [2 /*return*/];
            });
        });
    };
    // dummy handler that gets Amazon price using the scraper
    Server.prototype.amazonPriceHandler = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var isbn, bookPrice;
            return __generator(this, function (_a) {
                isbn = request.body.isbn;
                bookPrice = { 'price': 27 };
                response.write(JSON.stringify(bookPrice));
                response.end();
                return [2 /*return*/];
            });
        });
    };
    // dummy handler that posts book and sends response
    Server.prototype.addBookHandler = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var bookData;
            return __generator(this, function (_a) {
                bookData = request.body;
                // send bookDat to the set of books, update user blah blah
                response.write(JSON.stringify({ status: "success" }));
                response.end();
                return [2 /*return*/];
            });
        });
    };
    //dummy handler for findUser request 
    Server.prototype.findUserHandler = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                user = request.body.user;
                // query database to extract the ratings and info for "user"
                response.write(JSON.stringify({
<<<<<<< HEAD
                    "status": 100,
=======
                    "status": "200",
>>>>>>> 2837e33d3666a0164b3a980aa1d20344fbe3f71f
                    "username": user,
                    "institute": "UMass Amherst",
                    "sRating": 4.5,
                    "bRating": 5
                }));
                response.end();
                return [2 /*return*/];
            });
        });
    };
    Server.prototype.listen = function (port) {
        return this.server.listen(port);
    };
    return Server;
}());
exports.Server = Server;
