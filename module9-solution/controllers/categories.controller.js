(function () {
    'use strict';
    
    angular.module('MenuApp')
    .controller('CategoriesController', CategoriesController);
    
    // 'categories' is injected through state's resolve
    CategoriesController.$inject = ['categories']
    function CategoriesController(categories) {
      var catCtrl = this;
      catCtrl.categories = categories;
    };
        
})();
    