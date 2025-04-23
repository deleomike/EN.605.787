(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

    // Redirect to home page if no other URL matches
    $urlRouterProvider.otherwise('/');

    // *** Set up UI states ***
    $stateProvider

    // Home page
    .state('home', {
    url: '/',
    templateUrl: 'home.html'
    })

    .state('categories', {
        url: '/categories',
        template: '<categories></categories>'
    })

    .state('items', {
        url: '/items/{cat}',
        // templateUrl: "items/items.html",
        template: '<items data="itemsCtrl.data"></items>',
        controller: 'ItemsController as itemsCtrl',
        resolve: {
            data: ['$stateParams', 'MenuDataService', function($stateParams, MenuDataService) {

                console.log($stateParams)
                return MenuDataService.getItemsForCategory($stateParams.cat)
                .then(function (result) {
                    console.log("GOT");
                    console.log(result);
                    return result.data.menu_items;
                });
            }],
            // category_name: ['$stateParams', function($stateParams) {
            //     console.log("CAT");
            //     return "SP";
            // }]
            // item: ['$stateParams', 'ShoppingListService',
            //       function ($stateParams, ShoppingListService) {
            //         return ShoppingListService.getItems()
            //           .then(function (items) {
            //             return items[$stateParams.itemId];
            //           });
            //       }]
          }
        // resolve: {
        //     category: "SP"
        //     // category: ['$stateParams',
        //     //     function ($stateParams) {
        //     //         console.log("ROUTE");
        //     //         console.log($stateParams.category);
        //     //       return $stateParams.category;
        //     //     }],
        // }
    });

    // Premade list page
    // .state('mainList', {
    // url: '/main-list',
    // templateUrl: 'src/shoppinglist/templates/main-shoppinglist.template.html',
    // controller: 'MainShoppingListController as mainList',
    // resolve: {
    //     items: ['ShoppingListService', function (ShoppingListService) {
    //     return ShoppingListService.getItems();
    //     }]
    // }
    // });
}

})();
