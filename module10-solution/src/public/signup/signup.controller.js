(function () {
    "use strict";
    
    angular.module('public')
    .controller('SignUpController', SignUpController);
    
    SignUpController.$inject = ['MenuService'];
    function SignUpController(MenuService) {
      var $ctrl = this;

      const shortnameRegex = /(?<category>[A-Z]+)(?<menuNumber>[0-9]+)/;

      $ctrl.submit = function () {
        $ctrl.completed = true;

        // Check favorite dish field
        var {category, menuItemNumber} = parseMenuItem($ctrl.user.favoriteDish);

        // Get Menu Item and assign its object to the saved user info to avoid having to make a call
        // when loading from My Info page
        MenuService.getMenuItem(category, menuItemNumber).then(function (menuItem) {
            MenuService.setInfo($ctrl.user.firstname, $ctrl.user.lastname, $ctrl.user.email, $ctrl.user.phone, menuItem);
        });

      };

      // Used to validate whether the menu item exists for the favorite dish entered (triggerd after user enters input)
      $ctrl.validateMenuItem = function () {
        var shortName = $ctrl.user.favoriteDish;

        if (shortName == null || shortName == "") {
          // Angular pattern validation logic already takes care of this case,
          // so just return without doing anything
          return;
        }

        var found = shortName.match(shortnameRegex);
        if (found == null) {
          // Angular pattern validation logic already takes care of this case,
          // so just return without doing anything
          return;
        }
    
        var {category, menuItemNumber} = parseMenuItem($ctrl.user.favoriteDish);

        MenuService.doesMenuItemExist(category, menuItemNumber).then(function (result) {
          // If result is null, then menu item does not exist, so set field validation to invalid.
          // Otherwise set field validation to valid
          if (result == false) {
              $ctrl.signupForm.favoriteDish.$invalid = true;
              $ctrl.signupForm.favoriteDish.$valid = false;
              $ctrl.signupForm.$invalid = true;
          } else {
              $ctrl.signupForm.favoriteDish.$invalid = false;
              $ctrl.signupForm.favoriteDish.$valid = true;
          }
        });
      }

      // Helper function for parsing menu item short name
      var parseMenuItem = function (shortName) {
        if (shortName == null || shortName == "") {          
          return {category: '', itemNumber: ''};
        }

        var found = shortName.match(shortnameRegex);
        if (found == null) {
          return {category: '', itemNumber: ''};
        }
    
        var category = found.groups.category;
        // Need to account for zero-indexing and subtract 1 from provided menu number
        var menuNumber = (parseInt(found.groups.menuNumber) - 1);

        return {category: category, menuItemNumber: menuNumber};
      }
    }
    
})();
    