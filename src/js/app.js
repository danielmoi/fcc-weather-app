function echo(obj) {
  console.log(obj);
}
window.echo = console.log.bind(console);

var app = angular.module('myApp', []);

app.factory('getIPdata', ['$http', function ($http, $scope) {
  var obj = {};
  obj.stuff = {};
  obj.data = function () {
    return $http.jsonp('http://ipinfo.io/json?callback=JSON_CALLBACK')
      .then(function (response) {
      obj.stuff.city = response.data.city;
        echo(obj.stuff.city);
      
//        angular.extend($scope.myData.data, response.data);
      });
    
  };
  return obj;
}]);


app.controller('myController', ['getIPdata', function (getIPdata) {
  
  var vm = this;


  angular.extend(vm, getIPdata);
  vm.data();
  console.dir(vm.stuff.city);





}]);