(function () {
    "use strict";
    
    angular.module('public')
    .controller('InfoController', InfoController);
    
    InfoController.$inject = ['info'];
    function InfoController(info) {
      var $ctrl = this;

      // Assign info object received from router resolve to the controller
      $ctrl.info = info;
    }
    
})();
    