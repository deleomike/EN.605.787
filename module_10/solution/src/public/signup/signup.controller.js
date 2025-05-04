(function () {

angular.module('public')
.controller('SignupController', SignupController);

SignupController.$inject = ['MenuService', 'UserService', '$scope'];
function SignupController(MenuService, UserService, $scope) {
    var signup = this;

    signup.submit = function () {
        signup.completed = true;
        console.log(signup.user);
        
        UserService.first_name = signup.user.first;
        UserService.last_name = signup.user.last;
        UserService.email = signup.user.email;
        UserService.phone_number = signup.user.phone;
        UserService.category = signup.parseShortName()[0];

        signup.getMenuItem().then(function (response) {
            UserService.menuItem = response;
        });


    };

    signup.parseShortName = function () {
        const category = signup.user.short_name.replace(/[^a-zA-Z]/g, '');
        const menu_number = Number(signup.user.short_name.replace(/\D/g, ''));

        return [category, menu_number]
    };

    signup.getMenuItem = function () {
        var [category, menu_number] = signup.parseShortName();

        menu_number -= 1;

        return MenuService.getMenuItem(category, menu_number).then(function (response) {
            console.log(response);
            return response;
        });
    };

    signup.validateShortName = function () {

        return signup.getMenuItem().then(function (response) {
            return !(response === null)
        })
    };

    signup.getScopeShortName = function () {
        return $scope.signupForm.short_name;
    }

    signup.validateShortNameUpdateForm = function () {

        console.log($scope)

        return signup.validateShortName().then(function (valid) {
            console.log($scope.signupForm.short_name.$error)

            // $scope.signupForm.$error.add("Errro")

            // $scope.signupForm.short_name.$setValidi
            // $scope.signupForm.short_name.$invalid = !valid;
            // $scope.signupForm.short_name.$valid = valid;
        })
    };
}

})();