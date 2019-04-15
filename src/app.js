const Regions = require('./models/regions.js');
const RegionsMenuView = require('./views/regions_menu_view.js');

document.addEventListener('DOMContentLoaded', () => {
  console.log('JavaScript loaded');

  const navElement = document.querySelector('nav#menu-bar');
  const regionsMenu = new RegionsMenuView(navElement);
  regionsMenu.bindEvents();

  const regions = new Regions();
  regions.getData();
});
