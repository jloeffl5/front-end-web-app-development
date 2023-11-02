(function () {
    'use strict';
    
    angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .constant('ApiBasePath', "https://coursera-jhu-default-rtdb.firebaseio.com")
    .directive('foundItems', FoundItemsDirective);

    function FoundItemsDirective() {
        var ddo = {
          restrict: 'E',
          templateUrl: 'foundItems.html',
          scope: {
            foundItems: '<',
            onRemove: '&'
          },
          controller: NarrowItDownController,
          controllerAs: 'searchResults',
          bindToController: true
        };
      
        return ddo; 
    }

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var narrowItDown = this;
        narrowItDown.searchTerm = "";
        narrowItDown.found = null;
      
        narrowItDown.searchItem = function (searchTerm) {
            // Search for item and set found property to result
            var promise = MenuSearchService.getMatchedMenuItems(searchTerm);

            promise.then(function(foundList) {
                narrowItDown.found = foundList; 
            });
        };

        narrowItDown.removeItem = function (itemIndex) {
            narrowItDown.found.splice(itemIndex, 1);
        };
    }
    
    MenuSearchService.$inject = ['$http', 'ApiBasePath'];
    function MenuSearchService($http, ApiBasePath) {
        var service = this;

        service.getMatchedMenuItems = function (searchTerm) {
            return $http({
                method: "GET",
                url: (ApiBasePath + "/menu_items.json")
            }).then(function (response) {
                // Set foundList to empty initially
                var foundList = [];

                // Don't waste time parsing response data if searchTerm
                // is null or empty string
                if (searchTerm == null || searchTerm.length == 0) {
                    return foundList;
                }
                
                // Loop through all the menu items and check if search string appears anywhere
                // in description of the item
                for (var categoryKey in response.data) {
                    for (var itemKey in response.data[categoryKey]["menu_items"]) {
                        var itemObject = response.data[categoryKey]["menu_items"][itemKey];

                        if (itemObject.description.includes(searchTerm)) {
                            foundList.push({name: itemObject.name, short_name: itemObject.short_name, description: itemObject.description });
                        }
                    }
                }

                return foundList;
            });
        };    
    }

    })();
    