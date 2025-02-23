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

Used to stand for:
Asynchronous Javascript and XML

While it started as XML, very few apps use it
- plain text (and html) and JSONis used instead

It used to be that the entire page was sent to the server when a request was sent

The change tonow is that a small piece of data is returned that is inserted.

Synchronous is one execution at a time.

Asynchronous is more than one instruction at a time.

How is AJAX async if JS is sync?
- In the browser
  - There is an event queue in the browser
  - There is an HTML rendering engine
  - JS engine
  - WebGL
  - HTTP Requestor
    - This is asynchronous

AJAX request uses a special object to reach out to the HTTP requestor, and the code continues.
- The JS function address is the response handler.
- There is another section of code used as a callback handler for when it finishes

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
                // You have to put all asnycnhronous logic for setting here
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

// IIFE
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
    // Get the request object
    var request = getRequestObject();
    request.onreadystatechange = 
      // This is the function that gets called
      function() { 
        handleResponse(request, responseHandler); 
      };
    // False will make this synchronous
    request.open("GET", requestUrl, true);
    // Request parameters would go here instead of null
    request.send(null); // for POST only
  };


// Only calls user provided 'responseHandler'
// function if response is ready
// and not an error
function handleResponse(request,
                        responseHandler) {
  //   If the request is ready (4)
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

JSON is a commonly used format.
- JavaScript Object Notation
- Lightweight data interchange format
- Easy for humans to read and write
- Easy for machines to parse and generate
- Completely independent of any language

Syntax:
- Subset of JS object literal
- Property names must be in double quotes
- string value must be in double quotes

```json
{
    "name": "John",
    "likesFood": true,
    "numberOfDisplays": 3
}
```

JSON is not a javascrcipt object literal, it is just a string

`var obj = JSON.parse(jsonString);`

`var str = JSON.stringify(obj);`

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

Clicking anywhere else does not close the drop down.

So when the area loses focus (onBlur)

We want the funcionality to occur when loaded. Bootstrap uses JQuery. The JQuery function name is `$`. So its dollar sign, and then something is executed. The `$` can also serve as a selector

`.blur` is really just `onblur`

When you click outside, the blur event occurs
```js
$(function () { // Same as document.addEventListener("DOMContentLoaded"...

  // Same as document.querySelector("#navbarToggle").addEventListener("blur",...
  $("#navbarToggle").blur(function (event) {
    // Grab the width of the browser window itself
    var screenWidth = window.innerWidth;
    if (screenWidth < 768) {
      $("#collapsable-nav").collapse('hide');
    }
  });

  // In Firefox and Safari, the click event doesn't retain the focus
  // on the clicked button. Therefore, the blur event will not fire on
  // user clicking somewhere else in the page and the blur event handler
  // which is set up above will not be called.
  // Refer to issue #28 in the repo.
  // Solution: force focus on the element that the click event fired on
  $("#navbarToggle").click(function (event) {
    $(event.target).focus();
  });
});
```

## Dynamically Loading Home View Content

[Link to Lecture 60](../course_materials/fullstack-course4/examples/Lecture60/)

There is a new folder called `snippets` which has subsections of the site.

XHR: XML HTTP Requests
```js
...
(function (global) {

var dc = {};

var homeHtml = "snippets/home-snippet.html";

// Convenience function for inserting innerHTML for 'select'
var insertHtml = function (selector, html) {
  var targetElem = document.querySelector(selector);
  targetElem.innerHTML = html;
};

// Show loading icon inside element identified by 'selector'.
var showLoading = function (selector) {
  var html = "<div class='text-center'>";
  html += "<img src='images/ajax-loader.gif'></div>";
  insertHtml(selector, html);
};

// On page load (before images or CSS)
document.addEventListener("DOMContentLoaded", function (event) {

// On first load, show home view
showLoading("#main-content");
$ajaxUtils.sendGetRequest(
  homeHtml,
  function (responseText) {
    document.querySelector("#main-content")
      .innerHTML = responseText;
  },
  false);
});


global.$dc = dc;

})(window);

```

## Dynamically Loading Menu Categories View

[Link to Lecture 61](../course_materials/fullstack-course4/examples/Lecture61/)

How did we get the data?
- We have a website: https://coursera-jhu-default-rtdb.firebaseio.com/categories.json
  - We'll query with a firebase app

Your JS only has the same permissions/access that you do. This is what CORS/Origin is for, preventing you from accessing things you shouldn't.

If you have a json in your browser page, you can go to devtools>network and then click the json, and that lets you view it more effectively

The snippet is more like a template with `{{var}}` inserts.

`string.replace(new RegExp(propToReplace, "g"), propValue)` can be used to replace the variable insert tags.
```js
(function (global) {
  var dc = {};

  var homeHtml = "snippets/home-snippet.html";
  var allCategoriesUrl =
    "https://coursera-jhu-default-rtdb.firebaseio.com/categories.json";
  var categoriesTitleHtml = "snippets/categories-title-snippet.html";
  var categoryHtml = "snippets/category-snippet.html";

  // Convenience function for inserting innerHTML for 'select'
  var insertHtml = function (selector, html) {
    var targetElem = document.querySelector(selector);
    targetElem.innerHTML = html;
  };

  // Show loading icon inside element identified by 'selector'.
  var showLoading = function (selector) {
    var html = "<div class='text-center'>";
    html += "<img src='images/ajax-loader.gif'></div>";
    insertHtml(selector, html);
  };

  // Return substitute of '{{propName}}'
  // with propValue in given 'string'
  var insertProperty = function (string, propName, propValue) {
    var propToReplace = "{{" + propName + "}}";
    string = string.replace(new RegExp(propToReplace, "g"), propValue);
    return string;
  };

  // On page load (before images or CSS)
  document.addEventListener("DOMContentLoaded", function (event) {
    // On first load, show home view
    showLoading("#main-content");
    $ajaxUtils.sendGetRequest(
      homeHtml,
      function (responseText) {
        document.querySelector("#main-content").innerHTML = responseText;
      },
      false
    );
  });

  // Load the menu categories view
  dc.loadMenuCategories = function () {
    showLoading("#main-content");
    $ajaxUtils.sendGetRequest(allCategoriesUrl, buildAndShowCategoriesHTML);
  };

  // Builds HTML for the categories page based on the data
  // from the server
  function buildAndShowCategoriesHTML(categories) {
    // Load title snippet of categories page
    $ajaxUtils.sendGetRequest(
      categoriesTitleHtml,
      function (categoriesTitleHtml) {
        // Retrieve single category snippet
        $ajaxUtils.sendGetRequest(
          categoryHtml,
          function (categoryHtml) {
            var categoriesViewHtml = buildCategoriesViewHtml(
              categories,
              categoriesTitleHtml,
              categoryHtml
            );
            insertHtml("#main-content", categoriesViewHtml);
          },
          false
        );
      },
      false
    );
  }

  // Using categories data and snippets html
  // build categories view HTML to be inserted into page
  function buildCategoriesViewHtml(
    categories,
    categoriesTitleHtml,
    categoryHtml
  ) {
    var finalHtml = categoriesTitleHtml;
    finalHtml += "<section class='row'>";

    // Loop over categories
    for (var i = 0; i < categories.length; i++) {
      // Insert category values
      var html = categoryHtml;
      var name = "" + categories[i].name;
      var short_name = categories[i].short_name;
      html = insertProperty(html, "name", name);
      html = insertProperty(html, "short_name", short_name);
      finalHtml += html;
    }

    finalHtml += "</section>";
    return finalHtml;
  }

  global.$dc = dc;
})(window);

```

## Dynamically Loading Single Category View

[Link to Lecture 62](../course_materials/fullstack-course4/examples/Lecture62/)

```js
(function (global) {
  var dc = {};

  var homeHtml = "snippets/home-snippet.html";
  var allCategoriesUrl =
    "https://coursera-jhu-default-rtdb.firebaseio.com/categories.json";
  var categoriesTitleHtml = "snippets/categories-title-snippet.html";
  var categoryHtml = "snippets/category-snippet.html";
  var menuItemsUrl =
    "https://coursera-jhu-default-rtdb.firebaseio.com/menu_items/";
  var menuItemsTitleHtml = "snippets/menu-items-title.html";
  var menuItemHtml = "snippets/menu-item.html";

  // Convenience function for inserting innerHTML for 'select'
  var insertHtml = function (selector, html) {
    var targetElem = document.querySelector(selector);
    targetElem.innerHTML = html;
  };

  // Show loading icon inside element identified by 'selector'.
  var showLoading = function (selector) {
    var html = "<div class='text-center'>";
    html += "<img src='images/ajax-loader.gif'></div>";
    insertHtml(selector, html);
  };

  // Return substitute of '{{propName}}'
  // with propValue in given 'string'
  var insertProperty = function (string, propName, propValue) {
    var propToReplace = "{{" + propName + "}}";
    string = string.replace(new RegExp(propToReplace, "g"), propValue);
    return string;
  };

  // On page load (before images or CSS)
  document.addEventListener("DOMContentLoaded", function (event) {
    // On first load, show home view
    showLoading("#main-content");
    $ajaxUtils.sendGetRequest(
      homeHtml,
      function (responseText) {
        document.querySelector("#main-content").innerHTML = responseText;
      },
      false
    );
  });

  // Load the menu categories view
  dc.loadMenuCategories = function () {
    showLoading("#main-content");
    $ajaxUtils.sendGetRequest(allCategoriesUrl, buildAndShowCategoriesHTML);
  };

  // Load the menu items view
  // 'categoryShort' is a short_name for a category
  dc.loadMenuItems = function (categoryShort) {
    showLoading("#main-content");
    $ajaxUtils.sendGetRequest(
      menuItemsUrl + categoryShort + ".json",
      buildAndShowMenuItemsHTML
    );
  };

  // Builds HTML for the categories page based on the data
  // from the server
  function buildAndShowCategoriesHTML(categories) {
    // Load title snippet of categories page
    $ajaxUtils.sendGetRequest(
      categoriesTitleHtml,
      function (categoriesTitleHtml) {
        // Retrieve single category snippet
        $ajaxUtils.sendGetRequest(
          categoryHtml,
          function (categoryHtml) {
            var categoriesViewHtml = buildCategoriesViewHtml(
              categories,
              categoriesTitleHtml,
              categoryHtml
            );
            insertHtml("#main-content", categoriesViewHtml);
          },
          false
        );
      },
      false
    );
  }

  // Using categories data and snippets html
  // build categories view HTML to be inserted into page
  function buildCategoriesViewHtml(
    categories,
    categoriesTitleHtml,
    categoryHtml
  ) {
    var finalHtml = categoriesTitleHtml;
    finalHtml += "<section class='row'>";

    // Loop over categories
    for (var i = 0; i < categories.length; i++) {
      // Insert category values
      var html = categoryHtml;
      var name = "" + categories[i].name;
      var short_name = categories[i].short_name;
      html = insertProperty(html, "name", name);
      html = insertProperty(html, "short_name", short_name);
      finalHtml += html;
    }

    finalHtml += "</section>";
    return finalHtml;
  }

  // Builds HTML for the single category page based on the data
  // from the server
  function buildAndShowMenuItemsHTML(categoryMenuItems) {
    // Load title snippet of menu items page
    $ajaxUtils.sendGetRequest(
      menuItemsTitleHtml,
      function (menuItemsTitleHtml) {
        // Retrieve single menu item snippet
        $ajaxUtils.sendGetRequest(
          menuItemHtml,
          function (menuItemHtml) {
            var menuItemsViewHtml = buildMenuItemsViewHtml(
              categoryMenuItems,
              menuItemsTitleHtml,
              menuItemHtml
            );
            insertHtml("#main-content", menuItemsViewHtml);
          },
          false
        );
      },
      false
    );
  }

  // Using category and menu items data and snippets html
  // build menu items view HTML to be inserted into page
  function buildMenuItemsViewHtml(
    categoryMenuItems,
    menuItemsTitleHtml,
    menuItemHtml
  ) {
    menuItemsTitleHtml = insertProperty(
      menuItemsTitleHtml,
      "name",
      categoryMenuItems.category.name
    );
    menuItemsTitleHtml = insertProperty(
      menuItemsTitleHtml,
      "special_instructions",
      categoryMenuItems.category.special_instructions
    );

    var finalHtml = menuItemsTitleHtml;
    finalHtml += "<section class='row'>";

    // Loop over menu items
    var menuItems = categoryMenuItems.menu_items;
    var catShortName = categoryMenuItems.category.short_name;
    for (var i = 0; i < menuItems.length; i++) {
      // Insert menu item values
      var html = menuItemHtml;
      html = insertProperty(html, "short_name", menuItems[i].short_name);
      html = insertProperty(html, "catShortName", catShortName);
      html = insertItemPrice(html, "price_small", menuItems[i].price_small);
      html = insertItemPortionName(
        html,
        "small_portion_name",
        menuItems[i].small_portion_name
      );
      html = insertItemPrice(html, "price_large", menuItems[i].price_large);
      html = insertItemPortionName(
        html,
        "large_portion_name",
        menuItems[i].large_portion_name
      );
      html = insertProperty(html, "name", menuItems[i].name);
      html = insertProperty(html, "description", menuItems[i].description);

      // Add clearfix after every second menu item
      if (i % 2 != 0) {
        html +=
          "<div class='clearfix visible-lg-block visible-md-block'></div>";
      }

      finalHtml += html;
    }

    finalHtml += "</section>";
    return finalHtml;
  }

  // Appends price with '$' if price exists
  function insertItemPrice(html, pricePropName, priceValue) {
    // If not specified, replace with empty string
    if (!priceValue) {
      return insertProperty(html, pricePropName, "");
    }

    priceValue = "$" + priceValue.toFixed(2);
    html = insertProperty(html, pricePropName, priceValue);
    return html;
  }

  // Appends portion name in parens if it exists
  function insertItemPortionName(html, portionPropName, portionValue) {
    // If not specified, return original string
    if (!portionValue) {
      return insertProperty(html, portionPropName, "");
    }

    portionValue = "(" + portionValue + ")";
    html = insertProperty(html, portionPropName, portionValue);
    return html;
  }

  global.$dc = dc;
})(window);
```

## Changing `active` Button Style Through Javascript

[Link to Lecture 63](../course_materials/fullstack-course4/examples/Lecture63/)

A process for dynamically adding/removing `active` class

```js
// Remove the class 'active' from home and switch to Menu button
  var switchMenuToActive = function () {
    // Remove 'active' from home button
    var classes = document.querySelector("#navHomeButton").className;
    classes = classes.replace(new RegExp("active", "g"), "");
    document.querySelector("#navHomeButton").className = classes;

    // Add 'active' to menu button if not already there
    classes = document.querySelector("#navMenuButton").className;
    if (classes.indexOf("active") == -1) {
      classes += " active";
      document.querySelector("#navMenuButton").className = classes;
    }
  };
```



## Check out the final deployed site

[Part 1](https://jhu-ep-coursera.github.io/fullstack-course4/examples/Lecture63/after/#)
[Part 2 Angular](http://www.davidchuschinabistro.com/)