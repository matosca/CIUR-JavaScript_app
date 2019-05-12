const Highcharts = require("highcharts");
const PubSub = require("../../helpers/pub_sub.js")

const PieChart = function() {
  this.chartOptions = Highcharts.setOptions({
    colors: Highcharts.map(Highcharts.getOptions().colors, function (color) {
        return {
            radialGradient: {
                cx: 0.5,
                cy: 0.3,
                r: 0.7
            },
            stops: [
                [0, color],
                [1, Highcharts.Color(color).brighten(-0.3).get('rgb')] // darken
            ]
        };
    })
});
  this.chart = Highcharts.chart('pie-container', {
      chart: {
        backgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: null
      },
      tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enable:true,
            format: '<b>{point.name}</b>: {point.percentage:.2f} %',
            style: {
              color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'white',
              fontSize: "1.5em"
            },
            connectorColor: 'silver'
          }
        }
      },
      series: [
        {
          type:'pie',
          name:'Carbon Intensity',
          innerSize: "35%",
          data: []
        }
      ]
  });
};


PieChart.prototype.bindEvents = function() {
  PubSub.subscribe("RegionInfoView:data-fuels-ready", evt => {
    this.setData(evt.detail);
    // console.log('is this the data fuels', evt.detail);
  });
};

PieChart.prototype.setData = function(data) {
  this.chart.series[0].setData(data, true, true);
};

module.exports = PieChart;
