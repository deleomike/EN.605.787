(function (){
'use strict';

angular.module('MenuApp')
.controller('ItemsController', ItemsController);

ItemsController.$inject = ['items'];
function ItemsController (items) {
    // console.log(category)
    var $ctrl = this;
    // $ctrl.category = category_name;

    console.log(items)
    $ctrl.items = items;
    // $ctrl.name;

    // $ctrl.$onInit = function () {
    //     $ctrl.getItemsForCategory();
    // };

    // $ctrl.getItemsForCategory = function () {
    //     MenuDataService.getItemsForCategory($ctrl.category)
    //     .then(function (result) {
    //         $ctrl.items = result.data.menu_items;
    //         $ctrl.name = result.data.category.name;
    //         console.log(result.data)
    //     });
    // }
}

})();