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
var http = require('http');
var url = require('url');
var express = require('express');
var path = require('path');
var Server = /** @class */ (function () {
    // Leave out database part for now
    function Server() {
        this.server = express();
        this.port = 8080;
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
        this.server.use('/', this.router);
        this.server.get('/options/', function (req, res) {
            res.type('.html');
            res.sendFile('selectActionAfterLogin.html', { root: "./static" });
        });
        this.server.get('/createAccount/', function (req, res) {
            res.type('.html');
            res.sendFile('createAccount.html', { root: "./static" });
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
        this.router.post('/userRating/', this.userRatingHandler.bind(this));
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
    }
    Server.prototype.getServer = function () {
        return this.server;
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
            var searchQuery;
            return __generator(this, function (_a) {
                searchQuery = request.body.query;
                /*
                    variables for picture title description condition... ect. will be used to get info from database
                */
                response.write(JSON.stringify({
                    'result': "success",
                    'searchResults': [{
                            'picture': 'resources/no-image-listing.png',
                            'title': searchQuery,
                            'description': 'Used this book last semester for BIO 289. Some highlighting on the inside. Other than that the books integrity is great. Message me if youd like to meet up and trade!',
                            'condition': 'New',
                            'account-link': '#',
                            'account-name': 'Minutemen2021',
                            'seller-rating': '4.6',
                            'price': '100'
                        }, {
                            'picture': 'resources/no-image-listing.png',
                            'title': searchQuery,
                            'description': 'Used this book last semester for BIO 289. Some highlighting on the inside. Other than that the books integrity is great. Message me if youd like to meet up and trade!',
                            'condition': 'New',
                            'account-link': '#',
                            'account-name': 'Minutemen2021',
                            'seller-rating': '4.6',
                            'price': '100'
                        }, {
                            'picture': 'resources/no-image-listing.png',
                            'title': searchQuery,
                            'description': 'Used this book last semester for BIO 289. Some highlighting on the inside. Other than that the books integrity is great. Message me if youd like to meet up and trade!',
                            'condition': 'New',
                            'account-link': '#',
                            'account-name': 'Minutemen2021',
                            'seller-rating': '4.6',
                            'price': '100'
                        }, {
                            'picture': 'resources/no-image-listing.png',
                            'title': searchQuery,
                            'description': 'Used this book last semester for BIO 289. Some highlighting on the inside. Other than that the books integrity is great. Message me if youd like to meet up and trade!',
                            'condition': 'New',
                            'account-link': '#',
                            'account-name': 'Minutemen2021',
                            'seller-rating': '4.6',
                            'price': '100'
                        }]
                }));
                response.end();
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
            var email, OTP;
            return __generator(this, function (_a) {
                email = request.body.email;
                OTP = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
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
    Server.prototype.listen = function (port) {
        return this.server.listen(port);
    };
    return Server;
}());
exports.Server = Server;