(function () {
    'use strict';
    
    angular.module('ShoppingListCheckOff', [])
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService)
    .filter('InAngularDollars', AngularDollarsFilter);

    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService) {
        var toBuyList = this;

        toBuyList.items = ShoppingListCheckOffService.getToBuyItems();
      
        toBuyList.buyItem = function (itemIndex, itemQuantity, itemName, pricePerItem) {
            // Remove item from toBuyList
            ShoppingListCheckOffService.removeToBuyItem(itemIndex);

            // Add item to alreadyBoughtList
            ShoppingListCheckOffService.addAlreadyBoughtItem(itemName, itemQuantity, pricePerItem);            
        };
    }

    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService) {
        var alreadyBoughtList = this;

        alreadyBoughtList.items = ShoppingListCheckOffService.getAlreadyBoughtItems();
    }    
    
    function ShoppingListCheckOffService() {
        var service = this;
        var toBuyList = [
            { name: "cookies", quantity: 10, pricePerItem: 2 },
            { name: "bags of chips", quantity: 5, pricePerItem: 4 },
            { name: "sodas", quantity: 3, pricePerItem: 1.50 },
            { name: "tubs of ice cream", quantity: 2, pricePerItem: 5 },
            { name: "bags of candy", quantity: 20, pricePerItem: 3 }
        ];
        var alreadyBoughtList = [];

        service.getToBuyItems = function () {
            return toBuyList;
        };

        service.getAlreadyBoughtItems = function () {
            return alreadyBoughtList;
        };
                
        service.addToBuyItem = function (itemName, quantity, pricePerItem) {
            var item = {
                name: itemName,
                quantity: quantity,
                pricePerItem: pricePerItem
            };
            toBuyList.push(item);
        };

        service.removeToBuyItem = function (itemIndex) {
            toBuyList.splice(itemIndex, 1);
        };
        
        service.addAlreadyBoughtItem = function (itemName, quantity, pricePerItem) {
            var item = {
                name: itemName,
                quantity: quantity,
                pricePerItem: pricePerItem
            };
            alreadyBoughtList.push(item);
        };     
    }

    function AngularDollarsFilter() {
        return function (input) {
            // Note: We are assuming that the input here is always a numeric value
            // since we are dealing with fixed data
            input = input || 0;
            input = "$$$" + input.toFixed(2);
            return input;
        }
    }

    })();
    