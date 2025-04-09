(function (){
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', 'https://coursera-jhu-default-rtdb.firebaseio.com')
.directive('foundItems', FoundItemsDirective);

function FoundItemsDirective() {
    var ddo = {
        templateUrl: 'foundItems.html',
        scope: {
            found: '<',
            onRemove: '&'
        },
        controller: 'NarrowItDownController',
        controllerAs: 'ctrl',
        bindToController: true
    };

    return ddo;
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
    var ctrl = this;
    
    ctrl.found;
    ctrl.searchTerm;

    console.log(ctrl.found)

    ctrl.removeItem = function(index) {
        ctrl.found.splice(index, 1);
    };

    ctrl.getMatchedMenuItems = function () {
        var itemsPromise = MenuSearchService.getMatchedMenuItems(ctrl.searchTerm);
        
        itemsPromise.then(function (response){
            ctrl.found = response;
        });
    };
};

MenuSearchService.$inject = ['$http', 'ApiBasePath']
function MenuSearchService($http, ApiBasePath) {

    var service = this;

    service.getMatchedMenuItems = function (searchTerm) {
        return $http({
            method: "GET",
            url: (ApiBasePath + "/menu_items.json")
        }).then(function (result){
            // TODO: Process Results

            var foundItems = [];

            console.log(result.data);
            for (let key in result.data) {
                console.log(key);
                var menu_items = result.data[key]["menu_items"];
                for (let i = 0; i < menu_items.length; i++) {
                    console.log(i);
                    if (menu_items[i]["description"].includes(searchTerm)) {
                        foundItems.push(menu_items[i]);
                    }
                }
            }
            return foundItems;
        });
    };
};

})();