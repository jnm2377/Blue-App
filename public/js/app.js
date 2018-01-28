const app = angular.module('blue_app', ["highcharts-ng"]);


app.controller('MainController', ['$http', '$scope', function($http, $scope) {



  this.user = {};
  this.clickedLogin = false;
  this.clickedRegister = false;
  this.logged = false;
  this.home = false;
  this.clickedInfo = false;
  this.clickedDaily = false;
  this.clickedNav = false;
  this.loginForm = {};
  this.regForm = {};
  this.allDailies = [];
  this.showDaily = [];
  this.showDailyInputs = [];
  this.dailyForm = {};
  this.inputForm = {};
  this.updateDailyForm = {};


  this.chartDaily2 = () => {
    let colors = Highcharts.getOptions().colors,
    categories = ['Progress Update'],
    data = [{
        color: colors[0],
        drilldown: {
            name: 'Percentage to Goal',
            categories: ['Goal Achieved', 'Goal Remainding'],
            data: [this.showDaily.percentageToGoal, (100 - this.showDaily.percentageToGoal)],
            color: colors[0]
        }
    }],
    browserData = [],
    versionsData = [],
    i,
    j,
    dataLen = data.length,
    drillDataLen,
    brightness;


    // Build the data arrays
    for (i = 0; i < dataLen; i += 1) {

        // add browser data
        browserData.push({
            name: categories[i],
            y: data[i].y,
            color: data[i].color
        });

        // add version data
        drillDataLen = data[i].drilldown.data.length;
        for (j = 0; j < drillDataLen; j += 1) {
            brightness = 0.2 - (j / drillDataLen) / 5;
            versionsData.push({
                name: data[i].drilldown.categories[j],
                y: data[i].drilldown.data[j],
                color: Highcharts.Color(data[i].color).brighten(brightness).get()
            });
        }
    }

// Create the chart
    $scope.chartConfig = {
      chart: {
          type: 'pie'
      },
      title: {
          text: 'Daily Progress Update'
      },
      plotOptions: {
          pie: {
              shadow: false,
              center: ['50%', '50%']
          }
      },
      tooltip: {
          valueSuffix: '%'
      },
      series: [{
          name: 'Water intake',
          data: versionsData,
          size: '80%',
          innerSize: '60%',
          dataLabels: {
              formatter: function () {
                  // display only if larger than 1
                  return this.y > 1 ? '<b>' + this.point.name + ':</b> ' +
                      this.y + '%' : null;
              }
          },
          id: 'versions'
      }],
      responsive: {
          rules: [{
              condition: {
                  maxWidth: 400
              },
              chartOptions: {
                  series: [{
                      id: 'versions',
                      dataLabels: {
                          enabled: false
                      }
                  }]
              }
          }]
      }
    };
  }

  this.chartDaily = () => {
    $scope.chart1Config = {
      chart: {
        type: 'bar'
      },
      series: [{
            name: 'Goal',
            data: [this.showDaily.goal]
        }, {
            name: 'Total Intake',
            data: [this.showDaily.totalIntake]
        }],
      title: {
        text: 'Your Drinking Progress'
      },
      xAxis: [ {
            categories: ['Daily Data']
        }],
      yAxis: [{ // Primary yAxis
        title: {
          text: 'Number of ounces',
        }
      }]
    };
  }

  //CHECK TO SEE IF USER IS LOGGED IN
  $http({
    method: 'get',
    url: '/sessions'
  }).then(response => {
    if (response.data.user) {
      this.user = response.data.user;
      console.log(this.user);
      this.logged = true;
      this.home = true;
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
      this.home = true;
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
      this.home = true;
      this.getDailies();
    }).catch( err => console.error('Catch:', err.message));
  }

  //LOGOUT
  this.logout = () => {
    $http({
      method: 'delete',
      url: '/sessions/logout'
    }).then(response => {
      console.log(response.data);
      this.logged = false;
      this.home = false;
      this.clickedDaily = false;
      this.clickedNav = false;
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
      this.home = false;
      this.chartDaily();
      this.chartDaily2();
    }).catch(err => console.error('Catch:', err));
  }

  // ADD DAILY
  this.createDaily = () => {
    this.dailyForm.percentageToGoal = (this.dailyForm.totalIntake / this.dailyForm.goal) * 100;
    this.dailyForm.user = this.user._id;
    // console.log(this.dailyForm);
    $http({
      method: 'post',
      url: 'blue',
      data: this.dailyForm
    }).then(response => {
      console.log('Create response:',response.data);
      this.allDailies.push(response.data);
    }).catch(err => console.error('Catch', err));
  }

  //DELETE DAILY
  this.deleteDaily = (daily) => {
    $http({
      method: 'delete',
      url: '/blue/' + daily._id
    }).then(response => {
      console.log(response.data);
      const removeByIndex = this.allDailies.findIndex(item => item._id === daily._id);
      this.allDailies.splice(removeByIndex, 1);
    }).catch(err => console.error('Catch:', err));

  }

  // ADD INPUT
  //   W/ NESTED UPDATE DAILY
  this.createInput = () => {
    this.inputForm.daily = this.showDaily._id;
    this.inputForm.user = this.user._id;
    this.showDaily.totalIntake = this.showDaily.totalIntake + this.inputForm.intake;
    this.showDaily.percentageToGoal = (this.showDaily.totalIntake / this.showDaily.goal) * 100;
    // console.log(this.inputForm);
    console.log('New total intake:', this.showDaily.totalIntake);
    console.log('New percentage to goal:', this.showDaily.percentageToGoal);

    this.updateDailyForm = {
      totalIntake: this.showDaily.totalIntake,
      percentageToGoal: this.showDaily.percentageToGoal
    }
      //add http route to create input
      //nest http route to update daily in .then of create input
      $http({
        method: 'post',
        url: '/blue/input',
        data: this.inputForm
      }).then(response => {
        console.log('Create Input response:', response.data);
        this.showDailyInputs.push(response.data);

        $http({
          method: 'put',
          url: '/blue/' + this.showDaily._id,
          data: this.updateDailyForm
        }).then(response => {
          const updateByIndex = this.allDailies.findIndex(item => item._id === response.data._id);
          this.allDailies.splice(updateByIndex, 1, response.data);
          this.showDaily = this.allDailies[updateByIndex];
          this.updateDailyForm = {};
        }).catch(err => console.error('Catch:', err));

      }).catch(err => console.error('Catch:', err));
  }

  // DELETE INPUT
  //   W/ NESTED UPDATE DAILY
  // DELETE DAILY
  this.deleteInput = (input) => {
    this.showDaily.totalIntake = this.showDaily.totalIntake - input.intake;
    this.showDaily.percentageToGoal = (this.showDaily.totalIntake / this.showDaily.goal) * 100;

    this.updateDailyForm = {
      totalIntake: this.showDaily.totalIntake,
      percentageToGoal: this.showDaily.percentageToGoal
    }

    console.log('Updated daily:', this.updateDailyForm);

    //add http route to delete input
    //nest http route to update daily in .then of delete input
    $http({
      method: 'delete',
      url: '/blue/input/' + input._id
    }).then(response => {
      console.log(response.data);
      const removeByIndex = this.showDailyInputs.findIndex(item => item._id === input._id);
      this.showDailyInputs.splice(removeByIndex, 1);

      $http({
        method: 'put',
        url: '/blue/' + this.showDaily._id,
        data: this.updateDailyForm
      }).then(response => {
        const updateByIndex = this.allDailies.findIndex(item => item._id === response.data._id);
        this.allDailies.splice(updateByIndex, 1, response.data);
        this.showDaily = this.allDailies[updateByIndex];
        this.updateDailyForm = {};
      }).catch(err => console.error('Catch:', err));

    }).catch(err => console.error('Catch:', err));
  }

  this.openNav = () => {
    this.clickedNav = true;
  }

  this.closeNav = () => {
    this.clickedNav = false;
  }

  this.showLogin = () => {
    this.clickedLogin = true;
    this.clickedRegister = false;
  }

  this.showRegister = () => {
    this.clickedLogin = false;
    this.clickedRegister = true;
  }

  this.goHome = () => {
    this.clickedNav = false;
    this.home = true;
    this.clickedDaily = false;
    this.clickedInfo = false;

  }

  this.seeInfo = () => {
    console.log('Need to create info page');
    // this.clickedNav = false;
    // this.home = false;
    // this.clickedDaily = false;
    // this.clickedInfo = true;
  }

}]);
