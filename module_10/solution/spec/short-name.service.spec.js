describe("SignupController", function() {

beforeEach(module('public'));

var $httpBackend;
var shortNameService;
var ApiPath;

beforeEach(function() {
    module('common');

    inject(function ($injector) {
        shortNameService = $injector.get('ShortNameService');
        ApiPath = $injector.get('ApiPath');
        $httpBackend = $injector.get('$httpBackend');
    });
});




it("should match the category and menu itm", function() {
    const [category, number] = shortNameService.parseShortName("L1");

    expect(category + number).toBe("L1");
});

function menuCheck(done, short_name, data) {

    var [category, menu_item_index] = shortNameService.parseShortName(short_name);

    menu_item_index -= 1;

    $httpBackend.whenGET(ApiPath + '/menu_items/' + category + '/menu_items/' + menu_item_index + '.json').respond(data);

    shortNameService.getItem(short_name).then(function (response) {

        expect(response).toEqual(data)

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

    menuCheck(done, "L2", {'short_name': 'L2'}, true)
});

it("should return null for the short_name", function(done) {

    menuCheck(done, "L200", null, false)
});

});
