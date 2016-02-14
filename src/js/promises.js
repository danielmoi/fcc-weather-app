app.factory('myService', function ($http) {
  var myService = {
    async: function () {
      // $http returns a promise, which has a then function, which also returns a promise
      var promise = $http.get('test.json').then(function (response) {
        // The then function here is an opportunity to modify the response
        console.log(response);
        // The return value gets picked up by the then in the controller.
        return response.data;
      });
      // Return the promise to the controller
      return promise;
    }
  };
  return myService;
});

app.controller('MainCtrl', function (myService, $scope) {
  // Call the async method and then do stuff with what is returned inside our own then function
  myService.async().then(function (d) {
    $scope.data = d;
  });
});