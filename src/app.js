const Regions = require('./models/regions.js');
const RegionsMenuView = require('./views/regions_menu_view.js');
const RegionInfoView = require('./views/region_info_view.js');

document.addEventListener('DOMContentLoaded', () => {
  console.log('JavaScript loaded');

  const selectElement = document.querySelector('select#regionsDropdown');
  const regionsMenu = new RegionsMenuView(selectElement);
  regionsMenu.bindEvents();

  const detailsContainer = document.querySelector('section#info-box');
  const regionDetailsView = new RegionInfoView(detailsContainer);
  regionDetailsView.bindEvents();

  const regions = new Regions();
  regions.getData();
  regions.bindEvents();
});
