(function () {
"use strict";

angular.module('common')
.service('UserService', UserService);


function UserService() {
  var service = this;

  service.first_name;
  service.last_name;
  service.email;
  service.phone_number;
  service.category;
  service.menuItem;

}



})();
