(function (){
'use strict';

angular.module('MenuApp')
.component('items', {
    templateUrl: 'items/items.template.html',
    bindings: {
        data: '<',
    }
});

})();