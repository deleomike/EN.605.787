(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];

function LunchCheckController($scope) {

    $scope.checkLunch = function () {
        var user_input = $scope.user_input;
        var result = "Hello";
        var color = "black";
        var border = "none";

        if (user_input == undefined || user_input == "") {
            result = "Please enter data first";
            color = "red";
            border = "solid"
        }
        else {
            var num_items = user_input.split(",").length;

            console.log(num_items);

            if (num_items <= 3) {
                result = "Enjoy!";
            }
            else {
                result = "Too much!";
            }

            color = "green";
            border = "solid";
        }
        
        $scope.response = result
        $scope.color = color;
        $scope.border = border;

    };
};
})();