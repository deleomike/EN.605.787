(function (){
'use strict';

angular.module('MenuApp')
.component('items', {
    templateUrl: 'items/items.template.html',
    // controller: 'ItemsController',
    // controllerAs: '$ctrl',
    bindings: {
        data: '<',
        // name: '<',
        // category: '<',
    }
});

})();