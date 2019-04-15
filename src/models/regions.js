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

module.exports = Regions;
