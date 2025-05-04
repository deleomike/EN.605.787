(function () {

angular.module('public')
.controller('MyInfoController', MyInfoController);

MyInfoController.$inject = ['UserService'];
function MyInfoController(UserService) {
    var info = this;

    info.first_name = UserService.first_name;
    info.last_name = UserService.last_name;
    info.email = UserService.email;
    info.phone_number = UserService.phone_number;
    info.category = UserService.category;
    info.menuItem = UserService.menuItem;

    if (info.menuItem !== undefined){
        info.menuItem.price_small = null;
        info.menuItem.price_large = null;
        info.menuItem.small_portion_name = null;
        info.menuItem.large_portion_name = null;
    }
}

})();