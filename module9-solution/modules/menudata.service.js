(function () {
    'use strict';
    
    angular.module('data', [])
    .service('MenuDataService', MenuDataService)
    .constant('ApiBasePath', "https://coursera-jhu-default-rtdb.firebaseio.com");
    
    MenuDataService.$inject = ['$http', 'ApiBasePath'];
    function MenuDataService($http, ApiBasePath) {
        var service = this;

        // Gets and returns all menu categories 
        service.getAllCategories = function () {
            return $http({
                method: "GET",
                url: (ApiBasePath + "/categories.json")
            }).then(function (response) {
                return response.data;
            });
        };
        
        // Gets and returns all menu items for the specified category
        service.getItemsForCategory = function (categoryShortName) {
            return $http({
                method: "GET",
                url: (ApiBasePath + "/menu_items/" + categoryShortName + ".json")
            }).then(function (response) {
                return response.data.menu_items;
            });
        };         
    }
})();
