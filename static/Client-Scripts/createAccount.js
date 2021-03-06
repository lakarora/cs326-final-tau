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
var myURL = "https://protected-island-78699.herokuapp.com/";
// const myURL = "http://localhost:8080/"
window.onload = function () {
    document.getElementById("createAccountForm").addEventListener("submit", createAccount, false);
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
function createAccount(event) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            (function () { return __awaiter(_this, void 0, void 0, function () {
                var uni_to_email, inputs, fullName, email, pwd, institution, username, domain_name, newURL, resp, responseJSON, OTP, _a, _b, _c, digest, newURL_1;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            event.preventDefault();
                            uni_to_email = {
                                'umass': 'umass.edu',
                                'smith': 'smith.edu',
                                'mtholyoke': 'mtholyoke.edu',
                                'amherstcol': 'amherst.edu',
                                'hampshire': 'hampshire.edu'
                            };
                            inputs = document.getElementById("createAccountForm").elements;
                            fullName = inputs["fullName"].value;
                            email = inputs["inputEmail"].value;
                            pwd = inputs["userPassword"].value;
                            institution = inputs["Institution"].value;
                            username = inputs['inputUsername'].value;
                            domain_name = email.substring(email.lastIndexOf('@') + 1);
                            if (!(uni_to_email[institution] != domain_name)) return [3 /*break*/, 1];
                            alert("Email address does not match institution");
                            return [2 /*return*/];
                        case 1:
                            newURL = myURL + "checkNewAccount/";
                            return [4 /*yield*/, postData(newURL, {
                                    'email': email,
                                    'username': username,
                                    'fullName': fullName
                                })];
                        case 2:
                            resp = _d.sent();
                            return [4 /*yield*/, resp.json()];
                        case 3:
                            responseJSON = _d.sent();
                            if (!(responseJSON['result'] != 'success')) return [3 /*break*/, 4];
                            alert("Email or username already taken");
                            return [2 /*return*/];
                        case 4:
                            OTP = responseJSON['OTP'];
                            // Save the form fields in sessionStorage for using in the next page
                            sessionStorage.setItem("fullname", fullName);
                            sessionStorage.setItem("email", email);
                            // Store the password hash for security reasons
                            _b = (_a = sessionStorage).setItem;
                            _c = ["password"];
                            return [4 /*yield*/, getHash(pwd)];
                        case 5:
                            // Store the password hash for security reasons
                            _b.apply(_a, _c.concat([_d.sent()]));
                            sessionStorage.setItem("institution", institution);
                            return [4 /*yield*/, getHash(OTP)];
                        case 6:
                            digest = _d.sent();
                            sessionStorage.setItem("OTP", digest);
                            sessionStorage.setItem("username", username);
                            newURL_1 = myURL + "verifyAccount/";
                            window.open(newURL_1, "_self");
                            _d.label = 7;
                        case 7: return [2 /*return*/];
                    }
                });
            }); })();
            return [2 /*return*/];
        });
    });
}
