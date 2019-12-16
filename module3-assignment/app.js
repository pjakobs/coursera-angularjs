(function() {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('menuList', MenuListDirective);

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
    let ctrl = this;

    ctrl.items = [];
 
    ctrl.narrowItDown = function() {
        if (!ctrl.searchTerm) {
            ctrl.items = [];
            return;
        }

        let promise = MenuSearchService.getMatchedMenuItems(ctrl.searchTerm);
        promise.then(function (items) {
            ctrl.items = items;
        }).catch(function (error) {
            console.log(error);
        });
    };

    ctrl.remove = function(itemIndex) {
        ctrl.items.splice(itemIndex, 1);
    };  
}

MenuSearchService.$inject = ['$http'];
function MenuSearchService($http) {
    let service = this;

    service.getMatchedMenuItems = function(searchTerm) {
        return $http({
            method: 'GET',
            url: 'https://davids-restaurant.herokuapp.com/menu_items.json'
        }).then(function (result) {
            let items = result.data.menu_items.filter((menuItem) => {
                return menuItem.name.toLowerCase().includes(searchTerm.toLowerCase());
            });
            return items;
        });
    };
}

function MenuListDirective() {
    let ddo = {
        restrict: 'E',
        templateUrl: 'menuList.html',
        scope: {
            items: '<items',
            onRemove: '&'
        },
        controller: NarrowItDownDirectiveController,
        controllerAs: 'ctrl',
        bindToController: true
    };
    return ddo;
}

function NarrowItDownDirectiveController() {
    let ctrl = this;

    ctrl.itemsInList = function() {
        return ctrl.items.length === 0;
    };
}

})();