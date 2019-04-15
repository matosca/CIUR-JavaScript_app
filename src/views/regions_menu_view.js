const PubSub = require('../helpers/pub_sub.js');

const RegionsMenuView = function (navElement) {
  this.navElement = navElement;
};

RegionsMenuView.prototype.bindEvents = function () {
  PubSub.subscribe('Regions:regions-data-loaded', (event) => {
    const regionsData = event.detail;
    // console.log(regionsData);
    const regions = this.populateMenu(regionsData);
    console.log(regions);
  });
};


RegionsMenuView.prototype.accessingToRegionsArray = function (regionsData) {
  const dataObject = regionsData.data[0].regions;
  return dataObject;
  // console.log(dataObject);
};

RegionsMenuView.prototype.populateMenu = function (regionsData) {
  const regions = this.accessingToRegionsArray(regionsData);
  regions.forEach( (region) => {
    const anchor = document.createElement('a');
    anchor.textContent = region.shortname;
    anchor.classList.add(`${region.regionid}`);
    this.navElement.appendChild(anchor);
  });
}

module.exports = RegionsMenuView;
