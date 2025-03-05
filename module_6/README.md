# Module 6

## Why NOT Keep Things Simple?

Why add anything other than HTML, CSS and JS?

Its the Javascript that typically grows in complexity in a project.
- Additional tech addresses complexity in the project

We need to find relevant code quickly (for you and your team)

We also need to be able to update functionality without rewriting large portions of code

We want to reuse code

Code should be easy to test

## Why Does Code Get Complex?

Hard to read code
- inconsistent styles
- hard to read vars and function names
- no comments or documentation

Lack of high cohesion and low coupling

high cohesion
- small pieces of functionality are strongly related to each other within some code boundary

How well does that function stick to doing that one thing?

Loose Coupling
- changing the functionality of one thing does not affect the functionality of another thing

Tightly coupling Javascript functions to ID tags in html is tighter coupling

For example, when changing something in your html **directly** means having to make a change in your javascript thats tight coupling

## Model-View-ViewModel (MVVM)

How do we achieve higher cohesion? We need to separate our code into separate pieces of functionality.

There are certain frameworks that solve specific problems with a specific design pattern. With experience you can identify what design pattern is best for the problem.

In our case we're going to use a Model-View-ViewModel design
- Model: 
  - Represents and holds raw data
  - Something you may get from an API. Can have the logic to retrieve the data
  - May be displayed in the view
- View
  - The user interface
    - HTML and CSS
  - Only displays the data it is given, never changes the data
  - Declaratively broadcasts events, but never handlesthem
    - Declaratively, you state if this event happens where is it handled
- ViewModel
  - Representation of the state of the view
  - Holds the data displayed in the view
  - Responds to events
    - Business logic
    - Can call other functionality to get it done
  - Never asks view to display anything, never directly interacts with the view
- Declarative Binder
  - Declaratively binds the ViewModel and the view
  - You don't have to write any code to have this happen, the framework does it

The ViewModel reaches out to the model for data, and the model replies with it

You declaratively create a data binding between the view and the ViewModel

You can also directly manipulate the DOM in the ViewModel

Also called Model-View-Whatever cause its flexible in Angular
## AngularJS Installation and First Simple App

Note this is for angular 1

[Link to Lecture 4](../course_materials/fullstack-course5/examples/Lecture04/)

in this lesson, we're just using the angular min.js

Go to https://angularjs.org

Angular exposes the `angular` global variable

controller takes the name of the controller, and a function for the controller

use strict is important to have

```js
(function() {
'use strict';

angular.module('myFirstApp', [])
    .controller('myFirstController', function() {

    })

})();
```

You can connect it to the `view` by adding `ng-app='myFirstApp'` to the html tag

And then `ng-controller` controls the content in the view.


## Sharing Data With The View Through Scope

[Link to Lecture 5](../course_materials/fullstack-course5/examples/Lecture05/)

Most things with a `$` in angular is a reserved keyword

This $scope variable is available in the scope, and html

```js
(function() {
'use strict';

angular.module('myFirstApp', [])
.controller('myFirstController', function($scope) {

    $scope.name = 'mike';
    $scope.sayHello = function() {
        return 'hello Coursera'
    };

});

})();
```
```
{{name}}
```

We can also bind the view to the view model with

```html
<input type="text" ng-model="name">
{{name}}
```

the second we change the variable, it'll appear on the page with the change

## Implementing NameCalculator Example in AngularJS

[Link to Lecture 6](../course_materials/fullstack-course5/examples/Lecture06/)

ng-keyup is a binding for when a key has been pressed

`ng-keyup=displayNumeric();`

## What’s Behind the “Magic”: Custom HTML Attributes

You can use the query selector to find an html tag with the `ng-app` attribute

`document.querySelector("[ng-app]")`

## Dependency Injection

Used throughout Angular

Where does $scope come from and who instantiates it?

Angular Js instantiates it for us, we get it through **dependency injection**

Dependency injection is a design pattern that implements inversion of control for resolving dependencies.

```js
angular.Module('myApp', [])
```

For example if we had a shopping app. we have some function for charging a particular bank because it has its own way of processing. We dont want to couple the cart with this charging function.

regular control: instantiate the charge function in the cart

If we wanted to change this, we'd have to go through all these steps to include a new charging function and integrate it. This leads to tight coupling. Having to change code in the function we're trying to test is backwards.

Inversion of control is where we pass a credit card charging module as part of the input to the cart

> don't call us, we'll call you

The cart code does not change for different cards

## How Dependency Injection Works in Javascript

[Link to Lecture 9](../course_materials/fullstack-course5/examples/Lecture09/)


`$filter` service is a service that lets us create filtering functions that are used for formatting the data that gets displayed to the user


Angular parses out the dollar sign services and injects the service. $injector is what does this
```js
(function() {
'use strict';

angular.module('DIApp', [])
.controller('DIController', DIController);


function DIController($scope, $filter){
    $scope.name = "mike";

    $scope.upper = function(){
        var upCase = $filter('uppercase');
        $scope.name = upcase($scope.name);
    }
}

function AnnotateMe(name, job, blah) {
    return "Blah";
}
})();
```

Then bind the `upper` function to `ng-blur`

## Protecting Dependency Injection from Minification

Minification is the process of removing unneccessary characters, without changing functionality.

The purpose is to reduce the amount of data transferred.

Minification can cause errors. A minifier can remove the $scope and $filter

We can specify what this function is to expect

```js
(function() {
'use strict';

angular.module('DIApp', [])
.controller('DIController', ['$scope', '$filter', DIController]);


function DIController($scope, $filter){
    $scope.name = "mike";

    $scope.upper = function(){
        var upCase = $filter('uppercase');
        $scope.name = upcase($scope.name);
    }
}

function AnnotateMe(name, job, blah) {
    return "Blah";
}
})();
```
## Expressions and Interpolation

Expression: `{{exp}}`
- An expression is something that evaluates to some value
- Processed by Angular and are roughly similar to the result of `eval`
- Executed in the context of the scope and has access to properties in the scope
- Doesn't throw errors if it is invalid
- Control logic is not allowed
- Filter chains are allowed

Interpolation: Process of evaluating a string literal containing one or more placeholders, which are replaced with values.
- In angular `Message is {{ message }}`, could be evaluted to `Message is hello`, if message=hello
  - And then message is still connected, so if this changes it'll update

For example you can put a function call in HTML `{{ sayHello() }}`