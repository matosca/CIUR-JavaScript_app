const Regions = require('./models/regions.js');
const RegionsMenuView = require('./views/regions_menu_view.js');
const RegionInfoView = require('./views/region_info_view.js');
const PieChart = require('./views/high_charts/pie_chart.js');

document.addEventListener('DOMContentLoaded', () => {
  console.log('JavaScript loaded');

  const selectElement = document.querySelector('select#regions-dropdown');
  const regionsMenu = new RegionsMenuView(selectElement);
  regionsMenu.bindEvents();

  const detailsContainer = document.querySelector('section#info-box');
  const regionDetailsView = new RegionInfoView(detailsContainer);
  regionDetailsView.bindEvents();

  const pieChart = new PieChart();
  pieChart.bindEvents();

  const regions = new Regions();
  regions.getData();
  regions.bindEvents();
});
