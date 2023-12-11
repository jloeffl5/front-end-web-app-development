describe('menu', function () {
    var menu;
    var $httpBackend;
    var ApiPath;
  
    beforeEach(function () {
        module('common');
  
        inject(function ($injector) {
            menu = $injector.get('MenuService');
            $httpBackend = $injector.get('$httpBackend');
            ApiPath = $injector.get('ApiPath');
        });
    });
  
    it('should return true when menu item exists', function() {
        // response.data contains menuItem details when menu exists
        var menuItemResponse = {
            category: "F",
            description: "beef sauteed with broccoli, mushrooms, and carrots in spicy Hunan sauce",
            large_portion_name: "large",
            name: "Hunan Beef",
            price_large: 15.45,
            price_small: 11.45,
            short_name: "F2",
            small_portion_name: "pint"
        };
        $httpBackend.whenGET(ApiPath + '/menu_items/F/menu_items/2.json').respond(menuItemResponse);

        menu.doesMenuItemExist("F", "2").then(function(response) {
            expect(response).toEqual(true);
        });
        $httpBackend.flush();
    });

    it('should return false when menu item does not exist', function() {
        // response.data is null when menu item doesn't exist
        $httpBackend.whenGET(ApiPath + '/menu_items/F/menu_items/20.json').respond(null);

        menu.doesMenuItemExist("F", "20").then(function(response) {
            expect(response).toEqual(false);
        });
        $httpBackend.flush();
    });
});
  