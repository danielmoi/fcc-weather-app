function echo(obj) {
  console.log(obj);
}
window.echo = console.log.bind(console);

var app = angular.module('myApp', []);

app.controller('myController', ['$scope', '$interval', '$http', function ($scope, $interval, $http) {

  echo('hello');

  // this could be done using the .get method
  // (which is a shortcut method for the following code)
  $http({
    method: 'GET',
    url: 'https://api.ipify.org?format=jsonp&callback=getIP',
    responseType: 'json'
  }).then(function getIP(response) {
    echo(response.data);
    $scope.myIP = response.data;


  }, function errorCallback(response) {



  });

  $http.jsonp('https://api.ipify.org?format=jsonp&callback=JSON_CALLBACK')
    .then(function callBack (response) {
      echo(response.data);
      $scope.myIP = response.data;
    });


  // this method is a shorthand method 
  // makes JSONP requests easier
  $http.jsonp(
    'https://en.wikipedia.org/w/api.php?action=opensearch&search=Sydney&format=json&callback=JSON_CALLBACK'
  ).then(function myCallback(response) {
    echo(response.data);
    $scope.myWiki = response.data;


  }, function errorCallback(response) {
    echo(response.data);
    $scope.myWiki = response.data;



  });









}]);