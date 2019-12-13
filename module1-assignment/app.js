(function() {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
    $scope.message = "";
    $scope.lunchItemsText = "";

    $scope.checkIfTooMuch = function() {
        const lunchItems = $scope.lunchItemsText === "" ? [] : $scope.lunchItemsText.split(",");
        $scope.message = createMessage(lunchItems);
    };

    const createMessage = function(lunchItems) {
        if (lunchItems.length === 0) {
            return "Please enter data first";
        } else if (lunchItems.length <= 3) {
            return "Enjoy";
        } else {
            return "Too much!";
        }
    };
}

})();