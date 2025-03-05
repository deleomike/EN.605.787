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
            var items = user_input.split(",");
            // var num_items = items.length;
            var num_items = 0;

            console.log(items[1] == 0)

            for (var i = 0; i < items.length; i++){
                if (items[i] != 0){
                    num_items++;
                }
            }

            console.log(items);
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