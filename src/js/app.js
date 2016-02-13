function echo(obj) {
  console.log(obj);
}
window.echo = console.log.bind(console);

function dir(obj) {
  console.dir(obj);
}
window.dir = console.dir.bind(console);

var app = angular.module('myApp', []);

app.factory('jsonIPinfo', ['$http', function ($http) {
  var obj = {};
  obj.data = {};
  obj.getCity = function () {
    return $http.jsonp('http://ipinfo.io/json?callback=JSON_CALLBACK')
      .then(function (response) {
        angular.extend(obj.data, response.data);
        var comma = response.data.loc.indexOf(',');
        obj.data.lat = response.data.loc.slice(0, comma);
        obj.data.lng = response.data.loc.slice(comma + 1);
        echo(obj.data);

      });

  };
  return obj;
}]);

app.factory('jsonWeather', function ($http) {
  var obj = {};
  obj.getWeather = function (lat, lng) {
    return $http.jsonp('http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lng + '&appid=44db6a862fba0b067b1930da0d769e98')
      .then(function (response) {
        obj.weather = response.data;
        echo(obj.weather);
      });

  };
  return obj;

});

app.controller('myController', ['$scope', 'jsonIPinfo', 'jsonWeather', function ($scope, jsonIPinfo, jsonWeather) {

  var vm = this;

  angular.extend($scope, jsonIPinfo);
  $scope.getCity();
  console.dir($scope.data.city);
  
  angular.extend($scope, jsonWeather);
  $scope.getWeather($scope.data.lat, $scope.data.lng);





}]);