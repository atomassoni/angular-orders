var application = angular.module('ordersApp', []);
//this is our app
application.controller('IndexController', ['$scope', '$http', function($scope, $http) {


  $scope.lineTotal = 0;

  $scope.getStuff = function() {
    $http({
      method: 'GET',
      url: '/orders'
    }).then(function(res) {
      var data = res.data;
      $scope.customers = data;
      console.log('async response: ', data);
    });
  };

  $scope.getOrders = function(id) {

    $http({
      method: 'POST',
      url: '/orders/data',
      data: {customerId: id}
    }).then(function(res) {
      var data = res.data;
      $scope.orders = data;
      console.log('async response: ', data);
    });
  };

}]);
