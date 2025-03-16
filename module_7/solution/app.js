(function (){
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService)
.filter('angularCurrency', AngularCurrencyFilter);


function AngularCurrencyFilter() {
    return function (input) {
        // Return the currency, with two decimals and $$$
        return "$$$" + input.toFixed(2);
    }
}

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
    var buyItems = this;

    buyItems.to_buy = ShoppingListCheckOffService.to_buy;

    buyItems.buy = function buy(index){
        ShoppingListCheckOffService.buyItem(index);
    };
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
    var boughtItems = this;

    boughtItems.items = ShoppingListCheckOffService.bought;
}

function ShoppingListCheckOffService() {
    var service = this;

    service.bought = [];
    service.to_buy = [
        {"name": "cookies", "quantity": 10, "pricePerItem": 3.00},
        {"name": "sparkling waters", "quantity": 20, "pricePerItem": 1.00},
        {"name": "pizzas", "quantity": 3, "pricePerItem": 19.99},
        {"name": "bananas", "quantity": 99, "pricePerItem": 0.99},
        {"name": "sushi rolls", "quantity": 9, "pricePerItem": 9.99}
    ];

    service.buyItem = function(index) {
        console.log(index)
        var item = service.to_buy[index]
        
        service.to_buy.splice(index, 1)

        service.bought.push(item)
    }

}

})();
