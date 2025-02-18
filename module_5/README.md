# Module 5 - Using Javascript to Build Web Applications

- [Module 5 - Using Javascript to Build Web Applications](#module-5---using-javascript-to-build-web-applications)
  - [DOM Manipulation](#dom-manipulation)
  - [Handling Events](#handling-events)
  - [The `event` argument](#the-event-argument)
  - [HTTP Basics](#http-basics)
  - [AJAX Basics](#ajax-basics)
  - [Processing JSON](#processing-json)
  - [Fixing Mobile Nav Menu Automatic Collapse](#fixing-mobile-nav-menu-automatic-collapse)
  - [Dynamically Loading Home View Content](#dynamically-loading-home-view-content)
  - [Dynamically Loading Menu Categories View](#dynamically-loading-menu-categories-view)
  - [Dynamically Loading Single Category View](#dynamically-loading-single-category-view)
  - [Changing `active` Button Style Through Javascript](#changing-active-button-style-through-javascript)
  - [Check out the final deployed site](#check-out-the-final-deployed-site)

## DOM Manipulation

[Link to Lecture 53](../course_materials/fullstack-course4/examples/Lecture53/)

JS lets you manipulate the page.

Reminder: `window` is akin to `this` in the console.

Typing `#document` in the console will reveal an object representing the entire html page (name/value pairs).

If we wanted to get an element we can use `document.getElementById('title')`. Which would return the `h1` element.
- document is a special object with special properties (HTMLDocument)
- `console.log(document instanceof HTMLDocument)`
- `.value` gets the value of an input element
- `.textContent` is a value representing the inner content (setter/getter prop). This renders as a string
- `.innerHTML` is similar to text content, except it'll get rendered as HTML.
- `.querySelector()` grabs by the css selector not just the id (eg. `#title`). 
- `.queryAllSelector()` grabs all elements by the selector

If you include the script that gets the element before it is loaded, then it will be null (nonexistent). You want the get action to occur after the element is loaded. The best practice here is to place the script at the very end of the document.

You can assign functionality with `onclick='sayHello()'` so that a JS function is called on a click/event.



```js
// DOM manipulation
// console.log(document.getElementById("title"));
// console.log(document instanceof HTMLDocument);

function sayHello () {
  var name =
   document.getElementById("name").value;
   var message = "<h2>Hello " + name + "!</h2>";

  // document
  //   .getElementById("content")
  //   .textContent = message;

  document
    .getElementById("content")
    .innerHTML = message;

  if (name === "student") {
    var title = 
      document
        .querySelector("#title")
        .textContent;
    title += " & Lovin' it!";
    document
        .querySelector("h1")
        .textContent = title;
  }
}
```

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
  </head>
<body>
  <h1 id="title">Lecture 53</h1>
  
  <p>
    Say hello to 
    <input id="name" type="text">
    <button onclick="sayHello();">
      Say it!
    </button>
  </p>

  
  <div id="content"></div>

  <script src="js/script.js"></script>
</body>
</html>
```

## Handling Events

[Link to Lecture 54](../course_materials/fullstack-course4/examples/Lecture54/)

Event handlers are basically functions that you bind to an event occuring at which time the handler is called.

A simple way of binding is to specify the function at the trigger (eg. `onclick='sayHello()'`)

You kind of have to dirty up your html with these references tho.

Using `.addEventListener(EVENT, FUNCTION)` can add a function to an event without dirtying the html

`DOMContentLoaded` can be used as an event for when the page has loaded, as the initial page code.
```js
// Event handling
document.addEventListener("DOMContentLoaded",
  function (event) {
    
    function sayHello (event) {
      this.textContent = "Said it!";
      var name =
       document.getElementById("name").value;
       var message = "<h2>Hello " + name + "!</h2>";

      document
        .getElementById("content")
        .innerHTML = message;

      if (name === "student") {
        var title = 
          document
            .querySelector("#title")
            .textContent;
        title += " & Lovin' it!";
        document
            .querySelector("h1")
            .textContent = title;
      }
    }

    // Unobtrusive event binding
    document.querySelector("button")
      .addEventListener("click", sayHello);

  }
);

// Alternate
// document.querySelector("button")
//   .onclick = sayHello;
```

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <script src="js/script.js"></script>
  </head>
<body>
  <h1 id="title">Lecture 54</h1>
  
  <p>
    Say hello to 
    <input id="name" type="text">
    <button>
      Say it!
    </button>
  </p>

  
  <div id="content"></div>
</body>
</html>
```

## The `event` argument

[Link to Lecture 55](../course_materials/fullstack-course4/examples/Lecture55/)

```js
// Event handling
document.addEventListener("DOMContentLoaded",
  function (event) {
    
    function sayHello (event) {
      console.log(event);

      this.textContent = "Said it!";
      var name =
       document.getElementById("name").value;
       var message = "<h2>Hello " + name + "!</h2>";

      document
        .getElementById("content")
        .innerHTML = message;

      if (name === "student") {
        var title = 
          document
            .querySelector("#title")
            .textContent;
        title += " & Lovin' it!";
        document
            .querySelector("h1")
            .textContent = title;
      }
    }

    // Unobtrusive event binding
    document.querySelector("button")
      .addEventListener("click", sayHello);

    document.querySelector("body")
      .addEventListener("mousemove",
        function (event) {
          if (event.shiftKey === true) {
            console.log("x: " + event.clientX);
            console.log("y: " + event.clientY);
          }
        }
      );

  }
);

// document.querySelector("button")
//   .onclick = sayHello;
```

```html
<!-- Same as prior lecture -->
```

## HTTP Basics

[Link to Lecture 56](../course_materials/fullstack-course4/examples/Lecture56/)

HyperText Transfer Protocol
- Stateless protocol
  - Does not depend on any prior communication

Example sequence:
1. Client opens connection toserver
2. Client sends HTTP request for resource
3. Server sends HTTP response to client w/ resource
4. Client closes connection

URN: Uniform Resource Name
- Uniquely IDs resource or name of resource
- Does not tell us how to get resource
  - Orgs make these unique for example
- Its like the path `/conversations/{}/messages/{}` for example

URI: Uniform Resource Identifier
- Uniquely identifies resource or location of resource
- Does not necessarily tell us how to get the resource
- Example: `/official_site/index.html`

URL: Uniform Resource Locator
- Form of URI that provides info on how to get resource

Structure:
- GET /index.html?firstName=Mike HTTP/1.1
  - GET: The method
  - index.html: URI string
  - ?firstName=Mike: Query String
  - HTTP/1.1: HTTP Version

This command is only issued by JS once the connection is established, and JS can ask for the URI within the context of the website

Important methods

- GET
  - Retrieves resource
  - Passed as part of URI (query string)
- POST  
  - Sends data to server in order to be processed
  - Data is in the message body
  - Sometimes there is a response
- DELETE
  - Deletes a resource

POST Structure:

POST /index.html HTTP/1.1
HOST: coursera.org
Accept-Charset: utf-8
data=....

HTTP Response structure

HTTP/1.1 200 OK
- VERSION
- Status Code
- English phrase describing code

## AJAX Basics

[Link to Lecture 57](../course_materials/fullstack-course4/examples/Lecture57/)

Basically a client/server communication technique

```js
// script.js
// Event handling
document.addEventListener("DOMContentLoaded",
  function (event) {
    
    // Unobtrusive event binding
    document.querySelector("button")
      .addEventListener("click", function () {
        
        // Call server to get the name
        $ajaxUtils
          .sendGetRequest("data/name.txt", 
            function (request) {
              var name = request.responseText;

              document.querySelector("#content")
                .innerHTML = "<h2>Hello " + name + "!</h2>";
            });

        
      });
  }
);
```

```js
// ajax-utils.js
(function (global) {

// Set up a namespace for our utility
var ajaxUtils = {};


// Returns an HTTP request object
function getRequestObject() {
  if (global.XMLHttpRequest) {
    return (new XMLHttpRequest());
  } 
  else if (global.ActiveXObject) {
    // For very old IE browsers (optional)
    return (new ActiveXObject("Microsoft.XMLHTTP"));
  } 
  else {
    global.alert("Ajax is not supported!");
    return(null); 
  }
}


// Makes an Ajax GET request to 'requestUrl'
ajaxUtils.sendGetRequest = 
  function(requestUrl, responseHandler) {
    var request = getRequestObject();
    request.onreadystatechange = 
      function() { 
        handleResponse(request, responseHandler); 
      };
    request.open("GET", requestUrl, true);
    request.send(null); // for POST only
  };


// Only calls user provided 'responseHandler'
// function if response is ready
// and not an error
function handleResponse(request,
                        responseHandler) {
  if ((request.readyState == 4) &&
     (request.status == 200)) {
    responseHandler(request);
  }
}


// Expose utility to the global object
global.$ajaxUtils = ajaxUtils;


})(window);
```

```html
<!-- index.html -->
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <script src="js/ajax-utils.js"></script>
    <script src="js/script.js"></script>
  </head>
<body>
  <h1 id="title">Lecture 57</h1>
  
  <p>
    <button>
      Say Hello To Someone on the Server!
    </button>
  </p>

  
  <div id="content"></div>
</body>
</html>
```

## Processing JSON

[Link to Lecture 58](../course_materials/fullstack-course4/examples/Lecture58/)

```js
// script.js
// Event handling
document.addEventListener("DOMContentLoaded",
  function (event) {
    
    // Unobtrusive event binding
    document.querySelector("button")
      .addEventListener("click", function () {
        
        // Call server to get the name
        $ajaxUtils
          .sendGetRequest("data/name.json", 
            function (res) {
              var message = 
                res.firstName + " " + res.lastName
              if (res.likesChineseFood) {
                message += " likes Chinese food";
              }
              else {
                message += " doesn't like Chinese food";
              }
              message += " and uses ";
              message += res.numberOfDisplays + 1;
              message += " displays for coding.";

              document.querySelector("#content")
                .innerHTML = "<h2>" + message + "</h2>";
            });
      });
  }
);
```

```js
(function (global) {

// Set up a namespace for our utility
var ajaxUtils = {};


// Returns an HTTP request object
function getRequestObject() {
  if (global.XMLHttpRequest) {
    return (new XMLHttpRequest());
  } 
  else if (global.ActiveXObject) {
    // For very old IE browsers (optional)
    return (new ActiveXObject("Microsoft.XMLHTTP"));
  } 
  else {
    global.alert("Ajax is not supported!");
    return(null); 
  }
}


// Makes an Ajax GET request to 'requestUrl'
ajaxUtils.sendGetRequest = 
  function(requestUrl, responseHandler, isJsonResponse) {
    var request = getRequestObject();
    request.onreadystatechange = 
      function() { 
        handleResponse(request, 
                       responseHandler,
                       isJsonResponse); 
      };
    request.open("GET", requestUrl, true);
    request.send(null); // for POST only
  };


// Only calls user provided 'responseHandler'
// function if response is ready
// and not an error
function handleResponse(request,
                        responseHandler,
                        isJsonResponse) {
  if ((request.readyState == 4) &&
     (request.status == 200)) {

    // Default to isJsonResponse = true
    if (isJsonResponse == undefined) {
      isJsonResponse = true;
    }

    if (isJsonResponse) {
      responseHandler(JSON.parse(request.responseText));
    }
    else {
      responseHandler(request.responseText);
    }
  }
}


// Expose utility to the global object
global.$ajaxUtils = ajaxUtils;


})(window);
```

```html
<!-- same as prior -->
```

## Fixing Mobile Nav Menu Automatic Collapse

[Link to Lecture 59](../course_materials/fullstack-course4/examples/Lecture59/)

## Dynamically Loading Home View Content

[Link to Lecture 60](../course_materials/fullstack-course4/examples/Lecture60/)

## Dynamically Loading Menu Categories View

[Link to Lecture 61](../course_materials/fullstack-course4/examples/Lecture61/)

## Dynamically Loading Single Category View

[Link to Lecture 62](../course_materials/fullstack-course4/examples/Lecture62/)

## Changing `active` Button Style Through Javascript

[Link to Lecture 63](../course_materials/fullstack-course4/examples/Lecture63/)

## Check out the final deployed site

[Link to Lecture 64](../course_materials/fullstack-course4/examples/Lecture64/)