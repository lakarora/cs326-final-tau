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
var express = require('express');
var $ = require('jquery');
var ObjectID = require('mongodb').ObjectID;
var nodemailer = require('nodemailer');
var google = require("googleapis").google;
var OAuth2 = google.auth.OAuth2;
var Server = /** @class */ (function () {
    // Leave out database part for now
    function Server(db) {
        this.server = express();
        this.port = process.env.PORT;
        this.router = express.Router();
        this.db = db;
        this.router.use(function (request, response, next) {
            response.header('Content-Type', 'application/json');
            response.header('Access-Control-Allow-Origin', "*");
            response.header('Access-Control-Allow-Headers', '*');
            next();
        });
        // Serve static pages from a particular path.
        this.server.use('/', express.static('./static'));
        // Handle POST data as JSON
        this.server.use(express.json());
        this.server.use('/', this.router);
        // SEARCH
        this.server.post('/searchBook/', this.searchBookHandler.bind(this));
        this.server.get('/search/', function (req, res) {
            res.type('.html');
            res.sendFile('searchBook.html', { root: "./static" });
        });
        this.server.get('/searchResults/', function (req, res) {
            res.type('.html');
            res.sendFile('searchResults.html', { root: "./static" });
        });
        this.router.post('/postMessage/', this.postMessageHandler.bind(this));
        this.router.post('/login/', this.loginHandler.bind(this));
        this.router.post('/registerUser/', this.registerUser.bind(this));
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
        this.server.get('/sell/', function (req, res) {
            res.type('.html');
            res.sendFile('sellBook.html', { root: "./static" });
        });
        this.router.post('/findUser/', this.findUserHandler.bind(this));
        this.server.get('/rate/', function (req, res) {
            res.type('.html');
            res.sendFile('findUserToRate.html', { root: "./static" });
        });
        this.router.post('/addNewRating/', this.rateUserHandler.bind(this));
        this.router.post('/accountInfo/', this.accountInfoHandler.bind(this));
        this.server.get('/accountInfo/', function (req, res) {
            res.type('.html');
            res.sendFile('accountInfo.html', { root: "./static" });
        });
        this.server.get('/loadLogin/', function (req, res) {
            res.type('.html');
            res.sendFile('login.html', { root: "./static" });
        });
        this.router.post('/checkNewAccount/', this.checkNewAccount.bind(this));
        this.router.get('/verifyAccount/', function (req, res) {
            res.type('html');
            res.sendFile('verifyOTP.html', { root: "./static" });
        });
        //router for checking your own postings
        this.server.get('/MyPostings/', function (req, res) {
            res.type('html');
            res.sendFile('myPostings.html', { root: "./static" });
        });
        this.router.post('/MyPostings/', this.myPostingsHandler.bind(this));
        this.router.post('/Delete', this.deletePostingsHandler.bind(this));
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
    }
    Server.prototype.getServer = function () {
        return this.server;
    };
    Server.prototype.postMessageHandler = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var user, message;
            return __generator(this, function (_a) {
                user = request.body.user;
                message = request.body.message;
                /*
                    put data in server
                */
                response.write(JSON.stringify({ 'result': 'success' }));
                response.end();
                return [2 /*return*/];
            });
        });
    };
    Server.prototype.searchBookHandler = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var query, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = request.body.query;
                        return [4 /*yield*/, this.db.getMany({
                                $or: [
                                    { "title": query },
                                    { "author": query },
                                    { "isbn": query }
                                ]
                            }, 'bookPostings')];
                    case 1:
                        res = _a.sent();
                        if (res == null || res.length == 0) {
                            response.write(JSON.stringify({
                                'result': "nobooks"
                            }));
                        }
                        else {
                            response.write(JSON.stringify({
                                'result': "success",
                                'searchResults': res
                            }));
                        }
                        response.end();
                        return [2 /*return*/];
                }
            });
        });
    };
    Server.prototype.searchResultsHandler = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                response.write(JSON.stringify({ "result": "success" }));
                response.end();
                return [2 /*return*/];
            });
        });
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
            var buyerRating, sellerRating, numBuyerRatings, numSellerRatings, queryObj, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        buyerRating = 0.0;
                        sellerRating = 0.0;
                        numBuyerRatings = 0;
                        numSellerRatings = 0;
                        queryObj = {
                            'name': request.body.fullname,
                            'email': request.body.email,
                            'password': request.body.password,
                            'institution': request.body.institution,
                            'username': request.body.username,
                            'buyerRating': 0.0,
                            'sellerRating': 0.0,
                            'numBuyerRatings': 0,
                            'numSellerRatings': 0
                        };
                        return [4 /*yield*/, this.db.putOne(queryObj, 'userInfo')];
                    case 1:
                        result = _a.sent();
                        response.write(JSON.stringify({
                            'result': result
                        }));
                        response.end();
                        return [2 /*return*/];
                }
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
    Server.prototype.loginHandler = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var username, password, res, returnString;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        username = request.body.username;
                        password = request.body.password;
                        return [4 /*yield*/, this.db.get({
                                $and: [
                                    { "username": username },
                                    { "password": password }
                                ]
                            }, 'userInfo')];
                    case 1:
                        res = _a.sent();
                        returnString = 'success';
                        if (res == null) {
                            returnString = 'failure';
                        }
                        response.write(JSON.stringify({
                            "result": returnString
                        }));
                        response.end();
                        return [2 /*return*/];
                }
            });
        });
    };
    // dummy handler for the Account Info page
    Server.prototype.accountInfoHandler = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var username, info;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        username = request.body.username;
                        return [4 /*yield*/, this.db.get({ "username": username }, 'userInfo')];
                    case 1:
                        info = _a.sent();
                        console.log(info);
                        if (info == null) {
                            response.write(JSON.stringify({
                                "result": "failure"
                            }));
                            response.end();
                            return [2 /*return*/];
                        }
                        response.write(JSON.stringify({
                            "result": "success",
                            "username": username,
                            "fullName": info.name,
                            "institution": info.institution,
                            "sRating": info.sellerRating,
                            "bRating": info.buyerRating
                        }));
                        response.end();
                        return [2 /*return*/];
                }
            });
        });
    };
    // dummy handler for checking if account exists
    Server.prototype.checkNewAccount = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var email, username, fullName, result, OTP, clientId, clientSecret, refreshToken, secrets, oauth2Client, accessToken, transporter, mailOptions;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        email = request.body.email;
                        username = request.body.username;
                        fullName = request.body.fullName;
                        return [4 /*yield*/, this.db.get({
                                $or: [
                                    { "email": email },
                                    { "username": username }
                                ]
                            }, 'userInfo')];
                    case 1:
                        result = _a.sent();
                        if (result != null) {
                            response.write(JSON.stringify({
                                'result': 'failure'
                            }));
                            response.end();
                            return [2 /*return*/];
                        }
                        OTP = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
                        if (!process.env.CLIENTID) {
                            secrets = require('./secrets.json');
                            clientId = secrets.clientId;
                            clientSecret = secrets.clientSecret;
                            refreshToken = secrets.refreshToken;
                        }
                        else {
                            clientId = process.env.CLIENTID;
                            clientSecret = process.env.CLIENTSECRET;
                            refreshToken = process.env.REFRESHTOKEN;
                        }
                        oauth2Client = new OAuth2(clientId, clientSecret, "https://developers.google.com/oauthplayground");
                        oauth2Client.setCredentials({
                            refresh_token: refreshToken
                        });
                        accessToken = oauth2Client.getAccessToken();
                        transporter = nodemailer.createTransport({
                            service: 'gmail',
                            auth: {
                                type: "OAuth2",
                                user: 'lakshayarora3107@gmail.com',
                                clientId: clientId,
                                clientSecret: clientSecret,
                                refreshToken: refreshToken,
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
                }
            });
        });
    };
    // dummy handler that gets Amazon price using the scraper
    Server.prototype.amazonPriceHandler = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var query, url, p, bookPrice;
            return __generator(this, function (_a) {
                query = request.body.title;
                url = 'https://stormy-tundra-04347.herokuapp.com/' + query;
                p = Math.floor(Math.random() * 28) + 8;
                bookPrice = { 'price': p };
                response.write(JSON.stringify(bookPrice));
                response.end();
                return [2 /*return*/];
            });
        });
    };
    // dummy handler that posts book and sends response
    Server.prototype.addBookHandler = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var bookData, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        bookData = request.body;
                        return [4 /*yield*/, this.db.putOne(bookData, 'bookPostings')];
                    case 1:
                        result = _a.sent();
                        response.write(JSON.stringify({
                            'result': result
                        }));
                        response.end();
                        return [2 /*return*/];
                }
            });
        });
    };
    //dummy handler for findUser request 
    Server.prototype.findUserHandler = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var username, resp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        username = request.body.username;
                        return [4 /*yield*/, this.db.get({
                                'username': username
                            }, 'userInfo')];
                    case 1:
                        resp = _a.sent();
                        // User does not exist
                        if (resp == null) {
                            response.write(JSON.stringify({
                                'result': 'failure'
                            }));
                            response.end();
                            return [2 /*return*/];
                        }
                        // Return the user info to the client
                        response.write(JSON.stringify({
                            "result": 'success',
                            "username": username,
                            "institution": resp.institution,
                            "sellerRating": resp.sellerRating,
                            "buyerRating": resp.buyerRating,
                            "numBuyerRatings": resp.numBuyerRatings,
                            "numSellerRatings": resp.numSellerRatings
                        }));
                        response.end();
                        return [2 /*return*/];
                }
            });
        });
    };
    //dummy handler for adding a rating
    Server.prototype.rateUserHandler = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var ratingType, userToBeRated, newRating, numSellerRatings, numBuyerRatings, oldBuyerRating, oldSellerRating, query, newvalues, resultString;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ratingType = request.body.ratingType;
                        userToBeRated = request.body.userToBeRated;
                        newRating = request.body.newRating;
                        numSellerRatings = request.body.numSellerRatings;
                        numBuyerRatings = request.body.numBuyerRatings;
                        oldBuyerRating = request.body.oldBuyerRating;
                        oldSellerRating = request.body.oldSellerRating;
                        query = {
                            'username': userToBeRated
                        };
                        newvalues = {};
                        if (ratingType == 'buyerRating') {
                            newvalues = {
                                $set: { 'numBuyerRatings': numBuyerRatings, 'buyerRating': newRating }
                            };
                        }
                        else {
                            newvalues = {
                                $set: { 'numSellerRatings': numSellerRatings, 'sellerRating': newRating }
                            };
                        }
                        return [4 /*yield*/, this.db.updateSingular(query, newvalues, 'userInfo')];
                    case 1:
                        resultString = _a.sent();
                        response.write(JSON.stringify({
                            result: resultString
                        }));
                        response.end();
                        return [2 /*return*/];
                }
            });
        });
    };
    //dummy handler for viewing your own postings
    Server.prototype.myPostingsHandler = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var username, result, postings, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        username = request.body.username;
                        return [4 /*yield*/, this.db.getMany({ "username": username }, 'bookPostings')];
                    case 1:
                        result = _a.sent();
                        // console.log(result);
                        if (result.length == 0) {
                            response.write(JSON.stringify({
                                status: 200,
                                result: "success",
                                postings: []
                            }));
                        }
                        postings = [];
                        for (i = 0; i < result.length; i++) {
                            postings.push({
                                "title": result[i].title,
                                "_id": result[i]._id
                            });
                        }
                        response.write(JSON.stringify({
                            "status": 200,
                            "result": "success",
                            "postings": postings
                        }));
                        response.end();
                        return [2 /*return*/];
                }
            });
        });
    };
    // handler for delete my postings
    Server.prototype.deletePostingsHandler = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var delList, query, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        delList = request.body.delList.map(function (x) { return ObjectID(x); });
                        query = { _id: { $in: delList } };
                        return [4 /*yield*/, this.db["delete"](query, "bookPostings")];
                    case 1:
                        result = _a.sent();
                        response.write(JSON.stringify({
                            "status": 200,
                            "result": result
                        }));
                        response.end();
                        return [2 /*return*/];
                }
            });
        });
    };
    Server.prototype.listen = function (port) {
        return this.server.listen(port);
    };
    return Server;
}());
exports.Server = Server;
