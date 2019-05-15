const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');

const Regions = function () {
  this.regionsData = null;
  this.carbonIntensity = null;
};

Regions.prototype.getData = function () {

//1st request to API get Object with regions data
  const requestHelper = new RequestHelper('https://api.carbonintensity.org.uk/regional');
  requestHelper.get()
    .then( (dataRegions) => {
    this.regionsData = dataRegions.data[0].regions;
    PubSub.publish('Regions:regions-data-loaded', this.regionsData);
  });

//2nd request to API get Object with current carbon intensity
  const newRequestHelper = new RequestHelper('https://api.carbonintensity.org.uk/intensity');
  newRequestHelper.get()
    .then( (carbonIntensity) => {
      this.carbonIntensity = carbonIntensity.data[0].intensity;
      PubSub.publish('Regions:carbon-intensity-ready', this.carbonIntensity);
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
  const foundRegion = this.regionsData.find( (currentRegion) => {
    return searchId == currentRegion.shortname;
  });
  return foundRegion;
};

module.exports = Regions;
