(function () {
    'use strict';
    
    angular.module('MenuApp')
    .controller('ItemsController', ItemsController);
    
    // 'item' is injected through state's resolve
    ItemsController.$inject = ['items', "categoryShortName"]
    function ItemsController(items, categoryShortName) {
      var itemCtrl = this;
      itemCtrl.items = items;
      itemCtrl.categoryShortName = categoryShortName;
    }
    
})();
    