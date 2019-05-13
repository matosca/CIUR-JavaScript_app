const PubSub = require('../helpers/pub_sub.js');

const MainView = function (container) {
  this.container = container;
};

MainView.prototype.bindEvents = function () {
  PubSub.subscribe('Regions:regions-data-loaded', (evt) => {
    regionsData = evt.detail;

    const oneRegion = this.selectOneRegion(regionsData);

    PubSub.publish('MainView:one-region-ready', oneRegion);
  });
};

MainView.prototype.selectOneRegion = function(regions) {

  const oneRegion = regions.splice(17, 1);
  return oneRegion;
}



module.exports = MainView;
