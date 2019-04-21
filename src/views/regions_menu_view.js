const PubSub = require('../helpers/pub_sub.js');

const RegionsMenuView = function (navElement) {
  this.navElement = navElement;
};

RegionsMenuView.prototype.bindEvents = function () {
  PubSub.subscribe('Regions:regions-data-loaded', (event) => {
    const regionsData = event.detail; // console.log(regionsData);
    const regions = this.populateMenu(regionsData);
  });
};


RegionsMenuView.prototype.populateMenu = function (regionsData) {
  regionsData.forEach( (region) => {
    const anchor = document.createElement('a');
    anchor.textContent = region.shortname;
    anchor.setAttribute("id", `${region.regionid}`);
    anchor.href = "";

    anchor.addEventListener('click', (event) => {
      event.preventDefault();
      console.log("this has been clicked");
      const clickedRegionClassId = event.target.id;
      // console.log("clicked region", clickedRegionClassId);
      PubSub.publish('RegionsMenuView:region-clicked', clickedRegionClassId);
    });
    this.navElement.appendChild(anchor);
  });
};


module.exports = RegionsMenuView;
