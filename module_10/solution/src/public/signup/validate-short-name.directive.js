(function () {

angular.module('public')
.directive('validateShortName', validateShortNameDirective);


validateShortNameDirective.$inject = ['ShortNameService', '$q'];
function validateShortNameDirective(ShortNameService, $q) {
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {

            ctrl.$asyncValidators.shortName = function (modelValue, viewValue) {

                if (ctrl.$isEmpty(modelValue)) {
                    return $q.when();
                }

                var def = $q.defer();

                ShortNameService.getItem(viewValue).then(function (response) {
                    if (response === null) {
                        def.reject();
                    }
                    else {
                        def.resolve();
                    }
                });

                return def.promise;
            };
        }
    };
}

})();