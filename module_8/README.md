# Module 8: Promises, Ajax, and Custom Directives


## Asynchronous Behavior with Promises and $q

[Link to Lecture 24](../course_materials/fullstack-course5/examples/Lecture24/)

```js
asyncFunction(function (){
    // Do when asyncFunction is done
})
```

Before promises, you needed to use a callback approach. And chaining async behavior required nested asynchronous functions.

This led to hard to read code, and messy error handling. Making the functions parallel was a mess too.

Promises is a newer feature of AngularJS and ES6.

Promose: Object which can be passed around or returned that holds references to the outcome of asynchronous behavior

In angular 1, promises are created through the `$q` service

```js
function asyncFunction () {
    // Creates async env with all the hooks into it, including promise object
    var deferred = $d.defer();

    // Marks successful completion, wraps data for the promise
    if (...) { deferred.resolved(result); }

    // If something goes wrong, we can reject and wrap data for the promise on the error
    else { deferred.reject(error); }

    // Return promise to the caller
    return deferred.promise.
}
```

The middle portion here with the if statements, can be done asyncrhonously.

Using the promise:

```js
var promise = asyncFunction();

promise.then(function (result) {
    // Do something with result
},

function (error) {
    // Do something with error
}).then(...);

// the `then` function is also chainable
```

the q service also has the ability to resolve multiple promises at the same time.

```js
$q.all([promise1, promise2])

.then(function (result) {
    // do something with the result
})

.catch(function (error) {
    // handle error
});
```

Promises Example

```js
(function () {
'use strict';

angular.module('ShoppingListPromiseApp', [])
.controller('ShoppingListController', ShoppingListController)
.service('ShoppingListService', ShoppingListService)
.service('WeightLossFilterService', WeightLossFilterService);

ShoppingListController.$inject = ['ShoppingListService'];
function ShoppingListController(ShoppingListService) {
  var list = this;

  list.items = ShoppingListService.getItems();

  list.itemName = "";
  list.itemQuantity = "";

  list.addItem = function () {
    ShoppingListService.addItem(list.itemName, list.itemQuantity);
  };

  list.removeItem = function (itemIndex) {
    ShoppingListService.removeItem(itemIndex);
  };
}


ShoppingListService.$inject = ['$q', 'WeightLossFilterService'];
function ShoppingListService($q, WeightLossFilterService) {
  var service = this;

  // List of shopping items
  var items = [];

  // service.addItem = function (name, quantity) {
  //   var promise = WeightLossFilterService.checkName(name);
  //
  //   promise.then(function (response) {
  //     var nextPromise = WeightLossFilterService.checkQuantity(quantity);
  //
  //     nextPromise.then(function (result) {
  //       var item = {
  //         name: name,
  //         quantity: quantity
  //       };
  //       items.push(item);
  //     }, function (errorResponse) {
  //       console.log(errorResponse.message);
  //     });
  //   }, function (errorResponse) {
  //     console.log(errorResponse.message);
  //   });
  // };


  // service.addItem = function (name, quantity) {
  //   var promise = WeightLossFilterService.checkName(name);
  //
  //   promise
  //   .then(function (response) {
  //     return WeightLossFilterService.checkQuantity(quantity);
  //   })
  //   .then(function (response) {
  //     var item = {
  //       name: name,
  //       quantity: quantity
  //     };
  //     items.push(item);
  //   })
  //   .catch(function (errorResponse) {
  //     console.log(errorResponse.message);
  //   });
  // };


  service.addItem = function (name, quantity) {
    var namePromise = WeightLossFilterService.checkName(name);
    var quantityPromise = WeightLossFilterService.checkQuantity(quantity);

    $q.all([namePromise, quantityPromise]).
    then(function (response) {
      var item = {
        name: name,
        quantity: quantity
      };
      items.push(item);
    })
    .catch(function (errorResponse) {
      console.log(errorResponse.message);
    });
  };

  service.removeItem = function (itemIndex) {
    items.splice(itemIndex, 1);
  };

  service.getItems = function () {
    return items;
  };
}


WeightLossFilterService.$inject = ['$q', '$timeout'];
function WeightLossFilterService($q, $timeout) {
  var service = this;

  service.checkName = function (name) {
    var deferred = $q.defer();

    var result = {
      message: ""
    };

    $timeout(function () {
      // Check for cookies
      if (name.toLowerCase().indexOf('cookie') === -1) {
        deferred.resolve(result)
      }
      else {
        result.message = "Stay away from cookies, Yaakov!";
        deferred.reject(result);
      }
    }, 3000);

    return deferred.promise;
  };


  service.checkQuantity = function (quantity) {
    var deferred = $q.defer();
    var result = {
      message: ""
    };

    $timeout(function () {
      // Check for too many boxes
      if (quantity < 6) {
        deferred.resolve(result);
      }
      else {
        result.message = "That's too much, Yaakov!";
        deferred.reject(result);
      }
    }, 1000);

    return deferred.promise;
  };
}

})();

```

for `q.all` we line up all the promises we want to execute through the `then` chain.

Summarizing:

when defining the function within `then` we're defining the logic that should execute once the promise is fulfilled.

The syntax is typically, the first function is the normal successful behavior, and the second scope (typically `.catch` for catching exceptions) is for handling errors. However, `then` scopes cascade, and so they occur sequentially, which is why

Deferred `.resolve` and `.reject` are used by an async function to implement async behavior.

## Ajax with $http Service

[Link to Lecture 25](../course_materials/fullstack-course5/examples/Lecture25/)

The HTTP service's job is to make communication with your API seamless. Its asynchronous

```js
$http({
    method: "GET",
    url: "http://someurl",
    params: { param1: "value1" }
    ...
})
.then(
function success(response) {
    // do something with response.data
},
function error(response) {
    // Do something with error response
}
);
```

Avoid this mistake.

If you set the variable outside outside the promise handler, it'll execute out of context of async. Just do this inside the async promise

```js
var msg = "";

$http({
    url: "http://somurl"
}).then (function (response) {
    msg = response.data;
    // Do this instead
    // $scope.msg = response.data
});

$scope.msg = msg;
```

We can define a constant with `.constant(name, val)` under the angular module.

We can define our commonly used API url.

We can inject that constant into functions like we do for other services and modulars.

When concatenating strings for the url we would do `(url + "/path")`

## Directives: Dynamic HTML

[Link to Lecture 26](../course_materials/fullstack-course5/examples/Lecture26/)

Directives are very core to the principle of angular. their why is:

> HTML is great for declaring static documents, but it falters when we try to use it for declaring dynamic views in web applications. Angular/S lets you extend HTML vocabulary for your application. The resulting environment is extraordinarily expressive, readable, and quick to develop.

For example, if we had a custom tag like `<list item...>`, that can be an angular tag.


Compilation:
- When angular got access the DOM, it was also able to introduce new values and lookups to the scope and DOM. this way it can attach functions and values to the DOM. This is a way of compilation where Angular compiles and links your html code.

Directive: A marker on the DOM element that tells Angular's HTML compiler to attach a specified behavior to that DOM element
- The compiler can even trasform/change the DOM elements and its children
- A marker can be an attribute, element name, comment or CSS class

1. Register Directive

`.directive('myTag', MyTag)`

The value `myTag` is a normalized  name that will appear in HTML
The second is a factory function that returns DDO (Directive Defined Object)
- Only executes once

2. Define Factory Function

```js
MyTag.$inject = ...
function MyTag(...) {
    var ddo = {
        template: 'Hello World'
        ...
    };

    return ddo;
}
```

3. Use in HTML

`<my-tag></my-tag>`

This the normalized name, camel case <-> dash is how its found/registered.

## Example

In the example, we're reusing the shopping list example

Notes:
- Unless specified, the scope of the directive is the same as the container controller
- template url lets you point to a html file

### List Item

```js
.directive('listItem', ListItem)
```

```js
function ListItem() {
    var ddo = {
        templateUrl: 'listItem.html'
    };

    return ddo;
}
```

```html
<!-- listItem.html -->
<li>
    <list-item-description></list-item-description>
    <button ng-click="list.removeItems($index);">Remove Item</button>
</li>
```

```html
<list-item ng-repeat="item in list.items"></list-item>
```

### List Item Description

```js
.directive('listItemDescription', ListItemDescription)
```

```js
function ListItemDescription() {
    var ddo = {
        template: "{{ item.quantity }} of {{ item.name }}"
    };

    return ddo;
}
```

```html
<list-item-description></list-item-description>
```

## restrict Property

[Link to Lecture 27](../course_materials/fullstack-course5/examples/Lecture27/)

restrict: Another DDO property.

The default value is `AE`. Attribute Element. Angular will look for this to be an attribute or element.

```js
function MyDirective() {
    var ddo = {
        restrict: 'AE',
        ...
    };

    return ddo;
}
```

If you want this to be only an attribute, then set it to `A`. This is a best practice if the directive is extending behavior (eg ng-repeat)

Or an element only `E`. Best practice if directive is defining a component with an associated template (the prior example).

These restrictions prevent the element from being found/added to the contexts for lookups on those.


## Directive’s Isolate Scope: “=” and “@”

[Link to Lecture 28](../course_materials/fullstack-course5/examples/Lecture28/)

Without any direction, our directive has the same scope as the parent

This can be an architectural problem. this leads to coupling between the controller and directive

With Isolate Scope, we intend to isolate the directive from these controllers such that the data is passed to the directive rather than inherited


`myProp`: the name of a property that we're mapping ou
`attributeName`: The attribute name

`=`: bidirectional binding

When just having `=` angular assumes the prop name is the same as the key

`=?`: optional bidirectional

again, camelcase -> dash
```js
function MyDirective() {
    var ddo = {
        scope: {
            myProp: '=attributeName'
        }
        ...
    };

    return ddo;
}
```

```html
<my-directive my-prop="outerProp"></my-directive>
```

```js
function MyDirective() {
    var ddo = {
        scope: {
            myProp: '@myAttribute'
        }
        ...
    };

    return ddo;
}
```

Using the `@` sign binds `myProp` to the value of DOM attribute `my-attribute`

```html
<my-directive my-attribute="{{outerProp}}"></my-directive>
```

This behaves as a one way binding

Use the variables in html by interpolating the key value `{{ myProp }}` for example

## Using Controllers Inside Directives

[Link to Lecture 29](../course_materials/fullstack-course5/examples/Lecture29/)

You can declare a controller inside of a directive to create more custom behavior

```js
function MyDirective() {
    var ddo = {
        scope: {
            prop: '='
        },
        controller: ControllerFunction,
        bindToController: true,
        controllerAs: 'myCtrl',
        templateUrl: 'template.html'
    };

    return ddo;
}
```

When defining the controller, use the `var myCtrl = this;` trick for refining the scope.

Another way to do one way binding is with `<`. Which watches the identity of the parent propery, not the property inside the directive.

There is a caveat. Making changes to properties of object literals passed to the directive will propagate to the outside context because JS passes by reference. So one way binding isn't perfectly one way, but it helps.

## Directive APIs and “&”

[Link to Lecture 30](../course_materials/fullstack-course5/examples/Lecture30/)

Use `this` to define the function on a controller (this is important).

```js
function MyDirective() {
    var ddo = {
        scope: {
            myMethod: '&method'
        },
        ...
    };

    return ddo;
}
```


## Manipulating the DOM with link

## Using Directive’s transclude to Wrap Other Elements
