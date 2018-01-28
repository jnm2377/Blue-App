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
