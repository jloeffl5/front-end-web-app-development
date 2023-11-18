(function () {
    'use strict';
    
    angular.module('menudata', ['data'])
    .service('MenuDataService', MenuDataService)
    .constant('ApiBasePath', "https://coursera-jhu-default-rtdb.firebaseio.com");
    
    MenuDataService.$inject = ['$http', 'ApiBasePath'];
    function MenuDataService($http, ApiBasePath) {
        var service = this;

        service.getAllCategories = function () {
            return $http({
                method: "GET",
                url: (ApiBasePath + "/categories.json")
            }).then(function (response) {
                return response.data;
            });
        };
        
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
