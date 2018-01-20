const app = angular.module('blue_app', ['ngRoute']);

app.controller('MainController', ['$http', function($http) {

  this.user = {};
  this.logged = false;
  this.loginForm = {};
  this.regForm = {};

  //LOGIN
  this.loginUser = () => {
    $http({
      method: 'POST',
      url: '/sessions/login',
      data: this.loginForm
    }).then(response => {
      console.log(response.data);
      // this.user = response.data;
      // this.logged = true;
    }).catch(err => console.error('Catch:', err.message));
  }


  //REGISTER
  this.registerUser = () => {
    $http({
      method: 'POST',
      url: '/users',
      data: this.regForm
    }).then(response => {
      console.log(response.data);
      // this.user = response.data;
      // this.logged = true;
    }).catch( err => console.error('Catch:', err.message));
  }

  //LOGOUT
  this.logout = () => {
    $http({
      method: 'DELETE',
      url: '/sessions/logout'
    }).then(response => {
      this.logged = false;
      this.user = {};
    }).catch( err => console.error('Catch:', err.message));
  }

}]);
