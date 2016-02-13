function echo(obj) {
  console.log(obj);
}
window.echo = console.log.bind(console);

var app = angular.module('myApp', []);

app.factory('getIPdata', function($http) {
  var obj = {};
  obj.data = function() {
    return $http.jsonp('http://ipinfo.io/json?callback=JSON_CALLBACK')
    .then(function (response) {
      echo(response.data);
    });
  };
  return obj;
});
  

app.controller('myController', ['$scope', '$http', function ($scope, getIPdata, $http) {
  
  
  $scope.data = {};
  

  // Get location data
  $http.jsonp('http://ipinfo.io/?callback=JSON_CALLBACK'
    //    responseType: 'json'
  ).then(function myCallback(response) {
    echo(response.data);
    $scope.myGeo = response.data.loc;
    $scope.myCity = response.data.city;
  var comma = $scope.myGeo.indexOf(',');
    $scope.data.lat = $scope.myGeo.slice(0,comma);
    $scope.data.lng = $scope.myGeo.slice(comma+1);
    $scope.myRegion = response.data.region;
  }, function errorCallback(response) {
    echo(response);

  });
  
  
    echo($scope.data);






  









}]);