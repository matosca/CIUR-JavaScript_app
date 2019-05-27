const PubSub = require('../helpers/pub_sub.js');

const RegionsMenuView = function (selectElement) {
  this.selectElement = selectElement;
};

RegionsMenuView.prototype.bindEvents = function () {
  PubSub.subscribe('Regions:regions-data-loaded', (event) => {
    const regionsData = event.detail;
    const regions = this.populateMenu(regionsData);
  });

  this.selectElement.addEventListener('change', (event) => {
    event.preventDefault();
    const clickedRegionClassId = event.target.value;
    PubSub.publish('RegionsMenuView:region-clicked', clickedRegionClassId);
  });
};


RegionsMenuView.prototype.populateMenu = function (regionsData) {
  regionsData.forEach( (region) => {
    if (region.shortname !== "GB") {
      const option = document.createElement('option');
      option.textContent = region.shortname;
      option.value = region.shortname;
      this.selectElement.appendChild(option);
    }
  });
};


module.exports = RegionsMenuView;
