const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');

const Regions = function () {
  this.regionsData = null;
};

Regions.prototype.getData = function () {
  const requestHelper = new RequestHelper('https://api.carbonintensity.org.uk/regional');
  requestHelper.get().then( (data) => {
    this.regionsData = data;
    console.log(this.regionsData);
    PubSub.publish('Regions:regions-data-loaded', this.regionsData);
  });
};

Regions.prototype.bindEvents = function () {
  PubSub.subscribe('RegionsMenuView:region-clicked', (event) => {
    const chosenRegion = event.detail;
    const clickedRegion = this.findByRegionId(chosenRegion);
    PubSub.publish('Regions:region-clicked-ready', clickedRegion);
  });
};

Regions.prototype.findByRegionId = function (searchId) {
  const dataObject = this.regionsData;
  const regionsData = dataObject.data[0].regions;

  const foundRegion = regionsData.filter( (currentRegion) => {
    return currentRegion.regionid === searchId;
  });
  return foundRegion;
};
module.exports = Regions;
