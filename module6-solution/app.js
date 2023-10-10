(function () {
    'use strict';
    
    angular.module('LunchCheck', [])
    .controller('LunchCheckController', LunchCheckController)

    LunchCheckController.$inject = ['$scope'];
    function LunchCheckController($scope) {
        $scope.lunchList = "";
        
        $scope.checkLunchList = function () {
            var splitList = $scope.lunchList.split(',');

            var count = 0;
            // Loop through splitList and check for empty list items
            for (var i = 0; i < splitList.length; i++) {
                // Trim whitespace of list item and check if length is 0,
                // indicating an empty item
                if (splitList[i].trim().length != 0) {
                    count++;
                }
            }

            // Check number of lunch items and display appropriate message
            // to user
            // Bonus: If the message is 'Enjoy!' or 'Too much!', make the
            // message font and border color green. If the message is
            // 'Please enter data first' make the message font and border
            // color red
            if (count == 0) {
                $scope.message = "Please enter data first";
                $scope.messageClasses = "red-message";
            }
            else if (count <= 3) {
                $scope.message = "Enjoy!";
                $scope.messageClasses = "green-message";
            } else {
                $scope.message = "Too much!";
                $scope.messageClasses = "green-message";
            }            
        }
    }
    
    })();
    