# Components & Component-Based Architecture

[Link to Lecture 33](../course_materials/fullstack-course5/examples/Lecture33/)

A component is a special kind of directive that assumes some default best practices.

Using components makes it easier to make a component based architecture


**Principles**:

Components only control their own View and Data
- Never modify data or DOM outside their own scope
- Not using isolate scope creates huge side-affects and chaos
- Components always use isolate scope

Components have well defined public API (inputs and outputs)
- Inputs use '<' and '@' only

Components have a well defined lifecycle
- `$onInit` - controller initialization code
- `$onChanges(changesObj)` - called whenever on way bindings are updated
  - `changeObj.currentValue`, `changeObj.previousValue`
- `$postLink` - similar to `link` in directive
- `$onDestroy` - when scope is about to be destroyed
- etc

An application is a tree of components
- entire app should be comprised of components
- Each one would have a well defined input and output
- 2-way data binding is minimized as much as possible


myComponent will be seen as my-component in html

instead of a factory function you provide an object literal like the ddo
```js
angular.module('App', [])
.component('myComponent', {
    templateUrl: 'template.html',
    controller: CompController,
    bindings: {
        prop1: '<',
        prop2: '@',
        onAction: `&`
    }
})
```

```html
<my-component 
    prop1="val-1" 
    prop2="@parentProp"
    on-action="parentFunction (myArg) "›
    {{ $ctrl.prop1.prop }} and {{$ctr1.prop2 }}
</my-component>
```

Additionally, there is another lifecycle hook called `$doCheck` that effectively performs the role of the watcher. By filling it out, we can add functionality on a watcher similar to how we did it manually with the link on a directive. More specifically, it runs during the digest loop, so you can look into your elements a bit deeper. This also allows you to skip injecting $scope which can be prone to bugs when attaching things to it.

# AngularJS Event System

[Link to Lecture 34](../course_materials/fullstack-course5/examples/Lecture34/)

We can share data between components with singleton services. Though there are situations where this is not elegant enough and creates issues.

Suppose a child component wanted to communicate information to its parent
- It could call the parent scope
  - Then you need additional logic to react to the data
- Could use the `&method` to callback bind

Suppose you want to communicate to a child component
- Send data into that component

What about a child communicating to the 2nd order parent
- scope.parent.parent
- Singleton service

What about the component sending data to the grandchild?
- Same deal with sending data, but not elegant

same deal with sending data to a different component not nested. Things are getting messy

Or if many components want to communicate with a central component. Its messy

**publish-subscribe design pattern**
- publishers send messages to subscribers on a common channel
- Publishers
  - Mark messages with a classification
  - Don't know if there are any subs
- Subscribers
  - Sign up to listen for messages with particular classification
  - don't know publishers or if there are any
- Common channel is scope
  - Messages are events that hold data

`$scope.$emit`
- goes up the scope chain
  - Goes up till it gets to the top scope

`$scope.$broadcast`
- goes down the chain scope

`$scope.$on`
- subscribes to an event with a handler function

angular has a `$rootScope` that you can use which will always be the top scope for the app.

To broadcast an event and listen
```js
$scope.$broadcast(
    'namespace:eventName',
    {prop: value}
);
```

To listen

```js
$scope.$on('namespace:eventName', handler);

function handler(event, data) {
    if (data.prop === 'val1') {
        ...
    }
});
```

For rootscope, you must deregister the listener on deletion

Capture the value of the `$on`, for this

# Modules

[Link to Lecture 35](../course_materials/fullstack-course5/examples/Lecture35/)

The biggest advantage of modules, is being able to modularize our app.

We can split our app up, and then glue it back together

The name is unique in the app.
```js
angular.module('module1', [])
```

You can declare that a module depends on one or more modules
```js
angular.module('module3', ['module1', 'module2'])
```

Its best practice to structure as `name.type.js`


You can invoke the angular module the same way its init'd, and add more logic to it.
Note that there is no second argument tho
```js
angular.module('module1')
```

1. Specify other modules as deps
2. Declare Module Artifacts
3. Assign the main module as `ng-app`

You then import the module files with the script imports.

Its a best practice to separate components, modules, etc into separate files

Since the browser compiles files sequentially, conceptually these files are all inline with each other.

It does not matter what order you import/declare


# Routing

[Link to Lecture 36](../course_materials/fullstack-course5/examples/Lecture36/)

One way or another, users need to get from one view to another

With web 1.0, routing was a server responsibility.

With web 2.0, Ajax was responsible for making fine grained background requests on smaller changes to the page.

In a single page application SPA
- browser gets the index.html
- Server returns it
- When user clicks url with new view, the index.html goes to `#/view2`. This doesn't need to call the server, but it can
  - It could also encode some data on that view and then call the server `#/view2/id/3`
  - The `#` also changes part of the browser address bar
  - With html5 mode, you don't need the hashtag

In an SPA with routing
- We can represent the view with javascript, and grab the template and data from the server
- go to view 2
  - Get template2.html
- Get data for id=3
  - Get data for id=3 from server
- URL is not updated, only programmatic

ngRoute vs ui-router
- ngroute
  - Separate JS package/file
  - Developed by google and community
  - no concept of ui state
  - every route must be represented by a url
  - no concept of nested views
  - ok for prototyping
- ui-router
  - separate JS package/file
  - Developed by community
  - UI state is central
    - Can have a route with no unique url for that route
  - URL routing is also supported
    - UI state is updated based on the url
  - Nested views supported
  - Better choice for serious projects

1. Reference in html

Must be referenced after angular

```html
<script src="lib/angular.min.js"></script>
<script src="lib/angular-ui-router.min.js"></script>
```

2. Place ui-view initial view placeholder

Content of view will be in the ui-view

```html
<body>
    <ui-view></ui-view>
</body>
```

3. Declare ui-router as a dependency

```js
angular.module('App', ['ui.router'])
```

4. Configure routes in .config method

```js
angular.module ('App')
.config (RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$uriRouterProvider'1;

function RoutesConfig($stateProvider, $urlRouterProvider) {
}
```

Give each state a unique name that we'll refer to in our application

```js
$stateProvider
    .state('view1', {
        url: '/view1',
        template: '<div>..</div>'
    })
    .state ('view2', {...}); 
```

You can also specify a  `templateUrl` property

state method is chainable

Using otherwise helps to keep the user to a default page on mistakes

```js
$urlRouterProvider
    .otherwise('/view1');
```

You can route to subviews by specifying `<a ui-sref="name"></a>`, which routes to the state, but not necessarily registering a view route. Adding href makes this clickable.

# Routing State with Controller

[Link to Lecture 37](../course_materials/fullstack-course5/examples/Lecture37/)

You can define the controller on the

```js
$stateProvider
    .state('view1', {
        url: '/view1',
        template: '<div>..</div>'
        controller: 'HomeCtrl as home'
    })
```

# Routing State with resolve

[Link to Lecture 38](../course_materials/fullstack-course5/examples/Lecture38/)

resolve is a config attribute with key value pairs

The view does not advance until the promise is resolved

```js

.state('view1', {
    url: '/view1',
    templateUrl: 'view1.html',
    controller: 'View1Ctrl as view1',
    resolve: {
        myData: ['Service', function (Service) {
            return Service.getData();
        }]
    }
})
```

Then the data is passed to the controller

```js
View1Ctrl.sinject = [ 'myData' ];
function ViewlCtr1 (myData) {
    var view1 = this;
    view1.myData = myData;
}
```

# Routing State with URL Parameters
# Routing State with Nested Views
# Router State Transition Events