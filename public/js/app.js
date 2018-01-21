const app = angular.module('blue_app', ['ngRoute']);

app.controller('MainController', ['$http', function($http) {

  this.user = {};
  this.logged = false;
  this.loginForm = {};
  this.regForm = {};
  this.allDailies = [];
  this.showDaily = [];
  this.showDailyInputs = [];

  //CHECK TO SEE IF USER IS LOGGED IN
  $http({
    method: 'GET',
    url: '/sessions'
  }).then(response => {
    if (response.data.user) {
      this.user = response.data.user;
      this.logged = true;
    }.catch(err => console.error('Catch:', err));
  });

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

  //GET USERS DAILIES
  this.getDailies = () => {
    $http({
      method: 'GET',
      url: '/blue'
    }).then(response => {
      console.log(response.data);
      // this.allDailies = response.data;
    }).catch(err => console.error('Catch:', err));
  }

  this.getDailies();

  //GET ONE DAILY
  this.getOneDaily = (id) => {
    $http({
      method: 'GET',
      url: '/blue/' + id
    }).then(response => {
      console.log(response.data);
      // this.showDaily = response.data[0];
      // this.showDailyInputs = response.data[1];
    }).catch(err => console.error('Catch:', err));
  }

  this.getOneDaily();


}]);
