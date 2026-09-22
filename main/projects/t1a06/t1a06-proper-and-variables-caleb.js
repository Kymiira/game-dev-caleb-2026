let myNum = 3;
let myString = ' Hello ';
let myFloat = 17.5;
let myBool = true;
let myOut = document.getElementById('myDiv01');
function sayHello() {
    myOut.innerHTML = myNum + myString + myFloat + ', ' + myBool;
    if (myBool) {myOut.innerHTML += ', WOW';};
}