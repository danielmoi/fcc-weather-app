function echo(obj) {
  console.log(obj);
}
window.echo = console.log.bind(console);

function dir(obj) {
  console.dir(obj);
}
window.dir = console.dir.bind(console);

var app = angular.module('myApp', []);

app.factory('jsonData', ['$http', '$q', function ($http, $q) {
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
        //        obj.getWeather(obj.data.lat, obj.data.lng);
        echo('done'); // this appears before weather data
        return obj;
      });
  };
  obj.getWeather = function (lat, lng) {
    return $http.jsonp('http://api.openweathermap.org/data/2.5/weather?callback=JSON_CALLBACK&lat=' + lat + '&lon=' + lng + '&appid=44db6a862fba0b067b1930da0d769e98')
      .then(function (response) {
        dir(response);
        obj.weather = response.data;
        echo(obj.weather.main.temp);
      });
  };
  obj.getData = function () {
    $q.all([obj.getCity(), obj.getWeather(obj.data.lat, obj.data.lng)])
      .then(function (response) {
        return obj;
      });
  };

  return obj;
}]);



app.controller('myController', ['$scope', 'jsonData', function ($scope, jsonData) {

  var vm = this;

  jsonData.getData();






}]);