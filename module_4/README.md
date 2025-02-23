# Module 4 - Introduction to Javascript

TOC
- [Module 4 - Introduction to Javascript](#module-4---introduction-to-javascript)
  - [Where to place Javascript Code](#where-to-place-javascript-code)
  - [Defining Variables, Function, and Scope](#defining-variables-function-and-scope)
  - [Javascript Types](#javascript-types)
  - [Common Language Constructs](#common-language-constructs)
  - [Handling Default Values](#handling-default-values)
  - [Creating Objects Using 'new Object()' Syntax](#creating-objects-using-new-object-syntax)
  - [Functions Explained](#functions-explained)
  - [Passing Variables by Value vs. by Reference](#passing-variables-by-value-vs-by-reference)
  - [Function Constructors, prototype, and the 'this' Keyword](#function-constructors-prototype-and-the-this-keyword)
  - [Object Literals and the 'this' Keyword](#object-literals-and-the-this-keyword)
  - [Arrays](#arrays)
  - [Closures](#closures)
  - [Fake Namespaces / Immediately Invoked Function Expressions IIFEs](#fake-namespaces--immediately-invoked-function-expressions-iifes)

## Where to place Javascript Code

[Link to Lecture 40](../course_materials/fullstack-course4/examples/Lecture40/)

Javascript code interacts with the browser console.

You can write JS code in
1. The `head` section with `<script>`
2. An external file, i.e. `<script src="js/script.js"></script>`
3. The `body` section. For example at the end

Script always requires a closing tag.

you can log to the console with `console.log();`

The JS engine in the browser is a single threaded engine.
- Its also sequentially executed.

```javascript
// script.js
var x = "Hello World!";
```
```html
<!-- index.html -->
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
  </head>
<body>
  <h1>Lecture 40</h1>

  <!-- Load the script -->
   <!-- Define x -->
  <script src="js/script.js"></script>
  <!-- Log the variable x -->
  <script>
  console.log(x);
  </script>
</body>
</html>
```

## Defining Variables, Function, and Scope

[Link to Lecture 41](../course_materials/fullstack-course4/examples/Lecture41/)

Variable definitions always start with `var`.

`var message = "hi";`

There are no type definitions, its a dynamically typed language.

A variable can change type.

The way you define a function is
```js
function a () {
    ...
}
```

With the function name (ex: `a`).

You can also define a function as a variable (no name is defined after, its the var)

`var a = function () {...}`

The value of the function is assigned (python equiv is callable), not the result

In both cases it is invoked as `a()`.

You can also define arguments (Without var, adding var is a syntax error). You specify `return` with the value you want to return

```js
function compare (x, y) {
    return x > y;
}
```

There are many ways to invoke a function

all options are completely optional in a JS function

These are all legal:
```js
function compare (x, y) {...}
var a = compare(4, 5);
compare(4, "a");
compare();
```

Each function or variable lives in a scope
- Global
  - Variables and functions defined in a global scope are available
- Function (aka lexical)
  - A variable defined in a function is 

Scope Chain
- Everything is executed in an Execution Context
- Each function invocation creates a new Execution Context
- Each Execution Context has:
  - Its own Variable Environment
  - Special `this` object
  - Reference to its Outer Environment
- Global scope does not have Outer Environment as its the most outer there is
- How it works
  - Referenced (not defined) variable will be searched for in its current scope first. If not found, the Outer Referance will be searched. If not found the Outer Referance's Outer Referance will be searched, etc. This will keep going until the Global scope. If not found in the global scope the variable is undefined

```js
var x = ;
function B (){
    console.log(x);
}
function A(){
    var x = 5;
    B();
}
A();
```

The value will be from the outer scope (global), since function B is defined in the global scope

Example:
```js
var message = "in global";
console.log("global: message = " + message);

var a = function () {
  var message = "inside a";
  console.log("a: message = " + message);

  function b () {
    console.log("b: message = " + message); 
  }

  b();
}

a();
```

The variable is attached to `this` and `window` as `this.message` and `window.message`


## Javascript Types

[Link to Lecture 42](../course_materials/fullstack-course4/examples/Lecture42/)

A type is a particular data structure
- each language has built in types
- Can be used to build other data structures
- JS has 7 built in types
  - 6 Primitives
  - 1 Object Type

An object is nothing more than a collection of name/value pairs
i.e.
```
firstname: "",
lastname: "",
social: {
    linkedin: "",
    ...
}
```

A primitive is a single immutable value
- single value, not an object
- Immutable means once it is it can't be changed
  - Value becomes read only
  - You can create another value based on this existing one

1. `Boolean`: 2 values `true` or `false`
2. `Undefined`: no value has ever been set, Reserved keyword undefined. Never assign to this.
3. `Null`: Signifies lack of value. Lck of definition. Its okay to set a variable to null
4. `Number`: the only numeric type. Double precision 64 bit floating point. No primitive ints
5. `String`: sequence of characters used to represent text
6. `Symbol`: not covered in this class

```js
// should be undefined
var x;
console.log(x);

// Tests if x is undefined
if (x == undefined) {
  console.log("x is undefined");
}

x = 5;
if (x == undefined) {
  console.log("x is undefined");
}
else {
  console.log("x has been defined");
}

```

## Common Language Constructs

[Link to Lecture 43](../course_materials/fullstack-course4/examples/Lecture43/)

```js
// ***** String concatination
var string = "Hello";
// string += " World";
string = string + " World";
console.log(string + "!");
```

```js
// ***** Regular math operators: +, -, *, /
console.log((5 + 4) / 3);
console.log(undefined / 5);
function test1 (a) {
  console.log( a / 5);
}
test1();
```

The first is true, the second is also. JS will evaluate the "4" to be 4, and then eval as true.
```js
// ***** Equality 
var x = 4, y = 4;
if (x == y) {
  console.log("x=4 is equal to y=4");
}

x = "4";
if (x == y) {
  console.log("x='4' is equal to y=4");
}
```

Will check if they are first the same type, and if they're not then they wont continue any more and be false
```js
// ***** Strict equality
if (x === y) {
  console.log("Strict: x='4' is equal to y=4");
}
else {
  console
  .log("Strict: x='4' is NOT equal to y=4");
}
```

If the statement initially is false, then it keeps going through the chain. But if it is true in the OR chain, then it stops.

You can check coercion with `Boolean(EXPRESSION)`

Any non-zero number evaluates to true
```js
// ***** If statement (all false)
if ( false || null || 
     undefined || "" || 0 || NaN) {
  console.log("This line won't ever execute");
}
else {
  console.log ("All false");
}

// ***** If statement (all true)
if (true && "hello" && 1 && -1 && "false") {
  console.log("All true");
}
```

Curly braces. There is an established best practice. The curly brace is needed on the same line as return. Otherwise it is undefined because `return` is returned `undefined` there is nothing to the right.
```js
// ***** Best practice for {} style
// Curly brace on the same or next line...
// Is it just a style?
function a() 
{
    // Returns undefined
  return
  { 
    name: "Yaakov"
  };
}

function b() {
  return { 
      name: "Yaakov"
  };
}

console.log(a());
console.log(b());
```

1. Init of counter var
2. Condition on termination
3. Increment/change

> Declaring i again here would be a syntax error if its already defined in the context
```js
// For loop
var sum = 0;
for (var i = 0; i < 10; i++) {
  console.log(i);
  sum = sum + i;
}
console.log("sum of 0 through 9 is: " + sum);
```

## Handling Default Values

[Link to Lecture 44](../course_materials/fullstack-course4/examples/Lecture44/)

What happens if you call with nothing?

The var `sideDish` becomes undefined. It will be coerced to undefined as a string.

`Chicken with undefined`.

You can create a default value that gets substituted.

```js
if (sideDish === undefined) {
    sideDish = "whatever!";
}
```

or you can do

```js
sideDish = sideDish || "whatever!";
```

This works because it gets coerced into a boolean, if it is undefined/false then the second statement is evaluated and then returns the value before coercion.

This construct is used quite a bit.

```js
// Default values
function orderChickenWith(sideDish) {
  // Default value substitution
  sideDish = sideDish || "whatever!";
  console.log("Chicken with " + sideDish);
}

orderChickenWith("noodles");
orderChickenWith();
```


## Creating Objects Using 'new Object()' Syntax

[Link to Lecture 45](../course_materials/fullstack-course4/examples/Lecture45/)

An object is a collection of named value pairs.

You can create an object with `new Object()`
Or you can create one with `var company = {}`

You can dynamically add properties. But not in a nested way like
`company.ceo.name = ""` if `company.ceo` has not been defined

You can dynamically assign/access params with `[]`
like
`company["Stock of Company"]`

```js
// Object creation
var company = new Object();
company.name = "Facebook";
company.ceo = new Object();
company.ceo.firstName = "Mark";
company.ceo.favColor = "blue";

console.log(company);
console.log("Company CEO name is: " 
  + company.ceo.firstName);

console.log(company["name"]);
var stockPropName = "stock of company";
company[stockPropName] = 110;

console.log("Stock price is: " + 
  company[stockPropName]);

// Better way: object literal
var facebook = {
  name: "Facebook",
  ceo: {
    firstName: "Mark",
    favColor: "blue"
  },
  "stock of company": 110
};

console.log(facebook.ceo.firstName);
```

## Functions Explained

[Link to Lecture 46](../course_materials/fullstack-course4/examples/Lecture46/)

Functions are regular objects with special properties.

You can add value pairs to functions, like a version tag.

There is an inherit function called `toString()`

```js
// Functions are First-Class Data Types
// Functions ARE objects
function multiply(x, y) {
  return x * y;
}
multiply.version = "v.1.0.0";
console.log(multiply.version);
```

We can make a function factory to return a function.
Passed variables can be included in the returned function.
```js
// Function factory
function makeMultiplier(multiplier) {
  var myFunc = function (x) {
    return multiplier * x;
  };

  return myFunc;
}

var multiplyBy3 = makeMultiplier(3);
console.log(multiplyBy3(10));
var doubleAll = makeMultiplier(2);
console.log(doubleAll(100));
```

We can also pass a function as an argument
```js
// Passing functions as arguments
function doOperationOn(x, operation) {
  return operation(x);
}

var result = doOperationOn(5, multiplyBy3);
console.log(result);
result = doOperationOn(100, doubleAll);
console.log(result);
```

## Passing Variables by Value vs. by Reference

[Link to Lecture 47](../course_materials/fullstack-course4/examples/Lecture47/)

Given b=a passing by value means the value itself is stored not the referenced value in a. Theyre not linked.

In JS, primitives are passed by value and objects are passed by reference.

By value they just have a copied value. but by ref they are pointing to the same memory location (Their values are a different memory location)

By Value:
```js
// Copy by Reference vs by Value
var a = 7;
var b = a;
console.log("a: " + a);
console.log("b: " + b);

b = 5;
console.log("after b update:");
console.log("a: " + a);
console.log("b: " + b);
```

By Reference:
```js
var a = { x: 7 };
var b = a;
console.log(a);
console.log(b);

b.x = 5;
console.log("after b.x update:");
console.log(a);
console.log(b);
```

By Value:
```js
// Pass by reference vs by value
function changePrimitive(primValue) {
  console.log("in changePrimitive...");
  console.log("before:");
  console.log(primValue);
  
  primValue = 5;
  console.log("after:");
  console.log(primValue);
}

var value = 7;
changePrimitive(value); // primValue = value
console.log("after changePrimitive, orig value:");
console.log(value);
```

By Reference:
```js
function changeObject(objValue) {
  console.log("in changeObject...");
  console.log("before:");
  console.log(objValue);
  
  objValue.x = 5;
  console.log("after:");
  console.log(objValue);
}

value = { x: 7 };
changeObject(value); // objValue = value
console.log("after changeObject, orig value:");
console.log(value);
```

## Function Constructors, prototype, and the 'this' Keyword

[Link to Lecture 48](../course_materials/fullstack-course4/examples/Lecture48/)

Similar to classes

Uppercase function name is notation to indicate a function constructor

```js
// Function constructors
function Circle (radius) {
  this.radius = radius;
}

Circle.prototype.getArea = 
  function () {
    return Math.PI * Math.pow(this.radius, 2);
  };

// Initialize the 'class' object
var myCircle = new Circle(10);
console.log(myCircle.getArea());

var myOtherCircle = new Circle(20);
console.log(myOtherCircle);
```

What you don't want to do is put the function inside the init, because it will execute this every single time and waste processor time

```js

// Don't do this
function Circle (radius) {
  this.radius = radius;

  this.getArea = 
    function () {
        return Math.PI * Math.pow(this.radius, 2);
    };
};
```

## Object Literals and the 'this' Keyword

[Link to Lecture 49](../course_materials/fullstack-course4/examples/Lecture49/)

An alternative way of creating this class-like object is to define it literally, instead of as a function.

Note that when

```js
// Object literals and "this"
var literalCircle = { // Basically new Object()
  radius: 10,

  getArea: function () {
    // Required, because `this` in the context of the inner function below would cause a mismatch
    // of the context window. It would otherwise set to the global.
    var self = this;
    console.log(this);

    var increaseRadius = function () {
      self.radius = 20;
    };
    increaseRadius();
    console.log(this.radius);

    return Math.PI * Math.pow(this.radius, 2);
  }
};

console.log(literalCircle.getArea());
```

## Arrays

[Link to Lecture 50](../course_materials/fullstack-course4/examples/Lecture50/)

Arrays have a special property length, which gives the length.

```js
// Arrays
var array = new Array();
array[0] = "Yaakov";
array[1] = 2;
array[2] = function (name) {
  console.log("Hello " + name);
};
array[3] = {course: " HTML, CSS & JS"};

console.log(array);
array[2](array[0]);
console.log(array[3].course);


// Short hand array creation
var names = ["Yaakov", "John", "Joe"];
console.log(names);

for (var i = 0; i < names.length; i++) {
  console.log("Hello " + names[i]);
}

names[100] = "Jim";
for (var i = 0; i < names.length; i++) {
  console.log("Hello " + names[i]);
}

var names2 = ["Yaakov", "John", "Joe"];

var myObj = {
  name: "Yaakov",
  course: "HTML/CSS/JS",
  platform: "Courera"
};
for (var prop in myObj) {
  console.log(prop + ": " + myObj[prop]);
}

for (var name in names2) {
  console.log("Hello " + names2[name]);
}

names2.greeting = "Hi!";

for (var name in names2) {
  console.log("Hello " + names2[name]);
}
```

## Closures

[Link to Lecture 51](../course_materials/fullstack-course4/examples/Lecture51/)

Closures are very important.

For this example, the multiplier will multiply with the value enclosed with the factory input.

When a function is executed it has access to
1. Its own execution context
2. A special `this` variable
3. A reference to its outer lexical environment

This is a way to "trap" or close in variables into the execution environment of a function.
```js
// Closures
function makeMultiplier (multiplier) {
  // var multiplier = 2;
  function b() {
    console.log("Multiplier is: " + multiplier);
  }
  b();


  return (
      function (x) {
        return multiplier * x;
      }

    );
}

var doubleAll = makeMultiplier(2);
console.log(doubleAll(10)); // its own exec env
```

## Fake Namespaces / Immediately Invoked Function Expressions IIFEs

[Link to Lecture 52](../course_materials/fullstack-course4/examples/Lecture52/)

```js
// app.js

yaakovGreeter.sayHello();
johnGreeter.sayHi();

// Immediately Invoked Function Expression
// IIFE
(function (name) {
  console.log("Hello " + name);
})("Coursera!");
```

```js
// script1.js
(function (window) {
  var yaakovGreeter = {};

  yaakovGreeter.name = "Yaakov";

  var greeting = "Hello ";

  yaakovGreeter.sayHello = function () {
    console.log(greeting + yaakovGreeter.name);
  }

  window.yaakovGreeter = yaakovGreeter;

})(window);
```

```js
// script2.js
(function (window) {
  var johnGreeter = {};
  johnGreeter.name = "John";
  var greeting = "Hi ";
  johnGreeter.sayHi = function () {
    console.log(greeting + johnGreeter.name);
  }

  window.johnGreeter = johnGreeter;

})(window);
```