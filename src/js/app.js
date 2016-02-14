function echo(obj) {
  console.log(obj);
}
window.echo = console.log.bind(console);

function dir(obj) {
  console.dir(obj);
}
window.dir = console.dir.bind(console);

var app = angular.module('myApp', []);

app.factory('jsonData', ['$http', function ($http) {
  var obj = {};
  obj.data = {};
  obj.getData = function () {
    return $http.jsonp('http://ipinfo.io/json?callback=JSON_CALLBACK')
      .then(function (response) {
        angular.extend(obj.data, response.data);
        var comma = response.data.loc.indexOf(',');
        obj.data.lat = response.data.loc.slice(0, comma);
        obj.data.lng = response.data.loc.slice(comma + 1);
        echo(obj.data);
        //        obj.getWeather(obj.data.lat, obj.data.lng);
        echo('done'); // this appears before weather data
        return $http.jsonp('http://api.openweathermap.org/data/2.5/weather?callback=JSON_CALLBACK&lat=' + obj.data.lat + '&lon=' + obj.data.lng + '&appid=44db6a862fba0b067b1930da0d769e98')
          .then(function (response) {
            dir(response);
            obj.weather = response.data;
            obj.weather.celcius = Math.floor(obj.weather.main.temp - 273.15);
            obj.weather.fahrenheit = Math.floor(obj.weather.main.temp * 9 / 5 - 459.67);

            echo(obj.weather);
          });
      });
  };


  return obj;
}]);



app.controller('myController', ['$scope', 'jsonData', function ($scope, jsonData) {

  var vm = this;

  jsonData.getData().then(function () {
    echo('hi');
    $scope.data = jsonData.data;
    $scope.weather = jsonData.weather;
    $scope.weather.tempCurrent = $scope.weather.celcius;
  $scope.weatherCSS = 'wi wi-owm-' + $scope.weather.weather[0].id;
    

  });

  $scope.unitCurrent = 'C';
  $scope.unitOther = 'F';

  $scope.convert = function () {
    if ($scope.unitCurrent === 'C') {
      $scope.unitCurrent = 'F';
      $scope.unitOther = 'C';
      $scope.weather.tempCurrent = $scope.weather.fahrenheit;
      return;
    }
    if ($scope.unitCurrent === 'F') {
      $scope.unitCurrent = 'C';
      $scope.unitOther = 'F';
      $scope.weather.tempCurrent = $scope.weather.celcius;
      return;
    }
  };
  
}]);