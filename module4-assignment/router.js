(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

    // Redirect to home page if no other URL matches
    $urlRouterProvider.otherwise('/');

    // *** Set up UI states ***
    $stateProvider

    // Home page
    .state('home', {
        url: '/',
        templateUrl: 'templates/home.template.html'
    })

    // Categories page
    .state('categories', {
        url: '/categories',
        component: 'categories',
        resolve: { 
            items: ['MenuDataService', function (MenuDataService) {
                return MenuDataService.getAllCategories();
            }]
        }
    })

    // Items sub-page
    .state('categories.items', { 
        url: '/items/{categoryId}', 
        component: 'items',
        resolve: {
            items: ['MenuDataService', '$transition$', function (MenuDataService, $transition$) {
                return MenuDataService.getItemsForCategory($transition$.params().categoryId);
            }]
        }
    });
}

})();