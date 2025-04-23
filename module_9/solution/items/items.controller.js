(function (){
'use strict';

angular.module('MenuApp')
.controller('ItemsController', ItemsController);

ItemsController.$inject = ['data'];
function ItemsController (data) {
    var itemsCtrl = this;

    itemsCtrl.data = data;
}

})();