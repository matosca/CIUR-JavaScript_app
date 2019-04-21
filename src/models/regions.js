const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');

const Regions = function () {
  this.regionsData = null;
};

Regions.prototype.getData = function () {
  const requestHelper = new RequestHelper('https://api.carbonintensity.org.uk/regional');
  requestHelper.get()
    .then( (dataRegions) => {
    this.regionsData = dataRegions.data[0].regions;
    // console.log("get data", this.regionsData);
    PubSub.publish('Regions:regions-data-loaded', this.regionsData);
  });
};

Regions.prototype.bindEvents = function () {
  PubSub.subscribe('RegionsMenuView:region-clicked', (event) => {
    const chosenRegion = event.detail;
    // console.log(chosenRegion);//return an integer id
    const clickedRegion = this.findByRegionId(chosenRegion);
    PubSub.publish('Regions:region-clicked-ready', clickedRegion);
  });
};

Regions.prototype.findByRegionId = function (searchId) {

  const foundRegion = this.regionsData.find( (currentRegion) => {
    // console.log("is it true?", searchId == currentRegion.regionid);
    // console.log("Region searched", currentRegion);
    // String is not equal to number, data types need standardized
    return searchId == currentRegion.regionid;
  });
  // console.log("found region", foundRegion);
  return foundRegion;

};
module.exports = Regions;
