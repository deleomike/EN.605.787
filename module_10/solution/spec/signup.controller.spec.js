describe("SignupController", function() {

beforeEach(module('public'));

var $controller;
var $httpBackend;
var menuService;
var ApiPath;
var signupController;

beforeEach(function() {
    module('common');

    inject(function ($injector) {
        menuService = $injector.get('MenuService');
        ApiPath = $injector.get('ApiPath');
        $httpBackend = $injector.get('$httpBackend');
    });
});

// beforeEach(function () {
//     module(function ($provide) {
//         $provide.service('menuService', menuService);
//     })
// })

beforeEach(inject(function (_$controller_) {
    $controller = _$controller_;

    var UserServiceMock = {};
    // var MenuServiceMock = {};
    var ScopeMock = {signupForm: {short_name: { $invalid: false, $valid: true}}};

    // MenuServiceMock.getMenuItem = function(category, number) {
    //     return new Promise((resolve, reject) => {
    //         setTimeout(() => {
    //             return null;
    //         }, 100);
    //     })
    // }

    // var ShoppingListServiceErrorMock = {};
    // ShoppingListServiceErrorMock.addItem = function (name, quantity) {
    // throw new Error("Test message.");
    // };
    // ShoppingListServiceErrorMock.getItems = function () {
    // return null;
    // };

    signupController = $controller(
        'SignupController',
        {
            MenuService: menuService,
            UserService: UserServiceMock,
            $scope: ScopeMock
        }
    );

    signupController.user = {};
    signupController.user.short_name = "L1";

}));

it("should match the category and menu itm", function() {
    const [category, number] = signupController.parseShortName();

    expect(category + number).toBe(signupController.user.short_name);
});

function menuCheck(done, short_name, data, expectation) {

    signupController.user.short_name = short_name;

    var [category, menu_item_index] = signupController.parseShortName();
    menu_item_index -= 1;

    console.log(menu_item_index)

    $httpBackend.whenGET(ApiPath + '/menu_items/' + category + '/menu_items/' + menu_item_index + '.json').respond(data);

    signupController.validateShortNameUpdateForm().then(function () {
        short_name = signupController.getScopeShortName()
        expect(short_name.$invalid).toBe(!short_name.$valid);
        expect(short_name.$valid).toBe(expectation);
        done();
    })

    $httpBackend.flush();
}

it("should not fail on bad short names", function(done) {
    menuCheck(done, "L", null, false)
});

it("should not fail on bad short names", function(done) {
    menuCheck(done, "L", null, false)
});


it("should return proper data for the short_name", function(done) {

    menuCheck(done, "L2", {}, true)
});

it("should return null for the short_name", function(done) {

    menuCheck(done, "L200", null, false)
});

});
