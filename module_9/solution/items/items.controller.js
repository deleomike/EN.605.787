(function (){
'use strict';

angular.module('MenuApp')
.controller('ItemsController', ItemsController);

ItemsController.$inject = ['category_name', 'items'];
function ItemsController (category_name, items) {
    // console.log(category)
    var $ctrl = this;
    $ctrl.category = category_name;
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