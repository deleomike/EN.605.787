# Module 10: Form Validation, Testing, and Restaurant Site Development

# Form Validation

42

Some projects only use angular for form validation, because its good at it.

step 1: Create a form in HTML with name attributes

Give the form a value for the name attribute

```html
<form name='formName'>
    <input type='text' name='name'>
    <button>Submit</button>
</form>
```

step 2: Bind input with ng-model

```html
<form name='formName'>
    <input type='text' name='name' ng-model='ctrl.name'>
    <button ng-click='ctrl.go()'>Submit</button>
</form>
```

step 3: Declare HTML5 validation attributes

We can declare required inputs for the form easily, and traits of the value

With `novalidate` we disable the native html validation

```html
<form name='formName' novalidate>
    <input type='text' name='name' ng-model='ctrl.name' required min-length='4'>
    <button ng-click='ctrl.go()'>Submit</button>
</form>
```

step 4: Use Angular form bound objects

We can display an error message conditionally

FormController is an automatic controller for each named form. It has the values of the named fields.

```html
<form name='formName' novalidate>
    <input type='text' name='name' ng-model='ctrl.name' required min-length='4'>
    <span
        ng-if="formName.name.$error.required && formName.name$touched">
        Name is required
    </span>
    <button 
        ng-click='ctrl.go()' 
        ng-disabled="formName.$invalid">
    Submit
    </button>
</form>
```

step 5: use angular validation styles

```css
.ng-touched.ng-valid {
    border: 2px green solid;
}

.ng-touched.ng-invalid {
    border: 2px red solid;
}
```

# Testing Javascript with Jasmine

Coding in JS can be an unconstrained experience, but error reporting is important.

Testing before shipping is important

Unit Testing: independent checking for proper operation of the smallest testable part of an application

- indepedent: isolated from the rest of the system
- Smallest testable: means you have to approach all of the code development from this perspective

The jasmine framework is a popular one for testing js
# Testing AngularJS Controllers
# Testing AngularJS Services and $http
# Testing AngularJS Directives
# Testing AngularJS Components

----
May be duplicative
# Restaurant Server Setup
# Basic Structure of the Restaurant App
# Coding Up a Loader/Spinner
# Coding Up $http Interceptor
# Coding Up Menu Categories View
# Single Category View