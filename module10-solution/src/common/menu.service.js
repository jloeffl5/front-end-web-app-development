(function () {
"use strict";

angular.module('common')
.service('MenuService', MenuService);


MenuService.$inject = ['$http', 'ApiPath'];
function MenuService($http, ApiPath) {
  var service = this;

  // Use this to store user's info for current session (starts as null until user signs up)
  service.info = null;

  service.getCategories = function () {
    return $http.get(ApiPath + '/categories.json').then(function (response) {
      return response.data;
    });
  };


  service.getMenuItems = function (category) {
    return $http.get(ApiPath + '/menu_items/' + category + '.json').then(function (response) {
      return response.data;
    });
  };

  // Get menu item details from the server (primarily used for storing result in user info object)
  service.getMenuItem = function (category, menuItemNumber) {
    return $http.get(ApiPath + '/menu_items/' + category + '/menu_items/' + menuItemNumber + '.json').then(function (response) {
      // If the item exists, pass category along with response data to make looking up image later easier
      if (response.data != null) {
        response.data.category = category;
      }
      
      return response.data;
    });
  };

  // Check to see if a menu item exists given it's category and menu item number
  service.doesMenuItemExist = function (category, menuItemNumber) {
    return $http.get(ApiPath + '/menu_items/' + category + '/menu_items/' + menuItemNumber + '.json').then(function (response) {
      if (response.data == null) {
        return false;
      }
      return true;
    });
  };

  // Returns the info object currently stored for this user session
  service.getInfo = function () {
    return service.info;
  };

  // Sets the info object for this user's current session
  service.setInfo = function (firstName, lastName, email, phone, favoriteDish) {
    service.info = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      favoriteDish: favoriteDish
    };
  };

}

})();
