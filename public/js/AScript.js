/****** The Main App *************/
var mainApp = angular.module('mainApp', ['ngRoute']);

/*** The Shared Service ***/
mainApp.service('sharedVars',['$rootScope', function ($rootScope) {
   var sharedVars = {};
   sharedVars.classPageId = 'loginPage';

   sharedVars.changePageID = function (pageID) {
      console.log(pageID);
      this.classPageId = pageID;
      this.NotifyPageChange();
   };

   sharedVars.NotifyPageChange = function () {
      $rootScope.$broadcast('pageChange');
   }
 
   return sharedVars;
}]);

/****** The Main Controller *****/
mainApp.controller('mainCtrl', ['$scope', 'sharedVars', function ($scope, sharedVars) {
	$scope.topMenu = ['Menu Item 1', 'Menu Item 2', 'Menu Item 3', 'Menu Item 4', 'Menu Item 5', 'Menu Item 6'];
   $scope.leftMenu = ['Side Item 1', 'Side Item 2', 'Side Item 3', 'Side Item 4', 'Side Item 5', 'Side Item 6'];
   $scope.classPageId = "loginPage";
   $scope.$on('pageChange', function () {
      $scope.classPageId = sharedVars.classPageId;
   }) 
}]);

/****** lets do the routing ***********/
mainApp.config(['$routeProvider',
         function($routeProvider) {
            $routeProvider.
               when('/login', {
                  templateUrl: 'template/login.html',
                  controller: 'loginCtrl'
               })
               .when('/friends', {
                  templateUrl: 'template/people.html',
                  controller: 'peopleCtrl'
               })
               .when('/', {
               		redirectTo: '/login'
               })
               .otherwise({
               		redirectTo: '/'
               });
         }]);

/***** Routing Controllers ***********/
mainApp.controller('peopleCtrl', ['$scope', 'sharedVars', function ($scope, sharedVars) {
   //$('body').removeClass().addClass('generalPage');
   sharedVars.changePageID('people');
	$scope.items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7', 'Item 8', 'Item 9', 'Item 10', 'Item 11', 'Item 12'];
   
}]);

/***** Login Controller *************/
mainApp.controller('loginCtrl', ['$scope', 'sharedVars', function ($scope, sharedVars) {
   //$('body').removeClass().addClass('loginPage');
   sharedVars.changePageID('loginPage');
}]);

