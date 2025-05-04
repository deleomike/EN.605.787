(function () {
"use strict";

angular.module('public')
.service('ShortNameService', ShortNameService);


ShortNameService.$inject = ['MenuService'];
function ShortNameService(MenuService) {
    var service = this;

   service.parseShortName = function (short_name) {
        const category = short_name.replace(/[^a-zA-Z]/g, '');
        const menu_number = Number(short_name.replace(/\D/g, ''));
    
        return [category, menu_number]
    };

    service.getItem = function (short_name) {
        var [category, menu_number] = service.parseShortName(short_name);

        menu_number -= 1;

        return MenuService.getMenuItem(category, menu_number).then(function (response) {
            console.log(response);
            return response;
        });
    };

}

})();