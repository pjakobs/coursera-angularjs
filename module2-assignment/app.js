(function() {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);


ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
    let buyList = this;
    buyList.items = ShoppingListCheckOffService.buyList;
    buyList.buyItem = function(index) {
        ShoppingListCheckOffService.buyItem(index);
    };
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
    let boughtList = this;
    boughtList.items = ShoppingListCheckOffService.boughtList;
}

function ShoppingListCheckOffService() {
    let service = this;

    service.buyList = [
        {name: 'cookies', quantity: 10},
        {name: 'milk', quantity: 5},
        {name: 'chocolates', quantity: 20},
        {name: 'apples', quantity: 5},
        {name: 'bananas', quantity: 6}];

    service.boughtList = [];

    service.buyItem = function(index) {
        service.boughtList.push(service.buyList[index]);
        service.buyList.splice(index, 1);
    };
}

})();