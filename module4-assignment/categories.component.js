(function() {
'use strict';

angular.module('MenuApp')
.component('categories', {
    templateUrl: 'templates/categories.template.html',
    controller: CategoriesComponentController,
    bindings: {
        items: '<'
    }
});

CategoriesComponentController.$inject = [];
function CategoriesComponentController() {
    var $ctrl = this;

    $ctrl.$onInit = function() {
        console.log("CategoriesComponentController.$onInit");
    };

    $ctrl.$doCheck = function() {
        console.log("CategoriesComponentController.$doCheck");
    };

    $ctrl.$onDestroy = function() {
        console.log("CategoriesComponentController.$onDestroy")
    };
}

})();