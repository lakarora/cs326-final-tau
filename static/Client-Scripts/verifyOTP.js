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
// const myURL = "https://fathomless-sea-16239.herokuapp.com/";
var myURL = "http://localhost:8080/";
window.onload = function () {
    document.getElementById("verifyOTPButton").addEventListener("click", verifyOTP, false);
};
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
function verifyOTP() {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            (function () { return __awaiter(_this, void 0, void 0, function () {
                var pwd, fname, email, uni, OTP, userOTP, username, userOTPHash, newURL, resp, respJSON, newURL_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (sessionStorage.length == 0) {
                                alert("Visit Account Creation page before landing here!");
                                location.replace(myURL + "createAccount/");
                            }
                            pwd = sessionStorage.getItem("password");
                            fname = sessionStorage.getItem("fullname");
                            email = sessionStorage.getItem("email");
                            uni = sessionStorage.getItem("institution");
                            OTP = sessionStorage.getItem("OTP");
                            userOTP = document.getElementById("otp").value;
                            username = sessionStorage.getItem("username");
                            return [4 /*yield*/, getHash(userOTP)];
                        case 1:
                            userOTPHash = _a.sent();
                            return [4 /*yield*/, getHash(userOTP)];
                        case 2:
                            if ((_a.sent()) != OTP) {
                                alert("Invalid OTP. Please try again!");
                                return [2 /*return*/];
                            }
                            newURL = myURL + "registerUser/";
                            return [4 /*yield*/, postData(newURL, {
                                    'fullname': fname,
                                    'email': email,
                                    'password': pwd,
                                    'institution': uni,
                                    'username': username
                                })];
                        case 3:
                            resp = _a.sent();
                            return [4 /*yield*/, resp.json()];
                        case 4:
                            respJSON = _a.sent();
                            if (respJSON['result'] != 'success') {
                                alert("An error occured. Please try again");
                                sessionStorage.clear();
                                window.open(myURL + 'createAccount/', "self");
                            }
                            else {
                                alert("User registration successful. Please login with your new credentials!");
                                sessionStorage.clear();
                                newURL_1 = myURL + "loadLogin/";
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
