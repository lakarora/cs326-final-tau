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
// const myURL = "http://localhost:8080/";
var myURL = "https://protected-island-78699.herokuapp.com/";
window.onload = function () {
    document.getElementById("loginButton").addEventListener("click", verifyLogin);
};
function getHash(OTP) {
    return __awaiter(this, void 0, void 0, function () {
        var msg, hashBuffer, hashArray, hashHex;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    msg = new TextEncoder().encode(OTP);
                    return [4 /*yield*/, crypto.subtle.digest('SHA-256', msg)];
                case 1:
                    hashBuffer = _a.sent();
                    hashArray = Array.from(new Uint8Array(hashBuffer));
                    hashHex = hashArray.map(function (b) { return b.toString(16).padStart(2, '0'); }).join('');
                    return [2 /*return*/, hashHex];
            }
        });
    });
}
function postData(url, data) {
    return __awaiter(this, void 0, void 0, function () {
        var resp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch(url, {
                        method: 'POST',
                        mode: 'cors',
                        cache: 'no-cache',
                        credentials: 'same-origin',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        redirect: 'follow',
                        body: JSON.stringify(data)
                    })];
                case 1:
                    resp = _a.sent();
                    return [2 /*return*/, resp];
            }
        });
    });
}
function verifyLogin() {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            (function () { return __awaiter(_this, void 0, void 0, function () {
                var rexp, userName, password, hashPwd, newURL, responseJson, newURL_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            rexp = new RegExp('^[A-Za-z0-9]+$');
                            userName = document.getElementById("loginUsername").value;
                            if (userName.match(rexp) == null) {
                                alert("Invalid username");
                                return [2 /*return*/];
                            }
                            password = document.getElementById("loginPassword").value;
                            if (password.length < 6) {
                                alert("Invalid password");
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, getHash(password)];
                        case 1:
                            hashPwd = _a.sent();
                            newURL = myURL + "login/";
                            return [4 /*yield*/, postData(newURL, {
                                    "username": userName,
                                    "password": hashPwd
                                }).then(function (val) {
                                    return val.json();
                                }, function (reason) {
                                    console.log(reason);
                                    return JSON.stringify({ 'result': 'failure' });
                                })];
                        case 2:
                            responseJson = _a.sent();
                            if (responseJson['result'] != "success") {
                                alert("Error while logging in");
                                return [2 /*return*/];
                            }
                            else {
                                alert("Login successful");
                                // Set username in session storage for verification on future pages
                                sessionStorage.setItem('currentUser', userName);
                                newURL_1 = myURL + "options/";
                                window.open(newURL_1, "_self");
                            }
                            return [2 /*return*/];
                    }
                });
            }); })();
            return [2 /*return*/];
        });
    });
}
