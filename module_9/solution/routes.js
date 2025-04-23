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
        url: '/items/{category}',
        template: '<items data="itemsCtrl.data"></items>',
        controller: 'ItemsController as itemsCtrl',
        resolve: {
            data: ['$stateParams', 'MenuDataService', function($stateParams, MenuDataService) {
                return MenuDataService.getItemsForCategory($stateParams.category)
                .then(function (result) {
                    return result.data.menu_items;
                });
            }],
          }
    });
}

})();
