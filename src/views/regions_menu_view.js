const PubSub = require('../helpers/pub_sub.js');

const RegionsMenuView = function (navElement) {
  this.navElement = navElement;
};

RegionsMenuView.prototype.bindEvents = function () {
  PubSub.subscribe('Regions:regions-data-loaded', (event) => {
    const regionsData = event.detail; // console.log(regionsData);
    const regions = this.populateMenu(regionsData);
  });

    // this.navElement.addEventListener('click', (event) => {
    // const clickedRegionClassId = event.target.id;
    // PubSub.publish('RegionsMenuView:region-clicked', clickedRegionClassId);
};


RegionsMenuView.prototype.accessingToRegionsArray = function (regionsData) {
  const dataObject = regionsData.data[0].regions;
  return dataObject; // console.log(dataObject);
};

RegionsMenuView.prototype.populateMenu = function (regionsData) {
  const regions = this.accessingToRegionsArray(regionsData);
  regions.forEach( (region) => {
    const anchor = document.createElement('a');
    anchor.textContent = region.shortname;
    anchor.setAttribute("id", `${region.regionid}`);
    anchor.href = "";

    anchor.addEventListener('click', (event) => {
      event.preventDefault();
      console.log("this has been clicked");
      const clickedRegionClassId = event.target.id;
      PubSub.publish('RegionsMenuView:region-clicked', clickedRegionClassId);
    });
    this.navElement.appendChild(anchor);
  });
};

// RegionsMenuView.prototype.addEventListener = function (regionsData) {
//   const regions = this.accessingToRegionsArray(regionsData);
//   regions.forEach( (region) => {
//
//   });
// };


module.exports = RegionsMenuView;
