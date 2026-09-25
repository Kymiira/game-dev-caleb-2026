let myNum = 3;
let myString = ' Hello ';
let myFloat = 17.5;
let myBool = true;
function sayHello() {
    let myOut = document.getElementById('myDiv01');
    if (!myOut) return;
    
    myOut.innerHTML = myNum + myString + myFloat + ', ' + myBool;
    if (myBool) {
        myOut.innerHTML += ', WOW';
    }
}
const appName = "DashboardPro";
const maxUsers = 100;
const isProduction = false;
const apiVersion = undefined;
const currentUser = null;
const globalId = 9007199254740991n;
const uniqueKey = Symbol("id");
const userProfile = {
    username: "johndoe",
    age: 30,
};
const allowedRoles = ["admin", "editor", "viewer"];
let sessionAttempts = 3;
sessionAttempts = 4;
let lastLoginTime = new Date();
var legacyModeEnabled = true;
console.log(`App: ${appName} (v${apiVersion})`);
console.log("Max Users:", maxUsers);
console.log("Is Production:", isProduction);
console.log("Current User:", currentUser);
console.log("Global ID:", globalId);
console.log("Unique Symbol:", uniqueKey);
console.log("User Profile Object:", userProfile);
console.log("Allowed Roles Array:", allowedRoles);
console.log("Session Attempts:", sessionAttempts);
console.log("Legacy Mode:", legacyModeEnabled);