# Module 7 - Filters, Digest Cycle, Controller Inheritance, and Custom Services

## Filters

[Link to Lecture 12](../course_materials/fullstack-course5/examples/Lecture12/)

Filters are a special construct to change the output of something

`var output = $filter('uppercase')(value)`

Sometimes filters have custom arguments that change their behavior

`var output = $filter('currency')(value, customArg1, customArg2)`

You can also use filters in html

`{{ "hello" | uppercase }}`

And with custom arguments

`{{ "hello" | currency : arg1 : arg2 }}`

to use $filter in a module, add it like you would $scope

Angular has a collection of built in filters
## Creating Custom Filters

[Link to Lecture 13](../course_materials/fullstack-course5/examples/Lecture13/)

The pattern for custom filters is a factory function

```js
function CustomFilterFactory() {
  return function (input) {
    return input;
  }
}
```

To use this filter, you have to inject it

```js
.filter('custom', CustomFilterFactory)

Ctrl.$inject = ['$scope', `customFilter`]

function Ctrl($scope, $customFilter){
    customFilter("Hello")
}
...
```

You use the name + "Filter" to reference it. The factory's product is injected.

```js
function LovesFilter() {
  return function (input) {
    input = input || "";
    input = input.replace("likes", "loves");
    return input;
  };
}
```
```js
function TruthFilter() {
  return function (input, target, replace) {
    input = input || "";
    input = input.replace(target, replace);
    return input;
  }
}
```

## Digest Cycle

[Link to Lecture 14](../course_materials/fullstack-course5/examples/Lecture14/)

How does data flow in angular?

We're familiar with the event queue

When we bind an angular event `ng-*`, it is triggered in the event queue and handled in the angular context ($scope)

`$scope` has a set of special array of watchers. A watcher's job is to check if any of the properties has changed as a result of the event that just happened.

The iteration over the watchers is the digest loop, and the whole procedure is the digest cycle.

All watchers are looped over until no changes are made. This is because a change can cause another prop to change.

In game development this is called dirty checking

You can check the watchers with `$scope.$$watchersCount`

The non-recommended way of setting up watchers is

```js
<!DOCTYPE html>
<html ng-app='CounterApp'>
  <head>
    <meta charset="utf-8">
    <script src="angular.min.js"></script>
    <script src="app.js"></script>
    <style> body { font-size: 1.2em; }</style>
    <title>The Digest Cycle</title>
  </head>
  <body>
    <h1>The Digest Cycle</h1>
    <div ng-controller='CounterController'>
      <button ng-click="showNumberOfWatchers()">
        Log # of Watchers</button>
        <input type="text" ng-model="name">
      <div>
        <button ng-click="countOnce()">Up Once Counter (once)</button>
        <button ng-click="upCounter()">Increment Counter</button>
      </div>
      <div>
        Once counter: {{ onceCounter }} <br>
        Regular counter: {{ counter }}
      </div>
    </div>
  </body>
</html>
```

```js
  $scope.$watch('onceCounter', function (newValue, oldValue) {
    console.log("onceCounter old value: ", oldValue);
    console.log("onceCounter new value: ", newValue);
  });
  
  $scope.$watch('counter', function (newValue, oldValue) {
    console.log("counter old value: ", oldValue);
    console.log("counter new value: ", newValue);
  });
```

Rather, this is recommended

```js
CounterController.$inject = ['$scope'];
function CounterController($scope) {
  $scope.onceCounter = 0;
  $scope.counter = 0;
  $scope.name = "Yaakov";

  $scope.showNumberOfWatchers = function () {
    console.log("# of Watchers: ", $scope.$$watchersCount);
  };

// Increments the digest loop once
  $scope.countOnce = function () {
    $scope.onceCounter = 1;
  };

    // Increments the digest loop twice
  $scope.upCounter = function () {
    $scope.counter++;
  };

  $scope.$watch(function () {
    console.log("Digest Loop Fired!");
  })
}
```

1. Manually set a `$watch` 
   1. Not recommended in a controller, but okay in a service, dir, comp
2. Interpolate with {{}} the property
3. with `ng-model` on an input element (two way binding)

## $digest and $apply

[Link to Lecture 15](../course_materials/fullstack-course5/examples/Lecture15/)

How could we handle a timeout?

This won't actually execute properly without `$apply`, the timeout is outside of the angular context.

With `$apply` the digest cycle is manually "applied".
```js
  $scope.upCounter = function () {
    setTimeout(function () {
      $scope.$apply(function () {
        $scope.counter++;
        console.log("Counter incremented!");
      });
    }, 2000);
  };
```

It can be fixed or done differently by manually invoking the digest cycle
```js
  $scope.upCounter = function () {
    setTimeout(function () {
      $scope.counter++;
      console.log("Counter incremented!");
      $scope.$digest();
    }, 2000);
  };
```

But you can also just use the built in `$timeout`

```js
(function () {
'use strict';

angular.module('CounterApp', [])
.controller('CounterController', CounterController);

CounterController.$inject = ['$scope', '$timeout'];
function CounterController($scope, $timeout) {
  $scope.counter = 0;

  $scope.upCounter = function () {
    $timeout(function () {
      $scope.counter++;
      console.log("Counter incremented!");
    }, 2000);
  };
}

})();
```

The digest cycle is not triggered automatically if events are unaware of Angular.
1. Call $digest
2. Wrap your code in $apply
3. Call an Angular service that handles the same functionality

## 2-way, 1-way and 1-time Binding

[Link to Lecture 16](../course_materials/fullstack-course5/examples/Lecture16/)

2 way binding 
`<input type="text" ng-model="name">`

1 way binding
`<div>Echo: {{ lastName }}</div>`

If we have a lot of bindings, then we have a lot of watchers. If you have too many, the performance of your app will degrade. You should have no more than 2000 watchers per page as a rule of thumb.

Minimizing the number of active watchers in the digest list is preferable.

A 1 time binding is only called once:
`<div>Echo: {{ ::fullName }}</div>`

If we initialize the 1 time property, then it gets set. So be careful to only initialize with the value you want.

```html
<!DOCTYPE html>
<html ng-app='BindingApp'>
  <head>
    <meta charset="utf-8">
    <script src="angular.min.js"></script>
    <script src="app.js"></script>
    <style> body { font-size: 1.2em; }</style>
    <title>2-way, 1-way, and 1-time binding</title>
  </head>
  <body>
    <h1>2-way, 1-way, and 1-time binding</h1>
    <div ng-controller='BindingController'>

      <button ng-click="showNumberOfWatchers()">Log # of Watchers</button>
      <button ng-click="setFullName()">Set Full Name</button><br>

      Full name is: {{ :: fullName }} <br>
      <button ng-click="logFirstName()">Log First Name</button><br>
      <button ng-click="logFullName()">Log Full Name</button><br>

      <div>
        <input type="text" ng-model="firstName">
      </div>
    </div>
  </body>
</html>
```

```js
(function () {
'use strict';

angular.module('BindingApp', [])
.controller('BindingController', BindingController);

BindingController.$inject = ['$scope'];
function BindingController($scope) {
  $scope.firstName = "Yaakov";
  // $scope.fullName = "";

  $scope.showNumberOfWatchers = function () {
    console.log("# of Watchers: ", $scope.$$watchersCount);
  };

  $scope.setFullName = function () {
    $scope.fullName = $scope.firstName + " " + "Chaikin";
  };

  $scope.logFirstName = function () {
    console.log("First name is: ", $scope.firstName);
  };

  $scope.logFullName = function () {
    console.log("Full name is: ", $scope.fullName);
  };
}

})();
```
## Looping, Controller As Syntax

[Link to Lecture 17](../course_materials/fullstack-course5/examples/Lecture17/)

```js
(function () {
'use strict';

var shoppingList1 = [
  "Milk", "Donuts", "Cookies", "Chocolate", "Peanut Butter", "Pepto Bismol", "Pepto Bismol (Chocolate flavor)", "Pepto Bismol (Cookie flavor)"
];

var shoppingList2 = [
  {
    name: "Milk",
    quantity: "2"
  },
  {
    name: "Donuts",
    quantity: "200"
  },
  {
    name: "Cookies",
    quantity: "300"
  },
  {
    name: "Chocolate",
    quantity: "5"
  }
];

angular.module('ShoppingListApp', [])
.controller('ShoppingListController', ShoppingListController);

ShoppingListController.$inject = ['$scope'];
function ShoppingListController($scope) {
  $scope.shoppingList1 = shoppingList1;
  $scope.shoppingList2 = shoppingList2;

  $scope.addToList = function () {
    var newItem = {
      name: $scope.newItemName,
      quantity: $scope.newItemQuantity
    };

    $scope.shoppingList2.push(newItem);
  };
}

})();
```

## ng-repeat & filtered ng-repeat

[Link to Lecture 18](../course_materials/fullstack-course5/examples/Lecture18/)

ng-repeat is a directive that can iterate through a list.

We can traverse the javascript with its typical dot notation.

Using `$index` will access the index in the loop

`ng-model` can point to a specific attribute in a list

We can provide a search term directly to our filter and only show items with the search term in the ng-repeat

```html
<!DOCTYPE html>
<html ng-app='ShoppingListApp'>
  <head>
    <meta charset="utf-8">
    <script src="angular.min.js"></script>
    <script src="app.js"></script>
    <style> body { font-size: 1.2em; }</style>
    <title>ng-repeat</title>
  </head>
  <body>
    <h1>ng-repeat</h1>
    <div ng-controller='ShoppingListController'>
      <!-- Searchable Shopping List: -->
      <h3>Shopping List:</h3>
      <input type="text" ng-model="search">
      <ul>
        <li ng-repeat="item in shoppingList | filter : search">{{ item }}</li>
      </ul>
    </div>
  </body>
</html>
```

```js
// app.js
(function () {
'use strict';

var shoppingList = [
  "Milk", "Donuts", "Cookies", "Chocolate", "Peanut Butter", "Pepto Bismol", "Pepto Bismol (Chocolate flavor)", "Pepto Bismol (Cookie flavor)"
];

angular.module('ShoppingListApp', [])
.controller('ShoppingListController', ShoppingListController);

ShoppingListController.$inject = ['$scope'];
function ShoppingListController($scope) {
  $scope.shoppingList = shoppingList;
}

})();
```

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <script src="filter.js"></script>
    <title>Filter Array Example</title>
  </head>
  <body>
    <h1>Filter Array Example</h1>
  </body>
</html>
```

```js
// filter.js
var numberArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log("Number array: ", numberArray);

function above5Filter(value) {
  return value > 5;
}
var filteredNumberArray = numberArray.filter(above5Filter);
console.log("Filtered number array: ", filteredNumberArray);

var shoppingList = [
  "Milk", "Donuts", "Cookies", "Chocolate", "Peanut Butter", "Pepto Bismol", "Pepto Bismol (Chocolate flavor)", "Pepto Bismol (Cookie flavor)"
];
console.log("Shopping List: ", shoppingList);

var searchValue = "Bismol";
function containsFilter(value) {
  return value.indexOf(searchValue) !== -1;
}
var searchedShoppingList = shoppingList.filter(containsFilter);
console.log("Searched Shopping List: ", searchedShoppingList);
```


## Prototypal/Scope Inheritance and Controller As Syntax

[Link to Lecture 19](../course_materials/fullstack-course5/examples/Lecture19/)

Prototypal inheritence is a funamental concept in JS.

Inheritance: When an object or class is based on another object or class

Prototypal is based on object instances. So if there is an object called parent with a method and var, then a child will have nothing. But if we called the var from child, JS will look at the prototypal chain to see if the parent has it.

What if we set the var? The child object has the new variable value. The inherited value is "masked", and there is no search for the var.

the syntax is `Object.create(parent);`

The child has a `__proto__` property where the JS engine holds a reference to the parent object. You shouldn't reference this in your code however.

When creating an object, if you don't use `new` then the object won't be pointing to the correct scope with `this` inside it. It'll point to the outer (global) scope.

**Scope Inheritance**

Its not uncommon for one controller to handle most logic on the page

If a property is declared on the scope of the parent controller, and then accessed on a child tag/scope then the property will be searched and found.

When inherited properties are changed in one child controller, the same change occurs for the others.

Using `controller as name` make the controller instance point to a property on the $scope (i.e $scope.name)

Doing this means `this` is synonomous with injecting the $scope into the controller.

```js
$scope1.child = new ControllerC();
$scope2 = Object.create($scope1);
$scope2.name = new ControllerP();
``` 
is effectively what happens behind the scenes

then you can refer to the name of the controller in interpolation `{{child.prop}}`

- If you reference the proper controller rather than `this` you can control which scope the value for a variable is assigned to.
- Prototypal is based on object instances rather than classes
  - property is inherited from parent, looked up through prototype chain
  - Property is local if its declared on child and masks parent (same key)
- $scope is based on prototypal inheritance
  - child controller's $scope inherits from parent controller's $scope
- Controller As Syntax
- Angular creates property `label` on the $scope
  - The label is a reference to `this`, instance of controller
  - Works because .controller treats it as a function constructor
- Attach properties to `this` inside of controller not $scope
  - Easeier syntax in HTML and JS


```html
<!DOCTYPE html>
<html ng-app='ControllerAsApp'>
  <head>
    <meta charset="utf-8">
    <script src="angular.min.js"></script>
    <script src="app.js"></script>
    <style> body { font-size: 1.2em; }</style>
    <title>Controller As Syntax</title>
  </head>
  <body>
    <h1>Controller As Syntax</h1>
    <div ng-controller='ParentController1'>
      <div ng-controller='ChildController1'>
      </div>
    </div>

    <div ng-controller='ParentController2 as parent'>
      Parent value: {{ parent.value }}

      <div ng-controller='ChildController2 as child'>
        Child value: {{ child.value }}
        Parent value: {{ parent.value }}
      </div>
    </div>
  </body>
</html>
```
```js
// app.js
(function () {
'use strict';

angular.module('ControllerAsApp', [])
.controller('ParentController1', ParentController1)
.controller('ChildController1', ChildController1)
.controller('ParentController2', ParentController2)
.controller('ChildController2', ChildController2);

ParentController1.$inject = ['$scope'];
function ParentController1($scope) {
  $scope.parentValue = 1;
  $scope.pc = this;
  $scope.pc.parentValue = 1;
}


ChildController1.$inject = ['$scope'];
function ChildController1($scope) {
  // console.log("$scope.parentValue: ", $scope.parentValue);
  // console.log("CHILD $scope: ", $scope);
  //
  // $scope.parentValue = 5;
  // console.log("*** CHANGED: $scope.parentValue = 5 ***");
  // console.log("$scope.parentValue: ", $scope.parentValue);
  // console.log($scope);
  //
  // console.log("$scope.pc.parentValue: ", $scope.pc.parentValue);
  // $scope.pc.parentValue = 5;
  // console.log("** CHANGED: $scope.pc.parentValue = 5; ***");
  // console.log("$scope.pc.parentValue: ", $scope.pc.parentValue);
  // console.log("$scope: ", $scope);
  //
  // console.log("$scope.$parent.parentValue: ", $scope.$parent.parentValue);
}

// ** Controller As syntax
function ParentController2() {
  var parent = this;
  parent.value = 1;
}
ChildController2.$inject = ['$scope'];
function ChildController2($scope) {
  var child = this;
  child.value = 5;
  console.log("ChildController2 $scope: ", $scope);
}

})();
```

```html
<!-- prototype.html -->
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <script src="prototype.js"></script>
    <title>Prototypal Inheritance</title>
  </head>
  <body>
    <h1>Prototypal Inheritance</h1>
  </body>
</html>
```
```js
// prototype.js
//**  Prototypal inheritance
var parent = {
  value: "parentValue",
  obj: {
    objValue: "parentObjValue"
  },
  walk: function () {
    console.log("walking!");
  }
};

var child = Object.create(parent);
console.log("CHILD - child.value: ", child.value);
console.log("CHILD - child.obj.objValue: ", child.obj.objValue);
console.log("PARENT - parent.value: ", parent.value);
console.log("PARENT - parent.obj.objValue: ", parent.obj.objValue);
console.log("parent: ", parent);
console.log("child: ", child);

child.value = "childValue";
child.obj.objValue = "childObjValue";
console.log("*** CHANGED: child.value = 'childValue'");
console.log("*** CHANGED: child.obj.objValue = 'childObjValue'");
console.log("CHILD - child.value: ", child.value);
console.log("CHILD - child.obj.objValue: ", child.obj.objValue);
console.log("PARENT - parent.value: ", parent.value);
console.log("PARENT - parent.obj.objValue: ", parent.obj.objValue);
console.log("parent: ", parent);
console.log("child: ", child);

console.log("child.obj === parent.obj ? ", child.obj === parent.obj);

var grandChild = Object.create(child);
console.log("Grandchild: ", grandChild);
grandChild.walk();

** Function constructors
See my other course: HTML, CSS, and Javascript for Web Developers
Lecture #48
function Dog(name) {
  this.name = name;
  console.log("'this' is: ", this);
}

var myDog = new Dog("Max");
console.log("myDog: ", myDog);

// Not being used as a function constructor
Dog("Max2");
```

## Custom Services

[Link to Lecture 20](../course_materials/fullstack-course5/examples/Lecture20/)

Controller Responsibility
- Use Controllers to
  - Set up initial state of $scope
  - Add behavior to $scope
    - This means it is responsible for any events and updating the view state
- DO NOT use controllers to
  - Handle business logic directly
  - Share code or state across controllers
  
The answer to these things is to use a service

This takes the name, and the function used to initialize the service. Its treated as a **function constructor**. The string name provided is used to inject it into other services
`.service('CustomService', CustomService)`

The service that angular creates for us with this function/process is guaranteed to be a singleton.

Each dependent component gets a reference to the same instance. Multiple controllers will have access to the same data

Lazy instantiation. Service is only created if an app component declares it as a dependency

We bind the adding function of the service to an adding function in the controller.

```html
<!DOCTYPE html>
<html ng-app='ShoppingListApp'>
  <head>
    <meta charset="utf-8">
    <script src="angular.min.js"></script>
    <script src="app.js"></script>
    <style> body { font-size: 1.2em; }</style>
    <title>Custom Service</title>
  </head>
  <body>
    <h1>Custom Service</h1>
    <div ng-controller='ShoppingListAddController as itemAdder'>
      <input type="text" ng-model="itemAdder.itemName" placeholder="item name">
      <input type="text" ng-model="itemAdder.itemQuantity" placeholder="quantity">
      <button ng-click="itemAdder.addItem();">Add Item To Shopping List</button>
    </div>

    <div ng-controller='ShoppingListShowController as showList'>
      <ol>
        <li ng-repeat="item in showList.items">
          {{ item.quantity }} of {{ item.name }}
          <button ng-click="showList.removeItem($index);">Remove Item</button>
        </li>
      </ol>
    </div>
  </body>
</html>
```

```js
(function () {
'use strict';

angular.module('ShoppingListApp', [])
.controller('ShoppingListAddController', ShoppingListAddController)
.controller('ShoppingListShowController', ShoppingListShowController)
.service('ShoppingListService', ShoppingListService);

ShoppingListAddController.$inject = ['ShoppingListService'];
function ShoppingListAddController(ShoppingListService) {
  var itemAdder = this;

  itemAdder.itemName = "";
  itemAdder.itemQuantity = "";

  itemAdder.addItem = function () {
    ShoppingListService.addItem(itemAdder.itemName, itemAdder.itemQuantity);
  }
}


ShoppingListShowController.$inject = ['ShoppingListService'];
function ShoppingListShowController(ShoppingListService) {
  var showList = this;

  showList.items = ShoppingListService.getItems();

  showList.removeItem = function (itemIndex) {
    ShoppingListService.removeItem(itemIndex);
  };
}


function ShoppingListService() {
  var service = this;

  // List of shopping items
  var items = [];

  service.addItem = function (itemName, quantity) {
    var item = {
      name: itemName,
      quantity: quantity
    };
    items.push(item);
  };

  service.removeItem = function (itemIndex) {
    items.splice(itemIndex, 1);
  };

  service.getItems = function () {
    return items;
  };
}

})();
```



### Custom Services with .factory()

[Link to Lecture 21](../course_materials/fullstack-course5/examples/Lecture21/)

The factory design pattern consists of a central place where you produce new objects or functions. It can create dynamically customizable services.

.factory is not just another way to create a service but it can be
.service is a factory (of a kind) where it just creates a singleton

with factory
`.factory('CustomService', CustomService)`
The function is similar, but then the name is what you use to inject into controllers and services

Return Object:
```js
function CustomService() {
    var factory = function () {
        // We're calling new, so we decide how the service is created
        return new service();
    }

    // Return the service
    return factory;
}
```

Return Object Literal:
```js
function CustomService() {
    var factory = {
        getSomeService: function () {
            // We're calling new, so we decide how the service is created
            return new service();
        }
    };

    // Return an object literal
    return factory;
}
```

Its the difference of returning an object with the function being able to be called, versus the defined service instance
### Custom Services with .provider()

[Link to Lecture 22](../course_materials/fullstack-course5/examples/Lecture22/)

`.factory('CustomService', CustomServiceProvider)`

```js
function ShoppingListServiceProvider() {
  var provider = this;

  provider.defaults = {
    maxItems: 10
  };

  provider.$get = function () {
    var shoppingList = new ShoppingListService(provider.defaults.maxItems);

    return shoppingList;
  };
}
```

providers provide services with settings while factories create a service

You can use the provider with a `.config`, and set the default provider params. This gets called before anything else

.provider is the most verbose and flexible factory pattern. can configure the factory at app-start and on creation of services

## ng-show and ng-hide

[Link to Lecture 23](../course_materials/fullstack-course5/examples/Lecture23/)

pretty self explanatory

ng-if will take it out of the DOM tree

show/hide do no remove from the DOM, but apply a css hide