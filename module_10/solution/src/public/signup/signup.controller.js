(function () {

angular.module('public')
.controller('SignupController', SignupController);

SignupController.$inject = ['ShortNameService', 'UserService', '$scope'];
function SignupController(ShortNameService, UserService, $scope) {
    var signup = this;

    signup.submit = function () {
        signup.completed = true;
        console.log(signup.user);
        
        UserService.first_name = signup.user.first;
        UserService.last_name = signup.user.last;
        UserService.email = signup.user.email;
        UserService.phone_number = signup.user.phone;
        UserService.category = ShortNameService.parseShortName(signup.user.short_name)[0];

        ShortNameService.getItem(signup.user.short_name).then(function (response) {
            UserService.menuItem = response;
        });


    };

    signup.getScopeShortName = function () {
        return $scope.signupForm.short_name;
    };
}

})();