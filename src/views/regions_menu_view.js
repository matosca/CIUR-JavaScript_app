const PubSub = require('../helpers/pub_sub.js');

const RegionsMenuView = function (selectElement) {
  this.selectElement = selectElement;
};

RegionsMenuView.prototype.bindEvents = function () {
  PubSub.subscribe('Regions:regions-data-loaded', (event) => {
    const regionsData = event.detail;
    // console.log(regionsData, "regions in menu recieved");
    const regions = this.populateMenu(regionsData);
  });

  this.selectElement.addEventListener('change', (event) => {
    event.preventDefault();
    // console.log("this has been clicked");
    const clickedRegionClassId = event.target.value;
    console.log("clicked region", clickedRegionClassId);
    PubSub.publish('RegionsMenuView:region-clicked', clickedRegionClassId);
  });
};


RegionsMenuView.prototype.populateMenu = function (regionsData) {
  regionsData.forEach( (region) => {
    const option = document.createElement('option');
    option.textContent = region.shortname;
    option.value = region.shortname;
    // option.setAttribute("id", `${region.regionid}`);
    this.selectElement.appendChild(option);
  });
};


module.exports = RegionsMenuView;
