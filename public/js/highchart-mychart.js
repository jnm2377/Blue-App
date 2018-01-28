this.chartIndex = () => {
  $scope.chart3Config = {
    chart: {
          zoomType: 'x'
      },
      title: {
          text: 'Your Drinking Stats'
      },
      xAxis: {
          type: 'datetime'
      },
      yAxis: {
          title: {
              text: 'Amount in Ounces'
          }
      },
      legend: {
          enabled: false
      },
      plotOptions: {
          area: {
              fillColor: {
                  linearGradient: {
                      x1: 0,
                      y1: 0,
                      x2: 0,
                      y2: 1
                  },
                  stops: [
                      [0, Highcharts.getOptions().colors[0]],
                      [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                  ]
              },
              marker: {
                  radius: 2
              },
              lineWidth: 1,
              states: {
                  hover: {
                      lineWidth: 1
                  }
              },
              threshold: null
          }
      },

      series: [{
          type: 'area',
          name: 'Your total intake',
          data: this.allDailies.map(obj => obj.totalIntake)
      }]


    // chart: {
    //   type: 'column'
    // },
    // title: {
    //     text: 'Your Drinking Stats'
    // },
    // xAxis: {
    //     categories: [
    //         'Daily Entries'
    //     ],
    //     crosshair: true
    // },
    // yAxis: {
    //     min: 0,
    //     title: {
    //         text: 'Amount in Ounces'
    //     }
    // },
    // tooltip: {
    //     headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
    //     pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
    //         '<td style="padding:0"><b>{point.y:.1f} oz</b></td></tr>',
    //     footerFormat: '</table>',
    //     shared: true,
    //     useHTML: true
    // },
    // plotOptions: {
    //     column: {
    //         pointPadding: 0.2,
    //         borderWidth: 0
    //     }
    // },
    // series: [{
    //     name: 'Daily Goal',
    //     data: [120, 100, 120, 110, 90, 90, 110, 120, 100]
    //
    // }, {
    //     name: 'Daily Total Achieved',
    //     data: [88, 70, 75, 60, 89, 90, 110, 80, 80]
    //
    // }]
  };
  console.log('this is your chart data', $scope.chart3Config.series[0].data);
}



// ============================SHOW PAGE CHARTS
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


// =========================================
this.chartDaily = () => {
  $scope.chart1Config = {
    chart: {
      type: 'column'
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
