const app = angular.module('blue_app', []);

app.controller('MainController', ['$http', function($http) {

  this.user = {};
  this.logged = false;
  this.loginForm = {};
  this.regForm = {};
  this.allDailies = [];
  this.showDaily = [];
  this.showDailyInputs = [];
  this.clickedDaily = false;

  //CHECK TO SEE IF USER IS LOGGED IN
  $http({
    method: 'get',
    url: '/sessions'
  }).then(response => {
    if (response.data.user) {
      this.user = response.data.user;
      console.log(this.user);
      this.logged = true;
      this.getDailies();
    }
  }).catch(err => console.error('Catch:', err));

  //LOGIN
  this.login = () => {
    $http({
      method: 'post',
      url: '/sessions/login',
      data: this.loginForm
    }).then(response => {
      console.log(response.data);
      this.user = response.data;
      this.logged = true;
      this.getDailies();
    }).catch(err => console.error('Catch:', err.message));
  }


  //REGISTER
  this.register = () => {
    $http({
      method: 'post',
      url: '/users',
      data: this.regForm
    }).then(response => {
      console.log(response.data);

      this.user = response.data;
      this.logged = true;
      this.getDailies();
    }).catch( err => console.error('Catch:', err.message));
  }

  //LOGOUT
  this.logout = () => {
    $http({
      method: 'delete',
      url: '/sessions/logout'
    }).then(response => {
      this.logged = false;
      this.user = {};
    }).catch( err => console.error('Catch:', err.message));
  }

  //GET USERS DAILIES
  this.getDailies = () => {
    $http({
      method: 'get',
      url: '/blue'
    }).then(response => {
      // console.log(response.data);
      this.allDailies = response.data.userDailies;
    }).catch(err => console.error('Catch:', err));
  }






  //GET ONE DAILY
  this.getOneDaily = (id) => {
    $http({
      method: 'get',
      url: '/blue/' + id
    }).then(response => {
      // console.log(response.data);
      this.showDaily = response.data.oneDaily;
      this.showDailyInputs = response.data.dailyInputs;
      // console.log('Clicked on this day:', this.showDaily);
      // console.log('Show Daily data:', this.showDailyInputs);
      this.clickedDaily = true;
    }).catch(err => console.error('Catch:', err));
  }

  // this.getOneDaily();


  // ADD DAILY
  // ADD INPUT
  //   W/ NESTED UPDATE DAILY
  // DELETE INPUT
  //   W/ NESTED UPDATE DAILY
  // DELETE DAILY

}]);
