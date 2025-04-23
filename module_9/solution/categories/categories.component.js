(function (){
'use strict';

angular.module('MenuApp')
.component('categories', {
    templateUrl: 'categories/categories.template.html',
    controller: 'CategoriesController',
    controllerAs: '$ctrl',
    bindings: {
        categories: '<',
    }
});

})();