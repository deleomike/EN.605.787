(function (){
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);


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
    var bought = this;

    bought.items = ShoppingListCheckOffService.bought;
}

function ShoppingListCheckOffService() {
    var service = this;

    service.bought = [];
    service.to_buy = [
        {"name": "cookies", "quantity": 10},
        {"name": "water", "quantity": 20}
    ];

    service.buyItem = function(index) {
        console.log(index)
        var item = service.to_buy[index]
        
        service.to_buy.splice(index, 1)

        service.bought.push(item)
    }

}

})();